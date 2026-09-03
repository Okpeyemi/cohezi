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
  it('opens the panel, locks body scroll and reflects the state in aria-expanded', async () => {
    const user = userEvent.setup();
    render(<MobileMenu nav={site.nav} cta={site.headerCta} />);
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).toBeNull();

    await user.click(trigger);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/guides');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape and restores body scroll', async () => {
    const user = userEvent.setup();
    render(<MobileMenu nav={site.nav} cta={site.headerCta} />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });

  it('closes when a navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileMenu nav={site.nav} cta={site.headerCta} />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('link', { name: 'Articles' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
