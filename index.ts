/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */
import {events} from "bdsx/event";
events.serverOpen.on(() => {
    require('./config');

});


/**
 * Scoreboards:
 *  "Blocks Mined"
 *  "Mobs Killed"
 *  "Deaths"
 *
 */