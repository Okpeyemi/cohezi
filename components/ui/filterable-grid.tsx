'use client';

import { useState, type ReactNode } from 'react';
import { ALL, filterByCategory } from '@/lib/filter';
import { Tabs } from './tabs';

type FilterOption = { slug: string; label: string };

export type FilterableGridProps<T> = {
  items: readonly T[];
  categories: readonly FilterOption[];
  getCategories: (item: T) => readonly string[];
  renderItems: (visible: T[]) => ReactNode;
  filterLabel: string;
  emptyLabel?: string;
  allLabel?: string;
};

export function FilterableGrid<T>({
  items,
  categories,
  getCategories,
  renderItems,
  filterLabel,
  emptyLabel = 'Rien pour le moment.',
  allLabel = 'Toutes',
}: FilterableGridProps<T>) {
  const [active, setActive] = useState<string>(ALL);
  const options: FilterOption[] = [{ slug: ALL, label: allLabel }, ...categories];
  const visible = filterByCategory(items, active, getCategories);
  // Comme sur le clone, les onglets n'existent pas sous md : la grille affiche alors ses premières cartes.

  return (
    <div>
      <div className="mt-8 hidden justify-center md:flex">
        <Tabs items={options} active={active} onChange={setActive} ariaLabel={filterLabel} />
      </div>
      <div className="mt-12">
        {visible.length > 0 ? renderItems(visible) : <p className="text-center text-muted">{emptyLabel}</p>}
      </div>
    </div>
  );
}
