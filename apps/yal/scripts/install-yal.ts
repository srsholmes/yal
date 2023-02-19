console.log('Installing Yal...');
import { exec } from 'child_process';
import path from 'path';

const PATH_TO_PROD = `src-tauri/target/release/bundle/macos/yal.app`;
const DEST_PATH = `/Applications`;

(async () => {
  try {
    const cwd = process.cwd();
    const PROD_BUILD = path.resolve(cwd, PATH_TO_PROD);
    // Copy the Yal.app to /Applications using a bash shell command
    // For some reason the copyFile command doesn't work
    await exec(`cp -r ${PROD_BUILD} ${DEST_PATH}`);

    console.log('Yal Installed!');
  } catch (err) {
    console.error(err);
  }
})();

export {};