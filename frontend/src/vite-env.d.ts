/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TRANSLATE_API: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  