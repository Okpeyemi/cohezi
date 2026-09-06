'use client';

import { Analytics } from '@vercel/analytics/next';
import { redactSearchTerms } from '@/lib/analytics-redact';

/**
 * Mesure d'audience Vercel.
 *
 * Sans cookie : les visiteurs sont identifiés par un hachage de la requête, abandonné au
 * bout de 24 heures. Le `beforeSend` retire les termes de recherche de l'URL avant l'envoi
 * — la recherche du site les écrit dans `?q=`, et ils appartiennent au lecteur.
 *
 * Le composant est client parce que `beforeSend` est une fonction : elle ne peut pas
 * traverser la frontière serveur.
 */
export function SiteAnalytics() {
  return <Analytics beforeSend={redactSearchTerms} />;
}
