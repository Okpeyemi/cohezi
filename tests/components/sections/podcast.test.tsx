import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Podcast } from '@/components/sections/podcast';
import { podcast } from '@/content/podcast';

describe('Podcast', () => {
  it('renders heading, listen links, and the static episode card', () => {
    render(<Podcast podcast={podcast} />);
    expect(screen.getByRole('heading', { level: 2, name: "Rowan's Notes" })).toBeInTheDocument();
    for (const link of podcast.listenLinks) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }
    expect(screen.getByRole('heading', { level: 3, name: podcast.card.title })).toBeInTheDocument();
    expect(screen.getByText(podcast.card.meta)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: podcast.card.ctaLabel })).toHaveAttribute('href', podcast.card.ctaHref);
    expect(screen.getByRole('img', { name: podcast.card.artworkAlt })).toBeInTheDocument();
  });
});
