import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DeepDive } from '@/components/sections/deep-dive';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { deepDive } from '@/lib/articles';

const article = deepDive(articles)!;

describe('DeepDive', () => {
  it('renders the eyebrow, the green number, the title, the excerpt and the reading time', () => {
    render(<DeepDive copy={site.deepDive} article={article} />);
    expect(screen.getByText('Cohezi / Décryptage')).toBeInTheDocument();
    const number = screen.getByText('01');
    expect(number.className).toContain('text-accent');
    expect(number.className).toContain('font-display');
    expect(screen.getByRole('heading', { level: 2, name: article.title })).toBeInTheDocument();
    expect(screen.getByText(article.excerpt)).toBeInTheDocument();
    expect(screen.getByText(`${article.readingMinutes} min de lecture`)).toBeInTheDocument();
  });

  it('links to the article on a dark surface', () => {
    const { container } = render(<DeepDive copy={site.deepDive} article={article} />);
    expect(screen.getByRole('link', { name: /Lire le décryptage/ })).toHaveAttribute(
      'href',
      `/analyses/${article.slug}`,
    );
    expect(container.querySelector('.bg-ink')).not.toBeNull();
  });
});
