import { cn } from '@/lib/cn';

type CategoryBadgeProps = { label: string; tone?: 'light' | 'dark'; className?: string };

/** Repère vert + libellé de catégorie en capitales (Inter 11 px). */
export function CategoryBadge({ label, tone = 'light', className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em]',
        tone === 'dark' ? 'text-paper' : 'text-ink',
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
      {label}
    </span>
  );
}
