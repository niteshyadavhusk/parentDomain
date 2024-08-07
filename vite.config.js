import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // plugins: [react()],
  // server: {
  //   open: true, // Automatically open the app in the browser
  // },
  // build: {
  //   outDir: 'dist',
  //   assetsDir: 'assets',
  // },

  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 100000000
  },
  server: {
    host: true,
    strictPort: true,
    port: 8000,
    },
});
