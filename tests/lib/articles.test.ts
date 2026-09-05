import { describe, expect, it } from 'vitest';
import type { Article } from '@/content/types';
import { byCategory, deepDive, latest, pickFeatured, sortByDate } from '@/lib/articles';

const make = (slug: string, publishedAt: string, extra: Partial<Article> = {}): Article => ({
  slug,
  title: slug,
  excerpt: 'Un extrait suffisamment long pour ressembler à un vrai chapô d’article.',
  category: 'actualite',
  publishedAt,
  readingMinutes: 5,
  image: { alt: slug },
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
