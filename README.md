# Sonic Adventure Save Editor Online
List of supported games:
- Sonic Adventure Dreamcast: Japan, USA, International (JP rerelease)
- Sonic Adventure DX: Director's Cut GameCube: Japan, USA, Europe
- Sonic Adventure DX: Director's Cut GameCube Preview
- Sonic Adventure DX: Director's Cut 2004 PC

An online save editor remake of SASave from SA Tools to create a crossplatform Sonic Adventure save editor. The projects current scope is a straightforward reimplementation of SASave. This means the following differences from my previous save editor projects. One, I'm not researching the save file myself. Two, on crosssave, a template file from SASave's repo is used to create the save file. Under the hood your loaded save file is converted to PC format which is easily converted to all versions.

The SA2 Save Utility's port is also considered but currently not planned.

Hosted via GitHub Pages at: https://kikeprime.github.io/SA-Save-Editor

# Features
## Formats
- Dreamcast .vms: Input and Output
- Dreamcast .dci: Input Only (recognized by extension; case insensitive; wasn't in SASave)
- GameCube .gci: Input and Output
- PC .snc: Input and Output

## Sonic Adventure
- Sonic Adventure:
    - General:
        - Playtime
        - Messages
        - Voice Language
        - Text Language
        - Rumble
        - Last Character
        - Last Level
    - Adventure:
        - Lives
        - Story Emblem
        - Time of Day
        - Sequence
        - Next Sequence
        - Entrance
        - Level & Act
        - Destination
    - Sub Games:
        - Sky Chase Act 1 & 2:
            - Emblems
            - High Scores for Sonic & Tails
        - Ice Cap:
            - Ice Cap Snowboarding doesn't have Emblems. It's not missing.
            - High Scores for Sonic & Tails
        - Sand Hill:
            - Emblems
            - High Scores for Sonic & Tails
        - Hedgehog Hammer:
            - Emblems
            - High Scores
        - Twinkle Circuit:
            - Emblems
            - Best Times
            - Best Lap Times
        - Boss:
            - Best Times
    - Extra Emblems:
        - Chao Race Emblems
        - Adventure Field Emblems
    - Story Flags
    - Cutscene Flags
    - Level Clear Counts
- Sonic Adventure DX:
    - General:
        - Black Market Rings
    - Missions

# Documentation
For now, `sa1_src/sa1.js` doubles as save file documentations for the respective games. It's another long term goal to create user-friendly documentations.

# Known issues
- It's heavily work in progress so expect issues.
- There are placeholder tabs that won't show anything. This isn't a bug, they just aren't implemented yet.

# Special thanks
- The X-Hax community for SASave and the tons of help I got when I actively modded SA1&2
- This project wouldn't have come to light if I wasn't working on KHSE, KHSE Online and Orbal SE Online so I include those thanks here
- unknowndatax: Ys VIII Save Editor for the Yamaneko Engine checksum algorithm
- Xeeynamo: [Kingdom Save Editor](https://github.com/Xeeynamo/KingdomSaveEditor) the main inspiration of the KHSE project
- [Game Tools Collection](https://github.com/RyudoSynbios/game-tools-collection/blob/master/src/lib/templates/kingdom-hearts-ps2) for an [online PS2 KH1 save editor](https://game-tools-collection.com/kingdom-hearts-ps2/save-editor) that provided lots of used info
- GICU for providing various [KH1 flags](https://github.com/gaithern/KH1FM-RANDOMIZER/blob/36569375fa6f12074e02f6a2b9b09175e76a53cf/Static%20Files/scripts/1fmRandoSendAPLocations.lua) like the treasure chests and other helps
- dedede123 & fungualtissue1230 for the PowerShell script to decrypt and encrypt the KH3 PC save files
- The OpenKH community for various helps including modding the KH games
- The RetroAchievements community for the Code Notes and the fun sets and not just the KH ones
- The [Kiseki Wiki](https://kiseki.fandom.com) for both being helpful with my runs and so I don't have type the quest progress flag labels myself.
