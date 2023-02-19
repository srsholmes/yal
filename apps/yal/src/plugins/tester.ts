import { YalPlugin, YalPluginsConfig } from '@yal-app/types';

export const pluginTester: YalPlugin = (args) => {
  const { setState } = args;
  setState({
    heading: 'Plugin Tester',
    state: [
      {
        name: 'Test 1',
        description: 'Test 1 Description',
        metadata: { ben: 'test' },
      },
    ],
    action: (result) => {
      console.log('action', result);
      console.log(result.item.metadata.ben);
    },
  });
};

export const config: YalPluginsConfig = {
  keywords: ['tester'],
  filter: false,
  keepOpen: true,
};

export default pluginTester;
