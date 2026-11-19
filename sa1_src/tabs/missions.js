export function create_missions() {
    const sa1div = document.getElementById("sa1div");
    function row(mission, idx) {
        return `
        <tr>
            <td>Mission ${idx+1}</td>
            <td style="text-align: center">
                <input
                    type="checkbox"
                    name=${idx}
                    value=${(1 << 6)}
                    style="display: inline-block; margin: 20px"
                    ${mission & (1 << 6) ? "checked" : ""}
                >
            </td>
            <td style="text-align: center">
                <input
                    type="checkbox"
                    name=${idx}
                    value=${(1 << 0)}
                    style="display: inline-block; margin: 20px"
                    ${mission & (1 << 0) ? "checked" : ""}
                >
            </td>
            <td style="text-align: center">
                <input
                    type="checkbox"
                    name=${idx}
                    value=${(1 << 7)}
                    style="display: inline-block; margin: 20px"
                    ${mission & (1 << 7) ? "checked" : ""}
                >
            </td>
        </tr>`;
    }
    const missions = `
    <table id="missions" border="1px">
        <thead>
            <tr>
                <th>Mission</th>
                <th>Unlocked</th>
                <th>Active</th>
                <th>Complete</th>
            </tr>
        </thead>
        <tbody>
            ${sa1.slot.missions.map((mission, idx) => row(mission, idx)).join("")}
        </tbody>
    </table>`;
    sa1div.innerHTML = `
    <div>
        ${missions}
    </div>`;
    missions_callbacks();
}

function missions_callbacks() {
    const missions = document.getElementById("missions");
    missions.addEventListener("change", (e) => {
        if (e.target.checked)
            sa1.slot.missions[e.target.name] |= e.target.value;
        else
            sa1.slot.missions[e.target.name] &= ~e.target.value;
    });
}
