#! /usr/bin/env node

import prompts from 'prompts';
import fs from 'fs';
import path from 'path';
import { pluginTemplate } from './template';
import { packageJSONTemplate } from 'package-json-template';

(async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'What is the plugin name?',
    },
    {
      type: 'select',
      name: 'language',
      message: 'Would you like to use Typescript or Javascript?',
      choices: [
        {
          title: 'TypeScript',
          value: 'ts',
        },
        {
          title: 'JavaScript',
          value: 'js',
        },
      ],
    },
    {
      type: 'text',
      name: 'keywords',
      message:
        'What keywords shall we use to activate the plugin? Leave blank if no keywords required.',
    },
    {
      name: 'filter',
      type: 'select',
      message:
        'Would you like the plugin results to be filtered by the text input?',
      choices: [
        {
          title: 'No',
          value: false,
        },
        {
          title: 'Yes',
          value: true,
        },
      ],
    },
    {
      name: 'isApp',
      type: 'select',
      message: 'Is this plugin a standalone application?',
      initial: 0,
      choices: [
        {
          title: 'No',
          value: false,
        },
        {
          title: 'Yes',
          value: true,
        },
      ],
    },
  ]);

  function hyphenate(str) {
    return str.replace(/\s+/g, '-').toLowerCase();
  }

  fs.mkdirSync(path.join(process.cwd(), `./${hyphenate(response.name)}/src`), {
    recursive: true,
  });

  const template = pluginTemplate(response);

  fs.writeFileSync(
    path.join(
      process.cwd(),
      `./${hyphenate(response.name)}/src/index.${response.language}`
    ),
    template
  );

  if (response.language === 'ts') {
    const packageJSON = packageJSONTemplate({
      ...response,
      name: hyphenate(response.name),
    });
    fs.writeFileSync(
      path.join(process.cwd(), `./${hyphenate(response.name)}/package.json`),
      packageJSON
    );
    // install the node_modules
    const { exec } = require('child_process');
    exec(
      `cd ${hyphenate(response.name)} && npm install`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  }

  console.log('Your yal plugin template has been created!');
  console.log(
    `Please open ${hyphenate(response.name)}/src/index.${
      response.language
    } to get started 🚀`
  );
  console.log('*'.repeat(50));
  console.log(
    'You can run a plugin server to develop your plugin locally, by running: npx @yal-app/cli run plugin-server'
  );
  console.log(
    'Please see the documentation for more information: TODO: plugin docs here...'
  );
  console.log('*'.repeat(50));
})();
