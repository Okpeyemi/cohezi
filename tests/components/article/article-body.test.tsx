import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleBody } from '@/components/article/article-body';
import type { ArticleBlock } from '@/content/types';

const blocks: ArticleBlock[] = [
  { type: 'paragraph', text: 'Le fait principal.' },
  { type: 'heading', text: 'Ce que cela change' },
  { type: 'quote', text: 'Une déclaration marquante.', author: 'Ada Lovelace, ingénieure' },
  { type: 'list', items: ['Premier point', 'Deuxième point'] },
  { type: 'takeaway', title: 'À retenir', items: ['Un point clé', 'Un autre'] },
];

describe('ArticleBody', () => {
  it('renders each block type in order', () => {
    render(<ArticleBody blocks={blocks} />);
    expect(screen.getByText('Le fait principal.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Ce que cela change' })).toBeInTheDocument();
    const quote = screen.getByText('Une déclaration marquante.').closest('blockquote');
    expect(quote).not.toBeNull();
    expect(within(quote!).getByText(/Ada Lovelace, ingénieure/)).toBeInTheDocument();
    expect(screen.getByText('Premier point')).toBeInTheDocument();
    expect(screen.getByText('À retenir')).toBeInTheDocument();
    expect(screen.getByText('Un point clé')).toBeInTheDocument();
  });

  it('omits the author line when the quote has none', () => {
    render(<ArticleBody blocks={[{ type: 'quote', text: 'Sans auteur.' }]} />);
    const quote = screen.getByText('Sans auteur.').closest('blockquote');
    expect(quote!.textContent).toBe('Sans auteur.');
  });

  it('gives the first block no top margin', () => {
    const { container } = render(<ArticleBody blocks={blocks} />);
    const first = container.querySelector('[data-block]');
    expect(first).toHaveAttribute('data-block', 'paragraph');
    expect(first!.className).not.toMatch(/\bmt-\d/);
  });

  it('renders nothing for an empty body', () => {
    const { container } = render(<ArticleBody blocks={[]} />);
    expect(container.querySelectorAll('[data-block]')).toHaveLength(0);
  });
});
