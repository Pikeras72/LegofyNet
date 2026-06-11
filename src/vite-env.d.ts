/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 'tfjs' (default) for real in-browser inference, 'mock' for the demo engine. */
  readonly VITE_INFERENCE_ENGINE?: 'tfjs' | 'mock';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
