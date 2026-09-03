import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LatestArticles } from '@/components/sections/latest-articles';
import { articles } from '@/content/articles';
import { site } from '@/content/site';

describe('LatestArticles', () => {
  it('renders the heading, all five articles and the view-all link', () => {
    render(<LatestArticles copy={site.sections.articles} articles={articles} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Latest Articles' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getByRole('link', { name: /view all articles/i })).toHaveAttribute('href', '/articles');
  });

  it('filters by tab and promotes the first match as featured', async () => {
    const user = userEvent.setup();
    render(<LatestArticles copy={site.sections.articles} articles={articles} />);
    await user.click(screen.getByRole('button', { name: 'Tech' }));
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('Dyson puts AI in a $499 toothbrush');
    expect(cards[0]!.className).toContain('featured');
  });
});
