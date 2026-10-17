import { describe, expect, it } from 'vitest';
import { articles, articleWordCount } from '@/content/articles';

describe('China AI export registration editorial release', () => {
  const article = articles.find((item) => item.slug === 'chine-exportations-ia-enregistrement-api')!;
  const text = article.body.map((block) => 'text' in block ? block.text : block.items.join(' ')).join(' ');

  it('uses the context format, structured perspectives and a final-text reading time', () => {
    expect(article.category).toBe('business');
    expect(article.perspective.format).toBe('contexte');
    const words = articleWordCount(article, article.perspective);
    expect(words).toBeGreaterThanOrEqual(700);
    expect(words).toBeLessThanOrEqual(1000);
    expect(article.readingMinutes).toBe(Math.ceil(words / 200));
    expect(article.perspective.whyItMatters.length).toBeGreaterThan(0);
    expect(article.perspective.whatChanges.length).toBeGreaterThan(0);
    expect(article.perspective.watch.length).toBeGreaterThan(0);
  });

  it('keeps the notice and explanation distinct from context and interpretations', () => {
    expect(article.sources).toHaveLength(3);
    expect(article.sources.filter((source) => new URL(source.url).hostname === 'www.mofcom.gov.cn')).toHaveLength(2);
    expect(article.sources.some((source) => source.outlet === 'Reuters')).toBe(true);
    expect(text).toContain('jusqu’au 15 novembre');
    expect(text).toContain('Une partie de l’annonce s’applique déjà');
    expect(text).toContain('ne relèveraient pas');
    expect(text).toContain('scénario fictif');
    expect(text).toContain('pas des retards constatés');
    expect(article.image.src).toBe('/images/articles/chine-exportations-ia-enregistrement-api.webp');
    expect(article.image.alt).toContain('Illustration générée par IA');
  });
});
