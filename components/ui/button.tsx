import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'ink' | 'gradient' | 'outline' | 'outline-light' | 'white';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  ink: 'bg-ink text-white hover:bg-neutral-800',
  gradient: 'bg-brand-gradient text-white hover:opacity-90',
  outline: 'border border-line bg-transparent text-ink hover:bg-neutral-50',
  'outline-light': 'border border-white/40 bg-transparent text-white hover:bg-white/10',
  white: 'bg-white font-medium text-ink hover:bg-neutral-100',
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
