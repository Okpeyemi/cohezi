import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { categories } from '@/content/categories';
import { site } from '@/content/site';
import { isKnownSection } from '@/lib/routes';

type ComingSoonPageProps = { params: Promise<{ slug: string[] }> };

/** Libellé affiché : celui de la page annoncée, ou celui de la rubrique parente. */
function labelFor(segment: string | undefined) {
  const announced = site.comingSoon.find((page) => page.slug === segment);
  if (announced) return announced.label;
  const category = categories.find((item) => item.href.replace('/', '') === segment);
  return category?.label;
}

export function generateStaticParams() {
  return site.comingSoon.map((page) => ({ slug: [page.slug] }));
}

export async function generateMetadata({ params }: ComingSoonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const label = labelFor(slug[0]);
  return { title: label ? `${label} — Bientôt disponible` : 'Bientôt disponible' };
}

export default async function ComingSoonPage({ params }: ComingSoonPageProps) {
  const { slug } = await params;
  const segment = slug[0];
  if (!isKnownSection(segment)) notFound();
  const label = labelFor(segment) ?? '';

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
          {slug.join(' / ')}
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
