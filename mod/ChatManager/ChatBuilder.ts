/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */
import {Vec3} from "bdsx/bds/blockpos";
import {Actor} from "bdsx/bds/actor";

export enum format {
    /**Colors*/
    CHAT_BLACK = "§0%s§r",
    CHAT_DARK_BLUE = "§1%s§r",
    CHAT_DARK_GREEN = "§2%s§r",
    CHAT_DARK_AQUA = "§3%s§r",
    CHAT_DARK_RED = "§4%s§r",
    CHAT_DARK_PURPLE = "§5%s§r",
    CHAT_GOLD = "§6%s§r",
    CHAT_GRAY = "§7%s§r",
    CHAT_DARK_GRAY = "§8%s§r",
    CHAT_BLUE = "§9%s§r",
    CHAT_GREEN = "§a%s§r",
    CHAT_AQUA = "§b%s§r",
    CHAT_RED = "§c%s§r",
    CHAT_LIGHT_PURPLE = "§d%s§r",
    CHAT_YELLOW = "§e%s§r",
    CHAT_WHITE = "§f%s§r",
    CHAT_MINECOIN_GOLD = "§g%s§r",
    /**Fonts*/
    CHAT_OBFUSCATED = "§k%s§r",
    CHAT_BOLD = "§l%s§r",
    CHAT_STRIKETHROUGH = "§m%s§r",
    CHAT_UNDERLINE = "§n%s§r",
    CHAT_ITALIC = "§o%s§r"
}

export class ChatBuilder {

    private mainString: string = "";

    addText(color: format, text: string) {
        this.mainString += color, (text)
    }

    addRawtext(text: string) {
        this.mainString += text
    }

    addPosition(color: format, pos: Vec3) {
        this.mainString += color, (`[ ${pos.x} ${pos.y} ${pos.z} ]`)
    }

    addActorName(color: format, actor: Actor) {
        this.mainString += color, (actor.getName())
    }

    build() {
        return this.mainString
    }

}
