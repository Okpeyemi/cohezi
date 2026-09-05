import { categories } from '@/content/categories';
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

/** Retrouve un article par segment d'URL de rubrique (`business`, `analyses`) et slug. */
export function findArticle(
  articles: readonly Article[],
  categorySegment: string,
  slug: string,
): Article | undefined {
  const category = categories.find((item) => item.href.replace('/', '') === categorySegment);
  if (!category) return undefined;
  return articles.find((article) => article.category === category.slug && article.slug === slug);
}

/**
 * Jusqu'à `count` articles à lire ensuite : ceux de la même rubrique d'abord, les plus récents,
 * complétés au besoin par les plus récents des autres rubriques. L'article courant est exclu.
 */
export function relatedArticles(
  articles: readonly Article[],
  current: Article,
  count = 3,
): Article[] {
  const others = sortByDate(articles).filter((article) => article.slug !== current.slug);
  const sameCategory = others.filter((article) => article.category === current.category);
  const rest = others.filter((article) => article.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}
