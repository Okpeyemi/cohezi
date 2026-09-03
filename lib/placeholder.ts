export type Gradient = { from: string; to: string; angle: number };

/** FNV-1a 32 bits : rapide, déterministe, bonne dispersion pour des titres courts. */
export function hashString(seed: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

export function hashToGradient(seed: string): Gradient {
  const hue = hashString(seed) % 360;
  return {
    from: `hsl(${hue} 55% 45%)`,
    to: `hsl(${(hue + 40) % 360} 55% 60%)`,
    angle: 135,
  };
}

export function truncateLabel(label: string, max = 28): string {
  if (label.length <= max) return label;
  return `${label.slice(0, max - 1).trimEnd()}…`;
}
