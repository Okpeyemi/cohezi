import { entities } from '@/content/entities';
import type { ArticleBlock, ArticlePerspective } from '@/content/types';
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
        <p
          data-block="paragraph"
          className={cn('text-left text-lg leading-8 text-ink/85', margin)}
        >
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
        <aside
          data-block="takeaway"
          className={cn('rounded-2xl border border-line bg-ink/[0.03] p-6 md:p-7', margin)}
        >
          <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
            L’essentiel en 30 secondes
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

type PerspectiveSectionProps = {
  title: string;
  items: string[];
};

function PerspectiveSection({ title, items }: PerspectiveSectionProps) {
  return (
    <section data-block="perspective" className="border-t border-line pt-6 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-7 text-ink/80">
            <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ArticlePerspectivePanel({ perspective }: { perspective: ArticlePerspective }) {
  return (
    <aside aria-labelledby="cohezi-perspective" className="mt-14 rounded-2xl border border-line bg-ink/[0.025] p-6 md:p-8">
      <p
        id="cohezi-perspective"
        className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/55"
      >
        Le regard COHEZI
      </p>
      <div className="mt-6 space-y-7">
        <PerspectiveSection title="Pourquoi ça compte" items={perspective.whyItMatters} />
        <PerspectiveSection title="Concrètement, qu’est-ce qui change ?" items={perspective.whatChanges} />
        <PerspectiveSection title="La suite à surveiller" items={perspective.watch} />
        {perspective.africaAndFrancophonie?.length ? (
          <PerspectiveSection title="En Afrique et dans la francophonie" items={perspective.africaAndFrancophonie} />
        ) : null}
      </div>
    </aside>
  );
}

export function ArticleBody({ blocks, perspective }: { blocks: ArticleBlock[]; perspective: ArticlePerspective }) {
  // Le résumé doit donner la valeur de l'article avant la lecture longue.
  const takeaways = blocks.filter((block) => block.type === 'takeaway');
  const factualBlocks = blocks.filter((block) => block.type !== 'takeaway');
  const visibleBlocks = [...takeaways, ...factualBlocks];

  // Une seule mémoire pour tout l'article : chaque organisation n'est liée qu'une fois.
  // Le découpage est fait avant le rendu, pour ne dépendre d'aucun ordre d'exécution.
  const used = new Set<string>();
  const prose = visibleBlocks.map((block) =>
    block.type === 'paragraph' ? linkEntities(block.text, entities, used) : undefined,
  );

  return (
    <div className="mx-auto max-w-[680px]">
      {takeaways.length ? (
        <div className="mb-14">
          {takeaways.map((block, index) => (
            <Block key={`takeaway-${index}`} block={block} first={index === 0} />
          ))}
        </div>
      ) : null}
      {factualBlocks.map((block, index) => {
        const visibleIndex = takeaways.length + index;
        return (
          <Block
            key={`${block.type}-${index}`}
            block={block}
            first={index === 0}
            segments={prose[visibleIndex]}
          />
        );
      })}
      <ArticlePerspectivePanel perspective={perspective} />
    </div>
  );
}
