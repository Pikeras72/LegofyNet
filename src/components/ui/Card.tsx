import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/cn';

type CardProps = ComponentPropsWithoutRef<'div'> & {
  /** Adds lift + glow on hover for interactive cards. */
  interactive?: boolean;
};

export function Card({ className, interactive = false, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl',
        interactive &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_48px_rgb(34_211_238/0.12)]',
        className,
      )}
      {...rest}
    />
  );
}
