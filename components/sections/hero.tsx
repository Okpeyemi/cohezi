import { NewsletterForm } from '@/components/ui/newsletter-form';
import type { HeroContent } from '@/content/types';

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section aria-labelledby="hero-title" className="hero-dark-change px-5 pb-16 pt-20 text-center md:pt-28">
      <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
        <span aria-hidden className="h-2 w-2 bg-accent" />
        {hero.eyebrow}
      </p>
      <h1
        id="hero-title"
        className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.08] tracking-[-0.01em] text-paper md:text-[64px]"
      >
        {hero.titleLine1} <br className="hidden md:inline" />
        {hero.titleLine2}
        <span
          aria-hidden="true"
          data-testid="hero-accent-square"
          className="ml-2 inline-block h-[0.16em] w-[0.16em] bg-accent align-baseline"
        />
      </h1>
      <p className="mx-auto mt-6 max-w-[520px] text-lg leading-7 text-paper/80">{hero.description}</p>
      <div className="mt-8 flex justify-center">
        <NewsletterForm variant="hero" placeholder={hero.emailPlaceholder} buttonLabel={hero.subscribeLabel} />
      </div>
      <p className="mt-4 text-sm text-paper/60">{hero.microCopy}</p>
      <p className="mx-auto mt-16 max-w-2xl font-display text-sm font-medium uppercase tracking-[0.12em] text-paper/70">
        {hero.promise}
      </p>
    </section>
  );
}
