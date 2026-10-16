import { describe, expect, it } from 'vitest';
import { articles, articleWordCount } from '@/content/articles';

describe('Beam open weights editorial release', () => {
  const article = articles.find((item) => item.slug === 'beam-poids-ouverts-hebergement-cout')!;
  const body = article.body.map((block) => 'text' in block ? block.text : block.items.join(' ')).join(' ');

  it('keeps the essential format and calculates reading time from final text', () => {
    expect(article.category).toBe('actualite');
    expect(article.perspective.format).toBe('essentiel');
    const count = articleWordCount(article, article.perspective);
    expect(count).toBeGreaterThanOrEqual(450);
    expect(count).toBeLessThanOrEqual(650);
    expect(article.readingMinutes).toBe(Math.ceil(count / 200));
  });

  it('distinguishes the release, infrastructure costs and vendor results', () => {
    expect(article.sources).toHaveLength(4);
    expect(article.sources.some((source) => source.url.endsWith('/beam-is-available'))).toBe(true);
    expect(article.sources.some((source) => source.url.endsWith('/introducing-beam'))).toBe(true);
    expect(body).toContain('5 octobre');
    expect(body).toContain('280 gigaoctets');
    expect(body).toContain('affirmation du fournisseur');
    expect(body).toContain('Nous n’avons pas exécuté Beam');
    expect(article.image.src).toBe('/images/articles/beam-poids-ouverts-hebergement-cout.webp');
    expect(article.image.alt).toContain('Illustration générée par IA');
  });
});
