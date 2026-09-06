import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ArticleBrowser } from '@/components/sections/article-browser';
import { articles } from '@/content/articles';
import type { ArticlesPageCopy } from '@/content/types';

const replace = vi.fn();
let params = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace, push: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => params,
  usePathname: () => '/articles',
}));

const copy: ArticlesPageCopy = {
  eyebrow: 'Cohezi / Articles',
  title: 'Articles',
  description: 'Toute l’actualité de l’IA.',
  searchLabel: 'Rechercher un article',
  searchPlaceholder: 'Titre, sujet, entreprise…',
  allLabel: 'Toutes',
  emptyTitle: 'Aucun article ne correspond.',
  emptyAction: 'Réinitialiser les filtres',
};

function setup(search = '') {
  params = new URLSearchParams(search);
  return render(<ArticleBrowser articles={articles} copy={copy} />);
}

describe('ArticleBrowser', () => {
  beforeEach(() => {
    replace.mockReset();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the first nine articles and the total by default', () => {
    setup();
    expect(screen.getAllByRole('article')).toHaveLength(9);
    expect(screen.getByText('26 articles')).toBeInTheDocument();
  });

  it('reads the active category from the URL and says so in the result line', () => {
    setup('categorie=business');
    const businessCount = articles.filter((article) => article.category === 'business').length;
    expect(screen.getAllByRole('article')).toHaveLength(businessCount);
    expect(screen.getByText(`${businessCount} articles dans Business`)).toBeInTheDocument();
    const tabs = within(screen.getByRole('navigation', { name: 'Catégories' }));
    expect(tabs.getByRole('link', { name: 'Business' })).toHaveAttribute('aria-current', 'page');
  });

  it('reads the page number from the URL', () => {
    setup('page=3');
    expect(screen.getAllByRole('article')).toHaveLength(8);
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute('aria-current', 'page');
  });

  it('ignores an unknown category', () => {
    setup('categorie=nimportequoi');
    expect(screen.getAllByRole('article')).toHaveLength(9);
    expect(screen.getByText('26 articles')).toBeInTheDocument();
  });

  it('filters instantly as the user types and pushes the query into the URL', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    setup();
    await user.type(screen.getByLabelText('Rechercher un article'), 'mistral');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('1 article pour « mistral »')).toBeInTheDocument();
    vi.advanceTimersByTime(300);
    await waitFor(() => expect(replace).toHaveBeenCalledWith('/articles?q=mistral', { scroll: false }));
  });

  it('combines the category and the query in the result line', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    setup('categorie=business');
    await user.type(screen.getByLabelText('Rechercher un article'), 'mistral');
    expect(screen.getByText('1 article dans Business pour « mistral »')).toBeInTheDocument();
  });

  it('shows the empty state with a reset link when nothing matches', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    setup();
    await user.type(screen.getByLabelText('Rechercher un article'), 'zzzz');
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(screen.getByText('Aucun article ne correspond.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Réinitialiser les filtres' })).toHaveAttribute('href', '/articles');
  });

  it('builds tab links that keep the current query', () => {
    setup('q=mistral');
    const tabs = within(screen.getByRole('navigation', { name: 'Catégories' }));
    expect(tabs.getByRole('link', { name: 'Business' })).toHaveAttribute(
      'href',
      '/articles?categorie=business&q=mistral',
    );
  });
});
