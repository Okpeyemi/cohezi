import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  id: string;
  title: string;
  subtitle?: string;
  tone?: 'light' | 'dark';
  className?: string;
  subtitleClassName?: string;
};

export function SectionHeading({ id, title, subtitle, tone = 'light', className, subtitleClassName }: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      <h2
        id={id}
        className={cn('text-[32px] font-bold leading-none tracking-[-0.025em] md:text-5xl', dark ? 'text-white' : 'text-ink')}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn('mt-4 text-lg leading-7', dark ? 'text-white/80' : 'text-neutral-700', subtitleClassName)}>{subtitle}</p>
      ) : null}
    </div>
  );
}
