import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UniversityCta } from '@/components/sections/university-cta';
import { university } from '@/content/university';

describe('UniversityCta', () => {
  it('renders the brand line, heading, both CTAs and the four feature cards', () => {
    render(<UniversityCta university={university} />);
    expect(screen.getByText('University').className).toContain('text-brand-gradient');
    expect(screen.getByRole('heading', { level: 2, name: university.title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: university.primaryCta.label })).toHaveAttribute('href', university.primaryCta.href);
    expect(screen.getByRole('link', { name: university.secondaryCta.label })).toHaveAttribute('href', university.secondaryCta.href);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    for (const feature of university.features) {
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    }
  });
});
