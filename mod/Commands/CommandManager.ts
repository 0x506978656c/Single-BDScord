/**
 * BDScord - ! Pixel
 *
 */
import {Vec3} from "bdsx/bds/blockpos";
import {TextPacket} from "bdsx/bds/packets";
import {command} from "bdsx/command";
import {bedrockServer} from "bdsx/launcher";
import {CommandRawText} from 'bdsx/bds/command';
import {tellAllRaw} from "../ChatManager/MessageManager";
import {readFileSync, writeFileSync} from "fs";
// @ts-ignore
import path = require("path");
import {fsutil} from "bdsx/fsutil";
import {channel} from "../BDScord";

command.register('waypoint', 'waypoints around the server').overload(({target}, origin) => {
    let player = origin.getEntity();
    if (!player) return;
    let a: string[] = target.text.split(" ");
    let packet = TextPacket.create();
    let wayPath = path.join(fsutil.projectPath, "/plugins/single-BDScord/mod config/waypoints.json");
    let waypoint = JSON.parse(readFileSync(wayPath).toString());
    if (a.length < 6) {
        packet.message = WaypointError();
        player.sendPacket(packet);
        packet.dispose();
        return;
    }
    switch (a[0].toLowerCase()) {
        case "add": {
            waypoint[`${a[4]}`] = {
                formalName: `${a.splice(5).join(' ')}`,
                Dim: `${player.getDimensionId()}`,
                Pos: `${(a[1] === "~" ? player.getPosition().x : a[1])} ${(a[2] === "~" ? player.getPosition().y : a[2])} ${(a[3] === "~" ? player.getPosition().z : a[3])}`
            }
            writeFileSync(wayPath, JSON.stringify(waypoint, null, 2))
            packet.message = "§aWaypoint was successfully added";
            player.sendPacket(packet);
            packet.dispose();
            break;
        }
        case "remove": {
            delete waypoint[`${a[1]}`];
            writeFileSync(wayPath, JSON.stringify(waypoint, null, 2))
            packet.message = "§aWaypoint was successfully removed"
            player.sendPacket(packet);
            packet.dispose();
            break;
        }
        case "list": {
            packet.message += "List of all waypoints:";
            for (let waya in waypoint) {
                switch (waypoint[waya].Dim) {
                    case 0:
                        packet.message += `\n§a${waypoint[waya].formalName} @ Overworld: ${waypoint[waya].Pos}§r`
                        break;
                    case 1:
                        packet.message += `\n§4${waypoint[waya].formalName} @ Nether: ${waypoint[waya].Pos}§r`
                        break;
                    case 2:
                        packet.message += `\n§e${waypoint[waya].formalName} @ End: ${waypoint[waya].Pos}§r`
                        break;
                }
            }
            player.sendPacket(packet);
            packet.dispose();
            break;
        }
        case "nearby": {
            let min = [111111111, 11111111, 11111111];
            let closestIndex: string = "";
            for (let waya in waypoint) {
                let a = waypoint[waya].Pos.split(" ")
                if ((Math.abs(a[0] - player.getPosition().x) <= min[0]) && (Math.abs(a[2] - player.getPosition().z) <= min[2])) {
                    min[0] = a[0]
                    min[2] = a[2]
                    closestIndex = waya;
                }
            }
            packet.message += `Nearest waypoint: \n`;
            switch (waypoint[closestIndex].Dim) {
                case 0:
                    packet.message += `§a${waypoint[closestIndex].formalName}:\nOverworld: ${waypoint[closestIndex].Pos}§r`
                    break;
                case 1:
                    packet.message += `§4${waypoint[closestIndex].formalName}:\nNether: ${waypoint[closestIndex].Pos}§r`
                    break;
                case 2:
                    packet.message += `§e${waypoint[closestIndex].formalName}:\nEnd: ${waypoint[closestIndex].Pos}§r`
                    break;
            }
            player.sendPacket(packet);
            packet.dispose();
            break;
        }
        case "find": {
            packet.message += waypoint[`${a[1]}`].formalName + ":\n";
            switch (waypoint[`${a[1]}`].Dim) {
                case 0:
                    packet.message += `§aOverworld: ${waypoint[`${a[1]}`].Pos}§r`
                    break;
                case 1:
                    packet.message += `§4Nether: ${waypoint[`${a[1]}`].Pos}§r`
                    break;
                case 2:
                    packet.message += `§eEnd: ${waypoint[`${a[1]}`].Pos}§r`
                    break;
            }
            player.sendPacket(packet);
            packet.dispose();
            break;
        }
        default: {
            packet.message = WaypointError();
            player.sendPacket(packet);
            packet.dispose();
        }

    }
}, {
    target: CommandRawText
});

function WaypointError() {
    return `§4Error in Waypoint command:
         Arguments:
        -add <posx> <posy> <posz> <formattedName> <formalName> 
        -remove <formattedName>
        -nearby
        -list§4`
}

command.register("stopall", "Stops the server").overload((p, o) => {
    let player = o.getEntity();
    if (!player) return;
    let packet = TextPacket.create();
    if (player.getCommandPermissionLevel() === 1) {
        tellAllRaw("§4 The server is shutting down§r")
        bedrockServer.executeCommand("stop");
    } else {
        packet.message = "You do not have the permissions to run this command";
        player.sendPacket(packet);
    }
    packet.dispose();
}, {});

command.register('blame', 'Blames someone who has messed up').overload(({target}, origin) => {
    if (!origin.getEntity()?.isPlayer()) return;
    tellAllRaw(`§2${origin.getName()}§r blamed §4 ${target.text}§r`)
}, {
    target: CommandRawText
});

/**
 * NOTE: This can only be used in 1.17.30+ as it is not implemented in api
 */
/*
const peer = serverInstance.networkHandler.instance.peer;
command.register("ping", "returns the average ping").overload((p, o) => {
    let player = o.getEntity();
    if (!player) return;
    let packet = TextPacket.create();
    packet.message = `Current ping: §a${peer.GetAveragePing(player.getNetworkIdentifier().address)}`;
    player.sendPacket(packet);
    packet.dispose();
}, {});
 */
/**
 * Returns back the position and dimension of the player
 * useful for world tours ect...
 */

command.register("printhere", "Alerts other players to your position").overload((p, o) => {
    let player = o.getEntity();
    if (!player) return;
    let s: string = "";
    let pos: Vec3 = player.getPosition();
    switch (player.getDimensionId()) {
        case 0:
            s = `§aOverworld: ${Math.round(pos.x)} ${Math.round(pos.y)} ${Math.round(pos.z)}§r\n§4Nether: ${Math.round(pos.x / 8)} ${Math.round(pos.y / 8)} ${Math.round(pos.z / 8)}§r`
            break;
        case 1:
            s = `§4Nether: ${Math.round(pos.x)} ${Math.round(pos.y)} ${Math.round(pos.z)}§r\n§aOverworld: ${Math.round(pos.x * 8)} ${Math.round(pos.y * 8)} ${Math.round(pos.z * 8)}§r`
            break;
        case 2:
            s = `§eEnd: ${Math.round(pos.x)} ${Math.round(pos.y)} ${Math.round(pos.z)}§r`
            break;
    }
    tellAllRaw(`§b[${player.getName()}]§r @ ${s}`)
}, {});

command.register("vc", "Lists the people who are in vc in the server").overload((p, o) => {
    let player = o.getEntity();
    if (!player) return;
    let packet = TextPacket.create();
    const channels = channel.guild.channels.filter(c => c.type === 'voice');
    for (const [channelID, channel] of channels) {
        // @ts-ignore
        if (channel.members.size !== 0) {
            packet.message += `§3Current people in #${channel.name}§r:\n`
        }
        // @ts-ignore
        for (const [memberID, member] of channel.members) {
            packet.message += ` - ${member.user.username}\n`
        }
    }
    player.sendPacket(packet);
    packet.dispose();
}, {});
