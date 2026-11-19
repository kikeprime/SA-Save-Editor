import * as ini from "https://cdn.jsdelivr.net/npm/ini@7.0.0/+esm"

export async function flags_dicts(obj) {
    obj.story_flag_dict = {};
    obj.cutscene_flag_dict = {};
    for (let i = 0; i < 0x200; i++) {
        obj.story_flag_dict[i] = "Unknown";
        obj.cutscene_flag_dict[i] = "Unused";
    }
    const story_flag_ini = await (await fetch("../../assets/StoryFlags.ini")).text();
    const story_flag_dict = ini.parse(story_flag_ini);
    obj.story_flag_dict = {
        ...obj.story_flag_dict,
        ...story_flag_dict,
    };
    const cutscene_flag_ini = await (await fetch("../../assets/CutsceneFlags.ini")).text();
    const cutscene_flag_dict = ini.parse(cutscene_flag_ini);
    obj.cutscene_flag_dict = {
        ...obj.cutscene_flag_dict,
        ...cutscene_flag_dict,
    };
}
