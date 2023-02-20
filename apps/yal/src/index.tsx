/* @refresh reload */
import { appWindow } from '@tauri-apps/api/window';
import { App } from 'components/App';
import { Route, Router, Routes } from 'solid-app-router';
import { render } from 'solid-js/web';
import { handleKeydown } from 'utils/keyboard';
import './app.css';

render(
  () => (
    <div onkeydown={handleKeydown(appWindow)}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </div>
  ),
  document.getElementById('root') as HTMLElement
);
