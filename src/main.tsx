import express from "express";
import * as ReactDOMServer from "react-dom/server";
import { HomePage } from "./pages/homepage";

const app = express();
const port = 8080; // default port to listen

app.get("/", async (req, res) => {
  const Page = await HomePage();

  res.send(ReactDOMServer.renderToStaticMarkup(Page));
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
