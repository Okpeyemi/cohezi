import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CoheziLogo } from '@/components/ui/cohezi-logo';

const srcs = (root: HTMLElement) => [...root.querySelectorAll('img')].map((img) => img.getAttribute('src'));

describe('CoheziLogo', () => {
  it('renders both header lockups on dark tone, switched by the hero-light classes', () => {
    const { container } = render(<CoheziLogo tone="dark" />);
    expect(srcs(container)).toEqual([
      '/brand/cohezi-lockup-blanc.png',
      '/brand/cohezi-lockup-noir.png',
      '/brand/cohezi-symbole-vert.png',
      '/brand/cohezi-logotype-blanc.png',
    ]);
    const [white, black] = [...container.querySelectorAll('span[data-variant]')];
    expect(white).toHaveClass('hero-light-hidden');
    expect(black).toHaveClass('hero-light-only');
    for (const img of container.querySelectorAll('img')) expect(img).toHaveAttribute('alt', '');
  });

  it('renders only the black lockup and black logotype on light tone', () => {
    const { container } = render(<CoheziLogo tone="light" />);
    expect(srcs(container)).toEqual([
      '/brand/cohezi-lockup-noir.png',
      '/brand/cohezi-symbole-vert.png',
      '/brand/cohezi-logotype-noir.png',
    ]);
  });

  it('renders a single 160px black lockup for the footer', () => {
    const { container } = render(<CoheziLogo tone="light" size="footer" />);
    const imgs = container.querySelectorAll('img');
    expect(imgs).toHaveLength(1);
    expect(imgs[0]).toHaveAttribute('src', '/brand/cohezi-lockup-noir.png');
    expect(imgs[0]).toHaveAttribute('width', '160');
  });
});
