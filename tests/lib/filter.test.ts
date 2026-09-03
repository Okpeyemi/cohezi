import { describe, expect, it } from 'vitest';
import { ALL, filterByCategory } from '@/lib/filter';

type Item = { id: number; cats: string[] };
const items: Item[] = [
  { id: 1, cats: ['coding'] },
  { id: 2, cats: ['design', 'coding'] },
  { id: 3, cats: ['finance'] },
];
const getCats = (item: Item) => item.cats;

describe('filterByCategory', () => {
  it('returns a copy of every item for ALL', () => {
    const result = filterByCategory(items, ALL, getCats);
    expect(result).toEqual(items);
    expect(result).not.toBe(items);
  });

  it('keeps only items that include the active category', () => {
    expect(filterByCategory(items, 'coding', getCats).map((i) => i.id)).toEqual([1, 2]);
  });

  it('returns an empty array for an unknown category', () => {
    expect(filterByCategory(items, 'legal', getCats)).toEqual([]);
  });

  it('does not mutate the input', () => {
    const snapshot = JSON.stringify(items);
    filterByCategory(items, 'design', getCats);
    expect(JSON.stringify(items)).toBe(snapshot);
  });
});
