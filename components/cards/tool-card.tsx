import { Icon } from '@/components/ui/icon';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import type { Tool } from '@/content/types';
import { CardFrame } from './card-frame';

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <CardFrame href={`/tools/${tool.slug}`}>
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <PlaceholderImage image={tool.image} label={tool.name} sizes="(min-width: 1024px) 260px, (min-width: 768px) 50vw, 100vw" />
        <span className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-ink shadow-sm">
          <Icon name={tool.badgeIcon} size={16} />
        </span>
      </div>
      <div className="px-1 pb-1">
        <h3 className="mt-3 text-base font-bold leading-6 text-ink group-hover:underline">{tool.name}</h3>
        <p className="mt-1 line-clamp-3 text-sm leading-5 text-muted">{tool.description}</p>
      </div>
    </CardFrame>
  );
}
