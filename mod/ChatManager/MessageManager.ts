/**
 * BDScord - ! Pixel
 *
 */

// @ts-ignore
import {channel, webhook, WebHook} from "./BDScord";
import {TextPacket} from "bdsx/bds/packets";
import {serverInstance} from "bdsx/bds/server";
import {Config} from "../Config/config";

/*
export function sendInfo(content: string, color: string) {
    var today = new Date();
    const msg = new WebHook.MessageBuilder()
        .setName(Config.server_name)
        .setAvatar(Config.server_icon)
        .setColor(color)
        .setTitle(`Server Info:`)
        .setDescription(content)
        .setFooter(`Current time: ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`)
    webhook.send(msg);
} */
export function sendSpecical(title: string, content: string, color: string, showtime: boolean) {
    let today = new Date();
    const msg = new WebHook.MessageBuilder()
        .setName(Config.server_name)
        .setAvatar(Config.server_icon)
        .setColor(color)
        .setTitle(title)
        .setDescription(content)
        .setFooter((showtime ? `Current time: ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}` : ``))
    webhook.send(msg);
}

export function tellAllRaw(text: string) {
    const packet = TextPacket.create();
    packet.type = TextPacket.Types.Raw;
    packet.message = text;
    for (const i of serverInstance.minecraft.getLevel().players.toArray()) {
        i.sendPacket(packet);
    }
    packet.dispose();
}

export function sendHelp() {
    channel.send({
        embed: {
            color: 3447003,
            author: {
                name: Config.server_name,
                icon_url: Config.server_icon
            },
            title: "BDScord Help:",
            fields: [{
                name: "BDScord Commands:",
                value: `Current bot prefix: ${Config.bot_prefix}`
            },
                {
                    name: "help",
                    value: "displays this help sheet"
                }, {
                    name: "whitelist",
                    value: "Allows u to control the whitelist of the current server. Arguments include **on**, **off**, **add**, **remove**, **list**"
                }, {
                    name: "list",
                    value: "Displays all the current players online"
                }, {
                    name: "stop",
                    value: "Shuts down the server"
                }, {
                    name: "scoreboard",
                    value: "Tracks people in game scoreboards. Use with arguments **Stats** and then the player name to view there stats"
                }, {
                    name: "raw",
                    value: `Allows people who have the <@&${Config.server_manager_roleID}> to input and run raw commands into the server`
                },
            ],
        }
    });
}