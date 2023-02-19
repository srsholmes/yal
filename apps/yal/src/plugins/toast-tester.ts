import { YalPlugin, ToastType, YalPluginsConfig } from '@yal-app/types';
import { setPreventAppHide } from 'state/misc';
import { setToast } from 'state/toast';

const toastTestPlugin: YalPlugin = async (args) => {
  setPreventAppHide(true);
  args.setState({
    heading: 'Toast Tester',
    action: async (result) => {
      setToast({
        message: 'Here is a test toast',
        type: result.item.name as ToastType,
      });
      setTimeout(() => {
        setPreventAppHide(false);
      }, 5000);
    },
    state: ['success', 'error', 'info', 'loading'].map((toastType) => {
      return {
        icon: 'folder-theme',
        name: toastType,
        description: toastType,
      };
    }),
  });
};

export const config: YalPluginsConfig = {
  keywords: ['toast'],
};

export default toastTestPlugin;
