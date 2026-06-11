import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-display font-semibold tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 cursor-pointer';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-secondary text-void hover:brightness-110 hover:glow-primary active:scale-[0.98]',
  secondary:
    'glass text-ink hover:border-primary/50 hover:text-primary-strong active:scale-[0.98]',
  ghost: 'text-muted hover:text-ink hover:bg-white/5 active:scale-[0.98]',
  danger: 'bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25 active:scale-[0.98]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

function buttonClasses({ variant = 'primary', size = 'md', className }: StyleProps): string {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = StyleProps & ComponentPropsWithoutRef<'button'>;

export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...rest} />;
}

type ButtonLinkProps = StyleProps & { to: string; children: ReactNode };

export function ButtonLink({ variant, size, className, to, children }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClasses({ variant, size, className })}>
      {children}
    </Link>
  );
}
