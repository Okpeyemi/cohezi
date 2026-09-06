type RateLimitOptions = {
  /** Tentatives autorisées dans la fenêtre. */
  max: number;
  windowMs: number;
  /** Horloge injectable, pour que les tests n'aient pas à attendre. */
  clock?: () => number;
};

export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfterSeconds: number };

/**
 * Plafond glissant par clé, en mémoire.
 *
 * Sur une plateforme sans serveur, chaque instance a sa propre mémoire : la protection
 * est donc partielle et vise l'abus répété depuis une même machine, pas une attaque
 * distribuée. Un plafond étanche demanderait un stockage partagé.
 */
export function createRateLimiter({ max, windowMs, clock = Date.now }: RateLimitOptions) {
  const hits = new Map<string, number[]>();

  return {
    check(key: string): RateLimitResult {
      const now = clock();
      const since = now - windowMs;

      // On profite de chaque appel pour oublier les clés devenues inutiles,
      // sinon la table grossirait indéfiniment sur une instance de longue durée.
      for (const [k, times] of hits) {
        const kept = times.filter((t) => t > since);
        if (kept.length === 0) hits.delete(k);
        else hits.set(k, kept);
      }

      const times = hits.get(key) ?? [];
      if (times.length >= max) {
        const oldest = times[0]!;
        return { allowed: false, retryAfterSeconds: Math.ceil((oldest + windowMs - now) / 1000) };
      }

      times.push(now);
      hits.set(key, times);
      return { allowed: true, remaining: max - times.length };
    },

    /** Nombre de clés encore suivies. Sert à vérifier que la purge fonctionne. */
    size: () => hits.size,
  };
}
