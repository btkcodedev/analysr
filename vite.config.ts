import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fixRequestBody } from 'http-proxy-middleware';
import { AIRBYTE_API_BASE_URL, AIRBYTE_API_PROXY_URL, GROQ_API_BASE_URL, GROQ_API_PROXY_URL } from './src/config/services/index';

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
      [AIRBYTE_API_PROXY_URL]: {
        target: AIRBYTE_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/airbyte/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', fixRequestBody);
        },
      },
      [GROQ_API_PROXY_URL]: {
        target: GROQ_API_BASE_URL,
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

