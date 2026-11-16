export function create_general() {
    const sa1div = document.getElementById("sa1div");
    const playtime = create_playtime();
    sa1div.innerHTML = `
    <div>
        ${playtime}
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
}
