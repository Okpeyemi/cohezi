import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeading } from '@/components/ui/section-heading';

describe('SectionHeading', () => {
  it('renders an h2 with the given id and an optional subtitle', () => {
    render(<SectionHeading id="guides-title" title="Guides" subtitle="Sub" />);
    const heading = screen.getByRole('heading', { level: 2, name: 'Guides' });
    expect(heading).toHaveAttribute('id', 'guides-title');
    expect(heading.className).toContain('text-ink');
    expect(screen.getByText('Sub')).toBeInTheDocument();
  });

  it('switches to light text on dark tone and omits the subtitle when absent', () => {
    render(<SectionHeading id="u" title="AI training" tone="dark" />);
    expect(screen.getByRole('heading', { level: 2 }).className).toContain('text-white');
    expect(screen.queryByText('Sub')).toBeNull();
  });
});
