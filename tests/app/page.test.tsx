import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('assembles the header, the eight sections and the footer from content', () => {
    render(<HomePage />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Learn AI in 5 minutes a day.');
    const h2 = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(h2).toEqual(['Latest Articles', 'Guides', 'Trending Tools', "Rowan's Notes", 'AI training for the future of work.']);
    expect(screen.getAllByRole('article')).toHaveLength(5);
    const main = screen.getByRole('main');
    expect(within(main).getAllByRole('link', { name: /view all/i })).toHaveLength(3);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /subscribe/i })).toHaveLength(2);
  });
});
