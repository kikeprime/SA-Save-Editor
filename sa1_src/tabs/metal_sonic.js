export function create_metal_sonic() {
    const sa1div = document.getElementById("sa1div");
    sa1div.innerHTML = `
    <div>
        <select id="sa1mstabs">
            <option value="Action Stages">Action Stages</option>
            <option value="Sub Games">Sub Games</option>
        </select>
        <div id="sa1msdiv"></div>
    </div>`;
    const sa1mstabs = document.getElementById("sa1mstabs");
    function tab_sel() {
        switch (sa1mstabs.value) {
            case "Action Stages": {
                create_metal_sonic_action_stages();
                break;
            }
            case "Sub Games": {
                create_metal_sonic_sub_games();
                break;
            }
        }
    }
    tab_sel();
}

function create_metal_sonic_action_stages() {
    const sa1msdiv = document.getElementById("sa1msdiv");
    const level_options = Object.entries(sa1.stage_dict["Sonic"])
        .map(([label, value]) => `<option value=${value}>${label}</option>`)
        .join("");
    sa1msdiv.innerHTML = `
    <div>
        <select id="sa1msastabs">
            ${level_options}
        </select>
        <div id="sa1msasdiv"></div>
    </div>`;
    const sa1msastabs = document.getElementById("sa1msastabs");
    const sa1msasdiv = document.getElementById("sa1msasdiv");
    const metal_level_emblems = `
    <h3>Emblems:</h3>
    <div id="metal_level_emblems" style="display: flex">
        <input
            type="checkbox"
            class="sa1-metal-emblem"
            name=0
            value=0
        >
        <input
            type="checkbox"
            class="sa1-metal-emblem"
            name=1
            value=0
        >
        <input
            type="checkbox"
            class="sa1-metal-emblem"
            name=2
            value=0
        >
    </div>`;
    const metal_level_scores = `
    <h3>Best Score:</h3>
    <input
        type="number"
        id="metal_level_scores"
        min=0
        max=${0x7FFFFFFF}
        step=1
    >`;
    const metal_level_times = `
    <div id="metal_level_times">
        <h3>Best Clear Time:</h3>
        <div style="display: flex; align-items: center; gap: 20px">
            <input
                type="number"
                name=0
                min=0
                max=99
                step=1
            >
            <input
                type="number"
                name=1
                min=0
                max=59
                step=1
            >
            <input
                type="number"
                name=2
                min=0
                max=59
                step=1
            >
            <input
                type="number"
                name=3
                min=0
                max=99
                step=1
                disabled=true
            >
        </div>
    </div>`;
    const metal_level_rings = `
    <h3>Most Rings:</h3>
    <input
        type="number"
        id="metal_level_rings"
        min=0
        max=999999
        step=1
    >`;
    sa1msasdiv.innerHTML = `
    <div>
        ${metal_level_emblems}
        ${metal_level_scores}
        ${metal_level_times}
        ${metal_level_rings}
    </div>`;
    metal_sonic_action_stages_callbacks();
}

function metal_sonic_action_stages_callbacks() {
    const metal_level_emblems = document.getElementById("metal_level_emblems");
    metal_level_emblems.addEventListener("change", (e) => {
        const idx = Math.floor(e.target.value / 8);
        const bit = e.target.value % 8;
        if (e.target.checked)
            sa1.slot.metal_emblems[idx] |= (1 << bit);
        else
            sa1.slot.metal_emblems[idx] &= ~(1 << bit);
    });
    const metal_level_scores = document.getElementById("metal_level_scores");
    metal_level_scores.addEventListener("change", () => {
        if (metal_level_scores.validity.valid)
            sa1.slot.metal_level_scores[sa1msastabs.value] = metal_level_scores.value;
        metal_level_scores.value = sa1.slot.metal_level_scores[sa1msastabs.value];
    });
    const metal_level_times = document.getElementById("metal_level_times");
    metal_level_times.addEventListener("change", (e) => {
        if (e.target.validity.valid)
            sa1.slot.metal_level_times[sa1msastabs.value][e.target.name] = e.target.value;
        e.target.value = sa1.slot.metal_level_times[sa1msastabs.value][e.target.name];
        if (e.target.name == 2)
            metal_level_times.querySelector(`input[name="3"]`).value = Math.floor(e.target.value * 100 / 60);
    });
    const metal_level_rings = document.getElementById("metal_level_rings");
    metal_level_rings.addEventListener("change", () => {
        if (metal_level_rings.validity.valid)
            sa1.slot.metal_level_rings[sa1msastabs.value] = metal_level_rings.value;
        metal_level_rings.value = sa1.slot.metal_level_rings[sa1msastabs.value];
    });
    function tab_sel() {
        const idx = Number(sa1msastabs.value);
        metal_level_emblems.querySelectorAll("input").forEach(input => {
            input.value = idx * 3 + Number(input.name);
            input.checked = sa1.slot.metal_emblems[Math.floor(input.value / 8)] & (1 << input.value % 8)
        });
        metal_level_scores.value = sa1.slot.metal_level_scores[idx];
        let centiseconds = 0;
        metal_level_times.querySelectorAll("input").forEach(input => {
            if (input.name < 3) {
                input.value = sa1.slot.metal_level_times[idx][input.name];
                if (input.name == 2)
                    centiseconds = Math.floor(input.value * 100 / 60);
            }
            else
                input.value = centiseconds;
        });
        metal_level_rings.value = sa1.slot.metal_level_rings[idx];
    }
    sa1msastabs.addEventListener("change", () => tab_sel());
    tab_sel();
}

function create_metal_sonic_sub_games() {
    const sa1msdiv = document.getElementById("sa1msdiv");
    sa1msdiv.innerHTML = `
    <div>
        <select id="sa1mssgtabs">
            <option value="Ice Cap">Ice Cap</option>
            <option value="Sand Hill">Sand Hill</option>
            <option value="Twinkle Circuit">Twinkle Circuit</option>
            <option value="Boss">Boss</option>
        </select>
        <div id="sa1mssgdiv"></div>
    </div>`;
    const sa1mssgtabs = document.getElementById("sa1mssgtabs");
    function tab_sel() {
        switch(sa1mssgtabs.value) {
            case "Ice Cap": {
                create_ice_cap();
                break;
            }
            case "Sand Hill": {
                create_sand_hill();
                break;
            }
            case "Twinkle Circuit": {
                create_twinkle_circuit();
                break;
            }
            case "Boss": {
                create_boss();
                break;
            }
        }
    }
    sa1mssgtabs.addEventListener("change", () => tab_sel());
    tab_sel();
}

function create_ice_cap() {
    const sa1mssgdiv = document.getElementById("sa1mssgdiv");
    const scores = sa1.slot.metal_ice_cap_scores;
    sa1mssgdiv.innerHTML = `
    <div>
        <div id="metal_ice_cap_scores">
            <input
                type="number"
                name=0
                value=${scores[0]}
                min=0
                max=999999
                step=1
            >
            <input
                type="number"
                name=1
                value=${scores[1]}
                min=0
                max=999999
                step=1
            >
            <input
                type="number"
                name=2
                value=${scores[2]}
                min=0
                max=999999
                step=1
            >
        </div>
    </div>`;
    const metal_ice_cap_scores = document.getElementById("metal_ice_cap_scores");
    metal_ice_cap_scores.addEventListener("change", (e) => {
        if (e.target.validity.valid)
            scores[e.target.name] = e.target.value;
        e.target.value = scores[e.target.name];
    });
}

function create_sand_hill() {
    const sa1mssgdiv = document.getElementById("sa1mssgdiv");
    const scores = sa1.slot.metal_sand_hill_scores;
    sa1mssgdiv.innerHTML = `
    <div>
        <div id="metal_sand_hill_scores">
            <input
                type="number"
                name=0
                value=${scores[0]}
                min=0
                max=999999
                step=1
            >
            <input
                type="number"
                name=1
                value=${scores[1]}
                min=0
                max=999999
                step=1
            >
            <input
                type="number"
                name=2
                value=${scores[2]}
                min=0
                max=999999
                step=1
            >
        </div>
    </div>`;
    const metal_sand_hill_scores = document.getElementById("metal_sand_hill_scores");
    metal_sand_hill_scores.addEventListener("change", (e) => {
        if (e.target.validity.valid)
            scores[e.target.name] = e.target.value;
        e.target.value = scores[e.target.name];
    });
}

function create_twinkle_circuit() {
    const sa1mssgdiv = document.getElementById("sa1mssgdiv");
    sa1mssgdiv.innerHTML = `
    <div>
        <div style="display: flex; gap: 20px">
            <div id="metal_twinkle_circuit_times">
                <h3>Best Times:</h3>
                <div style="display: flex; align-items: center; gap: 10px">
                    <input
                        type="number"
                        name=0
                        value=${sa1.slot.metal_twinkle_circuit_times["best_times"][0][0]}
                        min=0
                        max=99
                        step=1
                    >
                    <input
                        type="number"
                        name=1
                        value=${sa1.slot.metal_twinkle_circuit_times["best_times"][0][1]}
                        min=0
                        max=59
                        step=1
                    >
                    <input
                        type="number"
                        name=2
                        value=${sa1.slot.metal_twinkle_circuit_times["best_times"][0][2]}
                        min=0
                        max=99
                        step=1
                    >
                </div>
                <div style="display: flex; align-items: center; gap: 10px">
                    <input
                        type="number"
                        name=3
                        value=${sa1.slot.metal_twinkle_circuit_times["best_times"][1][0]}
                        min=0
                        max=99
                        step=1
                    >
                    <input
                        type="number"
                        name=4
                        value=${sa1.slot.metal_twinkle_circuit_times["best_times"][1][1]}
                        min=0
                        max=59
                        step=1
                    >
                    <input
                        type="number"
                        name=5
                        value=${sa1.slot.metal_twinkle_circuit_times["best_times"][1][2]}
                        min=0
                        max=99
                        step=1
                    >
                </div>
                <div style="display: flex; align-items: center; gap: 10px">
                    <input
                        type="number"
                        name=6
                        value=${sa1.slot.metal_twinkle_circuit_times["best_times"][2][0]}
                        min=0
                        max=99
                        step=1
                    >
                    <input
                        type="number"
                        name=7
                        value=${sa1.slot.metal_twinkle_circuit_times["best_times"][2][1]}
                        min=0
                        max=59
                        step=1
                    >
                    <input
                        type="number"
                        name=8
                        value=${sa1.slot.metal_twinkle_circuit_times["best_times"][2][2]}
                        min=0
                        max=99
                        step=1
                    >
                </div>
            </div>
            <div id="metal_twinkle_circuit_lap_times">
                <h3>Best Lap Times:</h3>
                <div style="display: flex; align-items: center; gap: 10px">
                    Lap 1:
                    <input
                        type="number"
                        name=0
                        value=${sa1.slot.metal_twinkle_circuit_times["lap_times"][0][0]}
                        min=0
                        max=99
                        step=1
                    >
                    <input
                        type="number"
                        name=1
                        value=${sa1.slot.metal_twinkle_circuit_times["lap_times"][0][1]}
                        min=0
                        max=59
                        step=1
                    >
                    <input
                        type="number"
                        name=2
                        min=0
                        value=${sa1.slot.metal_twinkle_circuit_times["lap_times"][0][2]}
                        max=99
                        step=1
                    >
                </div>
                <div style="display: flex; align-items: center; gap: 10px">
                    Lap 2:
                    <input
                        type="number"
                        name=3
                        value=${sa1.slot.metal_twinkle_circuit_times["lap_times"][1][0]}
                        min=0
                        max=99
                        step=1
                    >
                    <input
                        type="number"
                        name=4
                        value=${sa1.slot.metal_twinkle_circuit_times["lap_times"][1][1]}
                        min=0
                        max=59
                        step=1
                    >
                    <input
                        type="number"
                        name=5
                        value=${sa1.slot.metal_twinkle_circuit_times["lap_times"][1][2]}
                        min=0
                        max=99
                        step=1
                    >
                </div>
            </div>
        </div>
    </div>`;
    const metal_twinkle_circuit_times = document.getElementById("metal_twinkle_circuit_times");
    const metal_twinkle_circuit_lap_times = document.getElementById("metal_twinkle_circuit_lap_times");
    metal_twinkle_circuit_times.addEventListener("change", (e) => {
        const name = e.target.name;
        if (e.target.validity.valid)
            sa1.slot.metal_twinkle_circuit_times["best_times"][Math.floor(name / 3)][name % 3] = e.target.value;
        e.target.value = sa1.slot.metal_twinkle_circuit_times["best_times"][Math.floor(name / 3)][name % 3];
    });
    metal_twinkle_circuit_lap_times.addEventListener("change", (e) => {
        const name = e.target.name;
        if (e.target.validity.valid)
            sa1.slot.metal_twinkle_circuit_times["lap_times"][Math.floor(name / 3)][name % 3] = e.target.value;
        e.target.value = sa1.slot.metal_twinkle_circuit_times["lap_times"][Math.floor(name / 3)][name % 3];
    });
}

function create_boss() {
    const sa1mssgdiv = document.getElementById("sa1mssgdiv");
    sa1mssgdiv.innerHTML = `
    <div>
        <div id="metal_boss_times">
            <div style="display: flex; align-items: center; gap: 10px">
                <input
                    type="number"
                    name=0
                    value=${sa1.slot.metal_boss_times[0][0]}
                    min=0
                    max=99
                    step=1
                >
                <input
                    type="number"
                    name=1
                    value=${sa1.slot.metal_boss_times[0][1]}
                    min=0
                    max=59
                    step=1
                >
                <input
                    type="number"
                    name=2
                    value=${sa1.slot.metal_boss_times[0][2]}
                    min=0
                    max=99
                    step=1
                >
            </div>
            <div style="display: flex; align-items: center; gap: 10px">
                <input
                    type="number"
                    name=3
                    value=${sa1.slot.metal_boss_times[1][0]}
                    min=0
                    max=99
                    step=1
                >
                <input
                    type="number"
                    name=4
                    value=${sa1.slot.metal_boss_times[1][1]}
                    min=0
                    max=59
                    step=1
                >
                <input
                    type="number"
                    name=5
                    value=${sa1.slot.metal_boss_times[1][2]}
                    min=0
                    max=99
                    step=1
                >
            </div>
            <div style="display: flex; align-items: center; gap: 10px">
                <input
                    type="number"
                    name=6
                    value=${sa1.slot.metal_boss_times[2][0]}
                    min=0
                    max=99
                    step=1
                >
                <input
                    type="number"
                    name=7
                    value=${sa1.slot.metal_boss_times[2][1]}
                    min=0
                    max=59
                    step=1
                >
                <input
                    type="number"
                    name=8
                    value=${sa1.slot.metal_boss_times[2][2]}
                    min=0
                    max=99
                    step=1
                >
            </div>
        </div>
    </div>`;
    const metal_boss_times = document.getElementById("metal_boss_times");
    metal_boss_times.addEventListener("change", (e) => {
        const name = e.target.name;
        if (e.target.validity.valid)
            sa1.slot.metal_boss_times[Math.floor(name / 3)][name % 3] = e.target.value;
        e.target.value = sa1.slot.metal_boss_times[Math.floor(name / 3)][name % 3];
    });
}
