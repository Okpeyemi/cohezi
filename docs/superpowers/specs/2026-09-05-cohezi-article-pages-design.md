# Spec — Pages d'article et corps de texte

- Date : 2026-09-05
- Statut : **implémenté le 2026-09-05** (branche `feat/cohezi-article-pages`). Écarts connus : corps d’environ 240 mots au lieu des 400-600 prévus, `readingMinutes` recalculé à 2 pour tous les articles ; la typographie française n’utilise pas l’espace fine insécable avant `? ! ; :`.
- Base : branche `feat/cohezi-articles-page` à `f7b93f8` (PR #2 ouverte)
- Specs précédentes : `2026-09-04-cohezi-rebrand-design.md`, `2026-09-05-cohezi-category-pages-design.md`, `2026-09-05-cohezi-articles-page-design.md`
- Guide de marque : `cohezi-homepage-spec-corrige.md`

## 1. Contexte et objectif

Toutes les cartes du site mènent à `/business/mon-article` ou équivalent, qui affiche « Cette page
arrive bientôt ». Ce lot livre la vraie page d'article : en-tête, corps de texte mis en forme,
articles liés. Les 24 articles existants reçoivent un corps rédigé, de sorte qu'aucun lien du site
ne mène plus à une impasse.

## 2. Décisions de cadrage

| Question | Décision |
|---|---|
| Périmètre | Page d'article complète, pour les 24 articles |
| Corps de texte | Blocs typés dans les fichiers de contenu, pas de Markdown ni de HTML brut |
| Volume | Les 24 articles, corps courts de 400 à 600 mots, 5 à 8 blocs |
| Enveloppe | En-tête sombre, corps, trois articles liés, bloc newsletter, footer |
| Routage | Route `app/[categorie]/[slug]/page.tsx`, suppression de l'attrape-tout (approche A) |

## 3. Hors périmètre

Vrais contenus éditoriaux, CMS ou fichiers Markdown, images réelles dans le corps, partage social,
commentaires, sommaire latéral, articles précédent et suivant, temps de lecture calculé
automatiquement, fil RSS.

## 4. Routage

**Approche retenue.** Trois routes explicites remplacent la route attrape-tout :

```
app/[categorie]/[slug]/page.tsx    les 24 articles, pré-rendus
app/a-propos/page.tsx              page en attente
app/contact/page.tsx               page en attente
```

`app/[...slug]/page.tsx` est supprimé. Une adresse inconnue tombe alors sur `app/not-found.tsx`,
la page 404 déjà en place.

**Pourquoi supprimer l'attrape-tout.** Next refuse deux noms de segment différents à la même
position et lève « You cannot use different slug names for the same dynamic path » (vérifié dans
`node_modules/next/dist/shared/lib/router/utils/sorted-routes.js`). `[categorie]` ne peut donc pas
cohabiter avec `[...slug]` à la racine. L'attrape-tout n'existait que pour servir deux pages en
attente : en faire deux routes statiques est plus simple que de contourner la contrainte.

**Précédence.** Les segments statiques priment sur les segments dynamiques : `/articles`,
`/a-propos` et `/contact` restent servis par leurs propres routes, jamais par `[categorie]`.

**Conséquences.** `lib/routes.ts` (`isKnownSection`) et son test disparaissent, plus aucun appelant.
`site.comingSoon` est conservé : il fournit les libellés des deux pages en attente.

**Adresse d'un article.** Inchangée, `articleHref` continue de produire
`{category.href}/{article.slug}`, par exemple `/business/mistral-leve-3-milliards-d-euros`. Le champ
`Category.href` garde donc son rôle de préfixe, tel que déjà documenté dans `content/types.ts`.

## 5. Modèle de contenu

`content/types.ts` gagne l'union de blocs et un champ obligatoire sur `Article` :

```ts
export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'list'; items: string[] }
  /** Encadré « À retenir » : les points clés de l'article. */
  | { type: 'takeaway'; title: string; items: string[] };

export type Article = {
  // … champs existants inchangés …
  /** Corps de l'article, 5 à 8 blocs. */
  body: ArticleBlock[];
};
```

Le champ est **obligatoire** : la compilation garantit qu'aucun article n'est publié sans corps.
Aucun bloc n'accepte de HTML : le rendu passe par des composants React, jamais par
`dangerouslySetInnerHTML`.

## 6. Découpage des fichiers de contenu

Avec les corps, `content/articles.ts` dépasserait 900 lignes. Il est scindé par rubrique :

```
content/articles/actualite.ts   5 articles
content/articles/business.ts    8 articles
content/articles/societe.ts     8 articles
content/articles/analyse.ts     3 articles
content/articles/index.ts       concatène les quatre, dans l'ordre actualité, analyse, business, société
```

`content/articles.ts` est supprimé. **Tous les imports existants (`@/content/articles`) continuent
de fonctionner sans modification** : Node et le résolveur de Next résolvent `@/content/articles` vers
`content/articles/index.ts`. Aucun appelant ne change.

L'ordre de concaténation n'a pas d'importance fonctionnelle : `sortByDate`, `latest` et `byCategory`
trient déjà par date. Il est fixé pour rendre les diffs lisibles.

## 7. Contenu des corps

Chaque article reçoit 5 à 8 blocs, 400 à 600 mots, au ton Cohezi : ce qui s'est passé, pourquoi
c'est important, ce que cela change, ce qu'il faut surveiller. Trame type :

1. un paragraphe qui pose le fait,
2. un intertitre puis deux paragraphes de contexte,
3. une citation ou une liste selon le sujet,
4. un intertitre puis un paragraphe sur les conséquences,
5. un encadré « À retenir » de trois points.

Le premier bloc n'est jamais un intertitre : le chapô de l'en-tête joue déjà ce rôle. Les textes
restent fictifs et sont à remplacer avant publication, comme le reste du contenu actuel.

## 8. Composants

### `components/article/article-header.tsx`
```ts
ArticleHeader({ article: Article })
```
Bandeau sombre, même gabarit que `SectionHero` : conteneur `page-dark bg-ink`, classe
`hero-dark-change`, `px-5 pb-16 pt-20 md:pt-24`, contenu centré `max-w-[720px]`.
Contient, dans l'ordre : un fil d'Ariane (« Accueil » puis le nom de la rubrique, liens vers `/` et
`/articles?categorie=<slug>`), le `CategoryBadge` en ton sombre, le `h1` en Space Grotesk capitales
36 px mobile et 48 px desktop, le chapô (`excerpt`) en 18 px paper 80 %, et la ligne
« 2 septembre 2026 · 6 min de lecture » en 12 px capitales espacées.

### `components/article/article-body.tsx`
```ts
ArticleBody({ blocks: ArticleBlock[] })
```
Rend l'union de blocs dans un `<div className="mx-auto max-w-[680px]">` :
- `paragraph` : `<p>` 18 px, interligne 32 px, `text-ink/85`, marge haute 24 px.
- `heading` : `<h2>` Space Grotesk 600, 24 px, `text-ink`, marge haute 48 px.
- `quote` : `<blockquote>` bordure gauche 2 px `accent`, retrait 20 px, texte 20 px italique
  `text-ink`, auteur en 13 px `text-ink/60` précédé d'un tiret cadratin quand il est fourni.
- `list` : `<ul>` à puces carrées vertes 6 px, éléments 18 px interligne 30 px, espacement 12 px.
- `takeaway` : encadré `rounded-2xl border border-line bg-ink/[0.03] p-6`, titre en capitales 12 px
  espacées précédé d'un carré vert, puis la liste des points en 16 px.

Le premier bloc n'a pas de marge haute, quel que soit son type.

### `components/article/related-articles.tsx`
```ts
RelatedArticles({ articles: Article[]; title: string })
```
Rendu seulement si la liste n'est pas vide. Titre de section `h2` en capitales, puis grille
`md:grid-cols-3 gap-5` de `ArticleCard variant="grid"`. Placé dans la feuille blanche, sous le corps,
séparé par un filet `border-t border-line` et 64 px d'espace.

### `components/sections/coming-soon.tsx`
```ts
ComingSoon({ label: string })
```
Extrait tel quel du corps de l'ancienne route attrape-tout : en-tête, titre, « Cette page arrive
bientôt. », bouton de retour. Utilisé par `/a-propos` et `/contact`.

## 9. Fonctions pures (`lib/articles.ts`)

```ts
/** Retrouve un article par segment de rubrique et slug. `undefined` si l'un des deux ne correspond pas. */
export function findArticle(
  articles: readonly Article[],
  categorySegment: string,
  slug: string,
): Article | undefined;

/** Jusqu'à `count` articles de la même rubrique, les plus récents d'abord, l'article courant exclu. */
export function relatedArticles(
  articles: readonly Article[],
  current: Article,
  count?: number,
): Article[];
```

`findArticle` compare le segment d'URL au `href` de la rubrique (`/business` → `business`), pas au
slug de catégorie : `analyses` dans l'URL correspond à la rubrique de slug `analyse`.
`relatedArticles` prend `count = 3` par défaut et complète, si la rubrique est trop petite, avec les
articles les plus récents des autres rubriques, pour toujours proposer trois lectures.

## 10. Page d'article

`app/[categorie]/[slug]/page.tsx`, Server Component asynchrone :

- `generateStaticParams` renvoie une entrée par article, `{ categorie: <segment>, slug: <slug> }`,
  soit 24 pages pré-rendues.
- `generateMetadata` : titre `<titre de l'article> — Cohezi`, description = `excerpt`.
- Le composant `await params`, appelle `findArticle`, et `notFound()` si rien ne correspond.
- Structure : `SiteHeader`, puis conteneur `page-dark bg-ink` contenant `ArticleHeader`, puis la
  feuille blanche `rounded-sheet bg-paper px-5 py-16 md:py-20` contenant `ArticleBody` et
  `RelatedArticles`, puis `NewsletterCta`, puis `SiteFooter`. `HeroLightSwitch` est monté comme sur
  les autres pages.

## 11. Contenu de `site`

`site` gagne un bloc `article` :

```ts
article: {
  homeLabel: 'Accueil',
  relatedTitle: 'À lire ensuite',
},
```

`content/types.ts` gagne le type `ArticlePageCopy` correspondant, ajouté à `SiteConfig`.

L'intitulé de l'encadré « À retenir » n'est pas ici : le bloc `takeaway` porte son propre `title`,
obligatoire, ce qui permet de l'adapter à chaque article (« À retenir », « Ce qui change », « Ce
qu'il faut surveiller »).

## 12. Accessibilité

Un seul `h1` par page, celui de l'en-tête. Les intertitres du corps sont des `h2`, le titre des
articles liés aussi ; les titres de carte restent des `h3`, la hiérarchie est donc continue. Le fil
d'Ariane est un `<nav aria-label="Fil d’Ariane">` contenant une liste ordonnée, le dernier élément
sans lien. Le corps est dans un `<article>`. Contrastes et anneau de focus vert inchangés.

## 13. Tests

- `findArticle` : trouve par segment et slug, gère `analyses` contre `analyse`, renvoie `undefined`
  pour une rubrique inconnue, un slug inconnu, ou une paire incohérente (bon slug, mauvaise rubrique).
- `relatedArticles` : trois articles de la même rubrique, l'article courant exclu, complète avec
  d'autres rubriques si nécessaire, respecte `count`.
- `ArticleBody` : rend chacun des cinq types de bloc, dans l'ordre, sans marge haute sur le premier.
- `ArticleHeader` : fil d'Ariane, badge, `h1`, chapô, date et temps de lecture au format français.
- `RelatedArticles` : trois cartes, rien si la liste est vide.
- `ComingSoon` : titre et message.
- Page d'article : `generateStaticParams` renvoie 24 entrées, le rendu d'un article donné affiche son
  titre et son premier paragraphe, `generateMetadata` porte le bon titre.
- Contenu : chaque article a entre 5 et 8 blocs, ne commence pas par un intertitre, contient au moins
  un `takeaway`, et son `readingMinutes` correspond à la longueur du corps à ±2 minutes près sur la
  base de 200 mots par minute.
- Les tests de `lib/routes.ts` et de l'attrape-tout sont supprimés avec le code qu'ils couvraient.

Vérification finale : `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build` verts, 24 pages
d'article pré-rendues au build, contrôle des codes de réponse, puis QA visuelle en 1440 et 375.

## 14. Risques et notes

- Les corps sont fictifs : ils illustrent la mise en page, ils ne doivent pas être publiés tels quels.
- Le temps de lecture reste une donnée saisie ; le test de cohérence empêche seulement qu'il dérive
  franchement de la longueur réelle.
- Supprimer l'attrape-tout change le comportement des adresses inconnues à deux segments :
  `/business/nimporte-quoi` renvoyait 200 avec « bientôt disponible », il renverra 404. C'est le
  comportement correct pour un article qui n'existe pas.
