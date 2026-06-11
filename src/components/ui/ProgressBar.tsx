import { cn } from '../../lib/cn';

interface ProgressBarProps {
  /** Progress fraction in [0, 1]. */
  value: number;
  label: string;
  className?: string;
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const percent = Math.round(Math.min(Math.max(value, 0), 1) * 100);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-white/5', className)}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-300 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
