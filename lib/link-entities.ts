import type { Entity } from '@/content/types';

/** Fragment de texte, éventuellement porteur d'un lien. */
export type TextSegment = { text: string; href?: string };

/** Une lettre ou un chiffre colle au nom : on refuse alors la correspondance. */
const isWordChar = (char: string | undefined) => char !== undefined && /[\p{L}\p{N}]/u.test(char);

type Match = { start: number; end: number; entity: Entity };

function findFirstMatch(text: string, entities: Entity[], used: Set<string>): Match | null {
  let best: Match | null = null;

  for (const entity of entities) {
    if (used.has(entity.name)) continue;
    let from = 0;
    for (;;) {
      const start = text.indexOf(entity.name, from);
      if (start === -1) break;
      const end = start + entity.name.length;
      if (!isWordChar(text[start - 1]) && !isWordChar(text[end])) {
        // À position égale, le nom le plus long gagne : « Hugging Face » avant « Face ».
        if (!best || start < best.start || (start === best.start && end > best.end)) {
          best = { start, end, entity };
        }
        break;
      }
      from = start + 1;
    }
  }

  return best;
}

/**
 * Découpe `text` en fragments, en liant la première occurrence de chaque entité connue.
 * `used` porte la mémoire d'un article : une entité déjà liée ne l'est plus ensuite.
 */
export function linkEntities(text: string, entities: Entity[], used: Set<string>): TextSegment[] {
  const segments: TextSegment[] = [];
  let rest = text;

  for (;;) {
    const match = findFirstMatch(rest, entities, used);
    if (!match) break;

    if (match.start > 0) segments.push({ text: rest.slice(0, match.start) });
    segments.push({ text: rest.slice(match.start, match.end), href: match.entity.href });
    used.add(match.entity.name);
    rest = rest.slice(match.end);
  }

  if (rest.length > 0 || segments.length === 0) segments.push({ text: rest });
  return segments;
}
