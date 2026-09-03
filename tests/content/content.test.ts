import { describe, expect, it } from 'vitest';
import { articles } from '@/content/articles';
import { guideCategories, toolCategories } from '@/content/categories';
import { guides } from '@/content/guides';
import { podcast } from '@/content/podcast';
import { site } from '@/content/site';
import { tools } from '@/content/tools';
import { university } from '@/content/university';
import { icons } from '@/lib/icons';

const unique = <T>(values: T[]) => new Set(values).size === values.length;

describe('content integrity', () => {
  it('has the expected collection sizes', () => {
    expect(articles).toHaveLength(5);
    expect(guides).toHaveLength(8);
    expect(tools).toHaveLength(12);
    expect(guideCategories).toHaveLength(17);
    expect(toolCategories).toHaveLength(20);
    expect(university.features).toHaveLength(4);
    expect(site.nav).toHaveLength(7);
    expect(site.footer.columns.map((c) => c.links.length)).toEqual([3, 2, 5]);
  });

  it('uses unique slugs everywhere', () => {
    expect(unique(articles.map((a) => a.slug))).toBe(true);
    expect(unique(guides.map((g) => g.slug))).toBe(true);
    expect(unique(tools.map((t) => t.slug))).toBe(true);
    expect(unique(guideCategories.map((c) => c.slug))).toBe(true);
    expect(unique(toolCategories.map((c) => c.slug))).toBe(true);
  });

  it('flags exactly one featured article', () => {
    expect(articles.filter((a) => a.featured)).toHaveLength(1);
  });

  it('only references existing categories', () => {
    const guideSlugs = new Set(guideCategories.map((c) => c.slug));
    const toolSlugs = new Set(toolCategories.map((c) => c.slug));
    for (const guide of guides) {
      expect(guide.categories.length).toBeGreaterThan(0);
      for (const slug of guide.categories) expect(guideSlugs.has(slug), `${guide.slug} → ${slug}`).toBe(true);
    }
    for (const tool of tools) {
      expect(tool.categories.length).toBeGreaterThan(0);
      for (const slug of tool.categories) expect(toolSlugs.has(slug), `${tool.slug} → ${slug}`).toBe(true);
    }
  });

  it('resolves every icon name to an icon', () => {
    const names = [
      ...guideCategories.map((c) => c.icon),
      ...toolCategories.map((c) => c.icon),
      ...tools.map((t) => t.badgeIcon),
      ...university.features.map((f) => f.icon),
      ...site.footer.social.map((s) => s.icon),
      ...podcast.listenLinks.map((l) => l.icon),
    ];
    for (const name of names) expect(icons[name], name).toBeDefined();
  });

  it('keeps every trusted-by company and coming-soon slug non-empty', () => {
    expect(site.hero.trustedBy).toHaveLength(7);
    expect(site.comingSoonSlugs.every((s) => s.length > 0)).toBe(true);
  });
});
