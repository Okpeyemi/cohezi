import type { Metadata } from 'next';
import { CategoryPage } from '@/components/sections/category-page';
import { categoryBySlug } from '@/content/categories';

const category = categoryBySlug.societe;

export const metadata: Metadata = {
  title: `${category.label} — Cohezi`,
  description: category.description,
};

export default function Page() {
  return <CategoryPage slug="societe" />;
}
