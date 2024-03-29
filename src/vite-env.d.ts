/// <reference types="vite/client" />


interface ImportMetaEnv {
    VITE_CUSTOM_ENV_VARIABLE?: string
    VITE_FIREBASE_KEY?: string;
    VITE_AUTH_DOMAIN?: string;
    VITE_PROJECT_ID?: string;
    VITE_STORAGE_BUCKET?: string;
    VITE_MESSAGING_SENDER_ID?: string;
    VITE_APP_ID?: string;
    VITE_SERVER?: string
    VITE_STRIPE_KEY?: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
    