import { createEffect, onCleanup, onMount } from 'solid-js';
import { unwrap } from 'solid-js/store';
import { apps } from 'state/apps';
import { inputText, setInputText } from 'state/input';
import { setIsAppPluginActive } from 'state/misc';
import {
  appendTailwindCSS,
  generateTailwindCSSFromHTML,
  tailwindClasses,
} from 'state/theme';
import { setToast } from 'state/toast';
import { ResultsProps } from 'types';
import { debounce as debounceFn } from 'utils/debounce';
import { throttle } from 'utils/throttle';

export function ResultApp(props: ResultsProps) {
  const fn = unwrap(props.plugin);
  const pluginFn = props.debounce
    ? debounceFn(fn, typeof props.debounce === 'number' ? props.debounce : 500)
    : props.throttle
    ? throttle(fn, typeof props.throttle === 'number' ? props.throttle : 500)
    : fn;

  const searchTerm = () =>
    inputText().slice(inputText().split(' ')[0].length + 1);

  createEffect(async () => {
    await pluginFn({
      setState: () => {},
      text: searchTerm(),
      pluginPath: `${yal.config.pluginsPath}/${props.pluginName}`,
      appNode: document.getElementById('app')!,
      system: {
        apps: unwrap(apps()),
      },
      utils: {
        setInputText: setInputText,
        setToast: setToast,
      },
    });
    await generateCSS();
  });

  async function generateCSS() {
    const html = document.getElementById('app')?.innerHTML;
    if (!html) return;
    const { css } = await generateTailwindCSSFromHTML(html);
    appendTailwindCSS(css, 'tailwind-plugin-classes');
  }

  createEffect(() => {
    const callback = async (mutationList: MutationRecord[]) => {
      if (mutationList.length > 0) {
        await generateCSS();
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.getElementById('app')!, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });
  });

  onMount(() => {
    setIsAppPluginActive(true);
  });

  onCleanup(() => {
    setIsAppPluginActive(false);
  });

  return (
    <div class={tailwindClasses()['result-item-app-wrapper']}>
      <div id="app"></div>
    </div>
  );
}
