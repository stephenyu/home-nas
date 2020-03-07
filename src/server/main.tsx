import express from "express";

import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import util from "util";
import * as child_process from "child_process";

const exec = util.promisify(child_process.exec);

import {App as ReactApp} from './fe';

const app = express();
const port = 8080; // default port to listen

app.get("/", async (req, res) => {
    const { stdout} = await exec("ls | grep js");

  res.send(ReactDOMServer.renderToStaticMarkup(<ReactApp stdout={stdout}/>));
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
