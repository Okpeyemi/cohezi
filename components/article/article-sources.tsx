import type { Source } from '@/content/types';
import { formatDateFr } from '@/lib/format-date';

export function ArticleSources({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;

  return (
    <section aria-labelledby="sources-title" className="mt-14 border-t border-line pt-8">
      <h2
        id="sources-title"
        className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink/60"
      >
        Sources
      </h2>
      <ul className="mt-5 space-y-4">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block text-[15px] leading-6"
            >
              <span className="font-semibold text-ink group-hover:text-accent">{source.outlet}</span>
              <span aria-hidden className="text-ink/40">{' · '}</span>
              <span className="text-ink/80">{source.title}</span>
              <span aria-hidden className="text-ink/40">{' · '}</span>
              <span className="text-ink/50">{formatDateFr(source.publishedAt)}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
