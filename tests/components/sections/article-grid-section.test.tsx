import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleGridSection } from '@/components/sections/article-grid-section';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { byCategory } from '@/lib/articles';

const business = byCategory(articles, 'business');

describe('ArticleGridSection', () => {
  it('renders the heading, one card per article and the view-all link', () => {
    render(<ArticleGridSection id="business" copy={site.sections.business} articles={business} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Business' })).toHaveAttribute('id', 'business-title');
    expect(screen.getAllByRole('listitem')).toHaveLength(business.length);
    expect(screen.getAllByRole('article')).toHaveLength(business.length);
    expect(screen.getByRole('link', { name: /Voir tout le business/ })).toHaveAttribute('href', site.sections.business.viewAllHref);
  });

  it('labels the section with its own heading and shows no filter', () => {
    render(<ArticleGridSection id="societe" copy={site.sections.societe} articles={byCategory(articles, 'societe')} />);
    expect(screen.getByRole('region', { name: 'Société' })).toBeInTheDocument();
    expect(screen.queryByRole('group')).toBeNull();
  });
});
