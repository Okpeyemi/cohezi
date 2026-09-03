import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PlaceholderImage } from '@/components/ui/placeholder-image';

describe('PlaceholderImage', () => {
  it('renders a generated svg labelled with the alt text when there is no src', () => {
    render(<PlaceholderImage image={{ alt: 'Muse Spark artwork' }} label="Muse Spark 1.3" />);
    const img = screen.getByRole('img', { name: 'Muse Spark artwork' });
    expect(img.tagName.toLowerCase()).toBe('svg');
    expect(img).toHaveTextContent('Muse Spark 1.3');
  });

  it('is deterministic: the same label yields the same gradient stops', () => {
    const { container: a } = render(<PlaceholderImage image={{ alt: 'a' }} label="Guides" />);
    const { container: b } = render(<PlaceholderImage image={{ alt: 'b' }} label="Guides" />);
    const stops = (c: HTMLElement) => [...c.querySelectorAll('stop')].map((s) => s.getAttribute('stop-color'));
    expect(stops(a)).toEqual(stops(b));
    expect(stops(a)).toHaveLength(2);
  });

  it('renders next/image when a src is provided', () => {
    render(
      <div style={{ position: 'relative', width: 320, height: 180 }}>
        <PlaceholderImage image={{ src: '/demo.png', alt: 'Demo' }} label="Demo" />
      </div>,
    );
    expect(screen.getByRole('img', { name: 'Demo' }).tagName.toLowerCase()).toBe('img');
  });
});
