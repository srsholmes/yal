import { listen } from '@tauri-apps/api/event';
import { BaseDirectory, createDir, readDir } from '@tauri-apps/api/fs';
import { setAppsToStore } from 'state/apps';
import { loadConfig } from 'state/config';
import { setInputText } from 'state/input';
import { setupPlugins } from 'state/plugins';
import { getYalPath, YAL_DIR, YAL_DIR_PLUGINS } from 'utils/constants';
import { exposeWindowProperties } from 'utils/plugin-actions';
import { watch, watchImmediate } from 'tauri-plugin-fs-watch-api';

import { invoke } from '@tauri-apps/api';
import { setTemporaryTheme } from 'state/theme';
import { preventAppHide } from 'state/misc';

async function setupEventListeners() {
  await listen('tauri://blur', async () => {
    console.log('blurred');
    if (preventAppHide() === true) {
      return;
    }
    setInputText('');
    invoke('app_hide_show', { forceHide: true });
    setTemporaryTheme(null);
  });

  await listen('tauri://focus', async () => {
    document.querySelector<HTMLInputElement>('[data-id="main-input"]')?.focus();
  });
}

async function createConfigDirectory() {
  await readDir(YAL_DIR, { dir: BaseDirectory.Home }).catch(async (err) => {
    await createDir(YAL_DIR_PLUGINS, {
      dir: BaseDirectory.Home,
      recursive: true,
    });
  });
}

export async function setup() {
  await watchRoot();
  await exposeWindowProperties();
  await loadConfig();
  await setupEventListeners();
  await createConfigDirectory();
  await setAppsToStore();
  await setupPlugins();
}

async function watchRoot() {
  // can also watch an array of paths
  const yalPath = await getYalPath();
  const stopWatching = await watch(yalPath, { recursive: true }, (event) => {
    console.log('event', event);
    location.reload();
  });
}
