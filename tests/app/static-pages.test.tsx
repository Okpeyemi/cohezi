import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AProposPage, { metadata as aProposMetadata } from '@/app/a-propos/page';
import ContactPage, { metadata as contactMetadata } from '@/app/contact/page';
import { aboutPage, contactPage } from '@/content/pages';
import { contactEmail } from '@/content/legal';

describe('À propos', () => {
  it('renders the title, the method and the way back to the articles', () => {
    expect(aProposMetadata.title).toBe('À propos — Cohezi');
    render(<AProposPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'À propos' })).toBeInTheDocument();
    for (const section of aboutPage.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.heading })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: /Lire les articles/ })).toHaveAttribute('href', '/articles');
  });

  it('shows no update date: the page engages nothing legally', () => {
    render(<AProposPage />);
    expect(screen.queryByText(/Mise à jour le/)).toBeNull();
  });
});

describe('Contact', () => {
  it('renders the sections and a mailto call to action', () => {
    expect(contactMetadata.title).toBe('Contact — Cohezi');
    render(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Contact' })).toBeInTheDocument();
    for (const section of contactPage.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.heading })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: new RegExp(contactEmail) })).toHaveAttribute(
      'href',
      `mailto:${contactEmail}`,
    );
  });

  it('names the address in the intro, so it can be copied without clicking', () => {
    render(<ContactPage />);
    const main = within(screen.getByRole('main'));
    expect(main.getAllByText(new RegExp(contactEmail)).length).toBeGreaterThan(0);
  });
});
