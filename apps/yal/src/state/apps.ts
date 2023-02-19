import { createSignal } from 'solid-js';
import { addAppsToDB, clearDB, getAppsFromDB } from 'utils/db';
import { invoke } from '@tauri-apps/api';
import { AppEntry } from '@yal-app/types';

export type AppEntries = AppEntry[] | null;
export const appsStore = createSignal<AppEntries>([]);

const [apps, setApps] = appsStore;

export { apps, setApps };

export async function getAppsFromBackend() {
  await clearDB();
  return invoke<string>('get_app_icons').then((x) => {
    const apps = JSON.parse(x);
    addAppsToDB(apps);
  });
}

export async function setAppsToStore(): Promise<void> {
  const appsFromDb = await getAppsFromDB();
  if (appsFromDb.length > 0) {
    setApps(appsFromDb);
  } else {
    await getAppsFromBackend();
    const appsFromDb = await getAppsFromDB();
    setApps(appsFromDb);
  }
}
