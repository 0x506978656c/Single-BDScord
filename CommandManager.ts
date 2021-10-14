/**
 * BDScord - ! Pixel
 *
 */
import {Vec3} from "bdsx/bds/blockpos";
import {TextPacket} from "bdsx/bds/packets";
import {command} from "bdsx/command";
import {bedrockServer} from "bdsx/launcher";
import {CommandRawText} from 'bdsx/bds/command';
import {tellAllRaw} from "./BDScord";


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

