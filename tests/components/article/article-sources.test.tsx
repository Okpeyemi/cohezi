import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleSources } from '@/components/article/article-sources';
import type { Source } from '@/content/types';

const sources: Source[] = [
  {
    outlet: 'Next',
    title: 'Anthropic relance la course aux modèles avec Claude Fable 5.1',
    url: 'https://next.ink/brief-article/anthropic-relance-la-course-aux-modeles-avec-claude-fable-5-1/',
    publishedAt: '2026-09-01',
  },
  {
    outlet: 'Anthropic',
    title: 'Introducing Claude Fable 5.1 and Claude Mythos 5.1',
    url: 'https://www.anthropic.com/claude-fable-and-mythos-5-1',
    publishedAt: '2026-09-01',
  },
];

describe('ArticleSources', () => {
  it('renders one external link per source', () => {
    render(<ArticleSources sources={sources} />);

    const section = within(screen.getByRole('region', { name: 'Sources' }));
    const links = section.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', sources[0]!.url);
    expect(links[0]).toHaveAttribute('target', '_blank');
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows the outlet, the title and the French date', () => {
    render(<ArticleSources sources={sources} />);
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText(sources[0]!.title)).toBeInTheDocument();
    expect(screen.getAllByText('1 septembre 2026')).toHaveLength(2);
  });

  it('renders nothing when there is no source', () => {
    const { container } = render(<ArticleSources sources={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
