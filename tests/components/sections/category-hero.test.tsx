import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryHero } from '@/components/sections/category-hero';
import { categoryBySlug } from '@/content/categories';

describe('CategoryHero', () => {
  it('renders the eyebrow, the display heading and the description', () => {
    const category = categoryBySlug.business;
    render(<CategoryHero category={category} articleCount={8} />);
    expect(screen.getByText(category.eyebrow)).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1, name: category.label });
    expect(heading.className).toContain('font-display');
    expect(heading.className).toContain('uppercase');
    expect(screen.getByText(category.description)).toBeInTheDocument();
  });

  it('pluralises the article count', () => {
    render(<CategoryHero category={categoryBySlug.business} articleCount={8} />);
    expect(screen.getByText('8 articles')).toBeInTheDocument();
  });

  it('keeps the count singular for one article', () => {
    render(<CategoryHero category={categoryBySlug.analyse} articleCount={1} />);
    expect(screen.getByText('1 article')).toBeInTheDocument();
  });
});
