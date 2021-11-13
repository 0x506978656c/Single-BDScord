/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */
import {events} from "bdsx/event";
import * as path from "path";
import {fsutil} from "bdsx/fsutil";

events.serverOpen.on(() => {
    require(path.join(fsutil.projectPath, "/plugins/single-BDScord/mod/Config/config"))
});


/**
 * Scoreboards:
 *  "Blocks Mined"
 *  "Mobs Killed"
 *  "Deaths"
 *
 */