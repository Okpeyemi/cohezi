'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { NavItem } from '@/content/types';

type MobileMenuProps = { nav: NavItem[]; cta: NavItem; searchHref: string; searchLabel: string };

export function MobileMenu({ nav, cta, searchHref, searchLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="menu-trigger flex h-10 w-10 items-center justify-center rounded-lg bg-paper text-ink transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Icon name={open ? 'close' : 'menu'} size={20} />
      </button>
      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[68px] z-40 flex flex-col gap-8 overflow-y-auto bg-ink px-5 py-8"
      >
        <nav aria-label="Navigation mobile" className="flex flex-col gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="font-display text-xl font-semibold uppercase text-paper/90 transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={searchHref}
            aria-label={searchLabel}
            onClick={close}
            className="inline-flex items-center gap-2 text-base font-medium text-paper/80 transition-colors hover:text-paper"
          >
            <Icon name="search" size={18} />
            {searchLabel}
          </Link>
        </nav>
        <ButtonLink href={cta.href} variant="paper" size="sm" className="self-start" onClick={close}>
          {cta.label}
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
      </div>
    </div>
  );
}
