import * as React from "react";
import * as fs from "fs";

export const App = ({ stdout }: { stdout: string }) => {
  return <span>{stdout}</span>;
};
