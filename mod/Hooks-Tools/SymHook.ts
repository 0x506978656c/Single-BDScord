/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */

import {ProcHacker} from "bdsx/prochacker";
import {UNDNAME_NAME_ONLY} from "bdsx/dbghelp";
import {pdb} from "bdsx/core";
import * as path from "path";
import {fsutil} from "bdsx/fsutil";


const symbols = [
    "LevelData::getLevelName",
    "Level::getLevelData"
];


export const symHook = ProcHacker.load(path.join(fsutil.projectPath, "/plugins/single-BDScord/mod/Hooks-Tools/PDBCache.ini"), symbols, UNDNAME_NAME_ONLY);
pdb.close()