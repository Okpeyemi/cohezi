import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from '@/components/ui/tabs';

const items = [
  { slug: 'all', label: 'All' },
  { slug: 'ai', label: 'AI' },
];

describe('Tabs', () => {
  it('marks the active tab and reports changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs items={items} active="all" onChange={onChange} ariaLabel="Filter articles" />);
    expect(screen.getByRole('group', { name: 'Filter articles' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'AI' })).toHaveAttribute('aria-pressed', 'false');
    await user.click(screen.getByRole('button', { name: 'AI' }));
    expect(onChange).toHaveBeenCalledWith('ai');
  });
});
