import type { EngineInfo, GenerationResult, InferenceEngine } from './types';
import { drawToModelInput, readImageData, MODEL_INPUT_HEIGHT, MODEL_INPUT_WIDTH } from './imageUtils';

const FAKE_LOAD_MS = 1800;
const FAKE_INFERENCE_MS = 1600;
const BLOCK_SIZE = 4;
const COLOR_STEPS = 5;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * MOCK ENGINE — produces a fake "blockified" output (block-averaged, palette-
 * quantized pixels) instead of running the neural network. Used for UI
 * development and demos via VITE_INFERENCE_ENGINE=mock; never silently shipped:
 * the UI surfaces getInfo().kind === 'mock' as a visible badge.
 */
export class MockEngine implements InferenceEngine {
  private ready = false;
  private loadPromise: Promise<void> | null = null;
  private progressListeners = new Set<(fraction: number) => void>();

  getInfo(): EngineInfo {
    return { kind: 'mock', slowBackend: false };
  }

  isReady(): boolean {
    return this.ready;
  }

  load(onProgress?: (fraction: number) => void): Promise<void> {
    if (onProgress) this.progressListeners.add(onProgress);
    this.loadPromise ??= (async () => {
      const steps = 12;
      for (let i = 1; i <= steps; i++) {
        await sleep(FAKE_LOAD_MS / steps);
        for (const listener of this.progressListeners) listener(i / steps);
      }
      this.ready = true;
    })();
    return this.loadPromise.finally(() => {
      if (onProgress) this.progressListeners.delete(onProgress);
    });
  }

  async generate(source: ImageBitmap, _modelIndex: number): Promise<GenerationResult> {
    const start = performance.now();
    const canvas = drawToModelInput(source);
    const inputPreview = readImageData(canvas);

    await sleep(FAKE_INFERENCE_MS);

    // Average each BLOCK_SIZE×BLOCK_SIZE cell and snap channels to a coarse
    // palette — a convincing placeholder for the real generator's output.
    const src = inputPreview.data;
    const out = new ImageData(MODEL_INPUT_WIDTH, MODEL_INPUT_HEIGHT);
    const quant = 255 / (COLOR_STEPS - 1);
    for (let by = 0; by < MODEL_INPUT_HEIGHT; by += BLOCK_SIZE) {
      for (let bx = 0; bx < MODEL_INPUT_WIDTH; bx += BLOCK_SIZE) {
        let r = 0;
        let g = 0;
        let b = 0;
        for (let y = 0; y < BLOCK_SIZE; y++) {
          for (let x = 0; x < BLOCK_SIZE; x++) {
            const i = ((by + y) * MODEL_INPUT_WIDTH + bx + x) * 4;
            r += src[i];
            g += src[i + 1];
            b += src[i + 2];
          }
        }
        const n = BLOCK_SIZE * BLOCK_SIZE;
        const qr = Math.round(r / n / quant) * quant;
        const qg = Math.round(g / n / quant) * quant;
        const qb = Math.round(b / n / quant) * quant;
        for (let y = 0; y < BLOCK_SIZE; y++) {
          for (let x = 0; x < BLOCK_SIZE; x++) {
            const i = ((by + y) * MODEL_INPUT_WIDTH + bx + x) * 4;
            out.data[i] = qr;
            out.data[i + 1] = qg;
            out.data[i + 2] = qb;
            out.data[i + 3] = 255;
          }
        }
      }
    }

    return { imageData: out, inputPreview, durationMs: performance.now() - start };
  }

  dispose(): void {
    this.ready = false;
    this.loadPromise = null;
  }
}
