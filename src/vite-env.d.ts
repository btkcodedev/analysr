/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOTHERDUCK_TOKEN: string;
  readonly VITE_AIRBYTE_SUPABASE_PROXY_URL: string;
  readonly VITE_GROQ_SUPABASE_PROXY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}