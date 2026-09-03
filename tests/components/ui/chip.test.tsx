import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Chip } from '@/components/ui/chip';

describe('Chip', () => {
  it('exposes the active state through aria-pressed', () => {
    render(<Chip label="Coding" icon="coding" active />);
    const chip = screen.getByRole('button', { name: 'Coding' });
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(chip.querySelector('svg[data-icon="coding"]')).not.toBeNull();
  });

  it('calls onClick and is not pressed by default', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip label="Design" onClick={onClick} />);
    const chip = screen.getByRole('button', { name: 'Design' });
    expect(chip).toHaveAttribute('aria-pressed', 'false');
    await user.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
