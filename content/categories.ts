import type { Category, CategorySlug } from './types';

export const categories: Category[] = [
  {
    slug: 'actualite',
    label: 'Actualité',
    href: '/actualite',
    eyebrow: 'Cohezi / Actualité',
    description: 'Ce qui vient de se passer dans l’IA, et pourquoi cela compte.',
  },
  {
    slug: 'business',
    label: 'Business',
    href: '/business',
    eyebrow: 'Cohezi / Business',
    description: 'Entreprises, financements, marchés et infrastructures de l’IA.',
  },
  {
    slug: 'societe',
    label: 'Société',
    href: '/societe',
    eyebrow: 'Cohezi / Société',
    description: 'Emploi, éducation, santé, culture : ce que l’IA change au quotidien.',
  },
  {
    slug: 'analyse',
    label: 'Analyse',
    href: '/analyses',
    eyebrow: 'Cohezi / Analyses',
    description: 'Décryptages et grilles de lecture pour comprendre les mouvements de fond.',
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category])) as Record<
  CategorySlug,
  Category
>;
