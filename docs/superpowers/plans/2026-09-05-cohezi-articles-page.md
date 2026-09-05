# Page d'articles unique — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer les quatre pages de rubrique par une page `/articles` unique portant le filtre par rubrique, une recherche instantanée et une pagination numérotée, avec l'état dans l'URL.

**Architecture:** Les fonctions pures de recherche et de pagination viennent d'abord (Task 1), puis les trois primitives d'interface isolément (Task 2 : champ de recherche, pagination, onglets généralisés), puis l'îlot client qui les orchestre en lisant l'URL (Task 3), puis la page, le contenu et les redirections qui remplacent les anciennes routes (Task 4), enfin la QA visuelle (Task 5). Le dépôt reste vert à la fin de chaque tâche sauf pendant la Task 4, qui supprime les anciennes routes et leurs tests dans la même étape.

**Tech Stack:** Next 16.3 (App Router, redirections de `next.config.ts`, `useSearchParams`, `useRouter`) · React 19.2 · TypeScript strict · Tailwind CSS 4.3 · Vitest 5 + Testing Library · pnpm.

**Spec:** `docs/superpowers/specs/2026-09-05-cohezi-articles-page-design.md`

## Global Constraints

- Gestionnaire de paquets : **pnpm**. Aucune dépendance ajoutée.
- Branche de travail : `feat/cohezi-articles-page`, créée depuis `main` (à `39bbf34`).
- Palette exclusive : `ink #111111`, `ink-soft #1a1a1a`, `paper #f7f7f4`, `accent #7cff6b`, `accent-deep #123c2a`, `muted #8a8a8a`, `line #e2e2de`, `line-dark #2a2a2a`. **Aucun `bg-white`, `text-white`, `neutral-*` ni dégradé.**
- Vert (`accent`) réservé aux accents : carré des eyebrows, repère des badges, anneau de focus, page courante de la pagination. Jamais de fond vert plein.
- `font-display` (Space Grotesk) pour le `h1` du bandeau ; `font-sans` (Inter) partout ailleurs.
- Tout texte éditorial vient de `content/*.ts`. Chaînes techniques françaises autorisées dans les composants, et seulement celles-ci : « Catégories », « Pagination », « Page précédente », « Page suivante », « Effacer la recherche », « article », « articles », « dans », « pour ».
- Apostrophes typographiques `’` et guillemets français `« »` dans tout le contenu et les tests, jamais `'` ni `"` dans une phrase française.
- Le paramètre d'URL `categorie` porte le **slug de catégorie** (`analyse` au singulier), pas le segment d'URL (`analyses`).
- `ARTICLES_PER_PAGE = 9`, exporté par `lib/search.ts` et importé partout ailleurs : aucune valeur 9 en dur.
- Tests dans `tests/`, imports explicites depuis `vitest`. `pnpm test`, `pnpm typecheck` et `pnpm lint` verts à la fin de **chaque** tâche ; `pnpm build` vert à la fin des Tasks 4 et 5.
- Commits : un par tâche, message conventionnel en français, suffixe `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. Cocher les cases du plan et l'inclure dans le commit.
- Serveur local : ne jamais tuer un processus non lancé par la tâche. Vérifier `curl -s -o /dev/null http://localhost:3000` avant d'en démarrer un.

---

## Carte des fichiers

| Fichier | Action | Responsabilité | Tâche |
|---|---|---|---|
| `lib/search.ts` | créer | `normalize`, `searchArticles`, `paginate`, `ARTICLES_PER_PAGE` | 1 |
| `components/ui/search-field.tsx` | créer | champ de recherche contrôlé | 2 |
| `components/ui/pagination.tsx` | créer | navigation entre pages | 2 |
| `components/ui/category-tabs.tsx` | modifier | généralisé : « Toutes » + `buildHref` | 2 |
| `components/sections/article-browser.tsx` | créer | îlot client : lit l'URL, filtre, pagine | 3 |
| `components/sections/section-hero.tsx` | créer | bandeau générique (remplace `category-hero`) | 3 |
| `components/sections/category-hero.tsx` | supprimer | remplacé par `section-hero` | 3 |
| `content/types.ts` | modifier | `ArticlesPageCopy`, ajouté à `SiteConfig` | 4 |
| `content/site.ts` | modifier | bloc `articles`, `href` de nav et footer | 4 |
| `app/articles/page.tsx` | créer | page statique, bandeau + îlot client | 4 |
| `next.config.ts` | modifier | cinq redirections 308 | 4 |
| `app/actualite/`, `app/business/`, `app/societe/`, `app/analyses/` | supprimer | remplacées par `/articles` | 4 |
| `components/sections/category-page.tsx` | supprimer | remplacé par la page d'articles | 4 |
| — | — | QA visuelle, statut de la spec | 5 |

---

### Task 1 : Fonctions pures de recherche et de pagination

**Files:**
- Create: `lib/search.ts`
- Test: `tests/lib/search.test.ts`

**Interfaces:**
- Consumes : `Article` depuis `@/content/types`.
- Produces :
  - `ARTICLES_PER_PAGE = 9`
  - `normalize(value: string): string`
  - `searchArticles(articles: readonly Article[], query: string): Article[]`
  - `type Page<T> = { items: T[]; page: number; pageCount: number; total: number }`
  - `paginate<T>(items: readonly T[], page: number, perPage: number): Page<T>`

- [ ] **Step 1 : test qui échoue**

`tests/lib/search.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import type { Article } from '@/content/types';
import { ARTICLES_PER_PAGE, normalize, paginate, searchArticles } from '@/lib/search';

const make = (slug: string, title: string, excerpt: string): Article => ({
  slug,
  title,
  excerpt,
  category: 'actualite',
  publishedAt: '2026-09-01',
  readingMinutes: 5,
  image: { alt: slug },
});

const corpus = [
  make('a', 'OpenAI lance GPT-6', 'Fenêtre de contexte illimitée et agents natifs.'),
  make('b', 'L’AI Act entre en application', 'Transparence des modèles et registre des systèmes.'),
  make('c', 'Élections et deepfakes', 'Étiquetage obligatoire des contenus générés.'),
];

describe('normalize', () => {
  it('lowercases, strips accents and collapses spaces', () => {
    expect(normalize('  Élections   ET  Deepfakes ')).toBe('elections et deepfakes');
    expect(normalize('Fenêtre')).toBe('fenetre');
    expect(normalize('')).toBe('');
  });
});

describe('searchArticles', () => {
  it('returns everything for an empty or whitespace query', () => {
    expect(searchArticles(corpus, '')).toHaveLength(3);
    expect(searchArticles(corpus, '   ')).toHaveLength(3);
  });

  it('matches the title, ignoring case and accents', () => {
    expect(searchArticles(corpus, 'openai').map((a) => a.slug)).toEqual(['a']);
    expect(searchArticles(corpus, 'ELECTIONS').map((a) => a.slug)).toEqual(['c']);
  });

  it('matches the excerpt too', () => {
    expect(searchArticles(corpus, 'registre').map((a) => a.slug)).toEqual(['b']);
    expect(searchArticles(corpus, 'fenetre').map((a) => a.slug)).toEqual(['a']);
  });

  it('returns an empty array when nothing matches', () => {
    expect(searchArticles(corpus, 'quantique')).toEqual([]);
  });

  it('does not mutate the input', () => {
    const before = corpus.map((a) => a.slug);
    searchArticles(corpus, 'openai');
    expect(corpus.map((a) => a.slug)).toEqual(before);
  });
});

describe('paginate', () => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);

  it('cuts the list into pages and reports the totals', () => {
    expect(paginate(items, 1, 4)).toEqual({ items: [1, 2, 3, 4], page: 1, pageCount: 3, total: 10 });
    expect(paginate(items, 3, 4)).toEqual({ items: [9, 10], page: 3, pageCount: 3, total: 10 });
  });

  it('clamps a page below the first one', () => {
    expect(paginate(items, 0, 4).page).toBe(1);
    expect(paginate(items, -5, 4).items).toEqual([1, 2, 3, 4]);
  });

  it('clamps a page beyond the last one', () => {
    expect(paginate(items, 99, 4).page).toBe(3);
    expect(paginate(items, 99, 4).items).toEqual([9, 10]);
  });

  it('handles an empty list', () => {
    expect(paginate([], 1, 4)).toEqual({ items: [], page: 1, pageCount: 1, total: 0 });
  });

  it('exposes the page size used by the articles page', () => {
    expect(ARTICLES_PER_PAGE).toBe(9);
  });
});
```

Run : `pnpm test tests/lib/search.test.ts`
Expected : FAIL — module `@/lib/search` introuvable.

- [ ] **Step 2 : `lib/search.ts`**

```ts
import type { Article } from '@/content/types';

/** Nombre d'articles par page sur `/articles`. */
export const ARTICLES_PER_PAGE = 9;

/** Minuscules, accents retirés, espaces réduits : base de comparaison de la recherche. */
export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/** Articles dont le titre ou l'extrait contient la requête. Requête vide : tout est renvoyé. */
export function searchArticles(articles: readonly Article[], query: string): Article[] {
  const needle = normalize(query);
  if (needle.length === 0) return [...articles];
  return articles.filter(
    (article) => normalize(article.title).includes(needle) || normalize(article.excerpt).includes(needle),
  );
}

export type Page<T> = { items: T[]; page: number; pageCount: number; total: number };

/**
 * Découpe en pages de `perPage`. `page` est ramené dans [1, pageCount].
 * Une liste vide donne `pageCount` 1 et `items` vide.
 */
export function paginate<T>(items: readonly T[], page: number, perPage: number): Page<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(Math.trunc(page) || 1, 1), pageCount);
  const start = (current - 1) * perPage;
  return { items: items.slice(start, start + perPage), page: current, pageCount, total };
}
```

Note : `Math.trunc(page) || 1` ramène `NaN` et `0` à 1 avant le bornage.

- [ ] **Step 3 : vérifier et commiter**

Run : `pnpm test && pnpm typecheck && pnpm lint`
Expected : PASS.

```bash
cd /home/darellchooks/Documents/cohezi
git checkout -b feat/cohezi-articles-page
git add -A lib tests docs/superpowers/plans/
git commit -m "feat(cohezi): fonctions pures de recherche et de pagination

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2 : Champ de recherche, pagination et onglets généralisés

**Files:**
- Create: `components/ui/search-field.tsx`, `components/ui/pagination.tsx`
- Modify: `components/ui/category-tabs.tsx`
- Test: `tests/components/ui/search-field.test.tsx`, `tests/components/ui/pagination.test.tsx`, `tests/components/ui/category-tabs.test.tsx`

**Interfaces:**
- Consumes : `categories`, `CategorySlug`, `Icon`, `cn`.
- Produces :
  - `SearchField({ label: string; placeholder: string; value: string; onChange: (value: string) => void; clearLabel?: string })`
  - `Pagination({ page: number; pageCount: number; buildHref: (page: number) => string })`
  - `CategoryTabs({ activeSlug: CategorySlug | 'all'; allLabel: string; buildHref: (slug: CategorySlug | 'all') => string })`

- [ ] **Step 1 : tests qui échouent**

`tests/components/ui/search-field.test.tsx` :

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SearchField } from '@/components/ui/search-field';

describe('SearchField', () => {
  it('renders a labelled search input holding the given value', () => {
    render(<SearchField label="Rechercher un article" placeholder="Titre, sujet…" value="openai" onChange={() => {}} />);
    const input = screen.getByLabelText('Rechercher un article');
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveAttribute('placeholder', 'Titre, sujet…');
    expect(input).toHaveValue('openai');
  });

  it('reports every keystroke', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchField label="Rechercher un article" placeholder="Titre" value="" onChange={onChange} />);
    await user.type(screen.getByLabelText('Rechercher un article'), 'ai');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith('i');
  });

  it('offers a clear button only when the field has content', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <SearchField label="Rechercher un article" placeholder="Titre" value="" onChange={onChange} />,
    );
    expect(screen.queryByRole('button', { name: 'Effacer la recherche' })).toBeNull();

    rerender(<SearchField label="Rechercher un article" placeholder="Titre" value="openai" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Effacer la recherche' }));
    expect(onChange).toHaveBeenCalledWith('');
  });
});
```

Note : le composant est contrôlé, donc `user.type` sur une valeur figée à `''` remonte chaque
caractère séparément ; la dernière valeur vue est `'i'`, pas `'ai'`.

`tests/components/ui/pagination.test.tsx` :

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Pagination } from '@/components/ui/pagination';

const href = (page: number) => `/articles?page=${page}`;

describe('Pagination', () => {
  it('renders nothing when there is a single page', () => {
    const { container } = render(<Pagination page={1} pageCount={1} buildHref={href} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders one link per page and marks the current one', () => {
    render(<Pagination page={2} pageCount={3} buildHref={href} />);
    const nav = screen.getByRole('navigation', { name: 'Pagination' });
    expect(within(nav).getByRole('link', { name: '1' })).toHaveAttribute('href', '/articles?page=1');
    const current = within(nav).getByRole('link', { name: '2' });
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.className).toContain('bg-ink');
  });

  it('disables the previous arrow on the first page and the next one on the last', () => {
    const { rerender } = render(<Pagination page={1} pageCount={3} buildHref={href} />);
    expect(screen.getByLabelText('Page précédente')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('link', { name: 'Page suivante' })).toHaveAttribute('href', '/articles?page=2');

    rerender(<Pagination page={3} pageCount={3} buildHref={href} />);
    expect(screen.getByLabelText('Page suivante')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('link', { name: 'Page précédente' })).toHaveAttribute('href', '/articles?page=2');
  });

  it('condenses long ranges around the current page', () => {
    render(<Pagination page={6} pageCount={12} buildHref={href} />);
    const nav = screen.getByRole('navigation', { name: 'Pagination' });
    const labels = within(nav)
      .getAllByRole('link')
      .map((link) => link.textContent)
      .filter((text) => text && /^\d+$/.test(text));
    expect(labels).toEqual(['1', '5', '6', '7', '12']);
    expect(within(nav).getAllByText('…')).toHaveLength(2);
  });
});
```

`tests/components/ui/category-tabs.test.tsx` (contenu complet, remplace l'existant) :

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryTabs } from '@/components/ui/category-tabs';
import { categories } from '@/content/categories';

const href = (slug: string) => (slug === 'all' ? '/articles' : `/articles?categorie=${slug}`);

describe('CategoryTabs', () => {
  it('renders an "all" tab plus one link per category', () => {
    render(<CategoryTabs activeSlug="all" allLabel="Toutes" buildHref={href} />);
    const nav = screen.getByRole('navigation', { name: 'Catégories' });
    expect(within(nav).getAllByRole('link')).toHaveLength(5);
    expect(within(nav).getByRole('link', { name: 'Toutes' })).toHaveAttribute('href', '/articles');
    for (const category of categories) {
      expect(within(nav).getByRole('link', { name: category.title })).toHaveAttribute(
        'href',
        `/articles?categorie=${category.slug}`,
      );
    }
  });

  it('marks only the active tab', () => {
    render(<CategoryTabs activeSlug="business" allLabel="Toutes" buildHref={href} />);
    const nav = within(screen.getByRole('navigation', { name: 'Catégories' }));
    const active = nav.getByRole('link', { name: 'Business' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active.className).toContain('bg-ink');
    expect(nav.getByRole('link', { name: 'Toutes' })).not.toHaveAttribute('aria-current');
  });

  it('marks the "all" tab when no category is active', () => {
    render(<CategoryTabs activeSlug="all" allLabel="Toutes" buildHref={href} />);
    const nav = within(screen.getByRole('navigation', { name: 'Catégories' }));
    expect(nav.getByRole('link', { name: 'Toutes' })).toHaveAttribute('aria-current', 'page');
  });
});
```

Run : `pnpm test tests/components/ui/search-field.test.tsx tests/components/ui/pagination.test.tsx tests/components/ui/category-tabs.test.tsx`
Expected : FAIL — `search-field` et `pagination` introuvables, `CategoryTabs` n'accepte pas encore `allLabel` ni `buildHref`.

- [ ] **Step 2 : `components/ui/search-field.tsx`**

```tsx
'use client';

import { useId } from 'react';
import { Icon } from './icon';

type SearchFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  clearLabel?: string;
};

/** Champ de recherche contrôlé : le parent détient la valeur et décide quoi en faire. */
export function SearchField({ label, placeholder, value, onChange, clearLabel = 'Effacer la recherche' }: SearchFieldProps) {
  const inputId = useId();

  return (
    <div className="mx-auto flex w-full max-w-[520px] items-center gap-2 rounded-xl border border-line bg-paper px-3">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Icon name="search" size={18} className="shrink-0 text-muted" />
      <input
        id={inputId}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 min-w-0 flex-1 bg-transparent font-sans text-base text-ink placeholder:text-muted focus:outline-none"
      />
      {value.length > 0 ? (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={() => onChange('')}
          className="shrink-0 rounded-md p-1 text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Icon name="close" size={16} />
        </button>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3 : `components/ui/pagination.tsx`**

```tsx
import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

type PaginationProps = { page: number; pageCount: number; buildHref: (page: number) => string };

/**
 * Numéros à afficher : toujours la première et la dernière page, plus une fenêtre
 * autour de la page courante. `0` marque une ellipse.
 */
export function pageNumbers(page: number, pageCount: number): number[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  const window = new Set<number>([1, pageCount, page - 1, page, page + 1]);
  const kept = [...window].filter((value) => value >= 1 && value <= pageCount).sort((a, b) => a - b);
  const result: number[] = [];
  for (const [index, value] of kept.entries()) {
    const previous = kept[index - 1];
    if (previous !== undefined && value - previous > 1) result.push(0);
    result.push(value);
  }
  return result;
}

const arrowClass =
  'flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors';

export function Pagination({ page, pageCount, buildHref }: PaginationProps) {
  if (pageCount <= 1) return null;

  const previousDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      {previousDisabled ? (
        <span aria-label="Page précédente" aria-disabled="true" className={cn(arrowClass, 'opacity-40')}>
          <Icon name="arrow-right" size={16} className="rotate-180" />
        </span>
      ) : (
        <Link href={buildHref(page - 1)} aria-label="Page précédente" className={cn(arrowClass, 'hover:bg-line/60')}>
          <Icon name="arrow-right" size={16} className="rotate-180" />
        </Link>
      )}

      {pageNumbers(page, pageCount).map((value, index) =>
        value === 0 ? (
          <span key={`gap-${index}`} aria-hidden className="px-1 text-muted">
            …
          </span>
        ) : (
          <Link
            key={value}
            href={buildHref(value)}
            aria-current={value === page ? 'page' : undefined}
            className={cn(
              'flex h-9 min-w-9 items-center justify-center rounded-lg px-2 font-sans text-sm transition-colors',
              value === page ? 'bg-ink text-paper' : 'border border-line text-ink hover:bg-line/60',
            )}
          >
            {value}
          </Link>
        ),
      )}

      {nextDisabled ? (
        <span aria-label="Page suivante" aria-disabled="true" className={cn(arrowClass, 'opacity-40')}>
          <Icon name="arrow-right" size={16} />
        </span>
      ) : (
        <Link href={buildHref(page + 1)} aria-label="Page suivante" className={cn(arrowClass, 'hover:bg-line/60')}>
          <Icon name="arrow-right" size={16} />
        </Link>
      )}
    </nav>
  );
}
```

- [ ] **Step 4 : `components/ui/category-tabs.tsx` (contenu complet)**

```tsx
import Link from 'next/link';
import { categories } from '@/content/categories';
import type { CategorySlug } from '@/content/types';
import { cn } from '@/lib/cn';

export type TabSlug = CategorySlug | 'all';

type CategoryTabsProps = {
  activeSlug: TabSlug;
  allLabel: string;
  buildHref: (slug: TabSlug) => string;
};

/**
 * Filtre par rubrique, rendu en liens : l'état vit dans l'URL, donc chaque onglet
 * est une adresse partageable. L'appelant construit les adresses pour conserver
 * les autres paramètres (recherche notamment).
 */
export function CategoryTabs({ activeSlug, allLabel, buildHref }: CategoryTabsProps) {
  const tabs: { slug: TabSlug; label: string }[] = [
    { slug: 'all', label: allLabel },
    ...categories.map((category) => ({ slug: category.slug as TabSlug, label: category.title })),
  ];

  return (
    <nav
      aria-label="Catégories"
      className="inline-flex items-center gap-1 rounded-xl border border-line bg-paper p-1"
    >
      {tabs.map((tab) => {
        const isActive = tab.slug === activeSlug;
        return (
          <Link
            key={tab.slug}
            href={buildHref(tab.slug)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex h-[33px] items-center rounded-lg px-2.5 font-sans text-sm leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:px-4 md:text-[15px]',
              isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-line/60',
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 5 : vérifier et commiter**

Run : `pnpm test && pnpm typecheck && pnpm lint`
Expected : les tests des trois primitives passent. `tests/components/sections/category-page.test.tsx`
et `tests/app/category-routes.test.tsx` **échouent** parce que `CategoryTabs` a changé de signature ;
ils sont supprimés en Task 4 avec les composants qu'ils couvrent. Pour garder la tâche verte,
supprimer dès maintenant ces deux fichiers de test **et** `components/sections/category-page.tsx`
avec les quatre routes, en les remplaçant provisoirement par rien : c'est fait en Task 4.
**Décision : cette tâche se termine donc avec ces deux fichiers de test supprimés**, les fichiers
source correspondants restant en place jusqu'à la Task 4.

```bash
cd /home/darellchooks/Documents/cohezi
git rm -q tests/components/sections/category-page.test.tsx tests/app/category-routes.test.tsx
pnpm test && pnpm typecheck && pnpm lint
```
Expected : PASS. `components/sections/category-page.tsx` et les quatre routes compilent encore : elles
appellent `CategoryTabs` avec l'ancienne signature, ce qui casserait `typecheck`. Les mettre à jour
d'une ligne pour rester valides :

Dans `components/sections/category-page.tsx`, remplacer
```tsx
                <CategoryTabs activeSlug={slug} />
```
par
```tsx
                <CategoryTabs
                  activeSlug={slug}
                  allLabel="Toutes"
                  buildHref={(tab) => (tab === 'all' ? '/articles' : `/articles?categorie=${tab}`)}
                />
```
Ce raccord vit trois quarts d'heure : la Task 4 supprime ce fichier.

```bash
git add -A components tests docs/superpowers/plans/
git commit -m "feat(cohezi): champ de recherche, pagination et onglets généralisés

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3 : Îlot client et bandeau générique

**Files:**
- Create: `components/sections/article-browser.tsx`, `components/sections/section-hero.tsx`
- Delete: `components/sections/category-hero.tsx`, `tests/components/sections/category-hero.test.tsx`
- Modify: `components/sections/category-page.tsx` (utilise `SectionHero`)
- Test: `tests/components/sections/section-hero.test.tsx`, `tests/components/sections/article-browser.test.tsx`

**Interfaces:**
- Consumes : `ARTICLES_PER_PAGE`, `searchArticles`, `paginate` (`@/lib/search`) ; `SearchField`, `Pagination`, `CategoryTabs`, `TabSlug` ; `ArticleCard` ; `categories`, `categoryBySlug`.
- Produces :
  - `SectionHero({ eyebrow: string; title: string; description: string; articleCount: number })`
  - `ArticleBrowser({ articles: Article[]; copy: ArticlesPageCopy })` (client)
  - `type ArticlesPageCopy` est défini en Task 4 ; pour cette tâche, le composant l'importe depuis
    `@/content/types`, donc **le type doit être ajouté ici**, avant son usage : voir Step 2.

- [ ] **Step 1 : tests qui échouent**

`tests/components/sections/section-hero.test.tsx` :

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHero } from '@/components/sections/section-hero';

describe('SectionHero', () => {
  it('renders the eyebrow, the display heading, the description and the count', () => {
    render(
      <SectionHero eyebrow="Cohezi / Articles" title="Articles" description="Toute l’actualité." articleCount={24} />,
    );
    expect(screen.getByText('Cohezi / Articles')).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1, name: 'Articles' });
    expect(heading.className).toContain('font-display');
    expect(heading.className).toContain('uppercase');
    expect(screen.getByText('Toute l’actualité.')).toBeInTheDocument();
    expect(screen.getByText('24 articles')).toBeInTheDocument();
  });

  it('keeps the count singular for one article', () => {
    render(<SectionHero eyebrow="E" title="T" description="D" articleCount={1} />);
    expect(screen.getByText('1 article')).toBeInTheDocument();
  });
});
```

`tests/components/sections/article-browser.test.tsx` :

```tsx
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ArticleBrowser } from '@/components/sections/article-browser';
import { articles } from '@/content/articles';
import type { ArticlesPageCopy } from '@/content/types';

const replace = vi.fn();
let params = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace, push: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => params,
  usePathname: () => '/articles',
}));

const copy: ArticlesPageCopy = {
  eyebrow: 'Cohezi / Articles',
  title: 'Articles',
  description: 'Toute l’actualité de l’IA.',
  searchLabel: 'Rechercher un article',
  searchPlaceholder: 'Titre, sujet, entreprise…',
  allLabel: 'Toutes',
  emptyTitle: 'Aucun article ne correspond.',
  emptyAction: 'Réinitialiser les filtres',
};

function setup(search = '') {
  params = new URLSearchParams(search);
  return render(<ArticleBrowser articles={articles} copy={copy} />);
}

describe('ArticleBrowser', () => {
  beforeEach(() => {
    replace.mockReset();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the first nine articles and the total by default', () => {
    setup();
    expect(screen.getAllByRole('article')).toHaveLength(9);
    expect(screen.getByText('24 articles')).toBeInTheDocument();
  });

  it('reads the active category from the URL and says so in the result line', () => {
    setup('categorie=business');
    expect(screen.getAllByRole('article')).toHaveLength(8);
    expect(screen.getByText('8 articles dans Business')).toBeInTheDocument();
    const tabs = within(screen.getByRole('navigation', { name: 'Catégories' }));
    expect(tabs.getByRole('link', { name: 'Business' })).toHaveAttribute('aria-current', 'page');
  });

  it('reads the page number from the URL', () => {
    setup('page=3');
    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute('aria-current', 'page');
  });

  it('ignores an unknown category', () => {
    setup('categorie=nimportequoi');
    expect(screen.getAllByRole('article')).toHaveLength(9);
    expect(screen.getByText('24 articles')).toBeInTheDocument();
  });

  it('filters instantly as the user types and pushes the query into the URL', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    setup();
    await user.type(screen.getByLabelText('Rechercher un article'), 'mistral');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('1 article pour « mistral »')).toBeInTheDocument();
    vi.advanceTimersByTime(300);
    await waitFor(() => expect(replace).toHaveBeenCalledWith('/articles?q=mistral', { scroll: false }));
  });

  it('combines the category and the query in the result line', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    setup('categorie=business');
    await user.type(screen.getByLabelText('Rechercher un article'), 'mistral');
    expect(screen.getByText('1 article dans Business pour « mistral »')).toBeInTheDocument();
  });

  it('shows the empty state with a reset link when nothing matches', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    setup();
    await user.type(screen.getByLabelText('Rechercher un article'), 'zzzz');
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(screen.getByText('Aucun article ne correspond.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Réinitialiser les filtres' })).toHaveAttribute('href', '/articles');
  });

  it('builds tab links that keep the current query', () => {
    setup('q=mistral');
    const tabs = within(screen.getByRole('navigation', { name: 'Catégories' }));
    expect(tabs.getByRole('link', { name: 'Business' })).toHaveAttribute(
      'href',
      '/articles?categorie=business&q=mistral',
    );
  });
});
```

Run : `pnpm test tests/components/sections/section-hero.test.tsx tests/components/sections/article-browser.test.tsx`
Expected : FAIL — les deux modules et le type `ArticlesPageCopy` n'existent pas.

- [ ] **Step 2 : `content/types.ts` — ajouter `ArticlesPageCopy`**

Après le type `NewsletterCopy`, ajouter :

```ts
export type ArticlesPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  searchLabel: string;
  searchPlaceholder: string;
  allLabel: string;
  emptyTitle: string;
  emptyAction: string;
};
```

Le champ correspondant dans `SiteConfig` est ajouté en Task 4 ; le type seul suffit ici.

- [ ] **Step 3 : `components/sections/section-hero.tsx`**

```tsx
type SectionHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  articleCount: number;
};

/** Bandeau sombre d'une page de liste, sur le gabarit du hero de l'accueil. */
export function SectionHero({ eyebrow, title, description, articleCount }: SectionHeroProps) {
  const countLabel = `${articleCount} ${articleCount > 1 ? 'articles' : 'article'}`;

  return (
    <section aria-labelledby="section-title" className="hero-dark-change px-5 pb-16 pt-20 text-center md:pt-24">
      <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
        <span aria-hidden className="h-2 w-2 bg-accent" />
        {eyebrow}
      </p>
      <h1
        id="section-title"
        className="mx-auto mt-6 max-w-4xl font-display text-[32px] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-paper md:text-5xl"
      >
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-[560px] text-lg leading-7 text-paper/80">{description}</p>
      <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">{countLabel}</p>
    </section>
  );
}
```

- [ ] **Step 4 : `components/sections/article-browser.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArticleCard } from '@/components/cards/article-card';
import { CategoryTabs, type TabSlug } from '@/components/ui/category-tabs';
import { Pagination } from '@/components/ui/pagination';
import { SearchField } from '@/components/ui/search-field';
import { categories, categoryBySlug } from '@/content/categories';
import type { Article, ArticlesPageCopy, CategorySlug } from '@/content/types';
import { ARTICLES_PER_PAGE, paginate, searchArticles } from '@/lib/search';

const DEBOUNCE_MS = 250;

function readCategory(raw: string | null): TabSlug {
  const found = categories.find((category) => category.slug === raw);
  return found ? found.slug : 'all';
}

/** Construit une adresse `/articles` en n'incluant que les paramètres utiles. */
function buildUrl(pathname: string, params: { categorie: TabSlug; q: string; page: number }): string {
  const search = new URLSearchParams();
  if (params.categorie !== 'all') search.set('categorie', params.categorie);
  if (params.q.length > 0) search.set('q', params.q);
  if (params.page > 1) search.set('page', String(params.page));
  const query = search.toString();
  return query.length > 0 ? `${pathname}?${query}` : pathname;
}

function resultLine(total: number, categorie: TabSlug, query: string): string {
  const count = `${total} ${total > 1 ? 'articles' : 'article'}`;
  const inCategory = categorie === 'all' ? '' : ` dans ${categoryBySlug[categorie as CategorySlug].title}`;
  const forQuery = query.length > 0 ? ` pour « ${query} »` : '';
  return `${count}${inCategory}${forQuery}`;
}

type ArticleBrowserProps = { articles: Article[]; copy: ArticlesPageCopy };

export function ArticleBrowser({ articles, copy }: ArticleBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categorie = readCategory(searchParams.get('categorie'));
  const urlQuery = searchParams.get('q') ?? '';
  const urlPage = Number.parseInt(searchParams.get('page') ?? '1', 10);

  const [query, setQuery] = useState(urlQuery);

  // La frappe filtre tout de suite ; l'URL suit après un court délai.
  useEffect(() => {
    if (query === urlQuery) return;
    const timer = setTimeout(() => {
      router.replace(buildUrl(pathname, { categorie, q: query, page: 1 }), { scroll: false });
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query, urlQuery, categorie, pathname, router]);

  const byCategory =
    categorie === 'all' ? articles : articles.filter((article) => article.category === categorie);
  const found = searchArticles(byCategory, query);
  const pageState = paginate(found, urlPage, ARTICLES_PER_PAGE);

  return (
    <div>
      <SearchField
        label={copy.searchLabel}
        placeholder={copy.searchPlaceholder}
        value={query}
        onChange={setQuery}
      />

      <div className="mt-8 flex justify-center">
        <CategoryTabs
          activeSlug={categorie}
          allLabel={copy.allLabel}
          buildHref={(slug) => buildUrl(pathname, { categorie: slug, q: query, page: 1 })}
        />
      </div>

      <p aria-live="polite" className="mt-6 text-center font-sans text-[13px] text-ink/60">
        {resultLine(pageState.total, categorie, query)}
      </p>

      {pageState.items.length > 0 ? (
        <>
          <ul aria-label="Articles" className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pageState.items.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} variant="grid" />
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <Pagination
              page={pageState.page}
              pageCount={pageState.pageCount}
              buildHref={(page) => buildUrl(pathname, { categorie, q: query, page })}
            />
          </div>
        </>
      ) : (
        <div className="mt-12 text-center">
          <p className="font-display text-xl font-semibold text-ink">{copy.emptyTitle}</p>
          <Link
            href={pathname}
            className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent-deep underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {copy.emptyAction}
          </Link>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5 : basculer `category-page.tsx` sur `SectionHero` et supprimer l'ancien bandeau**

Dans `components/sections/category-page.tsx`, remplacer l'import
```tsx
import { CategoryHero } from '@/components/sections/category-hero';
```
par
```tsx
import { SectionHero } from '@/components/sections/section-hero';
```
et l'usage
```tsx
          <CategoryHero category={category} articleCount={list.length} />
```
par
```tsx
          <SectionHero
            eyebrow={category.eyebrow}
            title={category.title}
            description={category.description}
            articleCount={list.length}
          />
```

```bash
cd /home/darellchooks/Documents/cohezi
git rm -q components/sections/category-hero.tsx tests/components/sections/category-hero.test.tsx
```

- [ ] **Step 6 : vérifier et commiter**

Run : `pnpm test && pnpm typecheck && pnpm lint`
Expected : PASS.

```bash
git add -A components content tests docs/superpowers/plans/
git commit -m "feat(cohezi): navigateur d'articles côté client et bandeau générique

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4 : Page /articles, contenu, redirections et suppression des anciennes routes

**Files:**
- Create: `app/articles/page.tsx`
- Modify: `content/types.ts`, `content/site.ts`, `next.config.ts`
- Delete: `app/actualite/`, `app/business/`, `app/societe/`, `app/analyses/`, `components/sections/category-page.tsx`
- Test: `tests/app/articles-page.test.tsx`, `tests/app/redirects.test.ts`, `tests/content/content.test.ts`

**Interfaces:**
- Consumes : `SectionHero`, `ArticleBrowser`, `articles`, `site`, `ArticlesPageCopy`.
- Produces : route `/articles` statique exportant `metadata` ; `site.articles: ArticlesPageCopy` ; `nextConfig.redirects()`.

- [ ] **Step 1 : tests qui échouent**

`tests/app/articles-page.test.tsx` :

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ArticlesPage, { metadata } from '@/app/articles/page';
import { articles } from '@/content/articles';
import { site } from '@/content/site';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/articles',
}));

describe('ArticlesPage', () => {
  it('describes itself with the site copy', () => {
    expect(metadata.title).toBe('Articles — Cohezi');
    expect(metadata.description).toBe(site.articles.description);
  });

  it('renders the hero with the site-wide total and the first page of cards', () => {
    render(<ArticlesPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Articles' })).toBeInTheDocument();
    expect(screen.getByText(`${articles.length} articles`)).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(9);
    expect(screen.getByRole('navigation', { name: 'Catégories' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Moins de bruit. Plus de contexte.' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
```

`tests/app/redirects.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import nextConfig from '@/next.config';

describe('redirects', () => {
  it('sends every former category page to the filtered articles page', async () => {
    const redirects = await nextConfig.redirects!();
    const map = Object.fromEntries(redirects.map((entry) => [entry.source, entry]));

    expect(map['/actualite']!.destination).toBe('/articles?categorie=actualite');
    expect(map['/business']!.destination).toBe('/articles?categorie=business');
    expect(map['/societe']!.destination).toBe('/articles?categorie=societe');
    expect(map['/analyses']!.destination).toBe('/articles?categorie=analyse');
    expect(map['/recherche']!.destination).toBe('/articles');
    expect(redirects).toHaveLength(5);
    for (const entry of redirects) expect(entry.permanent).toBe(true);
  });
});
```

`tests/content/content.test.ts` : ajouter à la fin du `describe('category metadata')` un nouveau
`describe` :

```ts
describe('articles page copy', () => {
  it('carries every string the articles page needs', () => {
    for (const key of [
      'eyebrow',
      'title',
      'description',
      'searchLabel',
      'searchPlaceholder',
      'allLabel',
      'emptyTitle',
      'emptyAction',
    ] as const) {
      expect(site.articles[key].length, key).toBeGreaterThan(0);
    }
    expect(site.articles.title).toBe('Articles');
  });

  it('points the navigation at the filtered articles page', () => {
    expect(site.nav.map((item) => item.href)).toEqual([
      '/articles?categorie=actualite',
      '/articles?categorie=business',
      '/articles?categorie=societe',
      '/articles?categorie=analyse',
    ]);
    expect(site.searchHref).toBe('/articles');
    expect(site.sections.latest.viewAllHref).toBe('/articles?categorie=actualite');
    expect(site.sections.business.viewAllHref).toBe('/articles?categorie=business');
    expect(site.sections.societe.viewAllHref).toBe('/articles?categorie=societe');
  });
});
```

Run : `pnpm test tests/app/articles-page.test.tsx tests/app/redirects.test.ts tests/content`
Expected : FAIL — page, redirections et bloc `site.articles` inexistants.

- [ ] **Step 2 : `content/types.ts` — brancher `ArticlesPageCopy` sur `SiteConfig`**

Dans `SiteConfig`, après la ligne `newsletter: NewsletterCopy;`, ajouter :

```ts
  articles: ArticlesPageCopy;
```

- [ ] **Step 3 : `content/site.ts` — bloc `articles` et adresses filtrées**

Remplacer le tableau `nav` par :
```ts
  nav: [
    { label: 'Actualité', href: '/articles?categorie=actualite' },
    { label: 'Business', href: '/articles?categorie=business' },
    { label: 'Société', href: '/articles?categorie=societe' },
    { label: 'Analyses', href: '/articles?categorie=analyse' },
  ],
```

Dans `sections`, remplacer les trois `viewAllHref` :
- `latest` : `viewAllHref: '/articles?categorie=actualite',`
- `business` : `viewAllHref: '/articles?categorie=business',`
- `societe` : `viewAllHref: '/articles?categorie=societe',`

Dans `footer.columns`, la colonne « Actualité » devient :
```ts
        links: [
          { label: 'Business', href: '/articles?categorie=business' },
          { label: 'Société', href: '/articles?categorie=societe' },
          { label: 'Analyses', href: '/articles?categorie=analyse' },
        ],
```

Après le bloc `newsletter`, ajouter :
```ts
  articles: {
    eyebrow: 'Cohezi / Articles',
    title: 'Articles',
    description: 'Toute l’actualité de l’IA, filtrable par rubrique et par mot-clé.',
    searchLabel: 'Rechercher un article',
    searchPlaceholder: 'Titre, sujet, entreprise…',
    allLabel: 'Toutes',
    emptyTitle: 'Aucun article ne correspond.',
    emptyAction: 'Réinitialiser les filtres',
  },
```

`searchHref` vaut déjà `/recherche` : le remplacer par `'/articles'`.

- [ ] **Step 4 : `app/articles/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { HeroLightSwitch } from '@/components/layout/hero-light-switch';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ArticleBrowser } from '@/components/sections/article-browser';
import { NewsletterCta } from '@/components/sections/newsletter-cta';
import { SectionHero } from '@/components/sections/section-hero';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { sortByDate } from '@/lib/articles';

export const metadata: Metadata = {
  title: `${site.articles.title} — Cohezi`,
  description: site.articles.description,
};

export default function Page() {
  const all = sortByDate(articles);

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
          <SectionHero
            eyebrow={site.articles.eyebrow}
            title={site.articles.title}
            description={site.articles.description}
            articleCount={all.length}
          />
          <div className="px-2 md:px-5">
            <div className="mx-auto rounded-sheet bg-paper px-5 py-16 md:py-20">
              <ArticleBrowser articles={all} copy={site.articles} />
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

Note : `ArticleBrowser` appelle `useSearchParams`, ce qui exige une frontière `Suspense` au build
statique. Next 16 la fournit implicitement pour un composant client importé par une page statique
**seulement si la page n'est pas pré-rendue en entier** ; en pratique, envelopper l'îlot évite tout
avertissement. Si `pnpm build` signale « useSearchParams() should be wrapped in a suspense
boundary », remplacer `<ArticleBrowser … />` par :

```tsx
import { Suspense } from 'react';
…
              <Suspense fallback={null}>
                <ArticleBrowser articles={all} copy={site.articles} />
              </Suspense>
```

- [ ] **Step 5 : `next.config.ts` — les cinq redirections**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/actualite', destination: '/articles?categorie=actualite', permanent: true },
      { source: '/business', destination: '/articles?categorie=business', permanent: true },
      { source: '/societe', destination: '/articles?categorie=societe', permanent: true },
      { source: '/analyses', destination: '/articles?categorie=analyse', permanent: true },
      { source: '/recherche', destination: '/articles', permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 6 : supprimer les anciennes routes et le composant de page de rubrique**

```bash
cd /home/darellchooks/Documents/cohezi
git rm -rq app/actualite app/business app/societe app/analyses
git rm -q components/sections/category-page.tsx
```

`lib/routes.ts` reste inchangé : `isKnownSection` accepte toujours `actualite`, `business`,
`societe` et `analyses` comme premiers segments, ce qui permet à la route attrape-tout de continuer
à servir `/business/mon-article`. Les redirections ne portent que sur les chemins exacts sans
segment supplémentaire.

- [ ] **Step 7 : vérification complète**

Run : `pnpm test && pnpm typecheck && pnpm lint && pnpm build`
Expected : tests verts, build listant `/`, `/articles`, `/_not-found`, `/api/newsletter` et
`/[...slug]` avec 3 chemins pré-rendus. Les routes `/actualite`, `/business`, `/societe` et
`/analyses` ont disparu de la liste.

```bash
cd /home/darellchooks/Documents/cohezi
if curl -s -o /dev/null http://localhost:3000; then OWN=""; else setsid node_modules/.bin/next start -p 3000 > /tmp/cohezi-server.log 2>&1 < /dev/null & echo $! > /tmp/cohezi-server.pgid; OWN=1; sleep 5; fi
for p in /articles /actualite /business /societe /analyses /recherche; do
  printf "  %-14s %s -> %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)" "$(curl -s -o /dev/null -w '%{redirect_url}' http://localhost:3000$p)"
done
printf "  %-14s %s\n" "/business/x" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/business/x)"
printf "  %-14s %s\n" "/inconnu" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/inconnu)"
[ -n "${OWN:-}" ] && kill -TERM -- "-$(cat /tmp/cohezi-server.pgid)" 2>/dev/null && rm -f /tmp/cohezi-server.pgid || true
```
Expected : `/articles` en 200 ; les cinq anciennes adresses en 308 vers la bonne destination ;
`/business/x` en 200 (page « bientôt disponible ») ; `/inconnu` en 404.

- [ ] **Step 8 : commit**

```bash
git add -A app content next.config.ts components tests docs/superpowers/plans/
git commit -m "feat(cohezi): page /articles unique, recherche, pagination et redirections

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5 : QA visuelle et livraison

**Files:**
- Modify: tout composant dont le rendu s'écarte de la charte ; `docs/superpowers/specs/2026-09-05-cohezi-articles-page-design.md` (statut)

**Interfaces:** aucune nouvelle.

- [ ] **Step 1 : audit statique**

```bash
cd /home/darellchooks/Documents/cohezi
echo "--- couleurs interdites (attendu : aucune sortie) ---"
grep -rnE "bg-white|text-white|border-white|neutral-[0-9]|indigo-|purple-|violet-|-gradient" components app content --include='*.tsx' --include='*.ts' --include='*.css' || echo "  OK"
echo "--- 9 en dur hors lib/search.ts (attendu : aucune sortie) ---"
grep -rn "ARTICLES_PER_PAGE" components app | sed 's|^|  |'
grep -rnE "perPage: 9|, 9\)" components app --include='*.tsx' || echo "  OK"
echo "--- anciennes adresses résiduelles dans le contenu ---"
grep -rnE "href: '/(actualite|business|societe|analyses|recherche)'" content || echo "  OK"
```

- [ ] **Step 2 : captures et mesures**

```bash
cd /home/darellchooks/Documents/cohezi
curl -s -o /dev/null http://localhost:3000 && OWN="" || { setsid node_modules/.bin/next start -p 3000 > /tmp/cohezi-server.log 2>&1 < /dev/null & echo $! > /tmp/cohezi-server.pgid; OWN=1; sleep 5; }
B="$HOME/.claude/skills/gstack/browse/dist/browse"
mkdir -p /tmp/cohezi-qa-articles
for v in 1440x900 375x812; do
  $B viewport "$v" >/dev/null
  P=$([ "$v" = "1440x900" ] && echo d || echo m)
  for url in "/articles" "/articles?categorie=business" "/articles?page=3"; do
    NAME=$(echo "$url" | tr '/?=&' '----')
    $B goto "http://localhost:3000$url" >/dev/null; sleep 0.8
    $B js "document.documentElement.style.scrollBehavior='auto'; window.scrollTo({top:0,behavior:'instant'})" >/dev/null
    $B screenshot --viewport "/tmp/cohezi-qa-articles/$P$NAME.png" >/dev/null
    echo "$P $url : cartes $($B js "document.querySelectorAll('main article').length") | sans débordement $($B js 'document.documentElement.scrollWidth <= window.innerWidth') | résultats « $($B js "document.querySelector('[aria-live=polite]').textContent") »"
  done
done
[ -n "${OWN:-}" ] && kill -TERM -- "-$(cat /tmp/cohezi-server.pgid)" 2>/dev/null && rm -f /tmp/cohezi-server.pgid || true
```

Lire les six PNG et vérifier :
1. **Bandeau** : eyebrow avec carré vert, « ARTICLES » en capitales, description, « 24 articles ».
2. **Recherche** : champ centré, largeur 520 px maximum, loupe à gauche, bordure line.
3. **Onglets** : cinq liens, « Toutes » actif par défaut, la rubrique active en noir sinon.
4. **Ligne de résultats** : au-dessus de la grille, discrète, du type « 8 articles dans Business ».
5. **Grille** : 3 colonnes en desktop, 2 en tablette, 1 en mobile, 9 cartes maximum.
6. **Pagination** : centrée, page courante en noir, flèches aux extrémités, ellipses si nécessaire.
7. **Mobile** : aucun débordement horizontal, onglets et pagination lisibles.

Corriger tout écart, relancer `pnpm build`, recapturer.

- [ ] **Step 3 : parcours fonctionnels**

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
$B viewport 1440x900 >/dev/null
$B goto http://localhost:3000/articles >/dev/null; sleep 0.8
echo "départ : $($B js "document.querySelectorAll('main article').length") cartes"
$B fill 'input[type=search]' "mistral" >/dev/null; sleep 1.2
echo "après recherche : $($B js "document.querySelectorAll('main article').length") cartes | URL $($B url) | ligne « $($B js "document.querySelector('[aria-live=polite]').textContent") »"
$B js "document.querySelector('nav[aria-label=\"Catégories\"] a[href*=\"business\"]').click()" >/dev/null; sleep 1.2
echo "onglet Business : URL $($B url)"
$B goto http://localhost:3000/articles >/dev/null; sleep 0.8
$B js "document.querySelector('nav[aria-label=Pagination] a[href*=\"page=2\"]').click()" >/dev/null; sleep 1.2
echo "page 2 : $($B js "document.querySelectorAll('main article').length") cartes | URL $($B url)"
$B fill 'input[type=search]' "zzzz" >/dev/null; sleep 1.2
echo "aucun résultat : « $($B js "document.querySelector('main p.font-display')?.textContent ?? document.body.innerText.match(/Aucun article[^\\n]*/)?.[0]") »"
$B goto http://localhost:3000 >/dev/null; sleep 0.8
$B js "document.querySelector('nav[aria-label=\"Navigation principale\"] a[href*=\"business\"]').click()" >/dev/null; sleep 1.2
echo "menu -> Business : URL $($B url) | onglet actif $($B js "document.querySelector('nav[aria-label=\"Catégories\"] a[aria-current=page]').textContent")"
```
Expected : la recherche réduit les cartes et écrit `?q=mistral` dans l'URL ; l'onglet Business
conserve la recherche ; la page 2 change les cartes et l'URL ; « zzzz » affiche l'état vide ; le menu
mène à `/articles?categorie=business` avec l'onglet Business actif.

- [ ] **Step 4 : vérification finale, statut de la spec, commit**

```bash
pnpm test && pnpm typecheck && pnpm lint && pnpm build
git status --short
```

Mettre à jour la ligne « Statut » de la spec en :
`- Statut : **implémenté le <date>** (branche `feat/cohezi-articles-page`). Écarts connus : <liste ou aucun>.`

```bash
git add -A
git commit -m "fix(cohezi): ajustements visuels de la page d’articles et spec marquée implémentée

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Rapport de fin attendu : page livrée avec ses trois mécanismes (filtre, recherche, pagination),
nombre de tests, sortie de `pnpm build`, comportement des cinq redirections, écarts restants, et
rappel que la limite de l'approche client est d'environ deux cents articles.
