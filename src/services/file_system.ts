import util from "util";
import * as child_process from "child_process";

const exec = util.promisify(child_process.exec);

export interface DiskStatus {
    label: string;
    byteTotal: number;
    byteUsage: number;
}

export interface FileSystem {
    diskStorage: () => Promise<DiskStatus[]>;
    uptime: () => Promise<string>;
    raidStatus: (id: string) => Promise<string>;
}

export class LinuxFileSystem implements FileSystem {
  diskStorage = async () => {
    const { stdout } = await exec('df -B1 | grep "^/dev/"');

    const lineByline = stdout.split("\n");

    // "/dev/root        15383740416 2049515520   12676681728  14% /"
    const regex = /(\S+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+%)\s+(\S+)$/;

    const diskStatus: DiskStatus[] = [];

    lineByline.forEach(line => {
      const match = regex.exec(line);

      if (match) {
        // eslint-disable-next-line
        const [_, label, x, byteUsage, byteTotal] = match;
        diskStatus.push({ label, byteUsage: parseInt(byteUsage), byteTotal: parseInt(byteTotal) });
      }
    });

    return diskStatus;
  }

    uptime = async () => {
      const { stdout } = await exec('uptime -p');
      return stdout;
    }

    raidStatus = async() => {
      const { stdout } = await exec('sudo mdadm --detail /dev/md0');
      return stdout;
    }
}

export class FakeFileSystem implements FileSystem {
    diskStorage = async () => {
      return Promise.resolve(
        [
          {label: 'Disk 1', byteTotal: 30000000, byteUsage: 50000},
          {label: 'Disk 2', byteTotal: 3000000, byteUsage: 50000}
        ]
      );
    }

    uptime = async () => {
      return Promise.resolve("up 1 day, 10 mins");
    }

    raidStatus = async() => {
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
    }
}

