import { createSignal } from 'solid-js';

export const appReady = createSignal(false);
const [isAppReady, setIsAppReady] = appReady;

const shouldPreventAppHide = createSignal(false);
const [preventAppHide, setPreventAppHide] = shouldPreventAppHide;

const appPluginActive = createSignal(false);
const [isAppPluginActive, setIsAppPluginActive] = appPluginActive;

export {
  isAppReady,
  setIsAppReady,
  preventAppHide,
  setPreventAppHide,
  isAppPluginActive,
  setIsAppPluginActive,
};
