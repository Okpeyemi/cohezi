import { describe, expect, it } from 'vitest';
import type { Article } from '@/content/types';
import { byCategory, deepDive, findArticle, latest, pickFeatured, relatedArticles, sortByDate } from '@/lib/articles';

const make = (slug: string, publishedAt: string, extra: Partial<Article> = {}): Article => ({
  slug,
  title: slug,
  excerpt: 'Un extrait suffisamment long pour ressembler à un vrai chapô d’article.',
  category: 'actualite',
  publishedAt,
  readingMinutes: 5,
  image: { alt: slug },
  body: [{ type: 'paragraph', text: 'Un paragraphe.' }],
  ...extra,
});

const a = make('a', '2026-09-02');
const b = make('b', '2026-09-01', { featured: true, category: 'business' });
const c = make('c', '2026-08-30', { category: 'business' });
const d = make('d', '2026-08-29', { category: 'analyse', deepDive: true });
const e = make('e', '2026-08-28', { category: 'societe' });
const f = make('f', '2026-08-27');
const all = [c, a, e, b, f, d];

describe('sortByDate', () => {
  it('sorts newest first without mutating the input', () => {
    expect(sortByDate(all).map((x) => x.slug)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    expect(all[0]).toBe(c);
  });
});

describe('latest', () => {
  it('puts the featured article first, then the newest, limited to count', () => {
    expect(latest(all).map((x) => x.slug)).toEqual(['b', 'a', 'c', 'd', 'e']);
    expect(latest(all, 3).map((x) => x.slug)).toEqual(['b', 'a', 'c']);
  });

  it('falls back to date order without a featured article', () => {
    expect(latest([a, c, e], 2).map((x) => x.slug)).toEqual(['a', 'c']);
  });
});

describe('byCategory', () => {
  it('filters by category, newest first, limited to count', () => {
    expect(byCategory(all, 'business').map((x) => x.slug)).toEqual(['b', 'c']);
    expect(byCategory(all, 'business', 1).map((x) => x.slug)).toEqual(['b']);
    expect(byCategory(all, 'analyse').map((x) => x.slug)).toEqual(['d']);
  });
});

describe('deepDive', () => {
  it('returns the flagged article or undefined', () => {
    expect(deepDive(all)).toBe(d);
    expect(deepDive([a, b])).toBeUndefined();
  });
});

describe('pickFeatured', () => {
  it('returns the flagged article and the others in order', () => {
    expect(pickFeatured([a, b, c])).toEqual({ featured: b, rest: [a, c] });
  });

  it('falls back to the first article when none is flagged', () => {
    expect(pickFeatured([a, c])).toEqual({ featured: a, rest: [c] });
  });

  it('handles an empty list', () => {
    expect(pickFeatured([])).toEqual({ featured: undefined, rest: [] });
  });
});

describe('findArticle', () => {
  it('finds an article by its URL segment and slug', () => {
    expect(findArticle(all, 'business', 'b')).toBe(b);
    expect(findArticle(all, 'actualite', 'a')).toBe(a);
  });

  it('matches the plural URL segment of the analyse category', () => {
    expect(findArticle(all, 'analyses', 'd')).toBe(d);
    expect(findArticle(all, 'analyse', 'd')).toBeUndefined();
  });

  it('returns undefined for an unknown segment, an unknown slug or a mismatched pair', () => {
    expect(findArticle(all, 'nimportequoi', 'a')).toBeUndefined();
    expect(findArticle(all, 'actualite', 'inconnu')).toBeUndefined();
    expect(findArticle(all, 'business', 'a')).toBeUndefined();
  });
});

describe('relatedArticles', () => {
  it('returns articles of the same category, newest first, excluding the current one', () => {
    const business = [
      make('b1', '2026-09-05', { category: 'business' }),
      make('b2', '2026-09-04', { category: 'business' }),
      make('b3', '2026-09-03', { category: 'business' }),
      make('b4', '2026-09-02', { category: 'business' }),
    ];
    const [current] = business;
    expect(relatedArticles(business, current!).map((x) => x.slug)).toEqual(['b2', 'b3', 'b4']);
  });

  it('tops up with other categories when the category is too small', () => {
    const result = relatedArticles(all, d);
    expect(result).toHaveLength(3);
    expect(result).not.toContain(d);
    expect(result[0]!.category).not.toBe('analyse');
  });

  it('honours the count argument', () => {
    expect(relatedArticles(all, a, 1)).toHaveLength(1);
  });

  it('never returns the current article', () => {
    for (const article of all) {
      expect(relatedArticles(all, article)).not.toContain(article);
    }
  });
});
