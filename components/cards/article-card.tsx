import Link from 'next/link';
import { CategoryBadge } from '@/components/ui/category-badge';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { categoryBySlug } from '@/content/categories';
import type { Article } from '@/content/types';
import { cn } from '@/lib/cn';
import { formatDateFr } from '@/lib/format-date';
import { CardFrame } from './card-frame';

type ArticleCardProps = { article: Article; variant: 'featured' | 'compact' | 'grid' };

export function articleHref(article: Article): string {
  return `${categoryBySlug[article.category].href}/${article.slug}`;
}

export function ArticleCard({ article, variant }: ArticleCardProps) {
  const category = categoryBySlug[article.category];
  const meta = `${formatDateFr(article.publishedAt)} · ${article.readingMinutes} min de lecture`;
  const href = articleHref(article);

  if (variant === 'grid') {
    return (
      <article className="article-card-grid h-full">
        <CardFrame href={href}>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <PlaceholderImage
              image={article.image}
              label={article.title}
              sizes="(min-width: 1024px) 260px, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="px-1 pb-1">
            <CategoryBadge label={category.label} className="mt-3" />
            <h3 className="mt-2 font-display text-base font-semibold leading-6 text-ink group-hover:underline">
              {article.title}
            </h3>
            <p className="mt-2 text-xs text-ink/60">{meta}</p>
          </div>
        </CardFrame>
      </article>
    );
  }

  const featured = variant === 'featured';
  return (
    <article className={cn('group', featured ? 'article-card-featured' : 'article-card-compact')}>
      <Link
        href={href}
        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <div className={cn('relative overflow-hidden rounded-lg', featured ? 'aspect-video' : 'aspect-video lg:aspect-[16/10]')}>
          <PlaceholderImage image={article.image} label={article.title} priority={featured} />
        </div>
        <CategoryBadge label={category.label} className="mt-4" />
        <h3
          className={cn(
            'mt-2 font-display font-semibold text-ink group-hover:underline',
            featured ? 'text-xl leading-tight lg:text-[30px] lg:leading-[1.2]' : 'text-lg leading-6',
          )}
        >
          {article.title}
        </h3>
        {featured ? <p className="mt-2 text-base leading-6 text-ink/70">{article.excerpt}</p> : null}
        <p className="mt-2 text-xs text-ink/60">{meta}</p>
      </Link>
    </article>
  );
}
