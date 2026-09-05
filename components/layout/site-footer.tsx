import Link from 'next/link';
import { CoheziLogo } from '@/components/ui/cohezi-logo';
import { Icon } from '@/components/ui/icon';
import { NewsletterForm } from '@/components/ui/newsletter-form';
import type { SiteConfig } from '@/content/types';

export function SiteFooter({ site }: { site: SiteConfig }) {
  return (
    <footer className="bg-paper px-2 pb-2 pt-16 md:px-5">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label={`${site.name}, accueil`}
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <CoheziLogo tone="light" size="footer" />
            </Link>
            <p className="mt-6 max-w-sm font-display text-lg font-medium leading-7 text-ink">
              {site.footer.tagline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <NewsletterForm
              variant="footer"
              placeholder={site.newsletter.emailPlaceholder}
              buttonLabel={site.hero.subscribeLabel}
              className="mt-6"
            />
          </div>
          {site.footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink">{column.heading}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink/70 transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink/60">{site.footer.copyright}</p>
          <ul aria-label="Réseaux sociaux" className="flex items-center gap-3">
            {site.footer.social.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-line/60"
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
