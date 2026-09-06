import type { BeforeSendEvent } from '@vercel/analytics';

/**
 * Paramètre porteur des mots saisis par le lecteur dans la recherche du site.
 * Il n'a rien à faire dans une statistique d'audience : une requête peut être
 * intime — une maladie, le nom d'un employeur — et n'apprend rien d'utile ici.
 */
const SEARCH_PARAM = 'q';

/**
 * Retire le terme de recherche de l'URL avant tout envoi à Vercel.
 *
 * En cas d'URL illisible, l'événement est abandonné : mieux vaut perdre une vue
 * que transmettre une adresse qu'on n'a pas su inspecter.
 */
export function redactSearchTerms(event: BeforeSendEvent): BeforeSendEvent | null {
  let url: URL;
  try {
    url = new URL(event.url);
  } catch {
    return null;
  }

  if (!url.searchParams.has(SEARCH_PARAM)) return event;

  url.searchParams.delete(SEARCH_PARAM);
  // `toString` laisserait un « ? » orphelin si la recherche était le seul paramètre.
  const query = url.searchParams.toString();
  return { ...event, url: `${url.origin}${url.pathname}${query ? `?${query}` : ''}${url.hash}` };
}
