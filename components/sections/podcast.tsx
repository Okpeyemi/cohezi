import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { SectionHeading } from '@/components/ui/section-heading';
import type { PodcastContent } from '@/content/types';

export function Podcast({ podcast }: { podcast: PodcastContent }) {
  const { card } = podcast;
  return (
    <section aria-labelledby="podcast-title" className="px-5 py-20">
      <SectionHeading id="podcast-title" title={podcast.title} subtitle={podcast.description} subtitleClassName="text-xl leading-8" />
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {podcast.listenLinks.map((link) => (
          <ButtonLink key={link.href} href={link.href} variant="outline" size="sm" target="_blank" rel="noreferrer">
            <Icon name={link.icon} size={16} />
            {link.label}
          </ButtonLink>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-[750px] rounded-2xl bg-podcast-card p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md md:h-[382px] md:w-[382px]">
            <PlaceholderImage image={{ alt: card.artworkAlt }} label={card.title} sizes="(min-width: 768px) 382px, 96px" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col md:h-[382px]">
            <p className="flex items-center gap-1 text-xs text-neutral-600">
              <Icon name="podcast" size={12} />
              {card.platformLabel}
            </p>
            <h3 className="mt-2 text-lg font-bold text-ink md:mt-16">{card.title}</h3>
            <p className="text-xs text-muted">{card.meta}</p>
            <p className="mt-3 hidden text-[15px] leading-5 text-neutral-800 md:block">{card.description}</p>
            <div className="mt-4 flex items-center gap-2 md:mt-auto">
              <ButtonLink href={card.ctaHref} variant="ink" className="h-9 rounded-full px-4 text-sm" target="_blank" rel="noreferrer">
                <Icon name="play" size={14} />
                {card.ctaLabel}
              </ButtonLink>
              <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink">
                <Icon name="more" size={16} />
              </span>
            </div>
            <p className="mt-2 text-[10px] text-muted">{card.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
