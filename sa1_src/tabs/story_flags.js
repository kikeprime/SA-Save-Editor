export function create_story_flags() {
    const sa1div = document.getElementById("sa1div");
    sa1div.innerHTML = `
    <select id="sa1sftabs">
        <option value=0>Unknown</option>
        <option value=1>General</option>
        <option value=2>Sonic</option>
        <option value=3>Tails</option>
        <option value=4>Knuckles</option>
        <option value=5>Amy</option>
        <option value=6>Gamma</option>
        <option value=7>Big</option>
    </select>
    <table>
        <tdead>
            <tr>
                <td></td>
                <td>ID</td>
                <td>Name</td>
                <td>Description</td>
            </tr>
        </tdead>
        <tbody id="story_flags">
        </tbody>
    </table>`;
    const sa1sftabs = document.getElementById("sa1sftabs");
    const story_flags = document.getElementById("story_flags");
    function tab_sel() {
        story_flags.innerHTML = Object.entries(sa1.story_flag_dict)
            .filter(([value, label]) => (value >= sa1sftabs.value * 0x40) && (value < (Number(sa1sftabs.value) + 1) * 0x40))
            .map(([value, label]) => `
            <tr>
                <td>
                    <input
                        type="checkbox"
                        value=${value}
                        ${sa1.slot.story_flags[Math.floor(value / 8)] & (1 << value % 8) ? "checked" : ""}
                    >
                </td>
                <td>
                    ${Number(value).toString(16).toUpperCase().padStart(4, "0")}
                </td>
                <td>
                    ${label.split("|")[0]}
                </td>
                <td>
                    ${label.split("|")[1] ? label.split("|")[1] : label == "Unknown" ? "" : "Unused"}
                </td>
            </tr>`)
            .join("");
        story_flags_callbacks();
    }
    sa1sftabs.addEventListener("change", () => tab_sel());
    tab_sel();
}

function story_flags_callbacks() {
    const story_flags = document.getElementById("story_flags");
    story_flags.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", () => {
            const idx = Math.floor(input.value / 8);
            const bit = input.value % 8;
            if (input.checked)
                sa1.slot.story_flags[idx] |= (1 << bit);
            else
                sa1.slot.story_flags[idx] &= ~(1 << bit);
        });
    });
}
