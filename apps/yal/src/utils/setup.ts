import { listen } from '@tauri-apps/api/event';
import { BaseDirectory, createDir, readDir } from '@tauri-apps/api/fs';
import { setAppsToStore } from 'state/apps';
import { config, loadConfig } from 'state/config';
import { setInputText } from 'state/input';
import { setupPlugins } from 'state/plugins';
import { watch } from 'tauri-plugin-fs-watch-api';
import { getYalPath, YAL_DIR, YAL_DIR_PLUGINS } from 'utils/constants';
import { exposeWindowProperties } from 'utils/plugin-actions';
import { invoke } from '@tauri-apps/api';
import { preventAppHide } from 'state/misc';
import { setToast } from 'state/toast';

async function setupEventListeners() {
  await listen('tauri://blur', async () => {
    if (preventAppHide() === true) {
      return;
    }
    setInputText('');
    invoke('app_hide_show', { forceHide: true });
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
  await codeHighlighting();
}

async function watchRoot() {
  // can also watch an array of paths
  const yalPath = await getYalPath();
  await watch(yalPath, { recursive: true }, () => {
    location.reload();
  });
}
function codeHighlighting() {
  const configJson = config();
  if (configJson?.['code_theme']) {
    import(`../styles/prism-themes/${configJson['code_theme']}.css`).catch(
      (e) => {
        setToast({
          message: `Theme ${configJson['code_theme']} not found`,
          type: 'error',
        });
      }
    );
  } else {
    import('../styles/prism-themes/nord.css').then(() => {
      console.log('gruvbox loaded');
    });
  }
}
