import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Guides } from '@/components/sections/guides';
import { Hero } from '@/components/sections/hero';
import { LatestArticles } from '@/components/sections/latest-articles';
import { Podcast } from '@/components/sections/podcast';
import { TrendingTools } from '@/components/sections/trending-tools';
import { UniversityCta } from '@/components/sections/university-cta';
import { articles } from '@/content/articles';
import { guideCategories, toolCategories } from '@/content/categories';
import { guides } from '@/content/guides';
import { podcast } from '@/content/podcast';
import { site } from '@/content/site';
import { tools } from '@/content/tools';
import { university } from '@/content/university';

export default function HomePage() {
  return (
    <>
      <SiteHeader name={site.name} nav={site.nav} cta={site.headerCta} />
      <main className="flex-1 bg-ink">
        <Hero hero={site.hero} />
        <div className="px-2 md:px-5">
          <div className="mx-auto rounded-sheet bg-paper">
            <LatestArticles copy={site.sections.articles} articles={articles} />
            <Guides copy={site.sections.guides} guides={guides} categories={guideCategories} />
            <TrendingTools copy={site.sections.tools} tools={tools} categories={toolCategories} />
            <Podcast podcast={podcast} />
          </div>
        </div>
        <UniversityCta university={university} />
      </main>
      <SiteFooter site={site} />
    </>
  );
}
