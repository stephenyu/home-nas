import * as React from "react";

import { DiskStatus, LinuxFileSystem, FileSystem } from 'services/file_system';

interface PageProps {
    diskStatus: DiskStatus[];
    uptime: string;
    raidStatus: string;
}

const memoryUnits = ['B', 'MB', 'GB', 'TB'];

const getHumanReadable = (value: number): string => {
  let humanReadableValue = value;
  let index = -1;

  while(humanReadableValue > 999 || index === memoryUnits.length) {
    index++;
    humanReadableValue = humanReadableValue / 1024;
  }

  return `${humanReadableValue.toPrecision(4)}${memoryUnits[index]}`;
}


const DiskStatus = ({diskStatus} : {diskStatus: DiskStatus[]}) => {
  const diskElements = diskStatus.map((item, index) => <div key={index}>{`${item.label} - ${getHumanReadable(item.byteUsage)} of ${getHumanReadable(item.byteTotal)}`}</div>);
  return <div>{diskElements}</div>
}

const Page = ({ diskStatus, uptime, raidStatus }: PageProps) => {

  return <div>
    <DiskStatus diskStatus={diskStatus}/>
    <pre>{uptime}</pre>
    <textarea cols={50} rows={50} value={raidStatus} readOnly={true}/>
  </div>;
};

export const HomePage = async (fileSystem: FileSystem): Promise<JSX.Element> => {
  const diskStatus = await fileSystem.diskStorage();
  const uptime = await fileSystem.uptime();
  const raidStatus = await fileSystem.raidStatus('');

  return <html lang="en">
    <head>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>

    <body>
      <Page diskStatus={diskStatus} uptime={uptime} raidStatus={raidStatus}/>
    </body>
  </html>
};
