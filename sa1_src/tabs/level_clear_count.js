export function create_level_clear_count() {
    const sa1div = document.getElementById("sa1div");
	const char_options = Object.entries(sa1.character_dict)
		.filter(([label, value]) => label != "None")
		.map(([label, value]) => `<option value=${value}>${label}</option>`)
		.join("");
    const chars = `
    <select id="lcc_char">
		${char_options}
    </select>`;
    sa1div.innerHTML = `
    <div>
        ${chars}
		<div id="sa1lccdiv"></div>
    </div>`;
	const sa1lccdiv = document.getElementById("sa1lccdiv");
	const lcc_char = document.getElementById("lcc_char");
	function tab_sel() {
		const level_clear_count = sa1.level_list
			.filter(level => level != "None")
			.map((level, idx) => `
			<div style="display: flex; align-items: center; gap: 20px">
				${level}
				<input
					type="number"
					name=${idx}
					value=${sa1.slot.level_clear_counts[lcc_char.value][idx]}
					min=0
					max=255
					step=1
				>
			</div>`)
			.join("")
		sa1lccdiv.innerHTML = `
		<div id="level_clear_count">
			${level_clear_count}
		</div>`;
		level_clear_count_callbacks(lcc_char.value);
	}
	lcc_char.addEventListener("change", tab_sel)
	tab_sel();
}

function level_clear_count_callbacks(idx) {
    const level_clear_count = document.getElementById("level_clear_count");
    level_clear_count.addEventListener("change", (e) => {
        if (e.target.validity.valid)
            sa1.slot.level_clear_counts[idx][e.target.name] = e.target.value;
        e.target.value = sa1.slot.level_clear_counts[idx][e.target.name];
    });
}
