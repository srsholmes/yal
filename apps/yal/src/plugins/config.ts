import { getYalPath } from 'utils/constants';
import { YalPlugin, YalPluginsConfig } from '@yal-app/types';

export const configPlugin: YalPlugin = (args) => {
  args.setState({
    heading: 'Settings',
    action: async () => {
      const dir = await getYalPath();
      const configPath = `${dir}/config.json`;
      await yal.shell.open({ path: configPath });
    },
    state: {
      name: 'Settings',
      icon: 'settings',
      description: 'Configuration settings...',
    },
  });
};

export const config: YalPluginsConfig = {
  keywords: ['config'],
};

export default configPlugin;
