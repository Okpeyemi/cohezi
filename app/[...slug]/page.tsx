import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { site } from '@/content/site';
import { humanize } from '@/lib/slug';

type ComingSoonPageProps = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return site.comingSoonSlugs.map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: ComingSoonPageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${humanize(slug[0] ?? '')} — Coming soon` };
}

export default async function ComingSoonPage({ params }: ComingSoonPageProps) {
  const { slug } = await params;
  const section = slug[0];
  if (!section || !site.comingSoonSlugs.includes(section)) notFound();

  return (
    <>
      <SiteHeader name={site.name} nav={site.nav} cta={site.headerCta} />
      <main className="flex flex-1 flex-col items-center justify-center bg-ink px-5 py-32 text-center text-white">
        <p className="text-sm uppercase tracking-wide text-white/60">{slug.join(' / ')}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.025em] md:text-6xl">{humanize(section)}</h1>
        <p className="mt-4 text-lg text-white/80">This page is coming soon.</p>
        <ButtonLink href="/" variant="white" size="sm" className="mt-8">
          <Icon name="arrow-right" size={16} className="rotate-180" />
          Back to home
        </ButtonLink>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
