#! /usr/bin/env node

import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { mkdir, readdir, copyFile } from 'fs/promises';

const args = process.argv.slice(2);
const entry = args[0];

const home = require('os').homedir();

const PLUGINS_DIR = path.join(home, '.yal', 'plugins');

if (!fs.existsSync(PLUGINS_DIR)) {
  fs.mkdirSync(PLUGINS_DIR);
}

if (!entry) {
  console.error(
    'No entry file specified, please use the path of the plugin you are trying to run'
  );
  process.exit(1);
}

const srcFolder = path.join(process.cwd(), entry, 'src');
const distFolder = path.join(process.cwd(), entry, 'dist');

const files = fs.readdirSync(srcFolder);
const entryFile = files.find((file) => file.match(/index\.(js|ts)$/));

if (!entryFile) {
  console.error(
    'No entry file found, please make sure you have an index.js or index.ts file in your src folder'
  );
  process.exit(1);
}

console.log('*'.repeat(80));
console.log(`Found entry file: ${entry}.`);

esbuild
  .build({
    mainFields: ['svelte', 'browser', 'module', 'main'],
    outdir: distFolder,
    format: 'esm',
    minify: false, //so the resulting code is easier to understand
    splitting: false,
    sourcemap: 'external',
    plugins: [],
    entryPoints: [path.join(process.cwd(), entry, 'src', entryFile)],
    bundle: true,
    watch: false,
  })
  .catch(() => process.exit(1));

console.log('Plugins compiled 🎉');
console.log(`Copying other files to ${entry}/dist....`);

// ensure the dist folder exists (esbuild is async so it might not exist yet)
if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder);
}

fs.readdirSync(srcFolder).forEach((file) => {
  // if file has extension .js, .jsx, .ts, .tsx skip (as they will be bundled)
  if (file.match(/\.(js|jsx|ts|tsx)$/)) {
    return;
  }

  const src = path.resolve(process.cwd(), `${srcFolder}/${file}`);
  const dest = path.resolve(process.cwd(), `${distFolder}/${file}`);

  try {
    fs.copyFileSync(src, dest);
  } catch (err) {
    console.log(`maybe have been an error copying: ${src} to ${dest}`);
  }
});

console.log(`Other files copied to ${entry}/dist 🎉`);

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  let entries = await readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await copyFile(srcPath, destPath);
  }
}

console.log(`Installing plugin ${entry}... 🎉`);
copyDir(distFolder, path.join(PLUGINS_DIR, entry)).then(() =>
  console.log(`Plugin ${entry} installed! 🎉`)
);
