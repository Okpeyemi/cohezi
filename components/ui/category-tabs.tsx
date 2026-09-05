import Link from 'next/link';
import { categories } from '@/content/categories';
import type { CategorySlug } from '@/content/types';
import { cn } from '@/lib/cn';

export type TabSlug = CategorySlug | 'all';

type CategoryTabsProps = {
  activeSlug: TabSlug;
  allLabel: string;
  buildHref: (slug: TabSlug) => string;
};

/**
 * Filtre par rubrique, rendu en liens : l'état vit dans l'URL, donc chaque onglet
 * est une adresse partageable. L'appelant construit les adresses pour conserver
 * les autres paramètres (recherche notamment).
 */
export function CategoryTabs({ activeSlug, allLabel, buildHref }: CategoryTabsProps) {
  const tabs: { slug: TabSlug; label: string }[] = [
    { slug: 'all', label: allLabel },
    ...categories.map((category) => ({ slug: category.slug as TabSlug, label: category.title })),
  ];

  return (
    <nav
      aria-label="Catégories"
      className="inline-flex items-center gap-1 rounded-xl border border-line bg-paper p-1"
    >
      {tabs.map((tab) => {
        const isActive = tab.slug === activeSlug;
        return (
          <Link
            key={tab.slug}
            href={buildHref(tab.slug)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex h-[33px] items-center rounded-lg px-2.5 font-sans text-sm leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:px-4 md:text-[15px]',
              isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-line/60',
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
