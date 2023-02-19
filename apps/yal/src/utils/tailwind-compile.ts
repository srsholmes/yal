import twAspectRatio from '@tailwindcss/aspect-ratio';
import twForms from '@tailwindcss/forms';
import twLineClamp from '@tailwindcss/line-clamp';
import twTypography from '@tailwindcss/typography';
import postcss from 'postcss';
import tailwindcss, { Config } from 'tailwindcss';

export const generateTailwindClasses = async (
  theme: Record<string, string>
) => {
  const classes = Object.values(theme).join(' ');
  let defaultConfig: Config = {
    content: [{ raw: `<div class="${classes}"></div>`, extension: 'html' }],
    plugins: [twForms, twTypography, twAspectRatio, twLineClamp],
    corePlugins: { preflight: false },
  };

  let customCSS = '';
  const result = await postcss([tailwindcss(defaultConfig)]).process(
    // @tailwind base;
    // @tailwind components;
    // Utils is needed to generate the classes from raw
    `
    @tailwind utilities;
    ${customCSS}
    `,
    {
      from: undefined,
    }
  );
  return {
    css: result.css,
  };
};

// generateTailwindClasses({
//   'app-wrapper': 'bg-slate-700 text-white',
//   'results-wrapper': 'bg-yellow-700 text-green-500',
// }).then((x) => {
//   console.log('!!!!!!!!!!');
//   console.log({ x });
// });
