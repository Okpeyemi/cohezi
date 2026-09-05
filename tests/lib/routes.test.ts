import { describe, expect, it } from 'vitest';
import { isKnownSection } from '@/lib/routes';

describe('isKnownSection', () => {
  it('accepts the category slugs served by their own pages', () => {
    for (const slug of ['actualite', 'business', 'societe', 'analyses']) {
      expect(isKnownSection(slug), slug).toBe(true);
    }
  });

  it('accepts the announced pages', () => {
    for (const slug of ['a-propos', 'contact', 'recherche']) {
      expect(isKnownSection(slug), slug).toBe(true);
    }
  });

  it('rejects unknown or missing segments', () => {
    expect(isKnownSection('nimportequoi')).toBe(false);
    expect(isKnownSection(undefined)).toBe(false);
    expect(isKnownSection('')).toBe(false);
  });
});
