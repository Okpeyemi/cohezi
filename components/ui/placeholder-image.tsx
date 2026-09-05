import Image from 'next/image';
import type { ImageRef } from '@/content/types';
import { cn } from '@/lib/cn';
import { hashString, hashToGradient, truncateLabel } from '@/lib/placeholder';

type PlaceholderImageProps = {
  image: ImageRef;
  /** Graine du dégradé et texte affiché (titre de la carte). */
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Remplit un parent `relative` qui définit le ratio (aspect-video, aspect-square…). */
export function PlaceholderImage({
  image,
  label,
  className,
  sizes = '(min-width: 1024px) 560px, 100vw',
  priority = false,
}: PlaceholderImageProps) {
  if (image.src) {
    return <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className={cn('object-cover', className)} />;
  }

  const gradient = hashToGradient(label);
  const id = `pg-${hashString(label).toString(36)}`;

  return (
    <svg
      role="img"
      aria-label={image.alt}
      className={cn('absolute inset-0 h-full w-full', className)}
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={gradient.from} />
          <stop offset="1" stopColor={gradient.to} />
        </linearGradient>
        <pattern id={`${id}-lines`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#f7f7f4" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill={`url(#${id})`} />
      <rect width="320" height="180" fill={`url(#${id}-lines)`} />
      <text
        x="160"
        y="95"
        textAnchor="middle"
        fill="#f7f7f4"
        fillOpacity="0.92"
        fontSize="16"
        fontWeight="600"
        fontFamily="var(--font-sans), system-ui, sans-serif"
      >
        {truncateLabel(label)}
      </text>
    </svg>
  );
}
