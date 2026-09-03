import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';
import { Icon } from '@/components/ui/icon';
import { NewsletterForm } from '@/components/ui/newsletter-form';
import type { SiteConfig } from '@/content/types';

export function SiteFooter({ site }: { site: SiteConfig }) {
  return (
    <footer className="bg-paper px-2 pb-2 pt-16 md:px-5">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={`${site.name} homepage`} className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <BrandLogo name={site.name} tone="light" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-6 text-neutral-700">{site.footer.description}</p>
            <NewsletterForm
              variant="footer"
              placeholder={site.hero.emailPlaceholder}
              buttonLabel={site.hero.subscribeLabel}
              className="mt-6"
            />
          </div>
          {site.footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-base font-bold text-ink">{column.heading}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">{site.footer.copyright}</p>
          <ul aria-label="Social links" className="flex items-center gap-3">
            {site.footer.social.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-neutral-100"
                >
                  <Icon name={social.icon} size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
