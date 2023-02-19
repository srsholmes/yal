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
      action: (result) => {
        args.utils.setInputText(result.item.name);
      },
      state: keywords,
    });
  };
};

export const config: YalPluginsConfig = {
  keywords: 'plugins',
};

export default getKeywords;
