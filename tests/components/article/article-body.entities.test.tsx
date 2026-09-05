import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleBody } from '@/components/article/article-body';
import type { ArticleBlock } from '@/content/types';

const blocks: ArticleBlock[] = [
  { type: 'paragraph', text: 'NVIDIA a racheté Hugging Face.' },
  { type: 'paragraph', text: 'Plus tard, NVIDIA a confirmé, selon Next.' },
  { type: 'quote', text: 'NVIDIA était le seul partenaire envisagé.', author: 'Un cofondateur' },
  { type: 'heading', text: 'Ce que NVIDIA achète' },
];

describe('ArticleBody entity links', () => {
  it('links the first mention of each organisation', () => {
    render(<ArticleBody blocks={blocks} />);
    const nvidia = screen.getByRole('link', { name: 'NVIDIA' });
    expect(nvidia).toHaveAttribute('href', 'https://www.nvidia.com');
    expect(nvidia).toHaveAttribute('target', '_blank');
    expect(nvidia).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('link', { name: 'Hugging Face' })).toHaveAttribute('href', 'https://huggingface.co');
    expect(screen.getByRole('link', { name: 'Next' })).toHaveAttribute('href', 'https://next.ink');
  });

  it('never links the same organisation twice in one article', () => {
    render(<ArticleBody blocks={blocks} />);
    expect(screen.getAllByRole('link', { name: 'NVIDIA' })).toHaveLength(1);
  });

  it('leaves quotations and headings untouched', () => {
    render(<ArticleBody blocks={blocks} />);
    const quote = within(document.querySelector('[data-block="quote"]')!);
    expect(quote.queryByRole('link')).toBeNull();
    const heading = within(document.querySelector('[data-block="heading"]')!);
    expect(heading.queryByRole('link')).toBeNull();
  });

  it('keeps the full sentence readable', () => {
    render(<ArticleBody blocks={blocks} />);
    expect(document.querySelector('[data-block="paragraph"]')!.textContent).toBe(
      'NVIDIA a racheté Hugging Face.',
    );
  });
});
