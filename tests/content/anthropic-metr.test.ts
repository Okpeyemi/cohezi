import { describe, expect, it } from 'vitest';
import { articles, articleWordCount } from '@/content/articles';

describe('Anthropic / METR editorial release', () => {
  const article = articles.find((item) => item.slug === 'anthropic-metr-evaluateurs-acces-interne')!;
  it('keeps the chosen context format and calculates reading time from final text', () => {
    expect(article.category).toBe('societe');
    expect(article.perspective.format).toBe('contexte');
    const count = articleWordCount(article, article.perspective);
    expect(count).toBeGreaterThanOrEqual(700);
    expect(count).toBeLessThanOrEqual(1000);
    expect(article.readingMinutes).toBe(Math.ceil(count / 200));
  });
  it('retains both the laboratory announcement and the evaluator’s limitations', () => {
    expect(article.sources).toHaveLength(4);
    expect(article.sources.some((source) => source.outlet === 'METR')).toBe(true);
    expect(article.sources.some((source) => source.outlet === 'Anthropic')).toBe(true);
    expect(article.image.src).toBe('/images/articles/anthropic-metr-evaluateurs-acces-interne.webp');
    expect(article.image.alt).toContain('Illustration générée par IA');
  });
});
