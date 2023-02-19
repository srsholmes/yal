import { AppEntry } from '@yal-app/types';
import Dexie from 'dexie';

export type AppsWithIcons = { [key: string]: string };

class AppsDatabase extends Dexie {
  public apps: Dexie.Table<AppEntry, number>;

  public constructor() {
    super('AppsDatabase');
    this.version(1).stores({
      apps: '++id,name,icon',
    });
    this.apps = this.table('apps');
  }
}

const db = new AppsDatabase();

export const getAppsFromDB = async (): Promise<AppEntry[]> => {
  const apps = await db.apps.toArray();
  return apps;
};

export const clearDB = async () => {
  await db.apps.clear();
};

export const addAppsToDB = async (blob: AppsWithIcons) => {
  const arr = Object.entries(blob).map((entry) => {
    const [app, icon] = entry;
    return {
      [app]: {
        icon,
      },
    };
  });
  await db.apps.bulkAdd(arr);
};
