'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { NavItem } from '@/content/types';

type MobileMenuProps = { nav: NavItem[]; cta: NavItem };

export function MobileMenu({ nav, cta }: MobileMenuProps) {
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
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="menu-trigger flex h-10 w-10 items-center justify-center rounded-lg bg-white text-ink transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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
        <nav aria-label="Mobile" className="flex flex-col gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="text-xl font-medium text-white/90 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href={cta.href} variant="white" size="sm" className="self-start" onClick={close}>
          {cta.label}
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
      </div>
    </div>
  );
}
