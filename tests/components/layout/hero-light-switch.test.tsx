import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HERO_LIGHT_CLASS, HERO_LIGHT_THRESHOLD, HeroLightSwitch } from '@/components/layout/hero-light-switch';

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', { value, configurable: true, writable: true });
}

function setDesktop(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({ matches, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
  );
}

describe('HeroLightSwitch', () => {
  beforeEach(() => {
    setScrollY(0);
    setDesktop(true);
    document.body.classList.remove(HERO_LIGHT_CLASS);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders nothing and leaves the body dark at the top of the page', () => {
    const { container } = render(<HeroLightSwitch />);
    expect(container).toBeEmptyDOMElement();
    expect(document.body.classList.contains(HERO_LIGHT_CLASS)).toBe(false);
  });

  it('adds the class past the threshold and removes it when scrolling back up', () => {
    render(<HeroLightSwitch />);
    act(() => {
      setScrollY(HERO_LIGHT_THRESHOLD + 1);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(document.body.classList.contains(HERO_LIGHT_CLASS)).toBe(true);
    act(() => {
      setScrollY(HERO_LIGHT_THRESHOLD);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(document.body.classList.contains(HERO_LIGHT_CLASS)).toBe(false);
  });

  it('applies the initial scroll position on mount and cleans up on unmount', () => {
    setScrollY(500);
    const { unmount } = render(<HeroLightSwitch />);
    expect(document.body.classList.contains(HERO_LIGHT_CLASS)).toBe(true);
    unmount();
    expect(document.body.classList.contains(HERO_LIGHT_CLASS)).toBe(false);
  });

  it('never switches below the desktop breakpoint', () => {
    setDesktop(false);
    setScrollY(500);
    render(<HeroLightSwitch />);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(document.body.classList.contains(HERO_LIGHT_CLASS)).toBe(false);
  });
});
