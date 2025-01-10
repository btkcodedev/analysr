import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";
import path from "path";
import { fixRequestBody } from "http-proxy-middleware";
import {
  AIRBYTE_LOCAL_PROXY_URL as AB_PROX,
  AIRBYTE_API_BASE_URL as AB_BASE,
  GROQ_LOCAL_PROXY_URL as GROQ_PROX,
  GROQ_API_BASE_URL as GROQ_BASE,
} from "./src/config/services/index";

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), "");
  const AIRBYTE_API_PROXY_URL = AB_PROX;
  const AIRBYTE_API_BASE_URL = AB_BASE;
  const GROQ_API_PROXY_URL = GROQ_PROX;
  const GROQ_API_BASE_URL = GROQ_BASE;
  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      proxy: {
        [AIRBYTE_API_PROXY_URL]: {
          target: AIRBYTE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/airbyte/, ""),
          configure: (proxy, _options) => {
            proxy.on("proxyReq", (proxyReq, req) => {
              proxyReq.setHeader(
                "Cache-Control",
                "no-store, no-cache, must-revalidate, proxy-revalidate"
              );
              proxyReq.setHeader("Pragma", "no-cache");
              proxyReq.setHeader("Expires", "0");
              fixRequestBody(proxyReq, req);
            });

            proxy.on("proxyRes", (proxyRes) => {
              proxyRes.headers["cache-control"] =
                "no-store, no-cache, must-revalidate, proxy-revalidate";
              proxyRes.headers["pragma"] = "no-cache";
              proxyRes.headers["expires"] = "0";
            });
          },
        },
        [GROQ_API_PROXY_URL]: {
          target: GROQ_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/groq/, ""),
          configure: (proxy, _options) => {
            proxy.on("proxyReq", (proxyReq, req) => {
              proxyReq.setHeader(
                "Cache-Control",
                "no-store, no-cache, must-revalidate, proxy-revalidate"
              );
              proxyReq.setHeader("Pragma", "no-cache");
              proxyReq.setHeader("Expires", "0");
              fixRequestBody(proxyReq, req);
            });

            proxy.on("proxyRes", (proxyRes) => {
              proxyRes.headers["cache-control"] =
                "no-store, no-cache, must-revalidate, proxy-revalidate";
              proxyRes.headers["pragma"] = "no-cache";
              proxyRes.headers["expires"] = "0";
            });
          },
        },
      },
    },
    build: {
      outDir: "dist",
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
