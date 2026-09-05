import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Pagination } from '@/components/ui/pagination';

const href = (page: number) => `/articles?page=${page}`;

describe('Pagination', () => {
  it('renders nothing when there is a single page', () => {
    const { container } = render(<Pagination page={1} pageCount={1} buildHref={href} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders one link per page and marks the current one', () => {
    render(<Pagination page={2} pageCount={3} buildHref={href} />);
    const nav = screen.getByRole('navigation', { name: 'Pagination' });
    expect(within(nav).getByRole('link', { name: '1' })).toHaveAttribute('href', '/articles?page=1');
    const current = within(nav).getByRole('link', { name: '2' });
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.className).toContain('bg-ink');
  });

  it('disables the previous arrow on the first page and the next one on the last', () => {
    const { rerender } = render(<Pagination page={1} pageCount={3} buildHref={href} />);
    expect(screen.getByLabelText('Page précédente')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('link', { name: 'Page suivante' })).toHaveAttribute('href', '/articles?page=2');

    rerender(<Pagination page={3} pageCount={3} buildHref={href} />);
    expect(screen.getByLabelText('Page suivante')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('link', { name: 'Page précédente' })).toHaveAttribute('href', '/articles?page=2');
  });

  it('condenses long ranges around the current page', () => {
    render(<Pagination page={6} pageCount={12} buildHref={href} />);
    const nav = screen.getByRole('navigation', { name: 'Pagination' });
    const labels = within(nav)
      .getAllByRole('link')
      .map((link) => link.textContent)
      .filter((text) => text && /^\d+$/.test(text));
    expect(labels).toEqual(['1', '5', '6', '7', '12']);
    expect(within(nav).getAllByText('…')).toHaveLength(2);
  });
});
