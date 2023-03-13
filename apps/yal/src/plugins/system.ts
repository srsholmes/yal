import { YalPlugin } from '@yal-app/types';
import dedent from 'dedent';

const initialResults = [
  {
    name: `Sleep`,
    description: 'Send computer to sleep',
    icon: '😴',
  },
  {
    name: `Lock screen`,
    description: 'Lock screen',
    icon: '🔒',
  },
  {
    name: `Shutdown`,
    description: 'Shutdown',
    icon: '🛑',
  },
  {
    name: `Logout`,
    description: 'Log out of the current session',
    icon: '🚪',
  },
  {
    name: `Restart`,
    description: 'Restart the computer',
    icon: '🔄',
  },
  {
    name: `Empty trash`,
    description: 'Empty trash',
    icon: '🗑',
  },
  {
    name: `Toggle mute`,
    description: 'Toggle mute',
    icon: '🔇',
  },
  {
    name: `Toggle microphone`,
    description: 'Toggle the microphone',
    icon: '🎤',
  },
];

const getScriptCommand = (name: string): string => {
  switch (name) {
    case 'Sleep':
      return 'tell application "Finder" to sleep';
    case 'Lock screen':
      return dedent`
        activate application "SystemUIServer"
          tell application "System Events"
          tell process "SystemUIServer" to keystroke "q" using {command down, control down}
        end tell`;
    case 'Shutdown': {
      return 'tell application "Finder" to shut down';
    }
    case 'Logout': {
      return `tell application "System Events"' -e 'log out' -e 'keystroke return' -e end`;
    }
    case 'Restart':
      return 'tell application "Finder" to restart';
    case 'Empty trash':
      return 'tell application "Finder" to empty trash';
    case 'Toggle mute':
      return dedent`set curVolume to get volume settings
      if output muted of curVolume is false then
        set volume with output muted
      else
        set volume without output muted
      end if`;
    case 'Toggle microphone': {
      return dedent`
      on getMicrophoneVolume()
        input volume of (get volume settings)
      end getMicrophoneVolume
      on disableMicrophone()
        set volume input volume 0
      end disableMicrophone
      on enableMicrophone()
       set volume input volume 100
      end enableMicrophone
      if getMicrophoneVolume() is greater than 0 then
        disableMicrophone()
      else
        enableMicrophone()
      end if
      `;
    }
  }
  throw new Error('Unknown action');
};

export const system: YalPlugin = (args) => {
  args.setState({
    heading: `System`,
    action: (result) => {
      if (result.item.name) {
        yal.shell.appleScript({ command: getScriptCommand(result.item.name) });
      }
    },
    state: initialResults,
  });
};

export default system;
