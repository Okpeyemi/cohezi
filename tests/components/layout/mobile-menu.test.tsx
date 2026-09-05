import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { site } from '@/content/site';

// `next/link` appelle le routeur App Router au clic ; il n'existe pas en jsdom.
// On le remplace par une ancre qui relaie onClick et annule la navigation.
vi.mock('next/link', () => ({
  default: ({ href, onClick, children, ...rest }: ComponentPropsWithoutRef<'a'> & { href: string }) => (
    <a
      href={href}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        event.preventDefault();
      }}
      {...rest}
    >
      {children}
    </a>
  ),
}));

describe('MobileMenu', () => {
  const props = {
    nav: site.nav,
    cta: site.headerCta,
    searchHref: site.searchHref,
    searchLabel: site.searchLabel,
  };

  it('opens the panel, locks body scroll and reflects the state in aria-expanded', async () => {
    const user = userEvent.setup();
    render(<MobileMenu {...props} />);
    const trigger = screen.getByRole('button', { name: 'Ouvrir le menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).toBeNull();

    await user.click(trigger);
    expect(screen.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Société' })).toHaveAttribute('href', site.nav[2]!.href);
    expect(screen.getByRole('link', { name: 'Rechercher' })).toHaveAttribute('href', site.searchHref);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape and restores body scroll', async () => {
    const user = userEvent.setup();
    render(<MobileMenu {...props} />);
    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });

  it('closes when a navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileMenu {...props} />);
    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
    await user.click(screen.getByRole('link', { name: 'Business' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
