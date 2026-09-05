import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { NavItem } from '@/content/types';
import { MobileMenu } from './mobile-menu';

type SiteHeaderProps = { name: string; nav: NavItem[]; cta: NavItem };

export function SiteHeader({ name, nav, cta }: SiteHeaderProps) {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-transparent bg-ink transition-colors duration-300">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 lg:px-24">
        <Link href="/" aria-label={`${name} homepage`} className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <BrandLogo name={name} tone="dark" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="site-nav-link text-base font-medium text-paper/90 transition-colors hover:text-paper">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <ButtonLink href={cta.href} variant="paper" size="sm" className="border border-line">
            {cta.label}
            <Icon name="arrow-right" size={16} />
          </ButtonLink>
        </div>
        <MobileMenu nav={nav} cta={cta} />
      </div>
    </header>
  );
}
