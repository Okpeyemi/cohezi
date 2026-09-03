import { cn } from '@/lib/cn';

type BrandLogoProps = { name: string; tone: 'light' | 'dark'; className?: string };

export function BrandLogo({ name, tone, className }: BrandLogoProps) {
  const dark = tone === 'dark';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-md text-xs font-black tracking-tighter',
          dark ? 'bg-white text-ink' : 'bg-ink text-white',
        )}
      >
        RR
      </span>
      <span className={cn('text-lg font-semibold', dark ? 'text-white' : 'text-ink')}>{name}</span>
    </span>
  );
}
