import { NextResponse } from 'next/server';
import { isValidEmail, maskEmail, normalizeEmail } from '@/lib/validate-email';
import { notifySubscription } from '@/lib/newsletter-mail';
import { createRateLimiter } from '@/lib/rate-limit';

// L'envoi SMTP a besoin des API Node : on fixe le runtime explicitement.
export const runtime = 'nodejs';

/**
 * La route déclenche l'envoi d'un courriel vers une adresse fournie par l'appelant.
 * Sans garde, elle servirait à harceler un tiers ou à vider le quota d'envoi.
 */
const limiter = createRateLimiter({ max: 5, windowMs: 10 * 60 * 1000 });

const invalid = () => NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });

function readField(body: unknown, field: string): string {
  if (typeof body !== 'object' || body === null || !(field in body)) return '';
  const value = (body as Record<string, unknown>)[field];
  return typeof value === 'string' ? value : '';
}

/** Première adresse de la chaîne x-forwarded-for : celle du client. */
function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'inconnue';
}

export async function POST(request: Request) {
  // Le plafond est consulté avant toute lecture du corps : une requête malformée
  // répétée doit compter, sinon la garde se contourne en envoyant du charabia.
  const gate = limiter.check(clientIp(request));
  if (!gate.allowed) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(gate.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalid();
  }

  // Champ leurre : invisible pour un lecteur, rempli par les robots qui remplissent tout.
  // On répond « c'est bon » sans rien faire — inutile de leur apprendre qu'ils sont repérés.
  if (readField(body, 'site').trim() !== '') {
    console.info('[newsletter] honeypot rempli, inscription ignorée');
    return NextResponse.json({ ok: true });
  }

  const email = normalizeEmail(readField(body, 'email'));
  if (!isValidEmail(email)) return invalid();

  const result = await notifySubscription(email, process.env);

  if (!result.delivered && result.reason === 'send_failed') {
    // L'inscription n'a été enregistrée nulle part : le dire plutôt que de faire semblant.
    console.error(`[newsletter] delivery failed for ${maskEmail(email)}`);
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }

  if (!result.delivered) {
    console.warn(`[newsletter] SMTP non configuré, inscription non transmise : ${maskEmail(email)}`);
  } else {
    console.info(`[newsletter] subscription forwarded for ${maskEmail(email)}`);
  }

  return NextResponse.json({ ok: true });
}
