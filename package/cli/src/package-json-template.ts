import { TemplateArgs } from 'types';

export const packageJSONTemplate = (args: TemplateArgs) => {
  return `
  {
    "name": "@yal-app/plugin-${args.name}",
    "version": "0.0.1",
    "description": "yal plugin",
    "devDependencies": {
      "@yal-app/types": "latest"
    }
  }
  `;
};
