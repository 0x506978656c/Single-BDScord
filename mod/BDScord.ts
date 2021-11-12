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
import {Config} from "./Config/config";
import {sendHelp, sendSpecical, tellAllRaw} from "./ChatManager/MessageManager";
// @ts-ignore
import osu = require('node-os-utils');

export const WebHook = require("webhook-discord")
export const webhook = new WebHook.Webhook(Config.webhook_url)

// @ts-ignore
export const client = new Client();
client.login(Config.token)
export const system = server.registerSystem(0, 0);
export let channel: TextChannel;

export const connectionList = new Map<NetworkIdentifier, string>();
events.packetAfter(MinecraftPacketIds.Login).on((ptr, networkIdentifier,packetId) => {
    const connreq = ptr.connreq;
    if (connreq === null) return;
    const cert = connreq.cert;
    console.log(`Connection: ${cert.getId()}>  XUID=${cert.getXuid()}, OS=${DeviceOS[connreq.getDeviceOS()] || 'UNKNOWN'}`);
    if (cert.getId()) connectionList.set(networkIdentifier, cert.getId());
});

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

export function sendMessage(content: string, playerName: string) {
    const msg = new WebHook.MessageBuilder().setName(playerName).setText(content);
    webhook.send(msg);
}

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
    console.log('\x1b[32m', 'Connected Discord Bot\x1a');
    const tmpChannel = client.channels.get(Config.channel);
    if (!tmpChannel)
        throw new Error("Can't get the channel from discord");
    channel = tmpChannel as TextChannel;
    sendSpecical("Server Info:", "**The server has started up!**", "#31b40c", false);
});
