import { YalPlugin, YalPluginsConfig } from '@yal-app/types';

let counter = 0;

const testApp: YalPlugin = (args) => {
  const { appNode } = args;
  const html = /*html*/ `
    <div class='plugin-test-app-wrapper p-5'>
      <h2 class="text-xl mb-3">This is a basic plugin</h2>
      <button class='bg-orange-300 inc p-2 rounded text-white'>Increment</button>
      <button class='bg-green-700 dec p-2 rounded text-white'>Decrement</button>
      <div>
        <span class='text-xl span-counter'>Count: ${counter}</span>
      </div>
    </div>
  `;

  appNode.innerHTML = html;
  function updateSpan() {
    const span = document.querySelector('.span-counter');
    span.innerHTML = `Count: ${counter}`;
  }
  appNode.querySelector('.inc').addEventListener('click', () => {
    counter++;
    updateSpan();
  });
  appNode.querySelector('.dec').addEventListener('click', () => {
    counter--;
    updateSpan();
  });
};

export const config: YalPluginsConfig = {
  keywords: ['test'],
};

export default testApp;
