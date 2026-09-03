import Link from 'next/link';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import type { Article, ArticleTag } from '@/content/types';
import { cn } from '@/lib/cn';

export const TAG_LABELS: Record<ArticleTag, string> = { ai: 'AI', tech: 'Tech', robotics: 'Robotics' };

type ArticleCardProps = { article: Article; variant: 'featured' | 'compact' };

export function ArticleCard({ article, variant }: ArticleCardProps) {
  const featured = variant === 'featured';
  return (
    <article className={cn('group', featured ? 'article-card-featured' : 'article-card-compact')}>
      <Link
        href={`/articles/${article.slug}`}
        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <div className={cn('relative overflow-hidden rounded-lg', featured ? 'aspect-video' : 'aspect-video lg:aspect-[16/10]')}>
          <PlaceholderImage image={article.image} label={article.title} priority={featured} />
          <span className="absolute left-4 top-4 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-ink shadow-sm">
            {TAG_LABELS[article.tag]}
          </span>
        </div>
        <h3
          className={cn(
            'mt-4 font-bold text-ink group-hover:underline',
            featured ? 'text-xl leading-tight lg:text-[30px] lg:leading-[1.25]' : 'text-lg leading-6',
          )}
        >
          {article.title}
        </h3>
        {featured && article.subtitle ? <p className="mt-2 text-base text-neutral-500">{article.subtitle}</p> : null}
        <p className="mt-2 text-xs text-muted">
          {article.author} • {article.readingMinutes} minutes
        </p>
      </Link>
    </article>
  );
}
