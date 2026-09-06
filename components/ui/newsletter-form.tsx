'use client';

import Link from 'next/link';
import { useId, useState, type FormEvent } from 'react';
import { cn } from '@/lib/cn';
import { isValidEmail } from '@/lib/validate-email';
import { Button } from './button';
import { Icon } from './icon';

export const MESSAGES = {
  invalid: 'Saisissez une adresse e-mail valide.',
  success: 'Vérifiez votre boîte mail pour confirmer.',
  failure: 'Une erreur est survenue, réessayez.',
  rateLimited: 'Trop de tentatives. Réessayez dans quelques minutes.',
} as const;

type Status = 'idle' | 'sending' | 'success' | 'error';

type NewsletterFormProps = {
  variant?: 'hero' | 'footer';
  buttonTone?: 'ink' | 'accent';
  placeholder?: string;
  buttonLabel?: string;
  endpoint?: string;
  className?: string;
};

export function NewsletterForm({
  variant = 'hero',
  buttonTone = 'ink',
  placeholder = 'Votre adresse e-mail',
  buttonLabel = 'S’inscrire',
  endpoint = '/api/newsletter',
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  // Champ leurre : laissé vide par un humain, rempli par les robots qui remplissent tout.
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const inputId = useId();
  const messageId = `${inputId}-message`;
  const honeypotId = `${inputId}-site`;
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
        body: JSON.stringify({ email: trimmed, site: honeypot }),
      });
      if (response.status === 429) {
        setStatus('error');
        setMessage(MESSAGES.rateLimited);
        return;
      }
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
    <form onSubmit={handleSubmit} noValidate className={cn('relative w-full', isHero ? 'max-w-[512px]' : 'max-w-[320px]', className)}>
      <div className={cn('flex items-center gap-2 rounded-xl bg-paper p-1.5 ring-1 ring-ink/10', isHero && 'shadow-lg')}>
        <label htmlFor={inputId} className="sr-only">
          Adresse e-mail
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
            isHero ? 'h-11 text-sm md:text-base' : 'h-9 text-sm',
          )}
        />
        <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
          <label htmlFor={honeypotId}>Ne remplissez pas ce champ</label>
          <input
            id={honeypotId}
            type="text"
            name="site"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant={buttonTone}
          size={isHero ? 'md' : 'sm'}
          disabled={sending}
          className={cn(!isHero && 'h-9 px-3 text-sm')}
        >
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
      <p className={cn('mt-2 text-xs', isHero ? 'text-paper/60' : 'text-ink/55')}>
        En vous inscrivant, vous acceptez notre{' '}
        <Link
          href="/politique-de-confidentialite"
          className="underline decoration-current/40 underline-offset-2 hover:decoration-current"
        >
          politique de confidentialité
        </Link>
        .
      </p>
    </form>
  );
}
