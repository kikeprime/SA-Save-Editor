import * as dt from "./datatypes.js"
import dicts from "./sa1_dicts.js"
//import * as h from "./sa1_helper.js"
import * as tabs from "./tabs/index.js"

export default class SA1 {
    constructor() {
        dicts(this);
        this.loaded = this._load();
        this.SA1Size = 0x4A0;
		this.SADXSize = 0x570;
		this.SA2010Size = 0x580;
		this.DCHeader = 0x480;
		this.DCIHeader = this.DCHeader + 0x20;
		this.GCHeader = 0x1480;
		this.X360Header = 4;
    }
    
    async _load() {
        if (!this.templates)
            await this.load_templates();
        if (!this.slots) {
            this.slots = [
                new SA1Slot(this.templates[5].slice()),
                new SA1Slot(this.templates[5].slice()),
                new SA1Slot(this.templates[5].slice()),
            ];
        }
    }
    
    async load(file, version, slot, slot_settings) {
        const buffer = new Uint8Array(await file.arrayBuffer());
        switch (version) {
            case "sa1dc": {
                const dci = file.name.toLowerCase().endsWith(".dci");
                this.load_dc(buffer, slot_settings, dci);
                break;
            }
            case "sa1gc": {
                this.load_gc(buffer, slot);
                break;
            }
            case "sa1pc": {
                this.load_pc(buffer, slot);
                break;
            }
        }
    }
    
    async load_templates() {
        const files = [
            "./assets/NTSCJ.VMS",
            "./assets/NTSCU.vms",
            "./assets/INTERNAT.VMS",
            "./assets/GC.gci",
            "./assets/GCPreview.gci",
            "./assets/PC.snc",
        ];
        this.templates = await Promise.all(
            files.map(async url => {
                const response = await fetch(url);
                return new Uint8Array(await response.arrayBuffer());
            })
        );
    }
    
    load_dc(buffer, slot_settings, dci) {
        if (dci) {
            this.dci2vms(buffer);
        }
        for (let i = 0; i < 3; i++) {
            const j = slot_settings[i];
            if (j != -1) {
                this.slots[j] = new SA1Slot(this.templates[5].slice());
                const offset = (dci ? this.DCIHeader : this.DCHeader) + i * this.SA1Size;
                this.slots[j].buffer.set(buffer.slice(offset, offset + this.SA1Size));
            }
        }
    }
    
    load_gc(buffer, slot) {
        this.byteswap(buffer.subarray(this.GCHeader));
        this.slots[slot] = new SA1Slot(buffer.slice(this.GCHeader));
    }
    
    load_pc(buffer, slot) {
        this.slots[slot] = new SA1Slot(buffer);
    }
    
    save(version) {
        this.calculate_checksum(this.slot.checksum, this.slot.buffer);
        let buffer = this.slot.buffer;
        switch (version) {
            case "sa1dcjp": {
                buffer = this.templates[0].slice();
                this.save_dc(buffer);
                break;
            }
            case "sa1dcusa": {
                buffer = this.templates[1].slice();
                this.save_dc(buffer);
                break;
            }
            case "sa1dcint": {
                buffer = this.templates[2].slice();
                this.save_dc(buffer);
                break;
            }
            case "sa1gcjp":
            case "sa1gcusa":
            case "sa1gceu": {
                buffer = this.templates[3].slice();
                buffer.set(this.byteswap(this.slot.buffer.slice()), this.GCHeader);
				if (!version.endsWith("usa"))
					buffer[3] = new TextEncoder("ASCII").encode(version.endsWith("jp") ? 'J' : 'P');
                break;
            }
            case "sa1gcpv": {
                buffer = this.templates[4].slice();
                const slot = this.slot.buffer.slice(0, this.SA1Size);
                const data = new DataView(slot.buffer);
                const checksum = new dt.U16(0x0000, data);
                this.calculate_checksum(checksum, slot);
                buffer.set(this.byteswap(slot), this.GCHeader);
                break;
            }
        }
        return new Blob([buffer], { type: "application/octet-stream" });
    }
    
    save_dc(buffer) {
        for (let i = 0; i < 3; i++) {
            const offset = this.DCHeader + i * this.SA1Size;
            const slot = this.slots[i].buffer.slice(0, this.SA1Size);
            const data = new DataView(slot.buffer);
            const checksum = new dt.U16(0x0000, data);
            this.calculate_checksum(checksum, slot);
            buffer.set(slot, offset);
        }
        const data = new DataView(buffer.buffer);
        const checksum = new dt.U16(0x46, data);
        this.calculate_vms_crc(checksum, buffer);
    }
    
    calculate_checksum(checksum, buffer) {
        checksum.value = 0xFFFF;
        for (let i = 4; i < buffer.length; i++) {
            checksum.value ^= buffer[i];
            for (let j = 0; j < 8; j++) {
                if (checksum.value & 1)
                    checksum.value = (checksum.value >> 1) ^ 0x8408;
                else
                    checksum.value >>= 1;
            }
        }
        checksum.value = ~checksum.value;
        return buffer;
    }
    
    calculate_vms_crc(checksum, buffer) {
        checksum.value = 0;
        for (let i = 4; i < buffer.length; i++) {
            checksum.value ^= (buffer[i] << 8);
            for (let j = 0; j < 8; j++) {
                if (checksum.value & 0x8000)
                    checksum.value = (checksum.value << 1) ^ 0x1021;
                else
                    checksum.value <<= 1;
            }
        }
        return buffer;
    }
    
    byteswap(buffer) {
        function reverse(offset, length) {
            buffer.subarray(offset, offset + length).reverse();
        }
        for (let i = 0; i < 34; i++)
            reverse(i * 4, 4);
        for (let i = 0; i < 12; i++)
            reverse(0x00DC + (i * 4), 2);
        for (let i = 0; i < 32; i++)
            reverse(0x0104 + (i * 4), 2);
        for (let i = 0; i < 27; i++)
            reverse(0x0144 + (i * 4), 4);
        reverse(0x025C, 2);
        for (let i = 0; i < 8; i++)
			for (let j = 1; j < 5; j++)
				reverse(0x02E8 + (i * 0x0C) + (j * 2), 2);
        if (buffer.length > this.SA1Size) {
			for (let i = 0; i < 11; i++)
				reverse(0x04DC + (i * 4), 4);
			for (let i = 0; i < 10; i++)
				reverse(0x0526 + (i * 2), 2);
			for (let i = 0; i < 6; i++)
				reverse(0x053C + (i * 4), 4);
			reverse(0x056C, 4);
		}
		return buffer;
    }
    
    dci2vms(buffer) {
        for (let i = this.DCIHeader; i < buffer.length; i += 4) {
            buffer.subarray(i, i + 4).reverse();
        }
        return buffer;
    }
    
    menu() {
        const app = document.getElementById("app");
        const slot = document.getElementById("slot");
        const tabs_sa1_html = `
        <div>
            <h2>SA1 Tabs:</h2>
            <select id="tabs_sa1">
                <option value="Sonic Adventure">Sonic Adventure</option>
                <option value="Sonic Adventure DX">Sonic Adventure DX</option>
            </select>
            <select id="sa1subtabs">
                <option value="General">General</option>
            </select>
        </div>`;
        app.innerHTML = `${tabs_sa1_html}<div id="sa1div"></div>`;
        const tabs_sa1 = document.getElementById("tabs_sa1");
        const sa1subtabs = document.getElementById("sa1subtabs");
        const sa1div = document.getElementById("sa1div");
        function tab_sel() {
            switch (tabs_sa1.value) {
                case "Sonic Adventure": {
                    sa1subtabs.innerHTML = `
                    <option value="General">General</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Action Stages">Action Stages</option>
                    <option value="Sub Games">Sub Games</option>
                    <option value="Extra Emblems">Extra Emblems</option>
                    <option value="Story Flags">Story Flags</option>
                    <option value="Cutscene Flags">Cutscene Flags</option>
                    <option value="Level Clear Counts">Level Clear Counts</option>
                    `;
                    tabs.create_general();
                    break;
                }
                case "Sonic Adventure DX": {
                    sa1subtabs.innerHTML = `
                    <option value="General DX">General</option>
                    <option value="Missions">Missions</option>
                    <option value="Metal Sonic">Metal Sonic</option>
                    `;
                    tabs.create_general_dx();
                    break;
                }
            }
        }
        tabs_sa1.addEventListener("change", () => tab_sel());
        function subtab_sel() {
            switch (sa1subtabs.value) {
                case "General": {
                    tabs.create_general();
                    break;
                }
                case "Adventure": {
                    tabs.create_adventure();
                    break;
                }
                case "Extra Emblems": {
                    tabs.create_extra_emblems();
                    break;
                }
                case "Story Flags": {
                    tabs.create_story_flags();
                    break;
                }
                case "Cutscene Flags": {
                    tabs.create_cutscene_flags();
                    break;
                }
                case "Level Clear Counts": {
                    tabs.create_level_clear_counts();
                    break;
                }
                case "General DX": {
                    tabs.create_general_dx();
                    break;
                }
                case "Missions": {
                    tabs.create_missions();
                    break;
                }
                default: {
                    sa1div.innerHTML = "";
                    break;
                }
            }
        }
        sa1subtabs.addEventListener("change", () => subtab_sel());
        slot.addEventListener("change", () => subtab_sel());
        tab_sel();
    }
    
    // ToDo
    suggestedName(version) {
        if (version.contains("dc")) {
            return "SONICADV_INT.vms";
        }
        if (version.contains("gc")) {
            return "SonicDX01.gci";
        }
        return "SonicDX01.snc";
    }
    
    get slot() {
        return this.slots[document.getElementById("slot").value];
    }
    
    toString() {
        return `SA1(
    Slot 1 (
        Playtime: ${this.slots[0].get_playtime()},
        Messages: ${this.MessageOptions[(this.slots[0].options.value >> 1) & 1]},
        Voice Language: ${this.VoiceLanguages[(this.slots[0].options.value >> 2) & 3]},
        Text Language: ${this.TextLanguages[(this.slots[0].options.value >> 4) & 7]},
    ),
    Slot 2 (
        Playtime: ${this.slots[1].get_playtime()},
        Messages: ${this.MessageOptions[(this.slots[1].options.value >> 1) & 1]},
        Voice Language: ${this.VoiceLanguages[(this.slots[1].options.value >> 2) & 3]},
        Text Language: ${this.TextLanguages[(this.slots[1].options.value >> 4) & 7]},
    ),
    Slot 3 (
        Playtime: ${this.slots[2].get_playtime()},
        Messages: ${this.MessageOptions[(this.slots[2].options.value >> 1) & 1]},
        Voice Language: ${this.VoiceLanguages[(this.slots[2].options.value >> 2) & 3]},
        Text Language: ${this.TextLanguages[(this.slots[2].options.value >> 4) & 7]},
    ),
)`;
    }
}

class SA1Slot {
    constructor(buffer) {
        this.buffer = buffer;
        this.data = new DataView(buffer.buffer);
        this.parse_data();
    }
    
    parse_data() {
        // SA1
        this.checksum = new dt.U16(0x0000, this.data);
        this.playtime = new dt.U32(0x0004, this.data);
        this.level_scores = dt.Array(dt.U32, 32, 0x0008, this.data);
        this.level_times = [];
        for (let i = 0; i < 28; i++) {
            this.level_times.push(
                dt.Array(dt.U8, 3, 0x0088+i*0x03, this.data),
            );
        }
        this.level_weights = [];
        for (let i = 0; i < 4; i++) {
            this.level_weights.push(
                dt.Array(dt.U16, 3, 0x00DC+i*0x06, this.data),
            );
        }
        this.level_rings = dt.Array(dt.U16, 32, 0x0104, this.data);
        this.sky_chase_1_scores = [];
        for (let i = 0; i < 2; i++) {
            this.sky_chase_1_scores.push(
                dt.Array(dt.S32, 3, 0x0144+i*0x0C, this.data),
            );
        }
        this.sky_chase_2_scores = [];
        for (let i = 0; i < 2; i++) {
            this.sky_chase_2_scores.push(
                dt.Array(dt.S32, 3, 0x015C+i*0x0C, this.data),
            );
        }
        this.ice_cap_scores = [];
        for (let i = 0; i < 2; i++) {
            this.ice_cap_scores.push(
                dt.Array(dt.S32, 3, 0x0174+i*0x0C, this.data),
            );
        }
        this.sand_hill_scores = [];
        for (let i = 0; i < 2; i++) {
            this.sand_hill_scores.push(
                dt.Array(dt.S32, 3, 0x018C+i*0x0C, this.data),
            );
        }
        this.hedgehog_hammer_scores = dt.Array(dt.S32, 3, 0x01A4, this.data);
        this.twinkle_circuit_times = dt.Array(dt.U8, 90, 0x01B0, this.data);
        this.twinkle_circuit_times = [];
        for (let i = 0; i < 6; i++) {
            this.twinkle_circuit_times.push({
                "best_times": [
                    dt.Array(dt.U8, 3, 0x01B0+i*0x0F+0x00, this.data),
                    dt.Array(dt.U8, 3, 0x01B0+i*0x0F+0x03, this.data),
                    dt.Array(dt.U8, 3, 0x01B0+i*0x0F+0x06, this.data),
                ],
                "lap1_time": dt.Array(dt.U8, 3, 0x01B0+i*0x0F+0x09, this.data),
                "lap2_time": dt.Array(dt.U8, 3, 0x01B0+i*0x0F+0x0C, this.data),
            });
        }
        this.boss_times = [];
        for (let i = 0; i < 6; i++) {
			this.boss_times[i] = [];
			for (let j = 0; j < 3; j++) {
				this.boss_times[i].push(
					dt.Array(dt.U8, 3, 0x020A+i*0x09, this.data),
				);
			}
        }
        this.emblems = dt.Array(dt.U8, 17, 0x0240, this.data);
        this.options = new dt.U8(0x0251, this.data);
        this.lives = dt.Array(dt.U8, 7, 0x0252, this.data);
        this.last_character = new dt.U8(0x0259, this.data);
        this.rumble = new dt.U8(0x025A, this.data);
        this.last_level = new dt.U16(0x025C, this.data);
        this.story_flags = dt.Array(dt.U8, 64, 0x0260, this.data);
        this.cutscene_flags = dt.Array(dt.U8, 64, 0x02A0, this.data);
        this.adventure_mode = [];
        for (let i = 0; i < 8; i++) {
            this.adventure_mode.push({
                "time_of_day": new dt.U8(0x02E8+i*0x0C+0x00, this.data),
                "current_sequence": new dt.S16(0x02E8+i*0x0C+0x02, this.data),
                "next_sequence": new dt.S16(0x02E8+i*0x0C+0x04, this.data),
                "entrance": new dt.U16(0x02E8+i*0x0C+0x06, this.data),
                "act": new dt.U8(0x02E8+i*0x0C+0x08, this.data),
                "level": new dt.U8(0x02E8+i*0x0C+0x09, this.data),
                "destination": new dt.S16(0x02E8+i*0x0C+0x0A, this.data),
            });
        }
        this.level_clear_counts = [];
        for (let i = 0; i < 8; i++) {
            this.level_clear_counts.push(
                dt.Array(dt.U8, 43, 0x0348+i*0x2B, this.data),
            );
        }
        // SADX
        this.missions = dt.Array(dt.U8, 60, 0x04A0, this.data);
        this.black_market_rings = new dt.U32(0x04DC, this.data);
        this.metal_level_scores = dt.Array(dt.U32, 10, 0x04E0, this.data);
        this.metal_level_times = [];
        for (let i = 0; i < 10; i++) {
            this.metal_level_times.push(
                dt.Array(dt.U8, 3, 0x0508+i*0x03, this.data),
            );
        }
        this.metal_level_rings = dt.Array(dt.U16, 10, 0x0526, this.data);
        this.metal_ice_cap_scores = dt.Array(dt.U32, 3, 0x053C, this.data);
        this.metal_sand_hill_scores = dt.Array(dt.U32, 3, 0x0548, this.data);
        this.metal_twinkle_circuit_times = dt.Array(dt.U8, 15, 0x0554, this.data);
        this.metal_twinkle_circuit_times = {
            "best_times": [
                dt.Array(dt.U8, 3, 0x0554+0x00, this.data),
                dt.Array(dt.U8, 3, 0x0554+0x03, this.data),
                dt.Array(dt.U8, 3, 0x0554+0x06, this.data),
            ],
            "lap1_time": dt.Array(dt.U8, 3, 0x0554+0x09, this.data),
            "lap2_time": dt.Array(dt.U8, 3, 0x0554+0x0C, this.data),
        };
		this.metal_boss_times = [];
        for (let i = 0; i < 3; i++) {
    		this.metal_boss_times.push(
    		    dt.Array(dt.U8, 3, 0x0563+i*0x03, this.data),
    		);
        }
		this.metal_emblems = dt.Array(dt.U8, 4, 0x056C, this.data);
    }
    
    get_playtime(fps = 60) {
        return [
            Math.floor(Math.floor(this.playtime.value / fps) / 3600),
            Math.floor((Math.floor(this.playtime.value / fps) % 3600) / 60),
            (Math.floor(this.playtime.value / fps) % 3600) % 60,
            this.playtime.value % fps,
            Math.floor((this.playtime.value % fps * 100) / 60),
        ];
    }
    
    set_playtime(hours, minutes, seconds, fraction, fps = 60) {
        this.playtime.value = (hours * 3600 + minutes * 60 + seconds) * fps + fraction;
    }
}
