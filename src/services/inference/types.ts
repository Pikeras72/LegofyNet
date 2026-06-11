export interface GenerationResult {
  /** 64×128 RGBA output of the generator network. */
  imageData: ImageData;
  /** The preprocessed 64×128 input — aligned pixel-for-pixel with imageData. */
  inputPreview: ImageData;
  durationMs: number;
}

export type InferenceErrorCode =
  | 'model-load-failed'
  | 'webgl-unavailable'
  | 'inference-failed'
  | 'image-decode-failed';

export class InferenceError extends Error {
  readonly code: InferenceErrorCode;

  constructor(code: InferenceErrorCode, message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'InferenceError';
    this.code = code;
  }
}

export interface EngineInfo {
  /** 'tfjs' = real in-browser inference; 'mock' = demo engine with fake output. */
  kind: 'tfjs' | 'mock';
  /** True when inference fell back to a slow (CPU) backend. */
  slowBackend: boolean;
}

/**
 * Contract between the UI and any inference implementation.
 * The UI never touches tensors, model files or backend details — swapping the
 * real model for a mock (or a future remote API) requires no UI changes.
 */
export interface InferenceEngine {
  getInfo(): EngineInfo;
  /**
   * Downloads/initializes the model. Idempotent: concurrent and repeated calls
   * share one load. onProgress receives a fraction in [0, 1].
   */
  load(onProgress?: (fraction: number) => void): Promise<void>;
  isReady(): boolean;
  /** Transforms a source image conditioned on the class one-hot index. */
  generate(source: ImageBitmap, modelIndex: number): Promise<GenerationResult>;
  /** Frees model memory. The app keeps the engine warm for the session instead. */
  dispose(): void;
}
