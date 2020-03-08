"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const file_system_1 = require("services/file_system");
const memoryUnits = ['B', 'MB', 'GB', 'TB'];
const getHumanReadable = (value) => {
    let humanReadableValue = value;
    let index = -1;
    while (humanReadableValue > 999 || index === memoryUnits.length) {
        index++;
        humanReadableValue = humanReadableValue / 1024;
    }
    return `${humanReadableValue.toPrecision(4)}${memoryUnits[index]}`;
};
const DiskStatus = ({ diskStatus }) => {
    const diskElements = diskStatus.map((item, index) => React.createElement("div", { key: index }, `${item.label} - ${getHumanReadable(item.byteUsage)} of ${getHumanReadable(item.byteTotal)}`));
    return React.createElement("div", null, diskElements);
};
const Page = ({ diskStatus, uptime }) => {
    return React.createElement("div", null,
        React.createElement(DiskStatus, { diskStatus: diskStatus }),
        React.createElement("pre", null, uptime));
};
exports.HomePage = () => __awaiter(void 0, void 0, void 0, function* () {
    const fileSystem = new file_system_1.LinuxFileSystem();
    const diskStatus = yield fileSystem.diskStorage();
    const uptime = yield fileSystem.uptime();
    return React.createElement(Page, { diskStatus: diskStatus, uptime: uptime });
});
