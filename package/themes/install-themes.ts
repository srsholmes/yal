import { homedir } from 'os';
import fs from 'fs';
import { copyFile, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const home = homedir();
const THEMES_DIR = path.join(home, '.yal', 'themes');

async function copyThemes() {
  console.log('Copying themes...');
  // Remove themes directory
  // Remove the PLUGINS_DIR and remake it
  if (fs.existsSync(THEMES_DIR)) {
    fs.rmdirSync(THEMES_DIR, { recursive: true });
    fs.mkdirSync(THEMES_DIR);
  }

  readdir(path.resolve(__dirname, './src')).then((files) => {
    files.forEach(async (file) => {
      if (!fs.existsSync(THEMES_DIR)) {
        fs.mkdirSync(THEMES_DIR);
      }
      await copyFile(
        path.resolve(__dirname, './src', file),
        path.resolve(THEMES_DIR, file)
      );
    });
  });
}

copyThemes().then(() => {
  console.log('themes copied');
});

fs.watch(path.join(process.cwd(), './src'), (eventType, filename) => {
  console.log('Themes changed...');
  copyThemes();
});
