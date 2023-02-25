import Prism from 'prismjs';

const prismImportMap = {
  typescript: () => import('prismjs/components/prism-typescript'),
  javascript: () => import('prismjs/components/prism-javascript'),
  html: () => import('prismjs/components/prism-markup'),
  css: () => import('prismjs/components/prism-css'),
};

export async function highlightAll() {
  const languages = ['typescript', 'javascript', 'html', 'css'];
  await Promise.all([
    import('prismjs/components/prism-markup'),
    ...languages.map((lang) => prismImportMap[lang]()),
  ]).then(() => {
    Prism.highlightAll();
  });
}
