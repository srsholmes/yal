import { createStore } from 'solid-js/store';
import { loadPlugins } from 'utils/third-party-plugins';
import type { YalPluginsMap, YalThirdPartyPluginModule } from 'types';
import appsPlugin from 'plugins/apps';
import systemPlugin from 'plugins/system';
import getKeywords, * as getKeywordsPlugin from 'plugins/keywords';
import * as reloadPlugin from 'plugins/reload';
import * as reindexPlugin from 'plugins/reindex-apps';
import * as getIconsPlugin from 'plugins/icons-viewer';
import * as testAppPlugin from 'plugins/app-test';
import * as configPlugin from 'plugins/config';
import * as themesPlugin from 'plugins/themes';
import * as themesTestPlugin from 'plugins/theme-tester';
import * as fileSearchPlugin from 'plugins/file-search';
import * as toastTestPlugin from 'plugins/toast-tester';
import * as testPlugin from 'plugins/tester';

const BUILT_IN_KEYWORD_PLUGINS = [
  getKeywordsPlugin,
  reloadPlugin,
  reindexPlugin,
  getIconsPlugin,
  testAppPlugin,
  configPlugin,
  themesPlugin,
  themesTestPlugin,
  fileSearchPlugin,
  toastTestPlugin,
  testPlugin,
] as YalThirdPartyPluginModule[];

const builtInKeywordPlugins = BUILT_IN_KEYWORD_PLUGINS.reduce((acc, curr) => {
  if (curr?.config?.keywords) {
    const keywords = Array.isArray(curr.config.keywords)
      ? curr.config.keywords
      : [curr.config.keywords];
    keywords.forEach((keyword) => {
      acc[keyword] = {
        plugin: curr.default,
        pluginName: curr.default.name,
        filter: curr.config.filter,
        isApp: curr.config.isApp,
        throttle: curr.config.throttle,
        debounce: curr.config.debounce,
        keepOpen: curr.config.keepOpen,
      };
    });
    return acc;
  }
  return acc;
}, {});

export type PluginsState = AllPlugins | null;

export const pluginsStore = createStore<PluginsState>(null);
const [plugins, setPlugins] = pluginsStore;

export { plugins, setPlugins };

export type AllPlugins = {
  yal: YalPluginsMap;
  keyword: YalPluginsMap;
};

const BASE_PLUGINS = {
  yal: {
    apps: {
      plugin: appsPlugin,
    },
    system: {
      plugin: systemPlugin,
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
        keyword: {
          plugin: getKeywords(thirdPartyPlugins.pluginsWithKeywordsMap),
        },
        ...thirdPartyPlugins.pluginsWithKeywordsMap,
      },
    };
    console.log('ALL PLUGINS', newLocal);
    return newLocal;
  });
}
