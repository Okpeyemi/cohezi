import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { site } from '@/content/site';

/** Page annoncée mais pas encore écrite. */
export function ComingSoon({ label }: { label: string }) {
  return (
    <>
      <SiteHeader
        name={site.name}
        nav={site.nav}
        cta={site.headerCta}
        searchHref={site.searchHref}
        searchLabel={site.searchLabel}
      />
      <main className="flex flex-1 flex-col items-center justify-center bg-ink px-5 py-32 text-center text-paper">
        <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
          <span aria-hidden className="h-2 w-2 bg-accent" />
          {label}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-[-0.01em] md:text-6xl">{label}</h1>
        <p className="mt-4 text-lg text-paper/80">Cette page arrive bientôt.</p>
        <ButtonLink href="/" variant="paper" size="sm" className="mt-8">
          <Icon name="arrow-right" size={16} className="rotate-180" />
          Retour à l’accueil
        </ButtonLink>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
