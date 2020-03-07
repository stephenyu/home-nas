import * as React from "react";

import { DiskStatus, FakeFileSystem } from 'services/file_system';

interface PageProps {
    diskStatus: DiskStatus[];
}

const Page = ({ diskStatus }: PageProps) => {
  const diskElements = diskStatus.map((item, index) => <span key={index}>{`${item.label} - ${item.byteUsage} of ${item.byteTotal}`}</span>);

  return <div>{diskElements}</div>
};

export const HomePage = async (): Promise<JSX.Element> => {
  const fileSystem = new FakeFileSystem();
  const diskStatus = await fileSystem.diskStorage();

  return <Page diskStatus={diskStatus} />;
};
