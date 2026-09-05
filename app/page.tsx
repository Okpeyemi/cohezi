import { HeroLightSwitch } from '@/components/layout/hero-light-switch';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ArticleGridSection } from '@/components/sections/article-grid-section';
import { DeepDive } from '@/components/sections/deep-dive';
import { Hero } from '@/components/sections/hero';
import { LatestArticles } from '@/components/sections/latest-articles';
import { NewsletterCta } from '@/components/sections/newsletter-cta';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { byCategory, deepDive, latest } from '@/lib/articles';

export default function HomePage() {
  const front = latest(articles);
  const business = byCategory(articles, 'business');
  const societe = byCategory(articles, 'societe');
  const analysis = deepDive(articles);

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
          <Hero hero={site.hero} />
          <div className="px-2 md:px-5">
            <div className="mx-auto rounded-sheet bg-paper">
              <LatestArticles copy={site.sections.latest} articles={front} />
              <ArticleGridSection id="business" copy={site.sections.business} articles={business} />
              <ArticleGridSection id="societe" copy={site.sections.societe} articles={societe} />
              {analysis ? <DeepDive copy={site.deepDive} article={analysis} /> : null}
            </div>
          </div>
          <NewsletterCta copy={site.newsletter} />
        </div>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
