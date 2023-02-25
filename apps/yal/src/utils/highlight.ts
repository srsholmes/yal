import Prism from 'prismjs';

const prismImportMap = {
  typescript: () => import('prismjs/components/prism-typescript'),
  javascript: () => import('prismjs/components/prism-javascript'),
  jsx: () => import('prismjs/components/prism-jsx'),
  tsx: () => import('prismjs/components/prism-tsx'),
  html: () => import('prismjs/components/prism-markup'),
  css: () => import('prismjs/components/prism-css'),
  json: () => import('prismjs/components/prism-json'),
};

export async function highlightAll() {
  const languages = Object.keys(prismImportMap);
  await Promise.all([
    import('prismjs/components/prism-markup'),
    ...languages.map((lang) => prismImportMap[lang]()),
  ]).then(() => {
    Prism.highlightAll();
  });
}
