import * as index from '@tauri-apps/api';
import { convertFileSrc } from '@tauri-apps/api/tauri';

type YalCommand = ({
  path,
  args,
}: {
  path: string;
  args?: string[];
}) => Promise<index.shell.ChildProcess>;

export type PluginActions = {
  copyToClipboard: (text: string) => Promise<void>;
  fs: typeof index.fs;
  app: typeof index.app;
  dialog: typeof index.dialog;
  globalShortcut: typeof index.globalShortcut;
  http: typeof index.http;
  notification: typeof index.notification;
  path: {
    convertFileSrc: typeof convertFileSrc;
    appDir: typeof index.path.appDir;
    appConfigDir: typeof index.path.appConfigDir;
    appDataDir: typeof index.path.appDataDir;
    appLocalDataDir: typeof index.path.appLocalDataDir;
    appCacheDir: typeof index.path.appCacheDir;
    appLogDir: typeof index.path.appLogDir;
    audioDir: typeof index.path.audioDir;
    cacheDir: typeof index.path.cacheDir;
    configDir: typeof index.path.configDir;
    dataDir: typeof index.path.dataDir;
    desktopDir: typeof index.path.desktopDir;
    documentDir: typeof index.path.documentDir;
    downloadDir: typeof index.path.downloadDir;
    executableDir: typeof index.path.executableDir;
    fontDir: typeof index.path.fontDir;
    homeDir: typeof index.path.homeDir;
    localDataDir: typeof index.path.localDataDir;
    pictureDir: typeof index.path.pictureDir;
    publicDir: typeof index.path.publicDir;
    resourceDir: typeof index.path.resourceDir;
    runtimeDir: typeof index.path.runtimeDir;
    templateDir: typeof index.path.templateDir;
    videoDir: typeof index.path.videoDir;
    logDir: typeof index.path.logDir;
    BaseDirectory: typeof index.path.BaseDirectory;
    sep: typeof index.path.sep;
    delimiter: typeof index.path.delimiter;
    resolve: typeof index.path.resolve;
    normalize: typeof index.path.normalize;
    join: typeof index.path.join;
    dirname: typeof index.path.dirname;
    basename: typeof index.path.basename;
    isAbsolute: typeof index.path.isAbsolute;
  };
  process: typeof index.process;
  shell: {
    run: ({
      binary,
      args,
    }: {
      binary: string;
      args?: string[];
    }) => Promise<index.shell.ChildProcess | void>;
    shellCommand: YalCommand;
    open: YalCommand;
    appleScript: ({ command }: { command: string }) => Promise<void>;
    Command: typeof index.shell.Command;
  };
  windowUtils: typeof index.window;
};
