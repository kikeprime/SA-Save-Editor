export function create_action_stages() {
    const sa1div = document.getElementById("sa1div");
    const char_options = Object.entries(sa1.character_f_dict)
        .map(([label, value]) => `<option value=${value}>${label}</option>`)
        .join("");
    sa1div.innerHTML = `
    <div>
        <select id="sa1astabs">
            ${char_options}
        </select>
        <div id="sa1asdiv"></div>
    </div>`;
    const sa1astabs = document.getElementById("sa1astabs");
    const sa1asdiv = document.getElementById("sa1asdiv");
    function tab_sel() {
        const level_options = Object.entries(sa1.stage_dict[sa1astabs.selectedOptions[0].text])
            .map(([label, value]) => `<option value=${value}>${label}</option>`)
            .join("");
        const level_emblems = `
        <h3>Emblems:</h3>
        <div id="level_emblems" style="display: flex">
            <input
                type="checkbox"
                class="sa1-emblem"
                name=0
                value=0
            >
            <input
                type="checkbox"
                class="sa1-emblem"
                name=32
                value=0
            >
            <input
                type="checkbox"
                class="sa1-emblem"
                name=64
                value=0
            >
        </div>`;
        const level_scores = `
        <h3>Best Score:</h3>
        <input
            type="number"
            id="level_scores"
            min=0
            max=999999
            step=1
        >`;
        const level_times = sa1astabs.value == 5 ? "" : `
        <div id="level_times">
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
        const level_weights = sa1astabs.value != 5 ? "" : `
        <div style="display: flex; align-items: center; gap: 20px">
            <h3>Best Weights:</h3>
            <div id="level_weights">
                <label style="display: flex; align-items: center; gap: 5px">
                    <input
                        type="number"
                        name=0
                        min=0
                        max=999990
                        step=10
                    >
                    g
                </label>
                <label style="display: flex; align-items: center; gap: 5px">
                    <input
                        type="number"
                        name=1
                        min=0
                        max=999990
                        step=10
                    >
                    g
                </label>
                <label style="display: flex; align-items: center; gap: 5px">
                    <input
                        type="number"
                        name=2
                        min=0
                        max=999990
                        step=10
                    >
                    g
                </label>
            </div>
        </div>`;
        const level_rings = `
        <h3>Most Rings:</h3>
        <input
            type="number"
            id="level_rings"
            min=0
            max=999999
            step=1
        >`;
        sa1asdiv.innerHTML = `
        <div>
            <select id="sa1asltabs">
                ${level_options}
            </select>
            ${level_emblems}
            ${level_scores}
            ${level_times}
            ${level_weights}
            ${level_rings}
        </div>`;
        action_stages_callbacks();
    }
    sa1astabs.addEventListener("change", () => tab_sel());
    tab_sel();
}

function action_stages_callbacks() {
    const sa1asltabs = document.getElementById("sa1asltabs");
    const level_emblems = document.getElementById("level_emblems");
    level_emblems.addEventListener("change", (e) => {
        const idx = Math.floor(e.target.value / 8);
        const bit = e.target.value % 8;
        if (e.target.checked)
            sa1.slot.emblems[idx] |= (1 << bit);
        else
            sa1.slot.emblems[idx] &= ~(1 << bit);
    });
    const level_scores = document.getElementById("level_scores");
    level_scores.addEventListener("change", () => {
        if (level_scores.validity.valid)
            sa1.slot.level_scores[sa1asltabs.value] = level_scores.value;
        level_scores.value = sa1.slot.level_scores[sa1asltabs.value];
    });
    const level_times = document.getElementById("level_times");
    if (level_times) {
        level_times.addEventListener("change", (e) => {
            if (e.target.validity.valid)
                sa1.slot.level_times[sa1asltabs.value][e.target.name] = e.target.value;
            e.target.value = sa1.slot.level_times[sa1asltabs.value][e.target.name];
        });
    }
    const level_weights = document.getElementById("level_weights");
    if (level_weights) {
        level_weights.addEventListener("change", (e) => {
            if (e.target.validity.valid)
                sa1.slot.level_weights[sa1asltabs.value-0x1C][e.target.name] = e.target.value / 10;
            e.target.value = sa1.slot.level_weights[sa1asltabs.value-0x1C][e.target.name] * 10;
        });
    }
    const level_rings = document.getElementById("level_rings");
    level_rings.addEventListener("change", () => {
        if (level_rings.validity.valid)
            sa1.slot.level_rings[sa1asltabs.value] = level_rings.value;
        level_rings.value = sa1.slot.level_rings[sa1asltabs.value];
    });
    function level_sel() {
        const idx = Number(sa1asltabs.value);
        level_emblems.querySelectorAll("input").forEach(input => {
            input.value = Number(input.name) + idx;
            input.checked = sa1.slot.emblems[Math.floor(input.value / 8)] & (1 << input.value % 8)
        });
        level_scores.value = sa1.slot.level_scores[idx];
        if (level_times) {
            let centiseconds = 0;
            level_times.querySelectorAll("input").forEach(input => {
                if (input.name < 3) {
                    input.value = sa1.slot.level_times[idx][input.name];
                    if (input.name == 2)
                        centiseconds = Math.floor(input.value * 100 / 60);
                }
                else
                    input.value = centiseconds;
            });
        }
        if (level_weights) {
            level_weights.querySelectorAll("input").forEach(input => {
                input.value = sa1.slot.level_weights[idx-0x1C][input.name] * 10;
            });
        }
        level_rings.value = sa1.slot.level_rings[idx];
    }
    sa1asltabs.addEventListener("change", () => level_sel());
    level_sel();
}

