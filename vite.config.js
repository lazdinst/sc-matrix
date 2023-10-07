import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      outDir: './dist/sc-matrix'
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: 'src/setupTests.js',
      css: true,
    },
    plugins: [react()],
  }
});
