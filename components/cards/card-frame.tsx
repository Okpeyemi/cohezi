import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardFrameProps = { href: string; children: ReactNode; className?: string };

/** Cadre commun des cartes Guides et Tools : bordure line, rayon 12, padding 10. */
export function CardFrame({ href, children, className }: CardFrameProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group block h-full rounded-xl border border-line bg-paper p-2.5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        className,
      )}
    >
      {children}
    </Link>
  );
}
