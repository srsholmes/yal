import { createSignal } from 'solid-js';

export const inputStore = createSignal('');

const [inputText, setInputText] = inputStore;
export { inputText, setInputText };
