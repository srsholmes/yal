import type { YalPluginsMap, YalThirdPartyPluginModule } from 'types';
import { BaseDirectory, readDir } from '@tauri-apps/api/fs';
import { YAL_DIR_PLUGINS } from 'utils/constants';
import { sleep } from 'utils/utils';
import { startServer, stopServer } from 'utils/dotfile-server';
import { setIsPluginDevMode } from 'state/plugin-dev-mode';

async function checkForPluginDevServer(): Promise<boolean> {
  const developmentPlugin: YalThirdPartyPluginModule = await import(
    // @ts-ignore
    /* viteIgnore: true */ 'http://localhost:4567/index.js'
  ).catch((err) => {
    console.log(`Could not import plugin ${name}`, err);
  });
  if (developmentPlugin) {
    setIsPluginDevMode(true);
  }
  return Boolean(developmentPlugin);
}

async function getPluginsAndWaitForServer() {
  const pluginsDir = await readDir(YAL_DIR_PLUGINS, {
    dir: BaseDirectory.Home,
  }).catch((err) => console.log('yal plugins dir not found', err));

  // Guard against empty plugins folders
  if (!pluginsDir || pluginsDir.length === 0) return [];

  const pluginNames = pluginsDir
    .filter((x) => {
      // children array means folder
      return x.children;
    })
    .map((x) => x.name);

  if (pluginNames.length === 0) return;
  let serverConnected = false;
  // Wait for the server to spin up....
  while (!serverConnected) {
    await sleep(300);
    const name = pluginNames[0];
    const plugin: YalThirdPartyPluginModule = await import(
      `http://127.0.0.1:7865/plugins/${name}/src/index.js`
    ).catch((err) => {
      console.log(err);
      console.log("Couldn't connect, retry");
    });
    if (plugin) {
      serverConnected = true;
    }
  }
  return pluginNames;
}

const CONFIG_KEYS = [
  'filter',
  'debounce',
  'isApp',
  'keepOpen',
  'throttle',
] as const;

export async function loadThirdPartyPlugins(): Promise<{
  pluginsMap: YalPluginsMap;
  pluginsWithKeywordsMap: YalPluginsMap;
}> {
  const devModePlugin = await checkForPluginDevServer();
  const plugins = await getPluginsAndWaitForServer();
  const pluginsMap: YalPluginsMap = {};
  const pluginsWithKeywordsMap: YalPluginsMap = {};

  if (devModePlugin) {
    plugins.unshift('devModePlugin');
  }

  // TODO: Change this to a promise.all
  for (const name of plugins) {
    if (name) {
      // es6 modules have to be imported from a web server.
      const plugin: YalThirdPartyPluginModule =
        name === 'devModePlugin'
          ? await import(
              `http://127.0.0.1:4567/index.js${`?foo=${Math.random()
                .toString(16)
                .substring(10)
                .toLowerCase()}`}`
            ).catch((err) => {
              console.log(`Could not import plugin ${name}`, err);
            })
          : await import(
              /* viteIgnore: true */ `http://127.0.0.1:7865/plugins/${name}/src/index.js${`?foo=${Math.random()
                .toString(16)
                .substring(10)
                .toLowerCase()}`}`
            ).catch((err) => {
              console.log(`Could not import plugin ${name}`, err);
            });

      if (plugin) {
        if (plugin.config?.keywords) {
          if (typeof plugin.config?.keywords === 'string') {
            pluginsWithKeywordsMap[plugin.config?.keywords] = {
              plugin: plugin.default,
              pluginName: name,
            };

            CONFIG_KEYS.forEach((configOption) => {
              if (plugin?.config?.[configOption] != null) {
                pluginsWithKeywordsMap[plugin.config?.keywords as string] = {
                  ...pluginsWithKeywordsMap[plugin.config?.keywords as string],
                  [configOption]: plugin.config[configOption],
                };
              }
            });
          } else {
            plugin.config?.keywords.forEach((keyword) => {
              pluginsWithKeywordsMap[keyword] = {
                plugin: plugin.default,
                pluginName: name,
              };

              CONFIG_KEYS.forEach((configOption) => {
                if (plugin?.config?.[configOption] != null) {
                  pluginsWithKeywordsMap[keyword] = {
                    ...pluginsWithKeywordsMap[keyword],
                    [configOption]: plugin.config[configOption],
                  };
                }
              });
            });
          }
        } else {
          pluginsMap[name] = {
            plugin: plugin.default,
          };

          CONFIG_KEYS.forEach((configOption) => {
            if (plugin?.config?.[configOption] != null) {
              pluginsMap[name] = {
                ...pluginsMap[name],
                [configOption]: plugin.config[configOption],
              };
            }
          });
        }
      }
    }
  }
  return {
    pluginsMap,
    pluginsWithKeywordsMap,
  };
}

export async function loadPlugins() {
  const id = await startServer();
  if (id) {
    console.log(`started plugins server with pid: ${id}`);
    const plugins = await loadThirdPartyPlugins();
    await stopServer(id.toString());
    console.log({ plugins });
    return plugins;
  }
}
