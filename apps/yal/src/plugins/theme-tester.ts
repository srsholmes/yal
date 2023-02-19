import { YalPlugin, YalPluginsConfig } from '@yal-app/types';
import { setPreventAppHide } from 'state/misc';

const themesTestPlugin: YalPlugin = async (args) => {
  setPreventAppHide(true);
  args.setState({
    heading: 'Themes',
    action: async (result) => {
      setPreventAppHide(false);
      console.log('action', result);
    },
    state: Array.from({ length: 30 }).map((_, i) => {
      return {
        icon: 'folder-theme',
        name: `Theme ${i}`,
        description: `Theme ${i}`,
      };
    }),
  });
};

export const config: YalPluginsConfig = {
  keywords: ['themestest'],
};

export default themesTestPlugin;
