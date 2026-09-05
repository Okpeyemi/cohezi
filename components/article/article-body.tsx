import { entities } from '@/content/entities';
import type { ArticleBlock } from '@/content/types';
import { cn } from '@/lib/cn';
import { linkEntities, type TextSegment } from '@/lib/link-entities';

/** Marge haute d'un bloc selon son type ; le premier bloc n'en a jamais. */
const TOP_MARGIN: Record<ArticleBlock['type'], string> = {
  paragraph: 'mt-6',
  heading: 'mt-12',
  quote: 'mt-8',
  list: 'mt-6',
  takeaway: 'mt-10',
};

/** Rend un paragraphe en liant la première mention de chaque organisation connue. */
function Prose({ segments }: { segments: TextSegment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        segment.href ? (
          <a
            key={`${segment.text}-${index}`}
            href={segment.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-4 transition-colors hover:decoration-accent hover:text-accent"
          >
            {segment.text}
          </a>
        ) : (
          <span key={`t-${index}`}>{segment.text}</span>
        ),
      )}
    </>
  );
}

function Block({ block, first, segments }: { block: ArticleBlock; first: boolean; segments?: TextSegment[] }) {
  const margin = first ? '' : TOP_MARGIN[block.type];

  switch (block.type) {
    case 'paragraph':
      return (
        <p data-block="paragraph" className={cn('text-lg leading-8 text-ink/85', margin)}>
          {segments ? <Prose segments={segments} /> : block.text}
        </p>
      );
    case 'heading':
      return (
        <h2 data-block="heading" className={cn('font-display text-2xl font-semibold text-ink', margin)}>
          {block.text}
        </h2>
      );
    case 'quote':
      return (
        <blockquote data-block="quote" className={cn('border-l-2 border-accent pl-5', margin)}>
          <p className="text-xl italic leading-8 text-ink">{block.text}</p>
          {block.author ? <p className="mt-2 text-[13px] not-italic text-ink/60">— {block.author}</p> : null}
        </blockquote>
      );
    case 'list':
      return (
        <ul data-block="list" className={cn('space-y-3', margin)}>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-[30px] text-ink/85">
              <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'takeaway':
      return (
        <aside data-block="takeaway" className={cn('rounded-2xl border border-line bg-ink/[0.03] p-6', margin)}>
          <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
            {block.title}
          </p>
          <ul className="mt-4 space-y-2">
            {block.items.map((item) => (
              <li key={item} className="text-base leading-7 text-ink/80">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      );
  }
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  // Une seule mémoire pour tout l'article : chaque organisation n'est liée qu'une fois.
  // Le découpage est fait avant le rendu, pour ne dépendre d'aucun ordre d'exécution.
  const used = new Set<string>();
  const prose = blocks.map((block) =>
    block.type === 'paragraph' ? linkEntities(block.text, entities, used) : undefined,
  );

  return (
    <div className="mx-auto max-w-[680px]">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} first={index === 0} segments={prose[index]} />
      ))}
    </div>
  );
}
