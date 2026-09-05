import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ArticlesPage, { metadata } from '@/app/articles/page';
import { articles } from '@/content/articles';
import { site } from '@/content/site';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/articles',
}));

describe('ArticlesPage', () => {
  it('describes itself with the site copy', () => {
    expect(metadata.title).toBe('Articles — Cohezi');
    expect(metadata.description).toBe(site.articles.description);
  });

  it('renders the hero with the site-wide total and the first page of cards', () => {
    render(<ArticlesPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Articles' })).toBeInTheDocument();
    // Le décompte apparaît deux fois sans filtre : dans le bandeau et dans la ligne de résultats.
    expect(screen.getAllByText(`${articles.length} articles`)).toHaveLength(2);
    expect(screen.getAllByRole('article')).toHaveLength(9);
    expect(screen.getByRole('navigation', { name: 'Catégories' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Moins de bruit. Plus de contexte.' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
