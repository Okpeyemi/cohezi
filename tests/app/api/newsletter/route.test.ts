// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/newsletter/route';
import { notifySubscription } from '@/lib/newsletter-mail';

vi.mock('@/lib/newsletter-mail', () => ({
  notifySubscription: vi.fn(async () => ({ delivered: false, reason: 'not_configured' })),
}));

function post(body: string) {
  return POST(
    new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
