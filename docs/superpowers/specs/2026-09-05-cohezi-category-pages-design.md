# Spec — Pages de catégorie Cohezi

- Date : 2026-09-05
- Statut : **implémenté le 2026-09-05** (branche `feat/cohezi-category-pages`, plan
  `docs/superpowers/plans/2026-09-05-cohezi-category-pages.md`). Deux écarts par rapport à la spec,
  décidés en QA : `Category` gagne un champ `title` (nom de rubrique au pluriel, « Analyses ») distinct
  de `label` (libellé singulier du badge d'article), utilisé pour le titre de page, les onglets et les
  métadonnées ; les onglets sont compactés sous 768 px (`px-2.5 text-sm`) pour éviter un débordement
  horizontal de 4 px. Les pages d'article restent en « bientôt disponible ».
- Base : site Cohezi issu de la refonte (`docs/superpowers/specs/2026-09-04-cohezi-rebrand-design.md`), `main` à `c2d660d`
- Guide de marque : `cohezi-homepage-spec-corrige.md`

## 1. Contexte et objectif

La page d'accueil Cohezi est livrée. Les entrées de navigation Actualité, Business, Société et
Analyses, ainsi que les boutons « Voir tout » des sections, mènent aujourd'hui à la route
attrape-tout qui affiche « Cette page arrive bientôt ». Ce lot livre les quatre pages de rubrique
correspondantes, en réutilisant les composants et le gabarit de l'accueil.

## 2. Décisions de cadrage

| Question | Décision |
|---|---|
| Périmètre | Les 4 pages de liste seulement. Les pages d'article (`/business/mon-article`) restent en « bientôt disponible » et feront l'objet d'un lot séparé |
| Composition | Bandeau de rubrique, article le plus récent en grand, les autres en grille, bloc newsletter |
| Navigation | Onglets de catégorie sous le bandeau, en plus du menu du header |
| Routage | Quatre routes statiques déléguant à un composant partagé (approche A) |

## 3. Hors périmètre

Pages d'article et modèle de corps de texte, pagination, tri, recherche fonctionnelle, articles
liés, partage social, flux RSS, sous-rubriques, filtrage à l'intérieur d'une rubrique.

## 4. Routage

**Approche retenue.** Quatre routes statiques :

```
app/actualite/page.tsx
app/business/page.tsx
app/societe/page.tsx
app/analyses/page.tsx
```

Chaque fichier exporte ses `metadata` et rend `<CategoryPage slug="…" />`. Les segments statiques
priment sur la route attrape-tout : `/business` est servi par la nouvelle page, `/business/mon-article`
continue de tomber sur `app/[...slug]/page.tsx`.

**Approche écartée.** Un segment dynamique `app/[category]/page.tsx` est impossible : Next refuse
deux noms de segment différents à la même position (`category` contre `slug`) et échoue au build
avec « You cannot use different slug names for the same dynamic path ». Vérifié dans
`node_modules/next/dist/shared/lib/router/utils/sorted-routes.js`.

**Conséquence sur l'attrape-tout.** `site.comingSoon` perd les quatre entrées de catégorie et ne
garde que `a-propos`, `contact` et `recherche`. Les liens d'article restent servis parce que la page
attrape-tout accepte un chemin plus profond dont le premier segment est connu : la liste des
premiers segments acceptés devient `site.comingSoon` plus les slugs de catégorie, exposée par
`lib/routes.ts` (`isKnownSection(segment)`).

## 5. Modèle de contenu

`content/types.ts` : `Category` gagne deux champs.

```ts
export type Category = {
  slug: CategorySlug;
  label: string;
  href: string;
  /** Intitulé de l'eyebrow, ex. « Cohezi / Business ». */
  eyebrow: string;
  /** Chapô de la rubrique, affiché sous le titre du bandeau. */
  description: string;
};
```

`content/categories.ts` renseigne les quatre entrées :

| Slug | Eyebrow | Description |
|---|---|---|
| actualite | Cohezi / Actualité | Ce qui vient de se passer dans l'IA, et pourquoi cela compte. |
| business | Cohezi / Business | Entreprises, financements, marchés et infrastructures de l'IA. |
| societe | Cohezi / Société | Emploi, éducation, santé, culture : ce que l'IA change au quotidien. |
| analyse | Cohezi / Analyses | Décryptages et grilles de lecture pour comprendre les mouvements de fond. |

Les descriptions de Business et Société reprennent volontairement celles des sections de l'accueil,
pour ne pas dédoubler le discours. Aucun nouvel article n'est ajouté.

## 6. Structure de la page

Dans l'ordre, en réutilisant le gabarit de l'accueil :

1. `SiteHeader` inchangé, collant, sombre puis clair au défilement.
2. **Bandeau** (`CategoryHero`), dans un conteneur `page-dark bg-ink` comme le hero de l'accueil :
   eyebrow avec carré vert, titre en Space Grotesk capitales 48 px desktop et 32 px mobile,
   description 18 px, puis le décompte « 8 articles » (singulier « 1 article ») en 12 px capitales
   espacées. Espacements `px-5 pb-16 pt-20 md:pt-24`.
3. **Feuille blanche** `px-2 md:px-5` puis `rounded-sheet bg-paper`, contenant :
   - `CategoryTabs` centrés, marge haute 48 px ;
   - l'article le plus récent en `ArticleCard variant="featured"`, dans un conteneur `max-w-6xl` ;
   - les autres en `ul` grille `md:grid-cols-2 lg:grid-cols-3 gap-5`, cartes `variant="grid"`,
     marge haute 40 px. Contrairement aux grilles de l'accueil, **toutes les cartes sont visibles
     sur mobile** : sur une page de rubrique, masquer des articles n'aurait pas de sens.
   - marges verticales `py-16 md:py-20` comme les sections de l'accueil.
4. `NewsletterCta` inchangé.
5. `SiteFooter` inchangé.

La bascule sombre vers clair au défilement fonctionne sans modification : le bandeau porte la classe
`hero-dark-change` et le conteneur la classe `page-dark`.

## 7. Composants

### `components/ui/category-tabs.tsx`
```ts
CategoryTabs({ activeSlug: CategorySlug })
```
Rend un `<nav aria-label="Catégories">` contenant un lien par catégorie, dans le style visuel de
`Tabs` (conteneur bordé `border-line` rayon 12, padding 4 ; lien actif `bg-ink text-paper`, inactif
`text-ink hover:bg-line/60`, hauteur 33 px, 15 px). Le lien actif porte `aria-current="page"`.
Ce sont des liens et non des boutons : c'est de la navigation, pas un filtre côté client.

### `components/sections/category-hero.tsx`
```ts
CategoryHero({ category: Category; articleCount: number })
```
Bandeau décrit en §6.2. Le décompte est calculé par l'appelant.

### `components/sections/category-page.tsx`
```ts
CategoryPage({ slug: CategorySlug })
```
Server Component. Récupère la catégorie via `categoryBySlug`, les articles via
`byCategory(articles, slug, articles.length)`, sépare le premier (le plus récent) du reste,
et assemble header, bandeau, feuille, newsletter et footer. Si la rubrique est vide, la feuille
affiche « Aucun article pour le moment. » à la place de la une et de la grille.

Note : `byCategory` prend aujourd'hui un `count = 8` par défaut. La page de rubrique doit tout
afficher ; on appelle donc `byCategory(articles, slug, articles.length)`, sans changer la signature.

## 8. Métadonnées

Chaque route exporte :
```ts
export const metadata: Metadata = {
  title: `${category.label} — Cohezi`,
  description: category.description,
};
```
Construites à partir de `categoryBySlug` pour rester synchronisées avec le contenu.

## 9. Accessibilité

Un seul `h1` par page, celui du bandeau. Les titres de carte restent en `h3` ; aucun `h2` n'est
nécessaire puisque la page n'a pas de sections nommées. `CategoryTabs` est un `nav` étiqueté avec
`aria-current="page"` sur la rubrique courante. Contrastes et anneau de focus vert inchangés.

## 10. Tests

- `CategoryTabs` : quatre liens vers les bons chemins, `aria-current` sur la rubrique active,
  classe active sur celle-ci seulement.
- `CategoryHero` : eyebrow, titre, description, décompte au pluriel et au singulier.
- `CategoryPage` : un `h1` au nom de la rubrique, la une est l'article le plus récent, le nombre de
  cartes correspond au nombre d'articles de la rubrique, présence du bloc newsletter et du footer,
  message d'absence quand la rubrique est vide.
- Une vérification par route : `metadata.title` et rendu du bon nom de rubrique.
- `lib/routes.ts` : `isKnownSection` accepte les catégories et les slugs « bientôt disponible »,
  refuse un segment inconnu.
- Attrape-tout : `/business` n'est plus dans `generateStaticParams`, `/business/mon-article` rend
  toujours « Cette page arrive bientôt ».

Vérification finale : `pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build` verts, puis QA
visuelle des quatre pages en 1440 et 375, et contrôle des codes de réponse des routes.

## 11. Risques et notes

- Le décompte d'articles affiché est celui du contenu fictif ; il évoluera avec les vrais articles.
- Analyses ne compte que trois articles : une une et deux cartes en grille, mise en page à vérifier
  visuellement pour éviter un vide disgracieux.
- Les contenus restent fictifs et ne doivent pas être publiés tels quels.
