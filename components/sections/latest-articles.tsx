'use client';

import { ArticleCard } from '@/components/cards/article-card';
import { ButtonLink } from '@/components/ui/button';
import { FilterableGrid } from '@/components/ui/filterable-grid';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Article, Category, SectionCopy } from '@/content/types';
import { pickFeatured } from '@/lib/articles';

export const ARTICLE_TABS: Category[] = [
  { slug: 'ai', label: 'AI', icon: 'all' },
  { slug: 'tech', label: 'Tech', icon: 'all' },
  { slug: 'robotics', label: 'Robotics', icon: 'all' },
];

type LatestArticlesProps = { copy: SectionCopy; articles: Article[] };

export function LatestArticles({ copy, articles }: LatestArticlesProps) {
  return (
    <section aria-labelledby="latest-articles-title" className="px-5 py-16 md:py-20">
      <SectionHeading id="latest-articles-title" title={copy.title} subtitle={copy.subtitle} />
      <FilterableGrid
        items={articles}
        categories={ARTICLE_TABS}
        getCategories={(article) => [article.tag]}
        variant="tabs"
        filterLabel="Filter articles"
        renderItems={(visible) => {
          const { featured, rest } = pickFeatured(visible);
          return (
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
              {featured ? <ArticleCard article={featured} variant="featured" /> : null}
              {rest.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2">
                  {rest.map((article) => (
                    <ArticleCard key={article.slug} article={article} variant="compact" />
                  ))}
                </div>
              ) : null}
            </div>
          );
        }}
      />
      <div className="mt-12 flex justify-center">
        <ButtonLink href={copy.viewAllHref} variant="outline" size="sm">
          {copy.viewAllLabel}
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
      </div>
    </section>
  );
}
