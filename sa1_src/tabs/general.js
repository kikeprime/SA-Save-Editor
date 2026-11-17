export function create_general() {
    const sa1div = document.getElementById("sa1div");
    const playtime = create_playtime();
	const messages = `
	<div id="messages">
		<h3>Messages:</h3>
		<div style="display: flex; align-items: center; gap: 20px">
			<label style="display: flex; align-items: center; gap: 10px">
				<input
					type="radio"
					name="messages"
					value=0
					${((sa1.slot.options.value >> 1) & 1) == 0 ? "checked" : ""}
				>
				Voice and Text
			</label>
			<label style="display: flex; align-items: center; gap: 10px">
				<input
					type="radio"
					name="messages"
					value=1
					${((sa1.slot.options.value >> 1) & 1) == 1 ? "checked" : ""}
				>
				Voice Only
			</label>
		</div>
	</div>`;
	const voice_lang = `
	<div id="voice_lang">
		<h3>Voice Language:</h3>
		<div style="display: flex; align-items: center; gap: 20px">
			${
				sa1.VoiceLanguages.map((label, value) => `
				<label style="display: flex; align-items: center; gap: 10px">
					<input
						type="radio"
						name="voice_lang"
						value=${value}
						${((sa1.slot.options.value >> 2) & 3) == value ? "checked" : ""}
					>
					${label}
				</label>`)
					.join("")
			}
		</div>
	</div>`;
	const text_lang = `
	<div id="text_lang">
		<h3>Text Language:</h3>
		<div style="display: flex; align-items: center; gap: 20px">
			${
				sa1.TextLanguages.map((label, value) => `
				<label style="display: flex; align-items: center; gap: 10px">
					<input
						type="radio"
						name="text_lang"
						value=${value}
						${((sa1.slot.options.value >> 4) & 7) == value ? "checked" : ""}
					>
					${label}
				</label>`)
					.join("")
			}
		</div>
	</div>`;
	const rumble = `
	<div>
		<label style="display: flex; align-items: center; gap: 10px">
			Rumble:
			<input
				type="checkbox"
				id="rumble"
				${sa1.slot.rumble.value ? "checked" : ""}
			>
		</label>
	</div>`;
	const last_char_options = [
		"Sonic",
		"Sonic (Default voice)",
		"Tails",
		"Knuckles",
		"Sonic (Default voice)",
		"Amy",
		"Gamma",
		"Big",
		"Sonic (Eggman's voice)",
		"Sonic (Tikal's voice)",
	];
	const last_character = `
	<div>
		<h3>Last Character:</h3>
		<select id="last_character">
			${
				last_char_options
					.map((label, value) => `<option value=${value}>${label}</option>`)
					.join("")
			}
		</select>
	</div>`;
	const level_options = sa1.level_list
		.map((label, value) => `<option value=${label == "None" ? 100 : value}>${label}</option>`)
		.join("")
	const last_level = `
	<div>
		<h3>Last Level:</h3>
		<select id="last_level">
			${level_options}
		</select>
	</div>`;
    sa1div.innerHTML = `
    <div>
        ${playtime}
		${messages}
		${voice_lang}
		${text_lang}
		${rumble}
		${last_character}
		${last_level}
    </div>`;
    general_callbacks();
}

function create_playtime() {
    const playtime = sa1.slot.get_playtime();
    return `
    <h3>Playtime:</h3>
    <div id="playtime" style="display: flex; gap: 20px">
        <input
            type="number"
            id="hours"
            min=0
            max=400
            step=1
            value=${playtime[0]}
        >
        <input
            type="number"
            id="minutes"
            min=0
            max=59
            step=1
            value=${playtime[1]}
        >
        <input
            type="number"
            id="seconds"
            min=0
            max=59
            step=1
            value=${playtime[2]}
        >
        <input
            type="number"
            id="fraction"
            min=0
            max=59
            step=1
            value=${playtime[3]}
        >
        <input
            type="number"
            id="centiseconds"
            min=0
            max=99
            step=1
            value=${playtime[4]}
            disabled=true
        >
    </div>`;
}

function playtime_callbacks() {
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const fraction = document.getElementById("fraction");
    const centiseconds = document.getElementById("centiseconds");
    function update_playtime() {
        if (
            hours.validity.valid &&
            minutes.validity.valid &&
            seconds.validity.valid &&
            fraction.validity.valid
        ) {
            sa1.slot.playtimes[0] = sa1.slot.set_playtime(
                Number(hours.value),
                Number(minutes.value),
                Number(seconds.value),
                Number(fraction.value),
            );
        }
        const [h, m, s, f, cs] = sa1.slot.get_playtime(sa1.slot.playtimes[0]);
        hours.value = h;
        minutes.value = m;
        seconds.value = s;
        fraction.value = f;
        centiseconds.value = cs;
    }
    hours.addEventListener("change", update_playtime);
    minutes.addEventListener("change", update_playtime);
    seconds.addEventListener("change", update_playtime);
    fraction.addEventListener("change", update_playtime);
}

function general_callbacks() {
    playtime_callbacks();
	const messages = document.getElementById("messages");
    messages.addEventListener("change", (e) => {
        sa1.slot.options.value &= ~(1 << 1);
        sa1.slot.options.value |= (e.target.value << 1);
    });
	const voice_lang = document.getElementById("voice_lang");
    voice_lang.addEventListener("change", (e) => {
        sa1.slot.options.value &= ~(3 << 2);
        sa1.slot.options.value |= (e.target.value << 2);
    });
	const text_lang = document.getElementById("text_lang");
    text_lang.addEventListener("change", (e) => {
        sa1.slot.options.value &= ~(7 << 4);
        sa1.slot.options.value |= (e.target.value << 4);
    });
	const rumble = document.getElementById("rumble");
    rumble.addEventListener("change", () => {
		if (rumble.checked)
			sa1.slot.rumble.value = 1;
		else
			sa1.slot.rumble.value = 0;
    });
	const last_character = document.getElementById("last_character");
	last_character.value = sa1.slot.last_character.value;
	last_character.addEventListener("change", () => {
		sa1.slot.last_character.value = last_character.value;
	});
	const last_level = document.getElementById("last_level");
	last_level.value = sa1.slot.last_level.value;
	last_level.addEventListener("change", () => {
		sa1.slot.last_level.value = last_level.value;
	});
}
