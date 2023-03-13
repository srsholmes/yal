import { Icon } from '@yal-app/types';
import { createEffect, createSignal, Match, Switch } from 'solid-js';
import { tailwindClasses } from 'state/theme';
import { getIcon } from 'utils/icons';

interface Props {
  icon?: string | Icon;
  pluginName: string;
}

export const ResultIcon = (props: Props) => {
  const [icon, setIcon] = createSignal('');
  createEffect(async () => {
    if (typeof props.icon === 'string') {
      const res = await getIcon({
        icon: props.icon,
        pluginName: props.pluginName,
      });
      if (res) {
        setIcon(res);
      } else {
        setIcon('');
      }
    }
  });

  return (
    <Switch fallback={null}>
      <Match when={Boolean(icon()) === true}>
        <div class={tailwindClasses()['result-item-icon']}>
          <img alt="icon" src={icon()} class="w-full" />
        </div>
      </Match>
      <Match
        when={
          Boolean(icon()) === false &&
          typeof props.icon === 'string' &&
          props.icon !== ''
        }
      >
        <div class="flex h-50 w-50 flex-none items-center justify-center rounded-lg overflow-hidden">
          <span class="result-icon text-5xl w-full">
            {props.icon as string}
          </span>
        </div>
      </Match>
    </Switch>
  );
};
