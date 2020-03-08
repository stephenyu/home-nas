import * as React from "react";

import { DiskStatus, LinuxFileSystem, FileSystem } from 'services/file_system';

interface PageProps {
    diskStatus: DiskStatus[];
    uptime: string;
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

const Page = ({ diskStatus, uptime }: PageProps) => {

  return <div>
    <DiskStatus diskStatus={diskStatus}/>
    <pre>{uptime}</pre>
  </div>;
};

export const HomePage = async (fileSystem: FileSystem): Promise<JSX.Element> => {
  const diskStatus = await fileSystem.diskStorage();
  const uptime = await fileSystem.uptime();

  return <Page diskStatus={diskStatus} uptime={uptime}/>;
};
