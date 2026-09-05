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
    expect(count('business')).toBe(8);
    expect(count('societe')).toBe(8);
    expect(count('actualite')).toBe(5);
    expect(count('analyse')).toBe(3);
    expect(categories).toHaveLength(4);
    expect(site.nav).toHaveLength(4);
    expect(site.footer.columns.map((c) => c.links.length)).toEqual([3, 3, 3]);
    expect(site.footer.social).toHaveLength(3);
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
    expect(new Set(front.map((a) => a.category)).size).toBe(4);
  });

  it('resolves every icon name used by the site config', () => {
    for (const social of site.footer.social) expect(icons[social.icon], social.label).toBeDefined();
    expect(site.comingSoon).toHaveLength(3);
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

  it('reuses the home page wording for Business and Société', () => {
    expect(categoryBySlug.business.description).toBe(site.sections.business.subtitle);
    expect(categoryBySlug.societe.description).toBe(site.sections.societe.subtitle);
  });
});
