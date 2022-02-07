/**
 * BDScord - ! Pixel
 *
 */

// @ts-ignore
import {channel, discordClient, webhook, WebHook, webhookClient} from "../BDScord";
import {TextPacket} from "bdsx/bds/packets";
import {serverInstance} from "bdsx/bds/server";
import {Config} from "../Config/config";
// @ts-ignore
import {Webhook} from "discord-webhook-ts";

export function sendSpecical(title: string, content: string, color: string, showtime: boolean) {
    const requestBody: Webhook.input.POST =
        {
            username: Config.server_name,
            avatar_url: Config.server_icon,
            embeds: [
                {
                    title: title,
                    description: content,
                    color: parseInt(color.substr(1), 16),
                    footer: {
                        text: (showtime ? new Date().toLocaleString() : "")
                    }
                }
            ]

        }
    discordClient.execute(requestBody);
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
                }, {
                    name: "backup",
                    value: `Takes backups of the server's current loaded world`
                },
            ],
        }
    });
}