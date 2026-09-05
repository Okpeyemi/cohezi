import Link from 'next/link';
import { ButtonLink } from '@/components/ui/button';
import { CoheziLogo } from '@/components/ui/cohezi-logo';
import { Icon } from '@/components/ui/icon';
import type { NavItem } from '@/content/types';
import { MobileMenu } from './mobile-menu';

type SiteHeaderProps = {
  name: string;
  nav: NavItem[];
  cta: NavItem;
  searchHref: string;
  searchLabel: string;
};

export function SiteHeader({ name, nav, cta, searchHref, searchLabel }: SiteHeaderProps) {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-transparent bg-ink transition-colors duration-300">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 lg:px-24">
        <Link
          href="/"
          aria-label={`${name}, accueil`}
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <CoheziLogo tone="dark" />
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-link relative py-1 text-base font-medium text-paper/90 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-paper hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={searchHref}
            aria-label={searchLabel}
            className="site-nav-link flex h-10 w-10 items-center justify-center rounded-lg text-paper/90 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Icon name="search" size={18} />
          </Link>
          <ButtonLink href={cta.href} variant="paper" size="sm" className="border border-line">
            {cta.label}
            <Icon name="arrow-right" size={16} />
          </ButtonLink>
        </div>
        <MobileMenu nav={nav} cta={cta} searchHref={searchHref} searchLabel={searchLabel} />
      </div>
    </header>
  );
}
