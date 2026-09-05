# Spec — Page d'articles unique, avec recherche et pagination

- Date : 2026-09-05
- Statut : validé en brainstorming, en attente de relecture avant plan
- Base : `main` à `7adb5ee` (pages de rubrique fusionnées par la PR #1)
- Specs précédentes : `2026-09-04-cohezi-rebrand-design.md`, `2026-09-05-cohezi-category-pages-design.md`
- Guide de marque : `cohezi-homepage-spec-corrige.md`

## 1. Contexte et objectif

Les quatre pages de rubrique livrées par la PR #1 ne diffèrent que par un filtre : même bandeau,
mêmes onglets, même grille, même code. C'est de la duplication. Ce lot les remplace par une page
d'articles unique, `/articles`, qui porte le filtre par rubrique, une recherche et une pagination.

## 2. Décisions de cadrage

| Question | Décision |
|---|---|
| Adresse | `/articles`, état dans l'URL : `?categorie=business&q=openai&page=2` |
| Anciennes routes | `/actualite`, `/business`, `/societe`, `/analyses` et `/recherche` redirigent en 308 |
| Menu du header | Garde ses quatre entrées, pointant vers les adresses filtrées |
| Recherche | Champ dans la page, filtrage instantané sur titre et extrait, sans casse ni accents |
| Pagination | Pages numérotées, 9 articles par page |
| État | Rendu statique de la liste complète, îlot client qui lit et écrit l'URL (approche A) |

## 3. Hors périmètre

Pages d'article, recherche côté serveur ou index externe, tri par pertinence, filtres combinés
multi-rubriques, sauvegarde des recherches, suggestions de complétion, flux RSS.

## 4. Approche retenue et ses limites

**A, retenue.** `app/articles/page.tsx` est un Server Component statique qui passe la liste complète
des articles à `ArticleBrowser`, un composant client. Celui-ci lit `useSearchParams` pour dériver
l'état, filtre et pagine en mémoire, et écrit dans l'URL via `router.replace`. La recherche est donc
instantanée, les adresses sont partageables et la page reste statique.

**Limite assumée.** Les 24 articles voyagent dans le HTML (titre, extrait, date, catégorie, alt),
soit quelques kilo-octets. À partir d'environ deux cents articles, il faudra basculer sur l'approche
B, un rendu serveur par `searchParams`, au prix d'un aller-retour réseau par frappe. Ce seuil est un
repère, pas une règle : le déclencheur réel est le poids du HTML initial.

**B, écartée pour l'instant.** Tout côté serveur : passe à l'échelle, mais rend la page dynamique et
la recherche moins fluide. **C, écartée.** État purement local, sans URL : contredit la décision
d'adresses partageables.

## 5. Routage et redirections

`next.config.ts` déclare cinq redirections permanentes :

| Depuis | Vers |
|---|---|
| `/actualite` | `/articles?categorie=actualite` |
| `/business` | `/articles?categorie=business` |
| `/societe` | `/articles?categorie=societe` |
| `/analyses` | `/articles?categorie=analyse` |
| `/recherche` | `/articles` |

Le paramètre `categorie` porte le **slug de catégorie** (`analyse` au singulier), pas le segment
d'URL (`analyses`). Les redirections sont `permanent: true` (308) : ces adresses ne reviendront pas.

Les chemins d'article comme `/business/mon-article` restent servis par la route attrape-tout, qui
continue d'accepter les segments de rubrique comme premier segment. `lib/routes.ts` est donc
inchangé : `isKnownSection` accepte toujours les segments de rubrique et les pages annoncées.

Note Next : une redirection déclarée dans `next.config.ts` s'applique avant le routage des fichiers.
Comme les quatre dossiers de route sont supprimés, il n'y a de toute façon aucun conflit.

## 6. Contenu

`site.nav` conserve ses quatre entrées, dont les `href` deviennent les adresses filtrées :

```ts
nav: [
  { label: 'Actualité', href: '/articles?categorie=actualite' },
  { label: 'Business', href: '/articles?categorie=business' },
  { label: 'Société', href: '/articles?categorie=societe' },
  { label: 'Analyses', href: '/articles?categorie=analyse' },
],
searchHref: '/articles',
```

Les liens « Voir tout » des sections de l'accueil pointent vers les mêmes adresses filtrées, et le
bouton « Voir toutes les actualités » vers `/articles?categorie=actualite`. Les colonnes du footer
suivent la même règle.

`site` gagne un bloc `articles` pour les textes de la page :

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

`content/types.ts` gagne le type `ArticlesPageCopy` correspondant, ajouté à `SiteConfig`.

## 7. Fonctions pures (`lib/search.ts`)

```ts
/** Minuscules, accents retirés, espaces réduits. */
export function normalize(value: string): string;

/** Articles dont le titre ou l'extrait contient la requête normalisée. Requête vide → tout. */
export function searchArticles(articles: readonly Article[], query: string): Article[];

export type Page<T> = { items: T[]; page: number; pageCount: number; total: number };

/**
 * Découpe en pages de `perPage`. `page` est ramené dans [1, pageCount].
 * Une liste vide donne pageCount 1 et items vide.
 */
export function paginate<T>(items: readonly T[], page: number, perPage: number): Page<T>;
```

`normalize` utilise `String.prototype.normalize('NFD')` puis retire les diacritiques via
`/\p{Diacritic}/gu`. L'ordre d'application est toujours : catégorie, puis recherche, puis pagination.

`ARTICLES_PER_PAGE = 9` est exporté par `lib/search.ts`.

## 8. Composants

### `components/sections/article-browser.tsx` (client)
```ts
ArticleBrowser({ articles: Article[]; copy: ArticlesPageCopy })
```
Lit `useSearchParams` : `categorie` (slug valide, sinon toutes), `q` (texte), `page` (entier ≥ 1,
sinon 1). Dérive la liste visible par catégorie, recherche puis pagination. Le champ de recherche a
un état local pour le texte tapé, répercuté dans l'URL après 250 ms via `router.replace(…, { scroll: false })` ;
tout changement de recherche remet `page` à 1. Rend, dans l'ordre : le champ de recherche, les
onglets, la ligne de résultats, la grille et la pagination.

### `components/ui/category-tabs.tsx` (généralisé)
```ts
CategoryTabs({ activeSlug: CategorySlug | 'all'; allLabel: string; buildHref: (slug: CategorySlug | 'all') => string })
```
Le composant existant est généralisé : il rend cinq liens (Toutes plus les quatre rubriques) et
délègue la construction des adresses à l'appelant, ce qui lui permet de conserver la recherche
courante. `aria-current="page"` sur l'onglet actif, style inchangé.

### `components/ui/search-field.tsx` (client)
```ts
SearchField({ label: string; placeholder: string; value: string; onChange: (value: string) => void })
```
Champ contrôlé, `type="search"`, libellé masqué visuellement, icône loupe à gauche, bouton d'effacement
à droite quand le champ n'est pas vide. Largeur maximale 520 px, centré.

### `components/ui/pagination.tsx`
```ts
Pagination({ page: number; pageCount: number; buildHref: (page: number) => string })
```
Rend un `<nav aria-label="Pagination">` avec Précédent, les numéros et Suivant, en vrais liens. Au-delà
de sept pages, les numéros sont condensés autour de la page courante avec des ellipses. Les extrémités
inactives sont rendues en `<span aria-disabled="true">` plutôt qu'en liens. Rien n'est rendu si
`pageCount` vaut 1.

### `components/sections/category-hero.tsx` (réutilisé)
Signature inchangée, mais la page d'articles lui passe un objet construit à partir de
`site.articles` : le composant reçoit déjà `{ eyebrow, title, description }` via `Category`, donc la
page lui fournit un objet compatible. Pour éviter un type factice, `CategoryHero` est renommé
`SectionHero` et sa prop devient `{ eyebrow: string; title: string; description: string }` plus
`articleCount`, ce qui le découple de `Category`.

## 9. Structure de la page

1. `SiteHeader` inchangé.
2. `SectionHero` dans un conteneur `page-dark bg-ink` : eyebrow, titre « Articles », description,
   décompte total (« 24 articles »).
3. Feuille blanche `px-2 md:px-5` puis `rounded-sheet bg-paper px-5 py-16 md:py-20`, contenant
   `ArticleBrowser` : champ de recherche centré, onglets centrés (marge haute 32 px), ligne de
   résultats (marge haute 24 px, 13 px, `text-ink/60`), grille `md:grid-cols-2 lg:grid-cols-3 gap-5`
   de cartes `variant="grid"` (marge haute 40 px), pagination centrée (marge haute 48 px).
4. `NewsletterCta` inchangé.
5. `SiteFooter` inchangé.

Pas d'article mis en avant : avec un filtre et une recherche, une mise en avant qui change à chaque
frappe n'aurait pas de sens.

**Ligne de résultats.** Trois formulations : « 24 articles » sans filtre ; « 8 articles dans
Business » avec une rubrique ; « 3 articles pour « openai » » avec une recherche ; les deux se
combinent : « 2 articles dans Business pour « openai » ». Le singulier est « 1 article ».

## 10. Cas limites

- **Aucun résultat** : la grille et la pagination laissent place à un bloc centré avec
  `copy.emptyTitle` et un bouton `copy.emptyAction` qui renvoie vers `/articles`.
- **Page hors bornes** : `paginate` ramène dans les bornes ; l'URL n'est pas réécrite, la page
  affichée est simplement la dernière.
- **Catégorie inconnue** dans l'URL : ignorée, équivaut à Toutes.
- **Recherche sans résultat dans une rubrique** : message d'absence, les onglets restent utilisables.

## 11. Suppressions

- Routes `app/actualite/`, `app/business/`, `app/societe/`, `app/analyses/` et leur test
  `tests/app/category-routes.test.tsx`.
- `components/sections/category-page.tsx` et son test.
- `content/categories.ts` conserve `title`, `eyebrow` et `description` : `title` sert aux onglets et
  aux libellés de résultats, `eyebrow` et `description` ne sont plus utilisés par une page de
  rubrique mais restent le vocabulaire de la rubrique. Ils sont conservés, sans test qui les impose.

## 12. Accessibilité

Un seul `h1`, celui du bandeau. Le champ de recherche a un libellé associé, masqué visuellement. La
ligne de résultats est dans une région `aria-live="polite"` pour annoncer le nombre après une
recherche. Les onglets forment un `nav` étiqueté « Catégories » avec `aria-current`. La pagination
est un `nav` étiqueté « Pagination », page courante marquée `aria-current="page"`. Anneau de focus
vert inchangé.

## 13. Tests

- `normalize` : casse, accents, espaces multiples.
- `searchArticles` : titre, extrait, insensible à la casse et aux accents, requête vide, aucun résultat.
- `paginate` : découpe, page hors bornes basse et haute, liste vide, dernière page partielle.
- `SearchField` : rend la valeur, remonte les changements, bouton d'effacement.
- `Pagination` : nombre de liens, page courante marquée, extrémités désactivées, rien si une seule page.
- `CategoryTabs` : cinq liens, adresses construites par `buildHref`, `aria-current`.
- `ArticleBrowser` : état initial lu depuis l'URL, filtre par onglet, recherche instantanée,
  changement de page, remise à la page 1 lors d'une recherche, état vide et bouton de réinitialisation,
  ligne de résultats dans ses quatre formulations.
- Page `/articles` : un `h1`, décompte total, 9 cartes en première page, présence du bloc newsletter.
- Redirections : `next.config.ts` déclare les cinq entrées attendues.

Vérification finale : `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build` verts, contrôle des
codes 308 sur les cinq anciennes adresses, puis QA visuelle en 1440 et 375.

## 14. Risques et notes

- La recherche porte sur le contenu fictif actuel ; les résultats n'ont pas de valeur éditoriale.
- `router.replace` sur chaque frappe débouncée crée une entrée d'historique remplacée, pas empilée :
  le bouton retour ramène à la page précédente, pas à la frappe précédente. C'est le comportement voulu.
- Le décompte du bandeau est le **total du site** (24 articles), fixe : le bandeau est rendu côté
  serveur et ne connaît pas l'état de l'URL, qui est lu par l'îlot client. Le nombre filtré est donné
  par la ligne de résultats, qui se met à jour à chaque frappe.
