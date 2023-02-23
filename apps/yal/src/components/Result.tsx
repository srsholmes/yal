import { invoke } from '@tauri-apps/api';
import { PluginResult, ResultLineItem } from '@yal-app/types';
import { ResultIcon } from 'components/ResultIcon';
import { createEffect, createSignal, For, Show } from 'solid-js';
import { unwrap } from 'solid-js/store';
import { apps } from 'state/apps';
import { inputText, setInputText } from 'state/input';
import { setResults } from 'state/results';
import { tailwindClasses } from 'state/theme';
import { setToast } from 'state/toast';
import { PluginResultInternal, ResultsProps } from 'types';
import { debounce as debounceFn } from 'utils/debounce';
import { filterResults } from 'utils/filter-results';
import { pluginActions } from 'utils/plugin-actions';
import { throttle } from 'utils/throttle';
import { Markdown } from 'components/Markdown';

export function Result(props: ResultsProps) {
  const fn = unwrap(props.plugin);
  const pluginFn = props.debounce
    ? debounceFn(fn, typeof props.debounce === 'number' ? props.debounce : 500)
    : props.throttle
    ? throttle(fn, typeof props.throttle === 'number' ? props.throttle : 500)
    : fn;

  const [pluginState, setState] = createSignal<PluginResultInternal>({
    state: [],
    action: () => {},
    heading: '',
  });

  function setStateFromPlugin(pluginState: PluginResult) {
    setState({
      heading: pluginState.heading,
      action: pluginState.action,
      focus: pluginState.focus,
      state: Array.isArray(pluginState.state)
        ? pluginState.state
        : [pluginState.state],
    });
  }

  function setGlobalResults(pluginResult) {
    setResults((prev) => {
      return {
        ...prev,
        [props.pluginName]: {
          action: pluginResult.action,
          focus: pluginResult.focus,
          state: filteredResults,
          setState: setStateFromPlugin,
          keepOpen: props.keepOpen,
        },
      };
    });
  }

  createEffect(async () => {
    const pluginResult = await pluginFn({
      pluginPath: `${yal.config.pluginsPath}/${props.pluginName}`,
      text: searchTerm(),
      setState: (pluginResult: PluginResult) => {
        setStateFromPlugin(pluginResult);
        setGlobalResults(pluginResult);
      },
      system: {
        apps: unwrap(apps()),
      },
      utils: {
        setInputText,
        setToast,
      },
    });
    if (typeof pluginResult !== 'undefined') {
      setStateFromPlugin(pluginResult);
      setGlobalResults(pluginResult);
    }
  });

  const hasResults = () => filteredResults().length > 0;

  createEffect(async () => {
    if (inputText() && hasResults()) {
      await Promise.resolve(); // Wait for DOM to render.
      const resultItems = document.querySelectorAll('[data-id="result-item"]');
      const target = resultItems[0] as HTMLElement;
      if (target) {
        target.classList.add('highlight');
        const event = new Event('mouseenter');
        target.dispatchEvent(event);
      }
      return;
    }
  });

  function searchTerm() {
    return props.type === 'keyword'
      ? inputText().slice(inputText().split(' ')[0].length + 1)
      : inputText();
  }

  function filteredResults() {
    return filterResults({
      items: pluginState().state,
      searchTerm: searchTerm(),
      type: props.type,
      filter: props.filter,
    });
  }

  function handleResultClick(item: ResultLineItem) {
    return async (e) => {
      if (item.format === 'md') return;
      e.preventDefault();
      await pluginState().action({
        item,
        searchText: inputText(),
        setState,
        pluginActions,
      });

      if (!props.keepOpen === true) {
        setInputText('');
        await invoke('app_hide_show', { forceHide: true });
      }
    };
  }

  async function handleHoverIn({
    event,
    item,
    result,
  }: {
    event: MouseEvent;
    item: ResultLineItem;
    result: PluginResult;
  }) {
    const highlightClasses = tailwindClasses()['highlight'].split(' ');
    const currentHighlight = document.querySelector('.highlight');
    if (currentHighlight) {
      currentHighlight.classList.remove(...highlightClasses, 'highlight');
    }
    const target = event.target as Element;
    target.classList.add(...highlightClasses, 'highlight');
    result.focus?.({ item: item, pluginActions, setState });
  }

  return (
    <Show when={hasResults()}>
      <div>
        <h2
          data-id="result-heading"
          class={tailwindClasses()['result-heading']}
          data-plugin-name={props.pluginName}
        >
          {pluginState().heading}
        </h2>
        <ul class={tailwindClasses()['results-wrapper']}>
          <For each={filteredResults()} fallback={null}>
            {(resultItem, index) => (
              <li
                onMouseEnter={(e) => {
                  if (resultItem.format === 'md') return;

                  handleHoverIn({
                    event: e,
                    item: resultItem,
                    result: pluginState(),
                  });
                }}
                data-heading={pluginState().heading}
                onClick={handleResultClick(resultItem)}
                class={tailwindClasses()['result-item']}
                data-id="result-item"
              >
                <ResultIcon
                  pluginName={props.pluginName}
                  icon={resultItem?.icon}
                />
                <ResultInfo resultItem={resultItem} />
              </li>
            )}
          </For>
        </ul>
      </div>
    </Show>
  );
}

function ResultInfo({ resultItem }: { resultItem: ResultLineItem }) {
  console.log({ resultItem });
  return (
    <div
      data-id="result-item-info-wrapper"
      class={tailwindClasses()['result-item-info-wrapper']}
    >
      <p
        data-id="result-item-info-name"
        class={tailwindClasses()['result-item-name']}
      >
        {resultItem.name}
      </p>
      <div
        data-id="result-item-info-description"
        class={tailwindClasses()['result-item-description']}
      >
        <Show
          when={resultItem.format === 'md'}
          fallback={<span>{resultItem.description.trim()}</span>}
        >
          <div>
            <Markdown resultItem={resultItem} />
          </div>
        </Show>
      </div>
      <p
        data-id="result-item-info-description"
        class={tailwindClasses()['result-item-description']}
      ></p>
    </div>
  );
}
