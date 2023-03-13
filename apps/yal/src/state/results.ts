import { createSignal } from 'solid-js';
import { PluginResult, ResultLineItem } from '@yal-app/types';

type GlobalResults = {
  [key: string]: {
    keepOpen: boolean;
    action: PluginResult['action'];
    focus: PluginResult['focus'];
    state: () => ResultLineItem[];
    setState: (state: PluginResult['state']) => void;
  };
};
export const resultsState = createSignal<GlobalResults>({});

const [results, setResults] = resultsState;

export { results, setResults };
