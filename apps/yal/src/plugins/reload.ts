import { Action, YalPlugin } from '@yal-app/types';
import { setupPlugins } from 'state/plugins';

export const reload: YalPlugin = (args) => {
  const action: Action = async () => {
    args.setState({
      heading: `Reindex Apps`,
      action,
      state: {
        name: 'Reindex Apps',
        description: 'Reloading plugins....',
        icon: 'folder-plugin',
      },
    });
    await setupPlugins();
    args.setState({
      heading: `Reload Plugins`,
      action,
      state: {
        name: 'Reload plugins',
        description: 'Reloaded plugins successfully!',
        icon: 'folder-plugin',
      },
    });
  };
  args.setState({
    heading: `Reload Plugins`,
    action,
    state: {
      name: 'Reload plugins',
      description: 'Reload the plugins from the system',
      icon: 'folder-plugin',
    },
  });
};

export default reload;

export const config = {
  keywords: 'reload',
};
