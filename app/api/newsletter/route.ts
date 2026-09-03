import { NextResponse } from 'next/server';
import { isValidEmail, maskEmail, normalizeEmail } from '@/lib/validate-email';

const invalid = () => NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });

function readEmail(body: unknown): string {
  if (typeof body !== 'object' || body === null || !('email' in body)) return '';
  return normalizeEmail((body as { email: unknown }).email);
}

/** Inscription simulée : aucune persistance, aucun fournisseur. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalid();
  }

  const email = readEmail(body);
  if (!isValidEmail(email)) return invalid();

  console.info(`[newsletter] simulated subscription for ${maskEmail(email)}`);
  return NextResponse.json({ ok: true });
}
