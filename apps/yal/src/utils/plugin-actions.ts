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
    run: async ({ binary, args }: { binary: string; args?: string[] }) => {
      console.log('run', { binary, args });
      const path = await invoke<string>('which', { path: binary });
      if (path === '' || !path) {
        setToast({
          type: 'error',
          message: `Could not find ${binary}. It looks like ${binary} is not installed on your system. Please install it to run this plugin, or use the full path when invoking the plugin.`,
        });
        return;
      }
      const res = await yal.shell.shellCommand({
        path: path,
        args,
      });
      return res;
    },
    Command: index.shell.Command,
    shellCommand: async ({ path, args }: { path: string; args?: string[] }) => {
      // console.log('shellCommand', { path, args });
      console.log('shellCommand', { path, args });

      // if any of the args have spaces, wrap them in quotes
      const argsWithQuotes = args?.map((arg) => {
        if (arg.includes(' ')) {
          return `"${arg}"`;
        }
        return arg;
      });

      console.log('argsWithQuotes', argsWithQuotes);
      const res = await new yal.shell.Command('shell', [
        '-c',
        `${path} ${args?.length > 0 ? argsWithQuotes.join(' ') : ''}`,
      ]).execute();
      // console.log({ res });
      // console.log('res.stdout', res.stdout);
      // console.log('res.stderr', res.stderr);
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
    notification: pluginActions.notification,
    ...pluginActions,
  };
}
