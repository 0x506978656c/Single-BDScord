import {Actor, ActorRuntimeID} from "bdsx/bds/actor";
import {Level} from "bdsx/bds/level";
import {bool_t} from "bdsx/nativetype";
import {symHook} from "./SymHook";

/**
 * hacker.js("LevelChunk::getBiome", returnType, options or null "ex) {this:thisType}",  paramtype1, paramtype2);
 */
export let getRuntimeEntity = symHook.js("Level::getRuntimeEntity", Actor, null, Level, ActorRuntimeID, bool_t);

