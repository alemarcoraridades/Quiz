import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  // Set the base path dynamically
  //const base = env.VITE_BASE_PATH || '/quiz/';
  const base = '/Quiz/';
  return {
    plugins: [react()],
    base, // Dynamically set base path
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 3000,
    },
  };
});
