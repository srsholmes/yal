import { homeDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { ICON_MAP } from 'utils/icons/constants';
import { fileIconMap } from 'utils/icons/file-icons';
import { folderIconMap } from 'utils/icons/folder-icons';

export function extractIconFromPath(x: string): string {
  const last = x.split('/').slice(-1)[0];
  if (last.includes('.')) {
    const icon =
      fileIconMap[last] ?? fileIconMap[last.split('.').slice(-1)[0]] ?? 'file';
    return icon;
  } else {
    const icon = folderIconMap[last] ?? 'folder-src';
    return icon;
  }
}

export async function getIcon({
  icon,
  pluginName,
}: {
  icon: string;
  pluginName: string;
}) {
  if (
    icon?.startsWith('data:image/') ||
    icon == null ||
    icon?.startsWith('https://')
  ) {
    return icon;
  }

  if (icon.endsWith('.svg') || icon.endsWith('.png') || icon.endsWith('.jpg')) {
    // return icon;
    const homeDirPath = await homeDir();
    const filePath = await join(
      homeDirPath,
      `.yal/plugins/${pluginName}/${icon}`
    );
    const assetUrl = convertFileSrc(icon);
    return assetUrl;
  }

  // if icon is a path
  if (icon.startsWith('/')) {
    const foundIcon = extractIconFromPath(icon);
    if (ICON_MAP[foundIcon]) {
      const url = `/images/icons/all/${foundIcon}.svg`;
      return url;
    }
  }

  if (ICON_MAP[icon]) {
    const url = `/images/icons/all/${icon}.svg`;
    return url;
  }
}
