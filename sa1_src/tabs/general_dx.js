export function create_general_dx() {
    const sa1div = document.getElementById("sa1div");
    const black_market_rings = `
    <div>
        <label style="display: flex; align-items: center; gap: 10px">
            Black Market Rings:
            <input
                type="number"
                id="black_market_rings"
                value=${sa1.slot.black_market_rings.value}
                min=0
                max=${0x7FFFFFFF}
                step=1
            >
        </label>
    </div>`;
    sa1div.innerHTML = `
    <div>
        ${black_market_rings}
    </div>`;
    general_dx_callbacks();
}

function general_dx_callbacks() {
    const black_market_rings = document.getElementById("black_market_rings");
    black_market_rings.addEventListener("change", () => {
        if (black_market_rings.validity.valid)
            sa1.slot.black_market_rings.value = black_market_rings.value;
        black_market_rings.value = sa1.slot.black_market_rings.value;
    });
}
