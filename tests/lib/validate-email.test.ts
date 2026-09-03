import { describe, expect, it } from 'vitest';
import { MAX_EMAIL_LENGTH, isValidEmail, maskEmail, normalizeEmail } from '@/lib/validate-email';

describe('normalizeEmail', () => {
  it('trims strings and turns non-strings into an empty string', () => {
    expect(normalizeEmail('  jane@example.com ')).toBe('jane@example.com');
    expect(normalizeEmail(42)).toBe('');
    expect(normalizeEmail(undefined)).toBe('');
  });
});

describe('isValidEmail', () => {
  it('accepts ordinary addresses, with surrounding spaces', () => {
    expect(isValidEmail('jane@example.com')).toBe(true);
    expect(isValidEmail(' jane.doe+news@sub.example.co ')).toBe(true);
  });

  it('rejects empty values, missing @, missing TLD and inner spaces', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('jane')).toBe(false);
    expect(isValidEmail('jane@example')).toBe(false);
    expect(isValidEmail('ja ne@example.com')).toBe(false);
    expect(isValidEmail(null)).toBe(false);
  });

  it('rejects addresses longer than MAX_EMAIL_LENGTH', () => {
    const local = 'a'.repeat(MAX_EMAIL_LENGTH);
    expect(isValidEmail(`${local}@example.com`)).toBe(false);
  });
});

describe('maskEmail', () => {
  it('keeps the first character and the domain', () => {
    expect(maskEmail('jane@example.com')).toBe('j***@example.com');
  });

  it('masks everything when there is no domain', () => {
    expect(maskEmail('nonsense')).toBe('***');
  });
});
