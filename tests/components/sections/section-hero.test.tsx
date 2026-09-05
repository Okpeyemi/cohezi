import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHero } from '@/components/sections/section-hero';

describe('SectionHero', () => {
  it('renders the eyebrow, the display heading, the description and the count', () => {
    render(
      <SectionHero eyebrow="Cohezi / Articles" title="Articles" description="Toute l’actualité." articleCount={24} />,
    );
    expect(screen.getByText('Cohezi / Articles')).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1, name: 'Articles' });
    expect(heading.className).toContain('font-display');
    expect(heading.className).toContain('uppercase');
    expect(screen.getByText('Toute l’actualité.')).toBeInTheDocument();
    expect(screen.getByText('24 articles')).toBeInTheDocument();
  });

  it('keeps the count singular for one article', () => {
    render(<SectionHero eyebrow="E" title="T" description="D" articleCount={1} />);
    expect(screen.getByText('1 article')).toBeInTheDocument();
  });
});
