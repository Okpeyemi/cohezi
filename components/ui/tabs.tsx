import { cn } from '@/lib/cn';

type TabsProps = {
  items: { slug: string; label: string }[];
  active: string;
  onChange: (slug: string) => void;
  ariaLabel: string;
};

export function Tabs({ items, active, onChange, ariaLabel }: TabsProps) {
  return (
    <div role="group" aria-label={ariaLabel} className="inline-flex items-center gap-1 rounded-xl border border-line bg-paper p-1">
      {items.map((item) => {
        const isActive = item.slug === active;
        return (
          <button
            key={item.slug}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(item.slug)}
            className={cn(
              'h-[33px] rounded-lg px-4 font-sans text-[15px] leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-line/60',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
