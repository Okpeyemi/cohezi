type SectionHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  articleCount: number;
};

/** Bandeau sombre d'une page de liste, sur le gabarit du hero de l'accueil. */
export function SectionHero({ eyebrow, title, description, articleCount }: SectionHeroProps) {
  const countLabel = `${articleCount} ${articleCount > 1 ? 'articles' : 'article'}`;

  return (
    <section aria-labelledby="section-title" className="hero-dark-change px-5 pb-16 pt-20 text-center md:pt-24">
      <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
        <span aria-hidden className="h-2 w-2 bg-accent" />
        {eyebrow}
      </p>
      <h1
        id="section-title"
        className="mx-auto mt-6 max-w-4xl font-display text-[32px] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-paper md:text-5xl"
      >
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-[560px] text-lg leading-7 text-paper/80">{description}</p>
      <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">{countLabel}</p>
    </section>
  );
}
