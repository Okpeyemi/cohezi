/**
 * Domaine canonique de production, utilisé quand NEXT_PUBLIC_SITE_URL n'est pas défini.
 * C'est bien `www` : cohezi.io y redirige en 308, et viser la redirection ferait rebondir
 * le lecteur juste après son clic de confirmation.
 */
const SITE_URL = 'https://www.cohezi.io';
const DOI_ENDPOINT = 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation';

export type BrevoConfig = {
  apiKey: string;
  listId: number;
  templateId: number;
  /** Page d'atterrissage après le clic de confirmation. */
  redirectionUrl: string;
};

export type SubscriptionResult =
  /** Brevo a accepté : le courriel de confirmation part, le contact n'existe pas encore. */
  | { status: 'pending' }
  | { status: 'not_configured' }
  | { status: 'failed'; reason: string };

type Env = Record<string, string | undefined>;
type Fetcher = (url: string, init: { method: string; headers: Record<string, string>; body: string }) => Promise<Response>;

function positiveInteger(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

/** `null` si un réglage manque : l'inscription est alors refusée franchement, pas simulée. */
export function readBrevoConfig(env: Env): BrevoConfig | null {
  const apiKey = env.BREVO_API_KEY;
  const listId = positiveInteger(env.BREVO_LIST_ID);
  const templateId = positiveInteger(env.BREVO_DOI_TEMPLATE_ID);
  if (!apiKey || listId === null || templateId === null) return null;

  const base = (env.NEXT_PUBLIC_SITE_URL || SITE_URL).replace(/\/+$/, '');
  return { apiKey, listId, templateId, redirectionUrl: `${base}/newsletter/confirmee` };
}

/**
 * Demande à Brevo d'envoyer le courriel de confirmation.
 *
 * Le contact n'est ajouté à la liste qu'après le clic : c'est ce clic, horodaté par Brevo,
 * qui constitue la preuve du consentement exigée par le RGPD.
 */
export async function subscribeToNewsletter(
  email: string,
  env: Env,
  fetcher: Fetcher = globalThis.fetch,
): Promise<SubscriptionResult> {
  const config = readBrevoConfig(env);
  if (!config) return { status: 'not_configured' };

  try {
    const response = await fetcher(DOI_ENDPOINT, {
      method: 'POST',
      headers: { 'api-key': config.apiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        email,
        includeListIds: [config.listId],
        templateId: config.templateId,
        redirectionUrl: config.redirectionUrl,
      }),
    });

    if (response.ok) return { status: 'pending' };

    const body = (await response.json().catch(() => ({}))) as { code?: string; message?: string };

    // Une adresse déjà inscrite n'est pas une erreur pour le lecteur, et le lui dire
    // révélerait qui figure dans la liste. On répond comme pour une inscription neuve.
    if (body.code === 'duplicate_parameter') return { status: 'pending' };

    return { status: 'failed', reason: body.message ?? `HTTP ${response.status}` };
  } catch (error) {
    return { status: 'failed', reason: error instanceof Error ? error.message : 'erreur inconnue' };
  }
}
