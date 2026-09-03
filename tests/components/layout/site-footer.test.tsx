import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteFooter } from '@/components/layout/site-footer';
import { site } from '@/content/site';

describe('SiteFooter', () => {
  it('renders the description, every column, the copyright and social links', () => {
    render(<SiteFooter site={site} />);
    expect(screen.getByText(site.footer.description)).toBeInTheDocument();
    for (const column of site.footer.columns) {
      const nav = screen.getByRole('navigation', { name: column.heading });
      for (const link of column.links) {
        expect(within(nav).getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
      }
    }
    expect(screen.getByText(site.footer.copyright)).toBeInTheDocument();
    for (const social of site.footer.social) {
      expect(screen.getByRole('link', { name: social.label })).toHaveAttribute('href', social.href);
    }
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });
});
