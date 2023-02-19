import { invoke, path } from '@tauri-apps/api';

export const MAX_WINDOW_WIDTH = 700;
export const MAX_WINDOW_HEIGHT = 600;
export const MIN_WINDOW_HEIGHT = 300;
export const INPUT_HEIGHT = 64;

export const ICON_SIZE = 64;
export const REINDEX_TIME = 30 * 60 * 1000;
export const FIXED_WRAPPER_HEIGHT = 64;
// Keyboard Key codes
export const RETURN_KEY_CODE = 'Enter';
export const ESCAPE_KEY_CODE = 'Escape';
export const ARROW_UP_KEY_CODE = 'ArrowUp';
export const ARROW_DOWN_KEY_CODE = 'ArrowDown';
export const BACKSPACE_KEY_CODE = 'Backspace';
export let IS_DEV = window.IS_DEV === true;

(() => {
  invoke('is_dev_mode')
    .then((res: boolean) => {
      IS_DEV = res;
      window.IS_DEV = res;
    })
    .catch((e) => console.error(e));
})();

// TODO: Do the same for is prod as above.
export const IS_PROD = window.IS_PROD === true;

export const RESULTS_LIST_SIZE = Infinity;

// get home directory

export const YAL_DIR = '.yal';
// TODO: Sort these out.
export const YAL_DIR_PLUGINS = `${YAL_DIR}/plugins/`;
export const YAL_DIR_CUSTOM_COMPONENTS = `${YAL_DIR}/custom-components/`;
export const YAL_DIR_THEMES = `${YAL_DIR}/themes`;

export const YAL_PATH = async () => `${await path.homeDir()}/${YAL_DIR}`;

export async function getYalPath() {
  return `${await path.homeDir()}${YAL_DIR}`;
}
export const YAL_DIR_CONFIG = `${YAL_PATH}/config.json`;
// ---------------------------------
