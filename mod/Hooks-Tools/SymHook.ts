/**
 * BDScord Plugin
 * Developed by ! Pixel
 *
 */

import {ProcHacker} from "bdsx/prochacker";
import {UNDNAME_NAME_ONLY} from "bdsx/dbghelp";
import {pdb} from "bdsx/core";
import * as path from "path";
import {fsutil} from "bdsx/fsutil";


const symbols = [
    "Level::getRuntimeEntity",
    "Explosion::explode",
    "MapItemSavedData::_updateTrackedEntityDecoration",
    "PistonBlock::shouldConnectToRedstone",
    "PressurePlateBlock::getSignalStrength",
    "BeaconBlock::canContainLiquid",
    "GlassBlock::breaksFallingBlocks",
    "BlockLegacy::breaksFallingBlocks",
    "PistonBlock::breaksFallingBlocks",
    "PistonBlockActor::_checkAttachedBlocks",
    "PistonBlockActor::_handleSlimeConnections",
    "Dimension::isRedstoneTick",
    "BlockTickingQueue::tickPendingTicks",
    "PillagerOutpostFeature::isFeatureChunk",
    "RepeaterBlock::getTurnOnDelay",
    "EndCityFeature::isFeatureChunk",
    "Actor::setNameTag",
    "AddPlayerPacket::AddPlayerPacket",
    "PistonBlockActor::ARM_ANIMATION_SPEED",
    "PistonArmBlock::canBeSilkTouched",
    "Actor::getBlockPosCurrentlyStandingOn",
    "LevelData::getLevelName",
    "Level::getLevelData"
];


export const symHook = ProcHacker.load(path.join(fsutil.projectPath, "/plugins/single-BDScord/mod/Hooks-Tools/PDBCache.ini"), symbols, UNDNAME_NAME_ONLY);
pdb.close()