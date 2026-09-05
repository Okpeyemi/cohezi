import type { Metadata } from 'next';
import { Suspense } from 'react';
import { HeroLightSwitch } from '@/components/layout/hero-light-switch';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ArticleBrowser } from '@/components/sections/article-browser';
import { NewsletterCta } from '@/components/sections/newsletter-cta';
import { SectionHero } from '@/components/sections/section-hero';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { sortByDate } from '@/lib/articles';

export const metadata: Metadata = {
  title: `${site.articles.title} — Cohezi`,
  description: site.articles.description,
};

export default function Page() {
  const all = sortByDate(articles);

  return (
    <>
      <HeroLightSwitch />
      <SiteHeader
        name={site.name}
        nav={site.nav}
        cta={site.headerCta}
        searchHref={site.searchHref}
        searchLabel={site.searchLabel}
      />
      <main className="flex-1">
        <div className="page-dark bg-ink">
          <SectionHero
            eyebrow={site.articles.eyebrow}
            title={site.articles.title}
            description={site.articles.description}
            articleCount={all.length}
          />
          <div className="px-2 md:px-5">
            <div className="mx-auto rounded-sheet bg-paper px-5 py-16 md:py-20">
              {/* `ArticleBrowser` lit `useSearchParams` : Next exige une frontière Suspense au pré-rendu. */}
              <Suspense fallback={null}>
                <ArticleBrowser articles={all} copy={site.articles} />
              </Suspense>
            </div>
          </div>
          <NewsletterCta copy={site.newsletter} />
        </div>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
