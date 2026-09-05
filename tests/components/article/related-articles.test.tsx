import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RelatedArticles } from '@/components/article/related-articles';
import { articles } from '@/content/articles';

describe('RelatedArticles', () => {
  it('renders a titled section with one card per article', () => {
    render(<RelatedArticles articles={articles.slice(0, 3)} title="À lire ensuite" />);
    expect(screen.getByRole('heading', { level: 2, name: 'À lire ensuite' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('renders nothing when there is no article to suggest', () => {
    const { container } = render(<RelatedArticles articles={[]} title="À lire ensuite" />);
    expect(container).toBeEmptyDOMElement();
  });
});
