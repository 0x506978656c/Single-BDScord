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
    "Level::getRuntimeEntity",
    "Explosion::explode"
];


export const symHook = ProcHacker.load(path.join(fsutil.projectPath, "/plugins/single-BDScord/mod/Hooks/PDBCache.ini"), symbols, UNDNAME_NAME_ONLY);
pdb.close()