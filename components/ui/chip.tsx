import type { IconName } from '@/content/types';
import { cn } from '@/lib/cn';
import { Icon } from './icon';

type ChipProps = {
  label: string;
  icon?: IconName;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Chip({ label, icon, active = false, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-[39px] items-center gap-2 rounded-full border px-3.5 text-[17px] leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:bg-neutral-50',
        className,
      )}
    >
      {icon ? <Icon name={icon} size={16} /> : null}
      <span>{label}</span>
    </button>
  );
}
