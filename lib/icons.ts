import type { IconSvgElement } from '@hugeicons/react';
import {
  ArrowRight01Icon,
  Cancel01Icon,
  InstagramIcon,
  LinkedinIcon,
  Menu01Icon,
  NewTwitterIcon,
  SearchIcon,
  SentIcon,
  TiktokIcon,
} from '@hugeicons/core-free-icons';
import type { IconName } from '@/content/types';

/** Seul point d'accès aux icônes Hugeicons (noms vérifiés sur @hugeicons/core-free-icons 4.3.0). */
export const icons: Record<IconName, IconSvgElement> = {
  menu: Menu01Icon,
  close: Cancel01Icon,
  'arrow-right': ArrowRight01Icon,
  send: SentIcon,
  search: SearchIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  tiktok: TiktokIcon,
  // Hugeicons nomme encore l'icône X « NewTwitter ».
  x: NewTwitterIcon,
};

export function getIcon(name: IconName): IconSvgElement {
  return icons[name];
}
