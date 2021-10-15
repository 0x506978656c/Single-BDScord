# What is BDScord - 1.17.11.01
BDScord was intended to provide a simple chat bridge that would make playing on servers more interesting and more enjoyable. Typically servers can sometimes get lonely and having a chat bridge makes it fun and entertaining. This is not just a chat bridge but it also comprises specialised tools for scoreboards and more.

**Images of the bridge working**
![Image of the bridge working in game](https://cdn.discordapp.com/attachments/866631401977937940/898458410134155344/unknown.png)
![Image of the bridge working in discord](https://cdn.discordapp.com/attachments/866631401977937940/898458426546466866/unknown.png)

# Features

 * Discord - Mc chat bridge 
 * MC to Discord emoji replacer. This works for any server. for example, if u have a emote added to the server that u are running the bot from such as the emote `:sad:`.
   By typing the emoji name without the Emoji ID or other annoying required formats in game, BDScord will auto convert it to the emoji in discord.
 * Server management commands in discord with whitelist commands and commands to stop the server
 * Blocks broken, Deaths and Mobs Killed counters 
 * Player leave and Join messages
 * list which players are online 
 * blame command 
 
# Setting up BDScord

[Download for 1.17.11.01 BDSX can be found here](https://github.com/bdsx/bdsx/tree/f80d6460da423e5efa2b55105c8e070ed6f05f48)

BDScord is a plugin designed to run with [BDSX](https://github.com/bdsx/bdsx). In the technical community this can also be run in tandem with [Trapdoor](https://github.com/hhhxiao/TrapDoor), to install follow these steps:


**How to install trapdoor and bdsx:** - courtesy Evil for this guide

* 1. Install the elementminus plugin from https://github.com/karikera/elementminus-plugin
* 2. Download trapdoor from https://github.com/hhhxiao/TrapDoor
* 3. Inside the `bedrock_server` folder in bdsx make a mods folder and a plugins folder
* 4. Put the trapdoor dll in `bedrock_server/mods` and put the trapdoor folder inside `bedrock_server/plugins`

note: if you have any weird issues in game remove the example scripts line from `index.ts` `and index.js` in the main directory


**To install BDScord:**

* 1. Install the latest release of BDScord
* 2. Drag the `Single-BDScord` file to the `plugins` folder of bdsx
* 3. Run `npm install` inside the `Single-BDScord` to install all node dependencys
* 4. Edit the config file `BDScordConfig.json` to suit your needs
* 5. run `bdsx.bat` to start up the server


**Note that certain objectives need to be created on first world start**

* Run the commands: 
* 
                => `/scoreboard objectives add "Mobs Killed" dummy`
                => `/scoreboard objectives add "Blocks Mined" dummy`
                => `/scoreboard objectives add "Deaths" dummy`

**BDScord config file:**

```json
{
  "server_name": "",
  "token": "",
  "channel": "",
  "webhook_url": "",
  "server_icon": "",
  "server_manager_roleID": "",
  "bot_prefix": "%"
}
```

# Credits

* Evil for introducing me to BDSX
* BDSX
* Stratos for the love and support

**Third-party libs**

   * https://github.com/discordjs/discord.js
   * https://github.com/jb3/webhook-discord
   * https://github.com/bdsx/bdsx


**If you need any help or support drop me a message in Stratos discord (https://discord.gg/ECXWBR2dsQ)**
