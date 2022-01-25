/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */

import {Actor, ActorRuntimeID} from "bdsx/bds/actor";
import {Level} from "bdsx/bds/level";
import {bool_t, void_t, uint8_t, CxxString, uint64_as_float_t, int32_t} from "bdsx/nativetype";
import {Player} from "bdsx/bds/player";

import {symHook} from "./SymHook";
import {Packet} from "bdsx/bds/packet";
import {SurvivalMode} from "bdsx/bds/gamemode";
import {BlockPos} from "bdsx/bds/blockpos";
import {tellAllRaw} from "../ChatManager/MessageManager";
import {command} from "bdsx/command";
import {NativeClass, nativeClass} from "bdsx/nativeclass";
import {serverInstance} from "bdsx/bds/server";

/**
 * hacker.js("symbol:symbool", returnType, options or null "ex) {this:thisType}",  paramtype1, paramtype2);
 */
export let getRuntimeEntity = symHook.js("Level::getRuntimeEntity", Actor, null, Level, ActorRuntimeID, bool_t);

@nativeClass(null)
class LevelData extends NativeClass {
}

export let getLevelData = symHook.js("Level::getLevelData", LevelData, null, Level);
export let getLevelName = symHook.js("LevelData::getLevelName", CxxString, null, LevelData);