import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AProposPage, { metadata as aProposMetadata } from '@/app/a-propos/page';
import ContactPage, { metadata as contactMetadata } from '@/app/contact/page';

describe('pages still to come', () => {
  it('renders the À propos placeholder', () => {
    expect(aProposMetadata.title).toBe('À propos — Bientôt disponible');
    render(<AProposPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'À propos' })).toBeInTheDocument();
    expect(screen.getByText('Cette page arrive bientôt.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Retour à l’accueil/ })).toHaveAttribute('href', '/');
  });

  it('renders the Contact placeholder', () => {
    expect(contactMetadata.title).toBe('Contact — Bientôt disponible');
    render(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Contact' })).toBeInTheDocument();
  });
});
