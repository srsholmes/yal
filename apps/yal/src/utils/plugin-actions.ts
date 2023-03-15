import * as index from '@tauri-apps/api';
import { writeText } from '@tauri-apps/api/clipboard';
import { convertFileSrc, invoke } from '@tauri-apps/api/tauri';
import { PluginActions } from '@yal-app/types';
import { setPreventAppHide } from 'state/misc';
import { setToast } from 'state/toast';
import { debounce } from './debounce';
import { throttle } from './throttle';
import Prism from 'prismjs';
import { highlightAll } from './highlight';
import { ChildProcess } from '@tauri-apps/api/shell';
import WebFont from 'webfontloader';

export const pluginActions: PluginActions = {
  copyToClipboard: (text: string) => {
    return writeText(text);
  },
  fs: index.fs,
  app: index.app,
  dialog: {
    ...index.dialog,
    open: async (options) => {
      setPreventAppHide(true);
      const res = await index.dialog.open(options);
      setPreventAppHide(false);
      return res;
    },
  },
  globalShortcut: index.globalShortcut,
  http: index.http,
  notification: index.notification,
  path: {
    ...index.path,
    convertFileSrc,
  },
  process: index.process,
  shell: {
    run: async ({
      binary,
      args,
    }: {
      binary: string;
      args?: string[];
    }): Promise<ChildProcess | void> => {
      console.log('run', { binary, args });
      const path = await invoke<string>('which', { path: binary });
      if (path === '' || !path) {
        setToast({
          type: 'error',
          message: `Could not find ${binary}. It looks like ${binary} is not installed on your system. Please install it to run this plugin, or use the full path when invoking the plugin.`,
        });
        return;
      }
      return await yal.shell.shellCommand({
        path: path,
        args,
      });
    },
    Command: index.shell.Command,
    shellCommand: async ({ path, args }: { path: string; args?: string[] }) => {
      // if any of the args have spaces, wrap them in quotes
      const argsWithQuotes = args?.map((arg) => {
        if (arg.includes(' ')) {
          return `"${arg}"`;
        }
        return arg;
      });

      const allArgs = args
        ? args?.length > 0
          ? argsWithQuotes?.join(' ')
          : ''
        : '';

      const res = await new yal.shell.Command('shell', [
        '-c',
        `${path} ${allArgs}`,
      ]).execute();
      return res;
    },
    open: async ({ path, args }: { path: string; args?: string[] }) => {
      // console.log('open', { path, args });
      const res = await new yal.shell.Command('open', [`${path}`]).execute();
      // console.log({ res });
      // console.log('res.stdout', res.stdout);
      // console.log('res.stderr', res.stderr);
      return res;
    },
    appleScript: async ({ command }: { command: string }) => {
      new pluginActions.shell.Command('osascript', ['-e', command]).spawn();
    },
  },
  windowUtils: index.window,
};

export async function exposeWindowProperties() {
  const HOME_DIR = await pluginActions.path.homeDir();
  const PLUGINS_PATH = `${HOME_DIR}.yal/plugins`;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.yal = {
    WebFont: WebFont,
    config: {
      pluginsPath: PLUGINS_PATH,
    },
    toast: {
      setToast: setToast,
    },
    debounce,
    throttle,
    Prism: Prism,
    code: {
      highlightAll: highlightAll,
    },
    ...pluginActions,
  };
}
