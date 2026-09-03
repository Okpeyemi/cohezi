import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from '@/components/layout/site-header';
import { site } from '@/content/site';

describe('SiteHeader', () => {
  it('renders the brand link, every nav item and the CTA', () => {
    render(<SiteHeader name={site.name} nav={site.nav} cta={site.headerCta} />);
    expect(screen.getByRole('link', { name: 'The Rundown homepage' })).toHaveAttribute('href', '/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    for (const item of site.nav) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.href);
    }
    expect(screen.getByRole('link', { name: /University Platform/ })).toHaveAttribute('href', site.headerCta.href);
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });
});
