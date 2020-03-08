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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const child_process = __importStar(require("child_process"));
const exec = util_1.default.promisify(child_process.exec);
class LinuxFileSystem {
    constructor() {
        this.diskStorage = () => __awaiter(this, void 0, void 0, function* () {
            // const { stdout } = await exec('df -B1 | grep "^/dev/"');
            const stdout = `/dev/root        15383740416 2049515520   12676681728  14% /
/dev/md0         30117130240 5192548352   24877072384  18% /mnt/raid
/dev/mmcblk0p1     264289280   54747648     209541632  21% /boot
/dev/sdc1      1967924641792   79720448 1965827747840   1% /mnt/external`;
            const lineByline = stdout.split("\n");
            // "/dev/root        15383740416 2049515520   12676681728  14% /"
            const regex = /(\S+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+\%)\s+(\S+)$/;
            const diskStatus = lineByline.map(line => {
                const match = regex.exec(line);
                if (match) {
                    // eslint-disable-next-line
                    const [_, label, x, byteUsage, byteTotal] = match;
                    return { label, byteUsage: parseInt(byteUsage), byteTotal: parseInt(byteTotal) };
                }
                else
                    throw new Error("not Implemented");
            });
            return diskStatus;
        });
        this.uptime = () => __awaiter(this, void 0, void 0, function* () {
            const { stdout } = yield exec('uptime');
            return stdout;
        });
    }
}
exports.LinuxFileSystem = LinuxFileSystem;
class FakeFileSystem {
    constructor() {
        this.diskStorage = () => __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve([
                { label: 'Disk 1', byteTotal: 1000, byteUsage: 500 },
                { label: 'Disk 2', byteTotal: 1000, byteUsage: 500 }
            ]);
        });
        this.uptime = () => __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve("18:31  up 1 day, 10 mins, 2 users, load averages: 1.73 1.47 1.45");
        });
    }
}
exports.FakeFileSystem = FakeFileSystem;
