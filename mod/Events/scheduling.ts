/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */

import {events} from "bdsx/event";
import {MinecraftPacketIds} from "bdsx/bds/packetids";
import {serverInstance} from "bdsx/bds/server";
import {TextPacket} from 'bdsx/bds/packets';
import {sendSpecical} from "../ChatManager/MessageManager";
import {channel, client, connectionList, discordClient, sendMessage, system} from "../BDScord";
// @ts-ignore
import {Webhook} from "discord-webhook-ts";


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
    const requestBody: Webhook.input.POST =
        {
            username: ev.player.getName(),
            embeds: [
                {
                    description: `**${ev.player.getName()} Joined the game**`,
                    color: parseInt("#456789".substr(1), 16),
                }
            ]

        }
    discordClient.execute(requestBody);

});

events.networkDisconnected.on(networkIdentifier => {
    const id = connectionList.get(networkIdentifier);
    connectionList.delete(networkIdentifier);
    const requestBody: Webhook.input.POST =
        {
            username:id,
            embeds: [
                {
                    description: `**${id} left the game**`,
                    color: parseInt("#456789".substr(1), 16),
                }
            ]

        }
    discordClient.execute(requestBody);
});

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

