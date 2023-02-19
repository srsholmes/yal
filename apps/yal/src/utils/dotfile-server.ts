import { invoke } from '@tauri-apps/api/tauri';

export async function startServer(): Promise<number | void> {
  return invoke<{ success?: boolean; error?: string; pid?: number }>(
    'dotfiles_server',
    {
      invokeMessage: JSON.stringify({
        message: 'start',
        pid: '0',
      }),
    }
  ).then(async (res) => {
    if (res.success || res.error?.includes('Address already in use')) {
      if (res.pid) {
        return res.pid;
      }
    }
  });
}

export async function stopServer(pid: string) {
  if (pid) {
    invoke<{ success?: boolean; error?: string; pid?: string }>(
      'dotfiles_server',
      {
        invokeMessage: JSON.stringify({
          message: 'stop',
          pid: pid,
        }),
      }
    ).then((res) => {
      console.log('Stopped the server....');
      console.log({ res });
    });
  }
}
