import type { InferenceEngine } from './types';
import { MockEngine } from './mockEngine';
import { TfjsEngine } from './tfjsEngine';

let engine: InferenceEngine | null = null;

/**
 * Module-level singleton: once loaded, the model stays warm for the whole
 * session (re-initializing 125 MB of weights on every page visit would be
 * far worse than holding them).
 *
 * Engine selection via VITE_INFERENCE_ENGINE:
 *   'tfjs' (default) — real in-browser inference (TfjsEngine)
 *   'mock'           — demo engine for UI work, no model download (MockEngine)
 *
 * To plug in a remote inference API later, add an ApiEngine implementing
 * InferenceEngine and select it here — no UI changes required.
 */
export function getInferenceEngine(): InferenceEngine {
  engine ??= import.meta.env.VITE_INFERENCE_ENGINE === 'mock' ? new MockEngine() : new TfjsEngine();
  return engine;
}

export * from './types';
