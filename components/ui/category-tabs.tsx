import Link from 'next/link';
import { categories } from '@/content/categories';
import type { CategorySlug } from '@/content/types';
import { cn } from '@/lib/cn';

/**
 * Navigation entre rubriques, au style des onglets de l'accueil. Ce sont des liens
 * et non des boutons : changer de rubrique change de page.
 */
export function CategoryTabs({ activeSlug }: { activeSlug: CategorySlug }) {
  return (
    <nav
      aria-label="Catégories"
      className="inline-flex items-center gap-1 rounded-xl border border-line bg-paper p-1"
    >
      {categories.map((category) => {
        const isActive = category.slug === activeSlug;
        return (
          <Link
            key={category.slug}
            href={category.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex h-[33px] items-center rounded-lg px-2.5 font-sans text-sm leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:px-4 md:text-[15px]',
              isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-line/60',
            )}
          >
            {category.title}
          </Link>
        );
      })}
    </nav>
  );
}
