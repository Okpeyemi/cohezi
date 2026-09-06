// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/newsletter/route';
import { notifySubscription } from '@/lib/newsletter-mail';

vi.mock('@/lib/newsletter-mail', () => ({
  notifySubscription: vi.fn(async () => ({ delivered: false, reason: 'not_configured' })),
}));

/** Chaque test part d'un compteur neuf : sinon l'ordre d'exécution deviendrait signifiant. */
let ipCounter = 0;
const freshIp = () => `198.51.100.${(ipCounter += 1)}`;

function post(body: string, ip = freshIp()) {
  return POST(
    new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
      body,
    }),
  );
}

describe('POST /api/newsletter', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.mocked(notifySubscription).mockResolvedValue({ delivered: false, reason: 'not_configured' });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('accepts a valid email (trimmed) and warns when no mailbox is configured', async () => {
    const response = await post(JSON.stringify({ email: ' jane@example.com ' }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(notifySubscription).toHaveBeenCalledWith('jane@example.com', process.env);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('j***@example.com'));
  });

  it('logs the forwarding once the mailbox is configured', async () => {
    vi.mocked(notifySubscription).mockResolvedValue({ delivered: true });
    const response = await post(JSON.stringify({ email: 'jane@example.com' }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining('j***@example.com'));
  });

  it('answers 502 rather than pretending when the delivery fails', async () => {
    vi.mocked(notifySubscription).mockResolvedValue({ delivered: false, reason: 'send_failed' });
    const response = await post(JSON.stringify({ email: 'jane@example.com' }));
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ ok: false, error: 'delivery_failed' });
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('j***@example.com'));
  });

  it('rejects an invalid email with 400', async () => {
    const response = await post(JSON.stringify({ email: 'nope' }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, error: 'invalid_email' });
  });

  it('rejects a malformed JSON body with 400', async () => {
    const response = await post('{not json');
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, error: 'invalid_email' });
  });

  it('rejects a body without email with 400', async () => {
    const response = await post(JSON.stringify({}));
    expect(response.status).toBe(400);
  });
});

describe('POST /api/newsletter — garde anti-abus', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    vi.mocked(notifySubscription).mockResolvedValue({ delivered: true });
  });
  afterEach(() => vi.restoreAllMocks());

  it('pretends to accept a bot that filled the honeypot, and sends nothing', async () => {
    const response = await post(JSON.stringify({ email: 'bot@example.com', site: 'https://spam.example' }), freshIp());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(notifySubscription).not.toHaveBeenCalled();
  });

  it('ignores an empty honeypot, which is what a human leaves', async () => {
    const response = await post(JSON.stringify({ email: 'jane@example.com', site: '' }), freshIp());
    expect(response.status).toBe(200);
    expect(notifySubscription).toHaveBeenCalledOnce();
  });

  it('answers 429 once the same address has tried too often', async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i += 1) {
      expect((await post(JSON.stringify({ email: `a${i}@example.com` }), ip)).status).toBe(200);
    }
    const blocked = await post(JSON.stringify({ email: 'a5@example.com' }), ip);
    expect(blocked.status).toBe(429);
    expect(await blocked.json()).toEqual({ ok: false, error: 'rate_limited' });
    expect(blocked.headers.get('Retry-After')).toMatch(/^\d+$/);
  });

  it('does not punish a different address', async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i += 1) await post(JSON.stringify({ email: `b${i}@example.com` }), ip);
    expect((await post(JSON.stringify({ email: 'other@example.com' }), freshIp())).status).toBe(200);
  });

  it('counts an invalid email against the limit too, so the guard cannot be bypassed', async () => {
    const ip = freshIp();
    for (let i = 0; i < 5; i += 1) {
      expect((await post(JSON.stringify({ email: 'pas-un-email' }), ip)).status).toBe(400);
    }
    expect((await post(JSON.stringify({ email: 'jane@example.com' }), ip)).status).toBe(429);
  });
});
