import { Alert } from 'components/Alert';
import { Input } from 'components/Input';
import { Results } from 'components/Results';
import { Component, createEffect, onMount } from 'solid-js';
import { setIsAppReady } from 'state/misc';
import { tailwindClasses } from 'state/theme';
import { setup } from 'utils/setup';

export const App: Component = () => {
  onMount(() => {
    setIsAppReady(true);
  });

  createEffect(async () => {
    await setup();
  });

  return (
    <div id="yal-wrapper" class="yal-wrapper">
      <div class={tailwindClasses()['app-wrapper']}>
        <section
          data-id="main-wrapper"
          class={tailwindClasses()['main-wrapper']}
        >
          <Input />
          <div class={tailwindClasses()['results-wrapper-height']}>
            <Results />
          </div>
        </section>
      </div>
      <Alert />
    </div>
  );
};
