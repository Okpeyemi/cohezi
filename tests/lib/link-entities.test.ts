import { describe, expect, it } from 'vitest';
import { linkEntities } from '@/lib/link-entities';
import type { Entity } from '@/content/types';

const entities: Entity[] = [
  { name: 'NVIDIA', href: 'https://www.nvidia.com' },
  { name: 'Hugging Face', href: 'https://huggingface.co' },
  { name: 'Next', href: 'https://next.ink' },
];

describe('linkEntities', () => {
  it('leaves a text without any known entity untouched', () => {
    const used = new Set<string>();
    expect(linkEntities('Un texte sans entité connue.', entities, used)).toEqual([
      { text: 'Un texte sans entité connue.' },
    ]);
  });

  it('links an entity and keeps the surrounding text', () => {
    const used = new Set<string>();
    expect(linkEntities('Or NVIDIA a payé.', entities, used)).toEqual([
      { text: 'Or ' },
      { text: 'NVIDIA', href: 'https://www.nvidia.com' },
      { text: ' a payé.' },
    ]);
  });

  it('only links the first occurrence, here and in later calls', () => {
    const used = new Set<string>();
    const first = linkEntities('NVIDIA et encore NVIDIA.', entities, used);
    expect(first.filter((segment) => 'href' in segment)).toHaveLength(1);
    const second = linkEntities('Toujours NVIDIA.', entities, used);
    expect(second).toEqual([{ text: 'Toujours NVIDIA.' }]);
  });

  it('prefers the longest name so a compound is not cut in two', () => {
    const used = new Set<string>();
    const segments = linkEntities('La plateforme Hugging Face.', entities, used);
    expect(segments).toContainEqual({ text: 'Hugging Face', href: 'https://huggingface.co' });
  });

  it('never matches inside a longer word', () => {
    const used = new Set<string>();
    expect(linkEntities('Le mot Nextcloud reste entier.', entities, used)).toEqual([
      { text: 'Le mot Nextcloud reste entier.' },
    ]);
  });

  it('respects the apostrophe and the punctuation as boundaries', () => {
    const used = new Set<string>();
    const segments = linkEntities('L’offre de NVIDIA, refusée.', entities, used);
    expect(segments).toContainEqual({ text: 'NVIDIA', href: 'https://www.nvidia.com' });
  });

  it('links several distinct entities in the same text', () => {
    const used = new Set<string>();
    const segments = linkEntities('NVIDIA rachète Hugging Face.', entities, used);
    expect(segments.filter((segment) => 'href' in segment)).toHaveLength(2);
  });
});
