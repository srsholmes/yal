import { createTailwindcss } from '@mhsdesign/jit-browser-tailwindcss';
import { BaseDirectory, readDir } from '@tauri-apps/api/fs';
import { createEffect, createSignal } from 'solid-js';
import { config } from 'state/config';
import { getYalPath, YAL_DIR_THEMES } from 'utils/constants';

export const DEFAULT_THEME_NAME = 'yal-default';

async function getThemePath(theme: string): Promise<string> {
  const dir = await getYalPath();
  const themePath = `${dir}/themes/${theme}`;
  return themePath;
}

export async function getAvailableThemes(): Promise<string[]> {
  const themesDir = await readDir(YAL_DIR_THEMES, {
    dir: BaseDirectory.Home,
  });
  const themes = themesDir
    .filter((x) => x.name.endsWith('.json'))
    .map((t) => t.name);
  return themes;
}

const tailwind = createTailwindcss({
  tailwindConfig: {
    corePlugins: { preflight: false },
  },
});

async function generateTailwindCSSFromTheme(theme: Record<string, string>) {
  const classes = Object.values(theme).join(' ');
  const css = await tailwind.generateStylesFromContent(
    `
    @tailwind components;
    @tailwind utilities;
    `,
    [`<div class="${classes}"></div>`]
  );
  return {
    css,
  };
}

export async function generateTailwindCSSFromHTML(html: string) {
  const css = await tailwind.generateStylesFromContent(
    `
    @tailwind components;
    @tailwind utilities;
    `,
    [html]
  );
  return {
    css,
  };
}

const STYLABLE_ELEMENTS = /*tw*/ {
  'yal-wrapper': 'flex flex-col h-screen bg-[#1B2C3F]',
  'app-wrapper': 'bg-[#1B2C3F] text-lg',
  'main-wrapper': 'min-h-screen',
  'main-input':
    'bg-[#1B2C3F] w-full p-3 block text-white placeholder-white focus:ring-0 sm:text-sm',
  'main-input-wrapper':
    'sticky bg-[#1B2C3F] top-0 mx-auto w-full transition-all grid items-center',
  'search-icon':
    'hidden opacity-100 pointer-events-none top-0.5 left-0.5 text-[#F5CF03] p-2 h-10 w-10',
  'result-heading': 'px-3 py-2 text-sm font-semibold text-[#D8DEE9]',
  'results-wrapper': '',
  'results-wrapper-height': 'overflow-scroll pb-10',
  'result-item':
    'group mx-4 flex cursor-pointer select-none overflow-hidden p-3',
  'result-item-info-wrapper': 'ml-4 flex-auto',
  highlight: 'bg-[#81A1C1] group highlight',
  'result-item-name':
    'text-sm font-medium text-[#ECEFF4] group-[.highlight]:text-[#ECEFF4]',
  'result-item-description':
    'overflow-hidden text-sm text-[#D8DEE9] group-[.highlight]:text-[#ECEFF4]',
  'result-item-icon':
    'flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full',
  'result-item-app-wrapper': 'relative rounded-b-md',
  'alert-wrapper': 'h-full absolute w-full top-0 items-end flex justify-end',
  info: 'bg-[#EBCB8B] group info',
  warning: 'bg-[#D08770] group warning',
  success: 'bg-[#A3BE8C] group success',
  error: 'bg-[#BF616A] group error',
  alert:
    'gap-4 grid text-[#FFFFFF] alert bottom-3 w-1/2 right-0 mt-3 transition-opacity ease-in-out duration-800 p-3 grid-cols-[auto_1fr]',
};

const [tailwindClasses, setTailwindClasses] = createSignal(STYLABLE_ELEMENTS);

async function getThemeJson(path: string) {
  const res = await yal.fs.readTextFile(path);
  let json: Record<string, string>;
  try {
    json = JSON.parse(res);
  } catch (e) {
    json = {};
  }
  return json;
}

const [temporaryTheme, setTemporaryTheme] = createSignal<string | null>(null);

export { temporaryTheme, setTemporaryTheme };

export function appendTailwindCSS(css: string, id = 'tailwind-theme-classes') {
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  const style = document.createElement('style');
  style.id = id;
  style.innerHTML = css;
  document.head.appendChild(style);
}

function setNewHighlight({ prev, theme }) {
  const resultItems = document.querySelectorAll('[data-id="result-item"]');
  const indexOfHighlight = Array.from(resultItems).findIndex((x) =>
    x.classList.contains('highlight')
  );
  const currentHighlight = document.querySelector('.highlight');
  const prevHighlightClasses = prev['highlight'].split(' ');
  const themeHighlightClasses = theme['highlight'].split(' ');
  if (currentHighlight) {
    currentHighlight.classList.remove(...prevHighlightClasses, 'highlight');
  }
  if (indexOfHighlight !== -1) {
    resultItems[indexOfHighlight].classList.add(
      ...themeHighlightClasses,
      'highlight'
    );
  }
}

function setDefaultTheme() {
  const yalWrapper = document.getElementById('yal-wrapper');
  yalWrapper?.classList.add(...STYLABLE_ELEMENTS['yal-wrapper'].split(' '));
  setTailwindClasses((prev) => {
    const obj = { ...prev, ...STYLABLE_ELEMENTS };
    setNewHighlight({ prev, theme: STYLABLE_ELEMENTS });
    yalWrapper?.classList.add(...obj['yal-wrapper'].split(' '));
    return STYLABLE_ELEMENTS;
  });
}

createEffect(async () => {
  const yalWrapper = document.getElementById('root');
  yalWrapper.className = '';

  if (temporaryTheme()) {
    if (temporaryTheme() === DEFAULT_THEME_NAME) {
      setDefaultTheme();
      return;
    }

    const themePath = await getThemePath(temporaryTheme());
    const theme = await getThemeJson(themePath);
    const { css } = await generateTailwindCSSFromTheme(theme);
    if (theme.hasOwnProperty('fonts')) {
      window.WebFont.load({
        google: {
          families: theme['fonts'],
        },
      });
    }
    appendTailwindCSS(css);
    setTailwindClasses((prev) => {
      const obj = { ...prev, ...theme };
      setNewHighlight({ prev, theme });
      yalWrapper?.classList.add(...obj['yal-wrapper'].split(' '));
      return { ...prev, ...theme };
    });
  } else if (typeof config()?.theme === 'string') {
    if (config().theme === DEFAULT_THEME_NAME) {
      setDefaultTheme();
      return;
    }
    const themePath = await getThemePath(config().theme as string);
    const theme = await getThemeJson(themePath);
    if (theme.hasOwnProperty('fonts')) {
      window.WebFont.load({
        google: {
          families: theme['fonts'],
        },
      });
    }
    const { css } = await generateTailwindCSSFromTheme(theme);
    appendTailwindCSS(css);
    setTemporaryTheme(null);
    setTailwindClasses((prev) => {
      const obj = { ...prev, ...theme };
      yalWrapper?.classList.add(...obj['yal-wrapper'].split(' '));
      return { ...prev, ...theme };
    });
  }
});

export { tailwindClasses };
