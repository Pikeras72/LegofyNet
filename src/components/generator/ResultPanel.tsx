import { useState } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { downloadCanvasPng, imageDataToCanvas, upscaleCanvas } from '../../lib/download';
import type { GenerationResult } from '../../services/inference';
import { cn } from '../../lib/cn';

interface ResultPanelProps {
  result: GenerationResult;
  classId: string;
  classLabel: string;
  isMock: boolean;
  slowBackend: boolean;
  onRegenerate: () => void;
}

export function ResultPanel({ result, classId, classLabel, isMock, slowBackend, onRegenerate }: ResultPanelProps) {
  const [smooth, setSmooth] = useState(false);

  const download = async (scale: number) => {
    const base = imageDataToCanvas(result.imageData);
    const upscaled = upscaleCanvas(base, scale, smooth ? 'smooth' : 'crisp');
    await downloadCanvasPng(upscaled, `legofynet-${classId}-${scale}x.png`);
  };

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="cyan">{classLabel}</Badge>
          {isMock && <Badge tone="amber">Demo output · mock engine</Badge>}
        </div>
        <p className="font-mono text-xs text-muted">
          {(result.durationMs / 1000).toFixed(1)}s · {isMock ? 'MOCK' : slowBackend ? 'CPU' : 'WebGL'}
        </p>
      </div>

      <div className="mx-auto mt-5 w-full max-w-60">
        <BeforeAfterSlider before={result.inputPreview} after={result.imageData} smooth={smooth} />
        <p className="mt-2 text-center font-mono text-[11px] text-muted/80">
          Drag the divider to compare · native output 64×128
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <div role="group" aria-label="Rendering mode" className="inline-flex rounded-lg border border-line p-0.5">
          {(['crisp', 'smooth'] as const).map((mode) => {
            const active = smooth === (mode === 'smooth');
            return (
              <button
                key={mode}
                type="button"
                aria-pressed={active}
                onClick={() => setSmooth(mode === 'smooth')}
                className={cn(
                  'cursor-pointer rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
                  active ? 'bg-primary/15 text-primary-strong' : 'text-muted hover:text-ink',
                )}
              >
                {mode}
              </button>
            );
          })}
        </div>

        <Button onClick={() => void download(4)} size="sm">
          <Download className="h-4 w-4" aria-hidden="true" />
          PNG 4×
        </Button>
        <Button variant="secondary" size="sm" onClick={() => void download(8)}>
          <Download className="h-4 w-4" aria-hidden="true" />
          PNG 8×
        </Button>
        <Button variant="ghost" size="sm" onClick={onRegenerate}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Regenerate
        </Button>
      </div>
    </div>
  );
}
