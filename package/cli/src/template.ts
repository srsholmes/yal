import { TemplateArgs } from 'types';

function imports(language: 'ts' | 'js') {
  if (language === 'ts') {
    return `import { YalPlugin, YalPluginsConfig } from '@yal-app/types';`;
  }
  return '';
}

function standardPluginTemplate(args: TemplateArgs) {
  return `
    const plugin${args.language === 'ts' ? ':YalPlugin' : ''} = (args) => {
      const { setState } = args;
      setState({
        heading: 'Hello World',
        state: [
          {
            name: 'This is the first result',
            description: 'This is the first result description',
          },
          {
            name: 'This is the second result',
            description: 'This is the second result description',
          },
        ],
        action: (item) => {
          console.log(item.item.description);
        },
      });
    };
  `;
}

function appTemplate(args: TemplateArgs) {
  return `
  const plugin${args.language === 'ts' ? ':YalPlugin' : ''} = (args) => {
    const { appNode } = args;
    appNode.innerHTML = '<p class="text-xl text-white">Hello World</p>';
  };
  `;
}

export const pluginTemplate = (args: TemplateArgs) => {
  const { language, keywords, filter, isApp } = args;
  return `
  ${imports(language)}

  ${args.isApp ? appTemplate(args) : standardPluginTemplate(args)}
  
  export const config${args.language === 'ts' ? 'YalPluginsConfig' : ''} = {
    ${keywords ? `keywords: [${getKeywords(keywords)}],` : ''}
    ${isApp ? `isApp: true,` : ''}
    ${filter ? `filter: true,` : ''}
  };
  export default plugin;  
`;
};

function getKeywords(keywords: string) {
  // split string on comma and space
  const arr = [...new Set(keywords.split(/,| /))];
  return arr.map((item) => `'${item}'`).join(', ');
}
