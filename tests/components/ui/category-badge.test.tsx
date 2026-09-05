import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryBadge } from '@/components/ui/category-badge';

describe('CategoryBadge', () => {
  it('renders the label with a green marker, dark text by default', () => {
    render(<CategoryBadge label="Société" />);
    const badge = screen.getByText('Société');
    expect(badge.className).toContain('text-ink');
    expect(badge.className).toContain('uppercase');
    expect(badge.querySelector('span[aria-hidden]')?.className).toContain('bg-accent');
  });

  it('switches to paper text on dark tone', () => {
    render(<CategoryBadge label="Analyse" tone="dark" />);
    expect(screen.getByText('Analyse').className).toContain('text-paper');
  });
});
