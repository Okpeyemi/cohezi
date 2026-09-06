import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Inscription confirmée — Cohezi',
  description: 'Votre inscription à la newsletter de Cohezi est confirmée.',
  // Page d'atterrissage privée : rien à indexer.
  robots: { index: false, follow: false },
};

/** Atterrissage après le clic de confirmation. Brevo redirige ici une fois le contact ajouté. */
export default function Page() {
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
        <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          <span aria-hidden className="h-2 w-2 bg-accent" />
          Inscription confirmée
        </p>
        <h1 className="mt-4 max-w-[16ch] font-display text-4xl font-bold uppercase tracking-[-0.01em] md:text-6xl">
          C’est noté, à très vite.
        </h1>
        <p className="mt-5 max-w-[46ch] text-lg text-paper/80">
          Vous recevrez la newsletter de Cohezi trois fois par semaine. Chaque envoi contient un lien de
          désinscription : un clic suffit à en sortir, sans avoir à écrire à qui que ce soit.
        </p>
        <ButtonLink href="/articles" variant="paper" size="sm" className="mt-8">
          Lire les articles
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
