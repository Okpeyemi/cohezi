import { categories } from '@/content/categories';
import { site } from '@/content/site';

/**
 * Premiers segments d'URL que le site sert : les rubriques, qui ont leur propre page,
 * et les pages annoncées, servies par la route attrape-tout.
 */
const KNOWN_SECTIONS = new Set<string>([
  ...categories.map((category) => category.href.replace('/', '')),
  ...site.comingSoon.map((page) => page.slug),
]);

export function isKnownSection(segment: string | undefined): boolean {
  return segment !== undefined && KNOWN_SECTIONS.has(segment);
}
