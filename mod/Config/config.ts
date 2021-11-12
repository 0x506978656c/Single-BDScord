import path = require("path");
import {fsutil} from "bdsx/fsutil";

const x = path.join(fsutil.projectPath, "/plugins/single-BDScord/mod config/BDScordConfig.json");
console.log('\x1b[36m%s\x1b[0m', `BDScord config file has been loaded: ${x}`);

export let Config = {
    server_name: "",
    token: "",
    channel: "",
    webhook_url: "",
    server_icon: "",
    server_manager_roleID: "",
    bot_prefix: ""
};

fsutil.readFile(x).then((data) => {
    let config = JSON.parse(data);
    Config.server_name = config.server_name;
    Config.token = config.token;
    Config.channel = config.channel;
    Config.server_icon = config.server_icon;
    Config.server_manager_roleID = config.server_manager_roleID;
    Config.webhook_url = config.webhook_url;
    Config.bot_prefix = config.bot_prefix;
    require("./BDScord");
    require("./scheduling")
    require("./CommandManager");
});
