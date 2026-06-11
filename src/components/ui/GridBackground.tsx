import { cn } from '../../lib/cn';

/** Faint sci-fi blueprint grid, faded out radially. Purely decorative. */
export function GridBackground({ className }: { className?: string }) {
  const mask = 'radial-gradient(ellipse 85% 65% at 50% 35%, black 30%, transparent 78%)';
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage:
          'linear-gradient(rgb(148 163 184 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184 / 0.08) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
