import * as React from "react";

import { DiskStatus, LinuxFileSystem } from 'services/file_system';

interface PageProps {
    diskStatus: DiskStatus[];
}

const Page = ({ diskStatus }: PageProps) => {
  const diskElements = diskStatus.map((item, index) => <div key={index}>{`${item.label} - ${item.byteUsage} of ${item.byteTotal}`}</div>);

  return <div>{diskElements}</div>
};

export const HomePage = async (): Promise<JSX.Element> => {
  const fileSystem = new LinuxFileSystem();
  const diskStatus = await fileSystem.diskStorage();

  return <Page diskStatus={diskStatus} />;
};
