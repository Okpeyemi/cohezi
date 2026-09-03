import { describe, expect, it } from 'vitest';
import type { Article } from '@/content/types';
import { pickFeatured } from '@/lib/articles';

const make = (slug: string, featured?: boolean): Article => ({
  slug,
  title: slug,
  author: 'A',
  readingMinutes: 5,
  tag: 'ai',
  image: { alt: slug },
  featured,
});

describe('pickFeatured', () => {
  it('returns the flagged article and the others in order', () => {
    const a = make('a');
    const b = make('b', true);
    const c = make('c');
    expect(pickFeatured([a, b, c])).toEqual({ featured: b, rest: [a, c] });
  });

  it('falls back to the first article when none is flagged', () => {
    const a = make('a');
    const b = make('b');
    expect(pickFeatured([a, b])).toEqual({ featured: a, rest: [b] });
  });

  it('handles an empty list', () => {
    expect(pickFeatured([])).toEqual({ featured: undefined, rest: [] });
  });
});
