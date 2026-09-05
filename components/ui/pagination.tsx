import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

type PaginationProps = { page: number; pageCount: number; buildHref: (page: number) => string };

/**
 * Numéros à afficher : toujours la première et la dernière page, plus une fenêtre
 * autour de la page courante. `0` marque une ellipse.
 */
export function pageNumbers(page: number, pageCount: number): number[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  const window = new Set<number>([1, pageCount, page - 1, page, page + 1]);
  const kept = [...window].filter((value) => value >= 1 && value <= pageCount).sort((a, b) => a - b);
  const result: number[] = [];
  for (const [index, value] of kept.entries()) {
    const previous = kept[index - 1];
    if (previous !== undefined && value - previous > 1) result.push(0);
    result.push(value);
  }
  return result;
}

const arrowClass =
  'flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors';

export function Pagination({ page, pageCount, buildHref }: PaginationProps) {
  if (pageCount <= 1) return null;

  const previousDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      {previousDisabled ? (
        <span aria-label="Page précédente" aria-disabled="true" className={cn(arrowClass, 'opacity-40')}>
          <Icon name="arrow-right" size={16} className="rotate-180" />
        </span>
      ) : (
        <Link href={buildHref(page - 1)} aria-label="Page précédente" className={cn(arrowClass, 'hover:bg-line/60')}>
          <Icon name="arrow-right" size={16} className="rotate-180" />
        </Link>
      )}

      {pageNumbers(page, pageCount).map((value, index) =>
        value === 0 ? (
          <span key={`gap-${index}`} aria-hidden className="px-1 text-muted">
            …
          </span>
        ) : (
          <Link
            key={value}
            href={buildHref(value)}
            aria-current={value === page ? 'page' : undefined}
            className={cn(
              'flex h-9 min-w-9 items-center justify-center rounded-lg px-2 font-sans text-sm transition-colors',
              value === page ? 'bg-ink text-paper' : 'border border-line text-ink hover:bg-line/60',
            )}
          >
            {value}
          </Link>
        ),
      )}

      {nextDisabled ? (
        <span aria-label="Page suivante" aria-disabled="true" className={cn(arrowClass, 'opacity-40')}>
          <Icon name="arrow-right" size={16} />
        </span>
      ) : (
        <Link href={buildHref(page + 1)} aria-label="Page suivante" className={cn(arrowClass, 'hover:bg-line/60')}>
          <Icon name="arrow-right" size={16} />
        </Link>
      )}
    </nav>
  );
}
