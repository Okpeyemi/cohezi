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
        className={cn('font-display text-[32px] font-bold uppercase leading-none tracking-[-0.01em] md:text-5xl', dark ? 'text-paper' : 'text-ink')}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn('mt-4 text-lg leading-7', dark ? 'text-paper/80' : 'text-ink/80', subtitleClassName)}>{subtitle}</p>
      ) : null}
    </div>
  );
}
