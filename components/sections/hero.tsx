import { LogoWordmark } from '@/components/ui/logo-wordmark';
import { NewsletterForm } from '@/components/ui/newsletter-form';
import type { HeroContent } from '@/content/types';

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section aria-labelledby="hero-title" className="px-5 pb-16 pt-20 text-center md:pt-28">
      <h1
        id="hero-title"
        className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-white md:text-[72px]"
      >
        {hero.titleStart} <br className="hidden md:inline" />
        <span className="text-brand-gradient">{hero.titleAccent}</span> {hero.titleEnd}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-7 text-white/80">{hero.subtitle}</p>
      <div className="mt-8 flex justify-center">
        <NewsletterForm variant="hero" placeholder={hero.emailPlaceholder} buttonLabel={hero.subscribeLabel} />
      </div>
      <p className="mt-12 text-sm text-white/80">
        {hero.trustedByPrefix} <strong className="font-bold text-white">{hero.trustedByCount}</strong> {hero.trustedBySuffix}
      </p>
      <ul aria-label="Trusted by" className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {hero.trustedBy.map((name) => (
          <li key={name}>
            <LogoWordmark name={name} />
          </li>
        ))}
      </ul>
    </section>
  );
}
