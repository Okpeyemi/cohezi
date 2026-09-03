import { HugeiconsIcon } from '@hugeicons/react';
import type { IconName } from '@/content/types';
import { getIcon } from '@/lib/icons';

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Avec un libellé l'icône devient une image accessible ; sans, elle est décorative. */
  label?: string;
};

export function Icon({ name, size = 20, strokeWidth = 1.8, className, label }: IconProps) {
  return (
    <HugeiconsIcon
      icon={getIcon(name)}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      data-icon={name}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  );
}
