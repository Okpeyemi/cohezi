import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from '@/components/ui/tabs';

const items = [
  { slug: 'all', label: 'Toutes' },
  { slug: 'business', label: 'Business' },
];

describe('Tabs', () => {
  it('marks the active tab and reports changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs items={items} active="all" onChange={onChange} ariaLabel="Filtrer les articles" />);
    expect(screen.getByRole('group', { name: 'Filtrer les articles' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toutes' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Business' })).toHaveAttribute('aria-pressed', 'false');
    await user.click(screen.getByRole('button', { name: 'Business' }));
    expect(onChange).toHaveBeenCalledWith('business');
  });
});
