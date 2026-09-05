import type { Article } from '@/content/types';

/** Nombre d'articles par page sur `/articles`. */
export const ARTICLES_PER_PAGE = 9;

/** Minuscules, accents retirés, espaces réduits : base de comparaison de la recherche. */
export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/** Articles dont le titre ou l'extrait contient la requête. Requête vide : tout est renvoyé. */
export function searchArticles(articles: readonly Article[], query: string): Article[] {
  const needle = normalize(query);
  if (needle.length === 0) return [...articles];
  return articles.filter(
    (article) => normalize(article.title).includes(needle) || normalize(article.excerpt).includes(needle),
  );
}

export type Page<T> = { items: T[]; page: number; pageCount: number; total: number };

/**
 * Découpe en pages de `perPage`. `page` est ramené dans [1, pageCount].
 * Une liste vide donne `pageCount` 1 et `items` vide.
 */
export function paginate<T>(items: readonly T[], page: number, perPage: number): Page<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(Math.trunc(page) || 1, 1), pageCount);
  const start = (current - 1) * perPage;
  return { items: items.slice(start, start + perPage), page: current, pageCount, total };
}
