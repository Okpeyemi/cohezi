export const ALL = 'all';

export function filterByCategory<T>(
  items: readonly T[],
  active: string,
  getCategories: (item: T) => readonly string[],
): T[] {
  if (active === ALL) return [...items];
  return items.filter((item) => getCategories(item).includes(active));
}
