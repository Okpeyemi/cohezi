import { describe, expect, it } from 'vitest';
import { hashString, hashToGradient, truncateLabel } from '@/lib/placeholder';

describe('hashString', () => {
  it('is deterministic and returns an unsigned 32-bit integer', () => {
    expect(hashString('Muse Spark 1.3')).toBe(hashString('Muse Spark 1.3'));
    expect(hashString('abc')).toBeGreaterThanOrEqual(0);
    expect(hashString('abc')).toBeLessThanOrEqual(0xffffffff);
  });

  it('differs for different inputs', () => {
    expect(hashString('Guides')).not.toBe(hashString('Tools'));
  });
});

describe('hashToGradient', () => {
  it('returns two hsl colours 40 degrees apart and a 135deg angle', () => {
    const g = hashToGradient('Rowan');
    const hue = hashString('Rowan') % 360;
    expect(g).toEqual({
      from: `hsl(${hue} 55% 45%)`,
      to: `hsl(${(hue + 40) % 360} 55% 60%)`,
      angle: 135,
    });
  });

  it('is stable for the same seed', () => {
    expect(hashToGradient('x')).toEqual(hashToGradient('x'));
  });
});

describe('truncateLabel', () => {
  it('keeps short labels intact', () => {
    expect(truncateLabel('Claude Fable 5.1')).toBe('Claude Fable 5.1');
  });

  it('cuts long labels to 28 characters with an ellipsis', () => {
    const long = 'Stand Out in an AI Job Interview With the Proof Project Method';
    const result = truncateLabel(long);
    expect(result.length).toBe(28);
    expect(result.endsWith('…')).toBe(true);
  });
});
