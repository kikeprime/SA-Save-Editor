export function create_adventure() {
    const sa1div = document.getElementById("sa1div");
    const char_options = Object.entries(sa1.character_dict)
        .filter(([label, value]) => label != "None")
        .map(([label, value]) => `<option value=${value}>${label}</option>`)
        .join("");
    const char_icons = {};
    Object.entries(sa1.character_dict)
        .filter(([label, value]) => label != "None")
        .forEach(([label, value]) => {
            const name = label == "Unused" ? "Sonic" : label;
            char_icons[value] = `<img src="./assets/${name}.png" height="48" style="margin-bottom: 10px">`
        });
    sa1div.innerHTML = `
    <div>
        <select id="sa1advtabs">
            ${char_options}
        </select>
        <div id="sa1advdiv"></div>
    </div>`;
    const sa1advtabs = document.getElementById("sa1advtabs");
    const sa1advdiv = document.getElementById("sa1advdiv");
    function tab_sel() {
        const idx = sa1advtabs.value;
        const life_idx = idx > 4 ? idx - 2 : idx == 4 ? 6 : idx > 0 ? idx - 1 : idx;
        let emblem_idx = 0x0D7;
        switch (Number(idx)) {
            case 2: {
                emblem_idx = 0x0E0;
                break;
            }
            case 3: {
                emblem_idx = 0x0E1;
                break;
            }
            case 4: {
                emblem_idx = 0x0E5;
                break;
            }
            case 5: {
                emblem_idx = 0x0E2;
                break;
            }
            case 6: {
                emblem_idx = 0x0E3;
                break;
            }
            case 7: {
                emblem_idx = 0x0E4;
                break;
            }
        }
        const lives = `
        <input
            type="number"
            id="lives"
            name=${life_idx}
            value=${sa1.slot.lives[life_idx]}
            min=0
            max=99
            step=1
        >`;
        const story_emblem = `
        <input
            type="checkbox"
            id="story_emblem"
            class="sa1-emblem"
            value=${emblem_idx}
            ${sa1.slot.emblems[Math.floor(emblem_idx / 16)] & (1 << (emblem_idx % 16)) ? "checked" : ""}
        >`;
        const adv = sa1.slot.adventure_mode[idx];
        const time_of_day = `
        <h3>Time of Day:</h3>
        <div id="time_of_day" style="display: flex; align-items: center; gap: 10px">
            <input
                type="radio"
                name="time_of_day"
                value=0
                ${adv.time_of_day.value == 0 ? "checked" : ""}
            >
            Day
            <input
                type="radio"
                name="time_of_day"
                value=1
                ${adv.time_of_day.value == 1 ? "checked" : ""}
            >
            Evening
            <input
                type="radio"
                name="time_of_day"
                value=2
                ${adv.time_of_day.value == 2 ? "checked" : ""}
            >
            Night
        </div>`;
        const current_sequence = `
        <h3>Sequence:</h3>
        <input
            type="number"
            name="current_sequence"
            value=${adv.current_sequence.value}
            min=-1
            max=${0x7FFF}
            step=1
        >`;
        const next_sequence = `
        <h3>Next Sequence:</h3>
        <input
            type="number"
            name="next_sequence"
            value=${adv.next_sequence.value}
            min=-1
            max=${0x7FFF}
            step=1
        >`;
        const entrance = `
        <h3>Entrance:</h3>
        <input
            type="number"
            name="entrance"
            value=${adv.entrance.value}
            min=-1
            max=${0x7FFF}
            step=1
        >`;
    	const level_options = sa1.level_list
		    .map((label, value) => `<option value=${label == "None" ? 100 : value}>${label}</option>`)
		    .join("")
        const level = `
        <select id="level">
            ${level_options}
        </select>`;
        const act = `
        Act
        <input
            type="number"
            name="act"
            value=${adv.act.value}
            min=0
            max=${0xFF}
            step=1
        >`;
        const destination = `
        <h3>Destination:</h3>
        <input
            type="number"
            name="destination"
            value=${adv.destination.value}
            min=-1
            max=${0x7FFF}
            step=1
        >`;
        sa1advdiv.innerHTML = `
        <div>
            <div style="display: flex; align-items: center; gap: 10px">
                ${char_icons[idx]}
                x
                ${lives}
                ${story_emblem}
            </div>
            <div id="adventure_mode">
                ${time_of_day}
                ${current_sequence}
                ${next_sequence}
                ${entrance}
                <h3>Level:</h3>
                <div style="display: flex; align-items: center; gap: 10px">
                    ${level}
                    ${act}
                </div>
                ${destination}
            </div>
        </div>`;
        adventure_callbacks(idx);
    }
    sa1advtabs.addEventListener("change", () => tab_sel());
    tab_sel();
}

function adventure_callbacks(idx) {
    const lives = document.getElementById("lives");
    lives.addEventListener("change", () => {
        if (lives.validity.valid)
            sa1.slot.lives[lives.name] = lives.value;
        lives.value = sa1.slot.lives[lives.name];
    });
    const story_emblem = document.getElementById("story_emblem");
    story_emblem.addEventListener("change", () => {
        const idx = Math.floor(story_emblem.value / 16);
        const bit = story_emblem.value % 16;
        if (story_emblem.checked)
            sa1.slot.emblems[idx] |= (1 << bit);
        else
            sa1.slot.emblems[idx] &= ~(1 << bit);
    });
    const adv = sa1.slot.adventure_mode[idx];
    const adventure_mode = document.getElementById("adventure_mode");
    adventure_mode.querySelectorAll(`input[type="number"]`).forEach(input => {
        input.addEventListener("change", () => {
            if (input.validity.valid)
                adv[input.name].value = input.value;
            input.value = adv[input.name].value;
        });
    });
    const level = document.getElementById("level");
    level.value = adv.level.value;
    level.addEventListener("change", () => {
        adv.level.value = level.value;
    });
}
