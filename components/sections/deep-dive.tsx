import Link from 'next/link';
import { articleHref } from '@/components/cards/article-card';
import { Icon } from '@/components/ui/icon';
import type { Article, DeepDiveCopy } from '@/content/types';

type DeepDiveProps = { copy: DeepDiveCopy; article: Article };

/** Bloc éditorial sombre, à la place du bloc podcast du clone. */
export function DeepDive({ copy, article }: DeepDiveProps) {
  return (
    <section aria-labelledby="deep-dive-title" className="px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl rounded-2xl bg-ink px-8 py-16 text-paper md:px-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
              <span aria-hidden className="h-2 w-2 bg-accent" />
              {copy.eyebrow}
            </p>
            <p className="mt-6 font-display text-6xl font-bold leading-none text-accent md:text-[96px]">{copy.number}</p>
          </div>
          <div>
            <h2
              id="deep-dive-title"
              className="font-display text-[28px] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-paper md:text-[40px]"
            >
              {article.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-7 text-paper/70">{article.excerpt}</p>
            <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">
              {article.readingMinutes} {copy.readLabel}
            </p>
            <Link
              href={articleHref(article)}
              className="group mt-6 inline-flex items-center gap-2 font-semibold text-accent transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {copy.ctaLabel}
              <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
