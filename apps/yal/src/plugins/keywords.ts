import type { YalPlugin, YalPluginsConfig } from '@yal-app/types';
import { YalPluginsMap } from 'types';

export const getKeywords = (keywordMap: YalPluginsMap): YalPlugin => {
  return (args) => {
    const keywords = Object.entries(keywordMap).map((x) => {
      const [keyword, plugin] = x;
      return {
        name: keyword,
        icon: 'folder-plugin',
        description: plugin.pluginName,
      };
    });

    args.setState({
      heading: `Registered Keywords`,
      action: (result) => {
        args.utils.setInputText(result.item.name);
      },
      state: keywords,
    });
  };
};

export const config: YalPluginsConfig = {
  keywords: 'keywords',
};

export default getKeywords;
