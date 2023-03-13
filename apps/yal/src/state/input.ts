import { createSignal } from 'solid-js';

export const inputStore = createSignal('ben 45');

const [inputText, setInputText] = inputStore;
export { inputText, setInputText };
