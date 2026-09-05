import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { FilterableGrid } from '@/components/ui/filterable-grid';

type Item = { id: string; cats: string[] };

const items: Item[] = [
  { id: 'one', cats: ['business'] },
  { id: 'two', cats: ['societe'] },
  { id: 'three', cats: ['business', 'societe'] },
];

const categories = [
  { slug: 'business', label: 'Business' },
  { slug: 'societe', label: 'Société' },
];

const renderItems = (visible: Item[]) => (
  <ul>
    {visible.map((item) => (
      <li key={item.id}>{item.id}</li>
    ))}
  </ul>
);

function setup(data: Item[] = items) {
  return render(
    <FilterableGrid
      items={data}
      categories={categories}
      getCategories={(item) => item.cats}
      filterLabel="Filtrer les articles"
      allLabel="Toutes"
      emptyLabel="Rien pour le moment."
      renderItems={renderItems}
    />,
  );
}

describe('FilterableGrid', () => {
  it('shows every item with the "all" tab active by default', () => {
    setup();
    expect(screen.getByRole('group', { name: 'Filtrer les articles' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toutes' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('filters the items when a tab is clicked', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Société' }));
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['two', 'three']);
    expect(screen.getByRole('button', { name: 'Société' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows the empty label when nothing matches', async () => {
    const user = userEvent.setup();
    setup([{ id: 'solo', cats: ['business'] }]);
    await user.click(screen.getByRole('button', { name: 'Société' }));
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.getByText('Rien pour le moment.')).toBeInTheDocument();
  });
});
