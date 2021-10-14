/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */

import {Client, TextChannel} from "discord.js";
import {events} from "bdsx/event";
import {NetworkIdentifier} from "bdsx/bds/networkidentifier";
import {DeviceOS} from "bdsx/common";
import {MinecraftPacketIds} from "bdsx/bds/packetids";
import {bedrockServer} from "bdsx/launcher";
import {serverInstance} from "bdsx/bds/server";
import {TextPacket} from 'bdsx/bds/packets';
import {Config} from "./config";
import {Actor} from 'bdsx/bds/actor';
import {sendHelp, sendSpecical} from "./MessageManager";
import {nethook} from "bdsx/nethook";
import 'jimp';
//import Jimp = require("jimp");
// @ts-ignore
import {getBuffer, getBufferAsync} from "jimp";

import Jimp = require("jimp");


export const WebHook = require("webhook-discord")
export const webhook = new WebHook.Webhook(Config.webhook_url)

// @ts-ignore
export const client = new Client();
client.login(Config.token);
export const system = server.registerSystem(0, 0);
export let channel: TextChannel;

function sendMessage(content: string, playerName: string) {
    const msg = new WebHook.MessageBuilder().setName(playerName).setText(content);
    webhook.send(msg);
}

export const connectionList = new Map<NetworkIdentifier, string>();
// @ts-ignore
events.packetAfter(MinecraftPacketIds.Login).on((ptr, networkIdentifier, packetId) => {
    const connreq = ptr.connreq;
    if (connreq === null) return; // wrong client
    /*    Buffer.from(connreq.getJson()!.get("SkinData").value(), "base64")
        let width = connreq.getJson()!.get("SkinImageWidth").value()
        let height = connreq.getJson()!.get("SkinImageHeight").value()

        let image = new Jimp(width, height, (err: Error, image: any) => {
            if (err) throw err;
            let offset = 0;
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {

                //    let buffer = new Buffer();
                    let r = Buffer.readUInt8(offset).toString(16);
                    let g = Buffer.readUInt8(offset + 1).toString(16);
                    let b = buffer.readUInt8(offset + 2).toString(16);
                    let a = buffer.readUInt8(offset + 3).toString(16);
                    offset += 4;
                    image.setPixelColor(parseInt(`0x${r}${g}${b}${a}`, 16), x, y);
                }
            }

            image.write("test.png", (err: Error) => {
                if (err) throw err;
            })
        });
    */
    const cert = connreq.cert;
    console.log(`Connection: ${cert.getId()}>  XUID=${cert.getXuid()}, OS=${DeviceOS[connreq.getDeviceOS()] || 'UNKNOWN'}`);
    if (cert.getId()) connectionList.set(networkIdentifier, cert.getId());
});


/**
 * TODO:restart
 * TODO: skins for pfps
 * TODO: waypoint command
 * TODO: ops
 */

let whitelistArgs: string[] = ["on", "off", "add", "remove", "list"];
client.on("message", (message) => {

    if (message.channel.id !== channel.id)
        return;
    if (message.author.bot)
        return;
    if (!message.content.startsWith(Config.bot_prefix)) {
        tellAllRaw(`[§9Discord§r] ${message.author.username}: ${message.content}`);
    } else {
        let a: string[] = message.content.split(" ");
        let cmd = a[0].replace(Config.bot_prefix, "");

        switch (cmd) {
            case "whitelist": {
                if (!message.member.roles.has(Config.server_manager_roleID))
                    return;
                if (Object.values(whitelistArgs).includes(a[1])) {
                    WhitelistResponse(message.content.substr(1));
                } else {
                    sendSpecical("Error:", `Invalid format. Please run ${Config.bot_prefix}help for more info`, "#9b1010", false);
                }
                break;
            }
            case "stop": {
                if (!message.member.roles.has(Config.server_manager_roleID))
                    return;
                bedrockServer.executeCommand("stop");
                break;
            }
            case "raw": {
                if (!message.member.roles.has(Config.server_manager_roleID))
                    return;
                console.log(message.content.substring(4))
                system.executeCommand(`${message.content.substring(4)}`, result => {
                    sendSpecical("Command result:", `${result.data.statusMessage}`, "#0960d0", false);
                })
                break;
            }
            case "list": {
                list()
                break;
            }
            case "help": {
                sendHelp()
                break;
            }

            case "scoreboard": {
                if (a[1] === "stats") {
                    let objectiveNames = serverInstance.minecraft.getLevel().getScoreboard().getObjectiveNames()
                    let s: string = "";
                    for (let i = 0; i < objectiveNames.length; i++) {
                        s += `\n ${objectiveNames[i]}: ${getScore(` ${a.slice(2)}`, `${objectiveNames[i]}`)}`
                    }
                    sendSpecical(`Stats for ${a[2]}`, s, "#14a7e5", false);
                }
                break;
            }
            default: {
                sendSpecical("Error:", `Unknown command. Please run ${Config.bot_prefix}help for help`, "#9b1010", false);
                break;
            }
        }
    }

});

function getScore(target: String, objectives: string): null | number {
    let level = serverInstance.minecraft.getLevel();
    let score = level.getScoreboard();
    let obj = score.getObjective(objectives)!;
    if (obj === null) return null;
    // @ts-ignore
    let id = score.getFakePlayerScoreboardId(target);
    return obj.getPlayerScore(id).value;
}

function WhitelistResponse(command: string) {
    system.executeCommand(command, result => {
        if (command.includes(" list")) {
            let json = JSON.parse(result.data.statusMessage.substring(4, result.data.statusMessage.length - 4));
            let res = JSON.parse(JSON.stringify(json.result));
            let s: string = "";
            for (let i = 0; i < res.length; i++) {
                s += `\n - ${res[i].name}`
            }
            sendSpecical("Whitelist:", s, "#345678", false);
        } else {
            sendSpecical("Whitelist:", result.data.statusMessage, "#345678", false);
        }
    });

}

function list() {
    let s: string = "";
    for (const i of serverInstance.minecraft.getLevel().players.toArray()) {
        s += `\n - ${i.getName()}`;
    }
    sendSpecical("Current players online:", (s === "" ? "No players are online" : s), "#0c6dcb", false);
}

client.on("ready", () => {
    console.log('\x1b[32m', 'Connected Discord Bot');
    const tmpChannel = client.channels.get(Config.channel);
    if (!tmpChannel)
        throw new Error("Can't get the channel from discord");
    channel = tmpChannel as TextChannel;
    sendSpecical("Server Info:", "**The server has started up!**", "#31b40c", false);
});

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
        .setAvatar(ev.player.getSkin().skinImage.imageFormat)
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

events.packetBefore(MinecraftPacketIds.Text).on((ev) => {
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
        if (ev.data.entity.__identifier__ === null)
            return;
        if (!ev.data.entity)
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

export function tellAllRaw(text: string) {
    const packet = TextPacket.create();
    packet.type = TextPacket.Types.Raw;
    packet.message = text;
    for (const i of serverInstance.minecraft.getLevel().players.toArray()) {
        i.sendPacket(packet);
    }
    packet.dispose();
}
