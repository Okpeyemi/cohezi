import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleHeader } from '@/components/article/article-header';
import { articles } from '@/content/articles';
import { formatDateFr } from '@/lib/format-date';

const article = articles.find((item) => item.category === 'business')!;

describe('ArticleHeader', () => {
  it('renders the breadcrumb, the badge, the title, the excerpt and the meta line', () => {
    render(<ArticleHeader article={article} homeLabel="Accueil" />);

    const breadcrumb = within(screen.getByRole('navigation', { name: 'Fil d’Ariane' }));
    expect(breadcrumb.getByRole('link', { name: 'Accueil' })).toHaveAttribute('href', '/');
    expect(breadcrumb.getByRole('link', { name: 'Business' })).toHaveAttribute(
      'href',
      '/articles?categorie=business',
    );

    const heading = screen.getByRole('heading', { level: 1, name: article.title });
    expect(heading.className).toContain('font-display');
    expect(screen.getByText(article.excerpt)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${article.readingMinutes} min de lecture`))).toBeInTheDocument();
  });

  it('shows the latest editorial update without replacing the publication date', () => {
    const updatedArticle = articles.find((item) => item.updatedAt !== undefined)!;

    render(<ArticleHeader article={updatedArticle} homeLabel="Accueil" />);

    expect(screen.getByText(new RegExp(`Mis à jour le ${formatDateFr(updatedArticle.updatedAt!)}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(formatDateFr(updatedArticle.publishedAt)))).toBeInTheDocument();
  });
});
