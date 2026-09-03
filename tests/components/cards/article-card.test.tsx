import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleCard } from '@/components/cards/article-card';
import { articles } from '@/content/articles';

const featured = articles[0]!;
const compact = articles[2]!;

describe('ArticleCard', () => {
  it('renders the featured variant with tag, subtitle and meta', () => {
    render(<ArticleCard article={featured} variant="featured" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/articles/${featured.slug}`);
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: featured.title })).toBeInTheDocument();
    expect(screen.getByText(featured.subtitle!)).toBeInTheDocument();
    expect(screen.getByText(`${featured.author} • ${featured.readingMinutes} minutes`)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: featured.image.alt })).toBeInTheDocument();
  });

  it('renders the compact variant without subtitle', () => {
    render(<ArticleCard article={compact} variant="compact" />);
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.queryByText(/PLUS:/)).toBeNull();
  });
});
