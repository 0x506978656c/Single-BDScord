/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */
import {events} from "bdsx/event";
events.serverOpen.on(() => {
    require('mod/Config/config');
});


/**
 * Scoreboards:
 *  "Blocks Mined"
 *  "Mobs Killed"
 *  "Deaths"
 *
 */