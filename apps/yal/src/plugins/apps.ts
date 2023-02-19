import { apps } from 'state/apps';
import type { ResultLineItem } from '@yal-app/types';
import { YalPlugin } from '@yal-app/types';

export function appEntriesToKeyedMap(): ResultLineItem[] {
  return apps().map((entry) => {
    const [key] = Object.keys(entry);
    const n = key.lastIndexOf('/');
    const result = key.substring(n + 1);
    return {
      name: result.replace('.app', '').replace('.prefPane', ''),
      description: key,
      icon: entry[key].icon,
    };
  });
}

export const appsPlugin: YalPlugin = (args) => {
  args.setState({
    heading: `Applications`,
    action: (result) => {
      console.log(result);
      yal.shell.open({ path: result.item.description });
    },
    state: appEntriesToKeyedMap(),
  });
};

export default appsPlugin;
