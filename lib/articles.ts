import type { Article } from '@/content/types';

export function pickFeatured(articles: readonly Article[]): {
  featured: Article | undefined;
  rest: Article[];
} {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  return { featured, rest: articles.filter((article) => article !== featured) };
}
