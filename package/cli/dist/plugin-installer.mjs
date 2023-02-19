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

// esbuild/plugin-installer.ts
var import_esbuild = __toESM(require("esbuild"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_promises = require("fs/promises");
var args = process.argv.slice(2);
var entry = args[0];
var home = require("os").homedir();
var PLUGINS_DIR = import_path.default.join(home, ".yal", "plugins");
if (!import_fs.default.existsSync(PLUGINS_DIR)) {
  import_fs.default.mkdirSync(PLUGINS_DIR);
}
if (!entry) {
  console.error(
    "No entry file specified, please use the path of the plugin you are trying to run"
  );
  process.exit(1);
}
var srcFolder = import_path.default.join(process.cwd(), entry, "src");
var distFolder = import_path.default.join(process.cwd(), entry, "dist");
var files = import_fs.default.readdirSync(srcFolder);
var entryFile = files.find((file) => file.match(/index\.(js|ts)$/));
if (!entryFile) {
  console.error(
    "No entry file found, please make sure you have an index.js or index.ts file in your src folder"
  );
  process.exit(1);
}
console.log("*".repeat(80));
console.log(`Found entry file: ${entry}.`);
import_esbuild.default.build({
  mainFields: ["svelte", "browser", "module", "main"],
  outdir: distFolder,
  format: "esm",
  minify: false,
  splitting: false,
  sourcemap: "external",
  plugins: [],
  entryPoints: [import_path.default.join(process.cwd(), entry, "src", entryFile)],
  bundle: true,
  watch: false
}).catch(() => process.exit(1));
console.log("Plugins compiled \u{1F389}");
console.log(`Copying other files to ${entry}/dist....`);
if (!import_fs.default.existsSync(distFolder)) {
  import_fs.default.mkdirSync(distFolder);
}
import_fs.default.readdirSync(srcFolder).forEach((file) => {
  if (file.match(/\.(js|jsx|ts|tsx)$/)) {
    return;
  }
  const src = import_path.default.resolve(process.cwd(), `${srcFolder}/${file}`);
  const dest = import_path.default.resolve(process.cwd(), `${distFolder}/${file}`);
  try {
    import_fs.default.copyFileSync(src, dest);
  } catch (err) {
    console.log(`maybe have been an error copying: ${src} to ${dest}`);
  }
});
console.log(`Other files copied to ${entry}/dist \u{1F389}`);
async function copyDir(src, dest) {
  await (0, import_promises.mkdir)(dest, { recursive: true });
  let entries = await (0, import_promises.readdir)(src, { withFileTypes: true });
  for (let entry2 of entries) {
    let srcPath = import_path.default.join(src, entry2.name);
    let destPath = import_path.default.join(dest, entry2.name);
    entry2.isDirectory() ? await copyDir(srcPath, destPath) : await (0, import_promises.copyFile)(srcPath, destPath);
  }
}
console.log(`Installing plugin ${entry}... \u{1F389}`);
copyDir(distFolder, import_path.default.join(PLUGINS_DIR, entry)).then(
  () => console.log(`Plugin ${entry} installed! \u{1F389}`)
);
