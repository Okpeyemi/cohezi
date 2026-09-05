# Pages d'article — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer la page d'article complète pour les 24 articles : en-tête sombre, corps de texte en blocs typés, articles liés, en remplaçant la route attrape-tout par des routes explicites.

**Architecture:** Le modèle de contenu gagne d'abord son union de blocs et les deux sélecteurs purs (Task 1), puis le contenu est scindé par rubrique et chaque article reçoit son corps (Task 2), puis les composants de rendu sont écrits isolément (Task 3), puis la route d'article et les deux routes en attente remplacent l'attrape-tout (Task 4), enfin la QA visuelle (Task 5). Le dépôt reste vert à la fin de chaque tâche.

**Tech Stack:** Next 16.3 (App Router, `generateStaticParams`, `notFound`) · React 19.2 · TypeScript strict · Tailwind CSS 4.3 · Vitest 5 + Testing Library · pnpm.

**Spec:** `docs/superpowers/specs/2026-09-05-cohezi-article-pages-design.md`

## Global Constraints

- Gestionnaire de paquets : **pnpm**. Aucune dépendance ajoutée.
- Branche de travail : `feat/cohezi-article-pages`, créée depuis `feat/cohezi-articles-page` (à `ba8fdfd`), car la PR #2 n'est pas encore fusionnée. La PR de ce lot ciblera `feat/cohezi-articles-page`, ou `main` si la PR #2 est fusionnée entre-temps.
- Palette exclusive : `ink #111111`, `ink-soft #1a1a1a`, `paper #f7f7f4`, `accent #7cff6b`, `accent-deep #123c2a`, `muted #8a8a8a`, `line #e2e2de`, `line-dark #2a2a2a`. **Aucun `bg-white`, `text-white`, `neutral-*` ni dégradé.**
- Vert (`accent`) réservé aux accents : carrés d'eyebrow et de puce, bordure de citation, repère de badge, anneau de focus. Jamais de fond vert plein.
- `font-display` (Space Grotesk) pour le `h1`, les intertitres `h2` et les grands chiffres ; `font-sans` (Inter) partout ailleurs.
- **Aucun HTML brut** : pas de `dangerouslySetInnerHTML`, le corps passe par des composants React.
- Tout texte éditorial vient de `content/*.ts`. Chaînes techniques françaises autorisées dans les composants, et seulement celles-ci : « Fil d’Ariane », « Article », « min de lecture ».
- Apostrophes typographiques `’` et guillemets français `« »` dans tout le contenu et les tests, jamais `'` ni `"` dans une phrase française.
- Le paramètre de route `categorie` porte le **segment d'URL** (`analyses` au pluriel), pas le slug de catégorie (`analyse`).
- Tests dans `tests/`, imports explicites depuis `vitest`. `pnpm test`, `pnpm typecheck` et `pnpm lint` verts à la fin de **chaque** tâche ; `pnpm build` vert à la fin des Tasks 4 et 5.
- Commits : un par tâche, message conventionnel en français, suffixe `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`. Cocher les cases du plan et l'inclure dans le commit.
- Serveur local : ne jamais tuer un processus non lancé par la tâche. Vérifier `curl -s -o /dev/null http://localhost:3000` avant d'en démarrer un ; si le port est pris, utiliser 3100.

---

## Carte des fichiers

| Fichier | Action | Responsabilité | Tâche |
|---|---|---|---|
| `content/types.ts` | modifier | `ArticleBlock`, `Article.body`, `ArticlePageCopy` | 1 |
| `lib/articles.ts` | modifier | `findArticle`, `relatedArticles` | 1 |
| `content/site.ts` | modifier | bloc `article` | 1 |
| `content/articles/actualite.ts`, `business.ts`, `societe.ts`, `analyse.ts`, `index.ts` | créer | contenu par rubrique, corps inclus | 2 |
| `content/articles.ts` | supprimer | remplacé par le dossier | 2 |
| `components/article/article-body.tsx` | créer | rendu des blocs | 3 |
| `components/article/article-header.tsx` | créer | bandeau de l'article | 3 |
| `components/article/related-articles.tsx` | créer | suite de lecture | 3 |
| `components/sections/coming-soon.tsx` | créer | page en attente, extraite de l'attrape-tout | 4 |
| `app/[categorie]/[slug]/page.tsx` | créer | page d'article, 24 pages pré-rendues | 4 |
| `app/a-propos/page.tsx`, `app/contact/page.tsx` | créer | pages en attente | 4 |
| `app/[...slug]/page.tsx`, `lib/routes.ts` | supprimer | remplacés par les routes explicites | 4 |
| — | — | QA visuelle, statut de la spec | 5 |

---

### Task 1 : Modèle de blocs, sélecteurs et textes de page

**Files:**
- Modify: `content/types.ts`, `lib/articles.ts`, `content/site.ts`
- Test: `tests/lib/articles.test.ts`, `tests/content/content.test.ts`

**Interfaces:**
- Produces (types) : `ArticleBlock` (union à cinq variantes), `Article.body: ArticleBlock[]` obligatoire, `ArticlePageCopy { homeLabel: string; relatedTitle: string }`, `SiteConfig.article: ArticlePageCopy`.
- Produces (fonctions) : `findArticle(articles, categorySegment, slug): Article | undefined`, `relatedArticles(articles, current, count = 3): Article[]`.
- État attendu : `pnpm typecheck` **rouge** sur `content/articles.ts`, dont les 24 articles n'ont pas encore de `body` (corrigé en Task 2). Les tests de cette tâche passent ; la suite complète est rouge sur le fichier de contenu.

- [x] **Step 1 : `content/types.ts`**

Avant le type `Article`, ajouter l'union de blocs :

```ts
export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'list'; items: string[] }
  /** Encadré « À retenir » : les points clés de l'article. */
  | { type: 'takeaway'; title: string; items: string[] };
```

Dans `Article`, après `deepDive?: boolean;`, ajouter :

```ts
  /** Corps de l'article, 5 à 8 blocs. */
  body: ArticleBlock[];
```

Avant `SiteConfig`, ajouter :

```ts
export type ArticlePageCopy = {
  homeLabel: string;
  relatedTitle: string;
};
```

Dans `SiteConfig`, après `articles: ArticlesPageCopy;`, ajouter :

```ts
  article: ArticlePageCopy;
```

- [x] **Step 2 : tests des deux sélecteurs, qui échouent**

Ajouter à la fin de `tests/lib/articles.test.ts` (le fichier définit déjà `make`, `a`, `b`, `c`, `d`,
`e`, `f` et `all` ; `make` doit gagner un `body` puisque le champ devient obligatoire) :

D'abord, modifier la fabrique en tête de fichier :

```ts
const make = (slug: string, publishedAt: string, extra: Partial<Article> = {}): Article => ({
  slug,
  title: slug,
  excerpt: 'Un extrait suffisamment long pour ressembler à un vrai chapô d’article.',
  category: 'actualite',
  publishedAt,
  readingMinutes: 5,
  image: { alt: slug },
  body: [{ type: 'paragraph', text: 'Un paragraphe.' }],
  ...extra,
});
```

Puis ajouter les deux `describe` :

```ts
describe('findArticle', () => {
  it('finds an article by its URL segment and slug', () => {
    expect(findArticle(all, 'business', 'b')).toBe(b);
    expect(findArticle(all, 'actualite', 'a')).toBe(a);
  });

  it('matches the plural URL segment of the analyse category', () => {
    expect(findArticle(all, 'analyses', 'd')).toBe(d);
    expect(findArticle(all, 'analyse', 'd')).toBeUndefined();
  });

  it('returns undefined for an unknown segment, an unknown slug or a mismatched pair', () => {
    expect(findArticle(all, 'nimportequoi', 'a')).toBeUndefined();
    expect(findArticle(all, 'actualite', 'inconnu')).toBeUndefined();
    expect(findArticle(all, 'business', 'a')).toBeUndefined();
  });
});

describe('relatedArticles', () => {
  it('returns articles of the same category, newest first, excluding the current one', () => {
    const business = [
      make('b1', '2026-09-05', { category: 'business' }),
      make('b2', '2026-09-04', { category: 'business' }),
      make('b3', '2026-09-03', { category: 'business' }),
      make('b4', '2026-09-02', { category: 'business' }),
    ];
    const [current] = business;
    expect(relatedArticles(business, current!).map((x) => x.slug)).toEqual(['b2', 'b3', 'b4']);
  });

  it('tops up with other categories when the category is too small', () => {
    const result = relatedArticles(all, d!);
    expect(result).toHaveLength(3);
    expect(result).not.toContain(d);
    expect(result[0]!.category).not.toBe('analyse');
  });

  it('honours the count argument', () => {
    expect(relatedArticles(all, a!, 1)).toHaveLength(1);
  });

  it('never returns the current article', () => {
    for (const article of all) {
      expect(relatedArticles(all, article)).not.toContain(article);
    }
  });
});
```

Ajouter `findArticle` et `relatedArticles` à l'import en tête de fichier.

Run : `pnpm test tests/lib/articles.test.ts`
Expected : FAIL — `findArticle` et `relatedArticles` ne sont pas exportés.

- [x] **Step 3 : `lib/articles.ts` — les deux sélecteurs**

Ajouter en tête l'import des catégories, puis les deux fonctions à la fin du fichier :

```ts
import { categories } from '@/content/categories';
```

```ts
/** Retrouve un article par segment d'URL de rubrique (`business`, `analyses`) et slug. */
export function findArticle(
  articles: readonly Article[],
  categorySegment: string,
  slug: string,
): Article | undefined {
  const category = categories.find((item) => item.href.replace('/', '') === categorySegment);
  if (!category) return undefined;
  return articles.find((article) => article.category === category.slug && article.slug === slug);
}

/**
 * Jusqu'à `count` articles à lire ensuite : ceux de la même rubrique d'abord, les plus récents,
 * complétés au besoin par les plus récents des autres rubriques. L'article courant est exclu.
 */
export function relatedArticles(
  articles: readonly Article[],
  current: Article,
  count = 3,
): Article[] {
  const others = sortByDate(articles).filter((article) => article.slug !== current.slug);
  const sameCategory = others.filter((article) => article.category === current.category);
  const rest = others.filter((article) => article.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}
```

Run : `pnpm test tests/lib/articles.test.ts`
Expected : PASS.

- [x] **Step 4 : `content/site.ts` — bloc `article`**

Après le bloc `articles: { … },`, ajouter :

```ts
  article: {
    homeLabel: 'Accueil',
    relatedTitle: 'À lire ensuite',
  },
```

- [x] **Step 5 : test de contenu, puis vérification partielle**

Ajouter à la fin de `tests/content/content.test.ts` :

```ts
describe('article page copy', () => {
  it('carries the breadcrumb and related-articles labels', () => {
    expect(site.article.homeLabel).toBe('Accueil');
    expect(site.article.relatedTitle.length).toBeGreaterThan(0);
  });
});
```

Run : `pnpm test tests/lib/articles.test.ts tests/content/content.test.ts`
Expected : PASS.

Run : `pnpm typecheck`
Expected : **ÉCHEC attendu**, une erreur par article dans `content/articles.ts` : « Property 'body'
is missing ». C'est le point de départ de la Task 2. Ne pas tenter de corriger ici.

- [x] **Step 6 : commit**

```bash
cd /home/darellchooks/Documents/cohezi
git checkout -b feat/cohezi-article-pages
git add -A content lib tests docs/superpowers/plans/
git commit -m "feat(cohezi): blocs d’article, sélecteurs de lecture et textes de page

Le champ body devient obligatoire : typecheck reste rouge sur le contenu
jusqu’à la rédaction des corps (tâche 2).

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2 : Contenu scindé par rubrique et corps rédigés

**Files:**
- Create: `content/articles/actualite.ts`, `content/articles/business.ts`, `content/articles/societe.ts`, `content/articles/analyse.ts`, `content/articles/index.ts`
- Delete: `content/articles.ts`
- Test: `tests/content/content.test.ts`

**Interfaces:**
- Consumes : `Article`, `ArticleBlock`.
- Produces : `articles: Article[]` (24) exporté par `content/articles/index.ts`, donc toujours importable via `@/content/articles`. Chaque fichier de rubrique exporte un tableau nommé : `actualiteArticles`, `businessArticles`, `societeArticles`, `analyseArticles`.
- État attendu : `pnpm typecheck` **vert** à nouveau ; suite complète verte.

- [x] **Step 1 : test de cohérence du contenu, qui échoue**

Ajouter à la fin de `tests/content/content.test.ts` :

```ts
const WORDS_PER_MINUTE = 200;

function bodyWordCount(article: (typeof articles)[number]): number {
  return article.body.reduce((total, block) => {
    const text =
      block.type === 'list' || block.type === 'takeaway' ? block.items.join(' ') : block.text;
    const extra = block.type === 'takeaway' ? block.title : '';
    return total + `${text} ${extra}`.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

describe('article bodies', () => {
  it('gives every article between five and eight blocks', () => {
    for (const article of articles) {
      expect(article.body.length, article.slug).toBeGreaterThanOrEqual(5);
      expect(article.body.length, article.slug).toBeLessThanOrEqual(8);
    }
  });

  it('never opens with a heading, since the excerpt already introduces the piece', () => {
    for (const article of articles) {
      expect(article.body[0]?.type, article.slug).not.toBe('heading');
    }
  });

  it('closes every article with a takeaway box', () => {
    for (const article of articles) {
      const takeaways = article.body.filter((block) => block.type === 'takeaway');
      expect(takeaways.length, article.slug).toBe(1);
      expect(takeaways[0]!.type === 'takeaway' && takeaways[0].items.length, article.slug).toBeGreaterThanOrEqual(2);
    }
  });

  it('keeps the announced reading time within two minutes of the real body length', () => {
    for (const article of articles) {
      const estimated = bodyWordCount(article) / WORDS_PER_MINUTE;
      expect(Math.abs(article.readingMinutes - estimated), `${article.slug} (${estimated.toFixed(1)} min)`).toBeLessThanOrEqual(2);
    }
  });

  it('writes every block with content', () => {
    for (const article of articles) {
      for (const block of article.body) {
        if (block.type === 'list' || block.type === 'takeaway') {
          expect(block.items.length, article.slug).toBeGreaterThan(0);
          for (const item of block.items) expect(item.length, article.slug).toBeGreaterThan(0);
        } else {
          expect(block.text.length, article.slug).toBeGreaterThan(0);
        }
      }
    }
  });
});
```

Run : `pnpm test tests/content/content.test.ts`
Expected : FAIL — les articles n'ont pas de `body`.

- [x] **Step 2 : créer les quatre fichiers de rubrique**

Créer `content/articles/actualite.ts`, `business.ts`, `societe.ts` et `analyse.ts`. Chacun commence par :

```ts
import type { Article } from '../types';
```

et exporte le tableau de sa rubrique. **Reprendre les articles de `content/articles.ts` tels quels,
sans modifier slug, titre, extrait, catégorie, date, temps de lecture, image ni les indicateurs
`featured` et `deepDive`**, et ajouter à chacun un champ `body`.

Répartition : `actualite.ts` reçoit les 5 articles de catégorie `actualite`, `business.ts` les 8
de catégorie `business`, `societe.ts` les 8 de `societe`, `analyse.ts` les 3 de `analyse`.

Le nom du tableau exporté suit la rubrique : `actualiteArticles`, `businessArticles`,
`societeArticles`, `analyseArticles`.

**Gabarit d'un corps.** Cinq à huit blocs, 400 à 600 mots, sans jamais ouvrir par un intertitre,
avec exactement un `takeaway` en dernière position :

```ts
    body: [
      {
        type: 'paragraph',
        text: 'Un paragraphe qui pose le fait : ce qui vient de se passer, quand, et par qui, sans reprendre le chapô mot pour mot.',
      },
      { type: 'heading', text: 'Ce que cela change vraiment' },
      {
        type: 'paragraph',
        text: 'Deux ou trois phrases de contexte : ce qui existait avant, en quoi la situation diffère désormais, et pour qui.',
      },
      {
        type: 'paragraph',
        text: 'Un second paragraphe qui apporte un chiffre, une comparaison ou un précédent, pour ancrer l’analyse.',
      },
      {
        type: 'list',
        items: [
          'Un premier point concret, vérifiable.',
          'Un deuxième point qui éclaire une conséquence.',
          'Un troisième point qui nuance ou tempère.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Le paragraphe de sortie : les échéances, les décisions attendues, les signaux qui diront si la tendance se confirme.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le fait principal, en une ligne.',
          'La conséquence la plus immédiate.',
          'Ce qui reste incertain.',
        ],
      },
    ],
```

Le bloc `quote` remplace utilement la `list` sur les sujets où une déclaration fait l'actualité :

```ts
      {
        type: 'quote',
        text: 'Une phrase courte et marquante, attribuée, qui éclaire le sujet plutôt qu’elle ne le résume.',
        author: 'Prénom Nom, fonction',
      },
```

**Chaque corps doit être écrit spécifiquement pour son article** : le gabarit donne la structure et
le ton, pas le texte. Un corps recopié à l'identique d'un article à l'autre est un échec de la tâche.
Viser 450 à 550 mots, ce qui place le temps de lecture estimé entre 2,2 et 2,8 minutes.

**Attention au temps de lecture.** Le test compare `readingMinutes` à la longueur réelle avec une
tolérance de 2 minutes. Les valeurs actuelles vont de 4 à 9 minutes ; un corps de 500 mots vaut
2,5 minutes estimées, ce qui reste dans la tolérance jusqu'à `readingMinutes` = 4. Pour les articles
dont `readingMinutes` dépasse 4, **ajuster `readingMinutes` à une valeur cohérente avec le corps
écrit** (3, 4 ou 5 selon la longueur), plutôt que d'allonger artificiellement le texte. C'est la
seule modification autorisée aux métadonnées existantes.

- [x] **Step 3 : `content/articles/index.ts`**

```ts
import type { Article } from '../types';
import { actualiteArticles } from './actualite';
import { analyseArticles } from './analyse';
import { businessArticles } from './business';
import { societeArticles } from './societe';

/**
 * Contenu fictif au ton Cohezi : chaque titre dit ce qui s’est passé et pourquoi c’est important,
 * chaque extrait apporte le contexte ou l’impact, chaque corps répond à « ce que cela change » et
 * « ce qu’il faut surveiller ». À remplacer par de vrais articles avant publication.
 *
 * L'ordre de concaténation est sans effet : les sélecteurs de `lib/articles.ts` trient par date.
 */
export const articles: Article[] = [
  ...actualiteArticles,
  ...analyseArticles,
  ...businessArticles,
  ...societeArticles,
];
```

- [x] **Step 4 : supprimer l'ancien fichier et vérifier**

```bash
cd /home/darellchooks/Documents/cohezi
git rm -q content/articles.ts
grep -rn "from '@/content/articles'" app components lib tests --include='*.ts' --include='*.tsx' | wc -l
```
Expected : 10 imports, tous inchangés et résolus vers `content/articles/index.ts`.

Run : `pnpm test && pnpm typecheck && pnpm lint`
Expected : PASS. Si le test du temps de lecture échoue, ajuster `readingMinutes` de l'article
signalé, pas la tolérance du test.

- [x] **Step 5 : commit**

```bash
git add -A content tests docs/superpowers/plans/
git commit -m "feat(cohezi): corps rédigés pour les 24 articles, contenu scindé par rubrique

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3 : Composants de rendu de l'article

**Files:**
- Create: `components/article/article-body.tsx`, `components/article/article-header.tsx`, `components/article/related-articles.tsx`
- Test: `tests/components/article/article-body.test.tsx`, `tests/components/article/article-header.test.tsx`, `tests/components/article/related-articles.test.tsx`

**Interfaces:**
- Consumes : `ArticleBlock`, `Article`, `CategoryBadge`, `ArticleCard` (variante `grid`), `categoryBySlug`, `formatDateFr`, `site.article`.
- Produces : `ArticleBody({ blocks: ArticleBlock[] })`, `ArticleHeader({ article: Article; homeLabel: string })`, `RelatedArticles({ articles: Article[]; title: string })`.

- [x] **Step 1 : tests qui échouent**

`tests/components/article/article-body.test.tsx` :

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleBody } from '@/components/article/article-body';
import type { ArticleBlock } from '@/content/types';

const blocks: ArticleBlock[] = [
  { type: 'paragraph', text: 'Le fait principal.' },
  { type: 'heading', text: 'Ce que cela change' },
  { type: 'quote', text: 'Une déclaration marquante.', author: 'Ada Lovelace, ingénieure' },
  { type: 'list', items: ['Premier point', 'Deuxième point'] },
  { type: 'takeaway', title: 'À retenir', items: ['Un point clé', 'Un autre'] },
];

describe('ArticleBody', () => {
  it('renders each block type in order', () => {
    render(<ArticleBody blocks={blocks} />);
    expect(screen.getByText('Le fait principal.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Ce que cela change' })).toBeInTheDocument();
    const quote = screen.getByText('Une déclaration marquante.').closest('blockquote');
    expect(quote).not.toBeNull();
    expect(within(quote!).getByText(/Ada Lovelace, ingénieure/)).toBeInTheDocument();
    expect(screen.getByText('Premier point')).toBeInTheDocument();
    expect(screen.getByText('À retenir')).toBeInTheDocument();
    expect(screen.getByText('Un point clé')).toBeInTheDocument();
  });

  it('omits the author line when the quote has none', () => {
    render(<ArticleBody blocks={[{ type: 'quote', text: 'Sans auteur.' }]} />);
    const quote = screen.getByText('Sans auteur.').closest('blockquote');
    expect(quote!.textContent).toBe('Sans auteur.');
  });

  it('gives the first block no top margin', () => {
    const { container } = render(<ArticleBody blocks={blocks} />);
    const first = container.querySelector('[data-block]');
    expect(first).toHaveAttribute('data-block', 'paragraph');
    expect(first!.className).not.toMatch(/\bmt-\d/);
  });

  it('renders nothing for an empty body', () => {
    const { container } = render(<ArticleBody blocks={[]} />);
    expect(container.querySelectorAll('[data-block]')).toHaveLength(0);
  });
});
```

`tests/components/article/article-header.test.tsx` :

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleHeader } from '@/components/article/article-header';
import { articles } from '@/content/articles';

const article = articles.find((item) => item.category === 'business')!;

describe('ArticleHeader', () => {
  it('renders the breadcrumb, the badge, the title, the excerpt and the meta line', () => {
    render(<ArticleHeader article={article} homeLabel="Accueil" />);

    const breadcrumb = within(screen.getByRole('navigation', { name: 'Fil d’Ariane' }));
    expect(breadcrumb.getByRole('link', { name: 'Accueil' })).toHaveAttribute('href', '/');
    expect(breadcrumb.getByRole('link', { name: 'Business' })).toHaveAttribute(
      'href',
      '/articles?categorie=business',
    );

    expect(screen.getByText('Business', { selector: 'span' })).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1, name: article.title });
    expect(heading.className).toContain('font-display');
    expect(screen.getByText(article.excerpt)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${article.readingMinutes} min de lecture`))).toBeInTheDocument();
  });
});
```

`tests/components/article/related-articles.test.tsx` :

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RelatedArticles } from '@/components/article/related-articles';
import { articles } from '@/content/articles';

describe('RelatedArticles', () => {
  it('renders a titled section with one card per article', () => {
    render(<RelatedArticles articles={articles.slice(0, 3)} title="À lire ensuite" />);
    expect(screen.getByRole('heading', { level: 2, name: 'À lire ensuite' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('renders nothing when there is no article to suggest', () => {
    const { container } = render(<RelatedArticles articles={[]} title="À lire ensuite" />);
    expect(container).toBeEmptyDOMElement();
  });
});
```

Run : `pnpm test tests/components/article`
Expected : FAIL — les trois modules n'existent pas.

- [x] **Step 2 : `components/article/article-body.tsx`**

```tsx
import type { ArticleBlock } from '@/content/types';
import { cn } from '@/lib/cn';

/** Marge haute d'un bloc selon son type ; le premier bloc n'en a jamais. */
const TOP_MARGIN: Record<ArticleBlock['type'], string> = {
  paragraph: 'mt-6',
  heading: 'mt-12',
  quote: 'mt-8',
  list: 'mt-6',
  takeaway: 'mt-10',
};

function Block({ block, first }: { block: ArticleBlock; first: boolean }) {
  const margin = first ? '' : TOP_MARGIN[block.type];

  switch (block.type) {
    case 'paragraph':
      return (
        <p data-block="paragraph" className={cn('text-lg leading-8 text-ink/85', margin)}>
          {block.text}
        </p>
      );
    case 'heading':
      return (
        <h2 data-block="heading" className={cn('font-display text-2xl font-semibold text-ink', margin)}>
          {block.text}
        </h2>
      );
    case 'quote':
      return (
        <blockquote data-block="quote" className={cn('border-l-2 border-accent pl-5', margin)}>
          <p className="text-xl italic leading-8 text-ink">{block.text}</p>
          {block.author ? <p className="mt-2 text-[13px] not-italic text-ink/60">— {block.author}</p> : null}
        </blockquote>
      );
    case 'list':
      return (
        <ul data-block="list" className={cn('space-y-3', margin)}>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-[30px] text-ink/85">
              <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'takeaway':
      return (
        <aside data-block="takeaway" className={cn('rounded-2xl border border-line bg-ink/[0.03] p-6', margin)}>
          <p className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink">
            <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
            {block.title}
          </p>
          <ul className="mt-4 space-y-2">
            {block.items.map((item) => (
              <li key={item} className="text-base leading-7 text-ink/80">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      );
  }
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="mx-auto max-w-[680px]">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} first={index === 0} />
      ))}
    </div>
  );
}
```

Le `switch` est exhaustif sur l'union : ajouter un type de bloc sans le rendre casse la compilation.

- [x] **Step 3 : `components/article/article-header.tsx`**

```tsx
import Link from 'next/link';
import { CategoryBadge } from '@/components/ui/category-badge';
import { categoryBySlug } from '@/content/categories';
import type { Article } from '@/content/types';
import { formatDateFr } from '@/lib/format-date';

type ArticleHeaderProps = { article: Article; homeLabel: string };

export function ArticleHeader({ article, homeLabel }: ArticleHeaderProps) {
  const category = categoryBySlug[article.category];
  const meta = `${formatDateFr(article.publishedAt)} · ${article.readingMinutes} min de lecture`;

  return (
    <header className="hero-dark-change px-5 pb-16 pt-20 text-center md:pt-24">
      <nav aria-label="Fil d’Ariane" className="mx-auto max-w-[720px]">
        <ol className="flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-paper/60">
          <li>
            <Link href="/" className="transition-colors hover:text-paper">
              {homeLabel}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/articles?categorie=${category.slug}`} className="transition-colors hover:text-paper">
              {category.title}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="mt-8 flex justify-center">
        <CategoryBadge label={category.label} tone="dark" />
      </div>

      <h1 className="mx-auto mt-4 max-w-[720px] font-display text-4xl font-bold uppercase leading-[1.1] tracking-[-0.01em] text-paper md:text-5xl">
        {article.title}
      </h1>
      <p className="mx-auto mt-5 max-w-[620px] text-lg leading-7 text-paper/80">{article.excerpt}</p>
      <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">{meta}</p>
    </header>
  );
}
```

- [x] **Step 4 : `components/article/related-articles.tsx`**

```tsx
import { ArticleCard } from '@/components/cards/article-card';
import type { Article } from '@/content/types';

type RelatedArticlesProps = { articles: Article[]; title: string };

export function RelatedArticles({ articles, title }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="related-title" className="mx-auto mt-16 max-w-6xl border-t border-line pt-16">
      <h2 id="related-title" className="text-center font-display text-2xl font-bold uppercase tracking-[-0.01em] text-ink">
        {title}
      </h2>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} variant="grid" />
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [x] **Step 5 : vérifier et commiter**

Run : `pnpm test && pnpm typecheck && pnpm lint`
Expected : PASS.

```bash
git add -A components tests docs/superpowers/plans/
git commit -m "feat(cohezi): en-tête, corps et suite de lecture de l’article

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4 : Route d'article, pages en attente et suppression de l'attrape-tout

**Files:**
- Create: `app/[categorie]/[slug]/page.tsx`, `app/a-propos/page.tsx`, `app/contact/page.tsx`, `components/sections/coming-soon.tsx`
- Delete: `app/[...slug]/page.tsx`, `lib/routes.ts`, `tests/lib/routes.test.ts`, `tests/app/coming-soon.test.tsx`
- Test: `tests/app/article-page.test.tsx`, `tests/app/static-pages.test.tsx`

**Interfaces:**
- Consumes : `ArticleHeader`, `ArticleBody`, `RelatedArticles`, `findArticle`, `relatedArticles`, `articles`, `site`, `categories`.
- Produces : route `/[categorie]/[slug]` avec `generateStaticParams` (24 entrées) et `generateMetadata` ; `ComingSoon({ label })` ; routes `/a-propos` et `/contact`.

- [x] **Step 1 : tests qui échouent**

`tests/app/article-page.test.tsx` :

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ArticlePage, { generateMetadata, generateStaticParams } from '@/app/[categorie]/[slug]/page';
import { articles } from '@/content/articles';

const article = articles.find((item) => item.category === 'business')!;
const params = { categorie: 'business', slug: article.slug };

describe('ArticlePage', () => {
  it('pre-renders one path per article, using the URL segment of its category', () => {
    const generated = generateStaticParams();
    expect(generated).toHaveLength(articles.length);
    expect(generated).toContainEqual(params);
    const analysis = articles.find((item) => item.category === 'analyse')!;
    expect(generated).toContainEqual({ categorie: 'analyses', slug: analysis.slug });
  });

  it('describes the article in its metadata', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve(params) });
    expect(metadata.title).toBe(`${article.title} — Cohezi`);
    expect(metadata.description).toBe(article.excerpt);
  });

  it('renders the header, the body and the related articles', async () => {
    render(await ArticlePage({ params: Promise.resolve(params) }));

    expect(screen.getByRole('heading', { level: 1, name: article.title })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Fil d’Ariane' })).toBeInTheDocument();
    const firstBlock = article.body[0]!;
    if (firstBlock.type === 'paragraph') expect(screen.getByText(firstBlock.text)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'À lire ensuite' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
```

`tests/app/static-pages.test.tsx` :

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AProposPage, { metadata as aProposMetadata } from '@/app/a-propos/page';
import ContactPage, { metadata as contactMetadata } from '@/app/contact/page';

describe('pages still to come', () => {
  it('renders the À propos placeholder', () => {
    expect(aProposMetadata.title).toBe('À propos — Bientôt disponible');
    render(<AProposPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'À propos' })).toBeInTheDocument();
    expect(screen.getByText('Cette page arrive bientôt.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Retour à l’accueil/ })).toHaveAttribute('href', '/');
  });

  it('renders the Contact placeholder', () => {
    expect(contactMetadata.title).toBe('Contact — Bientôt disponible');
    render(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Contact' })).toBeInTheDocument();
  });
});
```

Run : `pnpm test tests/app/article-page.test.tsx tests/app/static-pages.test.tsx`
Expected : FAIL — les routes n'existent pas.

- [x] **Step 2 : `components/sections/coming-soon.tsx`**

```tsx
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { site } from '@/content/site';

/** Page annoncée mais pas encore écrite. */
export function ComingSoon({ label }: { label: string }) {
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
          {label}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-[-0.01em] md:text-6xl">{label}</h1>
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

- [x] **Step 3 : les deux routes en attente**

`app/a-propos/page.tsx` :
```tsx
import type { Metadata } from 'next';
import { ComingSoon } from '@/components/sections/coming-soon';
import { site } from '@/content/site';

const page = site.comingSoon.find((item) => item.slug === 'a-propos')!;

export const metadata: Metadata = { title: `${page.label} — Bientôt disponible` };

export default function Page() {
  return <ComingSoon label={page.label} />;
}
```

`app/contact/page.tsx` :
```tsx
import type { Metadata } from 'next';
import { ComingSoon } from '@/components/sections/coming-soon';
import { site } from '@/content/site';

const page = site.comingSoon.find((item) => item.slug === 'contact')!;

export const metadata: Metadata = { title: `${page.label} — Bientôt disponible` };

export default function Page() {
  return <ComingSoon label={page.label} />;
}
```

- [x] **Step 4 : `app/[categorie]/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/article/article-body';
import { ArticleHeader } from '@/components/article/article-header';
import { RelatedArticles } from '@/components/article/related-articles';
import { HeroLightSwitch } from '@/components/layout/hero-light-switch';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { NewsletterCta } from '@/components/sections/newsletter-cta';
import { articles } from '@/content/articles';
import { categoryBySlug } from '@/content/categories';
import { site } from '@/content/site';
import { findArticle, relatedArticles } from '@/lib/articles';

type ArticlePageProps = { params: Promise<{ categorie: string; slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({
    categorie: categoryBySlug[article.category].href.replace('/', ''),
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { categorie, slug } = await params;
  const article = findArticle(articles, categorie, slug);
  if (!article) return { title: 'Article introuvable — Cohezi' };
  return { title: `${article.title} — Cohezi`, description: article.excerpt };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { categorie, slug } = await params;
  const article = findArticle(articles, categorie, slug);
  if (!article) notFound();

  const related = relatedArticles(articles, article);

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
          <ArticleHeader article={article} homeLabel={site.article.homeLabel} />
          <div className="px-2 md:px-5">
            <article className="mx-auto rounded-sheet bg-paper px-5 py-16 md:py-20">
              <ArticleBody blocks={article.body} />
              <RelatedArticles articles={related} title={site.article.relatedTitle} />
            </article>
          </div>
          <NewsletterCta copy={site.newsletter} />
        </div>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
```

- [x] **Step 5 : supprimer l'attrape-tout et son helper**

```bash
cd /home/darellchooks/Documents/cohezi
git rm -rq 'app/[...slug]'
git rm -q lib/routes.ts tests/lib/routes.test.ts tests/app/coming-soon.test.tsx
grep -rn "isKnownSection\|@/lib/routes" app components lib tests --include='*.ts' --include='*.tsx' || echo "aucune référence résiduelle"
```

- [x] **Step 6 : vérification complète et routes servies**

Run : `pnpm test && pnpm typecheck && pnpm lint && pnpm build`
Expected : tests verts ; build listant `/`, `/articles`, `/a-propos`, `/contact`, `/_not-found`,
`/api/newsletter` et `/[categorie]/[slug]` avec **24 chemins pré-rendus**.

```bash
cd /home/darellchooks/Documents/cohezi
PORT=3000; curl -s -o /dev/null http://localhost:3000 && PORT=3100
setsid node_modules/.bin/next start -p $PORT > /tmp/cohezi-art.log 2>&1 < /dev/null & echo $! > /tmp/cohezi-art.pgid
sleep 6
for p in / /articles /business/mistral-leve-3-milliards-d-euros /analyses/les-agents-ia-vont-ils-faire-disparaitre-les-applications /a-propos /contact /business/inconnu /inconnu; do
  printf "  %-64s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT$p)"
done
kill -TERM -- "-$(cat /tmp/cohezi-art.pgid)" 2>/dev/null; rm -f /tmp/cohezi-art.pgid
```
Expected : `/`, `/articles`, les deux articles, `/a-propos` et `/contact` en 200 ;
`/business/inconnu` et `/inconnu` en **404**.

- [x] **Step 7 : commit**

```bash
git add -A app components lib tests docs/superpowers/plans/
git commit -m "feat(cohezi): pages d’article et routes explicites à la place de l’attrape-tout

24 articles pré-rendus sur /[categorie]/[slug]. /a-propos et /contact deviennent
des routes statiques ; une adresse d’article inexistante renvoie désormais 404.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5 : QA visuelle et livraison

**Files:**
- Modify: tout composant dont le rendu s'écarte de la charte ; `docs/superpowers/specs/2026-09-05-cohezi-article-pages-design.md` (statut)

**Interfaces:** aucune nouvelle.

- [x] **Step 1 : audit statique**

```bash
cd /home/darellchooks/Documents/cohezi
echo "--- couleurs interdites ---"
grep -rnE "bg-white|text-white|border-white|neutral-[0-9]|indigo-|purple-|violet-|-gradient" components app content --include='*.tsx' --include='*.ts' --include='*.css' || echo "  OK"
echo "--- HTML brut (attendu : aucune sortie) ---"
grep -rn "dangerouslySetInnerHTML" components app || echo "  OK"
echo "--- un seul h1 sur la page d’article ---"
grep -c "<h1" components/article/article-header.tsx components/sections/coming-soon.tsx
echo "--- corps recopiés d’un article à l’autre (attendu : 0) ---"
python3 - <<'DUPES'
import re, glob, collections
texts = []
for path in sorted(glob.glob('content/articles/*.ts')):
    for m in re.finditer(r"text:\s*'([^']{60,})'", open(path).read()):
        texts.append(m.group(1)[:80])
dupes = [t for t, n in collections.Counter(texts).items() if n > 1]
print('  paragraphes dupliqués :', len(dupes))
for d in dupes[:3]:
    print('   ', d)
DUPES
```

- [x] **Step 2 : captures d'un article en 1440 et 375**

```bash
cd /home/darellchooks/Documents/cohezi
PORT=3000; curl -s -o /dev/null http://localhost:3000 || { setsid node_modules/.bin/next start -p 3100 > /tmp/cohezi-art.log 2>&1 < /dev/null & echo $! > /tmp/cohezi-art.pgid; PORT=3100; sleep 6; }
B="$HOME/.claude/skills/gstack/browse/dist/browse"
mkdir -p /tmp/cohezi-qa-article
URL="/analyses/les-agents-ia-vont-ils-faire-disparaitre-les-applications"
for v in 1440x900 375x812; do
  $B viewport "$v" >/dev/null
  P=$([ "$v" = "1440x900" ] && echo d || echo m)
  $B goto "http://localhost:$PORT$URL" >/dev/null; sleep 0.9
  $B js "document.documentElement.style.scrollBehavior='auto'; window.scrollTo({top:0,behavior:'instant'})" >/dev/null
  $B screenshot --viewport "/tmp/cohezi-qa-article/$P-header.png" >/dev/null
  $B js "document.documentElement.style.scrollBehavior='auto'; const b=document.querySelector('[data-block=takeaway]'); window.scrollTo({top: b.getBoundingClientRect().top + window.scrollY - 300, behavior:'instant'})" >/dev/null; sleep 0.4
  $B screenshot --viewport "/tmp/cohezi-qa-article/$P-body.png" >/dev/null
  echo "$P : blocs $($B js "document.querySelectorAll('[data-block]').length") | largeur corps $($B js "Math.round(document.querySelector('[data-block]').getBoundingClientRect().width)") | sans débordement $($B js 'document.documentElement.scrollWidth <= window.innerWidth')"
done
[ -f /tmp/cohezi-art.pgid ] && kill -TERM -- "-$(cat /tmp/cohezi-art.pgid)" 2>/dev/null && rm -f /tmp/cohezi-art.pgid || true
```

Lire les quatre PNG et vérifier :
1. **Fil d'Ariane** : « Accueil / Analyses » en capitales discrètes, les deux liens cliquables.
2. **En-tête** : badge de catégorie, titre en capitales Space Grotesk, chapô, date et temps de lecture.
3. **Corps** : colonne d'environ 680 px en desktop, texte 18 px confortable, intertitres nettement
   détachés, citation avec filet vert à gauche, listes à puces carrées vertes.
4. **Encadré « À retenir »** : fond très légèrement teinté, bordure line, titre en capitales avec
   carré vert.
5. **Articles liés** : filet de séparation, titre centré, trois cartes en grille.
6. **Mobile** : une colonne, aucun débordement horizontal, corps lisible sans zoom.

Corriger tout écart dans les composants, relancer `pnpm build`, recapturer.

- [x] **Step 3 : parcours de navigation**

```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
PORT=3000
$B viewport 1440x900 >/dev/null
$B goto "http://localhost:$PORT/articles" >/dev/null; sleep 0.9
$B js "document.querySelector('main article a').click()" >/dev/null; sleep 1.4
echo "liste -> article : $($B js "document.querySelector('main h1').textContent") | URL $($B url)"
$B js "document.querySelector('nav[aria-label=\"Fil d’Ariane\"] a[href*=categorie]').click()" >/dev/null; sleep 1.4
echo "fil d’Ariane -> rubrique : URL $($B url)"
$B goto "http://localhost:$PORT/articles" >/dev/null; sleep 0.9
$B js "document.querySelector('main article a').click()" >/dev/null; sleep 1.4
$B js "document.querySelector('section[aria-labelledby=related-title] a').click()" >/dev/null; sleep 1.4
echo "article -> article lié : $($B js "document.querySelector('main h1').textContent")"
echo "erreurs console : $($B console --errors | grep -ci 'error')"
```
Expected : la carte mène à l'article, le fil d'Ariane ramène à la liste filtrée, un article lié ouvre
un autre article, aucune erreur console.

- [x] **Step 4 : vérification finale, statut de la spec, commit**

```bash
pnpm test && pnpm typecheck && pnpm lint && pnpm build
git status --short
```

Mettre à jour la ligne « Statut » de la spec en :
`- Statut : **implémenté le <date>** (branche `feat/cohezi-article-pages`). Écarts connus : <liste ou aucun>.`

```bash
git add -A
git commit -m "fix(cohezi): ajustements visuels des pages d’article et spec marquée implémentée

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

Rapport de fin attendu : 24 pages d'article livrées, nombre de tests, sortie de `pnpm build`, codes
de réponse des routes dont le nouveau 404 sur un article inexistant, écarts restants, et rappel que
les corps sont fictifs.
