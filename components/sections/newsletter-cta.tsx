import { NewsletterForm } from '@/components/ui/newsletter-form';
import type { NewsletterCopy } from '@/content/types';

/** Bloc newsletter plein écran, à la place du bloc University du clone. */
export function NewsletterCta({ copy }: { copy: NewsletterCopy }) {
  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="bg-ink px-5 py-24 text-center">
      <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
        <span aria-hidden className="h-2 w-2 bg-accent" />
        {copy.eyebrow}
      </p>
      <h2
        id="newsletter-title"
        className="mx-auto mt-6 max-w-3xl font-display text-[32px] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-paper md:text-5xl"
      >
        {copy.titleLine1} <br className="hidden md:inline" />
        {copy.titleLine2}
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-paper/80">{copy.description}</p>
      <div className="mt-8 flex justify-center">
        <NewsletterForm
          variant="hero"
          buttonTone="accent"
          placeholder={copy.emailPlaceholder}
          buttonLabel={copy.buttonLabel}
        />
      </div>
      <p className="mt-4 text-sm text-paper/60">{copy.microCopy}</p>
    </section>
  );
}
