const express = require("express");
const fs = require("fs");

const port = process.env.PORT || 1337;

const app = express();
app.get("/", respondText);

app.get("/json", respondJson);

app.get("/echo", respondEcho);

app.get("/static/*", respondStatic);

function respondStatic(req, res) {
  const filename = `${__dirname}/public/${req.params[0]}`;
  fs.createReadStream(filename)
    .on("error", () => respondNotFound(req, res))
    .pipe(res);
}

function respondEcho(req, res) {
  const { input = "" } = req.query;

  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    characterCount: input.length,
    backwards: input.split("").reverse().join(""),
  });
}

function respondText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("hi");
}

function respondNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

function respondJson(req, res) {
  res.json({ text: "hi", numbers: [1, 2, 3] });
}

app.listen(port, () => console.log("Server listening on port ", port));
