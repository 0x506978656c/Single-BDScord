/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */

import {Vec3} from "bdsx/bds/blockpos";
import {TextPacket} from "bdsx/bds/packets";
import {command} from "bdsx/command";
import {bedrockServer} from "bdsx/launcher";
import {CommandRawText} from 'bdsx/bds/command';
import {tellAllRaw} from "../ChatManager/MessageManager";
import {channel} from "../BDScord";
// @ts-ignore
import path = require("path");
import {takeBackup} from "../Backup/Backup";
import {serverInstance} from "bdsx/bds/server";

const MersenneTwister = require('mersenne-twister');

command.register("isslime", "Test's if the chunk that the player is standing in is a slime chunk").overload((p, o) => {
    let player = o.getEntity();
    if (!player) return;
    let packet = TextPacket.create();
    const chunkpos = {
        x: Math.trunc(player.getPosition().x / 16),
        z: Math.trunc(player.getPosition().z / 16)
    }
    const mt = new MersenneTwister((chunkpos.x * 0x1f1f1f1f) ^ chunkpos.z)
    packet.message = mt.random_int() % 10 == 0 ? `§aChunk §b[${chunkpos.x * 16} ${chunkpos.z * 16}]§a to §b[${(chunkpos.x * 16) + 16} ${(chunkpos.z * 16) + 16}]§a is a slime chunk§r` : `§cThis is not a slime chunk§r`;
    player.sendPacket(packet)
    packet.dispose();
}, {});


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
    tellAllRaw(`§2${origin.getName()}§r blamed §4${target.text}§r`)
}, {
    target: CommandRawText
});

const peer = serverInstance.networkHandler.instance.peer;
command.register("ping", "returns the average ping").overload((p, o) => {
    let player = o.getEntity();
    if (!player) return;
    let packet = TextPacket.create();
    packet.message = `Current ping: §a${peer.GetAveragePing(player.getNetworkIdentifier().address)}`;
    player.sendPacket(packet);
    packet.dispose();
}, {});

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
            packet.message += ` - ${member.user.tag.slice(0, member.user.tag.lastIndexOf('#'))}\n`
        }
    }
    player.sendPacket(packet);
    packet.dispose();
}, {});

command.register("run-backup", "Runs a backup on the server").overload((p, o) => {
    takeBackup()
}, {});