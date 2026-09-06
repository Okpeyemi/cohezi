import { describe, expect, it } from 'vitest';
import { articles } from '@/content/articles';
import { categories, categoryBySlug } from '@/content/categories';
import { site } from '@/content/site';
import { icons } from '@/lib/icons';
import { latest } from '@/lib/articles';

const unique = <T>(values: T[]) => new Set(values).size === values.length;
const count = (slug: string) => articles.filter((a) => a.category === slug).length;

describe('content integrity', () => {
  it('has the expected collection sizes', () => {
    expect(articles).toHaveLength(24);
    expect(count('business')).toBe(6);
    expect(count('societe')).toBe(6);
    expect(count('actualite')).toBe(6);
    expect(count('analyse')).toBe(6);
    expect(categories).toHaveLength(4);
    expect(site.nav).toHaveLength(1);
    // La colonne « Suivre » dérive de site.footer.social : une seule source de vérité.
    expect(site.footer.columns.map((c) => c.links.length)).toEqual([3, 3, site.footer.social.length]);
    const follow = site.footer.columns.at(-1)!;
    expect(follow.links.map((l) => l.href)).toEqual(site.footer.social.map((s) => s.href));
    expect(site.footer.social).toHaveLength(4);
  });

  it('uses unique slugs and valid ISO dates', () => {
    expect(unique(articles.map((a) => a.slug))).toBe(true);
    expect(unique(categories.map((c) => c.slug))).toBe(true);
    for (const article of articles) {
      expect(article.publishedAt, article.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(article.publishedAt)), article.slug).toBe(false);
      expect(article.readingMinutes).toBeGreaterThan(0);
      expect(article.excerpt.length, article.slug).toBeGreaterThan(40);
    }
  });

  it('gives every article between one and four verifiable sources', () => {
    for (const article of articles) {
      expect(article.sources.length, article.slug).toBeGreaterThanOrEqual(1);
      expect(article.sources.length, article.slug).toBeLessThanOrEqual(4);
      for (const source of article.sources) {
        expect(source.url, `${article.slug} / ${source.outlet}`).toMatch(/^https:\/\/\S+$/);
        expect(source.outlet.length, article.slug).toBeGreaterThan(0);
        expect(source.title.length, article.slug).toBeGreaterThan(0);
        if (source.publishedAt !== undefined) {
          expect(source.publishedAt, `${article.slug} / ${source.url}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        }
      }
    }
  });

  it('never cites a source published after the article', () => {
    for (const article of articles) {
      for (const source of article.sources) {
        if (source.publishedAt === undefined) continue;
        expect(source.publishedAt <= article.publishedAt, `${article.slug} / ${source.url}`).toBe(true);
      }
    }
  });

  it('carries no leftover placeholder source', () => {
    const urls = articles.flatMap((article) => article.sources.map((source) => source.url));
    expect(urls.some((url) => url.includes('cohezi.example'))).toBe(false);
  });

  it('keeps slugs URL-safe', () => {
    for (const article of articles) {
      expect(article.slug, article.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it('flags exactly one featured article and one deep dive', () => {
    expect(articles.filter((a) => a.featured)).toHaveLength(1);
    expect(articles.filter((a) => a.deepDive)).toHaveLength(1);
    expect(articles.find((a) => a.deepDive)?.category).toBe('analyse');
  });

  it('only references known categories and resolves category metadata', () => {
    for (const article of articles) expect(categoryBySlug[article.category], article.slug).toBeDefined();
    expect(categoryBySlug.analyse.href).toBe('/analyses');
  });

  it('puts the featured article first in the front page and covers every category', () => {
    const front = latest(articles);
    expect(front).toHaveLength(5);
    expect(front[0]?.featured).toBe(true);
    // La une suit la date de publication, elle ne garantit pas un quota par rubrique.
    // Le seuil de trois protège seulement contre une page d'accueil monochrome.
    expect(new Set(front.map((a) => a.category)).size).toBeGreaterThanOrEqual(3);
  });

  it('resolves every icon name used by the site config', () => {
    for (const social of site.footer.social) {
      expect(icons[social.icon], social.label).toBeDefined();
      expect(social.href, social.label).toMatch(/^https:\/\/\S+$/);
    }
    // « recherche » a quitté la liste : il redirige désormais vers /articles.
    expect(site.comingSoon.map((page) => page.slug)).toEqual(['a-propos', 'contact']);
    expect(site.comingSoon.every((page) => page.slug.length > 0 && page.label.length > 0)).toBe(true);
    expect(site.headerCta.href).toBe('#newsletter');
  });
});

describe('category metadata', () => {
  it('gives every category an eyebrow and a description', () => {
    for (const category of categories) {
      expect(category.eyebrow, category.slug).toMatch(/^Cohezi \/ /);
      expect(category.description.length, category.slug).toBeGreaterThan(40);
      expect(category.description.endsWith('.'), category.slug).toBe(true);
    }
  });

  it('keeps a plural section title distinct from the singular badge label', () => {
    expect(categoryBySlug.analyse.title).toBe('Analyses');
    expect(categoryBySlug.analyse.label).toBe('Analyse');
    for (const category of categories) expect(category.title.length).toBeGreaterThan(0);
  });

  it('reuses the home page wording for Business and Société', () => {
    expect(categoryBySlug.business.description).toBe(site.sections.business.subtitle);
    expect(categoryBySlug.societe.description).toBe(site.sections.societe.subtitle);
  });
});

describe('articles page copy', () => {
  it('carries every string the articles page needs', () => {
    for (const key of [
      'eyebrow',
      'title',
      'description',
      'searchLabel',
      'searchPlaceholder',
      'allLabel',
      'emptyTitle',
      'emptyAction',
    ] as const) {
      expect(site.articles[key].length, key).toBeGreaterThan(0);
    }
    expect(site.articles.title).toBe('Articles');
  });

  it('points the navigation at the filtered articles page', () => {
    // Une entrée unique : le filtrage par rubrique vit dans les onglets de /articles.
    expect(site.nav).toEqual([{ label: 'Articles', href: '/articles' }]);
    expect(site.searchHref).toBe('/articles');
    expect(site.sections.latest.viewAllHref).toBe('/articles?categorie=actualite');
    expect(site.sections.business.viewAllHref).toBe('/articles?categorie=business');
    expect(site.sections.societe.viewAllHref).toBe('/articles?categorie=societe');
  });
});

describe('article page copy', () => {
  it('carries the breadcrumb and related-articles labels', () => {
    expect(site.article.homeLabel).toBe('Accueil');
    expect(site.article.relatedTitle.length).toBeGreaterThan(0);
  });
});
