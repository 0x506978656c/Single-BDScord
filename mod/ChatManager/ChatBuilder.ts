/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */
import {Vec3} from "bdsx/bds/blockpos";
import {Actor} from "bdsx/bds/actor";

export class ChatBuilder {

    private mainString: string = "";
    /**Colors*/
    public static readonly CHAT_BLACK: "§0%s§r"
    public static readonly CHAT_DARK_BLUE: "§1%s§r"
    public static readonly CHAT_DARK_GREEN: "§2%s§r"
    public static readonly CHAT_DARK_AQUA: "§3%s§r"
    public static readonly CHAT_DARK_RED: "§4%s§r"
    public static readonly CHAT_DARK_PURPLE: "§5%s§r"
    public static readonly CHAT_GOLD: "§6%s§r"
    public static readonly CHAT_GRAY: "§7%s§r"
    public static readonly CHAT_DARK_GRAY: "§8%s§r"
    public static readonly CHAT_BLUE: "§9%s§r"
    public static readonly CHAT_GREEN: "§a%s§r"
    public static readonly CHAT_AQUA: "§b%s§r"
    public static readonly CHAT_RED: "§c%s§r"
    public static readonly CHAT_LIGHT_PURPLE: "§d%s§r"
    public static readonly CHAT_YELLOW: "§e%s§r"
    public static readonly CHAT_WHITE: "§f%s§r"
    public static readonly CHAT_MINECOIN_GOLD: "§g%s§r"
    /**Fonts*/
    public static readonly CHAT_OBFUSCATED: "§k%s§r"
    public static readonly CHAT_BOLD: "§l%s§r"
    public static readonly CHAT_STRIKETHROUGH: "§m%s§r"
    public static readonly CHAT_UNDERLINE: "§n%s§r"
    public static readonly CHAT_ITALIC: "§o%s§r"


    addText(color: ChatBuilder, text: string) {
        this.mainString += color, (text)
    }

    addRawtext(text: string) {
        this.mainString += text
    }

    addPosition(color: ChatBuilder, pos: Vec3) {
        this.mainString += color, (`[ ${pos.x} ${pos.y} ${pos.z} ]`)
    }

    addActorName(color: ChatBuilder, actor: Actor) {
        this.mainString += color, (actor.getName())
    }

    build() {
        return this.mainString
    }

}