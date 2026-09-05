import { afterEach, describe, expect, it, vi } from 'vitest';
import { readMailConfig, notifySubscription } from '@/lib/newsletter-mail';

const env = {
  SMTP_HOST: 'smtp.hostinger.com',
  SMTP_PORT: '465',
  SMTP_USER: 'news@cohezi.io',
  SMTP_PASSWORD: 'secret',
};

afterEach(() => vi.restoreAllMocks());

describe('readMailConfig', () => {
  it('returns null when the credentials are missing', () => {
    expect(readMailConfig({})).toBeNull();
    expect(readMailConfig({ SMTP_USER: 'a@b.c' })).toBeNull();
  });

  it('fills in the Hostinger defaults', () => {
    const config = readMailConfig({ SMTP_USER: 'news@cohezi.io', SMTP_PASSWORD: 'secret' })!;
    expect(config.host).toBe('smtp.hostinger.com');
    expect(config.port).toBe(465);
    expect(config.secure).toBe(true);
    expect(config.to).toBe('news@cohezi.io');
    expect(config.from).toBe('news@cohezi.io');
  });

  it('lets every default be overridden', () => {
    const config = readMailConfig({ ...env, SMTP_PORT: '587', NEWSLETTER_TO: 'liste@cohezi.io' })!;
    expect(config.port).toBe(587);
    expect(config.secure).toBe(false);
    expect(config.to).toBe('liste@cohezi.io');
  });

  it('refuses a port that is not a number', () => {
    expect(readMailConfig({ ...env, SMTP_PORT: 'abc' })).toBeNull();
  });
});

describe('notifySubscription', () => {
  it('reports that nothing was sent when the mail is not configured', async () => {
    const result = await notifySubscription('lecteur@example.com', {});
    expect(result).toEqual({ delivered: false, reason: 'not_configured' });
  });

  it('sends the subscriber address to the configured mailbox', async () => {
    const sendMail = vi.fn().mockResolvedValue({ messageId: '<1@cohezi.io>' });
    const result = await notifySubscription('lecteur@example.com', env, () => ({ sendMail }));

    expect(result).toEqual({ delivered: true });
    const message = sendMail.mock.calls[0]![0];
    expect(message.to).toBe('news@cohezi.io');
    expect(message.from).toBe('news@cohezi.io');
    expect(message.replyTo).toBe('lecteur@example.com');
    expect(message.subject).toContain('lecteur@example.com');
    expect(message.text).toContain('lecteur@example.com');
  });

  it('reports a failure instead of throwing', async () => {
    const sendMail = vi.fn().mockRejectedValue(new Error('connection refused'));
    const result = await notifySubscription('lecteur@example.com', env, () => ({ sendMail }));
    expect(result).toEqual({ delivered: false, reason: 'send_failed' });
  });
});
