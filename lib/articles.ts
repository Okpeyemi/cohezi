import type { Article, CategorySlug } from '@/content/types';

export function sortByDate(articles: readonly Article[]): Article[] {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Sélection « À la une » : l'article `featured` en tête, puis les plus récents. */
export function latest(articles: readonly Article[], count = 5): Article[] {
  const sorted = sortByDate(articles);
  const featured = sorted.find((article) => article.featured);
  const rest = sorted.filter((article) => article !== featured);
  return (featured ? [featured, ...rest] : rest).slice(0, count);
}

export function byCategory(articles: readonly Article[], slug: CategorySlug, count = 8): Article[] {
  return sortByDate(articles)
    .filter((article) => article.category === slug)
    .slice(0, count);
}

export function deepDive(articles: readonly Article[]): Article | undefined {
  return articles.find((article) => article.deepDive);
}

export function pickFeatured(articles: readonly Article[]): {
  featured: Article | undefined;
  rest: Article[];
} {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  return { featured, rest: articles.filter((article) => article !== featured) };
}
