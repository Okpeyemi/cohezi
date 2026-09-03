import { cn } from '@/lib/cn';

/** Logos « trusted by » rendus en texte : aucun logo protégé n'est copié. */
export function LogoWordmark({ name, className }: { name: string; className?: string }) {
  return <span className={cn('text-lg font-bold tracking-tight text-white/90', className)}>{name}</span>;
}
