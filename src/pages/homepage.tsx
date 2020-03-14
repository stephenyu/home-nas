import * as React from "react";

import { DiskStatus, FileSystem } from 'services/file_system';
import { PercentageBar } from './percentage_bar';

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
  return <ol className="diskList">
    {diskStatus.map((item, index) => {
      const content = `${getHumanReadable(item.byteUsage)} of ${getHumanReadable(item.byteTotal)}`;
      return <li key={index}><span>{item.label} :</span> <PercentageBar used={item.byteUsage} total={item.byteTotal} content={content}/></li>
    })}
  </ol>
}

export const HomePage = async (fileSystem: FileSystem): Promise<JSX.Element> => {
  const diskStatus = await fileSystem.diskStorage();
  const uptime = await fileSystem.uptime();
  const raidStatus = await fileSystem.raidStatus('');

  return <html lang="en">
    <head>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/main.css" rel="stylesheet" />
    </head>

    <body>
      <div>
        {diskStatus &&  <DiskStatus diskStatus={diskStatus}/>}
        {uptime && <pre>{uptime}</pre>}
        {raidStatus && <textarea cols={50} rows={50} value={raidStatus} readOnly={true}/>}
      </div>;
    </body>
  </html>
};
