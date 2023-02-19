import { createSignal } from 'solid-js';

export const appReady = createSignal(false);
const [isAppReady, setIsAppReady] = appReady;

const shouldPreventAppHide = createSignal(false);
const [preventAppHide, setPreventAppHide] = shouldPreventAppHide;

export { isAppReady, setIsAppReady, preventAppHide, setPreventAppHide };
