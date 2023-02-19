import { createSignal } from 'solid-js';
import { getYalPath } from 'utils/constants';

type Config = {
  [key: string]: unknown;
};

export const configStore = createSignal<null | Config>(null);
const [config, setConfig] = configStore;
export { config, setConfig };

async function writeConfigJson(config: Config) {
  const path = await getConfigPath();
  await yal.fs.writeFile({
    path,
    contents: JSON.stringify(config, null, 2),
  });
}

export const updateConfig = async (
  configUpdate: Config,
  writeConfig = false
) => {
  const json = await getConfigJson();
  const config = { ...json, ...configUpdate };
  if (writeConfig) {
    await writeConfigJson(config);
  }
  await setLocalConfig(config);
};

async function getConfigPath() {
  const dir = await getYalPath();
  const configPath = `${dir}/config.json`;
  return configPath;
}

async function getConfigJson() {
  const configPath = await getConfigPath();
  const res = await yal.fs.readTextFile(configPath);
  let json: Config;
  try {
    json = JSON.parse(res);
  } catch (e) {
    json = {};
  }
  return json;
}

export const setLocalConfig = async (json: Config) => {
  setConfig(json);
};

export const loadConfig = async () => {
  const json = await getConfigJson();
  await setLocalConfig(json);
};
