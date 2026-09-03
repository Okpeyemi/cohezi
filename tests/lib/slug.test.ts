import { describe, expect, it } from 'vitest';
import { humanize } from '@/lib/slug';

describe('humanize', () => {
  it('capitalises each dash-separated word', () => {
    expect(humanize('privacy-policy')).toBe('Privacy Policy');
    expect(humanize('ai-university')).toBe('Ai University');
  });

  it('returns an empty string for an empty slug', () => {
    expect(humanize('')).toBe('');
  });
});
