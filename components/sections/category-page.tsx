import { ArticleCard } from '@/components/cards/article-card';
import { HeroLightSwitch } from '@/components/layout/hero-light-switch';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { CategoryHero } from '@/components/sections/category-hero';
import { NewsletterCta } from '@/components/sections/newsletter-cta';
import { CategoryTabs } from '@/components/ui/category-tabs';
import { articles } from '@/content/articles';
import { categoryBySlug } from '@/content/categories';
import { site } from '@/content/site';
import type { CategorySlug } from '@/content/types';
import { byCategory } from '@/lib/articles';

/** Page d'une rubrique : bandeau, onglets, article mis en avant, grille, newsletter. */
export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const category = categoryBySlug[slug];
  const list = byCategory(articles, slug, articles.length);
  const [featured, ...rest] = list;

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
          <CategoryHero category={category} articleCount={list.length} />
          <div className="px-2 md:px-5">
            <div className="mx-auto rounded-sheet bg-paper px-5 py-16 md:py-20">
              <div className="flex justify-center">
                <CategoryTabs activeSlug={slug} />
              </div>
              {featured ? (
                <div className="mx-auto mt-12 max-w-6xl">
                  <ArticleCard article={featured} variant="featured" />
                </div>
              ) : (
                <p className="mt-12 text-center text-muted">Aucun article pour le moment.</p>
              )}
              {rest.length > 0 ? (
                <ul
                  aria-label="Articles"
                  className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                  {rest.map((article) => (
                    <li key={article.slug}>
                      <ArticleCard article={article} variant="grid" />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <NewsletterCta copy={site.newsletter} />
        </div>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
