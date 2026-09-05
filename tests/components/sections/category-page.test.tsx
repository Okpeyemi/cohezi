import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryPage } from '@/components/sections/category-page';
import { articles } from '@/content/articles';
import { categoryBySlug } from '@/content/categories';
import { byCategory } from '@/lib/articles';

describe('CategoryPage', () => {
  it('renders header, hero, tabs, every article of the category, newsletter and footer', () => {
    const expected = byCategory(articles, 'business', articles.length);
    render(<CategoryPage slug="business" />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Business' })).toBeInTheDocument();
    expect(screen.getByText(categoryBySlug.business.description)).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Catégories' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(expected.length);
    expect(screen.getByRole('heading', { level: 2, name: 'Moins de bruit. Plus de contexte.' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('features the most recent article and puts the rest in the grid', () => {
    const expected = byCategory(articles, 'business', articles.length);
    render(<CategoryPage slug="business" />);

    const cards = screen.getAllByRole('article');
    expect(cards[0]!.className).toContain('featured');
    expect(cards[0]!).toHaveTextContent(expected[0]!.title);
    const grid = screen.getByRole('list', { name: 'Articles' });
    expect(within(grid).getAllByRole('listitem')).toHaveLength(expected.length - 1);
  });

  it('handles a three-article category without breaking the layout', () => {
    render(<CategoryPage slug="analyse" />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByText('3 articles')).toBeInTheDocument();
  });

  it('marks the current category in the tabs', () => {
    render(<CategoryPage slug="societe" />);
    // « Société » figure aussi dans le menu du header : on cible les onglets.
    const tabs = within(screen.getByRole('navigation', { name: 'Catégories' }));
    expect(tabs.getByRole('link', { name: 'Société' })).toHaveAttribute('aria-current', 'page');
    expect(tabs.getByRole('link', { name: 'Business' })).not.toHaveAttribute('aria-current');
  });
});
