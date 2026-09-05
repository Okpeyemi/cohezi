const formatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** « 2026-09-02 » → « 2 septembre 2026 ». Une valeur non datée est renvoyée telle quelle. */
export function formatDateFr(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return formatter.format(date);
}
