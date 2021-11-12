import {ProcHacker} from "bdsx/prochacker";
import {UNDNAME_NAME_ONLY} from "bdsx/dbghelp";
import {pdb} from "bdsx/core";


const cmds = [
    "Level::getRuntimeEntity"
];

export const symHook = ProcHacker.load('../pdbCache.ini', cmds, UNDNAME_NAME_ONLY);
pdb.close()