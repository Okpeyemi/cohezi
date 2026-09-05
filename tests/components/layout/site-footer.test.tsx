import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteFooter } from '@/components/layout/site-footer';
import { site } from '@/content/site';

describe('SiteFooter', () => {
  it('renders the tagline, the three columns, the copyright and the social row', () => {
    render(<SiteFooter site={site} />);
    for (const line of site.footer.tagline) expect(screen.getByText(line)).toBeInTheDocument();
    for (const column of site.footer.columns) {
      const nav = screen.getByRole('navigation', { name: column.heading });
      for (const link of column.links) {
        expect(within(nav).getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
      }
    }
    expect(screen.getByText('© 2026 Cohezi')).toBeInTheDocument();
    const social = within(screen.getByRole('list', { name: 'Réseaux sociaux' }));
    for (const link of site.footer.social) {
      expect(social.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }
    expect(screen.getByRole('button', { name: /S’inscrire/ })).toBeInTheDocument();
  });

  it('uses the black Cohezi lockup', () => {
    const { container } = render(<SiteFooter site={site} />);
    expect(container.querySelector('img[src="/brand/cohezi-lockup-noir.png"]')).not.toBeNull();
  });
});
