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

/**
 * hacker.js("symbol:symbool", returnType, options or null "ex) {this:thisType}",  paramtype1, paramtype2);
 */
export let getRuntimeEntity = symHook.js("Level::getRuntimeEntity", Actor, null, Level, ActorRuntimeID, bool_t);



//export let setNameTag = symHook.js("Actor::setNameTag", void_t, null, Actor, CxxString)
//symHook.hooking('PistonArmBlock::canBeSilkTouched', bool_t)(() => true)


// bool SurvivalMode::destroyBlock(BlockPos&,unsigned char); // it can be dug with the disassembler or the decompiler.
/*
export let surivalBreakBlock = symHook.js('SurvivalMode::destroyBlock', bool_t, null, SurvivalMode, BlockPos, int32_t)

export let getPlayerBlockStandingPos = symHook.js("Actor::getBlockPosCurrentlyStandingOn", BlockPos, null, Actor)
command.register("test", "Stops the server").overload((p, o) => {
    let player = o.getEntity();
    if (!player) return;

    let gamemode: SurvivalMode
    let blockpos: BlockPos = getPlayerBlockStandingPos(player);
    console.log(blockpos.toJSON())

    console.log(surivalBreakBlock(blockpos, "1".charAt(0)))
}, {});
 */

/*
// [ԭ��] public: class BlockPos __cdecl Actor::getBlockPosCurrentlyStandingOn(class Actor * __ptr64)const __ptr64
// [����] ?getBlockPosCurrentlyStandingOn@Actor@@QEBA?AVBlockPos@@PEAV1@@Z
constexpr RVA MSSYM_B1QE30getBlockPosCurrentlyStandingOnB1AA5ActorB2AAA4QEBAB1QE10AVBlockPosB2AAA5PEAV1B2AAA1Z = 0x00B9C340;
 */


/*
THook(void*, "??0AddPlayerPacket@@QEAA@AEAVPlayer@@@Z", void* pkt, Player *player) {
    auto ret = original(pkt, player);
    // yes I know this is a terrible way to update the health bar when the player comes back into view but
    // appending the nametag to the addplayer packet keeps crashing and I dont know how to fix it
    Mod::Scheduler::SetTimeOut(Mod::Scheduler::GameTick(1), [=](auto) {
        float currHealth = getAttribute(player, 7)->currentVal;
        float currAbsorption = getAttribute(player, 14)->currentVal;
        UpdateHealthBar(player, nullptr, currHealth, currAbsorption);
    });
    return ret;
}
 */


//
// [ԭ��] public: __cdecl AddPlayerPacket::AddPlayerPacket(class Player & __ptr64) __ptr64
// [����] ??0AddPlayerPacket@@QEAA@AEAVPlayer@@@Z
//constexpr RVA MSSYM_B2QQE160AddPlayerPacketB2AAA4QEAAB1AE10AEAVPlayerB3AAAA1Z = 0x006CC450;

/*
function addPlayerPacket(player: Player): any {
    console.log("xrsetfygtfgvgvkvkhgvhkjhjvk")

    return originalFunc(player);
}

// bool SurvivalMode::destroyBlock(BlockPos&,unsigned char); // it can be dug with the disassembler or the decompiler.
const originalFunc = symHook.hooking('AddPlayerPacket::AddPlayerPacket', Player, null, Packet, void_t)(addPlayerPacket);

 */