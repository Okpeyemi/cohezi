import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryTabs } from '@/components/ui/category-tabs';
import { categories } from '@/content/categories';

describe('CategoryTabs', () => {
  it('renders one link per category, pointing at its page', () => {
    render(<CategoryTabs activeSlug="business" />);
    const nav = screen.getByRole('navigation', { name: 'Catégories' });
    expect(within(nav).getAllByRole('link')).toHaveLength(4);
    for (const category of categories) {
      expect(within(nav).getByRole('link', { name: category.title })).toHaveAttribute('href', category.href);
    }
  });

  it('marks only the active category with aria-current and the dark style', () => {
    render(<CategoryTabs activeSlug="societe" />);
    const active = screen.getByRole('link', { name: 'Société' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active.className).toContain('bg-ink');
    const other = screen.getByRole('link', { name: 'Business' });
    expect(other).not.toHaveAttribute('aria-current');
    expect(other.className).not.toContain('bg-ink');
  });
});
