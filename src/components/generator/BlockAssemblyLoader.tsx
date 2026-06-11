import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const STATUS_LINES = [
  'Encoding pixels…',
  'Injecting class vector…',
  'Synthesizing block geometry…',
  'Balancing adversarial loss…',
  'Snapping studs into place…',
];

const COLS = 6;
const ROWS = 12;

/** Animated "blocks assembling" loader shown while the model generates. */
export function BlockAssemblyLoader({ classLabel }: { classLabel: string }) {
  const [lineIndex, setLineIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setLineIndex((i) => (i + 1) % STATUS_LINES.length), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="status"
      className="glass flex h-full min-h-80 flex-col items-center justify-center gap-6 rounded-2xl p-8"
    >
      {reducedMotion ? (
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      ) : (
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }} aria-hidden="true">
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            // Sweep bottom-to-top with a slight diagonal drift.
            const delay = ((ROWS - row) * 110 + col * 45) % 2200;
            return (
              <div
                key={i}
                className="h-3 w-3 rounded-[3px] bg-gradient-to-br from-primary to-secondary animate-pulse-soft"
                style={{ animationDelay: `${delay}ms` }}
              />
            );
          })}
        </div>
      )}
      <div className="text-center">
        <p className="font-display font-medium">
          Generating <span className="text-primary-strong">{classLabel}</span>
        </p>
        <p className="mt-2 font-mono text-xs text-muted" aria-live="polite">
          {STATUS_LINES[lineIndex]}
        </p>
      </div>
    </div>
  );
}
