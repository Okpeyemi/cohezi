import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ComingSoonPage, { generateStaticParams } from '@/app/[...slug]/page';
import { site } from '@/content/site';

describe('ComingSoonPage', () => {
  it('pre-renders one path per announced page', () => {
    expect(generateStaticParams()).toEqual(site.comingSoon.map((page) => ({ slug: [page.slug] })));
  });

  it('renders the French label of a known section', async () => {
    render(await ComingSoonPage({ params: Promise.resolve({ slug: ['a-propos'] }) }));
    expect(screen.getByRole('heading', { level: 1, name: 'À propos' })).toBeInTheDocument();
    expect(screen.getByText('Cette page arrive bientôt.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Retour à l’accueil/ })).toHaveAttribute('href', '/');
  });

  it('accepts a deeper path under a known section', async () => {
    render(await ComingSoonPage({ params: Promise.resolve({ slug: ['business', 'un-article'] }) }));
    expect(screen.getByRole('heading', { level: 1, name: 'Business' })).toBeInTheDocument();
  });
});
