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
            const { stdout } = yield exec('df -B1 | grep "^/dev/"');
            const lineByline = stdout.split("\n");
            // "/dev/root        15383740416 2049515520   12676681728  14% /"
            const regex = /(\S+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+%)\s+(\S+)$/;
            const diskStatus = [];
            lineByline.forEach(line => {
                const match = regex.exec(line);
                if (match) {
                    // eslint-disable-next-line
                    const [_, label, x, byteUsage, byteTotal] = match;
                    diskStatus.push({ label, byteUsage: parseInt(byteUsage), byteTotal: parseInt(byteTotal) });
                }
            });
            return diskStatus;
        });
        this.uptime = () => __awaiter(this, void 0, void 0, function* () {
            const { stdout } = yield exec('uptime');
            return stdout;
        });
        this.raidStatus = () => __awaiter(this, void 0, void 0, function* () {
            const { stdout } = yield exec('sudo mdadm --detail /dev/md0');
            return stdout;
        });
    }
}
exports.LinuxFileSystem = LinuxFileSystem;
class FakeFileSystem {
    constructor() {
        this.diskStorage = () => __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve([
                { label: 'Disk 1', byteTotal: 30000000, byteUsage: 50000 },
                { label: 'Disk 2', byteTotal: 3000000, byteUsage: 50000 }
            ]);
        });
        this.uptime = () => __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve("18:31  up 1 day, 10 mins, 2 users, load averages: 1.73 1.47 1.45");
        });
        this.raidStatus = () => __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(`/dev/md0:
           Version : 1.2
     Creation Time : Sat Mar  7 00:48:01 2020
        Raid Level : raid1
        Array Size : 30013376 (28.62 GiB 30.73 GB)
     Used Dev Size : 30013376 (28.62 GiB 30.73 GB)
      Raid Devices : 2
     Total Devices : 2
       Persistence : Superblock is persistent

       Update Time : Sun Mar  8 20:22:04 2020
             State : clean
    Active Devices : 2
   Working Devices : 2
    Failed Devices : 0
     Spare Devices : 0

Consistency Policy : resync

              Name : raspberrypi:0
              UUID : 641c6a23:900819e1:2ea9ec2d:7112fb1f
            Events : 459

    Number   Major   Minor   RaidDevice State
       0       8       16        0      active sync   /dev/sdb
       1       8        1        1      active sync   /dev/sda1`);
        });
    }
}
exports.FakeFileSystem = FakeFileSystem;
