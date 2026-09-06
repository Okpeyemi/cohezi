import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/article/article-body';
import { ArticleHeader } from '@/components/article/article-header';
import { ArticleSources } from '@/components/article/article-sources';
import { RelatedArticles } from '@/components/article/related-articles';
import { HeroLightSwitch } from '@/components/layout/hero-light-switch';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { NewsletterCta } from '@/components/sections/newsletter-cta';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { articles } from '@/content/articles';
import { categoryBySlug } from '@/content/categories';
import { site } from '@/content/site';
import { findArticle, relatedArticles } from '@/lib/articles';

type ArticlePageProps = { params: Promise<{ categorie: string; slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({
    categorie: categoryBySlug[article.category].href.replace('/', ''),
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { categorie, slug } = await params;
  const article = findArticle(articles, categorie, slug);
  if (!article) return { title: 'Article introuvable — Cohezi' };
  return { title: `${article.title} — Cohezi`, description: article.excerpt };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { categorie, slug } = await params;
  const article = findArticle(articles, categorie, slug);
  if (!article) notFound();

  const related = relatedArticles(articles, article);

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
          <ArticleHeader article={article} homeLabel={site.article.homeLabel} />
          <div className="px-2 md:px-5">
            <div className="mx-auto rounded-sheet bg-paper px-5 py-16 md:py-20">
              {/* La suite de lecture est voisine de l'article, pas une partie de son corps. */}
              <article>
                <div className="relative mx-auto mb-12 aspect-video max-w-[1080px] overflow-hidden rounded-xl md:mb-16">
                  <PlaceholderImage
                    image={article.image}
                    label={article.title}
                    sizes="(min-width: 1120px) 1080px, calc(100vw - 40px)"
                  />
                </div>
                <ArticleBody blocks={article.body} />
                <div className="mx-auto max-w-[680px]">
                  <ArticleSources sources={article.sources} />
                </div>
              </article>
              <RelatedArticles articles={related} title={site.article.relatedTitle} />
            </div>
          </div>
          <NewsletterCta copy={site.newsletter} />
        </div>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
