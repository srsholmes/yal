# Yal

<img align="left" style="margin-right: 10px;" src="./resources/logo-transparent.png" width="200" height="200">

Yal (Yet Another Launcher) is a launcher app similar Alfred, Raycast, ScriptKit, Spotlight, and many others. Yal is designed to provide users with a powerful and efficient way to launch applications and perform actions on Mac OS.

Yal has been designed with the goal of being the simple, powerful and fast. With an emphasis on speed and efficiency, Yal is perfect for users who want to be able to quickly perform tasks and access the information they need, without having to navigate through cluttered menus or slow-loading interfaces.

<br style="clear: both;">

## Plugins

To see the growing list of available plugins, please visit the [yal-plugins](https://github.com/srsholmes/yal-plugins) repo.

Yal can be extended via the use of plugins. Plugins are functions which display a list of results to the user based on their input.

Plugins can be asynchronous.

A plugin must export a default function in order for it to work.

A simple `hello world` plugin would be as follows:

```javascript
const plugin = (args) => {
  args.setState({
    heading: 'Hello World',
    state: [
      {
        name: 'This is the first result',
        description: 'This is the first result description',
      },
    ],
  });
};

export default plugin;
```

### Developing plugins

Head on over to the [yal-plugins](https://github.com/srsholmes/yal-plugins) repo and clone the repo to get started. Please see the readme in that repo for more information.

#### 🛠️ Scaffold the plugin

```bash
npx --package=@yal-app/cli create-yal-plugin
```

You can scaffold out a new plugin template using the `create-yal-plugin` command. This will create a new folder with an base plugin to get started with.

#### 💻 Develop the plugin

```bash
npx --package=@yal-app/cli develop-yal-plugin './path-to-folder'
```

To develop your plugin, run the `develop-yal-plugin` command and pass it the path of the newly created folder from the `create-yal-plugin` step.

This will start the development server for your plugin to be used in yal.

Go to yal and type `reload`, and you will see a prompt to reload all plugins.

When yal reloads, your new plugin will be loaded in to yal.

You can edit the source code of your plugin and it will be updated in yal in real time. There is no need to reload the plugins each time.

### 🚀 Install the plugin to your .yal folder

```bash
npx --package=@yal-app/cli install-yal-plugin './path-to-folder'
```

Once you have finished developing your plugin, you can use the `install-yal-plugin` command which will bundle up your plugin and copy it to your `~/.yal/plugins` directory.

This will make your plugin available in yal, without having to run the development server.

### Plugin arguments

Please note, TS types are available as `PluginArgs` type in the `@yal-app/types` package.

Plugins are called with an arguments object which contains the following properties:

| Key      | Type                                                          | Function                                                                                                                                  |
| -------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| setState | `(state: PluginResult<T>) => void`                            | The setState function can be called to set a list of results.                                                                             |
| text     | `string`                                                      | The text property contains the text that the user has typed into the search box.                                                          |
| system   | `{ apps: AppEntry[]; }`                                       | The system object contains an app key with a list of all the apps installed on the system.                                                |
| utils    | <code><{ setToast: (args: YalToast \| null) => void; }</code> | The utils object contains a setToast function which can be used to set a toast message.                                                   |
| appNode  | `HTMLElement`                                                 | The appNode is an optional property which will be set if the plugin is an app. This is the DOM node that the app should be mounted in to. |

### Plugin configuration

Plugins can export an optional comnfigtation object of type `YalPluginsConfig` with number of different optional keywords which allows you to customise how the plugin works.

A yal configuration object looks like this:

```typescript
type YalPluginsConfig = {
  isApp?: boolean;
  keywords?: string | string[];
  filter?: boolean;
  debounce?: boolean | number;
  throttle?: boolean | number;
  keepOpen?: boolean;
};
```

#### `keywords`: string | string[]

The keywords array will tell Yal to only call the plugin after one of the keywords has been typed into the search box.

If no keywords are specified, the plugin will be run regardless of what word is typed into the search box. This can be very helpful if you want plugins to be available from the 'root' popup search window for example if you want to paste in a hex value to convert to different color formats.

![Example of a root level plugin](./resources/root-level-plugin.png 'Example of a root level plugin')

#### `debounce`: boolean | number

If a plugin exports the boolean `debounce` as `true`, this will tell Yal to debounce the input to the plugin when it is called. This is particularly useful for asynchronous plugins that query an API to prevent spamming of requests. You can also provide a number to debounce to specify the time in milliseconds to debounce the input.

#### `throttle`: boolean | number

If a plugin exports the boolean `throttle` as `true`, this will tell Yal to throttle the input to the plugin when it is called. This is particularly useful for asynchronous plugins that query an API to prevent spamming of requests. You can also provide a number to throttle to specify the time in milliseconds to throttle the input.

#### `isApp`: boolean

The `isApp` export can be used to tell Yal that the plugin is a standalone application. This will not render the traditional list of items, but instead it is up to the plugin Author to render an application as they want. This is very powerful for plugin authors as it allows full flexibility inside of Yal for building whatever you wish.

For more infomation see the [`Apps`](https://github.com/srsholmes/yal-solid/tree/develop/apps/yal#apps) section.

#### `filter`: boolean

The `filter` export is a boolean which will allow Yal to automatically filter the results of the plugin based on what the user is searching for. For example if I have 3 results, `foo`, `bar` and `baz`, and the user searches `ba`, if the filter option is set to `true` the list will be filtered down to `bar` and `baz`.

The search results are based on a fuzzy search.

You will want to have `filter = false` when developing plugins which are going to be used from the top level screen, so the text does not filter their results.

## Apps

Yal gives you the ability to run full applications inside of Yal.

![Example of an App plugin](./resources/google-maps-example-app.png 'Example of an App plugin')

Source code avaulable here: [Google Maps Plugin](https://github.com/srsholmes/yal-plugins/tree/main/plugins/google-maps)

Applications can be written in vanilla JS or any framework (react / svelte etc) and will have full access to the Yal API.

When creating an app, Yal will pass in a DOM node for you to mount your application in to.

You can use tailwind to style your apps and it will work out of the box, or you can use something else like css modules / CSS in JS.

Let's start by making a basic app in react:

`index.tsx`

```tsx
import { YalPluginsConfig, YalReactAppPlugin } from '@yal-app/types';
import React from 'react';
import { createRoot } from 'react-dom/client';

let root;

const testReactApp: YalReactAppPlugin = (args) => {
  const { appNode } = args;
  if (!root) {
    root = createRoot(appNode);
  }
  root.render(
    <React.StrictMode>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Hello World from react!
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            The input text (without the keyword is): {args.text}
          </p>
        </div>
      </div>
    </React.StrictMode>
  );
  return { appNode };
};

export const config: YalPluginsConfig = {
  keywords: 'react',
  filter: false,
  isApp: true,
  throttle: false,
  debounce: 5000,
};
export default testReactApp;
```

The most important thing to note here, is the app is exported with the config option of `isApp` being `true`. The will tell yal to run the app as its own standalone application. This basic app will be available from the root search window, when the user types `react`.

Next, let's make something using Yals API.

Here is an example of opening an image on the users computer, and viewing it in Yal.

```tsx
import { YalPluginsConfig, YalReactAppPlugin } from '@yal-app/types';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { FileReader } from './FileReader';

let root;

const testReactApp: YalReactAppPlugin = (args) => {
  const { appNode } = args;
  if (!root) {
    root = createRoot(appNode);
  }
  root.render(
    <React.StrictMode>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            This is a basic example of how to use the Yal API.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Please click the button below to open a file dialog. Once you have
            selected a file, it will be displayed below the button.
          </p>
        </div>
        <div className="flex items-center">
          <FileReader />
        </div>
      </div>
    </React.StrictMode>
  );
  return { appNode };
};

export const config: YalPluginsConfig = {
  keywords: 'file',
  filter: false,
  isApp: true,
};

export default testReactApp;
```

`FileReader.tsx`

```tsx
import React, { useState } from 'react';

export const FileReader = () => {
  const [filePath, setFilePath] = useState(null);

  function handleFileChoose(e) {
    e.preventDefault();
    yal.dialog
      .open({
        multiple: false,
        filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }],
      })
      .then((path) => {
        if (path) {
          const asset = yal.path.convertFileSrc(path as string);
          setFilePath(asset);
        }
      });
  }
  return (
    <div>
      <button className="bg-red-500 text-white p-2" onClick={handleFileChoose}>
        Choose file...
      </button>
      {filePath && (
        <div className="mt-4">
          <img src={filePath} />
        </div>
      )}
    </div>
  );
};
```

Hopefully this gives you some insight as to how powerful apps can be in Yal.

We're looking forward to seeing what the community comes up with.

## Themes

![Example of themes in Yal](./resources/themes.png 'Example of themes')

Yal is completely themeable. You can see all available themes by searching for `themes` in Yal and selecting one.

You can install all the themes by running `yarn install:themes` from the route directory.

Themes can be found in a directory called `themes`, which is located in the Yal folder `~/.yal`.

Themes are configured using JSON using a set of key value pairs. The keys represent specific UI elements and the values are tailwind classes to style them.

A full set of themable UI elements can be seen below below.

Here is an example of a theme:

```json
{
  "yal-wrapper": "flex flex-col h-screen bg-[#1B2C3F]",
  "app-wrapper": "bg-[#1B2C3F]",
  "main-wrapper": "min-h-screen",
  "main-input": "bg-[#1B2C3F] w-full p-3 text-white placeholder-white focus:ring-0 sm:text-sm",
  "main-input-wrapper": "sticky bg-[#1B2C3F] top-0 mx-auto w-full transition-all grid grid-cols-[auto_1fr] items-center",
  "search-icon": "hidden opacity-100 pointer-events-none top-0.5 left-0.5 h-5 w-5 text-[#F5CF03] p-2 h-10 w-10",
  "result-heading": "px-3 py-2 text-md font-semibold text-[#FFC600]",
  "results-wrapper": "",
  "results-wrapper-height": "overflow-scroll pb-10",
  "result-item": "group mx-4 flex cursor-pointer select-none overflow-hidden p-3",
  "result-item-info-wrapper": "ml-4 flex-auto",
  "highlight": "bg-[#1F4661FF] group highlight",
  "result-item-name": "text-sm font-medium text-[#CDD6DB] group-[.highlight]:text-[#FFFFFF]",
  "result-item-description": "overflow-hidden truncate text-sm text-[#606B70] group-[.highlight]:text-[#FFC600]",
  "result-item-icon": "flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full",
  "result-item-app-wrapper": "relative rounded-b-md",
  "alert-wrapper": "h-full absolute w-full top-0 items-end flex justify-end",
  "info": "bg-[#B2D7FF] group info",
  "warning": "bg-[#FFC600] group warning",
  "success": "bg-[#1F4661] group success",
  "error": "bg-[#0E2232] group error",
  "alert": "gap-4 grid text-[#FFFFFF] alert bottom-3 w-1/2 right-0 mt-3 transition-opacity ease-in-out duration-800 p-3 grid-cols-[auto_1fr]"
}
```

In the future I want to offer themimg via CSS files.

## Issues

- I'm always looking for help with Yal, and I really value user feedback. If you have any issues, please feel free to create an issue in the github repo, and I'll do my best to help you out.

## Contributing

- If you spot a bug and would like to contribute, please feel free to to create a PR with the fix.
- For new features, please create an issue with the feature label and we can discuss implementation / need for feature

## Alternatives / Inspired by

All of these projects have heavily inspired the development of Yal, and I would highly recommend checking them out if you are looking for a launcher app.

- [Alfred](https://www.alfredapp.com/)
- [Raycast](https://raycast.com/)
- [ScriptKit](https://scriptkit.app/)

License

- MIT
