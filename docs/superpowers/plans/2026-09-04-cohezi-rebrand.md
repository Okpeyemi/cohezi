# Refonte Cohezi de la page d'accueil — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer le clone The Rundown déjà codé en page d'accueil Cohezi (identité, contenu, sections éditoriales) sans toucher à la structure, aux grilles ni aux comportements existants.

**Architecture:** Adaptation en place. Les tokens Tailwind, les polices et le logo changent d'abord (Task 1, projet vert). Le modèle de contenu est ensuite remplacé d'un bloc avec les cartes et les sélecteurs (Task 2), puis chaque section du clone est réécrite ou remplacée par son équivalent Cohezi (Tasks 3 à 6) ; l'assemblage de la page remet `typecheck`, `lint` et `build` au vert (Task 7) avant la QA visuelle (Task 8). Entre Task 2 et Task 7, `pnpm typecheck` et certains tests sont attendus rouges : la liste exacte est donnée à chaque tâche.

**Tech Stack:** Next 16.3 (App Router) · React 19.2 · TypeScript strict · Tailwind CSS 4.3 · `next/font/google` (Inter, Space Grotesk) · `@hugeicons/react` + `core-free-icons` · Vitest 5 + Testing Library · pnpm.

**Spec:** `docs/superpowers/specs/2026-09-04-cohezi-rebrand-design.md` (guide de marque : `cohezi-homepage-spec-corrige.md` ; logos : `logos-png/`).

## Global Constraints

- Gestionnaire de paquets : **pnpm**. Aucune dépendance ajoutée (polices via `next/font/google`, aucun paquet Fontsource sauf si le build ne peut pas joindre Google Fonts : voir Task 1 Step 2b).
- Branche de travail : `feat/cohezi-rebrand` créée depuis `main` (tag `rundown-replica-v1` déjà posé sur la réplique).
- Palette exclusive (spec §4) : `--color-ink #111111`, `--color-ink-soft #1a1a1a`, `--color-paper #f7f7f4`, `--color-accent #7cff6b`, `--color-accent-deep #123c2a`, `--color-muted #8a8a8a`, `--color-line #e2e2de`, `--color-line-dark #2a2a2a`. **Aucun `bg-white`, `text-white`, `neutral-*`, dégradé ou halo** dans `components/` et `app/` à la fin de Task 7.
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
  /** Premiers segments d'URL servis par la page « bientôt disponible ». */
  comingSoonSlugs: string[];
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
    expect(site.comingSoonSlugs.every((s) => s.length > 0)).toBe(true);
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
  comingSoonSlugs: ['actualite', 'business', 'societe', 'analyses', 'a-propos', 'contact', 'recherche'],
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
