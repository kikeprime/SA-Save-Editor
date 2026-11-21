export function create_sub_games() {
    const sa1div = document.getElementById("sa1div");
    sa1div.innerHTML = `
    <div>
        <select id="sa1sgtabs">
            <option value="Sky Chase Act 1">Sky Chase Act 1</option>
            <option value="Sky Chase Act 2">Sky Chase Act 2</option>
            <option value="Ice Cap">Ice Cap</option>
            <option value="Sand Hill">Sand Hill</option>
            <option value="Hedgehog Hammer">Hedgehog Hammer</option>
        </select>
        <div id="sa1sgdiv"></div>
    </div>`;
    const sa1sgtabs = document.getElementById("sa1sgtabs");
    function tab_sel() {
        switch(sa1sgtabs.value) {
            case "Sky Chase Act 1": {
                create_sky_chase(1);
                break;
            }
            case "Sky Chase Act 2": {
                create_sky_chase(2);
                break;
            }
            case "Ice Cap": {
                create_ice_cap();
                break;
            }
            case "Sand Hill": {
                create_sand_hill();
                break;
            }
            case "Hedgehog Hammer": {
                create_hedgehog_hammer();
                break;
            }
        }
    }
    sa1sgtabs.addEventListener("change", () => tab_sel());
    tab_sel();
}

function create_sky_chase(act) {
    const sa1sgdiv = document.getElementById("sa1sgdiv");
    const scores = sa1.slot["sky_chase_" + act + "_scores"];
    sa1sgdiv.innerHTML = `
    <div>
        <select id="sa1sgsctabs">
            <option value=0>Sonic</option>
            <option value=1>Tails</option>
        </select>
        <div style="display: flex">
            <div id="sky_chase_scores">
                <input
                    type="number"
                    name=0
                    value=${scores[0][0]}
                    min=0
                    max=999999
                    step=1
                >
                <input
                    type="number"
                    name=1
                    value=${scores[0][1]}
                    min=0
                    max=999999
                    step=1
                >
                <input
                    type="number"
                    name=2
                    value=${scores[0][2]}
                    min=0
                    max=999999
                    step=1
                >
            </div>
            <div id="sky_chase_emblems" style="display: flex">
                <input
                    type="checkbox"
                    class="sa1-emblem"
                    name=${act}
                    value=${act == 1 ? 0x0C1 : 0x0C2}
                    ${sa1.slot.emblems[0x0C] & (1 << (act == 1 ? 1 : 2)) ? "checked" : ""}
                >
                <input
                    type="checkbox"
                    class="sa1-emblem"
                    name=${act}
                    value=${act == 1 ? 0x0C6 : 0x0C7}
                    ${sa1.slot.emblems[0x0C] & (1 << (act == 1 ? 6 : 7)) ? "checked" : ""}
                >
            </div>
        </div>
    </div>`;
    const sa1sgsctabs = document.getElementById("sa1sgsctabs");
    const sky_chase_scores = document.getElementById("sky_chase_scores");
    sa1sgsctabs.addEventListener("change", () => {
        sky_chase_scores.querySelectorAll("input")
            .forEach(input => {
                input.value = scores[sa1sgsctabs.value][input.name];
            });
    });
    sky_chase_scores.addEventListener("change", (e) => {
        if (e.target.validity.valid)
            scores[sa1sgsctabs.value][e.target.name] = e.target.value;
        e.target.value = scores[sa1sgsctabs.value][e.target.name];
    });
    const sky_chase_emblems = document.getElementById("sky_chase_emblems");
    sky_chase_emblems.addEventListener("change", (e) => {
        const idx = Math.floor(e.target.value / 16);
        const bit = e.target.value % 16;
        if (e.target.checked)
            sa1.slot.emblems[idx] |= (1 << bit);
        else
            sa1.slot.emblems[idx] &= ~(1 << bit);
    });
}

function create_ice_cap() {
    const sa1sgdiv = document.getElementById("sa1sgdiv");
    const scores = sa1.slot.ice_cap_scores;
    sa1sgdiv.innerHTML = `
    <div>
        <select id="sa1sgictabs">
            <option value=0>Sonic</option>
            <option value=1>Tails</option>
        </select>
        <div id="ice_cap_scores">
            <input
                type="number"
                name=0
                value=${scores[0][0]}
                min=0
                max=999999
                step=1
            >
            <input
                type="number"
                name=1
                value=${scores[0][1]}
                min=0
                max=999999
                step=1
            >
            <input
                type="number"
                name=2
                value=${scores[0][2]}
                min=0
                max=999999
                step=1
            >
        </div>
    </div>`;
    const sa1sgictabs = document.getElementById("sa1sgictabs");
    const ice_cap_scores = document.getElementById("ice_cap_scores");
    sa1sgictabs.addEventListener("change", () => {
        ice_cap_scores.querySelectorAll("input")
            .forEach(input => {
                input.value = scores[sa1sgictabs.value][input.name];
            });
    });
    ice_cap_scores.addEventListener("change", (e) => {
        if (e.target.validity.valid)
            scores[sa1sgictabs.value][e.target.name] = e.target.value;
        e.target.value = scores[sa1sgictabs.value][e.target.name];
    });
}

function create_sand_hill() {
    const sa1sgdiv = document.getElementById("sa1sgdiv");
    const scores = sa1.slot.sand_hill_scores;
    sa1sgdiv.innerHTML = `
    <div>
        <select id="sa1sgshtabs">
            <option value=0>Sonic</option>
            <option value=1>Tails</option>
        </select>
        <div style="display: flex">
            <div id="sand_hill_scores">
                <input
                    type="number"
                    name=0
                    value=${scores[0][0]}
                    min=0
                    max=999999
                    step=1
                >
                <input
                    type="number"
                    name=1
                    value=${scores[0][1]}
                    min=0
                    max=999999
                    step=1
                >
                <input
                    type="number"
                    name=2
                    value=${scores[0][2]}
                    min=0
                    max=999999
                    step=1
                >
            </div>
            <div id="sand_hill_emblems" style="display: flex">
                <input
                    type="checkbox"
                    class="sa1-emblem"
                    value=${0x0C3}
                    ${sa1.slot.emblems[0x0C] & (1 << 3) ? "checked" : ""}
                >
                <input
                    type="checkbox"
                    class="sa1-emblem"
                    value=${0x0D0}
                    ${sa1.slot.emblems[0x0D] & (1 << 0) ? "checked" : ""}
                >
            </div>
        </div>
    </div>`;
    const sa1sgshtabs = document.getElementById("sa1sgshtabs");
    const sand_hill_scores = document.getElementById("sand_hill_scores");
    sa1sgshtabs.addEventListener("change", () => {
        sa1sgsctabs.querySelectorAll("input")
            .forEach(input => {
                input.value = scores[sa1sgshtabs.value][input.name];
            });
    });
    sand_hill_scores.addEventListener("change", (e) => {
        if (e.target.validity.valid)
            scores[sa1sgshtabs.value][e.target.name] = e.target.value;
        e.target.value = scores[sa1sgshtabs.value][e.target.name];
    });
    const sand_hill_emblems = document.getElementById("sand_hill_emblems");
    sand_hill_emblems.addEventListener("change", (e) => {
        const idx = Math.floor(e.target.value / 16);
        const bit = e.target.value % 16;
        if (e.target.checked)
            sa1.slot.emblems[idx] |= (1 << bit);
        else
            sa1.slot.emblems[idx] &= ~(1 << bit);
    });
}

function create_hedgehog_hammer() {
    const sa1sgdiv = document.getElementById("sa1sgdiv");
    const scores = sa1.slot.hedgehog_hammer_scores;
    sa1sgdiv.innerHTML = `
    <div style="display: flex">
        <div id="hedgehog_hammer_scores">
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
        <div id="hedgehog_hammer_emblems" style="display: flex">
            <input
                type="checkbox"
                class="sa1-emblem"
                value=${0x0C4}
                ${sa1.slot.emblems[0x0C] & (1 << 4) ? "checked" : ""}
            >
            <input
                type="checkbox"
                class="sa1-emblem"
                value=${0x0D1}
                ${sa1.slot.emblems[0x0D] & (1 << 1) ? "checked" : ""}
            >
        </div>
    </div>`;
    const hedgehog_hammer_scores = document.getElementById("hedgehog_hammer_scores");
    hedgehog_hammer_scores.addEventListener("change", (e) => {
        if (e.target.validity.valid)
            scores[e.target.name] = e.target.value;
        e.target.value = scores[e.target.name];
    });
    const hedgehog_hammer_emblems = document.getElementById("hedgehog_hammer_emblems");
    hedgehog_hammer_emblems.addEventListener("change", (e) => {
        const idx = Math.floor(e.target.value / 16);
        const bit = e.target.value % 16;
        if (e.target.checked)
            sa1.slot.emblems[idx] |= (1 << bit);
        else
            sa1.slot.emblems[idx] &= ~(1 << bit);
    });
}
