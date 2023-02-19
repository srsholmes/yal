import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [solidPlugin(), tsconfigPaths()],
  envPrefix: ['VITE_', 'TAURI_'],
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  server: {
    port: 5678,
  },
  build: {
    // polyfillDynamicImport: false,
    target: ['es2021'],
    // target: ['es2021', yal'chrome97', 'safari13', 'es2020'],
  },
});
