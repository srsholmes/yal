#! /usr/bin/env node

import esbuild from 'esbuild';
import { createServer, request } from 'http';
import path from 'path';
import fs from 'fs';

const clients = [];

const args = process.argv.slice(2);
const entry = args[0];

if (!entry) {
  console.error(
    'No entry file specified, please use the path of the plugin you are trying to run'
  );
  process.exit(1);
}

const pathToEntry = path.join(process.cwd(), entry, 'src');
const files = fs.readdirSync(pathToEntry);
const entryFile = files.find((file) => file.match(/index\.(js|ts)$/));

if (!entryFile) {
  console.error(
    'No entry file found, please make sure you have an index.js or index.ts file in your src folder'
  );
  process.exit(1);
}

console.log('*'.repeat(80));
console.log(`Found entry file, ${entry}.`);

esbuild
  .build({
    mainFields: ['svelte', 'browser', 'module', 'main'],
    outdir: path.join(process.cwd(), entry, 'dist'),
    format: 'esm',
    minify: false, //so the resulting code is easier to understand
    splitting: false,
    sourcemap: 'external',
    plugins: [],
    entryPoints: [path.join(process.cwd(), entry, 'src', entryFile)],
    bundle: true,
    banner: {
      js:
        //language=js
        `(() => {
          new EventSource("http://localhost:4567/esbuild").onmessage = () => {
            console.log('I got a message from the build server....')
            return window.location.reload();
          }
        })();`,
    },
    watch: {
      onRebuild(error, result) {
        clients.forEach((res) => res.write('data: update\n\n'));
        clients.length = 0;
        console.log(error ? error : 'Rebuild successful...');
      },
    },
  })
  .catch(() => process.exit(1));

esbuild
  .serve({ servedir: path.join(process.cwd(), entry, 'dist') }, {})
  .then(() => {
    createServer((req, res) => {
      console.log('*'.repeat(100));
      console.log('Plugin server started...');
      console.log('Please search for your yal plugin in yal...');
      console.log('*'.repeat(100));
      const { url, method, headers } = req;
      if (req.url === '/esbuild')
        return clients.push(
          res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          })
        );
      const path = ~url.split('/').pop().indexOf('.') ? url : `/index.html`; //for PWA with router
      req.pipe(
        request(
          { hostname: '0.0.0.0', port: 8000, path, method, headers },
          (prxRes) => {
            res.writeHead(prxRes.statusCode, prxRes.headers);
            prxRes.pipe(res, { end: true });
          }
        ),
        { end: true }
      );
    }).listen(4567);
  });
