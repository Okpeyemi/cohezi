import nodemailer from 'nodemailer';

/** Boîte Hostinger en catch-all : toute adresse du domaine arrive au même endroit. */
const DEFAULTS = { host: 'smtp.hostinger.com', port: 465, to: 'news@cohezi.io' } as const;

export type MailConfig = {
  host: string;
  port: number;
  /** Le port 465 impose TLS d'emblée ; les autres passent par STARTTLS. */
  secure: boolean;
  user: string;
  password: string;
  from: string;
  to: string;
};

export type DeliveryResult = { delivered: true } | { delivered: false; reason: 'not_configured' | 'send_failed' };

type Env = Record<string, string | undefined>;
type Sender = { sendMail: (message: Record<string, unknown>) => Promise<unknown> };

/** `null` si les identifiants manquent : l'inscription reste acceptée, mais rien n'est envoyé. */
export function readMailConfig(env: Env): MailConfig | null {
  const user = env.SMTP_USER;
  const password = env.SMTP_PASSWORD;
  if (!user || !password) return null;

  const port = env.SMTP_PORT ? Number(env.SMTP_PORT) : DEFAULTS.port;
  if (!Number.isInteger(port) || port <= 0) return null;

  return {
    host: env.SMTP_HOST ?? DEFAULTS.host,
    port,
    secure: port === 465,
    user,
    password,
    from: env.NEWSLETTER_FROM ?? user,
    to: env.NEWSLETTER_TO ?? DEFAULTS.to,
  };
}

function defaultSender(config: MailConfig): Sender {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
  }) as unknown as Sender;
}

/**
 * Prévient la rédaction d'une nouvelle inscription. N'échoue jamais bruyamment :
 * l'appelant décide quoi répondre au lecteur selon le résultat.
 */
export async function notifySubscription(
  email: string,
  env: Env,
  createSender: (config: MailConfig) => Sender = defaultSender,
): Promise<DeliveryResult> {
  const config = readMailConfig(env);
  if (!config) return { delivered: false, reason: 'not_configured' };

  try {
    await createSender(config).sendMail({
      from: config.from,
      to: config.to,
      replyTo: email,
      subject: `Inscription newsletter : ${email}`,
      text: `Nouvelle inscription à la newsletter Cohezi.\n\nAdresse : ${email}\nReçue le : ${new Date().toISOString()}\n`,
    });
    return { delivered: true };
  } catch {
    return { delivered: false, reason: 'send_failed' };
  }
}
