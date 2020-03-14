import * as path from 'path';
import express from "express";
import * as ReactDOMServer from "react-dom/server";

import { HomePage } from "pages/homepage";
import { LinuxFileSystem, FakeFileSystem } from 'services/file_system';

const app = express();
const port = 8080; // default port to listen
const flavor = process.env.FLAVOR;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", async (req, res) => {
  const fileSystem = (flavor === "production")
    ? new LinuxFileSystem()
    : new FakeFileSystem();

  const Page = await HomePage(fileSystem);

  res.send(ReactDOMServer.renderToStaticMarkup(Page));
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
