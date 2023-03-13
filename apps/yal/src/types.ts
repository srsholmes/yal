import {
  PluginResult,
  ResultLineItem,
  YalPlugin,
  YalPluginsConfig,
} from '@yal-app/types';

export type YalPluginsMap = {
  [key: string]: Omit<ResultsProps, 'index' | 'type'>;
};

export type ResultsProps<T = unknown> = {
  index: number;
  plugin: YalPlugin;
  type: 'plugin' | 'keyword';
  pluginName: string;
  filter: Required<YalPluginsConfig['filter']>;
  debounce: Required<YalPluginsConfig['debounce']>;
  throttle: Required<YalPluginsConfig['throttle']>;
  isApp: Required<YalPluginsConfig['isApp']>;
  keepOpen: Required<YalPluginsConfig['keepOpen']>;
};

export type YalThirdPartyPluginModule = {
  default: YalPlugin;
  config?: YalPluginsConfig;
};

export type PluginResultInternal = PluginResult & {
  state: ResultLineItem[];
};

// declare global window type

declare global {
  interface Window {
    IS_PROD: boolean;
    IS_DEV: boolean;
    WebFont: any;
  }
}
