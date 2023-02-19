import { createSignal } from 'solid-js';

const pluginDevMode = createSignal(false);

const [isPluginDevMode, setIsPluginDevMode] = pluginDevMode;

export { isPluginDevMode, setIsPluginDevMode };
