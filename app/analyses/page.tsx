import type { Metadata } from 'next';
import { CategoryPage } from '@/components/sections/category-page';
import { categoryBySlug } from '@/content/categories';

// Le segment d'URL est « analyses » ; le slug de catégorie est « analyse ».
const category = categoryBySlug.analyse;

export const metadata: Metadata = {
  title: `${category.title} — Cohezi`,
  description: category.description,
};

export default function Page() {
  return <CategoryPage slug="analyse" />;
}
