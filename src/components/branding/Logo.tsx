import { cn } from '../../lib/cn';

interface LogoProps {
  className?: string;
  /** Renders the "LegofyNet" wordmark next to the mark. */
  withWordmark?: boolean;
  /** Uses currentColor instead of the brand gradient (footer, monochrome contexts). */
  monochrome?: boolean;
}

/**
 * Original LegofyNet mark: a figure assembling itself out of modular blocks —
 * three settled bricks and one corner still materializing into pixels.
 */
export function Logo({ className, withWordmark = false, monochrome = false }: LogoProps) {
  const fill = monochrome ? 'currentColor' : 'url(#legofynet-gradient)';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 48 48" className="h-8 w-8 shrink-0" aria-hidden="true">
        {!monochrome && (
          <defs>
            <linearGradient id="legofynet-gradient" x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="var(--color-primary)" />
              <stop offset="1" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
        )}
        <g fill={fill}>
          <rect x="5" y="26" width="17" height="17" rx="3.5" />
          <rect x="26" y="26" width="17" height="17" rx="3.5" />
          <rect x="5" y="5" width="17" height="17" rx="3.5" />
          <rect x="26" y="14" width="9" height="9" rx="2" opacity="0.95" />
          <rect x="38" y="6" width="7" height="7" rx="1.8" opacity="0.7" />
          <rect x="29" y="4" width="5" height="5" rx="1.4" opacity="0.5" />
          <rect x="42" y="18" width="3.5" height="3.5" rx="1" opacity="0.35" />
        </g>
      </svg>
      {withWordmark && (
        <span className="font-display text-xl font-semibold tracking-tight">
          Legofy<span className={monochrome ? '' : 'text-gradient'}>Net</span>
        </span>
      )}
    </span>
  );
}
