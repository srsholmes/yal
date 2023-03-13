import Prism from 'prismjs';

const libs = [
  import('prismjs/components/prism-markup'),
  import('prismjs/components/prism-typescript'),
  import('prismjs/components/prism-javascript'),
  import('prismjs/components/prism-jsx'),
  import('prismjs/components/prism-tsx'),
  import('prismjs/components/prism-markup'),
  import('prismjs/components/prism-css'),
  import('prismjs/components/prism-json'),
];

export async function highlightAll() {
  await Promise.all(libs).then(() => {
    Prism.highlightAll();
  });
}
