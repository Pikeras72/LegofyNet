import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { AlertCircle, ImageUp, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useObjectUrl } from '../../hooks/useObjectUrl';
import { cn } from '../../lib/cn';

interface UploadDropzoneProps {
  file: File | null;
  error: string | null;
  onSelect: (file: File) => void;
  onClear: () => void;
}

function formatSize(bytes: number): string {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function UploadDropzone({ file, error, onSelect, onClear }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const previewUrl = useObjectUrl(file);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onSelect(dropped);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        aria-label="Upload an image"
        onChange={(e) => {
          const picked = e.target.files?.[0];
          if (picked) onSelect(picked);
          e.target.value = '';
        }}
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex min-h-52 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 transition-all duration-200',
            dragging
              ? 'border-primary bg-primary/10 glow-primary'
              : 'border-line bg-white/[0.02] hover:border-primary/50 hover:bg-white/[0.04]',
          )}
        >
          <span
            className={cn(
              'rounded-xl p-3 transition-colors',
              dragging ? 'bg-primary/20 text-primary-strong' : 'bg-white/5 text-muted',
            )}
          >
            <ImageUp className="h-7 w-7" aria-hidden="true" />
          </span>
          <span className="font-display font-medium">
            {dragging ? 'Drop it!' : 'Drag & drop your image here'}
          </span>
          <span className="text-sm text-muted">
            or <span className="text-primary-strong underline underline-offset-2">browse files</span> · JPG or
            PNG · max 10 MB
          </span>
        </button>
      ) : (
        <div className="glass flex items-center gap-4 rounded-2xl p-4">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview of your uploaded image"
              className="h-24 w-20 shrink-0 rounded-lg border border-line object-cover"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium" title={file.name}>
              {file.name}
            </p>
            <p className="mt-0.5 font-mono text-xs text-muted">{formatSize(file.size)}</p>
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                Replace
              </Button>
              <Button variant="ghost" size="sm" onClick={onClear}>
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

      <div aria-live="polite">
        {error && (
          <p className="mt-3 flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
