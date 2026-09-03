import { PlaceholderImage } from '@/components/ui/placeholder-image';
import type { Guide } from '@/content/types';
import { CardFrame } from './card-frame';

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <CardFrame href={`/guides/${guide.slug}`}>
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <PlaceholderImage image={guide.image} label={guide.title} sizes="(min-width: 1024px) 260px, (min-width: 768px) 50vw, 100vw" />
      </div>
      <h3 className="mt-3 px-1 pb-1 text-base font-bold leading-6 text-ink group-hover:underline">{guide.title}</h3>
    </CardFrame>
  );
}
