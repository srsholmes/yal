import { plugins } from 'state/plugins';
import { createEffect, For, Match, Show, Switch } from 'solid-js';
import { Result } from 'components/Result';
import { inputText } from 'state/input';
import { ResultApp } from 'components/ResultApp';
import { enableMouseOnResults } from 'utils/keyboard';
import { YalPluginsMap } from 'types';
import { unwrap } from 'solid-js/store';

export function Results() {
  const firstWord = () => inputText().split(' ')[0];
  const hasKeyword = () => Boolean(plugins?.keyword?.[firstWord()]);
  const isApp = () => Boolean(plugins?.keyword?.[firstWord()]?.isApp);

  createEffect(() => {
    console.log('plugins', unwrap(plugins));
  });

  return (
    <div onMouseMove={enableMouseOnResults} data-id="results">
      <Show when={plugins != null && inputText().length > 0} fallback={null}>
        <Switch>
          <Match when={!hasKeyword()}>
            <For
              each={Object.entries<YalPluginsMap[string]>(plugins?.yal ?? {})}
              fallback={<div>Loading Plugins...</div>}
            >
              {([name, plugin], index) => (
                <Result
                  pluginName={name}
                  index={index()}
                  type="plugin"
                  plugin={plugin.plugin}
                  debounce={plugin.debounce}
                  throttle={plugin.throttle}
                  filter={plugin.filter ?? true}
                  keepOpen={plugin.keepOpen}
                />
              )}
            </For>
          </Match>
          <Match when={hasKeyword() && isApp()}>
            <ResultApp
              pluginName={firstWord()}
              index={0}
              type="keyword"
              plugin={plugins?.keyword?.[firstWord()]?.plugin}
              debounce={plugins?.keyword?.[firstWord()]?.debounce}
              throttle={plugins?.keyword?.[firstWord()]?.throttle}
              keepOpen={plugins?.keyword?.[firstWord()]?.keepOpen}
            />
          </Match>
          <Match when={hasKeyword()}>
            <Result
              pluginName={plugins?.keyword?.[firstWord()]?.pluginName}
              index={0}
              type="keyword"
              plugin={plugins?.keyword?.[firstWord()]?.plugin}
              filter={plugins?.keyword?.[firstWord()]?.filter ?? true}
              throttle={plugins?.keyword?.[firstWord()]?.throttle}
              debounce={plugins?.keyword?.[firstWord()]?.debounce}
              keepOpen={plugins?.keyword?.[firstWord()]?.keepOpen}
            />
          </Match>
        </Switch>
      </Show>
    </div>
  );
}
