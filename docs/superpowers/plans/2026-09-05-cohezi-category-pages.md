# Pages de catégorie Cohezi — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer les quatre pages de rubrique `/actualite`, `/business`, `/societe` et `/analyses`, chacune avec son bandeau, son article mis en avant, sa grille et ses onglets de navigation.

**Architecture:** Le contenu gagne d'abord un chapô et un eyebrow par catégorie (Task 1), puis les deux primitives visuelles sont écrites isolément (Task 2 : onglets et bandeau), puis le composant de page les assemble (Task 3), puis les quatre routes statiques le montent et la route attrape-tout cède les slugs de catégorie (Task 4), enfin la QA visuelle valide le rendu (Task 5). Tout est vert à la fin de chaque tâche : aucune étape ne laisse le dépôt cassé.

**Tech Stack:** Next 16.3 (App Router, routes statiques) · React 19.2 · TypeScript strict · Tailwind CSS 4.3 · Vitest 5 + Testing Library · pnpm.

**Spec:** `docs/superpowers/specs/2026-09-05-cohezi-category-pages-design.md`

## Global Constraints

- Gestionnaire de paquets : **pnpm**. Aucune dépendance ajoutée.
- Branche de travail : `feat/cohezi-category-pages`, créée depuis `main`.
- Palette exclusive : `ink #111111`, `ink-soft #1a1a1a`, `paper #f7f7f4`, `accent #7cff6b`, `accent-deep #123c2a`, `muted #8a8a8a`, `line #e2e2de`, `line-dark #2a2a2a`. **Aucun `bg-white`, `text-white`, `neutral-*` ni dégradé.**
- Vert (`accent`) réservé aux accents : carré des eyebrows, repère des badges, anneau de focus. Jamais de fond vert.
- `font-display` (Space Grotesk) pour le `h1` du bandeau ; `font-sans` (Inter) partout ailleurs.
- Tout texte éditorial vient de `content/*.ts`. Chaînes techniques françaises autorisées dans les composants, et seulement celles-ci : « Catégories », « article », « articles », « Aucun article pour le moment. ».
- Apostrophes typographiques `’` dans tout le contenu et les tests, jamais `'` dans une phrase française.
- Tests dans `tests/`, imports explicites depuis `vitest`. `pnpm test`, `pnpm typecheck` et `pnpm lint` verts à la fin de **chaque** tâche ; `pnpm build` vert à la fin des Tasks 4 et 5.
- Commits : un par tâche, message conventionnel en français, suffixe `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. Cocher les cases du plan et l'inclure dans le commit.
- Serveur local : ne jamais tuer un processus non lancé par la tâche. Vérifier `curl -s -o /dev/null http://localhost:3000` avant d'en démarrer un.

---

## Carte des fichiers

| Fichier | Action | Responsabilité | Tâche |
|---|---|---|---|
| `content/types.ts` | modifier | `Category` gagne `eyebrow` et `description` | 1 |
| `content/categories.ts` | modifier | chapôs et eyebrows des quatre rubriques | 1 |
| `components/ui/category-tabs.tsx` | créer | navigation entre rubriques (liens) | 2 |
| `components/sections/category-hero.tsx` | créer | bandeau sombre d'une rubrique | 2 |
| `components/sections/category-page.tsx` | créer | assemblage d'une page de rubrique | 3 |
| `app/actualite/page.tsx`, `app/business/page.tsx`, `app/societe/page.tsx`, `app/analyses/page.tsx` | créer | routes statiques et métadonnées | 4 |
| `lib/routes.ts` | créer | `isKnownSection`, premiers segments servis | 4 |
| `content/site.ts` | modifier | `comingSoon` perd les quatre catégories | 4 |
| `app/[...slug]/page.tsx` | modifier | accepte les catégories comme premier segment | 4 |
| — | — | QA visuelle, statut de la spec | 5 |

---

### Task 1 : Chapô et eyebrow par catégorie

**Files:**
- Modify: `content/types.ts`, `content/categories.ts`
- Test: `tests/content/content.test.ts`

**Interfaces:**
- Produces : `Category { slug: CategorySlug; label: string; href: string; eyebrow: string; description: string }` ; les quatre entrées de `categories` renseignées.

- [x] **Step 1 : test qui échoue**

Ajouter ce `describe` à la fin de `tests/content/content.test.ts` (le fichier importe déjà `categories` et `categoryBySlug`) :

```ts
describe('category metadata', () => {
  it('gives every category an eyebrow and a description', () => {
    for (const category of categories) {
      expect(category.eyebrow, category.slug).toMatch(/^Cohezi \/ /);
      expect(category.description.length, category.slug).toBeGreaterThan(40);
      expect(category.description.endsWith('.'), category.slug).toBe(true);
    }
  });

  it('reuses the home page wording for Business and Société', () => {
    expect(categoryBySlug.business.description).toBe(site.sections.business.subtitle);
    expect(categoryBySlug.societe.description).toBe(site.sections.societe.subtitle);
  });
});
```

Run : `pnpm test tests/content/content.test.ts`
Expected : FAIL — `eyebrow` et `description` n'existent pas sur `Category`.

- [x] **Step 2 : `content/types.ts`**

Remplacer la ligne du type `Category` par :

```ts
export type Category = {
  slug: CategorySlug;
  label: string;
  href: string;
  /** Intitulé de l'eyebrow du bandeau, ex. « Cohezi / Business ». */
  eyebrow: string;
  /** Chapô de la rubrique, affiché sous le titre du bandeau. */
  description: string;
};
```

- [x] **Step 3 : `content/categories.ts` (contenu complet)**

```ts
import type { Category, CategorySlug } from './types';

export const categories: Category[] = [
  {
    slug: 'actualite',
    label: 'Actualité',
    href: '/actualite',
    eyebrow: 'Cohezi / Actualité',
    description: 'Ce qui vient de se passer dans l’IA, et pourquoi cela compte.',
  },
  {
    slug: 'business',
    label: 'Business',
    href: '/business',
    eyebrow: 'Cohezi / Business',
    description: 'Entreprises, financements, marchés et infrastructures de l’IA.',
  },
  {
    slug: 'societe',
    label: 'Société',
    href: '/societe',
    eyebrow: 'Cohezi / Société',
    description: 'Emploi, éducation, santé, culture : ce que l’IA change au quotidien.',
  },
  {
    slug: 'analyse',
    label: 'Analyse',
    href: '/analyses',
    eyebrow: 'Cohezi / Analyses',
    description: 'Décryptages et grilles de lecture pour comprendre les mouvements de fond.',
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category])) as Record<
  CategorySlug,
  Category
>;
```

- [x] **Step 4 : vérifier et commiter**

Run : `pnpm test && pnpm typecheck && pnpm lint`
Expected : PASS.

```bash
cd /home/darellchooks/Documents/cohezi
git checkout -b feat/cohezi-category-pages   # si la branche n'existe pas encore
git add -A content tests docs/superpowers/plans/
git commit -m "feat(cohezi): chapô et eyebrow par catégorie

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2 : Onglets de navigation et bandeau de rubrique

**Files:**
- Create: `components/ui/category-tabs.tsx`, `components/sections/category-hero.tsx`
- Test: `tests/components/ui/category-tabs.test.tsx`, `tests/components/sections/category-hero.test.tsx`

**Interfaces:**
- Consumes : `categories`, `categoryBySlug`, `Category`, `CategorySlug`, `cn`.
- Produces : `CategoryTabs({ activeSlug: CategorySlug })`, `CategoryHero({ category: Category; articleCount: number })`.

- [x] **Step 1 : tests qui échouent**

`tests/components/ui/category-tabs.test.tsx` :

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryTabs } from '@/components/ui/category-tabs';
import { categories } from '@/content/categories';

describe('CategoryTabs', () => {
  it('renders one link per category, pointing at its page', () => {
    render(<CategoryTabs activeSlug="business" />);
    const nav = screen.getByRole('navigation', { name: 'Catégories' });
    expect(within(nav).getAllByRole('link')).toHaveLength(4);
    for (const category of categories) {
      expect(within(nav).getByRole('link', { name: category.label })).toHaveAttribute('href', category.href);
    }
  });

  it('marks only the active category with aria-current and the dark style', () => {
    render(<CategoryTabs activeSlug="societe" />);
    const active = screen.getByRole('link', { name: 'Société' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active.className).toContain('bg-ink');
    const other = screen.getByRole('link', { name: 'Business' });
    expect(other).not.toHaveAttribute('aria-current');
    expect(other.className).not.toContain('bg-ink');
  });
});
```

`tests/components/sections/category-hero.test.tsx` :

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryHero } from '@/components/sections/category-hero';
import { categoryBySlug } from '@/content/categories';

describe('CategoryHero', () => {
  it('renders the eyebrow, the display heading and the description', () => {
    const category = categoryBySlug.business;
    render(<CategoryHero category={category} articleCount={8} />);
    expect(screen.getByText(category.eyebrow)).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1, name: category.label });
    expect(heading.className).toContain('font-display');
    expect(heading.className).toContain('uppercase');
    expect(screen.getByText(category.description)).toBeInTheDocument();
  });

  it('pluralises the article count', () => {
    render(<CategoryHero category={categoryBySlug.business} articleCount={8} />);
    expect(screen.getByText('8 articles')).toBeInTheDocument();
  });

  it('keeps the count singular for one article', () => {
    render(<CategoryHero category={categoryBySlug.analyse} articleCount={1} />);
    expect(screen.getByText('1 article')).toBeInTheDocument();
  });
});
```

Run : `pnpm test tests/components/ui/category-tabs.test.tsx tests/components/sections/category-hero.test.tsx`
Expected : FAIL — les deux modules n'existent pas.

- [x] **Step 2 : `components/ui/category-tabs.tsx`**

```tsx
import Link from 'next/link';
import { categories } from '@/content/categories';
import type { CategorySlug } from '@/content/types';
import { cn } from '@/lib/cn';

/**
 * Navigation entre rubriques, au style des onglets de l'accueil. Ce sont des liens
 * et non des boutons : changer de rubrique change de page.
 */
export function CategoryTabs({ activeSlug }: { activeSlug: CategorySlug }) {
  return (
    <nav
      aria-label="Catégories"
      className="inline-flex items-center gap-1 rounded-xl border border-line bg-paper p-1"
    >
      {categories.map((category) => {
        const isActive = category.slug === activeSlug;
        return (
          <Link
            key={category.slug}
            href={category.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex h-[33px] items-center rounded-lg px-4 font-sans text-[15px] leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-line/60',
            )}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
```

- [x] **Step 3 : `components/sections/category-hero.tsx`**

```tsx
import type { Category } from '@/content/types';

type CategoryHeroProps = { category: Category; articleCount: number };

/** Bandeau sombre d'une page de rubrique, sur le gabarit du hero de l'accueil. */
export function CategoryHero({ category, articleCount }: CategoryHeroProps) {
  const countLabel = `${articleCount} ${articleCount > 1 ? 'articles' : 'article'}`;

  return (
    <section aria-labelledby="category-title" className="hero-dark-change px-5 pb-16 pt-20 text-center md:pt-24">
      <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
        <span aria-hidden className="h-2 w-2 bg-accent" />
        {category.eyebrow}
      </p>
      <h1
        id="category-title"
        className="mx-auto mt-6 max-w-4xl font-display text-[32px] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-paper md:text-5xl"
      >
        {category.label}
      </h1>
      <p className="mx-auto mt-5 max-w-[560px] text-lg leading-7 text-paper/80">{category.description}</p>
      <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">{countLabel}</p>
    </section>
  );
}
```

- [x] **Step 4 : vérifier et commiter**

Run : `pnpm test && pnpm typecheck && pnpm lint`
Expected : PASS.

```bash
git add -A components tests docs/superpowers/plans/
git commit -m "feat(cohezi): onglets de navigation et bandeau de rubrique

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3 : Composant de page de rubrique

**Files:**
- Create: `components/sections/category-page.tsx`
- Test: `tests/components/sections/category-page.test.tsx`

**Interfaces:**
- Consumes : `SiteHeader`, `SiteFooter`, `HeroLightSwitch`, `CategoryHero`, `CategoryTabs`, `NewsletterCta`, `ArticleCard` (variantes `featured` et `grid`), `categoryBySlug`, `articles`, `byCategory`, `site`.
- Produces : `CategoryPage({ slug: CategorySlug })` (Server Component synchrone).

- [ ] **Step 1 : test qui échoue**

`tests/components/sections/category-page.test.tsx` :

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryPage } from '@/components/sections/category-page';
import { articles } from '@/content/articles';
import { categoryBySlug } from '@/content/categories';
import { byCategory } from '@/lib/articles';

describe('CategoryPage', () => {
  it('renders header, hero, tabs, every article of the category, newsletter and footer', () => {
    const expected = byCategory(articles, 'business', articles.length);
    render(<CategoryPage slug="business" />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Business' })).toBeInTheDocument();
    expect(screen.getByText(categoryBySlug.business.description)).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Catégories' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(expected.length);
    expect(screen.getByRole('heading', { level: 2, name: 'Moins de bruit. Plus de contexte.' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('features the most recent article and puts the rest in the grid', () => {
    const expected = byCategory(articles, 'business', articles.length);
    render(<CategoryPage slug="business" />);

    const cards = screen.getAllByRole('article');
    expect(cards[0]!.className).toContain('featured');
    expect(cards[0]!).toHaveTextContent(expected[0]!.title);
    const grid = screen.getByRole('list', { name: 'Articles' });
    expect(within(grid).getAllByRole('listitem')).toHaveLength(expected.length - 1);
  });

  it('handles a three-article category without breaking the layout', () => {
    render(<CategoryPage slug="analyse" />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByText('3 articles')).toBeInTheDocument();
  });

  it('marks the current category in the tabs', () => {
    render(<CategoryPage slug="societe" />);
    expect(screen.getByRole('link', { name: 'Société' })).toHaveAttribute('aria-current', 'page');
  });
});
```

Run : `pnpm test tests/components/sections/category-page.test.tsx`
Expected : FAIL — module `@/components/sections/category-page` introuvable.

- [ ] **Step 2 : `components/sections/category-page.tsx`**

```tsx
import { ArticleCard } from '@/components/cards/article-card';
import { HeroLightSwitch } from '@/components/layout/hero-light-switch';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { CategoryHero } from '@/components/sections/category-hero';
import { NewsletterCta } from '@/components/sections/newsletter-cta';
import { CategoryTabs } from '@/components/ui/category-tabs';
import { articles } from '@/content/articles';
import { categoryBySlug } from '@/content/categories';
import { site } from '@/content/site';
import type { CategorySlug } from '@/content/types';
import { byCategory } from '@/lib/articles';

/** Page d'une rubrique : bandeau, onglets, article mis en avant, grille, newsletter. */
export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const category = categoryBySlug[slug];
  const list = byCategory(articles, slug, articles.length);
  const [featured, ...rest] = list;

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
          <CategoryHero category={category} articleCount={list.length} />
          <div className="px-2 md:px-5">
            <div className="mx-auto rounded-sheet bg-paper px-5 py-16 md:py-20">
              <div className="flex justify-center">
                <CategoryTabs activeSlug={slug} />
              </div>
              {featured ? (
                <div className="mx-auto mt-12 max-w-6xl">
                  <ArticleCard article={featured} variant="featured" />
                </div>
              ) : (
                <p className="mt-12 text-center text-muted">Aucun article pour le moment.</p>
              )}
              {rest.length > 0 ? (
                <ul
                  aria-label="Articles"
                  className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                  {rest.map((article) => (
                    <li key={article.slug}>
                      <ArticleCard article={article} variant="grid" />
                    </li>
                  ))}
                </ul>
              ) : null}
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

Contrairement aux grilles de l'accueil, aucune carte n'est masquée sous `md` : sur une page de
rubrique, tous les articles doivent rester accessibles.

- [ ] **Step 3 : vérifier et commiter**

Run : `pnpm test && pnpm typecheck && pnpm lint`
Expected : PASS.

```bash
git add -A components tests docs/superpowers/plans/
git commit -m "feat(cohezi): composant de page de rubrique

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4 : Les quatre routes et la cession des slugs par l'attrape-tout

**Files:**
- Create: `app/actualite/page.tsx`, `app/business/page.tsx`, `app/societe/page.tsx`, `app/analyses/page.tsx`, `lib/routes.ts`
- Modify: `content/site.ts`, `app/[...slug]/page.tsx`
- Test: `tests/lib/routes.test.ts`, `tests/app/category-routes.test.tsx`, `tests/app/coming-soon.test.tsx`, `tests/content/content.test.ts`

**Interfaces:**
- Consumes : `CategoryPage`, `categories`, `categoryBySlug`, `site.comingSoon`.
- Produces : `isKnownSection(segment: string | undefined): boolean` depuis `@/lib/routes` ; quatre routes exportant `metadata` et un composant par défaut.

- [ ] **Step 1 : tests qui échouent**

`tests/lib/routes.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import { isKnownSection } from '@/lib/routes';

describe('isKnownSection', () => {
  it('accepts the category slugs served by their own pages', () => {
    for (const slug of ['actualite', 'business', 'societe', 'analyses']) {
      expect(isKnownSection(slug), slug).toBe(true);
    }
  });

  it('accepts the announced pages', () => {
    for (const slug of ['a-propos', 'contact', 'recherche']) {
      expect(isKnownSection(slug), slug).toBe(true);
    }
  });

  it('rejects unknown or missing segments', () => {
    expect(isKnownSection('nimportequoi')).toBe(false);
    expect(isKnownSection(undefined)).toBe(false);
    expect(isKnownSection('')).toBe(false);
  });
});
```

`tests/app/category-routes.test.tsx` :

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ActualitePage, { metadata as actualiteMetadata } from '@/app/actualite/page';
import AnalysesPage, { metadata as analysesMetadata } from '@/app/analyses/page';
import BusinessPage, { metadata as businessMetadata } from '@/app/business/page';
import SocietePage, { metadata as societeMetadata } from '@/app/societe/page';
import { categoryBySlug } from '@/content/categories';

const routes = [
  { name: 'Actualité', Page: ActualitePage, metadata: actualiteMetadata, category: categoryBySlug.actualite },
  { name: 'Business', Page: BusinessPage, metadata: businessMetadata, category: categoryBySlug.business },
  { name: 'Société', Page: SocietePage, metadata: societeMetadata, category: categoryBySlug.societe },
  { name: 'Analyse', Page: AnalysesPage, metadata: analysesMetadata, category: categoryBySlug.analyse },
];

describe('category routes', () => {
  for (const route of routes) {
    it(`renders and describes the ${route.name} page`, () => {
      expect(route.metadata.title).toBe(`${route.category.label} — Cohezi`);
      expect(route.metadata.description).toBe(route.category.description);
      render(<route.Page />);
      expect(screen.getByRole('heading', { level: 1, name: route.category.label })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: route.category.label })).toHaveAttribute('aria-current', 'page');
    });
  }
});
```

`tests/app/coming-soon.test.tsx` : remplacer le premier test et en ajouter un :

```tsx
  it('pre-renders one path per announced page, categories excluded', () => {
    expect(generateStaticParams()).toEqual(site.comingSoon.map((page) => ({ slug: [page.slug] })));
    expect(site.comingSoon.map((page) => page.slug)).toEqual(['a-propos', 'contact', 'recherche']);
  });

  it('still serves an article path under a category', async () => {
    render(await ComingSoonPage({ params: Promise.resolve({ slug: ['business', 'un-article'] }) }));
    expect(screen.getByRole('heading', { level: 1, name: 'Business' })).toBeInTheDocument();
    expect(screen.getByText('Cette page arrive bientôt.')).toBeInTheDocument();
  });
```
Supprimer l'ancien test « accepts a deeper path under a known section », remplacé par celui-ci.

`tests/content/content.test.ts` : dans le test « resolves every icon name… », remplacer
`expect(site.comingSoon).toHaveLength(7);` par `expect(site.comingSoon).toHaveLength(3);`.

Run : `pnpm test tests/lib/routes.test.ts tests/app`
Expected : FAIL — `@/lib/routes` et les quatre routes n'existent pas, `comingSoon` en contient encore sept.

- [ ] **Step 2 : `lib/routes.ts`**

```ts
import { categories } from '@/content/categories';
import { site } from '@/content/site';

/**
 * Premiers segments d'URL que le site sert : les rubriques, qui ont leur propre page,
 * et les pages annoncées, servies par la route attrape-tout.
 */
const KNOWN_SECTIONS = new Set<string>([
  ...categories.map((category) => category.href.replace('/', '')),
  ...site.comingSoon.map((page) => page.slug),
]);

export function isKnownSection(segment: string | undefined): boolean {
  return segment !== undefined && KNOWN_SECTIONS.has(segment);
}
```

Note : `href` vaut `/analyses` pour la rubrique de slug `analyse` ; c'est bien le segment d'URL,
et non le slug de catégorie, qui doit être accepté.

- [ ] **Step 3 : `content/site.ts` — retirer les catégories de `comingSoon`**

Remplacer le bloc `comingSoon` par :

```ts
  comingSoon: [
    { slug: 'a-propos', label: 'À propos' },
    { slug: 'contact', label: 'Contact' },
    { slug: 'recherche', label: 'Recherche' },
  ],
```

- [ ] **Step 4 : `app/[...slug]/page.tsx` — accepter les catégories comme premier segment**

Remplacer les imports et la fonction `findPage` par :

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { categories } from '@/content/categories';
import { site } from '@/content/site';
import { isKnownSection } from '@/lib/routes';

type ComingSoonPageProps = { params: Promise<{ slug: string[] }> };

/** Libellé affiché : celui de la page annoncée, ou celui de la rubrique parente. */
function labelFor(segment: string | undefined) {
  const announced = site.comingSoon.find((page) => page.slug === segment);
  if (announced) return announced.label;
  const category = categories.find((item) => item.href.replace('/', '') === segment);
  return category?.label;
}
```

Remplacer `generateStaticParams`, `generateMetadata` et le début du composant par :

```tsx
export function generateStaticParams() {
  return site.comingSoon.map((page) => ({ slug: [page.slug] }));
}

export async function generateMetadata({ params }: ComingSoonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const label = labelFor(slug[0]);
  return { title: label ? `${label} — Bientôt disponible` : 'Bientôt disponible' };
}

export default async function ComingSoonPage({ params }: ComingSoonPageProps) {
  const { slug } = await params;
  const segment = slug[0];
  if (!isKnownSection(segment)) notFound();
  const label = labelFor(segment) ?? '';
```

Le reste du composant est inchangé, à ceci près que `{page.label}` devient `{label}` dans le `h1`.

- [ ] **Step 5 : les quatre routes**

`app/actualite/page.tsx` :
```tsx
import type { Metadata } from 'next';
import { CategoryPage } from '@/components/sections/category-page';
import { categoryBySlug } from '@/content/categories';

const category = categoryBySlug.actualite;

export const metadata: Metadata = {
  title: `${category.label} — Cohezi`,
  description: category.description,
};

export default function Page() {
  return <CategoryPage slug="actualite" />;
}
```

`app/business/page.tsx` :
```tsx
import type { Metadata } from 'next';
import { CategoryPage } from '@/components/sections/category-page';
import { categoryBySlug } from '@/content/categories';

const category = categoryBySlug.business;

export const metadata: Metadata = {
  title: `${category.label} — Cohezi`,
  description: category.description,
};

export default function Page() {
  return <CategoryPage slug="business" />;
}
```

`app/societe/page.tsx` :
```tsx
import type { Metadata } from 'next';
import { CategoryPage } from '@/components/sections/category-page';
import { categoryBySlug } from '@/content/categories';

const category = categoryBySlug.societe;

export const metadata: Metadata = {
  title: `${category.label} — Cohezi`,
  description: category.description,
};

export default function Page() {
  return <CategoryPage slug="societe" />;
}
```

`app/analyses/page.tsx` — attention, le segment d'URL est `analyses` mais le slug de catégorie est `analyse` :
```tsx
import type { Metadata } from 'next';
import { CategoryPage } from '@/components/sections/category-page';
import { categoryBySlug } from '@/content/categories';

const category = categoryBySlug.analyse;

export const metadata: Metadata = {
  title: `${category.label} — Cohezi`,
  description: category.description,
};

export default function Page() {
  return <CategoryPage slug="analyse" />;
}
```

- [ ] **Step 6 : vérification complète et routes servies**

Run : `pnpm test && pnpm typecheck && pnpm lint && pnpm build`
Expected : tests verts, build listant `/`, `/actualite`, `/analyses`, `/business`, `/societe`, `/_not-found`, `/api/newsletter` et `/[...slug]` avec 3 chemins pré-rendus.

```bash
cd /home/darellchooks/Documents/cohezi
if curl -s -o /dev/null http://localhost:3000; then OWN=""; else setsid node_modules/.bin/next start -p 3000 > /tmp/cohezi-server.log 2>&1 < /dev/null & echo $! > /tmp/cohezi-server.pgid; OWN=1; sleep 5; fi
for p in / /actualite /business /societe /analyses /business/un-article /a-propos /recherche /inconnu; do printf "  %-24s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)"; done
[ -n "${OWN:-}" ] && kill -TERM -- "-$(cat /tmp/cohezi-server.pgid)" 2>/dev/null && rm -f /tmp/cohezi-server.pgid || true
```
Expected : tout en 200 sauf `/inconnu` en 404.

- [ ] **Step 7 : commit**

```bash
git add -A app lib content tests docs/superpowers/plans/
git commit -m "feat(cohezi): quatre routes de rubrique et attrape-tout recentré

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5 : QA visuelle et livraison

**Files:**
- Modify: tout composant dont le rendu s'écarte de la charte ; `docs/superpowers/specs/2026-09-05-cohezi-category-pages-design.md` (statut)

**Interfaces:** aucune nouvelle.

- [ ] **Step 1 : audit statique**

```bash
cd /home/darellchooks/Documents/cohezi
echo "--- couleurs interdites (attendu : aucune sortie) ---"
grep -rnE "bg-white|text-white|border-white|neutral-[0-9]|indigo-|purple-|violet-|-gradient" components app content --include='*.tsx' --include='*.ts' --include='*.css' || echo "  OK"
echo "--- un seul h1 par page de rubrique ---"
grep -rn "<h1" components/sections/category-hero.tsx components/sections/category-page.tsx | wc -l   # attendu : 1
```

- [ ] **Step 2 : captures des quatre pages en 1440 et 375**

```bash
cd /home/darellchooks/Documents/cohezi
curl -s -o /dev/null http://localhost:3000 && OWN="" || { setsid node_modules/.bin/next start -p 3000 > /tmp/cohezi-server.log 2>&1 < /dev/null & echo $! > /tmp/cohezi-server.pgid; OWN=1; sleep 5; }
B="$HOME/.claude/skills/gstack/browse/dist/browse"
mkdir -p /tmp/cohezi-qa-cat
for v in 1440x900 375x812; do
  $B viewport "$v" >/dev/null
  P=$([ "$v" = "1440x900" ] && echo d || echo m)
  for page in actualite business societe analyses; do
    $B goto "http://localhost:3000/$page" >/dev/null; sleep 0.5
    $B js "document.documentElement.style.scrollBehavior='auto'; window.scrollTo({top:0,behavior:'instant'})" >/dev/null
    $B screenshot --viewport "/tmp/cohezi-qa-cat/$P-$page.png" >/dev/null
    echo "$P $page : hauteur $($B js 'document.documentElement.scrollHeight') | pas de débordement $($B js 'document.documentElement.scrollWidth <= window.innerWidth') | erreurs $($B console --errors | grep -c error)"
  done
done
[ -n "${OWN:-}" ] && kill -TERM -- "-$(cat /tmp/cohezi-server.pgid)" 2>/dev/null && rm -f /tmp/cohezi-server.pgid || true
```

Lire les huit PNG et vérifier :
1. **Bandeau** : eyebrow avec carré vert, nom de rubrique en capitales Space Grotesk, chapô, décompte.
2. **Onglets** : quatre liens centrés, rubrique courante en noir, les trois autres cliquables.
3. **Une** : image large, badge de catégorie, titre, extrait, date française.
4. **Grille** : 3 colonnes en desktop, 2 en tablette, 1 en mobile ; toutes les cartes visibles.
5. **Analyses** : trois articles, donc une une et deux cartes — la ligne ne doit pas paraître vide ou bancale.
6. **Newsletter et footer** : identiques à l'accueil.
7. **Mobile** : une colonne, aucun débordement horizontal, onglets lisibles ou repliés proprement.

Corriger tout écart dans les composants, relancer `pnpm build` et recapturer.

- [ ] **Step 3 : parcours de navigation**

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
$B viewport 1440x900 >/dev/null
$B goto http://localhost:3000 >/dev/null; sleep 0.4
$B js "document.querySelector('nav[aria-label=\"Navigation principale\"] a[href=\"/business\"]').click()" >/dev/null; sleep 1
echo "depuis l’accueil vers Business : $($B js "document.querySelector('main h1').textContent")"
$B js "document.querySelector('nav[aria-label=\"Catégories\"] a[href=\"/societe\"]').click()" >/dev/null; sleep 1
echo "onglet vers Société : $($B js "document.querySelector('main h1').textContent")"
echo "rubrique active : $($B js "document.querySelector('nav[aria-label=\"Catégories\"] a[aria-current=page]').textContent")"
$B js "document.querySelector('main article a').click()" >/dev/null; sleep 1
echo "clic sur une carte : $($B js "document.querySelector('main h1').textContent") / $($B js "document.querySelectorAll('main p')[1].textContent")"
```
Expected : « Business », puis « Société » avec l'onglet Société actif, puis la page « bientôt
disponible » de la rubrique de l'article cliqué.

- [ ] **Step 4 : vérification finale, statut de la spec, commit**

```bash
pnpm test && pnpm typecheck && pnpm lint && pnpm build
git status --short
```

Mettre à jour la ligne « Statut » de la spec en :
`- Statut : **implémenté le <date>** (branche `feat/cohezi-category-pages`). Écarts connus : <liste ou aucun>.`

```bash
git add -A
git commit -m "fix(cohezi): ajustements visuels des pages de rubrique et spec marquée implémentée

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Rapport de fin attendu : les quatre pages livrées avec leur nombre d'articles, nombre de tests,
sortie de `pnpm build`, écarts restants, et rappel que les pages d'article restent en « bientôt
disponible » et feront l'objet d'un lot séparé.
