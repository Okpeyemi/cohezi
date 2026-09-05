import type { Category, CategorySlug } from './types';

export const categories: Category[] = [
  { slug: 'actualite', label: 'Actualité', href: '/actualite' },
  { slug: 'business', label: 'Business', href: '/business' },
  { slug: 'societe', label: 'Société', href: '/societe' },
  { slug: 'analyse', label: 'Analyse', href: '/analyses' },
];

export const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category])) as Record<
  CategorySlug,
  Category
>;
