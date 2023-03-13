import type { YalPlugin, YalPluginsConfig } from '@yal-app/types';
import { YalPluginsMap } from 'types';

export const getKeywords = (plugins: {
  pluginsMap: YalPluginsMap;
  pluginsWithKeywordsMap: YalPluginsMap;
}): YalPlugin => {
  return (args) => {
    const keywords = Object.entries(plugins.pluginsWithKeywordsMap).map((x) => {
      const [keyword, plugin] = x;
      return {
        name: keyword,
        icon: 'folder-plugin',
        description: plugin.pluginName,
      };
    });

    args.setState({
      heading: `Registered Plugins with Keywords`,
      state: keywords,
      action: (result) => {
        // TODO: Fix this, it doesn't work
        if (result.item.name) {
          args.utils.setInputText(result.item.name);
        }
      },
    });
  };
};

export default getKeywords;
