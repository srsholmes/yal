import { createSignal } from 'solid-js';

export const inputStore = createSignal('markdown');

const [inputText, setInputText] = inputStore;
export { inputText, setInputText };
