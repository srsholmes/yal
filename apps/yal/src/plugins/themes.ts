import { YalPlugin, YalPluginsConfig } from '@yal-app/types';
import { updateConfig } from 'state/config';
import { DEFAULT_THEME_NAME, getAvailableThemes } from 'state/theme';

const themesPlugin: YalPlugin = async (args) => {
  const themes = await getAvailableThemes();

  args.setState({
    heading: 'Themes',
    action: async (result) => {
      await updateConfig({ theme: result.item.name }, true);
    },
    state: [
      {
        icon: 'folder-theme',
        name: DEFAULT_THEME_NAME,
        description: 'The Default Theme',
      },
      ...themes.map((theme) => {
        return {
          icon: 'folder-theme',
          name: theme,
          description: theme,
        };
      }),
    ],
  });
};

export const config: YalPluginsConfig = {
  keywords: ['themes'],
};

export default themesPlugin;
