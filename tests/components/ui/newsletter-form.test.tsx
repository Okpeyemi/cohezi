import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MESSAGES, NewsletterForm } from '@/components/ui/newsletter-form';

const fetchMock = vi.fn();

describe('NewsletterForm', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows a local error and skips the network for an invalid email', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByLabelText('Email address'), 'nope');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(screen.getByRole('status')).toHaveTextContent(MESSAGES.invalid);
    expect(screen.getByLabelText('Email address')).toHaveAttribute('aria-invalid', 'true');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts the trimmed email and shows the success message', async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200 });
    const user = userEvent.setup();
    render(<NewsletterForm />);
    const input = screen.getByLabelText('Email address');
    await user.type(input, ' jane@example.com ');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(MESSAGES.success));
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/newsletter',
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ email: 'jane@example.com' }) }),
    );
    expect(input).toHaveValue('');
  });

  it('shows the failure message when the server rejects', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 });
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByLabelText('Email address'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(MESSAGES.failure));
  });

  it('disables the button while the request is pending', async () => {
    let resolve: (value: { ok: boolean; status: number }) => void = () => undefined;
    fetchMock.mockReturnValue(
      new Promise((r) => {
        resolve = r;
      }),
    );
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByLabelText('Email address'), 'jane@example.com');
    const button = screen.getByRole('button', { name: /subscribe/i });
    await user.click(button);
    expect(button).toBeDisabled();
    resolve({ ok: true, status: 200 });
    await waitFor(() => expect(button).toBeEnabled());
  });

  it('uses the given placeholder and button label', () => {
    render(<NewsletterForm variant="footer" placeholder="Your email" buttonLabel="Go" />);
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go/i })).toBeInTheDocument();
  });
});
