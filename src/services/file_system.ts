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
}

export class LinuxFileSystem implements FileSystem {
  diskStorage = async () => {
    const { stdout } = await exec('df -B1 | | grep "^/dev/"');
    console.log(stdout);

    return Promise.resolve(
      [
        {label: 'Disk 1', byteTotal: 1000, byteUsage: 500},
        {label: 'Disk 2', byteTotal: 1000, byteUsage: 500}
      ]
    );
  }
}

export class FakeFileSystem implements FileSystem {
    diskStorage = async () => {
      return Promise.resolve(
        [
          {label: 'Disk 1', byteTotal: 1000, byteUsage: 500},
          {label: 'Disk 2', byteTotal: 1000, byteUsage: 500}
        ]
      );
    }
}
