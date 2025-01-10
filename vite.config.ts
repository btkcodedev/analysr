import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fixRequestBody } from 'http-proxy-middleware';
import { AIRBYTE_API_PROXY_URL, AIRBYTE_API_BASE_URL, GROQ_API_PROXY_URL, GROQ_API_BASE_URL } from './src/config/services/index';

const cacheBuster = (url: string | undefined) => {
  const timestamp = new Date().getTime();
  return `${url}?v=${timestamp}`;
};

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
  build: {
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) => {
          return cacheBuster(chunkInfo.name);
        },
        chunkFileNames: (chunkInfo) => {
          return cacheBuster(chunkInfo.name);
        },
        assetFileNames: (assetInfo) => {
          return cacheBuster(assetInfo.name);
        },
      },
    },
  },
});
