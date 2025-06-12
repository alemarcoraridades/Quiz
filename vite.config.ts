export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
    base: '/Quiz/',
    define: {
      'process.env.VITE_GITHUB_TOKEN': JSON.stringify(env.VITE_GITHUB_TOKEN),
    },
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') }
    },
    server: {
      port: 3000,
      open: true,
      proxy: env.VITE_GITHUB_TOKEN ? {
        '/github-api': {
          target: 'https://api.github.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/github-api/, ''),
          headers: {
            Authorization: `token ${env.VITE_GITHUB_TOKEN}`
          }
        }
      } : undefined,
    },
    preview: {
      port: 3000,
    },
  };
});
