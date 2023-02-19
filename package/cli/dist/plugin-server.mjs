#! /usr/bin/env node
import { createRequire as topLevelCreateRequire } from "module"; const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// esbuild/plugin-server.ts
var import_esbuild = __toESM(require("esbuild"), 1);
var import_http = require("http");
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var clients = [];
var args = process.argv.slice(2);
var entry = args[0];
if (!entry) {
  console.error(
    "No entry file specified, please use the path of the plugin you are trying to run"
  );
  process.exit(1);
}
var pathToEntry = import_path.default.join(process.cwd(), entry, "src");
var files = import_fs.default.readdirSync(pathToEntry);
var entryFile = files.find((file) => file.match(/index\.(js|ts)$/));
if (!entryFile) {
  console.error(
    "No entry file found, please make sure you have an index.js or index.ts file in your src folder"
  );
  process.exit(1);
}
console.log("*".repeat(80));
console.log(`Found entry file, ${entry}.`);
import_esbuild.default.build({
  mainFields: ["svelte", "browser", "module", "main"],
  outdir: import_path.default.join(process.cwd(), entry, "dist"),
  format: "esm",
  minify: false,
  splitting: false,
  sourcemap: "external",
  plugins: [],
  entryPoints: [import_path.default.join(process.cwd(), entry, "src", entryFile)],
  bundle: true,
  banner: {
    js: `(() => {
          new EventSource("http://localhost:4567/esbuild").onmessage = () => {
            console.log('I got a message from the build server....')
            return window.location.reload();
          }
        })();`
  },
  watch: {
    onRebuild(error, result) {
      clients.forEach((res) => res.write("data: update\n\n"));
      clients.length = 0;
      console.log(error ? error : "Rebuild successful...");
    }
  }
}).catch(() => process.exit(1));
import_esbuild.default.serve({ servedir: import_path.default.join(process.cwd(), entry, "dist") }, {}).then(() => {
  (0, import_http.createServer)((req, res) => {
    console.log("*".repeat(100));
    console.log("Plugin server started...");
    console.log("Please search for your yal plugin in yal...");
    console.log("*".repeat(100));
    const { url, method, headers } = req;
    if (req.url === "/esbuild")
      return clients.push(
        res.writeHead(200, {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive"
        })
      );
    const path2 = ~url.split("/").pop().indexOf(".") ? url : `/index.html`;
    req.pipe(
      (0, import_http.request)(
        { hostname: "0.0.0.0", port: 8e3, path: path2, method, headers },
        (prxRes) => {
          res.writeHead(prxRes.statusCode, prxRes.headers);
          prxRes.pipe(res, { end: true });
        }
      ),
      { end: true }
    );
  }).listen(4567);
});
