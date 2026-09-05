import { describe, expect, it } from 'vitest';
import type { Article } from '@/content/types';
import { ARTICLES_PER_PAGE, normalize, paginate, searchArticles } from '@/lib/search';

const make = (slug: string, title: string, excerpt: string): Article => ({
  slug,
  title,
  excerpt,
  category: 'actualite',
  publishedAt: '2026-09-01',
  readingMinutes: 5,
  image: { alt: slug },
});

const corpus = [
  make('a', 'OpenAI lance GPT-6', 'Fenêtre de contexte illimitée et agents natifs.'),
  make('b', 'L’AI Act entre en application', 'Transparence des modèles et registre des systèmes.'),
  make('c', 'Élections et deepfakes', 'Étiquetage obligatoire des contenus générés.'),
];

describe('normalize', () => {
  it('lowercases, strips accents and collapses spaces', () => {
    expect(normalize('  Élections   ET  Deepfakes ')).toBe('elections et deepfakes');
    expect(normalize('Fenêtre')).toBe('fenetre');
    expect(normalize('')).toBe('');
  });
});

describe('searchArticles', () => {
  it('returns everything for an empty or whitespace query', () => {
    expect(searchArticles(corpus, '')).toHaveLength(3);
    expect(searchArticles(corpus, '   ')).toHaveLength(3);
  });

  it('matches the title, ignoring case and accents', () => {
    expect(searchArticles(corpus, 'openai').map((a) => a.slug)).toEqual(['a']);
    expect(searchArticles(corpus, 'ELECTIONS').map((a) => a.slug)).toEqual(['c']);
  });

  it('matches the excerpt too', () => {
    expect(searchArticles(corpus, 'registre').map((a) => a.slug)).toEqual(['b']);
    expect(searchArticles(corpus, 'fenetre').map((a) => a.slug)).toEqual(['a']);
  });

  it('returns an empty array when nothing matches', () => {
    expect(searchArticles(corpus, 'quantique')).toEqual([]);
  });

  it('does not mutate the input', () => {
    const before = corpus.map((a) => a.slug);
    searchArticles(corpus, 'openai');
    expect(corpus.map((a) => a.slug)).toEqual(before);
  });
});

describe('paginate', () => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);

  it('cuts the list into pages and reports the totals', () => {
    expect(paginate(items, 1, 4)).toEqual({ items: [1, 2, 3, 4], page: 1, pageCount: 3, total: 10 });
    expect(paginate(items, 3, 4)).toEqual({ items: [9, 10], page: 3, pageCount: 3, total: 10 });
  });

  it('clamps a page below the first one', () => {
    expect(paginate(items, 0, 4).page).toBe(1);
    expect(paginate(items, -5, 4).items).toEqual([1, 2, 3, 4]);
  });

  it('clamps a page beyond the last one', () => {
    expect(paginate(items, 99, 4).page).toBe(3);
    expect(paginate(items, 99, 4).items).toEqual([9, 10]);
  });

  it('handles an empty list', () => {
    expect(paginate([], 1, 4)).toEqual({ items: [], page: 1, pageCount: 1, total: 0 });
  });

  it('exposes the page size used by the articles page', () => {
    expect(ARTICLES_PER_PAGE).toBe(9);
  });
});
