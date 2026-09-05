import { describe, expect, it } from 'vitest';
import nextConfig from '@/next.config';

describe('redirects', () => {
  it('sends every former category page to the filtered articles page', async () => {
    const redirects = await nextConfig.redirects!();
    const map = Object.fromEntries(redirects.map((entry) => [entry.source, entry]));

    expect(map['/actualite']!.destination).toBe('/articles?categorie=actualite');
    expect(map['/business']!.destination).toBe('/articles?categorie=business');
    expect(map['/societe']!.destination).toBe('/articles?categorie=societe');
    expect(map['/analyses']!.destination).toBe('/articles?categorie=analyse');
    expect(map['/recherche']!.destination).toBe('/articles');
    expect(redirects).toHaveLength(5);
    for (const entry of redirects) expect(entry.permanent).toBe(true);
  });
});
