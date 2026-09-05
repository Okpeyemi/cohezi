'use client';

import { useId, useState, type FormEvent } from 'react';
import { cn } from '@/lib/cn';
import { isValidEmail } from '@/lib/validate-email';
import { Button } from './button';
import { Icon } from './icon';

export const MESSAGES = {
  invalid: 'Enter a valid email address.',
  success: 'Check your inbox to confirm.',
  failure: 'Something went wrong, try again.',
} as const;

type Status = 'idle' | 'sending' | 'success' | 'error';

type NewsletterFormProps = {
  variant?: 'hero' | 'footer';
  placeholder?: string;
  buttonLabel?: string;
  endpoint?: string;
  className?: string;
};

export function NewsletterForm({
  variant = 'hero',
  placeholder = 'Email Address',
  buttonLabel = 'Subscribe',
  endpoint = '/api/newsletter',
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const inputId = useId();
  const messageId = `${inputId}-message`;
  const isHero = variant === 'hero';
  const sending = status === 'sending';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setStatus('error');
      setMessage(MESSAGES.invalid);
      return;
    }
    setStatus('sending');
    setMessage('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
      setMessage(MESSAGES.success);
      setEmail('');
    } catch {
      setStatus('error');
      setMessage(MESSAGES.failure);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('w-full', isHero ? 'max-w-[512px]' : 'max-w-[320px]', className)}>
      <div className={cn('flex items-center gap-2 rounded-xl bg-paper p-1.5 ring-1 ring-ink/10', isHero && 'shadow-lg')}>
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={status === 'error'}
          aria-describedby={message ? messageId : undefined}
          disabled={sending}
          className={cn(
            'min-w-0 flex-1 bg-transparent px-3 text-ink placeholder:text-muted focus:outline-none',
            isHero ? 'h-11 text-base' : 'h-9 text-sm',
          )}
        />
        <Button type="submit" size={isHero ? 'md' : 'sm'} disabled={sending} className={cn(!isHero && 'h-9 px-3 text-sm')}>
          {buttonLabel}
          <Icon name="send" size={16} />
        </Button>
      </div>
      <p
        id={messageId}
        role="status"
        aria-live="polite"
        className={cn(
          'mt-2 text-sm',
          status === 'error' ? (isHero ? 'text-accent' : 'text-accent-deep') : isHero ? 'text-paper/80' : 'text-ink/70',
          !message && 'sr-only',
        )}
      >
        {message}
      </p>
    </form>
  );
}
