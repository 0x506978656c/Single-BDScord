/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */
import path = require("path");
import {fsutil} from "bdsx/fsutil";
const configPath = path.join(fsutil.projectPath, "/plugins/single-BDScord/mod config/BDScordConfig.json");
console.log('\x1b[36m%s\x1b[0m', `BDScord config file has been loaded: ${configPath}`);

export let Config = {
    server_name: "",
    token: "",
    channel: "",
    webhook_url: "",
    server_icon: "",
    server_manager_roleID: "",
    bot_prefix: ""
};

fsutil.readFile(configPath).then((data) => {
    let config = JSON.parse(data);
    Config.server_name = config.server_name;
    Config.token = config.token;
    Config.channel = config.channel;
    Config.server_icon = config.server_icon;
    Config.server_manager_roleID = config.server_manager_roleID;
    Config.webhook_url = config.webhook_url;
    Config.bot_prefix = config.bot_prefix;

    require("../BDScord");
    require("../Hooks-Tools/hookedFunction");
    require("../Events/scheduling");
    require("../Commands/CommandManager");
});
