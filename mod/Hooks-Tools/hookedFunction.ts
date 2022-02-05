/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */

import {Level} from "bdsx/bds/level";
import {bool_t, void_t, uint8_t, CxxString, uint64_as_float_t, int32_t} from "bdsx/nativetype";


import {symHook} from "./SymHook";
import {NativeClass, nativeClass} from "bdsx/nativeclass";

/**
 * hacker.js("symbol:symbool", returnType, options or null "ex) {this:thisType}",  paramtype1, paramtype2);
 */
//export let getRuntimeEntity = symHook.js("Level::getRuntimeEntity", Actor, null, Level, ActorRuntimeID, bool_t);

@nativeClass(null)
class LevelData extends NativeClass {
}

export let getLevelData = symHook.js("Level::getLevelData", LevelData, null, Level);
export let getLevelName = symHook.js("LevelData::getLevelName", CxxString, null, LevelData);

