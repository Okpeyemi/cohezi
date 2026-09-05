import { describe, expect, it } from 'vitest';
import { formatDateFr } from '@/lib/format-date';

describe('formatDateFr', () => {
  it('formats ISO dates in long French form', () => {
    expect(formatDateFr('2026-09-02')).toBe('2 septembre 2026');
    expect(formatDateFr('2026-08-14')).toBe('14 août 2026');
  });

  it('returns the input untouched when it is not a valid date', () => {
    expect(formatDateFr('bientôt')).toBe('bientôt');
  });
});
