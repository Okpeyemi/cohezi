import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';
import { articles } from '@/content/articles';
import { deepDive } from '@/lib/articles';

describe('HomePage', () => {
  it('assembles the header, the Cohezi sections and the footer from content', () => {
    render(<HomePage />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'L’IA change le monde. Comprenez ce qui compte',
    );
    const h2 = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    expect(h2).toEqual([
      'À la une',
      'Business',
      'Société',
      deepDive(articles)!.title,
      'Moins de bruit. Plus de contexte.',
    ]);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('shows the front-page cards plus one card per business and société article', () => {
    render(<HomePage />);
    const perCategory = (slug: string) => articles.filter((article) => article.category === slug).length;
    expect(screen.getAllByRole('article')).toHaveLength(5 + perCategory('business') + perCategory('societe'));
    const main = screen.getByRole('main');
    expect(within(main).getAllByRole('link', { name: /Voir tout/ })).toHaveLength(3);
  });

  it('offers three subscribe forms: hero, newsletter block and footer', () => {
    render(<HomePage />);
    expect(screen.getAllByRole('button', { name: /inscri/i })).toHaveLength(3);
    expect(screen.getByRole('link', { name: /S’inscrire/ })).toHaveAttribute('href', '#newsletter');
  });

  it('keeps no Rundown content', () => {
    render(<HomePage />);
    for (const word of ['Guides', 'Trending Tools', 'Rowan', 'University', 'The Rundown']) {
      expect(screen.queryByText(new RegExp(word))).toBeNull();
    }
  });
});
