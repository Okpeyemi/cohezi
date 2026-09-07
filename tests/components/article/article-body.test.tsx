import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleBody } from '@/components/article/article-body';
import type { ArticleBlock, ArticlePerspective } from '@/content/types';

const perspective: ArticlePerspective = {
  format: 'contexte',
  whyItMatters: ['La portée du fait.'],
  whatChanges: ['La conséquence concrète.'],
  watch: ['Le prochain signal.'],
};

const blocks: ArticleBlock[] = [
  { type: 'paragraph', text: 'Le fait principal.' },
  { type: 'heading', text: 'Un intertitre' },
  { type: 'quote', text: 'Une déclaration marquante.', author: 'Ada Lovelace, ingénieure' },
  { type: 'list', items: ['Premier point', 'Deuxième point'] },
  { type: 'takeaway', title: 'À retenir', items: ['Un point clé', 'Un autre'] },
];

describe('ArticleBody', () => {
  it('renders each block type in order', () => {
    render(<ArticleBody blocks={blocks} perspective={perspective} />);
    expect(screen.getByText('Le fait principal.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Un intertitre' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Pourquoi c’est important' })).toBeInTheDocument();
    expect(screen.getByText('La conséquence concrète.')).toBeInTheDocument();
    const quote = screen.getByText('Une déclaration marquante.').closest('blockquote');
    expect(quote).not.toBeNull();
    expect(within(quote!).getByText(/Ada Lovelace, ingénieure/)).toBeInTheDocument();
    expect(screen.getByText('Premier point')).toBeInTheDocument();
    expect(screen.getByText('À retenir')).toBeInTheDocument();
    expect(screen.getByText('Un point clé')).toBeInTheDocument();
  });

  it('omits the author line when the quote has none', () => {
    render(<ArticleBody blocks={[{ type: 'quote', text: 'Sans auteur.' }]} perspective={perspective} />);
    const quote = screen.getByText('Sans auteur.').closest('blockquote');
    expect(quote!.textContent).toBe('Sans auteur.');
  });

  it('gives the first block no top margin', () => {
    const { container } = render(<ArticleBody blocks={blocks} perspective={perspective} />);
    const first = container.querySelector('[data-block]');
    expect(first).toHaveAttribute('data-block', 'paragraph');
    expect(first!.className).not.toMatch(/\bmt-\d/);
  });

  it('renders the perspective even when the factual body is empty', () => {
    const { container } = render(<ArticleBody blocks={[]} perspective={perspective} />);
    expect(container.querySelectorAll('[data-block]')).toHaveLength(6);
  });

  it('keeps the takeaway as the final block', () => {
    const { container } = render(<ArticleBody blocks={blocks} perspective={perspective} />);
    const rendered = container.querySelectorAll('[data-block]');
    expect(rendered.item(rendered.length - 1)).toHaveAttribute('data-block', 'takeaway');
  });
});
