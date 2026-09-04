# Refonte Cohezi de la page d'accueil — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer le clone The Rundown déjà codé en page d'accueil Cohezi (identité, contenu, sections éditoriales) sans toucher à la structure, aux grilles ni aux comportements existants.

**Architecture:** Adaptation en place. Les tokens Tailwind, les polices et le logo changent d'abord (Task 1, projet vert). Le modèle de contenu est ensuite remplacé d'un bloc avec les cartes et les sélecteurs (Task 2), puis chaque section du clone est réécrite ou remplacée par son équivalent Cohezi (Tasks 3 à 6) ; l'assemblage de la page remet `typecheck`, `lint` et `build` au vert (Task 7) avant la QA visuelle (Task 8). Entre Task 2 et Task 7, `pnpm typecheck` et certains tests sont attendus rouges : la liste exacte est donnée à chaque tâche.

**Tech Stack:** Next 16.3 (App Router) · React 19.2 · TypeScript strict · Tailwind CSS 4.3 · `next/font/google` (Inter, Space Grotesk) · `@hugeicons/react` + `core-free-icons` · Vitest 5 + Testing Library · pnpm.

**Spec:** `docs/superpowers/specs/2026-09-04-cohezi-rebrand-design.md` (guide de marque : `cohezi-homepage-spec-corrige.md` ; logos : `logos-png/`).

## Global Constraints

- Gestionnaire de paquets : **pnpm**. Aucune dépendance ajoutée (polices via `next/font/google`, aucun paquet Fontsource sauf si le build ne peut pas joindre Google Fonts : voir Task 1 Step 2b).
- Branche de travail : `feat/cohezi-rebrand` créée depuis `main` (tag `rundown-replica-v1` déjà posé sur la réplique).
- Palette exclusive (spec §4) : `--color-ink #111111`, `--color-ink-soft #1a1a1a`, `--color-paper #f7f7f4`, `--color-accent #7cff6b`, `--color-accent-deep #123c2a`, `--color-muted #8a8a8a`, `--color-line #e2e2de`, `--color-line-dark #2a2a2a`. **Aucun `bg-white`, `text-white`, `neutral-*`, dégradé (`*-gradient`) ni halo animé** dans `components/` et `app/` à la fin de Task 7. Les chemins d'assets `/brand/…` et la fonction `hashToGradient` de `lib/placeholder.ts` sont les seules occurrences autorisées des mots « brand » et « gradient ».
- Vert (`accent`) uniquement pour : carré des eyebrows et du H1, repère des badges de catégorie, soulignement de nav au survol, numéro du Décryptage, lien « Lire le décryptage », bouton du bloc newsletter, anneau de focus. Jamais de texte vert sur fond clair (utiliser `accent-deep`).
- Polices : `font-display` (Space Grotesk) pour H1, titres de sections, titres d'articles, numéro du Décryptage, promesse du hero ; `font-sans` (Inter) partout ailleurs.
- Logo : uniquement les fichiers copiés dans `public/brand/` (Task 1) ; lockup ≥ 120 px de large ; jamais de capitales dans le mot, ni contour, ni ombre.
- Contenu : tout texte éditorial vient de `content/*.ts`. Chaînes techniques françaises autorisées dans les composants, et seulement celles-ci : « min de lecture », « Ouvrir le menu », « Fermer le menu », « Menu », « Navigation principale », « Navigation mobile », « Filtrer les articles », « Toutes », « Rien pour le moment. », « Adresse e-mail », les trois messages `MESSAGES` du formulaire, « Cette page arrive bientôt. », « Retour à l’accueil », « Page introuvable », « Bientôt disponible », « Réseaux sociaux », « , accueil » (suffixe d'aria-label du logo).
- Apostrophes typographiques `’` dans tout le contenu et les tests (jamais `'` dans une phrase française).
- Tests dans `tests/`, imports explicites depuis `vitest`. `pnpm test` vert à la fin de chaque tâche **pour les fichiers listés dans la tâche** ; `pnpm typecheck`, `pnpm lint`, `pnpm build` verts à la fin des Tasks 1, 7 et 8.
- Commits : un par tâche minimum, message conventionnel en français, suffixe `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. Cocher les cases du plan au fil de l'eau et inclure le plan dans chaque commit.
- Serveur local : ne jamais tuer un processus non lancé par la tâche. Vérifier `curl -s -o /dev/null http://localhost:3000` avant d'en démarrer un ; l'utilisateur laisse souvent son propre `next dev` ouvert.

---

## Carte des fichiers

| Fichier | Action | Responsabilité | Tâche |
|---|---|---|---|
| `public/brand/*.png`, `app/icon.png`, `app/apple-icon.png` | créer | assets de marque | 1 |
| `public/fonts/satoshi/` | supprimer | police Rundown | 1 |
| `app/fonts.ts`, `app/globals.css`, `app/layout.tsx` | réécrire | polices, tokens, coquille FR | 1 |
| `components/ui/button.tsx` | modifier | variantes `ink`, `paper`, `accent`, `outline`, `outline-light` | 1 |
| `components/ui/cohezi-logo.tsx` | créer | logo (lockups, symbole, logotype) | 1 |
| `components/**` (sed couleurs) | modifier | fin des blancs purs et des gris neutral | 1 |
| `content/types.ts`, `content/categories.ts`, `content/site.ts`, `content/articles.ts` | réécrire | modèle et contenu Cohezi | 2 |
| `content/guides.ts`, `tools.ts`, `podcast.ts`, `university.ts` | supprimer | contenu Rundown | 2 |
| `lib/icons.ts`, `lib/articles.ts`, `lib/format-date.ts`, `lib/placeholder.ts` | modifier/créer | icônes, sélecteurs, date FR, palette placeholder | 2 |
| `components/ui/category-badge.tsx` | créer | badge de catégorie | 2 |
| `components/cards/article-card.tsx`, `card-frame.tsx`, `components/ui/placeholder-image.tsx`, `filterable-grid.tsx`, `section-heading.tsx` | modifier | cartes et primitives adaptées | 2 |
| `components/sections/guides.tsx`, `trending-tools.tsx`, `podcast.tsx`, `university-cta.tsx`, `components/cards/guide-card.tsx`, `tool-card.tsx`, `components/ui/chip.tsx` | supprimer | sections et cartes Rundown | 2 |
| `components/layout/site-header.tsx`, `mobile-menu.tsx`, `site-footer.tsx` ; `components/ui/brand-logo.tsx` (suppr.) | modifier | header, menu, footer Cohezi | 3 |
| `components/sections/hero.tsx` ; `components/ui/logo-wordmark.tsx` (suppr.) | modifier | hero Cohezi | 4 |
| `components/sections/latest-articles.tsx`, `article-grid-section.tsx` | modifier/créer | À la une, Business, Société | 5 |
| `components/sections/deep-dive.tsx`, `newsletter-cta.tsx`, `components/ui/newsletter-form.tsx` | créer/modifier | Décryptage, bloc newsletter | 6 |
| `app/page.tsx`, `app/[...slug]/page.tsx`, `app/not-found.tsx` | réécrire | assemblage, pages FR | 7 |
| spec (statut), mémoire, QA | — | livraison | 8 |

---

### Task 1 : Fondations visuelles — polices, tokens, marque, boutons

**Files:**
- Create: `public/brand/cohezi-lockup-blanc.png`, `public/brand/cohezi-lockup-noir.png`, `public/brand/cohezi-logotype-blanc.png`, `public/brand/cohezi-logotype-noir.png`, `public/brand/cohezi-symbole-vert.png`, `app/icon.png`, `app/apple-icon.png`, `components/ui/cohezi-logo.tsx`
- Delete: `public/fonts/satoshi/`
- Modify: `app/fonts.ts`, `app/globals.css`, `app/layout.tsx`, `components/ui/button.tsx`, tous les `components/**/*.tsx` et `app/**/*.tsx` (remplacements de classes de couleur)
- Test: `tests/components/ui/cohezi-logo.test.tsx`, `tests/components/ui/button.test.tsx`, `tests/components/ui/section-heading.test.tsx`

**Interfaces:**
- Produces : utilitaires `bg-ink`, `bg-ink-soft`, `bg-paper`, `bg-accent`, `bg-accent-deep`, `text-muted`, `text-accent`, `text-accent-deep`, `border-line`, `border-line-dark`, `ring-accent`, `font-sans`, `font-display`, `rounded-sheet` ; classes CSS `hero-light-hidden` / `hero-light-only` (commutées par `body.hero-light` à partir de 768 px) ; `CoheziLogo({ tone: 'dark' | 'light'; size?: 'header' | 'footer'; className?: string })` ; `Button` / `ButtonLink` avec `variant: 'ink' | 'paper' | 'accent' | 'outline' | 'outline-light'` ; exports `inter` et `spaceGrotesk` depuis `app/fonts.ts`.

- [ ] **Step 1 : branche et assets de marque**

```bash
cd /home/darellchooks/Documents/cohezi
git checkout -b feat/cohezi-rebrand
mkdir -p public/brand
cp logos-png/lockup/cohezi-lockup-transparent-blanc.png public/brand/cohezi-lockup-blanc.png
cp logos-png/lockup/cohezi-lockup-transparent-noir.png  public/brand/cohezi-lockup-noir.png
cp logos-png/logotype/cohezi-logotype-blanc.png         public/brand/cohezi-logotype-blanc.png
cp logos-png/logotype/cohezi-logotype-noir.png          public/brand/cohezi-logotype-noir.png
cp logos-png/symbole/cohezi-symbole-vert-64.png         public/brand/cohezi-symbole-vert.png
cp logos-png/app-icon/cohezi-app-256.png                app/icon.png
cp logos-png/app-icon/cohezi-app-256.png                app/apple-icon.png
git rm -rq public/fonts/satoshi
ls -la public/brand app/icon.png app/apple-icon.png
```
Expected : 5 PNG dans `public/brand/` (1268×544, 1268×544, 808×368, 808×368, 64×64), `app/icon.png` et `app/apple-icon.png` de 256×256, plus de dossier `public/fonts`.

- [ ] **Step 2 : `app/fonts.ts` (Inter + Space Grotesk, variables)**

```ts
import { Inter, Space_Grotesk } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
```

- [ ] **Step 2b (repli, uniquement si `pnpm build` échoue au Step 9 avec une erreur réseau `next/font`)**

```bash
pnpm add @fontsource-variable/inter @fontsource-variable/space-grotesk
```
Puis `app/fonts.ts` :
```ts
import localFont from 'next/font/local';

export const inter = localFont({
  src: '../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  variable: '--font-inter',
  display: 'swap',
});

export const spaceGrotesk = localFont({
  src: '../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',
  variable: '--font-space-grotesk',
  display: 'swap',
});
```
Les noms d'export et les variables CSS restent identiques ; noter le repli dans le message de commit.

- [ ] **Step 3 : `app/globals.css` (contenu complet)**

```css
@import "tailwindcss";

@theme {
  --color-ink: #111111;
  --color-ink-soft: #1a1a1a;
  --color-paper: #f7f7f4;
  --color-accent: #7cff6b;
  --color-accent-deep: #123c2a;
  --color-muted: #8a8a8a;
  --color-line: #e2e2de;
  --color-line-dark: #2a2a2a;
  --radius-sheet: 28.8px;
}

@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-space-grotesk), var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    ::before,
    ::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
}

/* Variantes de logo commutées par la bascule sombre → clair. Hors @layer : doit l'emporter sur les utilitaires. */
.hero-light-only {
  display: none;
}

/* Bascule sombre → clair au défilement (body.hero-light posé par HeroLightSwitch, desktop seulement). */
@media (min-width: 768px) {
  .page-dark {
    transition: background-color 1s;
  }
  body.hero-light .page-dark {
    background-color: var(--color-paper);
  }
  .hero-dark-change :is(h1, h2, p, li, strong, em, span) {
    transition: color 1s;
  }
  body.hero-light .hero-dark-change :is(h1, h2, p, li, strong, em, span):not(form *) {
    color: var(--color-ink);
  }
  body.hero-light .site-header {
    background-color: color-mix(in oklab, var(--color-paper) 95%, transparent);
    border-bottom-color: var(--color-line);
    backdrop-filter: blur(8px);
  }
  body.hero-light .site-header .site-nav-link {
    color: var(--color-ink);
  }
  body.hero-light .site-header .menu-trigger {
    background-color: var(--color-ink);
    color: var(--color-paper);
  }
  body.hero-light .hero-light-hidden {
    display: none;
  }
  body.hero-light .hero-light-only {
    display: inline-flex;
  }
}
```

- [ ] **Step 4 : `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { inter, spaceGrotesk } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cohezi — L’IA change le monde. Comprenez ce qui compte.',
  description:
    'Actualités, business, société et analyses pour comprendre l’intelligence artificielle sans le bruit.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
```

- [ ] **Step 5 : tests qui échouent (logo, boutons, titre de section)**

`tests/components/ui/cohezi-logo.test.tsx` :
```tsx
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CoheziLogo } from '@/components/ui/cohezi-logo';

const srcs = (root: HTMLElement) => [...root.querySelectorAll('img')].map((img) => img.getAttribute('src'));

describe('CoheziLogo', () => {
  it('renders both header lockups on dark tone, switched by the hero-light classes', () => {
    const { container } = render(<CoheziLogo tone="dark" />);
    expect(srcs(container)).toEqual([
      '/brand/cohezi-lockup-blanc.png',
      '/brand/cohezi-lockup-noir.png',
      '/brand/cohezi-symbole-vert.png',
      '/brand/cohezi-logotype-blanc.png',
    ]);
    const [white, black] = [...container.querySelectorAll('span[data-variant]')];
    expect(white).toHaveClass('hero-light-hidden');
    expect(black).toHaveClass('hero-light-only');
    for (const img of container.querySelectorAll('img')) expect(img).toHaveAttribute('alt', '');
  });

  it('renders only the black lockup and black logotype on light tone', () => {
    const { container } = render(<CoheziLogo tone="light" />);
    expect(srcs(container)).toEqual([
      '/brand/cohezi-lockup-noir.png',
      '/brand/cohezi-symbole-vert.png',
      '/brand/cohezi-logotype-noir.png',
    ]);
  });

  it('renders a single 160px black lockup for the footer', () => {
    const { container } = render(<CoheziLogo tone="light" size="footer" />);
    const imgs = container.querySelectorAll('img');
    expect(imgs).toHaveLength(1);
    expect(imgs[0]).toHaveAttribute('src', '/brand/cohezi-lockup-noir.png');
    expect(imgs[0]).toHaveAttribute('width', '160');
  });
});
```

`tests/components/ui/button.test.tsx` (remplacer le test « applies variant and size classes… ») :
```tsx
  it('applies variant and size classes and forwards disabled', () => {
    render(
      <Button variant="accent" size="lg" disabled>
        Je m’inscris
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Je m’inscris' });
    expect(button.className).toContain('bg-accent');
    expect(button.className).toContain('h-12');
    expect(button).toBeDisabled();
  });

  it('offers a paper variant for light buttons on dark backgrounds', () => {
    render(<Button variant="paper">S’inscrire</Button>);
    expect(screen.getByRole('button', { name: 'S’inscrire' }).className).toContain('bg-paper');
  });
```

`tests/components/ui/section-heading.test.tsx` : remplacer `toContain('text-white')` par `toContain('text-paper')` et ajouter dans le premier test :
```tsx
    expect(heading.className).toContain('font-display');
```

Run : `pnpm test tests/components/ui/cohezi-logo.test.tsx tests/components/ui/button.test.tsx tests/components/ui/section-heading.test.tsx`
Expected : FAIL — `cohezi-logo` introuvable ; `bg-accent` / `bg-paper` absents ; `text-paper` / `font-display` absents.

- [ ] **Step 6 : `components/ui/cohezi-logo.tsx`**

```tsx
import Image from 'next/image';
import { cn } from '@/lib/cn';

type CoheziLogoProps = {
  tone: 'dark' | 'light';
  size?: 'header' | 'footer';
  className?: string;
};

/** Lockups transparents : 1268 × 544 px. 120 px de large (minimum de la charte) ⇒ 51 px de haut. */
const HEADER_LOCKUP = { width: 120, height: 51 };
const FOOTER_LOCKUP = { width: 160, height: 69 };

/**
 * Logo Cohezi. Les images sont décoratives (`alt=""`) : le lien qui les entoure porte
 * l'aria-label. Sur le ton sombre, les deux lockups sont rendus et la bascule au défilement
 * (`body.hero-light`) affiche le noir à la place du blanc via `hero-light-hidden` / `hero-light-only`.
 */
export function CoheziLogo({ tone, size = 'header', className }: CoheziLogoProps) {
  if (size === 'footer') {
    return (
      <Image
        src="/brand/cohezi-lockup-noir.png"
        alt=""
        width={FOOTER_LOCKUP.width}
        height={FOOTER_LOCKUP.height}
        unoptimized
        className={cn('h-auto w-40', className)}
      />
    );
  }

  const lockup = (variant: 'blanc' | 'noir', extra?: string) => (
    <span data-variant={variant} className={cn('hidden items-center md:inline-flex', extra)}>
      <Image
        src={`/brand/cohezi-lockup-${variant}.png`}
        alt=""
        width={HEADER_LOCKUP.width}
        height={HEADER_LOCKUP.height}
        priority
        unoptimized
        className="h-[51px] w-[120px]"
      />
    </span>
  );

  return (
    <span className={cn('inline-flex items-center', className)}>
      {tone === 'dark' ? lockup('blanc', 'hero-light-hidden') : null}
      {tone === 'dark' ? lockup('noir', 'hero-light-only') : lockup('noir')}
      <span className="inline-flex items-center gap-2 md:hidden">
        <Image src="/brand/cohezi-symbole-vert.png" alt="" width={32} height={32} priority unoptimized className="h-8 w-8" />
        <Image
          src={tone === 'dark' ? '/brand/cohezi-logotype-blanc.png' : '/brand/cohezi-logotype-noir.png'}
          alt=""
          width={53}
          height={24}
          priority
          unoptimized
          className="h-6 w-auto"
        />
      </span>
    </span>
  );
}
```

- [ ] **Step 7 : `components/ui/button.tsx` (variantes Cohezi)**

Remplacer le bloc des types et des variantes par :
```tsx
export type ButtonVariant = 'ink' | 'paper' | 'accent' | 'outline' | 'outline-light';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  ink: 'bg-ink text-paper hover:bg-ink-soft',
  paper: 'bg-paper font-medium text-ink hover:bg-line/60',
  accent: 'bg-accent text-ink hover:bg-accent-deep hover:text-paper',
  outline: 'border border-line bg-transparent text-ink hover:bg-line/40',
  'outline-light': 'border border-paper/40 bg-transparent text-paper hover:bg-paper/10',
};
```
Le reste du fichier (`sizes`, `buttonClasses`, `Button`, `ButtonLink`) est inchangé.

- [ ] **Step 8 : remplacements de classes de couleur dans tout le code**

```bash
cd /home/darellchooks/Documents/cohezi
FILES=$(grep -rlE "white|neutral-|ring-brand|text-brand\"|variant=\"(white|gradient)\"|ring-black" components app --include=*.tsx)
sed -i \
  -e 's/variant="white"/variant="paper"/g' \
  -e 's/variant="gradient"/variant="accent"/g' \
  -e 's/ring-brand/ring-accent/g' \
  -e 's/text-brand"/text-accent"/g' \
  -e 's/bg-white\/10/bg-paper\/10/g' \
  -e 's/border-white\/40/border-paper\/40/g' \
  -e 's/text-white\/90/text-paper\/90/g' \
  -e 's/text-white\/80/text-paper\/80/g' \
  -e 's/text-white\/70/text-paper\/70/g' \
  -e 's/text-white\/60/text-paper\/60/g' \
  -e 's/hover:text-white/hover:text-paper/g' \
  -e 's/text-white/text-paper/g' \
  -e 's/bg-white/bg-paper/g' \
  -e 's/ring-black\/10/ring-ink\/10/g' \
  -e 's/placeholder:text-neutral-400/placeholder:text-muted/g' \
  -e 's/text-neutral-800/text-ink/g' \
  -e 's/text-neutral-700/text-ink\/80/g' \
  -e 's/text-neutral-600/text-ink\/70/g' \
  -e 's/text-neutral-500/text-muted/g' \
  -e 's/hover:bg-neutral-800/hover:bg-ink-soft/g' \
  -e 's/hover:bg-neutral-100/hover:bg-line\/60/g' \
  -e 's/hover:bg-neutral-50/hover:bg-line\/40/g' \
  -e 's/bg-icon-box/bg-ink-soft/g' \
  -e 's/border-ink-border/border-line-dark/g' \
  -e 's/bg-podcast-card/bg-line\/60/g' \
  $FILES
grep -rnE "white|neutral-|ring-brand|ring-black" components app --include=*.tsx || echo "aucune classe blanche/neutral restante"
grep -rn "brand" components app --include=*.tsx
```
Expected : la première commande `grep` n'affiche rien ; la seconde n'affiche que `text-brand-gradient` dans `components/sections/hero.tsx` et `bg-brand-gradient` / `text-brand-gradient` dans `components/sections/university-cta.tsx` (ces deux fichiers sont réécrits ou supprimés aux Tasks 2 et 4 ; leurs classes n'existent plus dans le CSS, ce qui est accepté à cette étape).

Mettre à jour `components/ui/section-heading.tsx` : dans la classe du `h2`, remplacer `'text-[32px] font-bold leading-none tracking-[-0.025em] md:text-5xl'` par `'font-display text-[32px] font-bold uppercase leading-none tracking-[-0.01em] md:text-5xl'`.

- [ ] **Step 9 : vérifications et commit**

Run : `pnpm test && pnpm typecheck && pnpm lint && pnpm build`
Expected : tests verts (le test `brand-logo` existant passe encore : `BrandLogo` n'est supprimé qu'en Task 3), typecheck et lint propres, build OK. Si le build échoue sur le téléchargement des polices, appliquer le Step 2b puis relancer.

Contrôle visuel rapide (serveur déjà ouvert ou `next start`) :
```bash
curl -s -o /dev/null http://localhost:3000 && echo "serveur déjà présent" || (setsid node_modules/.bin/next start -p 3000 > /tmp/cohezi-server.log 2>&1 < /dev/null & echo $! > /tmp/cohezi-server.pgid; sleep 4)
B="$HOME/.claude/skills/gstack/browse/dist/browse"
$B viewport 1440x900 && $B goto http://localhost:3000
$B css h1 font-family      # attendu : contient "Space Grotesk" seulement à partir de Task 4 ; ici Inter (h1 non encore migré)
$B css body font-family    # attendu : Inter
$B css .rounded-sheet background-color   # attendu : rgb(247, 247, 244)
[ -f /tmp/cohezi-server.pgid ] && kill -TERM -- "-$(cat /tmp/cohezi-server.pgid)" && rm /tmp/cohezi-server.pgid || true
```

```bash
git add -A public/brand app components tests docs/superpowers/plans/ && git add -u public/fonts
git commit -m "feat(cohezi): polices Inter et Space Grotesk, palette Cohezi, logo et variantes de boutons

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2 : Modèle de contenu, contenu Cohezi, cartes et suppression des sections Rundown

**Files:**
- Rewrite: `content/types.ts`, `content/categories.ts`, `content/site.ts`, `content/articles.ts`, `lib/icons.ts`, `lib/articles.ts`, `lib/placeholder.ts`, `components/cards/article-card.tsx`, `components/ui/filterable-grid.tsx`, `components/ui/placeholder-image.tsx`
- Create: `lib/format-date.ts`, `components/ui/category-badge.tsx`
- Modify: `components/cards/card-frame.tsx`
- Delete: `content/guides.ts`, `content/tools.ts`, `content/podcast.ts`, `content/university.ts`, `components/sections/guides.tsx`, `components/sections/trending-tools.tsx`, `components/sections/podcast.tsx`, `components/sections/university-cta.tsx`, `components/cards/guide-card.tsx`, `components/cards/tool-card.tsx`, `components/ui/chip.tsx`, et leurs tests (`tests/components/sections/guides.test.tsx`, `trending-tools.test.tsx`, `podcast.test.tsx`, `university-cta.test.tsx`, `tests/components/cards/guide-card.test.tsx`, `tool-card.test.tsx`, `tests/components/ui/chip.test.tsx`)
- Test: `tests/content/content.test.ts`, `tests/lib/articles.test.ts`, `tests/lib/format-date.test.ts`, `tests/lib/placeholder.test.ts`, `tests/components/ui/category-badge.test.tsx`, `tests/components/cards/article-card.test.tsx`, `tests/components/ui/filterable-grid.test.tsx`, `tests/components/ui/placeholder-image.test.tsx`, `tests/components/ui/icon.test.tsx`

**Interfaces:**
- Produces (types) : `IconName = 'menu' | 'close' | 'arrow-right' | 'send' | 'search' | 'instagram' | 'linkedin' | 'tiktok'`, `CategorySlug`, `Category { slug; label; href }`, `Article { slug; title; excerpt; category; publishedAt; readingMinutes; image; featured?; deepDive? }`, `HeroContent`, `SectionCopy`, `DeepDiveCopy`, `NewsletterCopy`, `SiteConfig` (voir Step 1).
- Produces (données) : `categories: Category[]` (4), `categoryBySlug: Record<CategorySlug, Category>`, `site: SiteConfig`, `articles: Article[]` (24).
- Produces (fonctions) : `sortByDate(articles): Article[]`, `latest(articles, count = 5): Article[]`, `byCategory(articles, slug, count = 8): Article[]`, `deepDive(articles): Article | undefined`, `pickFeatured` (inchangé), `formatDateFr(iso: string): string`, `hashToGradient` (teintes neutres).
- Produces (composants) : `CategoryBadge({ label; tone?: 'light' | 'dark'; className? })`, `ArticleCard({ article; variant: 'featured' | 'compact' | 'grid' })`, `FilterableGrid<T>({ items; categories: readonly { slug: string; label: string }[]; getCategories; renderItems; filterLabel; emptyLabel?; allLabel? })` (onglets uniquement).
- État attendu en fin de tâche : `pnpm test` vert **sauf** `hero`, `latest-articles`, `site-header`, `site-footer`, `page`, `newsletter-form` (contenus Rundown encore attendus, corrigés Tasks 3–6) ; `pnpm typecheck` **rouge** sur `hero.tsx`, `latest-articles.tsx`, `site-footer.tsx`, `site-header.tsx`, `app/page.tsx` (corrigés Tasks 3–7).

- [ ] **Step 1 : `content/types.ts` (contenu complet)**

```ts
export type IconName = 'menu' | 'close' | 'arrow-right' | 'send' | 'search' | 'instagram' | 'linkedin' | 'tiktok';

/** Sans `src`, le composant PlaceholderImage génère un visuel. */
export type ImageRef = { src?: string; alt: string };

export type NavItem = { label: string; href: string };

export type CategorySlug = 'actualite' | 'business' | 'societe' | 'analyse';

export type Category = { slug: CategorySlug; label: string; href: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  /** Date de publication ISO 8601 (AAAA-MM-JJ). */
  publishedAt: string;
  readingMinutes: number;
  image: ImageRef;
  featured?: boolean;
  deepDive?: boolean;
};

export type SocialLink = { label: string; href: string; icon: IconName };

export type FooterColumn = { heading: string; links: NavItem[] };

/** Page annoncée mais pas encore écrite : premier segment d'URL et libellé affiché. */
export type ComingSoonPage = { slug: string; label: string };

export type HeroContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  emailPlaceholder: string;
  subscribeLabel: string;
  microCopy: string;
  promise: string;
};

export type SectionCopy = {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  viewAllHref: string;
};

export type DeepDiveCopy = {
  eyebrow: string;
  number: string;
  /** Suffixe du temps de lecture, ex. « min de lecture ». */
  readLabel: string;
  ctaLabel: string;
};

export type NewsletterCopy = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  emailPlaceholder: string;
  buttonLabel: string;
  microCopy: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  nav: NavItem[];
  headerCta: NavItem;
  searchHref: string;
  searchLabel: string;
  hero: HeroContent;
  sections: { latest: SectionCopy; business: SectionCopy; societe: SectionCopy };
  deepDive: DeepDiveCopy;
  newsletter: NewsletterCopy;
  footer: {
    /** Une entrée par ligne affichée. */
    tagline: string[];
    columns: FooterColumn[];
    copyright: string;
    social: SocialLink[];
  };
  /** Pages servies par la route attrape-tout, dans l'ordre de pré-rendu. */
  comingSoon: ComingSoonPage[];
};
```

- [ ] **Step 2 : tests qui échouent (contenu, sélecteurs, date, placeholder, badge, carte, grille, icônes)**

`tests/content/content.test.ts` (contenu complet) :
```ts
import { describe, expect, it } from 'vitest';
import { articles } from '@/content/articles';
import { categories, categoryBySlug } from '@/content/categories';
import { site } from '@/content/site';
import { icons } from '@/lib/icons';
import { latest } from '@/lib/articles';

const unique = <T>(values: T[]) => new Set(values).size === values.length;
const count = (slug: string) => articles.filter((a) => a.category === slug).length;

describe('content integrity', () => {
  it('has the expected collection sizes', () => {
    expect(articles).toHaveLength(24);
    expect(count('business')).toBe(8);
    expect(count('societe')).toBe(8);
    expect(count('actualite')).toBe(5);
    expect(count('analyse')).toBe(3);
    expect(categories).toHaveLength(4);
    expect(site.nav).toHaveLength(4);
    expect(site.footer.columns.map((c) => c.links.length)).toEqual([3, 3, 3]);
    expect(site.footer.social).toHaveLength(3);
  });

  it('uses unique slugs and valid ISO dates', () => {
    expect(unique(articles.map((a) => a.slug))).toBe(true);
    expect(unique(categories.map((c) => c.slug))).toBe(true);
    for (const article of articles) {
      expect(article.publishedAt, article.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(article.publishedAt)), article.slug).toBe(false);
      expect(article.readingMinutes).toBeGreaterThan(0);
      expect(article.excerpt.length, article.slug).toBeGreaterThan(40);
    }
  });

  it('flags exactly one featured article and one deep dive', () => {
    expect(articles.filter((a) => a.featured)).toHaveLength(1);
    expect(articles.filter((a) => a.deepDive)).toHaveLength(1);
    expect(articles.find((a) => a.deepDive)?.category).toBe('analyse');
  });

  it('only references known categories and resolves category metadata', () => {
    for (const article of articles) expect(categoryBySlug[article.category], article.slug).toBeDefined();
    expect(categoryBySlug.analyse.href).toBe('/analyses');
  });

  it('puts the featured article first in the front page and covers every category', () => {
    const front = latest(articles);
    expect(front).toHaveLength(5);
    expect(front[0]?.featured).toBe(true);
    expect(new Set(front.map((a) => a.category)).size).toBe(4);
  });

  it('resolves every icon name used by the site config', () => {
    for (const social of site.footer.social) expect(icons[social.icon], social.label).toBeDefined();
    expect(site.comingSoon).toHaveLength(7);
    expect(site.comingSoon.every((page) => page.slug.length > 0 && page.label.length > 0)).toBe(true);
    expect(site.headerCta.href).toBe('#newsletter');
  });
});
```

`tests/lib/articles.test.ts` (contenu complet) :
```ts
import { describe, expect, it } from 'vitest';
import type { Article } from '@/content/types';
import { byCategory, deepDive, latest, pickFeatured, sortByDate } from '@/lib/articles';

const make = (slug: string, publishedAt: string, extra: Partial<Article> = {}): Article => ({
  slug,
  title: slug,
  excerpt: 'Un extrait suffisamment long pour ressembler à un vrai chapô d’article.',
  category: 'actualite',
  publishedAt,
  readingMinutes: 5,
  image: { alt: slug },
  ...extra,
});

const a = make('a', '2026-09-02');
const b = make('b', '2026-09-01', { featured: true, category: 'business' });
const c = make('c', '2026-08-30', { category: 'business' });
const d = make('d', '2026-08-29', { category: 'analyse', deepDive: true });
const e = make('e', '2026-08-28', { category: 'societe' });
const f = make('f', '2026-08-27');
const all = [c, a, e, b, f, d];

describe('sortByDate', () => {
  it('sorts newest first without mutating the input', () => {
    expect(sortByDate(all).map((x) => x.slug)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    expect(all[0]).toBe(c);
  });
});

describe('latest', () => {
  it('puts the featured article first, then the newest, limited to count', () => {
    expect(latest(all).map((x) => x.slug)).toEqual(['b', 'a', 'c', 'd', 'e']);
    expect(latest(all, 3).map((x) => x.slug)).toEqual(['b', 'a', 'c']);
  });

  it('falls back to date order without a featured article', () => {
    expect(latest([a, c, e], 2).map((x) => x.slug)).toEqual(['a', 'c']);
  });
});

describe('byCategory', () => {
  it('filters by category, newest first, limited to count', () => {
    expect(byCategory(all, 'business').map((x) => x.slug)).toEqual(['b', 'c']);
    expect(byCategory(all, 'business', 1).map((x) => x.slug)).toEqual(['b']);
    expect(byCategory(all, 'analyse').map((x) => x.slug)).toEqual(['d']);
  });
});

describe('deepDive', () => {
  it('returns the flagged article or undefined', () => {
    expect(deepDive(all)).toBe(d);
    expect(deepDive([a, b])).toBeUndefined();
  });
});

describe('pickFeatured', () => {
  it('returns the flagged article and the others in order', () => {
    expect(pickFeatured([a, b, c])).toEqual({ featured: b, rest: [a, c] });
  });

  it('falls back to the first article when none is flagged', () => {
    expect(pickFeatured([a, c])).toEqual({ featured: a, rest: [c] });
  });

  it('handles an empty list', () => {
    expect(pickFeatured([])).toEqual({ featured: undefined, rest: [] });
  });
});
```

`tests/lib/format-date.test.ts` :
```ts
import { describe, expect, it } from 'vitest';
import { formatDateFr } from '@/lib/format-date';

describe('formatDateFr', () => {
  it('formats ISO dates in long French form', () => {
    expect(formatDateFr('2026-09-02')).toBe('2 septembre 2026');
    expect(formatDateFr('2026-08-14')).toBe('14 août 2026');
  });

  it('returns the input untouched when it is not a valid date', () => {
    expect(formatDateFr('bientôt')).toBe('bientôt');
  });
});
```

`tests/lib/placeholder.test.ts` : remplacer le test « returns two hsl colours 40 degrees apart… » par :
```ts
  it('returns two neutral dark tones sharing the seed hue', () => {
    const g = hashToGradient('Rowan');
    const hue = hashString('Rowan') % 360;
    expect(g).toEqual({
      from: `hsl(${hue} 6% 12%)`,
      to: `hsl(${hue} 6% 22%)`,
      angle: 135,
    });
  });
```

`tests/components/ui/category-badge.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryBadge } from '@/components/ui/category-badge';

describe('CategoryBadge', () => {
  it('renders the label with a green marker, dark text by default', () => {
    render(<CategoryBadge label="Société" />);
    const badge = screen.getByText('Société');
    expect(badge.className).toContain('text-ink');
    expect(badge.className).toContain('uppercase');
    expect(badge.querySelector('span[aria-hidden]')?.className).toContain('bg-accent');
  });

  it('switches to paper text on dark tone', () => {
    render(<CategoryBadge label="Analyse" tone="dark" />);
    expect(screen.getByText('Analyse').className).toContain('text-paper');
  });
});
```

`tests/components/cards/article-card.test.tsx` (contenu complet) :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleCard } from '@/components/cards/article-card';
import { articles } from '@/content/articles';

const featured = articles.find((a) => a.featured)!;
const business = articles.find((a) => a.category === 'business')!;

describe('ArticleCard', () => {
  it('renders the featured variant with badge, excerpt and French meta', () => {
    render(<ArticleCard article={featured} variant="featured" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/actualite/${featured.slug}`);
    expect(screen.getByText('Actualité')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: featured.title })).toBeInTheDocument();
    expect(screen.getByText(featured.excerpt)).toBeInTheDocument();
    expect(screen.getByText('2 septembre 2026 · 6 min de lecture')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: featured.image.alt })).toBeInTheDocument();
  });

  it('renders the compact variant without excerpt', () => {
    render(<ArticleCard article={business} variant="compact" />);
    expect(screen.getByText('Business')).toBeInTheDocument();
    expect(screen.queryByText(business.excerpt)).toBeNull();
    expect(screen.getByRole('link')).toHaveAttribute('href', `/business/${business.slug}`);
  });

  it('renders the grid variant inside a bordered card frame', () => {
    render(<ArticleCard article={business} variant="grid" />);
    const link = screen.getByRole('link');
    expect(link.className).toContain('border-line');
    expect(screen.getByRole('heading', { level: 3, name: business.title })).toBeInTheDocument();
    expect(screen.queryByText(business.excerpt)).toBeNull();
  });
});
```

`tests/components/ui/filterable-grid.test.tsx` (contenu complet) :
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { FilterableGrid } from '@/components/ui/filterable-grid';

type Item = { id: string; cats: string[] };

const items: Item[] = [
  { id: 'one', cats: ['business'] },
  { id: 'two', cats: ['societe'] },
  { id: 'three', cats: ['business', 'societe'] },
];

const categories = [
  { slug: 'business', label: 'Business' },
  { slug: 'societe', label: 'Société' },
];

const renderItems = (visible: Item[]) => (
  <ul>
    {visible.map((item) => (
      <li key={item.id}>{item.id}</li>
    ))}
  </ul>
);

function setup(data: Item[] = items) {
  return render(
    <FilterableGrid
      items={data}
      categories={categories}
      getCategories={(item) => item.cats}
      filterLabel="Filtrer les articles"
      allLabel="Toutes"
      emptyLabel="Rien pour le moment."
      renderItems={renderItems}
    />,
  );
}

describe('FilterableGrid', () => {
  it('shows every item with the "all" tab active by default', () => {
    setup();
    expect(screen.getByRole('group', { name: 'Filtrer les articles' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toutes' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('filters the items when a tab is clicked', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Société' }));
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['two', 'three']);
    expect(screen.getByRole('button', { name: 'Société' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows the empty label when nothing matches', async () => {
    const user = userEvent.setup();
    setup([{ id: 'solo', cats: ['business'] }]);
    await user.click(screen.getByRole('button', { name: 'Société' }));
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.getByText('Rien pour le moment.')).toBeInTheDocument();
  });
});
```

`tests/components/ui/placeholder-image.test.tsx` : ajouter dans le premier test, après `toHaveTextContent` :
```tsx
    expect(img.querySelector('rect[fill="#7cff6b"]')).not.toBeNull();
```

`tests/components/ui/icon.test.tsx` : remplacer `name="spotify" label="Spotify"` par `name="tiktok" label="TikTok"` et `{ name: 'Spotify' }` par `{ name: 'TikTok' }`.

Run : `pnpm test tests/content tests/lib tests/components/ui/category-badge.test.tsx tests/components/cards/article-card.test.tsx tests/components/ui/filterable-grid.test.tsx tests/components/ui/placeholder-image.test.tsx tests/components/ui/icon.test.tsx`
Expected : FAIL — modules `format-date`, `category-badge` introuvables ; contenu, sélecteurs, palette, cartes, grille et icônes incohérents avec les nouveaux tests.

- [ ] **Step 3 : `lib/icons.ts`, `lib/articles.ts`, `lib/format-date.ts`, `lib/placeholder.ts`**

`lib/icons.ts` :
```ts
import type { IconSvgElement } from '@hugeicons/react';
import {
  ArrowRight01Icon,
  Cancel01Icon,
  InstagramIcon,
  LinkedinIcon,
  Menu01Icon,
  SearchIcon,
  SentIcon,
  TiktokIcon,
} from '@hugeicons/core-free-icons';
import type { IconName } from '@/content/types';

/** Seul point d'accès aux icônes Hugeicons (noms vérifiés sur @hugeicons/core-free-icons 4.3.0). */
export const icons: Record<IconName, IconSvgElement> = {
  menu: Menu01Icon,
  close: Cancel01Icon,
  'arrow-right': ArrowRight01Icon,
  send: SentIcon,
  search: SearchIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  tiktok: TiktokIcon,
};

export function getIcon(name: IconName): IconSvgElement {
  return icons[name];
}
```

`lib/articles.ts` :
```ts
import type { Article, CategorySlug } from '@/content/types';

export function sortByDate(articles: readonly Article[]): Article[] {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Sélection « À la une » : l'article `featured` en tête, puis les plus récents. */
export function latest(articles: readonly Article[], count = 5): Article[] {
  const sorted = sortByDate(articles);
  const featured = sorted.find((article) => article.featured);
  const rest = sorted.filter((article) => article !== featured);
  return (featured ? [featured, ...rest] : rest).slice(0, count);
}

export function byCategory(articles: readonly Article[], slug: CategorySlug, count = 8): Article[] {
  return sortByDate(articles)
    .filter((article) => article.category === slug)
    .slice(0, count);
}

export function deepDive(articles: readonly Article[]): Article | undefined {
  return articles.find((article) => article.deepDive);
}

export function pickFeatured(articles: readonly Article[]): {
  featured: Article | undefined;
  rest: Article[];
} {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  return { featured, rest: articles.filter((article) => article !== featured) };
}
```

`lib/format-date.ts` :
```ts
const formatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** « 2026-09-02 » → « 2 septembre 2026 ». Une valeur non datée est renvoyée telle quelle. */
export function formatDateFr(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return formatter.format(date);
}
```

`lib/placeholder.ts` : remplacer le corps de `hashToGradient` par :
```ts
export function hashToGradient(seed: string): Gradient {
  const hue = hashString(seed) % 360;
  return {
    from: `hsl(${hue} 6% 12%)`,
    to: `hsl(${hue} 6% 22%)`,
    angle: 135,
  };
}
```
(`hashString` et `truncateLabel` inchangés.)

- [ ] **Step 4 : `content/categories.ts` et `content/site.ts`**

`content/categories.ts` :
```ts
import type { Category, CategorySlug } from './types';

export const categories: Category[] = [
  { slug: 'actualite', label: 'Actualité', href: '/actualite' },
  { slug: 'business', label: 'Business', href: '/business' },
  { slug: 'societe', label: 'Société', href: '/societe' },
  { slug: 'analyse', label: 'Analyse', href: '/analyses' },
];

export const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category])) as Record<
  CategorySlug,
  Category
>;
```

`content/site.ts` :
```ts
import type { SiteConfig } from './types';

export const site: SiteConfig = {
  name: 'Cohezi',
  tagline: 'L’IA change le monde. Comprenez ce qui compte.',
  nav: [
    { label: 'Actualité', href: '/actualite' },
    { label: 'Business', href: '/business' },
    { label: 'Société', href: '/societe' },
    { label: 'Analyses', href: '/analyses' },
  ],
  headerCta: { label: 'S’inscrire', href: '#newsletter' },
  searchHref: '/recherche',
  searchLabel: 'Rechercher',
  hero: {
    eyebrow: 'Cohezi / Intelligence artificielle',
    titleLine1: 'L’IA change le monde.',
    titleLine2: 'Comprenez ce qui compte',
    description:
      'Actualités, business, société et analyses pour comprendre l’intelligence artificielle sans le bruit.',
    emailPlaceholder: 'Votre adresse e-mail',
    subscribeLabel: 'S’inscrire',
    microCopy: 'La newsletter IA claire, 3× par semaine.',
    promise: 'Pour ceux qui veulent comprendre l’IA, pas seulement la suivre.',
  },
  sections: {
    latest: {
      title: 'À la une',
      subtitle: 'Les dernières actualités de l’IA, avec le contexte qui compte.',
      viewAllLabel: 'Voir toutes les actualités',
      viewAllHref: '/actualite',
    },
    business: {
      title: 'Business',
      subtitle: 'Entreprises, financements, marchés et infrastructures de l’IA.',
      viewAllLabel: 'Voir tout le business',
      viewAllHref: '/business',
    },
    societe: {
      title: 'Société',
      subtitle: 'Emploi, éducation, santé, culture : ce que l’IA change au quotidien.',
      viewAllLabel: 'Voir toute la société',
      viewAllHref: '/societe',
    },
  },
  deepDive: {
    eyebrow: 'Cohezi / Décryptage',
    number: '01',
    readLabel: 'min de lecture',
    ctaLabel: 'Lire le décryptage',
  },
  newsletter: {
    eyebrow: 'Newsletter',
    titleLine1: 'Moins de bruit.',
    titleLine2: 'Plus de contexte.',
    description: 'L’essentiel de l’IA, directement dans votre boîte mail.',
    emailPlaceholder: 'Votre adresse e-mail',
    buttonLabel: 'Je m’inscris',
    microCopy: 'La newsletter IA claire, 3× par semaine.',
  },
  footer: {
    tagline: ['Comprendre l’IA.', 'Comprendre ce qui change.'],
    columns: [
      {
        heading: 'Actualité',
        links: [
          { label: 'Business', href: '/business' },
          { label: 'Société', href: '/societe' },
          { label: 'Analyses', href: '/analyses' },
        ],
      },
      {
        heading: 'Cohezi',
        links: [
          { label: 'À propos', href: '/a-propos' },
          { label: 'Newsletter', href: '#newsletter' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        heading: 'Suivre',
        links: [
          { label: 'Instagram', href: 'https://www.instagram.com/cohezi' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cohezi' },
          { label: 'TikTok', href: 'https://www.tiktok.com/@cohezi' },
        ],
      },
    ],
    copyright: '© 2026 Cohezi',
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com/cohezi', icon: 'instagram' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cohezi', icon: 'linkedin' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@cohezi', icon: 'tiktok' },
    ],
  },
  comingSoon: [
    { slug: 'actualite', label: 'Actualité' },
    { slug: 'business', label: 'Business' },
    { slug: 'societe', label: 'Société' },
    { slug: 'analyses', label: 'Analyses' },
    { slug: 'a-propos', label: 'À propos' },
    { slug: 'contact', label: 'Contact' },
    { slug: 'recherche', label: 'Recherche' },
  ],
};
```
Les majuscules (eyebrows, titres, promesse, en-têtes du footer) sont appliquées par CSS `uppercase` dans les composants : le contenu reste en casse naturelle.

- [ ] **Step 5 : `content/articles.ts` (24 articles)**

```ts
import type { Article } from './types';

/**
 * Contenu fictif au ton Cohezi : chaque titre dit ce qui s’est passé et pourquoi c’est important,
 * chaque extrait apporte le contexte ou l’impact. À remplacer par de vrais articles avant publication.
 */
export const articles: Article[] = [
  // Actualité
  {
    slug: 'openai-lance-gpt-6-ce-que-ca-change-pour-les-entreprises',
    title: 'OpenAI lance GPT-6. Voilà pourquoi les entreprises vont devoir revoir leurs plans.',
    excerpt:
      'Fenêtre de contexte illimitée, agents natifs et prix divisé par trois : la nouvelle génération ne change pas seulement les benchmarks, elle bouscule les contrats signés l’an dernier.',
    category: 'actualite',
    publishedAt: '2026-09-02',
    readingMinutes: 6,
    image: { alt: 'Salle de conférence lors de l’annonce de GPT-6' },
    featured: true,
  },
  {
    slug: 'ai-act-entre-en-application-ce-qui-devient-obligatoire',
    title: 'L’AI Act entre en application : ce qui devient obligatoire dès ce mois-ci.',
    excerpt:
      'Transparence des modèles, registre des systèmes à haut risque, sanctions jusqu’à 7 % du chiffre d’affaires. Le calendrier, les obligations réelles et les zones grises qui restent.',
    category: 'actualite',
    publishedAt: '2026-09-01',
    readingMinutes: 5,
    image: { alt: 'Façade du Parlement européen à Bruxelles' },
  },
  {
    slug: 'apple-assistant-ia-hors-ligne-ios-27',
    title: 'Apple intègre un assistant IA hors ligne dans iOS 27. La fin du cloud obligatoire ?',
    excerpt:
      'Le modèle tourne entièrement sur la puce du téléphone. Ce que cela change pour la vie privée, l’autonomie et les développeurs qui vendaient de l’IA par abonnement.',
    category: 'actualite',
    publishedAt: '2026-08-28',
    readingMinutes: 4,
    image: { alt: 'Main tenant un iPhone affichant un assistant vocal' },
  },
  {
    slug: 'google-fusionne-search-et-gemini',
    title: 'Google fusionne Search et Gemini. Ce que ça change pour ceux qui vivent du web.',
    excerpt:
      'Les réponses générées remplacent les dix liens bleus par défaut. Médias, e-commerçants et créateurs découvrent un trafic qui ne revient plus : les premiers chiffres et les parades.',
    category: 'actualite',
    publishedAt: '2026-08-26',
    readingMinutes: 6,
    image: { alt: 'Écran d’ordinateur affichant une page de résultats de recherche' },
  },
  {
    slug: 'nvidia-devoile-ses-puces-rubin',
    title: 'Nvidia dévoile ses puces Rubin. Pourquoi la course au calcul repart de plus belle.',
    excerpt:
      'Quatre fois plus de mémoire, une consommation en hausse et des livraisons déjà réservées jusqu’en 2028. Derrière l’annonce, une question : qui pourra encore se payer l’entraînement des modèles ?',
    category: 'actualite',
    publishedAt: '2026-08-22',
    readingMinutes: 5,
    image: { alt: 'Gros plan sur une carte accélératrice dans un centre de données' },
  },

  // Analyses
  {
    slug: 'open-source-contre-modeles-fermes-la-vraie-ligne-de-fracture',
    title: 'Open source contre modèles fermés : la vraie ligne de fracture n’est pas celle qu’on croit.',
    excerpt:
      'Le débat oppose des licences. Il devrait opposer des dépendances : qui contrôle les données, les puces et la distribution. Une grille de lecture pour ne plus confondre ouverture et indépendance.',
    category: 'analyse',
    publishedAt: '2026-08-31',
    readingMinutes: 9,
    image: { alt: 'Deux serveurs face à face dans une salle blanche' },
  },
  {
    slug: 'les-agents-ia-vont-ils-faire-disparaitre-les-applications',
    title: 'Les agents IA vont-ils faire disparaître les applications ?',
    excerpt: 'Comprendre le changement qui pourrait redéfinir notre manière d’utiliser Internet.',
    category: 'analyse',
    publishedAt: '2026-08-23',
    readingMinutes: 8,
    image: { alt: 'Écran de smartphone dont les icônes d’applications s’effacent' },
    deepDive: true,
  },
  {
    slug: 'ce-que-l-histoire-du-cloud-nous-apprend-sur-l-economie-de-l-ia',
    title: 'Ce que l’histoire du cloud nous apprend sur l’économie de l’IA.',
    excerpt:
      'En 2010, tout le monde prédisait la commoditisation du cloud. Trois acteurs ont capté le marché. Les mêmes mécanismes de capital, d’échelle et de verrouillage sont à l’œuvre aujourd’hui.',
    category: 'analyse',
    publishedAt: '2026-08-10',
    readingMinutes: 8,
    image: { alt: 'Rangées de serveurs dans un centre de données' },
  },

  // Business
  {
    slug: 'mistral-leve-3-milliards-d-euros',
    title: 'Mistral lève 3 milliards d’euros. Ce que ce tour de table dit de l’ambition européenne.',
    excerpt:
      'Valorisation multipliée par quatre en dix-huit mois, entrée d’investisseurs souverains et pari sur les modèles spécialisés : la startup française devient l’alternative que Bruxelles attendait.',
    category: 'business',
    publishedAt: '2026-08-30',
    readingMinutes: 6,
    image: { alt: 'Bureaux vitrés d’une startup à Paris' },
  },
  {
    slug: 'microsoft-facture-les-agents-a-la-tache',
    title: 'Microsoft facture désormais les agents à la tâche. Le modèle économique de l’IA bascule.',
    excerpt:
      'Fini l’abonnement par utilisateur : on paie un résultat. Pourquoi ce changement inquiète les DSI, ravit les directions financières et redéfinit ce qu’est un logiciel.',
    category: 'business',
    publishedAt: '2026-08-27',
    readingMinutes: 5,
    image: { alt: 'Tableau de bord de facturation sur un écran de portable' },
  },
  {
    slug: 'salesforce-rachete-une-startup-d-agents-pour-4-milliards',
    title: 'Salesforce rachète une startup d’agents pour 4 milliards. La consolidation commence.',
    excerpt:
      'Troisième acquisition du secteur en un trimestre. Les grands éditeurs préfèrent acheter que construire, et les startups indépendantes ont de moins en moins de temps pour prouver leur valeur.',
    category: 'business',
    publishedAt: '2026-08-25',
    readingMinutes: 4,
    image: { alt: 'Poignée de main devant un logo d’entreprise' },
  },
  {
    slug: 'le-cout-de-l-inference-a-chute-de-80-pour-cent-en-un-an',
    title: 'Le coût de l’inférence a chuté de 80 % en un an. Qui en profite vraiment ?',
    excerpt:
      'Les fournisseurs de modèles se livrent une guerre des prix que leurs clients ne voient pas toujours. Où va la marge, et pourquoi les applications restent chères.',
    category: 'business',
    publishedAt: '2026-08-21',
    readingMinutes: 7,
    image: { alt: 'Courbe de prix en baisse sur un écran' },
  },
  {
    slug: 'tsmc-samsung-intel-la-guerre-des-fonderies',
    title: 'TSMC, Samsung, Intel : la guerre des fonderies décide de qui aura de l’IA en 2027.',
    excerpt:
      'Les capacités de gravure avancée sont réservées deux ans à l’avance. Comprendre pourquoi une usine à Taïwan pèse plus que n’importe quel modèle sur la disponibilité de l’IA.',
    category: 'business',
    publishedAt: '2026-08-18',
    readingMinutes: 8,
    image: { alt: 'Salle blanche d’une usine de semi-conducteurs' },
  },
  {
    slug: 'les-data-centers-manquent-d-electricite',
    title: 'Les data centers manquent d’électricité. L’IA se heurte à un mur physique.',
    excerpt:
      'Files d’attente de raccordement, réacteurs nucléaires relancés, contrats d’énergie à vingt ans : la contrainte n’est plus logicielle. Cartographie des goulets d’étranglement.',
    category: 'business',
    publishedAt: '2026-08-14',
    readingMinutes: 6,
    image: { alt: 'Lignes à haute tension au-dessus d’un centre de données' },
  },
  {
    slug: 'pourquoi-les-banques-adoptent-l-ia-plus-vite-que-les-hopitaux',
    title: 'Pourquoi les banques adoptent l’IA plus vite que les hôpitaux.',
    excerpt:
      'Mêmes outils, résultats opposés. Données structurées, responsabilité juridique et culture du risque expliquent l’écart, et ce qu’il faudrait pour le combler.',
    category: 'business',
    publishedAt: '2026-08-11',
    readingMinutes: 5,
    image: { alt: 'Hall d’une banque avec des écrans d’information' },
  },
  {
    slug: 'startups-ia-le-retour-des-valorisations-raisonnables',
    title: 'Startups IA : le retour des valorisations raisonnables.',
    excerpt:
      'Après deux ans d’euphorie, les investisseurs exigent des revenus. Ce que révèlent les derniers tours de table sur les modèles qui tiennent vraiment.',
    category: 'business',
    publishedAt: '2026-08-07',
    readingMinutes: 4,
    image: { alt: 'Fondateurs en réunion autour d’une table' },
  },

  // Société
  {
    slug: 'le-bac-2026-corrige-par-des-ia',
    title: 'Le bac 2026 corrigé par des IA : ce que les enseignants en disent vraiment.',
    excerpt:
      'Trois académies ont testé la pré-correction automatique. Gain de temps réel, désaccords sur les copies limites et une question qui dépasse l’examen : qui juge ?',
    category: 'societe',
    publishedAt: '2026-08-29',
    readingMinutes: 6,
    image: { alt: 'Copies d’examen empilées sur un bureau' },
  },
  {
    slug: 'radiologie-l-ia-detecte-mieux-mais-qui-est-responsable',
    title: 'Radiologie : l’IA détecte mieux, mais qui est responsable en cas d’erreur ?',
    excerpt:
      'Les algorithmes dépassent les praticiens sur certains cancers. Les assureurs, les hôpitaux et les patients ne sont pas d’accord sur la suite. État des lieux du droit et des pratiques.',
    category: 'societe',
    publishedAt: '2026-08-24',
    readingMinutes: 7,
    image: { alt: 'Radiologue examinant une image médicale sur écran' },
  },
  {
    slug: 'recruteurs-et-candidats-utilisent-des-ia-qui-gagne',
    title: 'Les recruteurs trient avec des IA, les candidats postulent avec des IA. Qui gagne ?',
    excerpt:
      'CV optimisés contre filtres automatisés : l’embauche devient une conversation entre machines. Ce que les entreprises changent pour retrouver le contact humain.',
    category: 'societe',
    publishedAt: '2026-08-20',
    readingMinutes: 5,
    image: { alt: 'Entretien d’embauche dans un bureau lumineux' },
  },
  {
    slug: 'deepfakes-en-campagne-comment-la-france-prepare-les-municipales',
    title: 'Deepfakes en campagne : comment la France prépare les municipales.',
    excerpt:
      'Cellule de veille, étiquetage obligatoire et délais de retrait raccourcis. Les mesures existent, leur application reste incertaine : retour sur les premiers cas.',
    category: 'societe',
    publishedAt: '2026-08-16',
    readingMinutes: 6,
    image: { alt: 'Panneaux d’affichage électoral dans une rue' },
  },
  {
    slug: 'musique-generee-les-plateformes-commencent-a-l-etiqueter',
    title: 'Musique générée : les plateformes commencent à l’étiqueter. Trop tard ?',
    excerpt:
      'Un titre sur cinq ajouté chaque jour est produit par une IA. Comment l’étiquetage fonctionne, ce qu’il change pour les artistes et pourquoi les redevances restent le vrai sujet.',
    category: 'societe',
    publishedAt: '2026-08-13',
    readingMinutes: 4,
    image: { alt: 'Casque audio posé sur une table de mixage' },
  },
  {
    slug: 'vos-photos-entrainent-des-modeles-le-nouveau-consentement',
    title: 'Vos photos entraînent des modèles. Ce que permet vraiment le nouveau consentement.',
    excerpt:
      'Les réseaux sociaux ont mis à jour leurs conditions. Entre opt-out caché et droit d’opposition, ce que vous pouvez réellement refuser, et comment.',
    category: 'societe',
    publishedAt: '2026-08-09',
    readingMinutes: 5,
    image: { alt: 'Personne photographiant une rue avec son téléphone' },
  },
  {
    slug: 'assistants-vocaux-a-l-ecole-primaire-l-experimentation-qui-divise',
    title: 'Assistants vocaux à l’école primaire : l’expérimentation qui divise.',
    excerpt:
      'Cinquante classes équipées à la rentrée. Les premiers retours des enseignants, les inquiétudes des parents et ce que dit la recherche sur l’apprentissage assisté.',
    category: 'societe',
    publishedAt: '2026-08-05',
    readingMinutes: 5,
    image: { alt: 'Salle de classe avec des élèves et une enseignante' },
  },
  {
    slug: 'le-teletravail-augmente-par-l-ia-change-les-horaires',
    title: 'Le télétravail augmenté par l’IA change les horaires plus que les métiers.',
    excerpt:
      'Réunions résumées, mails rédigés, tâches déléguées à des agents : le temps gagné ne réduit pas la charge, il la déplace. Enquête auprès de 1 200 salariés.',
    category: 'societe',
    publishedAt: '2026-08-02',
    readingMinutes: 4,
    image: { alt: 'Bureau à domicile avec un ordinateur portable' },
  },
];
```

- [ ] **Step 6 : `components/ui/category-badge.tsx`, `components/cards/card-frame.tsx`, `components/cards/article-card.tsx`**

`components/ui/category-badge.tsx` :
```tsx
import { cn } from '@/lib/cn';

type CategoryBadgeProps = { label: string; tone?: 'light' | 'dark'; className?: string };

/** Repère vert + libellé de catégorie en capitales (Inter 11 px). */
export function CategoryBadge({ label, tone = 'light', className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em]',
        tone === 'dark' ? 'text-paper' : 'text-ink',
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
      {label}
    </span>
  );
}
```

`components/cards/card-frame.tsx` : remplacer le commentaire et la classe `bg-paper` (issue du sed de Task 1) par :
```tsx
/** Cadre commun des cartes en grille : bordure line, rayon 12, padding 10, fond de la feuille. */
export function CardFrame({ href, children, className }: CardFrameProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group block h-full rounded-xl border border-line bg-paper p-2.5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        className,
      )}
    >
      {children}
    </Link>
  );
}
```

`components/cards/article-card.tsx` (contenu complet) :
```tsx
import Link from 'next/link';
import { CategoryBadge } from '@/components/ui/category-badge';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { categoryBySlug } from '@/content/categories';
import type { Article } from '@/content/types';
import { cn } from '@/lib/cn';
import { formatDateFr } from '@/lib/format-date';
import { CardFrame } from './card-frame';

type ArticleCardProps = { article: Article; variant: 'featured' | 'compact' | 'grid' };

export function articleHref(article: Article): string {
  return `${categoryBySlug[article.category].href}/${article.slug}`;
}

export function ArticleCard({ article, variant }: ArticleCardProps) {
  const category = categoryBySlug[article.category];
  const meta = `${formatDateFr(article.publishedAt)} · ${article.readingMinutes} min de lecture`;
  const href = articleHref(article);

  if (variant === 'grid') {
    return (
      <article className="article-card-grid h-full">
        <CardFrame href={href}>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <PlaceholderImage
              image={article.image}
              label={article.title}
              sizes="(min-width: 1024px) 260px, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="px-1 pb-1">
            <CategoryBadge label={category.label} className="mt-3" />
            <h3 className="mt-2 font-display text-base font-semibold leading-6 text-ink group-hover:underline">{article.title}</h3>
            <p className="mt-2 text-xs text-ink/60">{meta}</p>
          </div>
        </CardFrame>
      </article>
    );
  }

  const featured = variant === 'featured';
  return (
    <article className={cn('group', featured ? 'article-card-featured' : 'article-card-compact')}>
      <Link
        href={href}
        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <div className={cn('relative overflow-hidden rounded-lg', featured ? 'aspect-video' : 'aspect-video lg:aspect-[16/10]')}>
          <PlaceholderImage image={article.image} label={article.title} priority={featured} />
        </div>
        <CategoryBadge label={category.label} className="mt-4" />
        <h3
          className={cn(
            'mt-2 font-display font-semibold text-ink group-hover:underline',
            featured ? 'text-xl leading-tight lg:text-[30px] lg:leading-[1.2]' : 'text-lg leading-6',
          )}
        >
          {article.title}
        </h3>
        {featured ? <p className="mt-2 text-base leading-6 text-ink/70">{article.excerpt}</p> : null}
        <p className="mt-2 text-xs text-ink/60">{meta}</p>
      </Link>
    </article>
  );
}
```

- [ ] **Step 7 : `components/ui/placeholder-image.tsx` et `components/ui/filterable-grid.tsx`**

`components/ui/placeholder-image.tsx` : remplacer le bloc `<svg>` retourné par :
```tsx
    <svg
      role="img"
      aria-label={image.alt}
      className={cn('absolute inset-0 h-full w-full', className)}
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={gradient.from} />
          <stop offset="1" stopColor={gradient.to} />
        </linearGradient>
        <pattern id={`${id}-lines`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#f7f7f4" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill={`url(#${id})`} />
      <rect width="320" height="180" fill={`url(#${id}-lines)`} />
      <rect x="16" y="16" width="10" height="10" fill="#7cff6b" />
      <text
        x="160"
        y="97"
        textAnchor="middle"
        fill="#f7f7f4"
        fillOpacity="0.92"
        fontSize="15"
        fontWeight="600"
        fontFamily="var(--font-display), var(--font-sans), system-ui, sans-serif"
      >
        {truncateLabel(label)}
      </text>
    </svg>
```

`components/ui/filterable-grid.tsx` (contenu complet, onglets uniquement) :
```tsx
'use client';

import { useState, type ReactNode } from 'react';
import { ALL, filterByCategory } from '@/lib/filter';
import { Tabs } from './tabs';

type FilterOption = { slug: string; label: string };

export type FilterableGridProps<T> = {
  items: readonly T[];
  categories: readonly FilterOption[];
  getCategories: (item: T) => readonly string[];
  renderItems: (visible: T[]) => ReactNode;
  filterLabel: string;
  emptyLabel?: string;
  allLabel?: string;
};

export function FilterableGrid<T>({
  items,
  categories,
  getCategories,
  renderItems,
  filterLabel,
  emptyLabel = 'Rien pour le moment.',
  allLabel = 'Toutes',
}: FilterableGridProps<T>) {
  const [active, setActive] = useState<string>(ALL);
  const options: FilterOption[] = [{ slug: ALL, label: allLabel }, ...categories];
  const visible = filterByCategory(items, active, getCategories);
  // Comme sur le clone, les onglets n'existent pas sous md : la grille affiche alors ses premières cartes.

  return (
    <div>
      <div className="mt-8 hidden justify-center md:flex">
        <Tabs items={options} active={active} onChange={setActive} ariaLabel={filterLabel} />
      </div>
      <div className="mt-12">
        {visible.length > 0 ? renderItems(visible) : <p className="text-center text-muted">{emptyLabel}</p>}
      </div>
    </div>
  );
}
```

- [ ] **Step 8 : suppressions**

```bash
cd /home/darellchooks/Documents/cohezi
git rm -q content/guides.ts content/tools.ts content/podcast.ts content/university.ts \
  components/sections/guides.tsx components/sections/trending-tools.tsx components/sections/podcast.tsx components/sections/university-cta.tsx \
  components/cards/guide-card.tsx components/cards/tool-card.tsx components/ui/chip.tsx \
  tests/components/sections/guides.test.tsx tests/components/sections/trending-tools.test.tsx tests/components/sections/podcast.test.tsx tests/components/sections/university-cta.test.tsx \
  tests/components/cards/guide-card.test.tsx tests/components/cards/tool-card.test.tsx tests/components/ui/chip.test.tsx
```

- [ ] **Step 9 : tests de la tâche, état attendu, commit**

Run : `pnpm test tests/content tests/lib tests/components/ui tests/components/cards tests/app/api`
Expected : PASS sauf `tests/components/ui/newsletter-form.test.tsx` (libellés encore anglais, corrigé Task 6).
Run : `pnpm test 2>&1 | grep -E "FAIL|Test Files"`
Expected : échecs limités à `hero`, `latest-articles`, `site-header`, `site-footer`, `page`, `newsletter-form`, `brand-logo` (ce dernier disparaît en Task 3).

```bash
git add -A content lib components tests docs/superpowers/plans/
git commit -m "feat(cohezi): modèle de contenu éditorial, 24 articles, cartes et badge de catégorie

Supprime les sections, contenus et cartes propres à The Rundown (guides, outils,
podcast, University). Typecheck volontairement rouge jusqu’à l’assemblage (Task 7).

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3 : Header, menu mobile et footer Cohezi

**Files:**
- Modify: `components/layout/site-header.tsx`, `components/layout/mobile-menu.tsx`, `components/layout/site-footer.tsx`, `components/ui/tabs.tsx`
- Delete: `components/ui/brand-logo.tsx`, `tests/components/ui/brand-logo.test.tsx`
- Test: `tests/components/layout/site-header.test.tsx`, `tests/components/layout/mobile-menu.test.tsx`, `tests/components/layout/site-footer.test.tsx`, `tests/components/ui/tabs.test.tsx`

**Interfaces:**
- Consumes : `CoheziLogo`, `Button`/`ButtonLink` (variante `paper`), `Icon` (`search`, `arrow-right`, `menu`, `close`), `site` (nav, headerCta, searchHref, searchLabel, footer, newsletter).
- Produces : `SiteHeader({ name, nav, cta, searchHref, searchLabel })`, `MobileMenu({ nav, cta, searchHref, searchLabel })`, `SiteFooter({ site })`.
- État attendu en fin de tâche : tests de `layout` et `ui` verts ; `hero`, `latest-articles`, `page`, `newsletter-form` encore rouges (Tasks 4, 5, 6, 7).

- [ ] **Step 1 : tests qui échouent**

`tests/components/layout/site-header.test.tsx` (contenu complet) :
```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from '@/components/layout/site-header';
import { site } from '@/content/site';

function renderHeader() {
  return render(
    <SiteHeader
      name={site.name}
      nav={site.nav}
      cta={site.headerCta}
      searchHref={site.searchHref}
      searchLabel={site.searchLabel}
    />,
  );
}

describe('SiteHeader', () => {
  it('renders the Cohezi logo link, the four editorial sections, search and the subscribe CTA', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: 'Cohezi, accueil' })).toHaveAttribute('href', '/');
    const nav = screen.getByRole('navigation', { name: 'Navigation principale' });
    expect(within(nav).getAllByRole('link')).toHaveLength(4);
    for (const item of site.nav) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.href);
    }
    expect(screen.getByRole('link', { name: 'Rechercher' })).toHaveAttribute('href', '/recherche');
    expect(screen.getByRole('link', { name: /S’inscrire/ })).toHaveAttribute('href', '#newsletter');
    expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toBeInTheDocument();
  });

  it('shows the brand logo, never a Rundown wordmark', () => {
    const { container } = renderHeader();
    expect(container.querySelectorAll('img[src^="/brand/"]').length).toBeGreaterThan(0);
    expect(screen.queryByText('The Rundown')).toBeNull();
  });
});
```

`tests/components/layout/mobile-menu.test.tsx` : garder le `vi.mock('next/link', …)` en tête du fichier, remplacer le `describe` par :
```tsx
describe('MobileMenu', () => {
  const props = {
    nav: site.nav,
    cta: site.headerCta,
    searchHref: site.searchHref,
    searchLabel: site.searchLabel,
  };

  it('opens the panel, locks body scroll and reflects the state in aria-expanded', async () => {
    const user = userEvent.setup();
    render(<MobileMenu {...props} />);
    const trigger = screen.getByRole('button', { name: 'Ouvrir le menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).toBeNull();

    await user.click(trigger);
    expect(screen.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Société' })).toHaveAttribute('href', '/societe');
    expect(screen.getByRole('link', { name: 'Rechercher' })).toHaveAttribute('href', '/recherche');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape and restores body scroll', async () => {
    const user = userEvent.setup();
    render(<MobileMenu {...props} />);
    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });

  it('closes when a navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileMenu {...props} />);
    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
    await user.click(screen.getByRole('link', { name: 'Business' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
```

`tests/components/layout/site-footer.test.tsx` (contenu complet) :
```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteFooter } from '@/components/layout/site-footer';
import { site } from '@/content/site';

describe('SiteFooter', () => {
  it('renders the tagline, the three columns, the copyright and the social row', () => {
    render(<SiteFooter site={site} />);
    for (const line of site.footer.tagline) expect(screen.getByText(line)).toBeInTheDocument();
    for (const column of site.footer.columns) {
      const nav = screen.getByRole('navigation', { name: column.heading });
      for (const link of column.links) {
        expect(within(nav).getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
      }
    }
    expect(screen.getByText('© 2026 Cohezi')).toBeInTheDocument();
    const social = within(screen.getByRole('list', { name: 'Réseaux sociaux' }));
    for (const link of site.footer.social) {
      expect(social.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }
    expect(screen.getByRole('button', { name: /S’inscrire/ })).toBeInTheDocument();
  });

  it('uses the black Cohezi lockup', () => {
    const { container } = render(<SiteFooter site={site} />);
    expect(container.querySelector('img[src="/brand/cohezi-lockup-noir.png"]')).not.toBeNull();
  });
});
```

`tests/components/ui/tabs.test.tsx` : remplacer les libellés du tableau `items` par `{ slug: 'all', label: 'Toutes' }` et `{ slug: 'business', label: 'Business' }`, l'`ariaLabel` par `"Filtrer les articles"`, et les recherches de boutons par `{ name: 'Toutes' }` / `{ name: 'Business' }` (l'assertion `onChange` attend `'business'`).

Run : `pnpm test tests/components/layout tests/components/ui/tabs.test.tsx`
Expected : FAIL — libellés anglais, props `searchHref`/`searchLabel` absentes, logo Rundown encore présent.

- [ ] **Step 2 : `components/layout/site-header.tsx` (contenu complet)**

```tsx
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/button';
import { CoheziLogo } from '@/components/ui/cohezi-logo';
import { Icon } from '@/components/ui/icon';
import type { NavItem } from '@/content/types';
import { MobileMenu } from './mobile-menu';

type SiteHeaderProps = {
  name: string;
  nav: NavItem[];
  cta: NavItem;
  searchHref: string;
  searchLabel: string;
};

export function SiteHeader({ name, nav, cta, searchHref, searchLabel }: SiteHeaderProps) {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-transparent bg-ink transition-colors duration-300">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 lg:px-24">
        <Link
          href="/"
          aria-label={`${name}, accueil`}
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <CoheziLogo tone="dark" />
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-link relative py-1 text-base font-medium text-paper/90 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-paper hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={searchHref}
            aria-label={searchLabel}
            className="site-nav-link flex h-10 w-10 items-center justify-center rounded-lg text-paper/90 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Icon name="search" size={18} />
          </Link>
          <ButtonLink href={cta.href} variant="paper" size="sm" className="border border-line">
            {cta.label}
            <Icon name="arrow-right" size={16} />
          </ButtonLink>
        </div>
        <MobileMenu nav={nav} cta={cta} searchHref={searchHref} searchLabel={searchLabel} />
      </div>
    </header>
  );
}
```

- [ ] **Step 3 : `components/layout/mobile-menu.tsx` (props et libellés)**

Remplacer le type et la signature :
```tsx
type MobileMenuProps = { nav: NavItem[]; cta: NavItem; searchHref: string; searchLabel: string };

export function MobileMenu({ nav, cta, searchHref, searchLabel }: MobileMenuProps) {
```
Remplacer les libellés du déclencheur :
```tsx
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
```
Et le contenu du panneau (`<nav>` + CTA) par :
```tsx
        <nav aria-label="Navigation mobile" className="flex flex-col gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="font-display text-xl font-semibold uppercase text-paper/90 transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={searchHref}
            aria-label={searchLabel}
            onClick={close}
            className="inline-flex items-center gap-2 text-base font-medium text-paper/80 transition-colors hover:text-paper"
          >
            <Icon name="search" size={18} />
            {searchLabel}
          </Link>
        </nav>
        <ButtonLink href={cta.href} variant="paper" size="sm" className="self-start" onClick={close}>
          {cta.label}
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
```
Note : le lien de recherche porte `aria-label` **et** un texte visible identique ; `getByRole('link', { name: 'Rechercher' })` reste sans ambiguïté.

- [ ] **Step 4 : `components/layout/site-footer.tsx` (contenu complet)**

```tsx
import Link from 'next/link';
import { CoheziLogo } from '@/components/ui/cohezi-logo';
import { Icon } from '@/components/ui/icon';
import { NewsletterForm } from '@/components/ui/newsletter-form';
import type { SiteConfig } from '@/content/types';

export function SiteFooter({ site }: { site: SiteConfig }) {
  return (
    <footer className="bg-paper px-2 pb-2 pt-16 md:px-5">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label={`${site.name}, accueil`}
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <CoheziLogo tone="light" size="footer" />
            </Link>
            <p className="mt-6 max-w-sm font-display text-lg font-medium leading-7 text-ink">
              {site.footer.tagline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <NewsletterForm
              variant="footer"
              placeholder={site.newsletter.emailPlaceholder}
              buttonLabel={site.hero.subscribeLabel}
              className="mt-6"
            />
          </div>
          {site.footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink">{column.heading}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink/70 transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink/60">{site.footer.copyright}</p>
          <ul aria-label="Réseaux sociaux" className="flex items-center gap-3">
            {site.footer.social.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-line/60"
                >
                  <Icon name={social.icon} size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5 : `components/ui/tabs.tsx` (onglets Cohezi)**

Remplacer la classe du bouton par :
```tsx
            className={cn(
              'h-[33px] rounded-lg px-4 font-sans text-[15px] leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-line/60',
            )}
```

- [ ] **Step 6 : suppression du logo Rundown, tests, commit**

```bash
cd /home/darellchooks/Documents/cohezi
git rm -q components/ui/brand-logo.tsx tests/components/ui/brand-logo.test.tsx
pnpm test tests/components/layout tests/components/ui
```
Expected : PASS sauf `tests/components/ui/newsletter-form.test.tsx` (libellés anglais, Task 6).

```bash
git add -A components tests docs/superpowers/plans/
git commit -m "feat(cohezi): header, menu mobile et footer aux couleurs et contenus Cohezi

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4 : Hero Cohezi

**Files:**
- Rewrite: `components/sections/hero.tsx`
- Delete: `components/ui/logo-wordmark.tsx`
- Test: `tests/components/sections/hero.test.tsx`

**Interfaces:**
- Consumes : `HeroContent` (eyebrow, titleLine1, titleLine2, description, emailPlaceholder, subscribeLabel, microCopy, promise), `NewsletterForm`.
- Produces : `Hero({ hero: HeroContent })`.
- État attendu : test `hero` vert ; `latest-articles`, `page`, `newsletter-form` encore rouges.

- [ ] **Step 1 : test qui échoue**

`tests/components/sections/hero.test.tsx` (contenu complet) :
```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from '@/components/sections/hero';
import { site } from '@/content/site';

describe('Hero', () => {
  it('renders the eyebrow, the two-line headline, the form, the micro-copy and the promise', () => {
    render(<Hero hero={site.hero} />);
    expect(screen.getByText(site.hero.eyebrow)).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('L’IA change le monde. Comprenez ce qui compte');
    expect(heading.className).toContain('font-display');
    expect(heading.className).toContain('uppercase');
    expect(screen.getByText(site.hero.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /S’inscrire/ })).toBeInTheDocument();
    expect(screen.getByText(site.hero.microCopy)).toBeInTheDocument();
    expect(screen.getByText(site.hero.promise)).toBeInTheDocument();
  });

  it('closes the headline with a decorative green square instead of a full stop', () => {
    render(<Hero hero={site.hero} />);
    const heading = screen.getByRole('heading', { level: 1 });
    const square = within(heading).getByTestId('hero-accent-square');
    expect(square).toHaveAttribute('aria-hidden', 'true');
    expect(square.className).toContain('bg-accent');
    expect(heading.textContent?.trim().endsWith('.')).toBe(false);
  });

  it('does not show any Rundown trusted-by logo row', () => {
    render(<Hero hero={site.hero} />);
    expect(screen.queryByRole('list', { name: 'Trusted by' })).toBeNull();
    expect(screen.queryByText('Google')).toBeNull();
  });
});
```

Run : `pnpm test tests/components/sections/hero.test.tsx`
Expected : FAIL — le hero rend encore le titre Rundown et la rangée de logos.

- [ ] **Step 2 : `components/sections/hero.tsx` (contenu complet)**

```tsx
import { NewsletterForm } from '@/components/ui/newsletter-form';
import type { HeroContent } from '@/content/types';

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section aria-labelledby="hero-title" className="hero-dark-change px-5 pb-16 pt-20 text-center md:pt-28">
      <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
        <span aria-hidden className="h-2 w-2 bg-accent" />
        {hero.eyebrow}
      </p>
      <h1
        id="hero-title"
        className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.08] tracking-[-0.01em] text-paper md:text-[64px]"
      >
        {hero.titleLine1} <br className="hidden md:inline" />
        {hero.titleLine2}
        <span
          aria-hidden="true"
          data-testid="hero-accent-square"
          className="ml-2 inline-block h-[0.16em] w-[0.16em] bg-accent align-baseline"
        />
      </h1>
      <p className="mx-auto mt-6 max-w-[520px] text-lg leading-7 text-paper/80">{hero.description}</p>
      <div className="mt-8 flex justify-center">
        <NewsletterForm variant="hero" placeholder={hero.emailPlaceholder} buttonLabel={hero.subscribeLabel} />
      </div>
      <p className="mt-4 text-sm text-paper/60">{hero.microCopy}</p>
      <p className="mx-auto mt-16 max-w-2xl font-display text-sm font-medium uppercase tracking-[0.12em] text-paper/70">
        {hero.promise}
      </p>
    </section>
  );
}
```
Le carré vert est un `<span>` sans texte : il n'est pas repeint par la bascule au défilement, qui ne change que la propriété `color`.

- [ ] **Step 3 : suppression, tests, commit**

```bash
cd /home/darellchooks/Documents/cohezi
git rm -q components/ui/logo-wordmark.tsx
pnpm test tests/components/sections/hero.test.tsx
```
Expected : PASS (3 tests).

```bash
git add -A components tests docs/superpowers/plans/
git commit -m "feat(cohezi): hero éditorial avec promesse et accent vert

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5 : À la une, Business et Société

**Files:**
- Rewrite: `components/sections/latest-articles.tsx`
- Create: `components/sections/article-grid-section.tsx`
- Test: `tests/components/sections/latest-articles.test.tsx`, `tests/components/sections/article-grid-section.test.tsx`

**Interfaces:**
- Consumes : `ArticleCard` (variantes `featured`, `compact`, `grid`), `FilterableGrid`, `SectionHeading`, `ButtonLink`, `Icon`, `categories`, `latest` / `byCategory` / `pickFeatured`.
- Produces : `LatestArticles({ copy: SectionCopy; articles: Article[] })` (client), `ArticleGridSection({ id: string; copy: SectionCopy; articles: Article[] })` (serveur).
- État attendu : tests `sections` verts ; `page` et `newsletter-form` encore rouges.

- [ ] **Step 1 : tests qui échouent**

`tests/components/sections/latest-articles.test.tsx` (contenu complet) :
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LatestArticles } from '@/components/sections/latest-articles';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { latest } from '@/lib/articles';

const front = latest(articles);

describe('LatestArticles', () => {
  it('renders the French heading, the five front-page articles and the view-all link', () => {
    render(<LatestArticles copy={site.sections.latest} articles={front} />);
    expect(screen.getByRole('heading', { level: 2, name: 'À la une' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getByRole('link', { name: /Voir toutes les actualités/ })).toHaveAttribute('href', '/actualite');
  });

  it('offers one tab per editorial category plus "Toutes"', () => {
    render(<LatestArticles copy={site.sections.latest} articles={front} />);
    const tabs = screen.getByRole('group', { name: 'Filtrer les articles' });
    expect(tabs.querySelectorAll('button')).toHaveLength(5);
    for (const label of ['Toutes', 'Actualité', 'Business', 'Société', 'Analyse']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
  });

  it('filters by tab and promotes the first match as the featured card', async () => {
    const user = userEvent.setup();
    render(<LatestArticles copy={site.sections.latest} articles={front} />);
    await user.click(screen.getByRole('button', { name: 'Business' }));
    const cards = screen.getAllByRole('article');
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.length).toBeLessThan(5);
    expect(cards[0]!.className).toContain('featured');
    for (const card of cards) expect(card).toHaveTextContent('Business');
  });
});
```

`tests/components/sections/article-grid-section.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleGridSection } from '@/components/sections/article-grid-section';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { byCategory } from '@/lib/articles';

const business = byCategory(articles, 'business');

describe('ArticleGridSection', () => {
  it('renders the heading, the eight cards and the view-all link', () => {
    render(<ArticleGridSection id="business" copy={site.sections.business} articles={business} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Business' })).toHaveAttribute('id', 'business-title');
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
    expect(screen.getAllByRole('article')).toHaveLength(8);
    expect(screen.getByRole('link', { name: /Voir tout le business/ })).toHaveAttribute('href', '/business');
  });

  it('labels the section with its own heading and shows no filter', () => {
    render(<ArticleGridSection id="societe" copy={site.sections.societe} articles={byCategory(articles, 'societe')} />);
    expect(screen.getByRole('region', { name: 'Société' })).toBeInTheDocument();
    expect(screen.queryByRole('group')).toBeNull();
  });
});
```

Run : `pnpm test tests/components/sections`
Expected : FAIL — `article-grid-section` introuvable, `LatestArticles` encore sur le contenu Rundown.

- [ ] **Step 2 : `components/sections/latest-articles.tsx` (contenu complet)**

```tsx
'use client';

import { ArticleCard } from '@/components/cards/article-card';
import { ButtonLink } from '@/components/ui/button';
import { FilterableGrid } from '@/components/ui/filterable-grid';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import { categories } from '@/content/categories';
import type { Article, SectionCopy } from '@/content/types';
import { pickFeatured } from '@/lib/articles';

const TABS = categories.map((category) => ({ slug: category.slug, label: category.label }));

type LatestArticlesProps = { copy: SectionCopy; articles: Article[] };

export function LatestArticles({ copy, articles }: LatestArticlesProps) {
  return (
    <section aria-labelledby="latest-articles-title" className="px-5 py-16 md:py-20">
      <SectionHeading id="latest-articles-title" title={copy.title} subtitle={copy.subtitle} />
      <FilterableGrid
        items={articles}
        categories={TABS}
        getCategories={(article) => [article.category]}
        filterLabel="Filtrer les articles"
        allLabel="Toutes"
        renderItems={(visible) => {
          const { featured, rest } = pickFeatured(visible);
          return (
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
              {featured ? <ArticleCard article={featured} variant="featured" /> : null}
              {rest.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2">
                  {rest.map((article) => (
                    <ArticleCard key={article.slug} article={article} variant="compact" />
                  ))}
                </div>
              ) : null}
            </div>
          );
        }}
      />
      <div className="mt-12 flex justify-center">
        <ButtonLink href={copy.viewAllHref} variant="outline" size="sm">
          {copy.viewAllLabel}
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
      </div>
    </section>
  );
}
```

- [ ] **Step 3 : `components/sections/article-grid-section.tsx`**

```tsx
import { ArticleCard } from '@/components/cards/article-card';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Article, SectionCopy } from '@/content/types';

type ArticleGridSectionProps = { id: string; copy: SectionCopy; articles: Article[] };

/**
 * Grille éditoriale partagée par Business et Société : même gabarit que les grilles du clone
 * (4 colonnes desktop, 3 cartes visibles sous md), sans filtre.
 */
export function ArticleGridSection({ id, copy, articles }: ArticleGridSectionProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="px-5 py-16 md:py-20">
      <SectionHeading id={`${id}-title`} title={copy.title} subtitle={copy.subtitle} />
      <ul className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4 [&>li:nth-child(n+4)]:hidden md:[&>li:nth-child(n+4)]:block">
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} variant="grid" />
          </li>
        ))}
      </ul>
      <div className="mt-12 flex justify-center">
        <ButtonLink href={copy.viewAllHref} variant="outline" size="sm">
          {copy.viewAllLabel}
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
      </div>
    </section>
  );
}
```

- [ ] **Step 4 : tests et commit**

Run : `pnpm test tests/components/sections`
Expected : PASS (hero 3 + latest 3 + grid 2).

```bash
git add -A components tests docs/superpowers/plans/
git commit -m "feat(cohezi): section À la une filtrable et grilles Business / Société

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6 : Décryptage, bloc newsletter et formulaire en français

**Files:**
- Create: `components/sections/deep-dive.tsx`, `components/sections/newsletter-cta.tsx`
- Modify: `components/ui/newsletter-form.tsx`
- Test: `tests/components/sections/deep-dive.test.tsx`, `tests/components/sections/newsletter-cta.test.tsx`, `tests/components/ui/newsletter-form.test.tsx`

**Interfaces:**
- Consumes : `DeepDiveCopy`, `NewsletterCopy`, `Article`, `articleHref`, `Icon`, `NewsletterForm`.
- Produces : `DeepDive({ copy: DeepDiveCopy; article: Article })`, `NewsletterCta({ copy: NewsletterCopy })`, `NewsletterForm({ variant?; buttonTone?: 'ink' | 'accent'; placeholder?; buttonLabel?; endpoint?; className? })`, `MESSAGES` en français.
- État attendu : tous les tests verts sauf `tests/app/page.test.tsx` (Task 7).

- [ ] **Step 1 : tests qui échouent**

`tests/components/sections/deep-dive.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DeepDive } from '@/components/sections/deep-dive';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { deepDive } from '@/lib/articles';

const article = deepDive(articles)!;

describe('DeepDive', () => {
  it('renders the eyebrow, the green number, the title, the excerpt and the reading time', () => {
    render(<DeepDive copy={site.deepDive} article={article} />);
    expect(screen.getByText('Cohezi / Décryptage')).toBeInTheDocument();
    const number = screen.getByText('01');
    expect(number.className).toContain('text-accent');
    expect(number.className).toContain('font-display');
    expect(screen.getByRole('heading', { level: 2, name: article.title })).toBeInTheDocument();
    expect(screen.getByText(article.excerpt)).toBeInTheDocument();
    expect(screen.getByText(`${article.readingMinutes} min de lecture`)).toBeInTheDocument();
  });

  it('links to the article on a dark surface', () => {
    const { container } = render(<DeepDive copy={site.deepDive} article={article} />);
    expect(screen.getByRole('link', { name: /Lire le décryptage/ })).toHaveAttribute(
      'href',
      `/analyses/${article.slug}`,
    );
    expect(container.querySelector('.bg-ink')).not.toBeNull();
  });
});
```

`tests/components/sections/newsletter-cta.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NewsletterCta } from '@/components/sections/newsletter-cta';
import { site } from '@/content/site';

describe('NewsletterCta', () => {
  it('renders the two-line heading, the description and the green subscribe button', () => {
    render(<NewsletterCta copy={site.newsletter} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Moins de bruit. Plus de contexte.');
    expect(screen.getByText(site.newsletter.description)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Je m’inscris/ });
    expect(button.className).toContain('bg-accent');
    expect(screen.getByText(site.newsletter.microCopy)).toBeInTheDocument();
  });

  it('is the anchor target of the header CTA', () => {
    const { container } = render(<NewsletterCta copy={site.newsletter} />);
    expect(container.querySelector('section#newsletter')).not.toBeNull();
  });
});
```

`tests/components/ui/newsletter-form.test.tsx` : remplacer les recherches de bouton `{ name: /subscribe/i }` par `{ name: /S’inscrire/ }`, le libellé `'Email address'` par `'Adresse e-mail'`, et le dernier test par :
```tsx
  it('uses the given placeholder, button label and accent tone', () => {
    render(<NewsletterForm variant="hero" buttonTone="accent" placeholder="Votre adresse e-mail" buttonLabel="Je m’inscris" />);
    expect(screen.getByPlaceholderText('Votre adresse e-mail')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Je m’inscris/ }).className).toContain('bg-accent');
  });
```

Run : `pnpm test tests/components/sections/deep-dive.test.tsx tests/components/sections/newsletter-cta.test.tsx tests/components/ui/newsletter-form.test.tsx`
Expected : FAIL — composants introuvables, libellés anglais.

- [ ] **Step 2 : `components/ui/newsletter-form.tsx` (messages FR et ton du bouton)**

Remplacer `MESSAGES`, le type des props et la signature :
```tsx
export const MESSAGES = {
  invalid: 'Saisissez une adresse e-mail valide.',
  success: 'Vérifiez votre boîte mail pour confirmer.',
  failure: 'Une erreur est survenue, réessayez.',
} as const;

type Status = 'idle' | 'sending' | 'success' | 'error';

type NewsletterFormProps = {
  variant?: 'hero' | 'footer';
  buttonTone?: 'ink' | 'accent';
  placeholder?: string;
  buttonLabel?: string;
  endpoint?: string;
  className?: string;
};

export function NewsletterForm({
  variant = 'hero',
  buttonTone = 'ink',
  placeholder = 'Votre adresse e-mail',
  buttonLabel = 'S’inscrire',
  endpoint = '/api/newsletter',
  className,
}: NewsletterFormProps) {
```
Remplacer le libellé masqué et le bouton :
```tsx
        <label htmlFor={inputId} className="sr-only">
          Adresse e-mail
        </label>
```
```tsx
        <Button
          type="submit"
          variant={buttonTone}
          size={isHero ? 'md' : 'sm'}
          disabled={sending}
          className={cn(!isHero && 'h-9 px-3 text-sm')}
        >
          {buttonLabel}
          <Icon name="send" size={16} />
        </Button>
```
Remplacer la classe du message d'état (couleurs Cohezi) :
```tsx
        className={cn(
          'mt-2 text-sm',
          status === 'error' ? (isHero ? 'text-accent' : 'text-accent-deep') : isHero ? 'text-paper/80' : 'text-ink/70',
          !message && 'sr-only',
        )}
```

- [ ] **Step 3 : `components/sections/deep-dive.tsx`**

```tsx
import Link from 'next/link';
import { articleHref } from '@/components/cards/article-card';
import { Icon } from '@/components/ui/icon';
import type { Article, DeepDiveCopy } from '@/content/types';

type DeepDiveProps = { copy: DeepDiveCopy; article: Article };

/** Bloc éditorial sombre, à la place du bloc podcast du clone. */
export function DeepDive({ copy, article }: DeepDiveProps) {
  return (
    <section aria-labelledby="deep-dive-title" className="px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl rounded-2xl bg-ink px-8 py-16 text-paper md:px-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
              <span aria-hidden className="h-2 w-2 bg-accent" />
              {copy.eyebrow}
            </p>
            <p className="mt-6 font-display text-6xl font-bold leading-none text-accent md:text-[96px]">{copy.number}</p>
          </div>
          <div>
            <h2
              id="deep-dive-title"
              className="font-display text-[28px] font-bold uppercase leading-[1.1] tracking-[-0.01em] text-paper md:text-[40px]"
            >
              {article.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-7 text-paper/70">{article.excerpt}</p>
            <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">
              {article.readingMinutes} {copy.readLabel}
            </p>
            <Link
              href={articleHref(article)}
              className="group mt-6 inline-flex items-center gap-2 font-semibold text-accent transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {copy.ctaLabel}
              <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4 : `components/sections/newsletter-cta.tsx`**

```tsx
import { NewsletterForm } from '@/components/ui/newsletter-form';
import type { NewsletterCopy } from '@/content/types';

/** Bloc newsletter plein écran, à la place du bloc University du clone. */
export function NewsletterCta({ copy }: { copy: NewsletterCopy }) {
  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="bg-ink px-5 py-24 text-center">
      <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
        <span aria-hidden className="h-2 w-2 bg-accent" />
        {copy.eyebrow}
      </p>
      <h2
        id="newsletter-title"
        className="mx-auto mt-6 max-w-3xl font-display text-[32px] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-paper md:text-5xl"
      >
        {copy.titleLine1} <br className="hidden md:inline" />
        {copy.titleLine2}
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-paper/80">{copy.description}</p>
      <div className="mt-8 flex justify-center">
        <NewsletterForm
          variant="hero"
          buttonTone="accent"
          placeholder={copy.emailPlaceholder}
          buttonLabel={copy.buttonLabel}
        />
      </div>
      <p className="mt-4 text-sm text-paper/60">{copy.microCopy}</p>
    </section>
  );
}
```

- [ ] **Step 5 : tests et commit**

Run : `pnpm test tests/components`
Expected : PASS (tous les composants).

```bash
git add -A components tests docs/superpowers/plans/
git commit -m "feat(cohezi): bloc Décryptage, CTA newsletter et formulaire en français

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7 : Assemblage de la page, pages « bientôt disponible » et build vert

**Files:**
- Rewrite: `app/page.tsx`, `app/[...slug]/page.tsx`, `app/not-found.tsx`
- Delete: `lib/slug.ts`, `tests/lib/slug.test.ts`
- Test: `tests/app/page.test.tsx`, `tests/app/coming-soon.test.tsx`

**Interfaces:**
- Consumes : toutes les sections, `SiteHeader`, `SiteFooter`, `HeroLightSwitch`, `latest`, `byCategory`, `deepDive`, `site.comingSoon`.
- Produces : `HomePage()` (Server Component synchrone), `ComingSoonPage({ params })` (async), `NotFound()`.
- État attendu : `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build` **tous verts**.

- [ ] **Step 1 : tests qui échouent**

`tests/app/page.test.tsx` (contenu complet) :
```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';
import { articles } from '@/content/articles';
import { deepDive } from '@/lib/articles';

describe('HomePage', () => {
  it('assembles the header, the Cohezi sections and the footer from content', () => {
    render(<HomePage />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'L’IA change le monde. Comprenez ce qui compte',
    );
    const h2 = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    expect(h2).toEqual([
      'À la une',
      'Business',
      'Société',
      deepDive(articles)!.title,
      'Moins de bruit. Plus de contexte.',
    ]);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('shows five front-page cards, eight business cards and eight société cards', () => {
    render(<HomePage />);
    expect(screen.getAllByRole('article')).toHaveLength(21);
    const main = screen.getByRole('main');
    expect(within(main).getAllByRole('link', { name: /Voir tout/ })).toHaveLength(3);
  });

  it('offers three subscribe forms: hero, newsletter block and footer', () => {
    render(<HomePage />);
    expect(screen.getAllByRole('button', { name: /inscri/i })).toHaveLength(3);
    expect(screen.getByRole('link', { name: /S’inscrire/ })).toHaveAttribute('href', '#newsletter');
  });

  it('keeps no Rundown content', () => {
    render(<HomePage />);
    for (const word of ['Guides', 'Trending Tools', 'Rowan', 'University', 'The Rundown']) {
      expect(screen.queryByText(new RegExp(word))).toBeNull();
    }
  });
});
```
Note : le libellé « Voir toutes les actualités » commence aussi par « Voir tout », les trois liens sont donc bien comptés.

`tests/app/coming-soon.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ComingSoonPage, { generateStaticParams } from '@/app/[...slug]/page';
import { site } from '@/content/site';

describe('ComingSoonPage', () => {
  it('pre-renders one path per announced page', () => {
    expect(generateStaticParams()).toEqual(site.comingSoon.map((page) => ({ slug: [page.slug] })));
  });

  it('renders the French label of a known section', async () => {
    render(await ComingSoonPage({ params: Promise.resolve({ slug: ['a-propos'] }) }));
    expect(screen.getByRole('heading', { level: 1, name: 'À propos' })).toBeInTheDocument();
    expect(screen.getByText('Cette page arrive bientôt.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Retour à l’accueil/ })).toHaveAttribute('href', '/');
  });

  it('accepts a deeper path under a known section', async () => {
    render(await ComingSoonPage({ params: Promise.resolve({ slug: ['business', 'un-article'] }) }));
    expect(screen.getByRole('heading', { level: 1, name: 'Business' })).toBeInTheDocument();
  });
});
```

Run : `pnpm test tests/app`
Expected : FAIL — page encore assemblée avec les sections Rundown, `site.comingSoon` inexistant.

- [ ] **Step 2 : `app/page.tsx` (contenu complet)**

```tsx
import { HeroLightSwitch } from '@/components/layout/hero-light-switch';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ArticleGridSection } from '@/components/sections/article-grid-section';
import { DeepDive } from '@/components/sections/deep-dive';
import { Hero } from '@/components/sections/hero';
import { LatestArticles } from '@/components/sections/latest-articles';
import { NewsletterCta } from '@/components/sections/newsletter-cta';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { byCategory, deepDive, latest } from '@/lib/articles';

export default function HomePage() {
  const front = latest(articles);
  const business = byCategory(articles, 'business');
  const societe = byCategory(articles, 'societe');
  const analysis = deepDive(articles);

  return (
    <>
      <HeroLightSwitch />
      <SiteHeader
        name={site.name}
        nav={site.nav}
        cta={site.headerCta}
        searchHref={site.searchHref}
        searchLabel={site.searchLabel}
      />
      <main className="flex-1">
        <div className="page-dark bg-ink">
          <Hero hero={site.hero} />
          <div className="px-2 md:px-5">
            <div className="mx-auto rounded-sheet bg-paper">
              <LatestArticles copy={site.sections.latest} articles={front} />
              <ArticleGridSection id="business" copy={site.sections.business} articles={business} />
              <ArticleGridSection id="societe" copy={site.sections.societe} articles={societe} />
              {analysis ? <DeepDive copy={site.deepDive} article={analysis} /> : null}
            </div>
          </div>
          <NewsletterCta copy={site.newsletter} />
        </div>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
```

- [ ] **Step 3 : `app/[...slug]/page.tsx` (contenu complet)**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { site } from '@/content/site';

type ComingSoonPageProps = { params: Promise<{ slug: string[] }> };

function findPage(segment: string | undefined) {
  return site.comingSoon.find((page) => page.slug === segment);
}

export function generateStaticParams() {
  return site.comingSoon.map((page) => ({ slug: [page.slug] }));
}

export async function generateMetadata({ params }: ComingSoonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug[0]);
  return { title: page ? `${page.label} — Bientôt disponible` : 'Bientôt disponible' };
}

export default async function ComingSoonPage({ params }: ComingSoonPageProps) {
  const { slug } = await params;
  const page = findPage(slug[0]);
  if (!page) notFound();

  return (
    <>
      <SiteHeader
        name={site.name}
        nav={site.nav}
        cta={site.headerCta}
        searchHref={site.searchHref}
        searchLabel={site.searchLabel}
      />
      <main className="flex flex-1 flex-col items-center justify-center bg-ink px-5 py-32 text-center text-paper">
        <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
          <span aria-hidden className="h-2 w-2 bg-accent" />
          {slug.join(' / ')}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-[-0.01em] md:text-6xl">{page.label}</h1>
        <p className="mt-4 text-lg text-paper/80">Cette page arrive bientôt.</p>
        <ButtonLink href="/" variant="paper" size="sm" className="mt-8">
          <Icon name="arrow-right" size={16} className="rotate-180" />
          Retour à l’accueil
        </ButtonLink>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
```

- [ ] **Step 4 : `app/not-found.tsx` (contenu complet)**

```tsx
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { site } from '@/content/site';

export default function NotFound() {
  return (
    <>
      <SiteHeader
        name={site.name}
        nav={site.nav}
        cta={site.headerCta}
        searchHref={site.searchHref}
        searchLabel={site.searchLabel}
      />
      <main className="flex flex-1 flex-col items-center justify-center bg-ink px-5 py-32 text-center text-paper">
        <h1 className="font-display text-4xl font-bold uppercase tracking-[-0.01em] md:text-6xl">Page introuvable</h1>
        <ButtonLink href="/" variant="paper" size="sm" className="mt-8">
          Retour à l’accueil
        </ButtonLink>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
```

- [ ] **Step 5 : suppression du helper devenu inutile et vérification complète**

```bash
cd /home/darellchooks/Documents/cohezi
git rm -q lib/slug.ts tests/lib/slug.test.ts
pnpm test && pnpm typecheck && pnpm lint && pnpm build
```
Expected : tests verts (aucun échec), typecheck sans erreur, lint sans avertissement, build listant `/`, `/_not-found`, `/api/newsletter` et `/[...slug]` avec les 7 chemins pré-rendus.

Contrôle des routes :
```bash
curl -s -o /dev/null http://localhost:3000 && OWN="" || { setsid node_modules/.bin/next start -p 3000 > /tmp/cohezi-server.log 2>&1 < /dev/null & echo $! > /tmp/cohezi-server.pgid; OWN=1; sleep 4; }
for p in / /business /business/un-article /analyses /a-propos /recherche /inconnu; do printf "%-24s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)"; done
[ -n "${OWN:-}" ] && kill -TERM -- "-$(cat /tmp/cohezi-server.pgid)" && rm -f /tmp/cohezi-server.pgid || true
```
Expected : `/` 200, `/business` 200, `/business/un-article` 200, `/analyses` 200, `/a-propos` 200, `/recherche` 200, `/inconnu` 404.

- [ ] **Step 6 : commit**

```bash
git add -A app lib tests docs/superpowers/plans/
git commit -m "feat(cohezi): assemblage de la page d’accueil et pages bientôt disponibles

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8 : QA visuelle, conformité à la charte et livraison

**Files:**
- Modify: tout composant dont le rendu s'écarte de la charte ou de la structure du clone ; `docs/superpowers/specs/2026-09-04-cohezi-rebrand-design.md` (statut)

**Interfaces:** aucune nouvelle.

- [ ] **Step 1 : audit statique de la charte**

```bash
cd /home/darellchooks/Documents/cohezi
echo "--- couleurs interdites (attendu : aucune sortie) ---"
grep -rnE "bg-white|text-white|border-white|neutral-[0-9]|indigo-|purple-|violet-|-gradient|ring-brand|text-brand\b|bg-brand\b" components app content --include=*.tsx --include=*.ts --include=*.css || echo OK
# `hashToGradient` (lib/) et les chemins `/brand/…` du logo sont légitimes : le motif ci-dessus ne les vise pas.
echo "--- polices : chaque titre de section, H1 et H2 doit porter font-display ---"
grep -rn "font-display" components | wc -l    # attendu : >= 8
echo "--- part du vert : occurrences de accent dans les composants ---"
grep -rno "accent" components --include=*.tsx | wc -l   # attendu : entre 15 et 40 (accent rare)
echo "--- textes anglais résiduels ---"
grep -rnE "\b(Subscribe|Guides|Tools|Podcast|University|Latest Articles|coming soon|Back to home)\b" components app content --include=*.tsx --include=*.ts || echo OK
```
Corriger toute sortie inattendue avant de continuer.

- [ ] **Step 2 : captures desktop 1440 et mobile 375**

```bash
curl -s -o /dev/null http://localhost:3000 && OWN="" || { pnpm build && setsid node_modules/.bin/next start -p 3000 > /tmp/cohezi-server.log 2>&1 < /dev/null & echo $! > /tmp/cohezi-server.pgid; OWN=1; sleep 5; }
B="$HOME/.claude/skills/gstack/browse/dist/browse"
mkdir -p /tmp/cohezi-qa-v2
scroll() { $B js "document.documentElement.style.scrollBehavior='auto'; window.scrollTo({top: $1, behavior: 'instant'})" >/dev/null; sleep 0.4; }
section() { $B js "document.documentElement.style.scrollBehavior='auto'; window.scrollTo({top: document.getElementById('$1-title').getBoundingClientRect().top + window.scrollY - $2, behavior: 'instant'})" >/dev/null; sleep 0.4; }

$B viewport 1440x900 >/dev/null; $B goto http://localhost:3000 >/dev/null
echo "erreurs console :"; $B console --errors | sed -n '2,6p'
echo "hauteur desktop : $($B js 'document.documentElement.scrollHeight') | pas de débordement : $($B js 'document.documentElement.scrollWidth <= window.innerWidth')"
scroll 0; $B screenshot --viewport /tmp/cohezi-qa-v2/d-01-hero.png >/dev/null
for s in latest-articles business societe deep-dive newsletter; do section "$s" 120; $B screenshot --viewport "/tmp/cohezi-qa-v2/d-$s.png" >/dev/null; done
scroll 99999; $B screenshot --viewport /tmp/cohezi-qa-v2/d-footer.png >/dev/null

$B viewport 375x812 >/dev/null; $B goto http://localhost:3000 >/dev/null
echo "hauteur mobile : $($B js 'document.documentElement.scrollHeight') | pas de débordement : $($B js 'document.documentElement.scrollWidth <= window.innerWidth')"
scroll 0; $B screenshot --viewport /tmp/cohezi-qa-v2/m-01-hero.png >/dev/null
for s in latest-articles business societe deep-dive newsletter; do section "$s" 80; $B screenshot --viewport "/tmp/cohezi-qa-v2/m-$s.png" >/dev/null; done
$B js "document.querySelector('button[aria-label=\"Ouvrir le menu\"]').click()" >/dev/null; sleep 0.4
$B screenshot --viewport /tmp/cohezi-qa-v2/m-menu.png >/dev/null; $B press Escape >/dev/null
[ -n "${OWN:-}" ] && kill -TERM -- "-$(cat /tmp/cohezi-server.pgid)" && rm -f /tmp/cohezi-server.pgid || true
```

Lire chaque PNG et vérifier, point par point :
1. **Header** : lockup Cohezi lisible (≥ 120 px de large), 4 liens, icône de recherche, bouton « S’inscrire » ; en clair après défilement, lockup noir sur fond blanc cassé.
2. **Hero** : eyebrow avec carré vert, H1 en capitales Space Grotesk sur deux lignes terminé par le carré vert, description, formulaire, micro-copy, promesse. Aucun logo d'entreprise.
3. **À la une** : 5 onglets centrés, une grande carte à gauche avec badge, extrait et date française, 2×2 à droite, bouton « Voir toutes les actualités ».
4. **Business / Société** : 4 colonnes × 2 lignes de cartes bordées `#E2E2DE`, badge et date sur chaque carte, bouton « Voir tout ».
5. **Décryptage** : bloc noir arrondi, « 01 » vert en gros, titre en capitales, temps de lecture, lien vert.
6. **Newsletter** : fond noir, titre deux lignes, bouton vert « Je m’inscris ».
7. **Footer** : lockup noir, tagline sur deux lignes, 3 colonnes, « © 2026 Cohezi », 3 icônes rondes.
8. **Mobile** : hamburger, une colonne, 3 cartes par grille, menu plein écran lisible, aucun débordement horizontal.
9. **Part du vert** : sur chaque capture, le vert ne doit apparaître que par petites touches (jamais un aplat de fond).

Corriger les écarts dans les composants concernés, relancer `pnpm build` puis recapturer.

- [ ] **Step 3 : comparaison structurelle avec la réplique Rundown**

Comparer les hauteurs de section avec les captures de référence `screenshots/therundown-ai/sections/desktop/` : la structure doit rester reconnaissable (feuille blanche arrondie, mêmes largeurs de conteneur, même rythme vertical). Un écart de hauteur supérieur à 25 % sur une section signale un espacement modifié sans raison : le corriger, sauf si le contenu Cohezi le justifie (à noter dans le rapport final).

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
$B viewport 1440x900 >/dev/null; $B goto http://localhost:3000 >/dev/null
$B js "JSON.stringify([...document.querySelectorAll('section')].map((s) => ({ id: s.getAttribute('aria-labelledby'), h: Math.round(s.getBoundingClientRect().height) })))"
```
Référence Rundown (desktop) : hero 704, À la une 988, grille 1199, grille 1442, bloc sombre 890, CTA 1142.

- [ ] **Step 4 : parcours fonctionnels**

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
$B viewport 1440x900 >/dev/null; $B goto http://localhost:3000 >/dev/null
$B js "[...document.querySelectorAll('button[aria-pressed]')].find((b) => b.textContent.trim() === 'Business').click()" >/dev/null; sleep 0.3
echo "cartes après l’onglet Business : $($B js "document.querySelectorAll('#latest-articles-title ~ div article').length")"
$B fill "input[name=email]" "jane@example.com" >/dev/null
$B js "document.querySelector('form').requestSubmit()" >/dev/null; sleep 1.5
echo "message : $($B js "document.querySelector('[role=status]').textContent")"   # attendu : Vérifiez votre boîte mail pour confirmer.
$B js "document.querySelector('a[href=\"#newsletter\"]').click()" >/dev/null; sleep 0.6
echo "ancre newsletter atteinte : $($B js "Math.round(document.getElementById('newsletter').getBoundingClientRect().top) < 200")"
$B goto http://localhost:3000/analyses >/dev/null
echo "page à venir : $($B js "document.querySelector('main h1').textContent") / $($B js "document.querySelectorAll('main p')[1].textContent")"
```
Expected : onglet Business filtre bien, message de succès en français, ancre newsletter fonctionnelle, page « Analyses » avec « Cette page arrive bientôt. ».

- [ ] **Step 5 : vérification finale, statut de la spec, commit**

```bash
cd /home/darellchooks/Documents/cohezi
pnpm test && pnpm typecheck && pnpm lint && pnpm build
git status --short
```
Mettre à jour la ligne « Statut » de `docs/superpowers/specs/2026-09-04-cohezi-rebrand-design.md` en : `implémenté le <date>, écarts connus : <liste ou aucun>`.

```bash
git add -A
git commit -m "fix(cohezi): ajustements visuels après QA et spec marquée implémentée

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Rapport de fin attendu : sections livrées, nombre de tests, sortie de `pnpm build`, écarts restants (placeholders d'images, contenus fictifs, repli de police éventuel), et rappel que les textes d'articles sont fictifs et ne doivent pas être publiés tels quels.
