import { beforeEach, describe, expect, it } from 'vitest';
import { createRateLimiter } from '@/lib/rate-limit';

describe('createRateLimiter', () => {
  let now = 0;
  const clock = () => now;

  beforeEach(() => {
    now = 1_000_000;
  });

  it('lets the allowed number of attempts through', () => {
    const limit = createRateLimiter({ max: 3, windowMs: 60_000, clock });
    expect(limit.check('1.2.3.4')).toEqual({ allowed: true, remaining: 2 });
    expect(limit.check('1.2.3.4')).toEqual({ allowed: true, remaining: 1 });
    expect(limit.check('1.2.3.4')).toEqual({ allowed: true, remaining: 0 });
  });

  it('refuses the attempt just over the limit', () => {
    const limit = createRateLimiter({ max: 2, windowMs: 60_000, clock });
    limit.check('1.2.3.4');
    limit.check('1.2.3.4');
    const result = limit.check('1.2.3.4');
    expect(result.allowed).toBe(false);
    if (!result.allowed) expect(result.retryAfterSeconds).toBe(60);
  });

  it('counts each address separately', () => {
    const limit = createRateLimiter({ max: 1, windowMs: 60_000, clock });
    expect(limit.check('1.1.1.1').allowed).toBe(true);
    expect(limit.check('2.2.2.2').allowed).toBe(true);
    expect(limit.check('1.1.1.1').allowed).toBe(false);
  });

  it('forgets the attempts once the window has passed', () => {
    const limit = createRateLimiter({ max: 1, windowMs: 60_000, clock });
    expect(limit.check('1.2.3.4').allowed).toBe(true);
    expect(limit.check('1.2.3.4').allowed).toBe(false);
    now += 60_001;
    expect(limit.check('1.2.3.4').allowed).toBe(true);
  });

  it('slides: an old attempt expires while a recent one still counts', () => {
    const limit = createRateLimiter({ max: 2, windowMs: 60_000, clock });
    limit.check('1.2.3.4');
    now += 30_000;
    limit.check('1.2.3.4');
    expect(limit.check('1.2.3.4').allowed).toBe(false);
    now += 30_001; // la première sort de la fenêtre, la seconde y reste
    expect(limit.check('1.2.3.4')).toEqual({ allowed: true, remaining: 0 });
  });

  it('rounds the retry delay up to the next second', () => {
    const limit = createRateLimiter({ max: 1, windowMs: 60_000, clock });
    limit.check('1.2.3.4');
    now += 500;
    const result = limit.check('1.2.3.4');
    expect(result.allowed).toBe(false);
    // L'union impose de restreindre avant de lire le délai : c'est voulu.
    if (!result.allowed) expect(result.retryAfterSeconds).toBe(60);
  });

  it('drops the addresses it no longer needs to remember', () => {
    const limit = createRateLimiter({ max: 1, windowMs: 60_000, clock });
    limit.check('1.1.1.1');
    now += 60_001;
    limit.check('2.2.2.2');
    expect(limit.size()).toBe(1);
  });
});
