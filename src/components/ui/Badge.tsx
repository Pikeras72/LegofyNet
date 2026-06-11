import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type BadgeTone = 'cyan' | 'violet' | 'amber' | 'slate' | 'rose';

const tones: Record<BadgeTone, string> = {
  cyan: 'bg-primary/10 text-primary-strong border-primary/30',
  violet: 'bg-secondary/10 text-violet-300 border-secondary/30',
  amber: 'bg-block/10 text-amber-300 border-block/30',
  slate: 'bg-white/5 text-muted border-line',
  rose: 'bg-danger/10 text-danger border-danger/30',
};

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = 'slate', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-widest',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
