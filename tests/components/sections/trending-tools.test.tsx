import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TrendingTools } from '@/components/sections/trending-tools';
import { toolCategories } from '@/content/categories';
import { site } from '@/content/site';
import { tools } from '@/content/tools';

describe('TrendingTools', () => {
  it('renders the heading, 12 tools, 21 chips and the view-all link', () => {
    render(<TrendingTools copy={site.sections.tools} tools={tools} categories={toolCategories} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Trending Tools' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(12);
    expect(screen.getAllByRole('button')).toHaveLength(21);
    expect(screen.getByRole('link', { name: /view all tools/i })).toHaveAttribute('href', '/tools');
  });

  it('filters tools by category', async () => {
    const user = userEvent.setup();
    render(<TrendingTools copy={site.sections.tools} tools={tools} categories={toolCategories} />);
    await user.click(screen.getByRole('button', { name: 'Agents' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });
});
