# Yal plugins CLI

### 🛠️ Scaffold the plugin

```bash
npx --package=@yal-app/cli@latest create-yal-plugin
```

You can scaffold out a new plugin template using the `create-yal-plugin` command. This will create a new folder with an base plugin to get started with.

### 💻 Develop the plugin

```bash
npx --package=@yal-app/cli@latest develop-yal-plugin './path-to-folder'
```

To develop your plugin, run the `develop-yal-plugin` command and pass it the path of the newly created folder from the `create-yal-plugin` step.

This will start the development server for your plugin to be used in yal.

Go to yal and type `reload`, and you will see a prompt to reload all plugins.

When yal reloads, your new plugin will be loaded in to yal.

You can edit the source code of your plugin and it will be updated in yal in real time. There is no need to reload the plugins each time.

### 🚀 Install the plugin to your .yal folder

```bash
npx --package=@yal-app/cli@latest install-yal-plugin './path-to-folder'
```

Once you have finished developing your plugin, you can use the `install-yal-plugin` command which will bundle up your plugin and copy it to your `~/.yal/plugins` directory.

This will make your plugin available in yal, without having to run the development server.
