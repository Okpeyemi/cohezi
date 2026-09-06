import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NewsletterForm } from '@/components/ui/newsletter-form';

afterEach(() => vi.restoreAllMocks());

describe('NewsletterForm — garde et consentement', () => {
  it('carries a honeypot field that is hidden from readers and from assistive tech', () => {
    const { container } = render(<NewsletterForm />);
    const honeypot = container.querySelector('input[name="site"]')!;
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot).toHaveAttribute('autocomplete', 'off');
    // Invisible pour un lecteur d'écran : il ne doit jamais être proposé à un humain.
    expect(honeypot.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it('sends the honeypot along, so the server can judge', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByLabelText('Adresse e-mail'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /S’inscrire/ }));

    const body = JSON.parse(String(fetchSpy.mock.calls[0]![1]!.body));
    expect(body).toEqual({ email: 'jane@example.com', site: '' });
  });

  it('links to the privacy policy under the field', () => {
    render(<NewsletterForm />);
    expect(screen.getByRole('link', { name: /politique de confidentialité/i })).toHaveAttribute(
      'href',
      '/politique-de-confidentialite',
    );
  });

  it('tells the reader when the guard turned them away', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: 'rate_limited' }), { status: 429 }),
    );
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByLabelText('Adresse e-mail'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /S’inscrire/ }));
    expect(await screen.findByRole('status')).toHaveTextContent(/trop de tentatives/i);
  });
});
