/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */

import {events} from "bdsx/event";
import {MinecraftPacketIds} from "bdsx/bds/packetids";
import {serverInstance} from "bdsx/bds/server";
import {TextPacket} from 'bdsx/bds/packets';
import {sendHelp, sendSpecical} from "../ChatManager/MessageManager";
// @ts-ignore
import osu = require('node-os-utils');
import {Actor} from "bdsx/bds/actor";
import {channel, client, connectionList, sendMessage, system, WebHook, webhook} from "../BDScord";
import {getRuntimeEntity} from "../Hooks/hookedFunction";

system.listenForEvent("minecraft:player_destroyed_block", (ev) => {
    if (ev.data.player.__identifier__ == "minecraft:player") {
        let playerName = system.getComponent(ev.data.player, "minecraft:nameable")!.data.name
        system.executeCommand(`scoreboard players add " ${playerName}" "Blocks Mined" 1`, () => {
        });
    }
})

events.serverClose.on(() => {
    sendSpecical("Server Info:", "**The Server has shutdown!**", "#9b1010", false);
    client.destroy();
});

events.playerJoin.on((ev) => {
    webhook.send(new WebHook.MessageBuilder()
        .setName(ev.player.getName())
        .setDescription(`**${ev.player.getName()} Joined the game**`)
        .setColor("#456789"));
});

events.networkDisconnected.on(networkIdentifier => {
    const id = connectionList.get(networkIdentifier);
    connectionList.delete(networkIdentifier);
    webhook.send(new WebHook.MessageBuilder()
        .setName(id)
        .setDescription(`**${id} left the game**`)
        .setColor("#456789"));
});


events.packetBefore(MinecraftPacketIds.Interact).on((ev, networkIdentifier) => {
    let actor: Actor = getRuntimeEntity(serverInstance.minecraft.getLevel(), ev.actorId, false);

    serverInstance.minecraft.something
    console.log(actor.toString())

    //  actor.getIdentifier()
    //  tellAllRaw(JSON.stringify(actor.toJSON()))
    /*
    const getRuntimeEntity = hacker.hooking('Level::getRuntimeEntity',
        ActorRuntimeID,bool_t)(
        (Level,ev.actorId)=>{

            //sendText(gamemode.actor.getNetworkIdentifier(), `${item.getName()} using at ${blockpos.x} ${blockpos.y} ${blockpos.z}`);
            return getRuntimeEntity(ev.actorId,false);
        });

    */


})

events.packetBefore(MinecraftPacketIds.Text).on((ev, networkIdentifier) => {
    if (ev.message.includes("@everyone") || ev.message.includes("@here")) {
        let packet = TextPacket.create();
        packet.message = `§4This message contains a §e@everyone§r or §e@here§r and has been blocked from being sent`
        for (const i of serverInstance.minecraft.getLevel().players.toArray()) {
            if (i.getName() === connectionList.get(networkIdentifier))
                i.sendPacket(packet);
        }
        packet.dispose()
        return;
    }
    let emojiesArray: string[] = channel.guild.emojis.map(e => e.toString()).join(" ").split(' ');
    let a: string = ev.message;
    let length = emojiesArray.length;
    while (length--) {
        if (!(a.indexOf(emojiesArray[length].substring(emojiesArray[length].indexOf(":"), emojiesArray[length].lastIndexOf(":") + 1).toLowerCase()) === -1)) {
            for (let i = 0; i < emojiesArray.length; i++) {
                let find = emojiesArray[i].substring(emojiesArray[i].indexOf(":"), emojiesArray[i].lastIndexOf(":") + 1).toLowerCase();
                let replace = emojiesArray[i]
                if (a.includes(find) && !a.includes(`<${find}`)) {
                    a = a.replace(find, replace);
                }
            }
        }
    }
    sendMessage(a, ev.name);
})

system.listenForEvent("minecraft:entity_death", (ev) => {
    try {
        if (ev.data.entity.__identifier__ === null || !ev.data.entity || ev.data.entity.__identifier__ !== "minecraft:player")
            return;
        system.executeCommand(`scoreboard players add " ${system.getComponent(ev.data.entity, "minecraft:nameable")!.data.name}" "Deaths" 1`, () => {
        });
    } catch (a) {
    }
})

system.listenForEvent("minecraft:entity_death", (ev) => {
    try {

        if (ev.data.killer.__identifier__ == "minecraft:player") {
            system.executeCommand(`scoreboard players add " ${system.getComponent(ev.data.killer, "minecraft:nameable")!.data.name}" "Mobs Killed" 1`, () => {
            });
        }
    } catch (a) {
    }
    if (ev.data.entity.__identifier__ == "minecraft:player") {
        let playerName = system.getComponent(ev.data.entity, "minecraft:nameable")!.data.name
        let killer = ev.data.killer
        if (!ev.data.killer) {
            sendMessage(`${playerName} died`, playerName)
        } else if (killer.__identifier__ == "minecraft:player") {
            let killerName = system.getComponent(killer, "minecraft:nameable")!.data.name
            sendMessage(`${playerName} was slain by ${killerName}`, playerName)
        } else {
            sendMessage(`${playerName} was slain by a ${killer.__identifier__.substring(10)}`, playerName)//`a ${killer.__identifier__.substring(10)} killed ${playerName}`
        }
    }

})

