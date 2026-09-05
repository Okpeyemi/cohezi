import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ArticlePage, { generateMetadata, generateStaticParams } from '@/app/[categorie]/[slug]/page';
import { articles } from '@/content/articles';

const article = articles.find((item) => item.category === 'business')!;
const params = { categorie: 'business', slug: article.slug };

describe('ArticlePage', () => {
  it('pre-renders one path per article, using the URL segment of its category', () => {
    const generated = generateStaticParams();
    expect(generated).toHaveLength(articles.length);
    expect(generated).toContainEqual(params);
    const analysis = articles.find((item) => item.category === 'analyse')!;
    expect(generated).toContainEqual({ categorie: 'analyses', slug: analysis.slug });
  });

  it('describes the article in its metadata', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve(params) });
    expect(metadata.title).toBe(`${article.title} — Cohezi`);
    expect(metadata.description).toBe(article.excerpt);
  });

  it('renders the header, the body and the related articles', async () => {
    render(await ArticlePage({ params: Promise.resolve(params) }));

    expect(screen.getByRole('heading', { level: 1, name: article.title })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Fil d’Ariane' })).toBeInTheDocument();
    const firstBlock = article.body[0]!;
    if (firstBlock.type === 'paragraph') expect(screen.getByText(firstBlock.text)).toBeInTheDocument();
    const related = within(screen.getByRole('region', { name: 'À lire ensuite' }));
    expect(related.getByRole('heading', { level: 2, name: 'À lire ensuite' })).toBeInTheDocument();
    expect(related.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
