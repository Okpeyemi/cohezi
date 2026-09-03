// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/newsletter/route';

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
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('accepts a valid email (trimmed) and logs a masked address', async () => {
    const response = await post(JSON.stringify({ email: ' jane@example.com ' }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining('j***@example.com'));
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
