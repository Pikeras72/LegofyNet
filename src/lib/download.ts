export type ScaleMode = 'crisp' | 'smooth';

/** Paints an ImageData onto a fresh canvas of the same size. */
export function imageDataToCanvas(data: ImageData): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = data.width;
  canvas.height = data.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.putImageData(data, 0, 0);
  return canvas;
}

/**
 * Upscales a small canvas by an integer factor.
 * 'crisp' keeps every model pixel a perfect square (nearest-neighbor);
 * 'smooth' applies high-quality bilinear filtering.
 */
export function upscaleCanvas(source: HTMLCanvasElement, scale: number, mode: ScaleMode): HTMLCanvasElement {
  const out = document.createElement('canvas');
  out.width = source.width * scale;
  out.height = source.height * scale;
  const ctx = out.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.imageSmoothingEnabled = mode === 'smooth';
  if (mode === 'smooth') ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, out.width, out.height);
  return out;
}

/** Triggers a browser download of the canvas content as a PNG file. */
export async function downloadCanvasPng(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Could not encode PNG');
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
