export function create_metal_sonic() {
    const sa1div = document.getElementById("sa1div");
    sa1div.innerHTML = `
    <div>
        <select id="sa1mstabs">
            <option value="Sub Games">Sub Games</option>
        </select>
        <div id="sa1msdiv"></div>
    </div>`;
    const sa1mstabs = document.getElementById("sa1mstabs");
    function tab_sel() {
        switch (sa1mstabs.value) {
            case "Sub Games": {
                create_metal_sonic_sub_games();
                break;
            }
        }
    }
    tab_sel();
}

export function create_metal_sonic_sub_games() {
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
