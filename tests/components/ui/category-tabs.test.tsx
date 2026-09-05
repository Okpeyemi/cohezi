import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryTabs } from '@/components/ui/category-tabs';
import { categories } from '@/content/categories';

const href = (slug: string) => (slug === 'all' ? '/articles' : `/articles?categorie=${slug}`);

describe('CategoryTabs', () => {
  it('renders an "all" tab plus one link per category', () => {
    render(<CategoryTabs activeSlug="all" allLabel="Toutes" buildHref={href} />);
    const nav = screen.getByRole('navigation', { name: 'Catégories' });
    expect(within(nav).getAllByRole('link')).toHaveLength(5);
    expect(within(nav).getByRole('link', { name: 'Toutes' })).toHaveAttribute('href', '/articles');
    for (const category of categories) {
      expect(within(nav).getByRole('link', { name: category.title })).toHaveAttribute(
        'href',
        `/articles?categorie=${category.slug}`,
      );
    }
  });

  it('marks only the active tab', () => {
    render(<CategoryTabs activeSlug="business" allLabel="Toutes" buildHref={href} />);
    const nav = within(screen.getByRole('navigation', { name: 'Catégories' }));
    const active = nav.getByRole('link', { name: 'Business' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active.className).toContain('bg-ink');
    expect(nav.getByRole('link', { name: 'Toutes' })).not.toHaveAttribute('aria-current');
  });

  it('marks the "all" tab when no category is active', () => {
    render(<CategoryTabs activeSlug="all" allLabel="Toutes" buildHref={href} />);
    const nav = within(screen.getByRole('navigation', { name: 'Catégories' }));
    expect(nav.getByRole('link', { name: 'Toutes' })).toHaveAttribute('aria-current', 'page');
  });
});
