import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'ink' | 'paper' | 'accent' | 'outline' | 'outline-light';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  ink: 'bg-ink text-paper hover:bg-ink-soft',
  paper: 'bg-paper font-medium text-ink hover:bg-line/60',
  accent: 'bg-accent text-ink hover:bg-accent-deep hover:text-paper',
  outline: 'border border-line bg-transparent text-ink hover:bg-line/40',
  'outline-light': 'border border-paper/40 bg-transparent text-paper hover:bg-paper/10',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-[42px] px-5 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-12 px-6 text-base',
};

export function buttonClasses({ variant = 'ink', size = 'md', className }: ButtonStyleProps): string {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonStyleProps & ComponentPropsWithoutRef<'button'>;

export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...rest} />;
}

type ButtonLinkProps = ButtonStyleProps & ComponentPropsWithoutRef<typeof Link>;

export function ButtonLink({ variant, size, className, ...rest }: ButtonLinkProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...rest} />;
}
