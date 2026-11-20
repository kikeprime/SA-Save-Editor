export function create_extra_emblems() {
    const sa1div = document.getElementById("sa1div");
    function emblem(emblem_idx) {
        return `
        <input
            type="checkbox"
            class="sa1-emblem"
            value=${emblem_idx}
            ${sa1.slot.emblems[Math.floor(emblem_idx / 8)] & (1 << (emblem_idx % 8)) ? "checked" : ""}
        >`;
    }
    const chao_race = `
    <table id="chao_race" border=1>
        <tr>
            <th colspan=5>Chao Race</th>
        </tr>
        <tr>
            <td>
                ${emblem(106)}
            </td>
            <td>
                ${emblem(107)}
            </td>
            <td>
                ${emblem(108)}
            </td>
            <td>
                ${emblem(109)}
            </td>
            <td>
                ${emblem(110)}
            </td>
        </tr>
    </table>`;
    const adventure_field = `
    <table id="adventure_field" border=1>
        <tr>
            <th colspan=4>Adventure Field</th>
        </tr>
        <tr>
            <td>
                ${emblem(118)}
            </td>
            <td>
                ${emblem(119)}
            </td>
            <td>
                ${emblem(120)}
            </td>
            <td>
                ${emblem(121)}
            </td>
        </tr>
        <tr>
            <td>
                ${emblem(122)}
            </td>
            <td>
                ${emblem(123)}
            </td>
            <td>
                ${emblem(124)}
            </td>
            <td>
                ${emblem(125)}
            </td>
        </tr>
        <tr>
            <td>
                ${emblem(126)}
            </td>
            <td>
                ${emblem(127)}
            </td>
            <td>
                ${emblem(128)}
            </td>
            <td>
                ${emblem(129)}
            </td>
        </tr>
    </table>`;
    sa1div.innerHTML = `
    <div id="extra_emblems">
        ${chao_race}
        ${adventure_field}
    </div>`;
    extra_emblems_callbacks();
}

export function extra_emblems_callbacks() {
    const extra_emblems = document.getElementById("extra_emblems");
    extra_emblems.addEventListener("change", (e) => {
        const idx = Math.floor(e.target.value / 8);
        const bit = e.target.value % 8;
        if (e.target.checked)
            sa1.slot.emblems[idx] |= (1 << bit);
        else
            sa1.slot.emblems[idx] &= ~(1 << bit);
    });
}
