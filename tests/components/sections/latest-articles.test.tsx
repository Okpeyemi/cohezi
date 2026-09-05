import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LatestArticles } from '@/components/sections/latest-articles';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { latest } from '@/lib/articles';

const front = latest(articles);

describe('LatestArticles', () => {
  it('renders the French heading, the five front-page articles and the view-all link', () => {
    render(<LatestArticles copy={site.sections.latest} articles={front} />);
    expect(screen.getByRole('heading', { level: 2, name: 'À la une' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getByRole('link', { name: /Voir toutes les actualités/ })).toHaveAttribute('href', site.sections.latest.viewAllHref);
  });

  it('offers one tab per editorial category plus "Toutes"', () => {
    render(<LatestArticles copy={site.sections.latest} articles={front} />);
    const tabs = screen.getByRole('group', { name: 'Filtrer les articles' });
    expect(tabs.querySelectorAll('button')).toHaveLength(5);
    for (const label of ['Toutes', 'Actualité', 'Business', 'Société', 'Analyse']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
  });

  it('filters by tab and promotes the first match as the featured card', async () => {
    const user = userEvent.setup();
    render(<LatestArticles copy={site.sections.latest} articles={front} />);
    await user.click(screen.getByRole('button', { name: 'Business' }));
    const cards = screen.getAllByRole('article');
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.length).toBeLessThan(5);
    expect(cards[0]!.className).toContain('featured');
    for (const card of cards) expect(card).toHaveTextContent('Business');
  });
});
