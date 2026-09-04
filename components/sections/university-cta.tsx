import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { UniversityContent } from '@/content/types';

export function UniversityCta({ university }: { university: UniversityContent }) {
  return (
    <section aria-labelledby="university-title" className="bg-university-gradient px-5 py-24 text-center">
      <p className="inline-flex items-center gap-2 text-xl font-semibold text-white">
        <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded bg-white/10 text-[10px] font-black">
          RR
        </span>
        <span>{university.brandName}</span> <span className="text-brand-gradient">{university.brandAccent}</span>
      </p>
      <h2
        id="university-title"
        className="mx-auto mt-6 max-w-3xl text-[32px] font-bold leading-none tracking-[-0.025em] text-white md:text-5xl"
      >
        {university.title}
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-white/80">{university.subtitle}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href={university.primaryCta.href} variant="gradient" size="lg">
          {university.primaryCta.label}
        </ButtonLink>
        <ButtonLink href={university.secondaryCta.href} variant="outline-light" size="lg" className="h-[50px]">
          {university.secondaryCta.label}
        </ButtonLink>
      </div>
      <ul className="mx-auto mt-14 grid max-w-[900px] gap-5 md:grid-cols-2">
        {university.features.map((feature) => (
          <li
            key={feature.title}
            className="animated-border rounded-2xl border border-ink-border bg-ink-soft p-8"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-ink-border bg-icon-box text-brand">
              <Icon name={feature.icon} size={24} />
            </span>
            <h3 className="mt-5 text-xl font-bold text-white">{feature.title}</h3>
            <p className="mt-3 text-base leading-6 text-white/70">{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
