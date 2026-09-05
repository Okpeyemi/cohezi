import Image from 'next/image';
import { cn } from '@/lib/cn';

type CoheziLogoProps = {
  tone: 'dark' | 'light';
  size?: 'header' | 'footer';
  className?: string;
};

/** Lockups transparents : 1268 × 544 px. 120 px de large (minimum de la charte) ⇒ 51 px de haut. */
const HEADER_LOCKUP = { width: 120, height: 51 };
const FOOTER_LOCKUP = { width: 160, height: 69 };

/**
 * Logo Cohezi. Les images sont décoratives (`alt=""`) : le lien qui les entoure porte
 * l'aria-label. Sur le ton sombre, les deux lockups sont rendus et la bascule au défilement
 * (`body.hero-light`) affiche le noir à la place du blanc via `hero-light-hidden` / `hero-light-only`.
 */
export function CoheziLogo({ tone, size = 'header', className }: CoheziLogoProps) {
  if (size === 'footer') {
    return (
      <Image
        src="/brand/cohezi-lockup-noir.png"
        alt=""
        width={FOOTER_LOCKUP.width}
        height={FOOTER_LOCKUP.height}
        unoptimized
        className={cn('h-auto w-40', className)}
      />
    );
  }

  const lockup = (variant: 'blanc' | 'noir', extra?: string) => (
    <span data-variant={variant} className={cn('hidden items-center md:inline-flex', extra)}>
      <Image
        src={`/brand/cohezi-lockup-${variant}.png`}
        alt=""
        width={HEADER_LOCKUP.width}
        height={HEADER_LOCKUP.height}
        priority
        unoptimized
        className="h-[51px] w-[120px]"
      />
    </span>
  );

  return (
    <span className={cn('inline-flex items-center', className)}>
      {tone === 'dark' ? lockup('blanc', 'hero-light-hidden') : null}
      {tone === 'dark' ? lockup('noir', 'hero-light-only') : lockup('noir')}
      <span className="inline-flex items-center gap-2 md:hidden">
        <Image src="/brand/cohezi-symbole-vert.png" alt="" width={32} height={32} priority unoptimized className="h-8 w-8" />
        <Image
          src={tone === 'dark' ? '/brand/cohezi-logotype-blanc.png' : '/brand/cohezi-logotype-noir.png'}
          alt=""
          width={53}
          height={24}
          priority
          unoptimized
          className="h-6 w-auto"
        />
      </span>
    </span>
  );
}
