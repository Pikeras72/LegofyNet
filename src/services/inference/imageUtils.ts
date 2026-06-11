import { InferenceError } from './types';

export const MODEL_INPUT_WIDTH = 64;
export const MODEL_INPUT_HEIGHT = 128;

/**
 * The single place where the model's input geometry is applied:
 * 64 px wide × 128 px tall, plain stretch (no aspect-ratio preservation),
 * exactly matching the original training/inference pipeline.
 */
export function drawToModelInput(source: ImageBitmap): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = MODEL_INPUT_WIDTH;
  canvas.height = MODEL_INPUT_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new InferenceError('inference-failed', 'Canvas 2D context unavailable.');
  }
  ctx.drawImage(source, 0, 0, MODEL_INPUT_WIDTH, MODEL_INPUT_HEIGHT);
  return canvas;
}

export function readImageData(canvas: HTMLCanvasElement): ImageData {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new InferenceError('inference-failed', 'Canvas 2D context unavailable.');
  }
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

/** Decodes an uploaded file into an ImageBitmap, normalizing decode failures. */
export async function fileToImageBitmap(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file);
  } catch (cause) {
    throw new InferenceError(
      'image-decode-failed',
      'This file could not be decoded as an image. Try a different JPG or PNG.',
      { cause },
    );
  }
}
