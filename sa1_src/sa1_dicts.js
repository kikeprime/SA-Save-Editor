import * as d from "./dicts/index.js"


export default function dicts(obj) {
    main_dicts(obj);
}

function main_dicts(obj) {
    obj.character_dict = {
        "Sonic": 0,
        "Unused": 1,
        "Tails": 2,
        "Knuckles": 3,
        "Super Sonic": 4,
        "Amy": 5,
        "E-102 Gamma": 6,
        "Big": 7,
        "None": 255,
    };
}
