import { ArticleCard } from '@/components/cards/article-card';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Article, SectionCopy } from '@/content/types';

type ArticleGridSectionProps = { id: string; copy: SectionCopy; articles: Article[] };

/**
 * Grille éditoriale partagée par Business et Société : même gabarit que les grilles du clone
 * (4 colonnes desktop, 3 cartes visibles sous md), sans filtre.
 */
export function ArticleGridSection({ id, copy, articles }: ArticleGridSectionProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="px-5 py-16 md:py-20">
      <SectionHeading id={`${id}-title`} title={copy.title} subtitle={copy.subtitle} />
      <ul className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4 [&>li:nth-child(n+4)]:hidden md:[&>li:nth-child(n+4)]:block">
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} variant="grid" />
          </li>
        ))}
      </ul>
      <div className="mt-12 flex justify-center">
        <ButtonLink href={copy.viewAllHref} variant="outline" size="sm">
          {copy.viewAllLabel}
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
      </div>
    </section>
  );
}
