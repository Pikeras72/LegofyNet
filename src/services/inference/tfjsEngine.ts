import { asset } from '../../lib/assets';
import { NUM_CLASSES } from '../../data/classes';
import { InferenceError } from './types';
import type { EngineInfo, GenerationResult, InferenceEngine } from './types';
import { drawToModelInput, readImageData, MODEL_INPUT_HEIGHT, MODEL_INPUT_WIDTH } from './imageUtils';

type Tf = typeof import('@tensorflow/tfjs');
type LayersModel = import('@tensorflow/tfjs').LayersModel;
type Tensor = import('@tensorflow/tfjs').Tensor;
type Tensor3D = import('@tensorflow/tfjs').Tensor3D;

/**
 * Real in-browser inference with TensorFlow.js.
 *
 * Pipeline (parity with the original scripts/script.js):
 *   1. stretch the input to 64×128 (w×h)
 *   2. fromPixels / 255 → float tensor [1, 128, 64, 3]
 *   3. one-hot class label → [1, 22]
 *   4. model.predict([image, label]) → 3 outputs; index 2 is the generated image
 *   5. clipByValue(0, 1) → toPixels
 */
export class TfjsEngine implements InferenceEngine {
  private tf: Tf | null = null;
  private model: LayersModel | null = null;
  private slowBackend = false;
  private loadPromise: Promise<void> | null = null;
  private progressListeners = new Set<(fraction: number) => void>();

  getInfo(): EngineInfo {
    return { kind: 'tfjs', slowBackend: this.slowBackend };
  }

  isReady(): boolean {
    return this.model !== null;
  }

  load(onProgress?: (fraction: number) => void): Promise<void> {
    // Progress is multicast: every load() caller gets updates even when the
    // underlying download already started (e.g. React Strict Mode remounts).
    if (onProgress) this.progressListeners.add(onProgress);
    // Share a single load across callers; allow retrying after a failure.
    this.loadPromise ??= this.doLoad().catch((err: unknown) => {
      this.loadPromise = null;
      throw err;
    });
    return this.loadPromise.finally(() => {
      if (onProgress) this.progressListeners.delete(onProgress);
    });
  }

  private emitProgress(fraction: number): void {
    for (const listener of this.progressListeners) listener(fraction);
  }

  private async doLoad(): Promise<void> {
    // Dynamic import keeps tfjs out of the main bundle — it loads as its own
    // chunk only when the user reaches the generator.
    const tf = await import('@tensorflow/tfjs');
    this.tf = tf;

    try {
      await tf.setBackend('webgl');
      await tf.ready();
    } catch {
      // fall through to the CPU check below
    }
    if (tf.getBackend() !== 'webgl') {
      try {
        await tf.setBackend('cpu');
        await tf.ready();
        this.slowBackend = true;
      } catch (cause) {
        throw new InferenceError(
          'webgl-unavailable',
          'This browser cannot run the model: no usable WebGL or CPU backend.',
          { cause },
        );
      }
    }

    let model: LayersModel;
    try {
      model = await tf.loadLayersModel(asset('model/model.json'), {
        onProgress: (fraction) => this.emitProgress(fraction),
      });
    } catch (cause) {
      throw new InferenceError(
        'model-load-failed',
        'Could not download the model weights. Check your connection and retry.',
        { cause },
      );
    }

    // Warm-up predict compiles the WebGL shaders now, so the first real
    // generation is fast. All warm-up tensors are disposed by tidy.
    tf.tidy(() => {
      model.predict([
        tf.zeros([1, MODEL_INPUT_HEIGHT, MODEL_INPUT_WIDTH, 3]),
        tf.zeros([1, NUM_CLASSES]),
      ]);
    });

    this.model = model;
  }

  async generate(source: ImageBitmap, modelIndex: number): Promise<GenerationResult> {
    const tf = this.tf;
    const model = this.model;
    if (!tf || !model) {
      throw new InferenceError('inference-failed', 'The model is not loaded yet.');
    }

    const start = performance.now();
    const inputCanvas = drawToModelInput(source);
    const inputPreview = readImageData(inputCanvas);

    let outputTensor: Tensor3D | null = null;
    try {
      // Everything created inside tidy (input, label, all 3 raw outputs) is
      // disposed automatically; only the clipped output survives.
      outputTensor = tf.tidy(() => {
        const image = tf.browser.fromPixels(inputCanvas).toFloat().div(255).expandDims(0);
        const label = tf.oneHot(modelIndex, NUM_CLASSES).toFloat().reshape([1, NUM_CLASSES]);
        const outputs = model.predict([image, label]) as Tensor[];
        // The multiclass Pix2Pix graph exposes three outputs; index 2 is the image.
        return outputs[2].clipByValue(0, 1).squeeze() as Tensor3D;
      });
      const pixels = await tf.browser.toPixels(outputTensor);
      // Copy into a fresh buffer: ImageData requires a non-shared ArrayBuffer.
      return {
        imageData: new ImageData(new Uint8ClampedArray(pixels), MODEL_INPUT_WIDTH, MODEL_INPUT_HEIGHT),
        inputPreview,
        durationMs: performance.now() - start,
      };
    } catch (cause) {
      if (cause instanceof InferenceError) throw cause;
      throw new InferenceError('inference-failed', 'The model failed while generating the image.', {
        cause,
      });
    } finally {
      outputTensor?.dispose();
    }
  }

  dispose(): void {
    this.model?.dispose();
    this.model = null;
    this.loadPromise = null;
  }
}
