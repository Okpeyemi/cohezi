# Réplique de la page d'accueil therundown.ai — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer dans `cohezi/` une page d'accueil Next.js fidèle à therundown.ai (8 sections, desktop et mobile), avec filtres fonctionnels, newsletter simulée et contenu entièrement piloté par `content/*.ts`.

**Architecture:** App Router Next 16 ; `app/page.tsx` (Server Component) lit `content/` et compose les sections. Les trois sections filtrantes (Latest Articles, Guides, Trending Tools), le formulaire newsletter et le menu mobile sont des Client Components ; tout le reste est rendu côté serveur. La logique métier (filtre, validation, dégradés) vit dans `lib/` sous forme de fonctions pures testées. Les visuels sont des SVG générés (`PlaceholderImage`), les icônes viennent de Hugeicons via un mapping typé `lib/icons.ts`.

**Tech Stack:** Next 16.3 · React 19.2 · TypeScript 5 strict · Tailwind CSS 4.3 (`@theme`, `@utility`) · `@hugeicons/react` 1.1 + `@hugeicons/core-free-icons` 4.3 · clsx + tailwind-merge · Vitest 5 + Testing Library 16 + jsdom 30 · pnpm · Node 22.

**Spec:** `docs/superpowers/specs/2026-09-03-therundown-homepage-replica-design.md` (contenu de référence : `docs/superpowers/specs/2026-09-03-therundown-reference-content.json`, captures : `screenshots/therundown-ai/`).

## Global Constraints

- Gestionnaire de paquets : **pnpm** uniquement. Node 22.
- Versions plancher : `next ^16.3.4`, `react ^19.2.8`, `tailwindcss ^4.3.3`, `@hugeicons/react ^1.1.10`, `@hugeicons/core-free-icons ^4.3.0`, `typescript ^5`, `vitest ^5`.
- TypeScript `strict: true` et `noUncheckedIndexedAccess: true`. Zéro `any`, zéro `// @ts-ignore`.
- Toute icône passe par `<Icon name="…">` (`components/ui/icon.tsx`) et le mapping `lib/icons.ts`. Aucun import direct de `@hugeicons/core-free-icons` ailleurs.
- Aucun texte de contenu en dur dans les composants : tout vient de `content/*.ts` (les seuls libellés autorisés dans les composants sont les messages techniques listés dans le plan : `MESSAGES` du formulaire, `emptyLabel`, « This page is coming soon. », « Back to home », libellés `aria-*`).
- Aucune image protégée : pas de copie des visuels ou logos de therundown.ai. Placeholders générés seulement.
- Police : Satoshi auto-hébergée (`public/fonts/satoshi/*.woff2`), variable CSS `--font-satoshi`, repli Instrument Sans documenté en Task 2.
- Règle héritée d'AGENTS.md (chatbot-ui) : avant d'utiliser une API Next, lire le guide correspondant dans `node_modules/next/dist/docs/` (disponible après Task 1). Les API vérifiées pour ce plan : `next/font/local` (tableau `src` `{path, weight, style}`, option `variable`), route handlers (`export async function POST(request: Request)`, `NextResponse.json(body, { status })`), pages dynamiques (`params: Promise<{ slug: string[] }>` à `await`, `generateStaticParams`, `notFound()`), Vitest (`environment: 'jsdom'`, plugin React ; les Server Components **async** ne sont pas testables en unitaire → la page d'accueil reste synchrone).
- Tests : `pnpm test` (Vitest) doit passer à la fin de chaque tâche ; `pnpm typecheck`, `pnpm lint` et `pnpm build` doivent passer à la fin des Tasks 1, 2, 12 et 13.
- Commits : un commit par tâche minimum, message conventionnel en français, suffixe `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Tous les tests vivent dans `tests/` (miroir de l'arborescence source) et s'appellent `*.test.ts` ou `*.test.tsx`. Ils importent `describe/it/expect` depuis `vitest` (pas de globals).

---

## Carte des fichiers

| Fichier | Responsabilité | Tâche |
|---|---|---|
| `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.mts`, `tests/setup.ts` | outillage | 1 |
| `lib/cn.ts` | fusion de classes Tailwind | 1 |
| `public/fonts/satoshi/*.woff2`, `app/fonts.ts`, `app/globals.css`, `app/layout.tsx` | police, tokens, coquille HTML | 2 |
| `content/types.ts` | tous les types du contenu | 3 |
| `lib/filter.ts`, `lib/validate-email.ts`, `lib/placeholder.ts`, `lib/articles.ts`, `lib/slug.ts` | fonctions pures | 3 |
| `lib/icons.ts`, `content/categories.ts`, `content/site.ts`, `content/articles.ts`, `content/guides.ts`, `content/tools.ts`, `content/podcast.ts`, `content/university.ts` | données et mapping d'icônes | 4 |
| `components/ui/icon.tsx`, `button.tsx`, `chip.tsx`, `tabs.tsx`, `section-heading.tsx`, `placeholder-image.tsx`, `logo-wordmark.tsx`, `brand-logo.tsx` | primitives UI | 5 |
| `components/ui/filterable-grid.tsx` | filtre générique (client) | 6 |
| `app/api/newsletter/route.ts`, `components/ui/newsletter-form.tsx` | newsletter simulée | 7 |
| `components/layout/site-header.tsx`, `mobile-menu.tsx`, `site-footer.tsx` | header, menu mobile, footer | 8 |
| `components/sections/hero.tsx`, `components/cards/article-card.tsx`, `components/sections/latest-articles.tsx` | hero et articles | 9 |
| `components/cards/card-frame.tsx`, `guide-card.tsx`, `tool-card.tsx`, `components/sections/guides.tsx`, `trending-tools.tsx` | guides et outils | 10 |
| `components/sections/podcast.tsx`, `university-cta.tsx` | podcast et CTA University | 11 |
| `app/page.tsx`, `app/[...slug]/page.tsx`, `app/not-found.tsx` | assemblage et pages « à venir » | 12 |
| — | QA visuelle contre les captures, corrections, build final | 13 |

---

### Task 1 : Scaffold Next 16 + Tailwind v4 + Vitest, premier cycle TDD (`cn`)

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.mts`, `tests/setup.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `lib/cn.ts`
- Test: `tests/lib/cn.test.ts`
- Modify: `.gitignore` (déjà présent : vérifier qu'il contient `node_modules/`, `.next/`, `next-env.d.ts`, `coverage/`)

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string` depuis `@/lib/cn` ; scripts pnpm `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:watch` ; alias `@/*` → racine du projet (tsconfig et Vitest).

Le dossier n'est pas vide (`docs/`, `screenshots/`, `.git`) : `create-next-app` refuserait de s'y installer. On scaffolde donc à la main, avec les fichiers exacts ci-dessous.

- [x] **Step 1 : package.json et installation**

```bash
cd /home/darellchooks/Documents/cohezi
cat > package.json <<'EOF'
{
  "name": "cohezi",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
EOF
pnpm add next@^16.3.4 react@^19.2.8 react-dom@^19.2.8 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.0 clsx@^2.1.1 tailwind-merge@^3.6.0
pnpm add -D typescript@^5 @types/node@^22 @types/react@^19.2.18 @types/react-dom@^19.2.7 tailwindcss@^4.3.3 @tailwindcss/postcss@^4.3.3 eslint@^9 eslint-config-next@^16.3.4 vitest@^5 @vitejs/plugin-react@^6 jsdom@^30 @testing-library/react@^16.3 @testing-library/dom@^10.4 @testing-library/jest-dom@^7 @testing-library/user-event@^14.6
```

Attendu : `node_modules/next/package.json` indique une version `16.3.x` ; `ls node_modules/next/dist/docs/` liste les guides (à consulter avant chaque API Next).

- [x] **Step 2 : fichiers de configuration**

`tsconfig.json` :
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".next/dev/types/**/*.ts"],
  "exclude": ["node_modules", ".next", "coverage"]
}
```

`next.config.ts` :
```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

`postcss.config.mjs` :
```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

`eslint.config.mjs` :
```js
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts']),
]);
```

`vitest.config.mts` :
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': import.meta.dirname },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    css: false,
  },
});
```

`tests/setup.ts` :
```ts
import '@testing-library/jest-dom/vitest';
```

- [x] **Step 3 : application minimale pour que `build` passe**

`app/globals.css` :
```css
@import "tailwindcss";
```

`app/layout.tsx` :
```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cohezi',
  description: 'Work in progress',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
```

`app/page.tsx` :
```tsx
export default function HomePage() {
  return <main className="p-10 text-2xl font-bold">Hello</main>;
}
```

- [x] **Step 4 : test `cn` qui échoue**

`tests/lib/cn.test.ts` :
```ts
import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/cn';

describe('cn', () => {
  it('merges class names and drops falsy values', () => {
    expect(cn('a', false && 'b', undefined, 'c')).toBe('a c');
  });

  it('lets the last conflicting Tailwind utility win', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});
```

Run : `pnpm test`
Expected : FAIL — `Failed to resolve import "@/lib/cn"`.

- [x] **Step 5 : implémentation `cn`**

`lib/cn.ts` :
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

Run : `pnpm test`
Expected : PASS (2 tests).

- [x] **Step 6 : vérifier lint, typecheck et build**

Run : `pnpm typecheck && pnpm lint && pnpm build`
Expected : les trois passent. `next build` affiche la route `/` en statique. Si `next build` réécrit `tsconfig.json` (Next ajuste `jsx`, `include`), conserver ses modifications.

- [x] **Step 7 : commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.mts tests/ app/ lib/
git commit -m "chore: scaffold Next 16, Tailwind v4 et Vitest avec l'utilitaire cn

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2 : Police Satoshi, tokens de design et coquille HTML

**Files:**
- Create: `public/fonts/satoshi/Satoshi-Regular.woff2`, `Satoshi-Medium.woff2`, `Satoshi-Bold.woff2`, `app/fonts.ts`
- Modify: `app/globals.css`, `app/layout.tsx`

**Interfaces:**
- Produces: variable CSS `--font-satoshi` sur `<html>` ; utilitaires Tailwind `bg-ink`, `bg-ink-soft`, `border-ink-border`, `bg-icon-box`, `border-line`, `text-muted`, `bg-paper`, `bg-podcast-card`, `text-brand`, `ring-brand`, `rounded-sheet`, `bg-brand-gradient`, `text-brand-gradient`, `bg-university-gradient`. `font-sans` pointe sur Satoshi.

- [x] **Step 1 : télécharger Satoshi**

```bash
mkdir -p public/fonts/satoshi
UA="Mozilla/5.0 (X11; Linux x86_64)"
curl -fsSL -A "$UA" -o public/fonts/satoshi/Satoshi-Regular.woff2 "https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2"
curl -fsSL -A "$UA" -o public/fonts/satoshi/Satoshi-Medium.woff2  "https://cdn.fontshare.com/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2"
curl -fsSL -A "$UA" -o public/fonts/satoshi/Satoshi-Bold.woff2    "https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2"
file public/fonts/satoshi/*.woff2
```

Expected : trois lignes `Web Open Font Format (Version 2)`, chacune d'environ 25 Ko. Si l'un des téléchargements échoue (réseau), utiliser le repli du Step 2b et ne pas créer le dossier.

- [x] **Step 2 : `app/fonts.ts` (Satoshi)**

```ts
import localFont from 'next/font/local';

export const satoshi = localFont({
  src: [
    { path: '../public/fonts/satoshi/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/satoshi/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/satoshi/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});
```

- [x] **Step 2b (repli uniquement si le Step 1 a échoué) : Instrument Sans**

```ts
import { Instrument_Sans } from 'next/font/google';

export const satoshi = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-satoshi',
  display: 'swap',
});
```
Le nom d'export reste `satoshi` et la variable `--font-satoshi` pour que rien d'autre ne change. Noter le repli dans le message de commit.

- [x] **Step 3 : `app/globals.css` avec les tokens**

```css
@import "tailwindcss";

@theme {
  --color-ink: #171717;
  --color-ink-soft: #212121;
  --color-ink-border: #333333;
  --color-icon-box: #2a2a2a;
  --color-line: #e5e5e5;
  --color-muted: #737373;
  --color-paper: #ffffff;
  --color-podcast-card: #efefef;
  --color-brand: #8b4cd4;
  --radius-sheet: 28.8px;
}

@theme inline {
  --font-sans: var(--font-satoshi), ui-sans-serif, system-ui, sans-serif;
}

@utility bg-brand-gradient {
  background-image: linear-gradient(45deg, #cd408f 0%, #8b4cd4 50%, #6254ff 100%);
}

@utility text-brand-gradient {
  background-image: linear-gradient(45deg, #cd408f 0%, #8b4cd4 50%, #6254ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@utility bg-university-gradient {
  background-image: linear-gradient(#000000, #292929);
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
```

- [x] **Step 4 : `app/layout.tsx` avec la police et les métadonnées**

```tsx
import type { Metadata } from 'next';
import { satoshi } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Rundown AI - Daily AI News & Insights in 5 Minutes a Day',
  description:
    'Get the latest AI news, understand why it matters, and learn how to apply it in your work.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
```

- [x] **Step 5 : vérifier que les tokens et la police sont bien servis**

`app/page.tsx` temporaire pour vérifier visuellement (sera remplacé en Task 12) :
```tsx
export default function HomePage() {
  return (
    <main className="flex-1 bg-ink p-10">
      <h1 className="text-[72px] font-bold leading-[1.08] tracking-[-0.025em] text-white">
        Learn AI in <span className="text-brand-gradient">5 minutes</span> a day.
      </h1>
      <div className="mt-6 rounded-sheet bg-paper p-8 text-muted">rounded-sheet · text-muted</div>
    </main>
  );
}
```

```bash
pnpm build && (pnpm start -p 3000 > /tmp/cohezi-start.log 2>&1 &) && sleep 3
curl -s http://localhost:3000 | grep -ci "satoshi"      # attendu : >= 1 (font-face inlinée)
curl -s http://localhost:3000 | grep -c "text-brand-gradient"   # attendu : >= 1
pkill -f "next start" || true
```

Puis ouvrir la page avec le navigateur gstack pour contrôler à l'œil le dégradé et la police :
```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
(pnpm start -p 3000 > /tmp/cohezi-start.log 2>&1 &) && sleep 3
$B viewport 1440x900 && $B goto http://localhost:3000 && $B screenshot --viewport /tmp/cohezi-task2.png
$B css h1 font-family      # attendu : contient "satoshi" (nom généré par next/font) ou Instrument Sans en repli
pkill -f "next start" || true
```
Lire `/tmp/cohezi-task2.png` : le mot « 5 minutes » doit être en dégradé rose → violet → bleu.

- [x] **Step 6 : lint, typecheck, tests, commit**

Run : `pnpm typecheck && pnpm lint && pnpm test`
Expected : PASS.

```bash
git add public/fonts app/
git commit -m "feat: police Satoshi auto-hébergée et tokens de design Tailwind

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3 : Types du contenu et fonctions pures (TDD)

**Files:**
- Create: `content/types.ts`, `lib/filter.ts`, `lib/validate-email.ts`, `lib/placeholder.ts`, `lib/articles.ts`, `lib/slug.ts`
- Test: `tests/lib/filter.test.ts`, `tests/lib/validate-email.test.ts`, `tests/lib/placeholder.test.ts`, `tests/lib/articles.test.ts`, `tests/lib/slug.test.ts`

**Interfaces:**
- Produces (types) : `IconName`, `ImageRef`, `NavItem`, `Category`, `ArticleTag`, `Article`, `Guide`, `Tool`, `UniversityFeature`, `SocialLink`, `FooterColumn`, `HeroContent`, `SectionCopy`, `SiteConfig`, `PodcastContent`, `UniversityContent` depuis `@/content/types`.
- Produces (fonctions) : `ALL = 'all'`, `filterByCategory<T>(items, active, getCategories): T[]` ; `isValidEmail(value: unknown): boolean`, `normalizeEmail(value: unknown): string`, `maskEmail(email: string): string`, `MAX_EMAIL_LENGTH = 254` ; `hashString(seed: string): number`, `hashToGradient(seed: string): Gradient`, `truncateLabel(label: string, max = 28): string` ; `pickFeatured(articles): { featured: Article | undefined; rest: Article[] }` ; `humanize(slug: string): string`.

- [x] **Step 1 : `content/types.ts`** (pas de test dédié : vérifié par `pnpm typecheck` et utilisé partout ensuite)

```ts
export type IconName =
  | 'menu'
  | 'close'
  | 'arrow-right'
  | 'send'
  | 'play'
  | 'more'
  | 'podcast'
  | 'spotify'
  | 'apple'
  | 'x'
  | 'instagram'
  | 'linkedin'
  | 'all'
  | 'coding'
  | 'marketing'
  | 'content-creator'
  | 'educator'
  | 'sales'
  | 'design'
  | 'data-analysis'
  | 'project-management'
  | 'consulting'
  | 'finance'
  | 'government'
  | 'healthcare'
  | 'legal'
  | 'recruiting-hr'
  | 'student'
  | 'general'
  | 'business-operations'
  | 'agents'
  | 'consumer'
  | 'miscellaneous'
  | 'science'
  | 'courses'
  | 'daily-guides'
  | 'workshops'
  | 'community';

/** Sans `src`, le composant PlaceholderImage génère un visuel. */
export type ImageRef = { src?: string; alt: string };

export type NavItem = { label: string; href: string };

export type Category = { slug: string; label: string; icon: IconName };

export type ArticleTag = 'ai' | 'tech' | 'robotics';

export type Article = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  readingMinutes: number;
  tag: ArticleTag;
  image: ImageRef;
  featured?: boolean;
};

export type Guide = {
  slug: string;
  title: string;
  /** Slugs de `guideCategories`. Attribués d'après le titre (non visibles sur le site). */
  categories: string[];
  image: ImageRef;
};

export type Tool = {
  slug: string;
  name: string;
  description: string;
  /** Slugs de `toolCategories`. */
  categories: string[];
  /** Icône du badge en haut à gauche du visuel. */
  badgeIcon: IconName;
  image: ImageRef;
};

export type UniversityFeature = { title: string; description: string; icon: IconName };

export type SocialLink = { label: string; href: string; icon: IconName };

export type FooterColumn = { heading: string; links: NavItem[] };

export type HeroContent = {
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
  emailPlaceholder: string;
  subscribeLabel: string;
  trustedByPrefix: string;
  trustedByCount: string;
  trustedBySuffix: string;
  trustedBy: string[];
};

export type SectionCopy = {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  viewAllHref: string;
};

export type SiteConfig = {
  name: string;
  nav: NavItem[];
  headerCta: NavItem;
  hero: HeroContent;
  sections: { articles: SectionCopy; guides: SectionCopy; tools: SectionCopy };
  footer: {
    description: string;
    columns: FooterColumn[];
    copyright: string;
    social: SocialLink[];
  };
  /** Premiers segments d'URL servis par la page « coming soon ». */
  comingSoonSlugs: string[];
};

export type PodcastContent = {
  title: string;
  description: string;
  listenLinks: { label: string; href: string; icon: IconName }[];
  card: {
    platformLabel: string;
    title: string;
    meta: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    footnote: string;
    artworkAlt: string;
  };
};

export type UniversityContent = {
  brandName: string;
  brandAccent: string;
  title: string;
  subtitle: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
  features: UniversityFeature[];
};
```

- [x] **Step 2 : test `filterByCategory` qui échoue**

`tests/lib/filter.test.ts` :
```ts
import { describe, expect, it } from 'vitest';
import { ALL, filterByCategory } from '@/lib/filter';

type Item = { id: number; cats: string[] };
const items: Item[] = [
  { id: 1, cats: ['coding'] },
  { id: 2, cats: ['design', 'coding'] },
  { id: 3, cats: ['finance'] },
];
const getCats = (item: Item) => item.cats;

describe('filterByCategory', () => {
  it('returns a copy of every item for ALL', () => {
    const result = filterByCategory(items, ALL, getCats);
    expect(result).toEqual(items);
    expect(result).not.toBe(items);
  });

  it('keeps only items that include the active category', () => {
    expect(filterByCategory(items, 'coding', getCats).map((i) => i.id)).toEqual([1, 2]);
  });

  it('returns an empty array for an unknown category', () => {
    expect(filterByCategory(items, 'legal', getCats)).toEqual([]);
  });

  it('does not mutate the input', () => {
    const snapshot = JSON.stringify(items);
    filterByCategory(items, 'design', getCats);
    expect(JSON.stringify(items)).toBe(snapshot);
  });
});
```

Run : `pnpm test tests/lib/filter.test.ts`
Expected : FAIL — module `@/lib/filter` introuvable.

- [x] **Step 3 : `lib/filter.ts`**

```ts
export const ALL = 'all';

export function filterByCategory<T>(
  items: readonly T[],
  active: string,
  getCategories: (item: T) => readonly string[],
): T[] {
  if (active === ALL) return [...items];
  return items.filter((item) => getCategories(item).includes(active));
}
```

Run : `pnpm test tests/lib/filter.test.ts`
Expected : PASS (4 tests).

- [x] **Step 4 : test `validate-email` qui échoue**

`tests/lib/validate-email.test.ts` :
```ts
import { describe, expect, it } from 'vitest';
import { MAX_EMAIL_LENGTH, isValidEmail, maskEmail, normalizeEmail } from '@/lib/validate-email';

describe('normalizeEmail', () => {
  it('trims strings and turns non-strings into an empty string', () => {
    expect(normalizeEmail('  jane@example.com ')).toBe('jane@example.com');
    expect(normalizeEmail(42)).toBe('');
    expect(normalizeEmail(undefined)).toBe('');
  });
});

describe('isValidEmail', () => {
  it('accepts ordinary addresses, with surrounding spaces', () => {
    expect(isValidEmail('jane@example.com')).toBe(true);
    expect(isValidEmail(' jane.doe+news@sub.example.co ')).toBe(true);
  });

  it('rejects empty values, missing @, missing TLD and inner spaces', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('jane')).toBe(false);
    expect(isValidEmail('jane@example')).toBe(false);
    expect(isValidEmail('ja ne@example.com')).toBe(false);
    expect(isValidEmail(null)).toBe(false);
  });

  it('rejects addresses longer than MAX_EMAIL_LENGTH', () => {
    const local = 'a'.repeat(MAX_EMAIL_LENGTH);
    expect(isValidEmail(`${local}@example.com`)).toBe(false);
  });
});

describe('maskEmail', () => {
  it('keeps the first character and the domain', () => {
    expect(maskEmail('jane@example.com')).toBe('j***@example.com');
  });

  it('masks everything when there is no domain', () => {
    expect(maskEmail('nonsense')).toBe('***');
  });
});
```

Run : `pnpm test tests/lib/validate-email.test.ts`
Expected : FAIL — module introuvable.

- [x] **Step 5 : `lib/validate-email.ts`**

```ts
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MAX_EMAIL_LENGTH = 254;

export function normalizeEmail(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function isValidEmail(value: unknown): boolean {
  const email = normalizeEmail(value);
  return email.length > 0 && email.length <= MAX_EMAIL_LENGTH && EMAIL_RE.test(email);
}

export function maskEmail(email: string): string {
  const at = email.indexOf('@');
  if (at <= 0) return '***';
  return `${email.charAt(0)}***@${email.slice(at + 1)}`;
}
```

Run : `pnpm test tests/lib/validate-email.test.ts`
Expected : PASS (6 tests).

- [x] **Step 6 : test `placeholder` qui échoue**

`tests/lib/placeholder.test.ts` :
```ts
import { describe, expect, it } from 'vitest';
import { hashString, hashToGradient, truncateLabel } from '@/lib/placeholder';

describe('hashString', () => {
  it('is deterministic and returns an unsigned 32-bit integer', () => {
    expect(hashString('Muse Spark 1.3')).toBe(hashString('Muse Spark 1.3'));
    expect(hashString('abc')).toBeGreaterThanOrEqual(0);
    expect(hashString('abc')).toBeLessThanOrEqual(0xffffffff);
  });

  it('differs for different inputs', () => {
    expect(hashString('Guides')).not.toBe(hashString('Tools'));
  });
});

describe('hashToGradient', () => {
  it('returns two hsl colours 40 degrees apart and a 135deg angle', () => {
    const g = hashToGradient('Rowan');
    const hue = hashString('Rowan') % 360;
    expect(g).toEqual({
      from: `hsl(${hue} 55% 45%)`,
      to: `hsl(${(hue + 40) % 360} 55% 60%)`,
      angle: 135,
    });
  });

  it('is stable for the same seed', () => {
    expect(hashToGradient('x')).toEqual(hashToGradient('x'));
  });
});

describe('truncateLabel', () => {
  it('keeps short labels intact', () => {
    expect(truncateLabel('Claude Fable 5.1')).toBe('Claude Fable 5.1');
  });

  it('cuts long labels to 28 characters with an ellipsis', () => {
    const long = 'Stand Out in an AI Job Interview With the Proof Project Method';
    const result = truncateLabel(long);
    expect(result.length).toBe(28);
    expect(result.endsWith('…')).toBe(true);
  });
});
```

Run : `pnpm test tests/lib/placeholder.test.ts`
Expected : FAIL — module introuvable.

- [x] **Step 7 : `lib/placeholder.ts`**

```ts
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
```

Run : `pnpm test tests/lib/placeholder.test.ts`
Expected : PASS (6 tests). La coupe à 27 caractères de la chaîne testée donne « Stand Out in an AI Job Inte » (sans espace final), donc 28 caractères avec l'ellipse.

- [x] **Step 8 : test `pickFeatured` qui échoue**

`tests/lib/articles.test.ts` :
```ts
import { describe, expect, it } from 'vitest';
import type { Article } from '@/content/types';
import { pickFeatured } from '@/lib/articles';

const make = (slug: string, featured?: boolean): Article => ({
  slug,
  title: slug,
  author: 'A',
  readingMinutes: 5,
  tag: 'ai',
  image: { alt: slug },
  featured,
});

describe('pickFeatured', () => {
  it('returns the flagged article and the others in order', () => {
    const a = make('a');
    const b = make('b', true);
    const c = make('c');
    expect(pickFeatured([a, b, c])).toEqual({ featured: b, rest: [a, c] });
  });

  it('falls back to the first article when none is flagged', () => {
    const a = make('a');
    const b = make('b');
    expect(pickFeatured([a, b])).toEqual({ featured: a, rest: [b] });
  });

  it('handles an empty list', () => {
    expect(pickFeatured([])).toEqual({ featured: undefined, rest: [] });
  });
});
```

Run : `pnpm test tests/lib/articles.test.ts`
Expected : FAIL — module introuvable.

- [x] **Step 9 : `lib/articles.ts`**

```ts
import type { Article } from '@/content/types';

export function pickFeatured(articles: readonly Article[]): {
  featured: Article | undefined;
  rest: Article[];
} {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  return { featured, rest: articles.filter((article) => article !== featured) };
}
```

Run : `pnpm test tests/lib/articles.test.ts`
Expected : PASS (3 tests).

- [x] **Step 10 : test `humanize` qui échoue**

`tests/lib/slug.test.ts` :
```ts
import { describe, expect, it } from 'vitest';
import { humanize } from '@/lib/slug';

describe('humanize', () => {
  it('capitalises each dash-separated word', () => {
    expect(humanize('privacy-policy')).toBe('Privacy Policy');
    expect(humanize('ai-university')).toBe('Ai University');
  });

  it('returns an empty string for an empty slug', () => {
    expect(humanize('')).toBe('');
  });
});
```

Run : `pnpm test tests/lib/slug.test.ts`
Expected : FAIL — module introuvable.

- [x] **Step 11 : `lib/slug.ts`**

```ts
export function humanize(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

Run : `pnpm test`
Expected : PASS (tous les tests, 21 au total).

- [x] **Step 12 : commit**

```bash
git add content/types.ts lib/ tests/lib/
git commit -m "feat: types du contenu et fonctions pures (filtre, email, placeholder, articles, slug)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4 : Mapping d'icônes et fichiers de contenu, tests d'intégrité

**Files:**
- Create: `lib/icons.ts`, `content/categories.ts`, `content/site.ts`, `content/articles.ts`, `content/guides.ts`, `content/tools.ts`, `content/podcast.ts`, `content/university.ts`
- Test: `tests/content/content.test.ts`

**Interfaces:**
- Consumes: types de `@/content/types`.
- Produces: `icons: Record<IconName, IconSvgElement>`, `getIcon(name: IconName): IconSvgElement` ; `guideCategories: Category[]` (17), `toolCategories: Category[]` (20) ; `site: SiteConfig` ; `articles: Article[]` (5) ; `guides: Guide[]` (8) ; `tools: Tool[]` (12) ; `podcast: PodcastContent` ; `university: UniversityContent`.

- [x] **Step 1 : test d'intégrité qui échoue**

`tests/content/content.test.ts` :
```ts
import { describe, expect, it } from 'vitest';
import { articles } from '@/content/articles';
import { guideCategories, toolCategories } from '@/content/categories';
import { guides } from '@/content/guides';
import { podcast } from '@/content/podcast';
import { site } from '@/content/site';
import { tools } from '@/content/tools';
import { university } from '@/content/university';
import { icons } from '@/lib/icons';

const unique = <T>(values: T[]) => new Set(values).size === values.length;

describe('content integrity', () => {
  it('has the expected collection sizes', () => {
    expect(articles).toHaveLength(5);
    expect(guides).toHaveLength(8);
    expect(tools).toHaveLength(12);
    expect(guideCategories).toHaveLength(17);
    expect(toolCategories).toHaveLength(20);
    expect(university.features).toHaveLength(4);
    expect(site.nav).toHaveLength(7);
    expect(site.footer.columns.map((c) => c.links.length)).toEqual([3, 2, 5]);
  });

  it('uses unique slugs everywhere', () => {
    expect(unique(articles.map((a) => a.slug))).toBe(true);
    expect(unique(guides.map((g) => g.slug))).toBe(true);
    expect(unique(tools.map((t) => t.slug))).toBe(true);
    expect(unique(guideCategories.map((c) => c.slug))).toBe(true);
    expect(unique(toolCategories.map((c) => c.slug))).toBe(true);
  });

  it('flags exactly one featured article', () => {
    expect(articles.filter((a) => a.featured)).toHaveLength(1);
  });

  it('only references existing categories', () => {
    const guideSlugs = new Set(guideCategories.map((c) => c.slug));
    const toolSlugs = new Set(toolCategories.map((c) => c.slug));
    for (const guide of guides) {
      expect(guide.categories.length).toBeGreaterThan(0);
      for (const slug of guide.categories) expect(guideSlugs.has(slug), `${guide.slug} → ${slug}`).toBe(true);
    }
    for (const tool of tools) {
      expect(tool.categories.length).toBeGreaterThan(0);
      for (const slug of tool.categories) expect(toolSlugs.has(slug), `${tool.slug} → ${slug}`).toBe(true);
    }
  });

  it('resolves every icon name to an icon', () => {
    const names = [
      ...guideCategories.map((c) => c.icon),
      ...toolCategories.map((c) => c.icon),
      ...tools.map((t) => t.badgeIcon),
      ...university.features.map((f) => f.icon),
      ...site.footer.social.map((s) => s.icon),
      ...podcast.listenLinks.map((l) => l.icon),
    ];
    for (const name of names) expect(icons[name], name).toBeDefined();
  });

  it('keeps every trusted-by company and coming-soon slug non-empty', () => {
    expect(site.hero.trustedBy).toHaveLength(7);
    expect(site.comingSoonSlugs.every((s) => s.length > 0)).toBe(true);
  });
});
```

Run : `pnpm test tests/content/content.test.ts`
Expected : FAIL — modules introuvables.

- [x] **Step 2 : `lib/icons.ts`**

```ts
import type { IconSvgElement } from '@hugeicons/react';
import {
  AnalyticsUpIcon,
  AppleIcon,
  ArrowRight01Icon,
  BankIcon,
  BriefcaseIcon,
  Cancel01Icon,
  CheckListIcon,
  CoinsIcon,
  CourseIcon,
  DashboardSquare01Icon,
  DatabaseIcon,
  FlaskConicalIcon,
  Grid2X2Icon,
  GridViewIcon,
  InstagramIcon,
  LegalHammerIcon,
  LinkedinIcon,
  MegaphoneIcon,
  Menu01Icon,
  MoreHorizontalIcon,
  MortarboardIcon,
  NewTwitterIcon,
  PaintBrushIcon,
  PenTool01Icon,
  PlayIcon,
  PlaySquareIcon,
  PodcastIcon,
  Presentation01Icon,
  Robot01Icon,
  SentIcon,
  SourceCodeIcon,
  SpotifyIcon,
  StethoscopeIcon,
  StudentIcon,
  UserGroupIcon,
  UserIcon,
  UserSearchIcon,
} from '@hugeicons/core-free-icons';
import type { IconName } from '@/content/types';

/**
 * Seul point d'accès aux icônes Hugeicons. Noms vérifiés sur
 * @hugeicons/core-free-icons 4.3.0. Si un nom manque à l'installation,
 * remplacer ici par le plus proche du même jeu et le noter en commentaire.
 */
export const icons: Record<IconName, IconSvgElement> = {
  menu: Menu01Icon,
  close: Cancel01Icon,
  'arrow-right': ArrowRight01Icon,
  send: SentIcon,
  play: PlayIcon,
  more: MoreHorizontalIcon,
  podcast: PodcastIcon,
  spotify: SpotifyIcon,
  apple: AppleIcon,
  x: NewTwitterIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  all: GridViewIcon,
  coding: SourceCodeIcon,
  marketing: MegaphoneIcon,
  'content-creator': PenTool01Icon,
  educator: MortarboardIcon,
  sales: AnalyticsUpIcon,
  design: PaintBrushIcon,
  'data-analysis': DatabaseIcon,
  'project-management': CheckListIcon,
  consulting: UserGroupIcon,
  finance: CoinsIcon,
  government: BankIcon,
  healthcare: StethoscopeIcon,
  legal: LegalHammerIcon,
  'recruiting-hr': UserSearchIcon,
  student: StudentIcon,
  general: DashboardSquare01Icon,
  'business-operations': BriefcaseIcon,
  agents: Robot01Icon,
  consumer: UserIcon,
  miscellaneous: Grid2X2Icon,
  science: FlaskConicalIcon,
  courses: CourseIcon,
  'daily-guides': PlaySquareIcon,
  workshops: Presentation01Icon,
  community: UserGroupIcon,
};

export function getIcon(name: IconName): IconSvgElement {
  return icons[name];
}
```

- [x] **Step 3 : `content/categories.ts`**

```ts
import type { Category } from './types';

export const guideCategories: Category[] = [
  { slug: 'coding', label: 'Coding', icon: 'coding' },
  { slug: 'marketing', label: 'Marketing', icon: 'marketing' },
  { slug: 'content-creator', label: 'Content Creator', icon: 'content-creator' },
  { slug: 'educator', label: 'Educator', icon: 'educator' },
  { slug: 'sales', label: 'Sales', icon: 'sales' },
  { slug: 'design', label: 'Design', icon: 'design' },
  { slug: 'data-analysis', label: 'Data Analysis', icon: 'data-analysis' },
  { slug: 'project-management', label: 'Project Management', icon: 'project-management' },
  { slug: 'consulting', label: 'Consulting', icon: 'consulting' },
  { slug: 'finance', label: 'Finance', icon: 'finance' },
  { slug: 'government', label: 'Government', icon: 'government' },
  { slug: 'healthcare', label: 'Healthcare', icon: 'healthcare' },
  { slug: 'legal', label: 'Legal', icon: 'legal' },
  { slug: 'recruiting-hr', label: 'Recruiting HR', icon: 'recruiting-hr' },
  { slug: 'student', label: 'Student', icon: 'student' },
  { slug: 'general', label: 'General', icon: 'general' },
  { slug: 'business-operations', label: 'Business Operations', icon: 'business-operations' },
];

export const toolCategories: Category[] = [
  { slug: 'agents', label: 'Agents', icon: 'agents' },
  { slug: 'consumer', label: 'Consumer', icon: 'consumer' },
  { slug: 'miscellaneous', label: 'Miscellaneous', icon: 'miscellaneous' },
  { slug: 'science', label: 'Science', icon: 'science' },
  { slug: 'coding', label: 'Coding', icon: 'coding' },
  { slug: 'marketing', label: 'Marketing', icon: 'marketing' },
  { slug: 'content-creator', label: 'Content Creator', icon: 'content-creator' },
  { slug: 'educators', label: 'Educators', icon: 'educator' },
  { slug: 'business-operations', label: 'Business Operations', icon: 'business-operations' },
  { slug: 'sales', label: 'Sales', icon: 'sales' },
  { slug: 'finance', label: 'Finance', icon: 'finance' },
  { slug: 'design', label: 'Design', icon: 'design' },
  { slug: 'healthcare', label: 'Healthcare', icon: 'healthcare' },
  { slug: 'consulting', label: 'Consulting', icon: 'consulting' },
  { slug: 'government', label: 'Government', icon: 'government' },
  { slug: 'data-analysis', label: 'Data Analysis', icon: 'data-analysis' },
  { slug: 'project-management', label: 'Project Management', icon: 'project-management' },
  { slug: 'legal', label: 'Legal', icon: 'legal' },
  { slug: 'recruiting-hr', label: 'Recruiting / HR', icon: 'recruiting-hr' },
  { slug: 'students', label: 'Students', icon: 'student' },
];
```

- [x] **Step 4 : `content/site.ts`**

```ts
import type { SiteConfig } from './types';

export const site: SiteConfig = {
  name: 'The Rundown',
  nav: [
    { label: 'AI University', href: '/ai-university' },
    { label: 'Articles', href: '/articles' },
    { label: 'Guides', href: '/guides' },
    { label: 'Tools', href: '/tools' },
    { label: 'Courses', href: '/courses' },
    { label: 'Careers', href: '/careers' },
    { label: 'Advertise', href: '/advertise' },
  ],
  headerCta: { label: 'University Platform', href: 'https://app.therundown.ai/' },
  hero: {
    titleStart: 'Learn AI in',
    titleAccent: '5 minutes',
    titleEnd: 'a day.',
    subtitle:
      'Get the latest AI news, understand why it matters, and learn how to apply it in your work.',
    emailPlaceholder: 'Email Address',
    subscribeLabel: 'Subscribe',
    trustedByPrefix: 'Join over',
    trustedByCount: '2,000,000+',
    trustedBySuffix: 'readers from companies like:',
    trustedBy: ['Google', 'OpenAI', 'Meta', 'Microsoft', 'Stripe', 'Apple', 'Netflix'],
  },
  sections: {
    articles: {
      title: 'Latest Articles',
      subtitle: 'The latest developments in AI, Tech and Robotics.',
      viewAllLabel: 'View all articles',
      viewAllHref: '/articles',
    },
    guides: {
      title: 'Guides',
      subtitle:
        'We crowdsource the top real-world AI use cases across our audience of over 1 million early adopters and create daily guides on exactly how you can copy them and apply it to your work.',
      viewAllLabel: 'View all guides',
      viewAllHref: '/guides',
    },
    tools: {
      title: 'Trending Tools',
      subtitle: 'The most useful AI tools - organized and categorized in one spot.',
      viewAllLabel: 'View all tools',
      viewAllHref: '/tools',
    },
  },
  footer: {
    description:
      'Get the latest AI news, understand why it matters, and learn how to apply it in your work. Join 2,000,000+ readers from companies like Apple, OpenAI, NASA.',
    columns: [
      {
        heading: 'Stay Updated',
        links: [
          { label: 'Articles', href: '/articles' },
          {
            label: 'Podcast',
            href: 'https://podcasts.apple.com/us/podcast/the-state-of-ai-with-rowan-cheung/id1689006106',
          },
          { label: 'Tools', href: '/tools' },
        ],
      },
      {
        heading: 'AI University',
        links: [
          { label: 'Courses', href: '/courses' },
          { label: 'Guides', href: '/guides' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'Advertise', href: '/advertise' },
          { label: 'Careers', href: '/careers' },
          { label: 'Contact Us', href: 'mailto:support@therundown.ai' },
          { label: 'Privacy Policy', href: '/privacy-policy' },
          { label: 'Terms & Conditions', href: '/terms-privacy' },
        ],
      },
    ],
    copyright: '© 2026 The Rundown AI, Inc. All rights reserved.',
    social: [
      { label: 'X (Twitter)', href: 'https://twitter.com/therundownai', icon: 'x' },
      { label: 'Instagram', href: 'https://www.instagram.com/therundownai', icon: 'instagram' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/the-rundown-ai', icon: 'linkedin' },
    ],
  },
  comingSoonSlugs: [
    'ai-university',
    'articles',
    'guides',
    'tools',
    'courses',
    'careers',
    'advertise',
    'privacy-policy',
    'terms-privacy',
  ],
};
```

- [x] **Step 5 : `content/articles.ts`**

```ts
import type { Article } from './types';

export const articles: Article[] = [
  {
    slug: 'meta-google-join-the-ai-launch-party',
    title: 'Meta, Google join the AI launch party',
    subtitle: 'PLUS: Nail job interviews with the “Proof Project” method',
    author: 'Zach Mink',
    readingMinutes: 8,
    tag: 'ai',
    image: { alt: 'Muse Spark 1.3 and Gemini 3.8 Flash announcement visuals' },
    featured: true,
  },
  {
    slug: 'fable-5-1-kicks-off-launch-week-at-the-frontier',
    title: 'Fable 5.1 kicks off launch week at the frontier',
    author: 'Zach Mink',
    readingMinutes: 7,
    tag: 'ai',
    image: { alt: 'Claude Fable 5.1 benchmark table' },
  },
  {
    slug: 'dyson-puts-ai-in-a-499-toothbrush',
    title: 'Dyson puts AI in a $499 toothbrush',
    author: 'Jennifer Mossalgue',
    readingMinutes: 5,
    tag: 'tech',
    image: { alt: 'Person holding a smart toothbrush next to a phone' },
  },
  {
    slug: 'runway-solaris-previews-the-no-code-internet',
    title: "Runway's Solaris previews the no-code internet",
    author: 'Zach Mink',
    readingMinutes: 7,
    tag: 'ai',
    image: { alt: 'Person standing in a stylised green room with a clothes rack' },
  },
  {
    slug: 'hugging-face-robot-duck-is-already-a-hit',
    title: 'Hugging Face’s robot duck is already a hit',
    author: 'Jennifer Mossalgue',
    readingMinutes: 6,
    tag: 'robotics',
    image: { alt: 'Small orange robot on a desk in front of a monitor' },
  },
];
```

- [x] **Step 6 : `content/guides.ts`**

```ts
import type { Guide } from './types';

/** Les catégories ne sont pas affichées sur le site : attribuées d'après le sujet du guide. */
export const guides: Guide[] = [
  {
    slug: 'stand-out-in-an-ai-job-interview-with-the-proof-project-method',
    title: 'Stand Out in an AI Job Interview With the “Proof Project” Method',
    categories: ['recruiting-hr', 'student', 'general'],
    image: { alt: 'Screenshot of a workflow demo video' },
  },
  {
    slug: 'how-to-pick-a-dedicated-ai-device',
    title: 'How To Pick a Dedicated AI Device',
    categories: ['general'],
    image: { alt: 'Presenter holding a small AI device' },
  },
  {
    slug: 'how-to-connect-chatgpt-to-imessage-and-what-it-can-do',
    title: 'How To Connect ChatGPT to iMessage (and What It Can Do)',
    categories: ['general', 'coding'],
    image: { alt: 'Dark terminal window with a ChatGPT conversation' },
  },
  {
    slug: 'submit-your-ios-app-to-the-app-store-with-chatgpt-work',
    title: 'Submit Your iOS App to the App Store With ChatGPT Work',
    categories: ['coding'],
    image: { alt: 'App Store Connect dashboard' },
  },
  {
    slug: 'use-these-ai-skills-to-make-better-decisions-quickly',
    title: 'Use These AI Skills To Make Better Decisions Quickly',
    categories: ['business-operations', 'consulting'],
    image: { alt: 'Chat interface listing decision-making skills' },
  },
  {
    slug: 'beginners-guide-to-chatgpt-work-chatgpt-projects-101',
    title: 'Beginner’s Guide to ChatGPT Work (ChatGPT Projects 101)',
    categories: ['general', 'project-management'],
    image: { alt: 'ChatGPT Projects sidebar' },
  },
  {
    slug: 'build-a-reusable-ai-design-system-with-open-design',
    title: 'Build a Reusable AI Design System With Open Design',
    categories: ['design'],
    image: { alt: 'Design system component kit' },
  },
  {
    slug: 'use-gemini-canvas-to-visualize-google-sheets-like-a-pro',
    title: 'Use Gemini Canvas to Visualize Google Sheets Like a Pro',
    categories: ['data-analysis', 'finance'],
    image: { alt: 'Dashboard with bar and donut charts' },
  },
];
```

- [x] **Step 7 : `content/tools.ts`**

```ts
import type { Tool } from './types';

export const tools: Tool[] = [
  {
    slug: 'muse-spark-1-3',
    name: 'Muse Spark 1.3',
    description: "Meta's cost-effective, intelligent model",
    categories: ['consumer', 'coding'],
    badgeIcon: 'consumer',
    image: { alt: 'Blue wireframe waves on a dark background' },
  },
  {
    slug: 'claude-fable-5-1',
    name: 'Claude Fable 5.1',
    description: "Anthropic's new flagship, top-rated model",
    categories: ['consumer', 'coding', 'agents'],
    badgeIcon: 'consumer',
    image: { alt: 'Claude Fable 5.1 benchmark table' },
  },
  {
    slug: 'gemini-3-8-flash',
    name: 'Gemini 3.8 Flash',
    description: "Google's strongest Flash model yet for coding and agents",
    categories: ['consumer', 'coding', 'agents'],
    badgeIcon: 'consumer',
    image: { alt: 'Gemini 3.8 Flash announcement visual' },
  },
  {
    slug: 'google-pics',
    name: 'Google Pics',
    description: "Google's Nano Banana image editor built into Docs and Slides",
    categories: ['content-creator', 'design', 'marketing'],
    badgeIcon: 'content-creator',
    image: { alt: 'Collage of colourful posters' },
  },
  {
    slug: 'muse-voice-transcribe',
    name: 'Muse Voice Transcribe',
    description:
      "Muse Voice Transcribe - Meta's live speech-to-text that tracks 20+ speakers and mid-sentence language switches",
    categories: ['miscellaneous', 'business-operations'],
    badgeIcon: 'miscellaneous',
    image: { alt: 'Sound waves on a dark background' },
  },
  {
    slug: 'openclaw-2-0',
    name: 'Openclaw 2.0',
    description: 'Open-source personal agent, rebuilt with easier setup and multiplayer sessions',
    categories: ['agents', 'coding'],
    badgeIcon: 'agents',
    image: { alt: 'Red lobster mascot in front of glowing screens' },
  },
  {
    slug: 'cohere-parse-5',
    name: 'Cohere Parse 5',
    description: 'Low-cost model converting complex documents into machine-readable data',
    categories: ['business-operations', 'data-analysis'],
    badgeIcon: 'business-operations',
    image: { alt: 'Soft blurred light gradient' },
  },
  {
    slug: 'gemini-omni-1-1-flash',
    name: 'Gemini Omni 1.1 Flash',
    description: "Google's video model update with scene extensions and 4K upscaling",
    categories: ['miscellaneous', 'content-creator'],
    badgeIcon: 'miscellaneous',
    image: { alt: 'Gemini Omni 1.1 Flash video stills' },
  },
  {
    slug: 'gemini-3-5-transcribe',
    name: 'Gemini 3.5 Transcribe',
    description: "Google's new speech-to-text model that edits out filler words",
    categories: ['content-creator', 'miscellaneous'],
    badgeIcon: 'content-creator',
    image: { alt: 'Gemini 3.5 Transcribe visual' },
  },
  {
    slug: 'glm-5-3-flash',
    name: 'GLM-5.3-Flash',
    description:
      'Z AI’s new multimodal system revealed as the mystery Ox Alpha model on OpenRouter',
    categories: ['consumer', 'science'],
    badgeIcon: 'consumer',
    image: { alt: 'Line chart comparing model scores' },
  },
  {
    slug: 'h3-max',
    name: 'H3 Max',
    description: "fal's MiniMax H3 remixed video model tuned for speed and quality",
    categories: ['content-creator', 'marketing'],
    badgeIcon: 'content-creator',
    image: { alt: 'Purple pixel-art style model card' },
  },
  {
    slug: 'keenable',
    name: 'Keenable',
    description: 'Search API that lets agents query and learn from the live web',
    categories: ['agents', 'coding'],
    badgeIcon: 'agents',
    image: { alt: 'Keenable website hero' },
  },
];
```

- [x] **Step 8 : `content/podcast.ts` et `content/university.ts`**

`content/podcast.ts` :
```ts
import type { PodcastContent } from './types';

export const podcast: PodcastContent = {
  title: "Rowan's Notes",
  description:
    "Rowan's Notes is a podcast hosted by Rowan Cheung, where he talks with experts in the AI industry about the latest developments, why they matter, and how you can leverage them in the future of work.",
  listenLinks: [
    { label: 'Spotify', href: 'https://open.spotify.com/show/2zQpIc96gbruTylpzo9dVY', icon: 'spotify' },
    {
      label: 'Apple Podcasts',
      href: 'https://podcasts.apple.com/us/podcast/the-state-of-ai-with-rowan-cheung/id1689006106',
      icon: 'apple',
    },
  ],
  card: {
    platformLabel: 'Podcasts',
    title: "Rowan's Notes",
    meta: 'Tech News • Updated Daily',
    description:
      "Rowan's Notes is a podcast where The Rundown's founder, Rowan Cheung, interviews the people shaping the AI industry — breaking down what’s real vs hype and how to leverage it to get ahead in your life, work, and business.",
    ctaLabel: 'Latest Episode',
    ctaHref: 'https://podcasts.apple.com/us/podcast/the-state-of-ai-with-rowan-cheung/id1689006106',
    footnote: 'See how your data is managed…',
    artworkAlt: "Rowan's Notes podcast artwork",
  },
};
```

`content/university.ts` :
```ts
import type { UniversityContent } from './types';

export const university: UniversityContent = {
  brandName: 'The Rundown',
  brandAccent: 'University',
  title: 'AI training for the future of work.',
  subtitle:
    'Get access to all our AI courses, hundreds of real-world AI use cases, live expert-led workshops, an exclusive network of AI early adopters, and more.',
  primaryCta: { label: 'Join AI University', href: 'https://app.therundown.ai/' },
  secondaryCta: { label: 'Explore The Rundown University', href: '/ai-university' },
  features: [
    {
      title: 'AI Courses',
      description:
        'Get unlimited access to all of our current & upcoming industry-specific AI courses for the duration of your subscription.',
      icon: 'courses',
    },
    {
      title: 'Daily Guides',
      description:
        'To keep up with the rapid pace of AI, our team publishes AI implementation guides daily. Our library contains 300+ practical use cases to automate real-world work.',
      icon: 'daily-guides',
    },
    {
      title: 'Workshops',
      description:
        'Join weekly, live, interactive sessions with industry leaders who are at the forefront of AI for hands-on implementation guidance and exclusive insights.',
      icon: 'workshops',
    },
    {
      title: 'Community',
      description:
        'Network with an exclusive community of AI-first professionals who are working smarter with AI. Learn how early adopters are using AI in their work and businesses.',
      icon: 'community',
    },
  ],
};
```

- [x] **Step 9 : tests, typecheck, commit**

Run : `pnpm test tests/content/content.test.ts && pnpm typecheck`
Expected : PASS (6 tests) ; typecheck sans erreur (le `Record<IconName, …>` garantit qu'aucune icône ne manque).

```bash
git add lib/icons.ts content/ tests/content/
git commit -m "feat: contenu de référence typé et mapping des icônes Hugeicons

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5 : Primitives UI (Icon, Button, Chip, Tabs, SectionHeading, PlaceholderImage, LogoWordmark, BrandLogo)

**Files:**
- Create: `components/ui/icon.tsx`, `components/ui/button.tsx`, `components/ui/chip.tsx`, `components/ui/tabs.tsx`, `components/ui/section-heading.tsx`, `components/ui/placeholder-image.tsx`, `components/ui/logo-wordmark.tsx`, `components/ui/brand-logo.tsx`
- Test: `tests/components/ui/icon.test.tsx`, `button.test.tsx`, `chip.test.tsx`, `tabs.test.tsx`, `section-heading.test.tsx`, `placeholder-image.test.tsx`, `brand-logo.test.tsx`

**Interfaces:**
- Consumes: `IconName`, `ImageRef` (`@/content/types`) ; `getIcon` (`@/lib/icons`) ; `hashString`, `hashToGradient`, `truncateLabel` (`@/lib/placeholder`) ; `cn`.
- Produces:
  - `Icon({ name: IconName; size?: number; strokeWidth?: number; className?: string; label?: string })`
  - `Button(props: ButtonStyleProps & ComponentPropsWithoutRef<'button'>)`, `ButtonLink(props: ButtonStyleProps & ComponentPropsWithoutRef<typeof Link>)`, `buttonClasses(ButtonStyleProps): string`, `ButtonVariant = 'ink' | 'gradient' | 'outline' | 'outline-light' | 'white'`, `ButtonSize = 'sm' | 'md' | 'lg'`
  - `Chip({ label: string; icon?: IconName; active?: boolean; onClick?: () => void; className?: string })`
  - `Tabs({ items: { slug: string; label: string }[]; active: string; onChange: (slug: string) => void; ariaLabel: string })`
  - `SectionHeading({ id: string; title: string; subtitle?: string; tone?: 'light' | 'dark'; className?: string; subtitleClassName?: string })`
  - `PlaceholderImage({ image: ImageRef; label: string; className?: string; sizes?: string; priority?: boolean })` — remplit un parent `relative` qui porte le ratio.
  - `LogoWordmark({ name: string; className?: string })`
  - `BrandLogo({ name: string; tone: 'light' | 'dark'; className?: string })`

- [x] **Step 1 : tests qui échouent (7 fichiers)**

`tests/components/ui/icon.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from '@/components/ui/icon';

describe('Icon', () => {
  it('renders a decorative svg by default', () => {
    const { container } = render(<Icon name="menu" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('data-icon', 'menu');
    expect(svg).toHaveAttribute('width', '20');
  });

  it('becomes an accessible image when a label is given', () => {
    render(<Icon name="spotify" label="Spotify" size={16} />);
    expect(screen.getByRole('img', { name: 'Spotify' })).toHaveAttribute('width', '16');
  });
});
```

`tests/components/ui/button.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button, ButtonLink, buttonClasses } from '@/components/ui/button';

describe('Button', () => {
  it('defaults to type="button" and the ink variant', () => {
    render(<Button>Subscribe</Button>);
    const button = screen.getByRole('button', { name: 'Subscribe' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button.className).toContain('bg-ink');
  });

  it('applies variant and size classes and forwards disabled', () => {
    render(
      <Button variant="gradient" size="lg" disabled>
        Join
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Join' });
    expect(button.className).toContain('bg-brand-gradient');
    expect(button.className).toContain('h-12');
    expect(button).toBeDisabled();
  });
});

describe('ButtonLink', () => {
  it('renders an anchor with the href and outline styles', () => {
    render(
      <ButtonLink href="/articles" variant="outline" size="sm">
        View all
      </ButtonLink>,
    );
    const link = screen.getByRole('link', { name: 'View all' });
    expect(link).toHaveAttribute('href', '/articles');
    expect(link.className).toContain('border-line');
    expect(link.className).toContain('h-[42px]');
  });
});

describe('buttonClasses', () => {
  it('lets className override conflicting utilities', () => {
    expect(buttonClasses({ size: 'md', className: 'h-9' })).toContain('h-9');
    expect(buttonClasses({ size: 'md', className: 'h-9' })).not.toContain('h-11');
  });
});
```

`tests/components/ui/chip.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Chip } from '@/components/ui/chip';

describe('Chip', () => {
  it('exposes the active state through aria-pressed', () => {
    render(<Chip label="Coding" icon="coding" active />);
    const chip = screen.getByRole('button', { name: 'Coding' });
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    expect(chip.querySelector('svg[data-icon="coding"]')).not.toBeNull();
  });

  it('calls onClick and is not pressed by default', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip label="Design" onClick={onClick} />);
    const chip = screen.getByRole('button', { name: 'Design' });
    expect(chip).toHaveAttribute('aria-pressed', 'false');
    await user.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

`tests/components/ui/tabs.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from '@/components/ui/tabs';

const items = [
  { slug: 'all', label: 'All' },
  { slug: 'ai', label: 'AI' },
];

describe('Tabs', () => {
  it('marks the active tab and reports changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs items={items} active="all" onChange={onChange} ariaLabel="Filter articles" />);
    expect(screen.getByRole('group', { name: 'Filter articles' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'AI' })).toHaveAttribute('aria-pressed', 'false');
    await user.click(screen.getByRole('button', { name: 'AI' }));
    expect(onChange).toHaveBeenCalledWith('ai');
  });
});
```

`tests/components/ui/section-heading.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeading } from '@/components/ui/section-heading';

describe('SectionHeading', () => {
  it('renders an h2 with the given id and an optional subtitle', () => {
    render(<SectionHeading id="guides-title" title="Guides" subtitle="Sub" />);
    const heading = screen.getByRole('heading', { level: 2, name: 'Guides' });
    expect(heading).toHaveAttribute('id', 'guides-title');
    expect(heading.className).toContain('text-ink');
    expect(screen.getByText('Sub')).toBeInTheDocument();
  });

  it('switches to light text on dark tone and omits the subtitle when absent', () => {
    render(<SectionHeading id="u" title="AI training" tone="dark" />);
    expect(screen.getByRole('heading', { level: 2 }).className).toContain('text-white');
    expect(screen.queryByText('Sub')).toBeNull();
  });
});
```

`tests/components/ui/placeholder-image.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PlaceholderImage } from '@/components/ui/placeholder-image';

describe('PlaceholderImage', () => {
  it('renders a generated svg labelled with the alt text when there is no src', () => {
    render(<PlaceholderImage image={{ alt: 'Muse Spark artwork' }} label="Muse Spark 1.3" />);
    const img = screen.getByRole('img', { name: 'Muse Spark artwork' });
    expect(img.tagName.toLowerCase()).toBe('svg');
    expect(img).toHaveTextContent('Muse Spark 1.3');
  });

  it('is deterministic: the same label yields the same gradient stops', () => {
    const { container: a } = render(<PlaceholderImage image={{ alt: 'a' }} label="Guides" />);
    const { container: b } = render(<PlaceholderImage image={{ alt: 'b' }} label="Guides" />);
    const stops = (c: HTMLElement) => [...c.querySelectorAll('stop')].map((s) => s.getAttribute('stop-color'));
    expect(stops(a)).toEqual(stops(b));
    expect(stops(a)).toHaveLength(2);
  });

  it('renders next/image when a src is provided', () => {
    render(
      <div style={{ position: 'relative', width: 320, height: 180 }}>
        <PlaceholderImage image={{ src: '/demo.png', alt: 'Demo' }} label="Demo" />
      </div>,
    );
    expect(screen.getByRole('img', { name: 'Demo' }).tagName.toLowerCase()).toBe('img');
  });
});
```

`tests/components/ui/brand-logo.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandLogo } from '@/components/ui/brand-logo';
import { LogoWordmark } from '@/components/ui/logo-wordmark';

describe('BrandLogo', () => {
  it('shows the brand name and adapts to the tone', () => {
    render(<BrandLogo name="The Rundown" tone="dark" />);
    expect(screen.getByText('The Rundown').className).toContain('text-white');
  });
});

describe('LogoWordmark', () => {
  it('renders the company name as text', () => {
    render(<LogoWordmark name="Google" />);
    expect(screen.getByText('Google')).toBeInTheDocument();
  });
});
```

Run : `pnpm test tests/components/ui`
Expected : FAIL — 7 fichiers, modules introuvables.

- [x] **Step 2 : `components/ui/icon.tsx`**

```tsx
import { HugeiconsIcon } from '@hugeicons/react';
import type { IconName } from '@/content/types';
import { getIcon } from '@/lib/icons';

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Avec un libellé l'icône devient une image accessible ; sans, elle est décorative. */
  label?: string;
};

export function Icon({ name, size = 20, strokeWidth = 1.8, className, label }: IconProps) {
  return (
    <HugeiconsIcon
      icon={getIcon(name)}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      data-icon={name}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  );
}
```

`HugeiconsIcon` est un simple `forwardRef` sans hook ni directive `use client` (vérifié dans `@hugeicons/react` 1.1.10) : utilisable dans les Server Components.

- [x] **Step 3 : `components/ui/button.tsx`**

```tsx
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'ink' | 'gradient' | 'outline' | 'outline-light' | 'white';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  ink: 'bg-ink text-white hover:bg-neutral-800',
  gradient: 'bg-brand-gradient text-white hover:opacity-90',
  outline: 'border border-line bg-transparent text-ink hover:bg-neutral-50',
  'outline-light': 'border border-white/40 bg-transparent text-white hover:bg-white/10',
  white: 'bg-white font-medium text-ink hover:bg-neutral-100',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-[42px] px-5 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-12 px-6 text-base',
};

export function buttonClasses({ variant = 'ink', size = 'md', className }: ButtonStyleProps): string {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonStyleProps & ComponentPropsWithoutRef<'button'>;

export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...rest} />;
}

type ButtonLinkProps = ButtonStyleProps & ComponentPropsWithoutRef<typeof Link>;

export function ButtonLink({ variant, size, className, ...rest }: ButtonLinkProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...rest} />;
}
```

- [x] **Step 4 : `components/ui/chip.tsx` et `components/ui/tabs.tsx`**

`components/ui/chip.tsx` :
```tsx
import type { IconName } from '@/content/types';
import { cn } from '@/lib/cn';
import { Icon } from './icon';

type ChipProps = {
  label: string;
  icon?: IconName;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Chip({ label, icon, active = false, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-[39px] items-center gap-2 rounded-full border px-3.5 text-[17px] leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:bg-neutral-50',
        className,
      )}
    >
      {icon ? <Icon name={icon} size={16} /> : null}
      <span>{label}</span>
    </button>
  );
}
```

`components/ui/tabs.tsx` :
```tsx
import { cn } from '@/lib/cn';

type TabsProps = {
  items: { slug: string; label: string }[];
  active: string;
  onChange: (slug: string) => void;
  ariaLabel: string;
};

export function Tabs({ items, active, onChange, ariaLabel }: TabsProps) {
  return (
    <div role="group" aria-label={ariaLabel} className="inline-flex items-center gap-1 rounded-xl border border-line bg-white p-1">
      {items.map((item) => {
        const isActive = item.slug === active;
        return (
          <button
            key={item.slug}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(item.slug)}
            className={cn(
              'h-[33px] rounded-lg px-4 text-[17px] leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
              isActive ? 'bg-ink text-white' : 'text-ink hover:bg-neutral-100',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [x] **Step 5 : `components/ui/section-heading.tsx`**

```tsx
import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  id: string;
  title: string;
  subtitle?: string;
  tone?: 'light' | 'dark';
  className?: string;
  subtitleClassName?: string;
};

export function SectionHeading({ id, title, subtitle, tone = 'light', className, subtitleClassName }: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      <h2
        id={id}
        className={cn('text-[32px] font-bold leading-none tracking-[-0.025em] md:text-5xl', dark ? 'text-white' : 'text-ink')}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn('mt-4 text-lg leading-7', dark ? 'text-white/80' : 'text-neutral-700', subtitleClassName)}>{subtitle}</p>
      ) : null}
    </div>
  );
}
```

- [x] **Step 6 : `components/ui/placeholder-image.tsx`**

```tsx
import Image from 'next/image';
import type { ImageRef } from '@/content/types';
import { cn } from '@/lib/cn';
import { hashString, hashToGradient, truncateLabel } from '@/lib/placeholder';

type PlaceholderImageProps = {
  image: ImageRef;
  /** Graine du dégradé et texte affiché (titre de la carte). */
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Remplit un parent `relative` qui définit le ratio (aspect-video, aspect-square…). */
export function PlaceholderImage({
  image,
  label,
  className,
  sizes = '(min-width: 1024px) 560px, 100vw',
  priority = false,
}: PlaceholderImageProps) {
  if (image.src) {
    return <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className={cn('object-cover', className)} />;
  }

  const gradient = hashToGradient(label);
  const id = `pg-${hashString(label).toString(36)}`;

  return (
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
          <line x1="0" y1="0" x2="0" y2="12" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill={`url(#${id})`} />
      <rect width="320" height="180" fill={`url(#${id}-lines)`} />
      <text
        x="160"
        y="95"
        textAnchor="middle"
        fill="white"
        fillOpacity="0.9"
        fontSize="16"
        fontWeight="600"
        fontFamily="var(--font-sans), system-ui, sans-serif"
      >
        {truncateLabel(label)}
      </text>
    </svg>
  );
}
```

- [x] **Step 7 : `components/ui/logo-wordmark.tsx` et `components/ui/brand-logo.tsx`**

`components/ui/logo-wordmark.tsx` :
```tsx
import { cn } from '@/lib/cn';

/** Logos « trusted by » rendus en texte : aucun logo protégé n'est copié. */
export function LogoWordmark({ name, className }: { name: string; className?: string }) {
  return <span className={cn('text-lg font-bold tracking-tight text-white/90', className)}>{name}</span>;
}
```

`components/ui/brand-logo.tsx` :
```tsx
import { cn } from '@/lib/cn';

type BrandLogoProps = { name: string; tone: 'light' | 'dark'; className?: string };

export function BrandLogo({ name, tone, className }: BrandLogoProps) {
  const dark = tone === 'dark';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-md text-xs font-black tracking-tighter',
          dark ? 'bg-white text-ink' : 'bg-ink text-white',
        )}
      >
        RR
      </span>
      <span className={cn('text-lg font-semibold', dark ? 'text-white' : 'text-ink')}>{name}</span>
    </span>
  );
}
```

- [x] **Step 8 : tests, lint, commit**

Run : `pnpm test tests/components/ui && pnpm typecheck && pnpm lint`
Expected : PASS (13 tests).

```bash
git add components/ui tests/components/ui
git commit -m "feat: primitives UI (icône, boutons, puce, onglets, titre de section, placeholder, logos)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6 : `FilterableGrid` (Client Component générique)

**Files:**
- Create: `components/ui/filterable-grid.tsx`
- Test: `tests/components/ui/filterable-grid.test.tsx`

**Interfaces:**
- Consumes: `Category` ; `ALL`, `filterByCategory` ; `Chip`, `Tabs`.
- Produces:
```ts
export type FilterableGridProps<T> = {
  items: readonly T[];
  categories: readonly Category[];            // sans 'all' : ajouté en tête par le composant
  getCategories: (item: T) => readonly string[];
  variant: 'tabs' | 'chips';
  renderItems: (visible: T[]) => ReactNode;   // la section décide de la mise en page
  filterLabel: string;                        // aria-label du groupe de filtres
  emptyLabel?: string;                        // défaut 'Nothing here yet.'
  allLabel?: string;                          // défaut 'All'
};
export function FilterableGrid<T>(props: FilterableGridProps<T>): JSX.Element
```
`renderItems` est une fonction : les sections qui l'utilisent doivent être des Client Components (Tasks 9 et 10).

- [x] **Step 1 : test qui échoue**

`tests/components/ui/filterable-grid.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { FilterableGrid } from '@/components/ui/filterable-grid';
import type { Category } from '@/content/types';

type Item = { id: string; cats: string[] };

const items: Item[] = [
  { id: 'one', cats: ['coding'] },
  { id: 'two', cats: ['design'] },
  { id: 'three', cats: ['coding', 'design'] },
];

const categories: Category[] = [
  { slug: 'coding', label: 'Coding', icon: 'coding' },
  { slug: 'design', label: 'Design', icon: 'design' },
];

const renderItems = (visible: Item[]) => (
  <ul>
    {visible.map((item) => (
      <li key={item.id}>{item.id}</li>
    ))}
  </ul>
);

function setup(variant: 'tabs' | 'chips' = 'chips', data: Item[] = items) {
  return render(
    <FilterableGrid
      items={data}
      categories={categories}
      getCategories={(item) => item.cats}
      variant={variant}
      filterLabel="Filter items"
      renderItems={renderItems}
    />,
  );
}

describe('FilterableGrid', () => {
  it('shows every item with "All" active by default', () => {
    setup();
    expect(screen.getByRole('group', { name: 'Filter items' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('filters the items when a chip is clicked', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['two', 'three']);
    expect(screen.getByRole('button', { name: 'Design' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows the empty label when nothing matches', async () => {
    const user = userEvent.setup();
    setup('chips', [{ id: 'solo', cats: ['coding'] }]);
    await user.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument();
  });

  it('renders the tabs variant with the same behaviour', async () => {
    const user = userEvent.setup();
    setup('tabs');
    await user.click(screen.getByRole('button', { name: 'Coding' }));
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['one', 'three']);
  });
});
```

Run : `pnpm test tests/components/ui/filterable-grid.test.tsx`
Expected : FAIL — module introuvable.

- [x] **Step 2 : `components/ui/filterable-grid.tsx`**

```tsx
'use client';

import { useState, type ReactNode } from 'react';
import type { Category } from '@/content/types';
import { ALL, filterByCategory } from '@/lib/filter';
import { Chip } from './chip';
import { Tabs } from './tabs';

export type FilterableGridProps<T> = {
  items: readonly T[];
  categories: readonly Category[];
  getCategories: (item: T) => readonly string[];
  variant: 'tabs' | 'chips';
  renderItems: (visible: T[]) => ReactNode;
  filterLabel: string;
  emptyLabel?: string;
  allLabel?: string;
};

export function FilterableGrid<T>({
  items,
  categories,
  getCategories,
  variant,
  renderItems,
  filterLabel,
  emptyLabel = 'Nothing here yet.',
  allLabel = 'All',
}: FilterableGridProps<T>) {
  const [active, setActive] = useState<string>(ALL);
  const options: Category[] = [{ slug: ALL, label: allLabel, icon: 'all' }, ...categories];
  const visible = filterByCategory(items, active, getCategories);

  return (
    <div>
      {variant === 'tabs' ? (
        <div className="mt-8 flex justify-center">
          <Tabs items={options} active={active} onChange={setActive} ariaLabel={filterLabel} />
        </div>
      ) : (
        <div role="group" aria-label={filterLabel} className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
          {options.map((category) => (
            <Chip
              key={category.slug}
              label={category.label}
              icon={category.icon}
              active={category.slug === active}
              onClick={() => setActive(category.slug)}
            />
          ))}
        </div>
      )}
      <div className="mt-12">
        {visible.length > 0 ? renderItems(visible) : <p className="text-center text-muted">{emptyLabel}</p>}
      </div>
    </div>
  );
}
```

Run : `pnpm test tests/components/ui/filterable-grid.test.tsx`
Expected : PASS (4 tests).

- [x] **Step 3 : commit**

```bash
git add components/ui/filterable-grid.tsx tests/components/ui/filterable-grid.test.tsx
git commit -m "feat: grille filtrable générique (onglets ou puces) côté client

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7 : Newsletter simulée (route API + formulaire)

**Files:**
- Create: `app/api/newsletter/route.ts`, `components/ui/newsletter-form.tsx`
- Test: `tests/app/api/newsletter/route.test.ts`, `tests/components/ui/newsletter-form.test.tsx`

**Interfaces:**
- Consumes: `isValidEmail`, `normalizeEmail`, `maskEmail` ; `Button`, `Icon`, `cn`.
- Produces: `POST(request: Request): Promise<NextResponse>` → 200 `{ ok: true }` | 400 `{ ok: false, error: 'invalid_email' }` ; `NewsletterForm({ variant?: 'hero' | 'footer'; placeholder?: string; buttonLabel?: string; endpoint?: string; className?: string })` ; `MESSAGES = { invalid, success, failure }`.

- [x] **Step 1 : test de la route qui échoue**

`tests/app/api/newsletter/route.test.ts` :
```ts
// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/newsletter/route';

function post(body: string) {
  return POST(
    new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    }),
  );
}

describe('POST /api/newsletter', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => undefined);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('accepts a valid email (trimmed) and logs a masked address', async () => {
    const response = await post(JSON.stringify({ email: ' jane@example.com ' }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining('j***@example.com'));
  });

  it('rejects an invalid email with 400', async () => {
    const response = await post(JSON.stringify({ email: 'nope' }));
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, error: 'invalid_email' });
  });

  it('rejects a malformed JSON body with 400', async () => {
    const response = await post('{not json');
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, error: 'invalid_email' });
  });

  it('rejects a body without email with 400', async () => {
    const response = await post(JSON.stringify({}));
    expect(response.status).toBe(400);
  });
});
```

Run : `pnpm test tests/app/api/newsletter/route.test.ts`
Expected : FAIL — module introuvable.

- [x] **Step 2 : `app/api/newsletter/route.ts`**

```ts
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
```

Run : `pnpm test tests/app/api/newsletter/route.test.ts`
Expected : PASS (4 tests).

- [x] **Step 3 : test du formulaire qui échoue**

`tests/components/ui/newsletter-form.test.tsx` :
```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MESSAGES, NewsletterForm } from '@/components/ui/newsletter-form';

const fetchMock = vi.fn();

describe('NewsletterForm', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows a local error and skips the network for an invalid email', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByLabelText('Email address'), 'nope');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(screen.getByRole('status')).toHaveTextContent(MESSAGES.invalid);
    expect(screen.getByLabelText('Email address')).toHaveAttribute('aria-invalid', 'true');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts the trimmed email and shows the success message', async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200 });
    const user = userEvent.setup();
    render(<NewsletterForm />);
    const input = screen.getByLabelText('Email address');
    await user.type(input, ' jane@example.com ');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(MESSAGES.success));
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/newsletter',
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ email: 'jane@example.com' }) }),
    );
    expect(input).toHaveValue('');
  });

  it('shows the failure message when the server rejects', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 });
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByLabelText('Email address'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(MESSAGES.failure));
  });

  it('disables the button while the request is pending', async () => {
    let resolve: (value: { ok: boolean; status: number }) => void = () => undefined;
    fetchMock.mockReturnValue(
      new Promise((r) => {
        resolve = r;
      }),
    );
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByLabelText('Email address'), 'jane@example.com');
    const button = screen.getByRole('button', { name: /subscribe/i });
    await user.click(button);
    expect(button).toBeDisabled();
    resolve({ ok: true, status: 200 });
    await waitFor(() => expect(button).toBeEnabled());
  });

  it('uses the given placeholder and button label', () => {
    render(<NewsletterForm variant="footer" placeholder="Your email" buttonLabel="Go" />);
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go/i })).toBeInTheDocument();
  });
});
```

Run : `pnpm test tests/components/ui/newsletter-form.test.tsx`
Expected : FAIL — module introuvable.

- [x] **Step 4 : `components/ui/newsletter-form.tsx`**

```tsx
'use client';

import { useId, useState, type FormEvent } from 'react';
import { cn } from '@/lib/cn';
import { isValidEmail } from '@/lib/validate-email';
import { Button } from './button';
import { Icon } from './icon';

export const MESSAGES = {
  invalid: 'Enter a valid email address.',
  success: 'Check your inbox to confirm.',
  failure: 'Something went wrong, try again.',
} as const;

type Status = 'idle' | 'sending' | 'success' | 'error';

type NewsletterFormProps = {
  variant?: 'hero' | 'footer';
  placeholder?: string;
  buttonLabel?: string;
  endpoint?: string;
  className?: string;
};

export function NewsletterForm({
  variant = 'hero',
  placeholder = 'Email Address',
  buttonLabel = 'Subscribe',
  endpoint = '/api/newsletter',
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const inputId = useId();
  const messageId = `${inputId}-message`;
  const isHero = variant === 'hero';
  const sending = status === 'sending';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setStatus('error');
      setMessage(MESSAGES.invalid);
      return;
    }
    setStatus('sending');
    setMessage('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
      setMessage(MESSAGES.success);
      setEmail('');
    } catch {
      setStatus('error');
      setMessage(MESSAGES.failure);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('w-full', isHero ? 'max-w-[512px]' : 'max-w-[320px]', className)}>
      <div className={cn('flex items-center gap-2 rounded-xl bg-white p-1.5 ring-1 ring-black/10', isHero && 'shadow-lg')}>
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={status === 'error'}
          aria-describedby={message ? messageId : undefined}
          disabled={sending}
          className={cn(
            'min-w-0 flex-1 bg-transparent px-3 text-ink placeholder:text-neutral-400 focus:outline-none',
            isHero ? 'h-11 text-base' : 'h-9 text-sm',
          )}
        />
        <Button type="submit" size={isHero ? 'md' : 'sm'} disabled={sending} className={cn(!isHero && 'h-9 px-3 text-sm')}>
          {buttonLabel}
          <Icon name="send" size={16} />
        </Button>
      </div>
      <p
        id={messageId}
        role="status"
        aria-live="polite"
        className={cn(
          'mt-2 text-sm',
          status === 'error' ? (isHero ? 'text-red-300' : 'text-red-600') : isHero ? 'text-white/80' : 'text-neutral-600',
          !message && 'sr-only',
        )}
      >
        {message}
      </p>
    </form>
  );
}
```

Run : `pnpm test tests/components/ui/newsletter-form.test.tsx`
Expected : PASS (5 tests).

- [x] **Step 5 : vérifier la route en conditions réelles, puis commit**

```bash
(pnpm dev > /tmp/cohezi-dev.log 2>&1 &) && sleep 6
curl -s -X POST http://localhost:3000/api/newsletter -H 'Content-Type: application/json' -d '{"email":"jane@example.com"}'   # {"ok":true}
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/newsletter -H 'Content-Type: application/json' -d '{"email":"nope"}'   # 400
pkill -f "next dev" || true
git add app/api components/ui/newsletter-form.tsx tests/app tests/components/ui/newsletter-form.test.tsx
git commit -m "feat: newsletter simulée (route API validée et formulaire à états)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8 : Header, menu mobile et footer

**Files:**
- Create: `components/layout/site-header.tsx`, `components/layout/mobile-menu.tsx`, `components/layout/site-footer.tsx`
- Test: `tests/components/layout/site-header.test.tsx`, `tests/components/layout/mobile-menu.test.tsx`, `tests/components/layout/site-footer.test.tsx`

**Interfaces:**
- Consumes: `site` (`@/content/site`), `NavItem`, `SiteConfig` ; `BrandLogo`, `ButtonLink`, `Icon`, `NewsletterForm`.
- Produces: `SiteHeader({ name: string; nav: NavItem[]; cta: NavItem })` ; `MobileMenu({ nav: NavItem[]; cta: NavItem })` ; `SiteFooter({ site: SiteConfig })`.

- [ ] **Step 1 : tests qui échouent**

`tests/components/layout/site-header.test.tsx` :
```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from '@/components/layout/site-header';
import { site } from '@/content/site';

describe('SiteHeader', () => {
  it('renders the brand link, every nav item and the CTA', () => {
    render(<SiteHeader name={site.name} nav={site.nav} cta={site.headerCta} />);
    expect(screen.getByRole('link', { name: 'The Rundown homepage' })).toHaveAttribute('href', '/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    for (const item of site.nav) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.href);
    }
    expect(screen.getByRole('link', { name: /University Platform/ })).toHaveAttribute('href', site.headerCta.href);
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });
});
```

`tests/components/layout/mobile-menu.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { site } from '@/content/site';

// `next/link` appelle le routeur App Router au clic ; il n'existe pas en jsdom.
// On le remplace par une ancre qui relaie onClick et annule la navigation.
vi.mock('next/link', () => ({
  default: ({ href, onClick, children, ...rest }: ComponentPropsWithoutRef<'a'> & { href: string }) => (
    <a
      href={href}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        event.preventDefault();
      }}
      {...rest}
    >
      {children}
    </a>
  ),
}));

describe('MobileMenu', () => {
  it('opens the panel, locks body scroll and reflects the state in aria-expanded', async () => {
    const user = userEvent.setup();
    render(<MobileMenu nav={site.nav} cta={site.headerCta} />);
    const trigger = screen.getByRole('button', { name: 'Open menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).toBeNull();

    await user.click(trigger);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/guides');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape and restores body scroll', async () => {
    const user = userEvent.setup();
    render(<MobileMenu nav={site.nav} cta={site.headerCta} />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('');
  });

  it('closes when a navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<MobileMenu nav={site.nav} cta={site.headerCta} />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('link', { name: 'Articles' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
```

`tests/components/layout/site-footer.test.tsx` :
```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteFooter } from '@/components/layout/site-footer';
import { site } from '@/content/site';

describe('SiteFooter', () => {
  it('renders the description, every column, the copyright and social links', () => {
    render(<SiteFooter site={site} />);
    expect(screen.getByText(site.footer.description)).toBeInTheDocument();
    for (const column of site.footer.columns) {
      const nav = screen.getByRole('navigation', { name: column.heading });
      for (const link of column.links) {
        expect(within(nav).getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
      }
    }
    expect(screen.getByText(site.footer.copyright)).toBeInTheDocument();
    for (const social of site.footer.social) {
      expect(screen.getByRole('link', { name: social.label })).toHaveAttribute('href', social.href);
    }
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });
});
```

Run : `pnpm test tests/components/layout`
Expected : FAIL — modules introuvables.

- [ ] **Step 2 : `components/layout/mobile-menu.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { NavItem } from '@/content/types';

type MobileMenuProps = { nav: NavItem[]; cta: NavItem };

export function MobileMenu({ nav, cta }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <Icon name={open ? 'close' : 'menu'} size={20} />
      </button>
      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[68px] z-40 flex flex-col gap-8 overflow-y-auto bg-ink px-5 py-8"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="text-xl font-medium text-white/90 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href={cta.href} variant="white" size="sm" className="self-start" onClick={close}>
          {cta.label}
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
      </div>
    </div>
  );
}
```

- [ ] **Step 3 : `components/layout/site-header.tsx`**

```tsx
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { NavItem } from '@/content/types';
import { MobileMenu } from './mobile-menu';

type SiteHeaderProps = { name: string; nav: NavItem[]; cta: NavItem };

export function SiteHeader({ name, nav, cta }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-ink">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 lg:px-24">
        <Link href="/" aria-label={`${name} homepage`} className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
          <BrandLogo name={name} tone="dark" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-base font-medium text-white/90 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <ButtonLink href={cta.href} variant="white" size="sm">
            {cta.label}
            <Icon name="arrow-right" size={16} />
          </ButtonLink>
        </div>
        <MobileMenu nav={nav} cta={cta} />
      </div>
    </header>
  );
}
```

- [ ] **Step 4 : `components/layout/site-footer.tsx`**

```tsx
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';
import { Icon } from '@/components/ui/icon';
import { NewsletterForm } from '@/components/ui/newsletter-form';
import type { SiteConfig } from '@/content/types';

export function SiteFooter({ site }: { site: SiteConfig }) {
  return (
    <footer className="bg-paper px-2 pb-2 pt-16 md:px-5">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={`${site.name} homepage`} className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <BrandLogo name={site.name} tone="light" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-6 text-neutral-700">{site.footer.description}</p>
            <NewsletterForm
              variant="footer"
              placeholder={site.hero.emailPlaceholder}
              buttonLabel={site.hero.subscribeLabel}
              className="mt-6"
            />
          </div>
          {site.footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-base font-bold text-ink">{column.heading}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">{site.footer.copyright}</p>
          <ul aria-label="Social links" className="flex items-center gap-3">
            {site.footer.social.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-neutral-100"
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

Run : `pnpm test tests/components/layout && pnpm typecheck && pnpm lint`
Expected : PASS (5 tests).

- [ ] **Step 5 : commit**

```bash
git add components/layout tests/components/layout
git commit -m "feat: header collant, menu mobile accessible et footer

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 9 : Hero, carte d'article et section Latest Articles

**Files:**
- Create: `components/sections/hero.tsx`, `components/cards/article-card.tsx`, `components/sections/latest-articles.tsx`
- Test: `tests/components/sections/hero.test.tsx`, `tests/components/cards/article-card.test.tsx`, `tests/components/sections/latest-articles.test.tsx`

**Interfaces:**
- Consumes: `HeroContent`, `Article`, `ArticleTag`, `Category`, `SectionCopy` ; `NewsletterForm`, `LogoWordmark`, `PlaceholderImage`, `SectionHeading`, `FilterableGrid`, `ButtonLink`, `Icon` ; `pickFeatured`.
- Produces: `Hero({ hero: HeroContent })` ; `ArticleCard({ article: Article; variant: 'featured' | 'compact' })`, `TAG_LABELS: Record<ArticleTag, string>` ; `LatestArticles({ copy: SectionCopy; articles: Article[] })` (Client Component), `ARTICLE_TABS: Category[]`.

- [ ] **Step 1 : tests qui échouent**

`tests/components/sections/hero.test.tsx` :
```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from '@/components/sections/hero';
import { site } from '@/content/site';

describe('Hero', () => {
  it('renders the headline with the accent, the subtitle, the form and the trusted-by list', () => {
    render(<Hero hero={site.hero} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Learn AI in 5 minutes a day.');
    expect(within(heading).getByText('5 minutes').className).toContain('text-brand-gradient');
    expect(screen.getByText(site.hero.subtitle)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    const list = screen.getByRole('list', { name: 'Trusted by' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(7);
    expect(screen.getByText('2,000,000+')).toBeInTheDocument();
  });
});
```

`tests/components/cards/article-card.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleCard } from '@/components/cards/article-card';
import { articles } from '@/content/articles';

const featured = articles[0]!;
const compact = articles[2]!;

describe('ArticleCard', () => {
  it('renders the featured variant with tag, subtitle and meta', () => {
    render(<ArticleCard article={featured} variant="featured" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/articles/${featured.slug}`);
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: featured.title })).toBeInTheDocument();
    expect(screen.getByText(featured.subtitle!)).toBeInTheDocument();
    expect(screen.getByText(`${featured.author} • ${featured.readingMinutes} minutes`)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: featured.image.alt })).toBeInTheDocument();
  });

  it('renders the compact variant without subtitle', () => {
    render(<ArticleCard article={compact} variant="compact" />);
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.queryByText(/PLUS:/)).toBeNull();
  });
});
```

`tests/components/sections/latest-articles.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LatestArticles } from '@/components/sections/latest-articles';
import { articles } from '@/content/articles';
import { site } from '@/content/site';

describe('LatestArticles', () => {
  it('renders the heading, all five articles and the view-all link', () => {
    render(<LatestArticles copy={site.sections.articles} articles={articles} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Latest Articles' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getByRole('link', { name: /view all articles/i })).toHaveAttribute('href', '/articles');
  });

  it('filters by tab and promotes the first match as featured', async () => {
    const user = userEvent.setup();
    render(<LatestArticles copy={site.sections.articles} articles={articles} />);
    await user.click(screen.getByRole('button', { name: 'Tech' }));
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('Dyson puts AI in a $499 toothbrush');
    expect(cards[0]!.className).toContain('featured');
  });
});
```

Run : `pnpm test tests/components/sections/hero.test.tsx tests/components/cards tests/components/sections/latest-articles.test.tsx`
Expected : FAIL — modules introuvables.

- [ ] **Step 2 : `components/sections/hero.tsx`**

```tsx
import { LogoWordmark } from '@/components/ui/logo-wordmark';
import { NewsletterForm } from '@/components/ui/newsletter-form';
import type { HeroContent } from '@/content/types';

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section aria-labelledby="hero-title" className="px-5 pb-16 pt-20 text-center md:pt-28">
      <h1
        id="hero-title"
        className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-white md:text-[72px]"
      >
        {hero.titleStart} <br className="hidden md:inline" />
        <span className="text-brand-gradient">{hero.titleAccent}</span> {hero.titleEnd}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-7 text-white/80">{hero.subtitle}</p>
      <div className="mt-8 flex justify-center">
        <NewsletterForm variant="hero" placeholder={hero.emailPlaceholder} buttonLabel={hero.subscribeLabel} />
      </div>
      <p className="mt-12 text-sm text-white/80">
        {hero.trustedByPrefix} <strong className="font-bold text-white">{hero.trustedByCount}</strong> {hero.trustedBySuffix}
      </p>
      <ul aria-label="Trusted by" className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {hero.trustedBy.map((name) => (
          <li key={name}>
            <LogoWordmark name={name} />
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 3 : `components/cards/article-card.tsx`**

```tsx
import Link from 'next/link';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import type { Article, ArticleTag } from '@/content/types';
import { cn } from '@/lib/cn';

export const TAG_LABELS: Record<ArticleTag, string> = { ai: 'AI', tech: 'Tech', robotics: 'Robotics' };

type ArticleCardProps = { article: Article; variant: 'featured' | 'compact' };

export function ArticleCard({ article, variant }: ArticleCardProps) {
  const featured = variant === 'featured';
  return (
    <article className={cn('group', featured ? 'article-card-featured' : 'article-card-compact')}>
      <Link
        href={`/articles/${article.slug}`}
        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <div className={cn('relative overflow-hidden rounded-lg', featured ? 'aspect-video' : 'aspect-video lg:aspect-[16/10]')}>
          <PlaceholderImage image={article.image} label={article.title} priority={featured} />
          <span className="absolute left-4 top-4 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-ink shadow-sm">
            {TAG_LABELS[article.tag]}
          </span>
        </div>
        <h3
          className={cn(
            'mt-4 font-bold text-ink group-hover:underline',
            featured ? 'text-xl leading-tight lg:text-[30px] lg:leading-[1.25]' : 'text-lg leading-6',
          )}
        >
          {article.title}
        </h3>
        {featured && article.subtitle ? <p className="mt-2 text-base text-neutral-500">{article.subtitle}</p> : null}
        <p className="mt-2 text-xs text-muted">
          {article.author} • {article.readingMinutes} minutes
        </p>
      </Link>
    </article>
  );
}
```

- [ ] **Step 4 : `components/sections/latest-articles.tsx`**

```tsx
'use client';

import { ArticleCard } from '@/components/cards/article-card';
import { ButtonLink } from '@/components/ui/button';
import { FilterableGrid } from '@/components/ui/filterable-grid';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Article, Category, SectionCopy } from '@/content/types';
import { pickFeatured } from '@/lib/articles';

export const ARTICLE_TABS: Category[] = [
  { slug: 'ai', label: 'AI', icon: 'all' },
  { slug: 'tech', label: 'Tech', icon: 'all' },
  { slug: 'robotics', label: 'Robotics', icon: 'all' },
];

type LatestArticlesProps = { copy: SectionCopy; articles: Article[] };

export function LatestArticles({ copy, articles }: LatestArticlesProps) {
  return (
    <section aria-labelledby="latest-articles-title" className="px-5 py-16 md:py-20">
      <SectionHeading id="latest-articles-title" title={copy.title} subtitle={copy.subtitle} />
      <FilterableGrid
        items={articles}
        categories={ARTICLE_TABS}
        getCategories={(article) => [article.tag]}
        variant="tabs"
        filterLabel="Filter articles"
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

Run : `pnpm test tests/components && pnpm typecheck && pnpm lint`
Expected : PASS.

- [ ] **Step 5 : commit**

```bash
git add components/sections/hero.tsx components/cards/article-card.tsx components/sections/latest-articles.tsx tests/components/sections tests/components/cards
git commit -m "feat: hero, carte d'article et section Latest Articles filtrable

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 10 : Cartes guide et outil, sections Guides et Trending Tools

**Files:**
- Create: `components/cards/card-frame.tsx`, `components/cards/guide-card.tsx`, `components/cards/tool-card.tsx`, `components/sections/guides.tsx`, `components/sections/trending-tools.tsx`
- Test: `tests/components/cards/guide-card.test.tsx`, `tests/components/cards/tool-card.test.tsx`, `tests/components/sections/guides.test.tsx`, `tests/components/sections/trending-tools.test.tsx`

**Interfaces:**
- Consumes: `Guide`, `Tool`, `Category`, `SectionCopy` ; `PlaceholderImage`, `Icon`, `SectionHeading`, `FilterableGrid`, `ButtonLink`, `cn`.
- Produces: `CardFrame({ href: string; children: ReactNode; className?: string })` ; `GuideCard({ guide: Guide })` ; `ToolCard({ tool: Tool })` ; `Guides({ copy: SectionCopy; guides: Guide[]; categories: Category[] })` et `TrendingTools({ copy: SectionCopy; tools: Tool[]; categories: Category[] })` (Client Components).

- [ ] **Step 1 : tests qui échouent**

`tests/components/cards/guide-card.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GuideCard } from '@/components/cards/guide-card';
import { guides } from '@/content/guides';

const guide = guides[0]!;

describe('GuideCard', () => {
  it('links to the guide and shows its title and image', () => {
    render(<GuideCard guide={guide} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/guides/${guide.slug}`);
    expect(screen.getByRole('heading', { level: 3, name: guide.title })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: guide.image.alt })).toBeInTheDocument();
  });
});
```

`tests/components/cards/tool-card.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToolCard } from '@/components/cards/tool-card';
import { tools } from '@/content/tools';

const tool = tools[5]!; // Openclaw 2.0, badge 'agents'

describe('ToolCard', () => {
  it('links to the tool, shows name, description and the badge icon', () => {
    const { container } = render(<ToolCard tool={tool} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/tools/${tool.slug}`);
    expect(screen.getByRole('heading', { level: 3, name: tool.name })).toBeInTheDocument();
    expect(screen.getByText(tool.description)).toBeInTheDocument();
    expect(container.querySelector('svg[data-icon="agents"]')).not.toBeNull();
  });
});
```

`tests/components/sections/guides.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Guides } from '@/components/sections/guides';
import { guideCategories } from '@/content/categories';
import { guides } from '@/content/guides';
import { site } from '@/content/site';

describe('Guides', () => {
  it('renders the heading, 8 guides, 18 chips and the view-all link', () => {
    render(<Guides copy={site.sections.guides} guides={guides} categories={guideCategories} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Guides' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
    expect(screen.getAllByRole('button')).toHaveLength(18);
    expect(screen.getByRole('link', { name: /view all guides/i })).toHaveAttribute('href', '/guides');
  });

  it('filters guides by category', async () => {
    const user = userEvent.setup();
    render(<Guides copy={site.sections.guides} guides={guides} categories={guideCategories} />);
    await user.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Open Design');
  });
});
```

`tests/components/sections/trending-tools.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TrendingTools } from '@/components/sections/trending-tools';
import { toolCategories } from '@/content/categories';
import { site } from '@/content/site';
import { tools } from '@/content/tools';

describe('TrendingTools', () => {
  it('renders the heading, 12 tools, 21 chips and the view-all link', () => {
    render(<TrendingTools copy={site.sections.tools} tools={tools} categories={toolCategories} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Trending Tools' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(12);
    expect(screen.getAllByRole('button')).toHaveLength(21);
    expect(screen.getByRole('link', { name: /view all tools/i })).toHaveAttribute('href', '/tools');
  });

  it('filters tools by category', async () => {
    const user = userEvent.setup();
    render(<TrendingTools copy={site.sections.tools} tools={tools} categories={toolCategories} />);
    await user.click(screen.getByRole('button', { name: 'Agents' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });
});
```

Run : `pnpm test tests/components/cards tests/components/sections/guides.test.tsx tests/components/sections/trending-tools.test.tsx`
Expected : FAIL — modules introuvables.

- [ ] **Step 2 : `components/cards/card-frame.tsx`, `guide-card.tsx`, `tool-card.tsx`**

`components/cards/card-frame.tsx` :
```tsx
import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardFrameProps = { href: string; children: ReactNode; className?: string };

/** Cadre commun des cartes Guides et Tools : bordure line, rayon 12, padding 10. */
export function CardFrame({ href, children, className }: CardFrameProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group block h-full rounded-xl border border-line bg-white p-2.5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        className,
      )}
    >
      {children}
    </Link>
  );
}
```

`components/cards/guide-card.tsx` :
```tsx
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import type { Guide } from '@/content/types';
import { CardFrame } from './card-frame';

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <CardFrame href={`/guides/${guide.slug}`}>
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <PlaceholderImage image={guide.image} label={guide.title} sizes="(min-width: 1024px) 260px, (min-width: 768px) 50vw, 100vw" />
      </div>
      <h3 className="mt-3 px-1 pb-1 text-base font-bold leading-6 text-ink group-hover:underline">{guide.title}</h3>
    </CardFrame>
  );
}
```

`components/cards/tool-card.tsx` :
```tsx
import { Icon } from '@/components/ui/icon';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import type { Tool } from '@/content/types';
import { CardFrame } from './card-frame';

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <CardFrame href={`/tools/${tool.slug}`}>
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <PlaceholderImage image={tool.image} label={tool.name} sizes="(min-width: 1024px) 260px, (min-width: 768px) 50vw, 100vw" />
        <span className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-ink shadow-sm">
          <Icon name={tool.badgeIcon} size={16} />
        </span>
      </div>
      <div className="px-1 pb-1">
        <h3 className="mt-3 text-base font-bold leading-6 text-ink group-hover:underline">{tool.name}</h3>
        <p className="mt-1 line-clamp-3 text-sm leading-5 text-muted">{tool.description}</p>
      </div>
    </CardFrame>
  );
}
```

- [ ] **Step 3 : `components/sections/guides.tsx` et `components/sections/trending-tools.tsx`**

`components/sections/guides.tsx` :
```tsx
'use client';

import { GuideCard } from '@/components/cards/guide-card';
import { ButtonLink } from '@/components/ui/button';
import { FilterableGrid } from '@/components/ui/filterable-grid';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Category, Guide, SectionCopy } from '@/content/types';

type GuidesProps = { copy: SectionCopy; guides: Guide[]; categories: Category[] };

export function Guides({ copy, guides, categories }: GuidesProps) {
  return (
    <section aria-labelledby="guides-title" className="px-5 py-16 md:py-20">
      <SectionHeading id="guides-title" title={copy.title} subtitle={copy.subtitle} className="max-w-[680px]" />
      <FilterableGrid
        items={guides}
        categories={categories}
        getCategories={(guide) => guide.categories}
        variant="chips"
        filterLabel="Filter guides by role"
        renderItems={(visible) => (
          <ul className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4 [&>li:nth-child(n+4)]:hidden md:[&>li:nth-child(n+4)]:block">
            {visible.map((guide) => (
              <li key={guide.slug}>
                <GuideCard guide={guide} />
              </li>
            ))}
          </ul>
        )}
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

`components/sections/trending-tools.tsx` :
```tsx
'use client';

import { ToolCard } from '@/components/cards/tool-card';
import { ButtonLink } from '@/components/ui/button';
import { FilterableGrid } from '@/components/ui/filterable-grid';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Category, SectionCopy, Tool } from '@/content/types';

type TrendingToolsProps = { copy: SectionCopy; tools: Tool[]; categories: Category[] };

export function TrendingTools({ copy, tools, categories }: TrendingToolsProps) {
  return (
    <section aria-labelledby="trending-tools-title" className="px-5 py-16 md:py-20">
      <SectionHeading id="trending-tools-title" title={copy.title} subtitle={copy.subtitle} />
      <FilterableGrid
        items={tools}
        categories={categories}
        getCategories={(tool) => tool.categories}
        variant="chips"
        filterLabel="Filter tools by category"
        renderItems={(visible) => (
          <ul className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4 [&>li:nth-child(n+4)]:hidden md:[&>li:nth-child(n+4)]:block">
            {visible.map((tool) => (
              <li key={tool.slug}>
                <ToolCard tool={tool} />
              </li>
            ))}
          </ul>
        )}
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

Les classes `[&>li:nth-child(n+4)]:hidden md:[&>li:nth-child(n+4)]:block` reproduisent le comportement mobile du site : trois cartes visibles sous 768 px, toutes au-dessus.

Run : `pnpm test tests/components && pnpm typecheck && pnpm lint`
Expected : PASS.

- [ ] **Step 4 : commit**

```bash
git add components/cards components/sections/guides.tsx components/sections/trending-tools.tsx tests/components
git commit -m "feat: cartes guide et outil, sections Guides et Trending Tools filtrables

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 11 : Sections Podcast (Rowan's Notes) et University CTA

**Files:**
- Create: `components/sections/podcast.tsx`, `components/sections/university-cta.tsx`
- Test: `tests/components/sections/podcast.test.tsx`, `tests/components/sections/university-cta.test.tsx`

**Interfaces:**
- Consumes: `PodcastContent`, `UniversityContent` ; `SectionHeading`, `ButtonLink`, `Icon`, `PlaceholderImage`, `cn`.
- Produces: `Podcast({ podcast: PodcastContent })`, `UniversityCta({ university: UniversityContent })` (Server Components).

- [ ] **Step 1 : tests qui échouent**

`tests/components/sections/podcast.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Podcast } from '@/components/sections/podcast';
import { podcast } from '@/content/podcast';

describe('Podcast', () => {
  it('renders heading, listen links, and the static episode card', () => {
    render(<Podcast podcast={podcast} />);
    expect(screen.getByRole('heading', { level: 2, name: "Rowan's Notes" })).toBeInTheDocument();
    for (const link of podcast.listenLinks) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }
    expect(screen.getByRole('heading', { level: 3, name: podcast.card.title })).toBeInTheDocument();
    expect(screen.getByText(podcast.card.meta)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: podcast.card.ctaLabel })).toHaveAttribute('href', podcast.card.ctaHref);
    expect(screen.getByRole('img', { name: podcast.card.artworkAlt })).toBeInTheDocument();
  });
});
```

`tests/components/sections/university-cta.test.tsx` :
```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UniversityCta } from '@/components/sections/university-cta';
import { university } from '@/content/university';

describe('UniversityCta', () => {
  it('renders the brand line, heading, both CTAs and the four feature cards', () => {
    render(<UniversityCta university={university} />);
    expect(screen.getByText('University').className).toContain('text-brand-gradient');
    expect(screen.getByRole('heading', { level: 2, name: university.title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: university.primaryCta.label })).toHaveAttribute('href', university.primaryCta.href);
    expect(screen.getByRole('link', { name: university.secondaryCta.label })).toHaveAttribute('href', university.secondaryCta.href);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    for (const feature of university.features) {
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    }
  });
});
```

Run : `pnpm test tests/components/sections/podcast.test.tsx tests/components/sections/university-cta.test.tsx`
Expected : FAIL — modules introuvables.

- [ ] **Step 2 : `components/sections/podcast.tsx`**

```tsx
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { SectionHeading } from '@/components/ui/section-heading';
import type { PodcastContent } from '@/content/types';

export function Podcast({ podcast }: { podcast: PodcastContent }) {
  const { card } = podcast;
  return (
    <section aria-labelledby="podcast-title" className="px-5 py-20">
      <SectionHeading id="podcast-title" title={podcast.title} subtitle={podcast.description} subtitleClassName="text-xl leading-8" />
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {podcast.listenLinks.map((link) => (
          <ButtonLink key={link.href} href={link.href} variant="outline" size="sm" target="_blank" rel="noreferrer">
            <Icon name={link.icon} size={16} />
            {link.label}
          </ButtonLink>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-[750px] rounded-2xl bg-podcast-card p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md md:h-[382px] md:w-[382px]">
            <PlaceholderImage image={{ alt: card.artworkAlt }} label={card.title} sizes="(min-width: 768px) 382px, 96px" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col md:h-[382px]">
            <p className="flex items-center gap-1 text-xs text-neutral-600">
              <Icon name="podcast" size={12} />
              {card.platformLabel}
            </p>
            <h3 className="mt-2 text-lg font-bold text-ink md:mt-16">{card.title}</h3>
            <p className="text-xs text-muted">{card.meta}</p>
            <p className="mt-3 hidden text-[15px] leading-5 text-neutral-800 md:block">{card.description}</p>
            <div className="mt-4 flex items-center gap-2 md:mt-auto">
              <ButtonLink href={card.ctaHref} variant="ink" className="h-9 rounded-full px-4 text-sm" target="_blank" rel="noreferrer">
                <Icon name="play" size={14} />
                {card.ctaLabel}
              </ButtonLink>
              <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink">
                <Icon name="more" size={16} />
              </span>
            </div>
            <p className="mt-2 text-[10px] text-muted">{card.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3 : `components/sections/university-cta.tsx`**

```tsx
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { UniversityContent } from '@/content/types';
import { cn } from '@/lib/cn';

export function UniversityCta({ university }: { university: UniversityContent }) {
  return (
    <section aria-labelledby="university-title" className="bg-university-gradient px-5 py-24 text-center">
      <p className="inline-flex items-center gap-2 text-xl font-semibold text-white">
        <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded bg-white/10 text-[10px] font-black">
          RR
        </span>
        <span>{university.brandName}</span> <span className="text-brand-gradient">{university.brandAccent}</span>
      </p>
      <h2
        id="university-title"
        className="mx-auto mt-6 max-w-3xl text-[32px] font-bold leading-none tracking-[-0.025em] text-white md:text-5xl"
      >
        {university.title}
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-white/80">{university.subtitle}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href={university.primaryCta.href} variant="gradient" size="lg">
          {university.primaryCta.label}
        </ButtonLink>
        <ButtonLink href={university.secondaryCta.href} variant="outline-light" size="lg" className="h-[50px]">
          {university.secondaryCta.label}
        </ButtonLink>
      </div>
      <ul className="mx-auto mt-14 grid max-w-[900px] gap-5 md:grid-cols-2">
        {university.features.map((feature, index) => (
          <li
            key={feature.title}
            className={cn(
              'relative rounded-2xl border border-ink-border bg-ink-soft p-8 before:absolute before:inset-y-6 before:w-px before:bg-brand-gradient',
              index % 2 === 0 ? 'before:left-0' : 'before:right-0',
            )}
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-icon-box text-brand">
              <Icon name={feature.icon} size={24} />
            </span>
            <h3 className="mt-5 text-xl font-bold text-white">{feature.title}</h3>
            <p className="mt-3 text-base leading-6 text-white/70">{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

Run : `pnpm test tests/components && pnpm typecheck && pnpm lint`
Expected : PASS.

- [ ] **Step 4 : commit**

```bash
git add components/sections/podcast.tsx components/sections/university-cta.tsx tests/components/sections
git commit -m "feat: sections podcast Rowan's Notes et CTA Rundown University

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 12 : Assemblage de la page d'accueil, pages « coming soon » et build

**Files:**
- Modify: `app/page.tsx`
- Create: `app/[...slug]/page.tsx`, `app/not-found.tsx`
- Test: `tests/app/page.test.tsx`

**Interfaces:**
- Consumes: tout `content/`, toutes les sections, `SiteHeader`, `SiteFooter`, `humanize`, `ButtonLink`, `Icon`.
- Produces: `HomePage()` (Server Component synchrone), `ComingSoonPage({ params })` (async), `NotFound()`.

- [ ] **Step 1 : test de la page qui échoue**

`tests/app/page.test.tsx` :
```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('assembles the header, the eight sections and the footer from content', () => {
    render(<HomePage />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Learn AI in 5 minutes a day.');
    const h2 = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(h2).toEqual(['Latest Articles', 'Guides', 'Trending Tools', "Rowan's Notes", 'AI training for the future of work.']);
    expect(screen.getAllByRole('article')).toHaveLength(5);
    const main = screen.getByRole('main');
    expect(within(main).getAllByRole('link', { name: /view all/i })).toHaveLength(3);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /subscribe/i })).toHaveLength(2);
  });
});
```

Run : `pnpm test tests/app/page.test.tsx`
Expected : FAIL — la page « Hello » n'a ni h1 attendu ni sections.

- [ ] **Step 2 : `app/page.tsx`**

```tsx
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Guides } from '@/components/sections/guides';
import { Hero } from '@/components/sections/hero';
import { LatestArticles } from '@/components/sections/latest-articles';
import { Podcast } from '@/components/sections/podcast';
import { TrendingTools } from '@/components/sections/trending-tools';
import { UniversityCta } from '@/components/sections/university-cta';
import { articles } from '@/content/articles';
import { guideCategories, toolCategories } from '@/content/categories';
import { guides } from '@/content/guides';
import { podcast } from '@/content/podcast';
import { site } from '@/content/site';
import { tools } from '@/content/tools';
import { university } from '@/content/university';

export default function HomePage() {
  return (
    <>
      <SiteHeader name={site.name} nav={site.nav} cta={site.headerCta} />
      <main className="flex-1 bg-ink">
        <Hero hero={site.hero} />
        <div className="px-2 md:px-5">
          <div className="mx-auto rounded-sheet bg-paper">
            <LatestArticles copy={site.sections.articles} articles={articles} />
            <Guides copy={site.sections.guides} guides={guides} categories={guideCategories} />
            <TrendingTools copy={site.sections.tools} tools={tools} categories={toolCategories} />
            <Podcast podcast={podcast} />
          </div>
        </div>
        <UniversityCta university={university} />
      </main>
      <SiteFooter site={site} />
    </>
  );
}
```

Run : `pnpm test tests/app/page.test.tsx`
Expected : PASS.

- [ ] **Step 3 : `app/[...slug]/page.tsx` et `app/not-found.tsx`**

`app/[...slug]/page.tsx` :
```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { site } from '@/content/site';
import { humanize } from '@/lib/slug';

type ComingSoonPageProps = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return site.comingSoonSlugs.map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: ComingSoonPageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${humanize(slug[0] ?? '')} — Coming soon` };
}

export default async function ComingSoonPage({ params }: ComingSoonPageProps) {
  const { slug } = await params;
  const section = slug[0];
  if (!section || !site.comingSoonSlugs.includes(section)) notFound();

  return (
    <>
      <SiteHeader name={site.name} nav={site.nav} cta={site.headerCta} />
      <main className="flex flex-1 flex-col items-center justify-center bg-ink px-5 py-32 text-center text-white">
        <p className="text-sm uppercase tracking-wide text-white/60">{slug.join(' / ')}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.025em] md:text-6xl">{humanize(section)}</h1>
        <p className="mt-4 text-lg text-white/80">This page is coming soon.</p>
        <ButtonLink href="/" variant="white" size="sm" className="mt-8">
          <Icon name="arrow-right" size={16} className="rotate-180" />
          Back to home
        </ButtonLink>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
```

`app/not-found.tsx` :
```tsx
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { site } from '@/content/site';

export default function NotFound() {
  return (
    <>
      <SiteHeader name={site.name} nav={site.nav} cta={site.headerCta} />
      <main className="flex flex-1 flex-col items-center justify-center bg-ink px-5 py-32 text-center text-white">
        <h1 className="text-4xl font-bold tracking-[-0.025em] md:text-6xl">Page not found</h1>
        <ButtonLink href="/" variant="white" size="sm" className="mt-8">
          Back to home
        </ButtonLink>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
```

- [ ] **Step 4 : build, routes, commit**

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```
Expected : build OK ; la sortie liste `/`, `/_not-found`, `/api/newsletter` et `/[...slug]` avec les 9 chemins pré-rendus (`/ai-university`, `/articles`, `/guides`, `/tools`, `/courses`, `/careers`, `/advertise`, `/privacy-policy`, `/terms-privacy`). Aucun avertissement de dépréciation Next.

```bash
(pnpm start -p 3000 > /tmp/cohezi-start.log 2>&1 &) && sleep 3
for p in / /articles /articles/anything /guides/x /tools/y /nope; do printf "%-20s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)"; done
pkill -f "next start" || true
```
Expected : `/` 200, `/articles` 200, `/articles/anything` 200, `/guides/x` 200, `/tools/y` 200, `/nope` 404.

```bash
git add app/ tests/app/page.test.tsx
git commit -m "feat: page d'accueil assemblée, pages coming soon et not-found

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 13 : QA visuelle contre les captures de référence, corrections, livraison

**Files:**
- Modify: tout fichier de `components/` ou `app/` dont le rendu s'écarte de la référence ; `docs/superpowers/specs/2026-09-03-therundown-homepage-replica-design.md` (statut).

**Interfaces:** aucune nouvelle.

- [ ] **Step 1 : lancer le build de production et le navigateur gstack**

```bash
pnpm build && (pnpm start -p 3000 > /tmp/cohezi-start.log 2>&1 &) && sleep 3
B="$HOME/.claude/skills/gstack/browse/dist/browse"
$B viewport 1440x900 && $B goto http://localhost:3000
$B console --errors          # attendu : aucune erreur
$B network | grep -E " (4|5)[0-9]{2} " || echo "no failed requests"
```

- [ ] **Step 2 : captures par section à 1440 px et comparaison**

Pour chaque section, positionner puis capturer le viewport, et lire côte à côte la référence dans `screenshots/therundown-ai/sections/desktop/` :

```bash
mkdir -p /tmp/cohezi-qa
$B js "window.scrollTo(0,0)" && $B screenshot --viewport /tmp/cohezi-qa/01-hero.png
for s in latest-articles guides trending-tools podcast university; do
  $B js "window.scrollTo(0, document.getElementById('${s}-title').getBoundingClientRect().top + window.scrollY - 120)"
  $B screenshot --viewport /tmp/cohezi-qa/${s}.png
done
$B js "window.scrollTo(0, document.body.scrollHeight)" && $B screenshot --viewport /tmp/cohezi-qa/footer.png
```

Lire chaque PNG produit et la capture de référence correspondante (`01-hero-1440.png`, `02-latest-articles-1440.png`, `03-guides-1440.png`, `04-trending-tools-1440.png`, `05-rowans-notes-1440.png`, `06-university-cta-1440.png`, `07-footer-1440.png`). Points de contrôle, dans cet ordre :

1. Header : hauteur 68 px (`$B css header height`), logo à gauche, 7 liens centrés, CTA blanc à droite.
2. Hero : titre sur deux lignes, « 5 minutes » en dégradé, formulaire 512 px blanc, 7 wordmarks sur une ligne.
3. Feuille blanche : coins arrondis 28.8 px visibles sur fond ink (`$B css ".rounded-sheet" border-radius` → `28.8px`).
4. Latest Articles : onglets centrés, une à gauche (image 16:9, titre 30 px), 2×2 à droite, bouton « View all articles ».
5. Guides : 18 puces sur 4 lignes, 4 colonnes × 2 lignes de cartes bordées, titres sur 2–3 lignes.
6. Trending Tools : 21 puces, 4 colonnes × 3 lignes, badge icône en haut à gauche de chaque visuel.
7. Podcast : deux boutons outline, carte grise 750 px avec pochette carrée 382 px.
8. University : fond dégradé noir → #292929, bouton dégradé + bouton outline, 2×2 cartes #212121 avec liseré.
9. Footer : 4 colonnes, formulaire compact, filet, copyright et 3 icônes rondes.

Pour chaque écart de plus de ~8 px ou de structure (colonne manquante, retour à la ligne inattendu), corriger la classe Tailwind concernée dans le composant, relancer `pnpm build` + `pnpm start` et recapturer. Ne pas toucher aux données.

- [ ] **Step 3 : mobile 375 px**

```bash
$B viewport 375x812 && $B goto http://localhost:3000
$B js "window.scrollTo(0,0)" && $B screenshot --viewport /tmp/cohezi-qa/m-hero.png
$B js "document.querySelector('button[aria-label=\"Open menu\"]').click()" && $B screenshot --viewport /tmp/cohezi-qa/m-menu.png
$B press Escape
for s in latest-articles guides trending-tools podcast university; do
  $B js "window.scrollTo(0, document.getElementById('${s}-title').getBoundingClientRect().top + window.scrollY - 80)"
  $B screenshot --viewport /tmp/cohezi-qa/m-${s}.png
done
$B js "document.querySelectorAll('#guides-title ~ div li').length + ' guide items in DOM'"
```

Comparer avec `screenshots/therundown-ai/sections/mobile/`. Points de contrôle : hamburger blanc à droite ; h1 36 px sur trois lignes ; wordmarks sur deux lignes ; articles en une colonne ; **3 cartes** visibles dans Guides et Tools (les autres masquées par CSS) ; carte podcast compacte (pochette 96 px) ; cartes University empilées ; footer empilé ; aucun débordement horizontal (`$B js "document.documentElement.scrollWidth <= window.innerWidth"` → `true`).

- [ ] **Step 4 : parcours fonctionnels dans le navigateur**

```bash
$B viewport 1440x900 && $B goto http://localhost:3000
$B snapshot -i | grep -iE "tech|design|agents|subscribe" | head
$B click "button[aria-pressed][type=button]:nth-of-type(3)"   # onglet « Tech » : une seule carte
$B js "document.querySelectorAll('article').length"           # attendu : 1
$B fill "input[name=email]" "jane@example.com" && $B click "button[type=submit]"
$B wait "[role=status]" && $B text | grep -c "Check your inbox to confirm."   # attendu : 1
$B goto http://localhost:3000/guides && $B text | grep -c "This page is coming soon."     # attendu : 1
pkill -f "next start" || true
```

- [ ] **Step 5 : vérification finale et livraison**

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
git status --short     # uniquement les fichiers corrigés en Step 2/3, sinon rien
git add -A components app
git commit -m "fix: ajustements visuels d'après la comparaison avec therundown.ai

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```
(Sauter le commit s'il n'y a eu aucune correction.)

Mettre à jour le statut de la spec (ligne « Statut » → `implémenté le <date>, écarts connus : <liste ou aucun>`), puis :
```bash
git add docs/superpowers/specs/2026-09-03-therundown-homepage-replica-design.md
git commit -m "docs: spec marquée implémentée

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Rapport de fin attendu : liste des écarts restants avec la référence (police de repli le cas échéant, placeholders), nombre de tests, sortie de `pnpm build`.
