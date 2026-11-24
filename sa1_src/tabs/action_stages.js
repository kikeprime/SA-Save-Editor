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
    </div>`;
    const sa1astabs = document.getElementById("sa1astabs");
}
