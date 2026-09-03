import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Guides } from '@/components/sections/guides';
import { guideCategories } from '@/content/categories';
import { guides } from '@/content/guides';
import { site } from '@/content/site';

describe('Guides', () => {
  it('renders the heading, 8 guides, 18 chips and the view-all link', () => {
    render(<Guides copy={site.sections.guides} guides={guides} categories={guideCategories} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Guides' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
    expect(screen.getAllByRole('button')).toHaveLength(18);
    expect(screen.getByRole('link', { name: /view all guides/i })).toHaveAttribute('href', '/guides');
  });

  it('filters guides by category', async () => {
    const user = userEvent.setup();
    render(<Guides copy={site.sections.guides} guides={guides} categories={guideCategories} />);
    await user.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Open Design');
  });
});
