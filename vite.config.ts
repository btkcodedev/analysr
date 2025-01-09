import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fixRequestBody } from 'http-proxy-middleware';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    proxy: {
      '/api/airbyte': {
        target: 'https://api.airbyte.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/airbyte/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', fixRequestBody);
        },
      },
      '/api/groq': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/groq/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', fixRequestBody);
        },
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
