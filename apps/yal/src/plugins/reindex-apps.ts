import { YalPlugin } from '@yal-app/types';
import { getAppsFromBackend, setApps } from 'state/apps';
import { getAppsFromDB } from 'utils/db';

const baseState = {
  heading: `Reindex Apps`,
  state: {
    name: 'Reindex Apps',
    icon: 'settings',
    description: 'Reindex the apps installed',
  },
};

export const reindex: YalPlugin = (args) => {
  args.setState({
    ...baseState,
    action: async () => {
      args.setState({
        ...baseState,
        state: {
          ...baseState.state,
          description: 'Reindexing apps....',
        },
      });
      await getAppsFromBackend();
      const appsFromDb = await getAppsFromDB();
      setApps(appsFromDb);
      args.setState({
        ...baseState,
        state: {
          ...baseState.state,
          description: 'Apps reindexed successfully!',
        },
      });
    },
  });
};

export default reindex;

export const config = {
  keywords: 'reindex',
};
