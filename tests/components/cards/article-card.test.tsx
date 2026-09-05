import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleCard } from '@/components/cards/article-card';
import { articles } from '@/content/articles';
import { categoryBySlug } from '@/content/categories';
import { formatDateFr } from '@/lib/format-date';

const featured = articles.find((a) => a.featured)!;
const business = articles.find((a) => a.category === 'business')!;

describe('ArticleCard', () => {
  it('renders the featured variant with badge, excerpt and French meta', () => {
    render(<ArticleCard article={featured} variant="featured" />);
    const category = categoryBySlug[featured.category];
    expect(screen.getByRole('link')).toHaveAttribute('href', `${category.href}/${featured.slug}`);
    expect(screen.getByText(category.label)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: featured.title })).toBeInTheDocument();
    expect(screen.getByText(featured.excerpt)).toBeInTheDocument();
    expect(
      screen.getByText(`${formatDateFr(featured.publishedAt)} · ${featured.readingMinutes} min de lecture`),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: featured.image.alt })).toBeInTheDocument();
  });

  it('renders the compact variant without excerpt', () => {
    render(<ArticleCard article={business} variant="compact" />);
    expect(screen.getByText('Business')).toBeInTheDocument();
    expect(screen.queryByText(business.excerpt)).toBeNull();
    expect(screen.getByRole('link')).toHaveAttribute('href', `/business/${business.slug}`);
  });

  it('renders the grid variant inside a bordered card frame', () => {
    render(<ArticleCard article={business} variant="grid" />);
    const link = screen.getByRole('link');
    expect(link.className).toContain('border-line');
    expect(screen.getByRole('heading', { level: 3, name: business.title })).toBeInTheDocument();
    expect(screen.queryByText(business.excerpt)).toBeNull();
  });
});
