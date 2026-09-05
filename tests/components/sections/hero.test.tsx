import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from '@/components/sections/hero';
import { site } from '@/content/site';

describe('Hero', () => {
  it('renders the eyebrow, the two-line headline, the form, the micro-copy and the promise', () => {
    render(<Hero hero={site.hero} />);
    expect(screen.getByText(site.hero.eyebrow)).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('L’IA change le monde. Comprenez ce qui compte');
    expect(heading.className).toContain('font-display');
    expect(heading.className).toContain('uppercase');
    expect(screen.getByText(site.hero.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /S’inscrire/ })).toBeInTheDocument();
    expect(screen.getByText(site.hero.microCopy)).toBeInTheDocument();
    expect(screen.getByText(site.hero.promise)).toBeInTheDocument();
  });

  it('closes the headline with a decorative green square instead of a full stop', () => {
    render(<Hero hero={site.hero} />);
    const heading = screen.getByRole('heading', { level: 1 });
    const square = within(heading).getByTestId('hero-accent-square');
    expect(square).toHaveAttribute('aria-hidden', 'true');
    expect(square.className).toContain('bg-accent');
    expect(heading.textContent?.trim().endsWith('.')).toBe(false);
  });

  it('does not show any Rundown trusted-by logo row', () => {
    render(<Hero hero={site.hero} />);
    expect(screen.queryByRole('list', { name: 'Trusted by' })).toBeNull();
    expect(screen.queryByText('Google')).toBeNull();
  });
});
