import { path } from '@tauri-apps/api';
import type { PluginArgs, YalPluginsConfig } from '@yal-app/types';
import { YalPlugin } from '@yal-app/types';
import { config as appConfig } from 'state/config';
import { setToast } from 'state/toast';
import toast from 'solid-toast';

let myToast: typeof toast | null = null;

async function search(args: PluginArgs) {
  const c = appConfig();
  const paths = [
    await path.desktopDir(),
    await path.pictureDir(),
    await path.documentDir(),
    await path.downloadDir(),
    await path.audioDir(),
    await path.videoDir(),
  ];

  if (myToast === null) {
    myToast = setToast({ message: 'Search for files...', type: 'loading' });
  }
  if (args.text === '') return [];

  const command = yal.shell.Command.sidecar('bin/fd', [
    args.text,
    ...paths,
    ...(Array.isArray(c?.directories) && c?.directories != null
      ? c.directories
      : []),
    '_E',
    '/node_mdoules/',
  ]);

  const output = await command.execute();

  myToast?.dismiss();
  myToast = null;

  return output.stdout
    .split('\n')
    .slice(0, 40)
    .map((line) => {
      const name = line.split('/').pop();
      return {
        name,
        description: line,
        icon: line,
      };
    });
}

export const fileSearchPlugin: YalPlugin = async (args) => {
  args.setState({
    heading: `File Search`,
    action: (result) => {
      if (result.item.description) {
        yal.shell.open({ path: result.item.description });
      }
    },
    state: await search(args),
  });
};

export const config: YalPluginsConfig = {
  keywords: ['/'],
};

export default fileSearchPlugin;
