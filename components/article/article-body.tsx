import type { ArticleBlock } from '@/content/types';
import { cn } from '@/lib/cn';

/** Marge haute d'un bloc selon son type ; le premier bloc n'en a jamais. */
const TOP_MARGIN: Record<ArticleBlock['type'], string> = {
  paragraph: 'mt-6',
  heading: 'mt-12',
  quote: 'mt-8',
  list: 'mt-6',
  takeaway: 'mt-10',
};

function Block({ block, first }: { block: ArticleBlock; first: boolean }) {
  const margin = first ? '' : TOP_MARGIN[block.type];

  switch (block.type) {
    case 'paragraph':
      return (
        <p data-block="paragraph" className={cn('text-lg leading-8 text-ink/85', margin)}>
          {block.text}
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
  return (
    <div className="mx-auto max-w-[680px]">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} first={index === 0} />
      ))}
    </div>
  );
}
