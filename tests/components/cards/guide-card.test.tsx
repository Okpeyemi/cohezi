import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GuideCard } from '@/components/cards/guide-card';
import { guides } from '@/content/guides';

const guide = guides[0]!;

describe('GuideCard', () => {
  it('links to the guide and shows its title and image', () => {
    render(<GuideCard guide={guide} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/guides/${guide.slug}`);
    expect(screen.getByRole('heading', { level: 3, name: guide.title })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: guide.image.alt })).toBeInTheDocument();
  });
});
