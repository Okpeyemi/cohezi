import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from '@/components/ui/icon';

describe('Icon', () => {
  it('renders a decorative svg by default', () => {
    const { container } = render(<Icon name="menu" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('data-icon', 'menu');
    expect(svg).toHaveAttribute('width', '20');
  });

  it('becomes an accessible image when a label is given', () => {
    render(<Icon name="tiktok" label="TikTok" size={16} />);
    expect(screen.getByRole('img', { name: 'TikTok' })).toHaveAttribute('width', '16');
  });
});
