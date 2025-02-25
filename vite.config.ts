import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // load environment variables based on the mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  // set the base path dynamically
  let base = '/';
  if (mode === 'production') {
    // For Github pages deployment
    base = '/Quiz/';
  }

  return {
    plugins : [react()],
    base,
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
    build: {
     // Ensure proper MINE types for JavaScript modules
     rollupOptions: {
       output: {
         entryFileNames: 'assets/[name].[hash].js',
         chunkFileNames: 'assets/[name].[hash].js',
         assetFileNames: 'assets/[name].[hash].[ext]'
       }
     }
   }
  };
});
