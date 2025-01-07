/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOTHERDUCK_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}