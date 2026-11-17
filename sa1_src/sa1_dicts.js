import * as d from "./dicts/index.js"


export default function dicts(obj) {
    main_dicts(obj);
    d.level_dicts(obj);
}

function main_dicts(obj) {
    obj.character_dict = {
        "Sonic": 0,
        "Unused": 1,
        "Tails": 2,
        "Knuckles": 3,
        "Super Sonic": 4,
        "Amy": 5,
        "Gamma": 6,
        "Big": 7,
        "None": 255,
    };
	obj.MessageOptions = [
		"Voice and Text",
		"Voice Only",
	];
	obj.VoiceLanguages = [
		"Default",
		"Japanese",
		"English",
	];
	obj.TextLanguages = [
		"Default",
		"Japanese",
		"English",
		"French",
		"Spanish",
		"German",
	];
}
