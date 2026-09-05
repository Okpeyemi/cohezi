import { ArticleCard } from '@/components/cards/article-card';
import type { Article } from '@/content/types';

type RelatedArticlesProps = { articles: Article[]; title: string };

export function RelatedArticles({ articles, title }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="related-title" className="mx-auto mt-16 max-w-6xl border-t border-line pt-16">
      <h2
        id="related-title"
        className="text-center font-display text-2xl font-bold uppercase tracking-[-0.01em] text-ink"
      >
        {title}
      </h2>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} variant="grid" />
          </li>
        ))}
      </ul>
    </section>
  );
}
