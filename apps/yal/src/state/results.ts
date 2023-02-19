import { createSignal } from 'solid-js';

export const resultsState = createSignal({});

const [results, setResults] = resultsState;

export { results, setResults };
