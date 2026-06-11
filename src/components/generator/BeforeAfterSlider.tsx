import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { GripVertical } from 'lucide-react';
import { cn } from '../../lib/cn';

interface BeforeAfterSliderProps {
  /** Preprocessed model input — pixel-aligned with `after`. */
  before: ImageData;
  /** Generated output. */
  after: ImageData;
  /** Bilinear scaling instead of crisp nearest-neighbor. */
  smooth: boolean;
}

export function BeforeAfterSlider({ before, after, smooth }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeCanvasRef = useRef<HTMLCanvasElement>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState(50);
  const draggingRef = useRef(false);

  useEffect(() => {
    beforeCanvasRef.current?.getContext('2d')?.putImageData(before, 0, 0);
  }, [before]);
  useEffect(() => {
    afterCanvasRef.current?.getContext('2d')?.putImageData(after, 0, 0);
  }, [after]);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) updateFromClientX(e.clientX);
  };
  const stopDragging = () => {
    draggingRef.current = false;
  };

  const onHandleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = 5;
    let next: number | null = null;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = position - step;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = position + step;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = 100;
    if (next !== null) {
      e.preventDefault();
      setPosition(Math.min(100, Math.max(0, next)));
    }
  };

  const canvasClass = cn('absolute inset-0 h-full w-full', !smooth && 'pixelated');

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className="relative aspect-[1/2] w-full cursor-ew-resize touch-none overflow-hidden rounded-xl border border-line select-none"
    >
      <canvas ref={beforeCanvasRef} width={before.width} height={before.height} className={canvasClass} />
      {/* The generated image is revealed to the right of the divider. */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <canvas ref={afterCanvasRef} width={after.width} height={after.height} className={canvasClass} />
      </div>

      <span className="absolute top-2 left-2 rounded-md bg-void/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink/90 backdrop-blur-sm">
        Original
      </span>
      <span className="absolute top-2 right-2 rounded-md bg-void/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-strong backdrop-blur-sm">
        LegofyNet
      </span>

      <div
        aria-hidden="true"
        className="absolute inset-y-0 w-0.5 bg-primary shadow-[0_0_12px_rgb(34_211_238/0.8)]"
        style={{ left: `calc(${position}% - 1px)` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Before/after comparison divider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onHandleKeyDown}
        className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-primary/60 bg-void/85 text-primary-strong shadow-[0_0_16px_rgb(34_211_238/0.5)] backdrop-blur-sm"
        style={{ left: `${position}%` }}
      >
        <GripVertical className="h-4 w-4" aria-hidden="true" />
      </div>
    </div>
  );
}
