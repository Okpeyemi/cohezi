import { NextResponse } from 'next/server';
import { isValidEmail, maskEmail, normalizeEmail } from '@/lib/validate-email';
import { notifySubscription } from '@/lib/newsletter-mail';

// L'envoi SMTP a besoin des API Node : on fixe le runtime explicitement.
export const runtime = 'nodejs';

const invalid = () => NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });

function readEmail(body: unknown): string {
  if (typeof body !== 'object' || body === null || !('email' in body)) return '';
  return normalizeEmail((body as { email: unknown }).email);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalid();
  }

  const email = readEmail(body);
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
