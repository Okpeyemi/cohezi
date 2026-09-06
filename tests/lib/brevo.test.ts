import { describe, expect, it, vi } from 'vitest';
import { readBrevoConfig, subscribeToNewsletter } from '@/lib/brevo';

const env = {
  BREVO_API_KEY: 'xkeysib-secret',
  BREVO_LIST_ID: '4',
  BREVO_DOI_TEMPLATE_ID: '7',
  NEXT_PUBLIC_SITE_URL: 'https://www.cohezi.io',
};

const ok = (status = 201, body: unknown = {}) =>
  vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }));

describe('readBrevoConfig', () => {
  it('returns null when anything is missing', () => {
    expect(readBrevoConfig({})).toBeNull();
    expect(readBrevoConfig({ ...env, BREVO_API_KEY: undefined })).toBeNull();
    expect(readBrevoConfig({ ...env, BREVO_LIST_ID: undefined })).toBeNull();
    expect(readBrevoConfig({ ...env, BREVO_DOI_TEMPLATE_ID: undefined })).toBeNull();
  });

  it('refuses identifiers that are not numbers', () => {
    expect(readBrevoConfig({ ...env, BREVO_LIST_ID: 'quatre' })).toBeNull();
    expect(readBrevoConfig({ ...env, BREVO_DOI_TEMPLATE_ID: '' })).toBeNull();
  });

  it('builds the redirection url from the site url', () => {
    const config = readBrevoConfig(env)!;
    expect(config.listId).toBe(4);
    expect(config.templateId).toBe(7);
    expect(config.redirectionUrl).toBe('https://www.cohezi.io/newsletter/confirmee');
  });

  it('falls back to the canonical www domain when the site url is absent', () => {
    const config = readBrevoConfig({ ...env, NEXT_PUBLIC_SITE_URL: undefined })!;
    expect(config.redirectionUrl).toBe('https://www.cohezi.io/newsletter/confirmee');
  });

  it('tolerates a trailing slash on the site url', () => {
    const config = readBrevoConfig({ ...env, NEXT_PUBLIC_SITE_URL: 'https://www.cohezi.io/' })!;
    expect(config.redirectionUrl).toBe('https://www.cohezi.io/newsletter/confirmee');
  });
});

describe('subscribeToNewsletter', () => {
  it('says so when Brevo is not configured, without calling anything', async () => {
    const fetcher = ok();
    expect(await subscribeToNewsletter('jane@example.com', {}, fetcher)).toEqual({
      status: 'not_configured',
    });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('posts the double opt-in request and reports success', async () => {
    const fetcher = ok();
    expect(await subscribeToNewsletter('jane@example.com', env, fetcher)).toEqual({ status: 'pending' });

    const [url, init] = fetcher.mock.calls[0]!;
    expect(url).toBe('https://api.brevo.com/v3/contacts/doubleOptinConfirmation');
    expect(init.method).toBe('POST');
    expect(init.headers['api-key']).toBe('xkeysib-secret');
    expect(JSON.parse(init.body)).toEqual({
      email: 'jane@example.com',
      includeListIds: [4],
      templateId: 7,
      redirectionUrl: 'https://www.cohezi.io/newsletter/confirmee',
    });
  });

  it('treats an already-subscribed contact as a success, never leaking it', async () => {
    const fetcher = ok(400, { code: 'duplicate_parameter', message: 'Contact already exists' });
    expect(await subscribeToNewsletter('jane@example.com', env, fetcher)).toEqual({ status: 'pending' });
  });

  it('reports a misconfiguration when the DOI template is missing', async () => {
    const fetcher = ok(400, { code: 'invalid_parameter', message: 'An active DOI template does not exist' });
    expect(await subscribeToNewsletter('jane@example.com', env, fetcher)).toEqual({
      status: 'failed',
      reason: 'An active DOI template does not exist',
    });
  });

  it('reports a failure rather than throwing when the network breaks', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('ECONNRESET'));
    const result = await subscribeToNewsletter('jane@example.com', env, fetcher);
    expect(result.status).toBe('failed');
  });
});
