import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ActualitePage, { metadata as actualiteMetadata } from '@/app/actualite/page';
import AnalysesPage, { metadata as analysesMetadata } from '@/app/analyses/page';
import BusinessPage, { metadata as businessMetadata } from '@/app/business/page';
import SocietePage, { metadata as societeMetadata } from '@/app/societe/page';
import { categoryBySlug } from '@/content/categories';

const routes = [
  { name: 'Actualité', Page: ActualitePage, metadata: actualiteMetadata, category: categoryBySlug.actualite },
  { name: 'Business', Page: BusinessPage, metadata: businessMetadata, category: categoryBySlug.business },
  { name: 'Société', Page: SocietePage, metadata: societeMetadata, category: categoryBySlug.societe },
  { name: 'Analyse', Page: AnalysesPage, metadata: analysesMetadata, category: categoryBySlug.analyse },
];

describe('category routes', () => {
  for (const route of routes) {
    it(`renders and describes the ${route.name} page`, () => {
      expect(route.metadata.title).toBe(`${route.category.title} — Cohezi`);
      expect(route.metadata.description).toBe(route.category.description);
      render(<route.Page />);
      expect(screen.getByRole('heading', { level: 1, name: route.category.title })).toBeInTheDocument();
      const tabs = within(screen.getByRole('navigation', { name: 'Catégories' }));
      expect(tabs.getByRole('link', { name: route.category.title })).toHaveAttribute('aria-current', 'page');
    });
  }
});
