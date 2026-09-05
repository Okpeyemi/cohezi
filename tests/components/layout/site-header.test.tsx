import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from '@/components/layout/site-header';
import { site } from '@/content/site';

function renderHeader() {
  return render(
    <SiteHeader
      name={site.name}
      nav={site.nav}
      cta={site.headerCta}
      searchHref={site.searchHref}
      searchLabel={site.searchLabel}
    />,
  );
}

describe('SiteHeader', () => {
  it('renders the Cohezi logo link, the four editorial sections, search and the subscribe CTA', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: 'Cohezi, accueil' })).toHaveAttribute('href', '/');
    const nav = screen.getByRole('navigation', { name: 'Navigation principale' });
    expect(within(nav).getAllByRole('link')).toHaveLength(4);
    for (const item of site.nav) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.href);
    }
    expect(screen.getByRole('link', { name: 'Rechercher' })).toHaveAttribute('href', '/recherche');
    expect(screen.getByRole('link', { name: /S’inscrire/ })).toHaveAttribute('href', '#newsletter');
    expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toBeInTheDocument();
  });

  it('shows the brand logo, never a Rundown wordmark', () => {
    const { container } = renderHeader();
    expect(container.querySelectorAll('img[src^="/brand/"]').length).toBeGreaterThan(0);
    expect(screen.queryByText('The Rundown')).toBeNull();
  });
});
