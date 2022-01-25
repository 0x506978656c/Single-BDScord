/**
 * BDScord - ! Pixel
 *
 */

import {serverInstance} from "bdsx/bds/server";
import {bedrockServer} from "bdsx/launcher";
import {getLevelData, getLevelName} from "../Hooks-Tools/hookedFunction";
import * as path from "path";
import {fsutil} from "bdsx/fsutil";
import {sendSpecical, tellAllRaw} from "../ChatManager/MessageManager";
import * as fs from "fs";

const {copySync, remove} = require('fs-extra');
const AdmZip = require("adm-zip");

const srcDir = path.join(fsutil.projectPath, "bedrock_server\\worlds");
const destDir = path.join(fsutil.projectPath, "Backup")


export async function takeBackup() {
    /** sending it to both because its important */
    sendSpecical("Backup Manager:", `Taking server backup, this can take up to 3 minutes please be patient`, "#6b107c", false);
    tellAllRaw(`§d[Backup Manager]:§r §2Taking server backup, this can take up to 3 minutes please be patient§r`)
    bedrockServer.executeCommand("save hold");
    await new Promise(f => setTimeout(f, 30000));
    /** waiting about 30 seconds for the save to finish so it doesnt try to copy the stuff while its still running  */
    const worldName = getLevelName(getLevelData(serverInstance.minecraft.getLevel()));
    const now = new Date(Date.now());
    const addLeadingZero = (value: number) => {
        return `0${value}`.slice(-2);
    };
    const getTime = (date: Date) => {
        return addLeadingZero(date.getHours()) + addLeadingZero(date.getMinutes()) + addLeadingZero(date.getSeconds());
    };
    const timeStamp = [addLeadingZero(now.getDate()), addLeadingZero(now.getMonth() + 1), now.getFullYear(), getTime(now)].join("-");
    let dir = destDir + `\\${timeStamp} - ${worldName}`
    try {
        await createZipArchive(dir, destDir + "\\tmp", destDir, worldName, () => {
        });

    } catch (err) {
        console.error(err)
    }
    bedrockServer.executeCommand("save resume");
}

async function createZipArchive(inputDir: string, tempDir: string, outputDir: string, worldName: string, handleError: (error?: string) => void): Promise<void> {
    const outputPath = outputDir + "\\Backup" + path.basename(inputDir) + ".mcworld";
    await new Promise<boolean>((resolve) => {
        fs.mkdir(`${outputDir}\\tmp`, (err: any) => {
        })
        copySync(srcDir + `\\${worldName}`, tempDir)
        const zip = new AdmZip();
        zip.addLocalFolder(tempDir);
        zip.writeZip(outputPath, (err: any) => {
            if (err) {
                /** sending it to both because its important */
                sendSpecical("Backup:", `Failed to take backup:\n ${err}`, "#de1010", false);
                tellAllRaw(`§d[Backup Manager]:§r §4Failed to take backup:\n ${err}§r `)
                resolve(false);
            }
            sendSpecical("Backup Manager:", `Backup successfully created \"${path.basename(outputPath)}\"`, "#1dd009", false);
            console.log(`\x1b[45m Backup successfully created \"${path.basename(outputPath)}\" \x1b[0m`);
            remove(`${outputDir}\\tmp`)
            resolve(true);
        });
    });
}
