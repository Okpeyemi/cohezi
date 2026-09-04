import { cn } from '@/lib/cn';

type BrandLogoProps = { name: string; tone: 'light' | 'dark'; className?: string };

export function BrandLogo({ name, tone, className }: BrandLogoProps) {
  const dark = tone === 'dark';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className={cn(
          'brand-mark flex h-8 w-8 items-center justify-center rounded-md text-xs font-black tracking-tighter transition-colors duration-300',
          dark ? 'bg-white text-ink' : 'bg-ink text-white',
        )}
      >
        RR
      </span>
      <span className={cn('brand-name text-lg font-semibold transition-colors duration-300', dark ? 'text-white' : 'text-ink')}>{name}</span>
    </span>
  );
}
