import { createSignal } from 'solid-js';

export const inputStore = createSignal('convert');

const [inputText, setInputText] = inputStore;
export { inputText, setInputText };
