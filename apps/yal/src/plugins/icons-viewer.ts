import { YalPlugin, YalPluginsConfig } from '@yal-app/types';
import { icons } from 'utils/icons/constants';

export const getIcons: YalPlugin = async (args) => {
  args.setState({
    heading: `Available Icons`,
    state: icons,
    action: async ({ item }) => {
      await yal.copyToClipboard(item.name);
      await yal.notification.sendNotification('Copied to clipboard!');
    },
  });
};

export const config: YalPluginsConfig = {
  keywords: 'icons',
};

export default getIcons;
