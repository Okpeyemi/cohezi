'use client';

import { useState, type ReactNode } from 'react';
import type { Category } from '@/content/types';
import { ALL, filterByCategory } from '@/lib/filter';
import { Chip } from './chip';
import { Tabs } from './tabs';

export type FilterableGridProps<T> = {
  items: readonly T[];
  categories: readonly Category[];
  getCategories: (item: T) => readonly string[];
  variant: 'tabs' | 'chips';
  renderItems: (visible: T[]) => ReactNode;
  filterLabel: string;
  emptyLabel?: string;
  allLabel?: string;
};

export function FilterableGrid<T>({
  items,
  categories,
  getCategories,
  variant,
  renderItems,
  filterLabel,
  emptyLabel = 'Nothing here yet.',
  allLabel = 'All',
}: FilterableGridProps<T>) {
  const [active, setActive] = useState<string>(ALL);
  const options: Category[] = [{ slug: ALL, label: allLabel, icon: 'all' }, ...categories];
  const visible = filterByCategory(items, active, getCategories);
  // Comme sur le site, les filtres n'existent pas sous md : la grille affiche alors ses 3 premières cartes.

  return (
    <div>
      {variant === 'tabs' ? (
        <div className="mt-8 hidden justify-center md:flex">
          <Tabs items={options} active={active} onChange={setActive} ariaLabel={filterLabel} />
        </div>
      ) : (
        <div role="group" aria-label={filterLabel} className="mx-auto mt-8 hidden max-w-[840px] flex-wrap justify-center gap-2 md:flex">
          {options.map((category) => (
            <Chip
              key={category.slug}
              label={category.label}
              icon={category.icon}
              active={category.slug === active}
              onClick={() => setActive(category.slug)}
            />
          ))}
        </div>
      )}
      <div className="mt-12">
        {visible.length > 0 ? renderItems(visible) : <p className="text-center text-muted">{emptyLabel}</p>}
      </div>
    </div>
  );
}
