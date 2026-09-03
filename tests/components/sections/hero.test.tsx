import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from '@/components/sections/hero';
import { site } from '@/content/site';

describe('Hero', () => {
  it('renders the headline with the accent, the subtitle, the form and the trusted-by list', () => {
    render(<Hero hero={site.hero} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Learn AI in 5 minutes a day.');
    expect(within(heading).getByText('5 minutes').className).toContain('text-brand-gradient');
    expect(screen.getByText(site.hero.subtitle)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    const list = screen.getByRole('list', { name: 'Trusted by' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(7);
    expect(screen.getByText('2,000,000+')).toBeInTheDocument();
  });
});
