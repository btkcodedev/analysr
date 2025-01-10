import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fixRequestBody } from 'http-proxy-middleware';

export const AIRBYTE_API_PROXY_URL = "/api/airbyte";
export const AIRBYTE_API_BASE_URL = "https://api.airbyte.com/v1";
export const GROQ_API_PROXY_URL = "/api/groq";
export const GROQ_API_BASE_URL = "https://api.groq.com/v1";

// const cacheBuster = (url: string | undefined) => {
//   const timestamp = new Date().getTime();
//   return `${url}?v=${timestamp}`;
// };

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
  // build: {
  //   rollupOptions: {
  //     output: {
  //       // Use a cache-busting filename pattern for output files
  //       entryFileNames: (chunkInfo) => {
  //         return cacheBuster(chunkInfo.name);
  //       },
  //       chunkFileNames: (chunkInfo) => {
  //         return cacheBuster(chunkInfo.name);
  //       },
  //       assetFileNames: (assetInfo) => {
  //         return cacheBuster(assetInfo.name);
  //       },
  //     },
  //   },
  // },
});
