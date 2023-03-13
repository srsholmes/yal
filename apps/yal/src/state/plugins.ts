import { createStore } from 'solid-js/store';
import { loadPlugins } from 'utils/third-party-plugins';
import type { YalPluginsMap, YalThirdPartyPluginModule } from 'types';
import appsPlugin from 'plugins/apps';
import systemPlugin from 'plugins/system';
import getKeywords, * as getKeywordsPlugin from 'plugins/keywords';
import * as reloadPlugin from 'plugins/reload';
import * as reindexPlugin from 'plugins/reindex-apps';
import * as getIconsPlugin from 'plugins/icons-viewer';
import * as configPlugin from 'plugins/config';
import * as themesPlugin from 'plugins/themes';
import * as themesTestPlugin from 'plugins/theme-tester';
import * as fileSearchPlugin from 'plugins/file-search';
import * as toastTestPlugin from 'plugins/toast-tester';
import * as testPlugin from 'plugins/tester';
import { YalPluginsConfig } from '@yal-app/types';

const BUILT_IN_KEYWORD_PLUGINS = [
  getKeywordsPlugin,
  reloadPlugin,
  reindexPlugin,
  getIconsPlugin,
  configPlugin,
  themesPlugin,
  themesTestPlugin,
  fileSearchPlugin,
  toastTestPlugin,
  testPlugin,
] as YalThirdPartyPluginModule[];

const DEFAULT_CONFIG: Required<YalPluginsConfig> = {
  keywords: [],
  filter: false,
  debounce: false,
  throttle: false,
  isApp: false,
  keepOpen: false,
};

const builtInKeywordPlugins = BUILT_IN_KEYWORD_PLUGINS.reduce((acc, curr) => {
  if (curr?.config?.keywords) {
    const keywords = Array.isArray(curr.config.keywords)
      ? curr.config.keywords
      : [curr.config.keywords];
    keywords.forEach((keyword) => {
      acc[keyword] = {
        plugin: curr.default,
        pluginName: curr.default.name,
        filter: curr.config?.filter,
        isApp: curr.config?.isApp,
        throttle: curr.config?.throttle,
        debounce: curr.config?.debounce,
        keepOpen: curr.config?.keepOpen,
      };
    });
    return acc;
  }
  return acc;
}, {} as YalPluginsMap);

export type PluginsState = AllPlugins;

export const pluginsStore = createStore<PluginsState>({
  yal: {},
  keyword: {},
});
const [plugins, setPlugins] = pluginsStore;

export { plugins, setPlugins };

export type AllPlugins = {
  yal: YalPluginsMap;
  keyword: YalPluginsMap;
};

const BASE_PLUGINS: AllPlugins = {
  yal: {
    apps: {
      pluginName: 'apps',
      plugin: appsPlugin,
      ...DEFAULT_CONFIG,
      filter: true,
    },
    system: {
      pluginName: 'system',
      plugin: systemPlugin,
      ...DEFAULT_CONFIG,
      filter: true,
    },
  },
  keyword: builtInKeywordPlugins,
};

export async function setupPlugins() {
  setPlugins(BASE_PLUGINS);
  const thirdPartyPlugins = await loadPlugins();
  setPlugins((prev) => {
    const newLocal = {
      yal: {
        ...prev.yal,
        ...thirdPartyPlugins.pluginsMap,
      },
      keyword: {
        ...prev.keyword,
        plugins: {
          plugin: getKeywords(thirdPartyPlugins),
          ...DEFAULT_CONFIG,
          pluginName: 'plugins',
          filter: true,
          keepOpen: true,
        },
        ...thirdPartyPlugins.pluginsWithKeywordsMap,
      },
    };
    console.log('ALL PLUGINS', newLocal);
    return newLocal;
  });
}
