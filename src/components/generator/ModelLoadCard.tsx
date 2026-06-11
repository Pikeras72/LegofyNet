import { BrainCircuit, CloudDownload, RefreshCw, TriangleAlert } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import type { ModelState } from '../../hooks/useGenerator';

interface ModelLoadCardProps {
  model: Extract<ModelState, { status: 'loading' } | { status: 'error' }>;
  onRetry: () => void;
}

export function ModelLoadCard({ model, onRetry }: ModelLoadCardProps) {
  if (model.status === 'error') {
    return (
      <div className="glass flex h-full min-h-80 flex-col items-center justify-center gap-4 rounded-2xl p-8 text-center">
        <span className="rounded-xl bg-danger/10 p-3 text-danger">
          <TriangleAlert className="h-7 w-7" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold">Model failed to load</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{model.message}</p>
        </div>
        <Button variant="secondary" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Retry download
        </Button>
      </div>
    );
  }

  const downloading = model.progress < 1;
  return (
    <div className="glass flex h-full min-h-80 flex-col items-center justify-center gap-5 rounded-2xl p-8 text-center">
      <span className="rounded-xl bg-primary/10 p-3 text-primary motion-safe:animate-pulse-soft">
        {downloading ? (
          <CloudDownload className="h-7 w-7" aria-hidden="true" />
        ) : (
          <BrainCircuit className="h-7 w-7" aria-hidden="true" />
        )}
      </span>
      <div className="w-full max-w-xs">
        <p className="font-display font-medium" aria-live="polite">
          {downloading ? 'Downloading neural network' : 'Compiling shaders…'}
        </p>
        <ProgressBar
          value={model.progress}
          label="Model download progress"
          className="mt-3"
        />
        <p className="mt-2 font-mono text-xs text-muted">
          {downloading ? `${Math.round(model.progress * 100)}% of ~125 MB` : 'Warming up the GPU'}
        </p>
      </div>
      <p className="max-w-xs text-xs leading-relaxed text-muted/80">
        One-time download — your browser caches the model for future visits. Everything runs locally;
        your images never leave this device.
      </p>
    </div>
  );
}
