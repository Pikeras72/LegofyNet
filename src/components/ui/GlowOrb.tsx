import { cn } from '../../lib/cn';

type OrbColor = 'cyan' | 'violet' | 'amber';

const colors: Record<OrbColor, string> = {
  cyan: 'bg-cyan-500/25',
  violet: 'bg-violet-600/25',
  amber: 'bg-amber-400/15',
};

interface GlowOrbProps {
  color?: OrbColor;
  className?: string;
  /** Staggers the float animation so multiple orbs drift out of phase. */
  delay?: string;
}

/** Soft blurred light source drifting in the background. Purely decorative. */
export function GlowOrb({ color = 'cyan', className, delay }: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute rounded-full blur-3xl motion-safe:animate-float-slow',
        colors[color],
        className,
      )}
      style={delay ? { animationDelay: delay } : undefined}
    />
  );
}
