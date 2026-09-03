import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { FilterableGrid } from '@/components/ui/filterable-grid';
import type { Category } from '@/content/types';

type Item = { id: string; cats: string[] };

const items: Item[] = [
  { id: 'one', cats: ['coding'] },
  { id: 'two', cats: ['design'] },
  { id: 'three', cats: ['coding', 'design'] },
];

const categories: Category[] = [
  { slug: 'coding', label: 'Coding', icon: 'coding' },
  { slug: 'design', label: 'Design', icon: 'design' },
];

const renderItems = (visible: Item[]) => (
  <ul>
    {visible.map((item) => (
      <li key={item.id}>{item.id}</li>
    ))}
  </ul>
);

function setup(variant: 'tabs' | 'chips' = 'chips', data: Item[] = items) {
  return render(
    <FilterableGrid
      items={data}
      categories={categories}
      getCategories={(item) => item.cats}
      variant={variant}
      filterLabel="Filter items"
      renderItems={renderItems}
    />,
  );
}

describe('FilterableGrid', () => {
  it('shows every item with "All" active by default', () => {
    setup();
    expect(screen.getByRole('group', { name: 'Filter items' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('filters the items when a chip is clicked', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['two', 'three']);
    expect(screen.getByRole('button', { name: 'Design' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows the empty label when nothing matches', async () => {
    const user = userEvent.setup();
    setup('chips', [{ id: 'solo', cats: ['coding'] }]);
    await user.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument();
  });

  it('renders the tabs variant with the same behaviour', async () => {
    const user = userEvent.setup();
    setup('tabs');
    await user.click(screen.getByRole('button', { name: 'Coding' }));
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['one', 'three']);
  });
});
