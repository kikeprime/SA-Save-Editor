export function create_cutscene_flags() {
    const sa1div = document.getElementById("sa1div");
    const cutscene_flags = Object.entries(sa1.cutscene_flag_dict)
        .map(([value, label]) => `
        <tr>
            <td>
                <input
                    type="checkbox"
                    value=${value}
                    ${sa1.slot.cutscene_flags[Math.floor(value / 8)] & (1 << value % 8) ? "checked" : ""}
                >
            </td>
            <td>
                ${Number(value).toString(16).toUpperCase().padStart(4, "0")}
            </td>
            <td>
                ${label}
            </td>
        </tr>`)
        .join("");
    sa1div.innerHTML = `
    <table id="cutscene_flags">
        <thead>
            <tr>
                <td></td>
                <td>ID</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            ${cutscene_flags}
        </tbody>
    </table>`;
    cutscene_flags_callbacks();
}

function cutscene_flags_callbacks() {
    const cutscene_flags = document.getElementById("cutscene_flags");
    cutscene_flags.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", () => {
            const idx = Math.floor(input.value / 8);
            const bit = input.value % 8;
            if (input.checked)
                sa1.slot.cutscene_flags[idx] |= (1 << bit);
            else
                sa1.slot.cutscene_flags[idx] &= ~(1 << bit);
        });
    });
}
