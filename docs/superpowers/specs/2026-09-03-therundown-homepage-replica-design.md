# Spec — Réplique de la page d'accueil therundown.ai en Next.js

- Date : 2026-09-03
- Statut : validé en brainstorming, en attente de relecture avant plan
- Projet : `cohezi` (dépôt vide au départ, hors captures de référence)

## 1. Contexte et objectif

Reproduire fidèlement la page d'accueil de https://www.therundown.ai/ en Next.js, comme base
technique et visuelle du futur site Cohezi. Le contenu est celui du site d'origine, mais il vit
entièrement dans des fichiers de données typés pour que le rebranding se fasse sans toucher aux
composants. Les visuels d'origine ne sont pas copiés : des placeholders générés les remplacent.

Références : `screenshots/therundown-ai/` (pleines pages 1440/1280/768/375 et découpe par
section dans `sections/desktop` et `sections/mobile`, index dans `sections/README.md`) et
`docs/superpowers/specs/2026-09-03-therundown-reference-content.json` (contenu texte extrait du
site réel le 2026-09-03).

## 2. Décisions de cadrage

| Question | Décision |
|---|---|
| Objectif | Réplique fidèle, contenu dans `content/*.ts` typés |
| Périmètre | Page d'accueil seule, 8 sections ; les liens de nav mènent à une page « à venir » |
| Interactivité | Onglets et puces filtrent réellement côté client ; newsletter validée et simulée par une route API ; menu mobile fonctionnel |
| Images | Placeholders SVG générés, logos en wordmarks texte ; champ `image.src` optionnel pour brancher les vrais visuels |
| Approche | A : Next 16 + Tailwind v4 + composants maison, sans shadcn |

## 3. Hors périmètre

Pages de liste et de détail, CMS, fournisseur newsletter réel, analytics, SEO avancé (au-delà
des métadonnées de base), i18n, mode sombre commutable (le site est en thème fixe), lecteur
podcast embarqué (remplacé par une carte statique), animations au scroll.

## 4. Stack et versions

| Paquet | Version cible | Rôle |
|---|---|---|
| next | ^16.3.4 | App Router, Server Components, route API |
| react / react-dom | ^19.2 | UI |
| typescript | ^5 | strict, `noUncheckedIndexedAccess` |
| tailwindcss + @tailwindcss/postcss | ^4.3 | styles, tokens via `@theme` |
| @hugeicons/react | ^1.1.10 | composant `HugeiconsIcon` |
| @hugeicons/core-free-icons | ^4.3.0 | jeu d'icônes gratuit (noms vérifiés sur cette version) |
| clsx + tailwind-merge | latest | utilitaire `cn` |
| vitest, @vitejs/plugin-react, jsdom | latest | tests unitaires et composants |
| @testing-library/react, @testing-library/jest-dom, @testing-library/user-event | latest | tests de rendu et d'interaction |

Gestionnaire de paquets : pnpm (comme chatbot-ui). Node 22.

Police : **Satoshi** (Indian Type Foundry, licence Fontshare gratuite), fichiers woff2 auto-hébergés
dans `public/fonts/satoshi/` et chargés par `next/font/local`, graisses 400/500/700, exposée en
`--font-sans`. Repli si le téléchargement échoue : `Instrument Sans` via `next/font/google`, même
variable. Le reste du site ne dépend que de la variable.

Règle de projet héritée de chatbot-ui : cette version de Next a des changements de rupture.
Avant d'écrire du code Next, lire les guides dans `node_modules/next/dist/docs/` (installés avec
le paquet) et respecter les avertissements de dépréciation.

## 5. Structure des fichiers

```
cohezi/
  app/
    layout.tsx                 police, métadonnées, <html lang="en">, fond ink
    page.tsx                   assemble les 8 sections depuis content/
    globals.css                @import "tailwindcss" + @theme tokens + base
    [slug]/page.tsx            page « à venir » pour les liens de nav (generateStaticParams)
    api/newsletter/route.ts    POST, validation email, réponse simulée
  components/
    layout/site-header.tsx     logo, nav desktop, CTA, déclenche MobileMenu
    layout/mobile-menu.tsx     client : panneau plein écran, Échap, aria-expanded
    layout/site-footer.tsx     4 colonnes, newsletter, mentions, réseaux
    sections/hero.tsx
    sections/latest-articles.tsx
    sections/guides.tsx
    sections/trending-tools.tsx
    sections/podcast.tsx
    sections/university-cta.tsx
    ui/button.tsx              variantes : ink, gradient, outline, outline-light, white
    ui/chip.tsx                puce pilule avec icône, état actif
    ui/tabs.tsx                barre d'onglets (All / AI / Tech / Robotics)
    ui/section-heading.tsx     h2 + sous-titre centrés
    ui/placeholder-image.tsx   SVG dégradé déterministe, ratio et libellé
    ui/logo-wordmark.tsx       logos « trusted by » en texte stylé
    ui/newsletter-form.tsx     client : états idle / sending / success / error
    ui/filterable-grid.tsx     client : générique, onglets ou puces + grille
    ui/icon.tsx                enveloppe HugeiconsIcon (taille, aria-hidden)
  content/
    types.ts                   tous les types exportés
    site.ts                    nom, nav, CTA header, hero, trusted-by, footer, réseaux
    categories.ts              catégories guides et outils (slug, label, icône)
    articles.ts                5 articles (1 featured + 4)
    guides.ts                  8 guides
    tools.ts                   12 outils
    podcast.ts                 section Rowan's Notes
    university.ts              section CTA et ses 4 cartes
  lib/
    cn.ts                      clsx + tailwind-merge
    filter.ts                  filterByCategory (pure)
    icons.ts                   Record<IconName, IconSvgObject> : mapping libellé → Hugeicons
    validate-email.ts          isValidEmail (pure)
    placeholder.ts             hashToGradient (pure) : titre → couple de couleurs
  tests/                       miroir de lib/ et components/ (*.test.ts[x])
  public/fonts/satoshi/        woff2
  docs/superpowers/            specs et plans
  screenshots/therundown-ai/   captures de référence
```

## 6. Tokens de design (relevés sur le site réel à 1440 px)

Déclarés dans `globals.css` via `@theme` et utilisés comme classes Tailwind.

| Token | Valeur | Usage |
|---|---|---|
| `--color-ink` | #171717 | fond sombre, texte principal, boutons pleins |
| `--color-ink-soft` | #212121 | fond des cartes University |
| `--color-ink-border` | #333333 | bordure des cartes University |
| `--color-line` | #E5E5E5 | bordures claires (cartes, puces, onglets, footer) |
| `--color-muted` | #737373 | méta, descriptions secondaires |
| `--color-paper` | #FFFFFF | feuille blanche |
| `--color-podcast-card` | #EFEFEF | carte podcast |
| `--gradient-brand` | linear-gradient(45deg, #CD408F 0%, #8B4CD4 50%, #6254FF 100%) | mot « 5 minutes », bouton « Join AI University », mot « University » |
| `--gradient-university` | linear-gradient(#000000, #292929) | fond de la section University |
| `--radius-sheet` | 28.8px | coins de la feuille blanche |
| rayons | 8px boutons/onglets, 12px cartes et champ email, 16px cartes University, pilule puces | |
| `--font-sans` | Satoshi, ui-sans-serif, system-ui | tout le site |

Typographie : h1 72px / 1.08 / -0.025em / 700 (mobile 36px) ; h2 48px / 1 / -0.025em / 700
(mobile 32px) ; sous-titres 18px / 28px ; titre article à la une 30px / 700 ; titres de cartes
16–18px / 700 ; description outil 14px / 20px muted ; méta 12px muted ; nav 16px / 500.

## 7. Modèle de données (`content/types.ts`)

```ts
export type IconName = string;                       // clé de lib/icons.ts
export type ImageRef = { src?: string; alt: string }; // sans src → PlaceholderImage
export type NavItem = { label: string; href: string };
export type Category = { slug: string; label: string; icon: IconName };
export type ArticleTag = 'ai' | 'tech' | 'robotics';
export type Article = {
  slug: string; title: string; subtitle?: string; author: string;
  readingMinutes: number; tag: ArticleTag; image: ImageRef; featured?: boolean;
};
export type Guide = { slug: string; title: string; categories: string[]; image: ImageRef };
export type Tool = {
  slug: string; name: string; description: string; categories: string[];
  badgeIcon: IconName; image: ImageRef;
};
export type UniversityFeature = { title: string; description: string; icon: IconName };
export type SocialLink = { label: string; href: string; icon: IconName };
export type FooterColumn = { heading: string; links: NavItem[] };
export type SiteConfig = {
  name: string; tagline: string; nav: NavItem[]; headerCta: NavItem;
  hero: { titleStart: string; titleAccent: string; titleEnd: string; subtitle: string;
          trustedByLabel: string; trustedBy: string[] };
  footer: { description: string; columns: FooterColumn[]; copyright: string; social: SocialLink[] };
};
```

Le contenu de référence (titres, auteurs, durées, descriptions, libellés de puces, liens du
footer) est repris du JSON de référence. Les catégories des guides ne sont pas visibles sur les
cartes du site : elles sont attribuées de façon plausible d'après le titre, et documentées comme
telles dans `guides.ts`.

Chaque `ArticleTag` correspond à un onglet ; la première catégorie (`all`) est implicite et
ajoutée par `FilterableGrid`.

## 8. Sections et composants

Toutes les sections sont des Server Components qui reçoivent leurs données en props depuis
`page.tsx`. Chaque section a un `aria-labelledby` vers son h2.

### 8.1 Header (`site-header`) — 68 px
Fond transparent sur ink, `position: sticky; top: 0; z-50`. Logo (monogramme carré 24 px +
« The Rundown » 18px / 600), nav centrée 7 liens 16px / 500 blanc 90 %, CTA « University
Platform → » bouton blanc texte ink, rayon 8, hauteur 42, `ArrowRight01Icon`. Sous `md` : logo à
gauche, bouton carré blanc 40 px à droite avec `Menu01Icon` ouvrant `MobileMenu` (panneau ink
plein écran, liens en colonne, CTA, `Cancel01Icon`, fermeture Échap et au clic sur un lien,
`aria-expanded` et `aria-controls` sur le déclencheur, focus ramené sur le déclencheur à la
fermeture).

### 8.2 Hero — desktop 0–704 px
`padding-top` 112 px desktop / 80 mobile, `padding-bottom` 64. h1 sur deux lignes, le mot
« 5 minutes » en `background-clip: text` avec `--gradient-brand`. Sous-titre 18px blanc 80 %.
`NewsletterForm` variante hero : conteneur blanc 512 px max, rayon 12, `padding` 6, anneau 1px
noir 10 % + ombre lg ; champ email 44 px sans bordure ; bouton « Subscribe » ink, rayon 8,
hauteur 44, 600, `SentIcon`. Ligne « Join over **2,000,000+** readers from companies like: »
14px blanc 80 %, puis 7 `LogoWordmark` (Google, OpenAI, Meta, Microsoft, Stripe, Apple,
Netflix) en blanc, hauteur 24–28 px, wrap sur deux lignes en mobile.

### 8.3 Feuille blanche
`div.px-2 md:px-5` puis `div` blanc `rounded-[var(--radius-sheet)]` contenant 8.4 à 8.7, chaque
bloc en `px-5 py-16 md:py-20`, contenu en `max-w-6xl mx-auto`.

### 8.4 Latest Articles — 988 px desktop
`SectionHeading` (« Latest Articles » / « The latest developments in AI, Tech and Robotics. »).
`FilterableGrid` variante `tabs` : barre blanche bordure line, rayon 12, `padding` 4 ; onglets
17px, `padding` 8×16, rayon 8, actif ink/blanc. Grille `lg:grid-cols-2 gap-8` : à gauche
l'article `featured` (image 16:9 pleine largeur, tag pilule blanche en haut à gauche, titre
30px / 700, sous-titre 16px muted, méta « Auteur • N minutes » 12px muted) ; à droite grille
2×2 des 4 autres (image 16:10, tag, titre 18px / 700, méta). Quand un onglet filtre et qu'aucun
article n'est `featured` dans la sélection, le premier de la sélection prend la place de la une.
Sous la grille, bouton « View all articles → » outline line, rayon 8, hauteur 42, 14px / 600.
Mobile : une colonne, toutes les cartes au format petit, image 16:9.

### 8.5 Guides — 1199 px desktop
Heading + paragraphe de 3 lignes (max-w 680). `FilterableGrid` variante `chips` : puces pilule
blanches bordure line, hauteur 39, 17px, icône 16 px + libellé, active ink/blanc ; 17 puces
centrées sur 4 lignes. Grille `md:grid-cols-2 lg:grid-cols-4 gap-5` de cartes 12 px de rayon,
bordure line, `padding` 10 : image 16:9 (rayon 8), titre 16px / 700 sur 2–3 lignes. Mobile :
une colonne et seulement les 3 premières cartes visibles (`nth-child(n+4)` masqué sous `md`),
comme sur le site. Bouton « View all guides → ».

### 8.6 Trending Tools — 1442 px desktop
Même squelette que Guides avec 20 puces. Carte : image 16:9 avec badge carré blanc 32 px rayon 8
en haut à gauche portant `badgeIcon`, nom 16px / 700, description 14px / 20 muted sur 2–3
lignes. 12 cartes en 3 lignes de 4. Mobile : 3 premières cartes. Bouton « View all tools → ».

### 8.7 Podcast (Rowan's Notes) — 890 px desktop
Heading + description 20px sur 3 lignes. Deux boutons outline avec `SpotifyIcon` et
`AppleIcon` (« Spotify », « Apple Podcasts »). Carte statique 750×420 fond podcast-card, rayon
16 : à gauche pochette carrée 382 px (PlaceholderImage carré, libellé « Rowan's Notes ») ; à
droite « Podcasts » (icône `PodcastIcon`), titre 18px / 700, « Tech News • Updated Daily » 12px
muted, description 15px, bouton pilule ink « Latest Episode » avec `PlayIcon` + bouton rond
`MoreHorizontalIcon`, mention « See how your data is managed… » 10px muted. Mobile : carte en
colonne, pochette 96 px à gauche du texte comme sur la capture mobile.

### 8.8 University CTA — 1142 px desktop
Fond `--gradient-university`, `padding` 96 px vertical. Ligne logo « The Rundown University »
(mot « University » en dégradé brand). h2 48px blanc, sous-titre 18px blanc 80 % sur 3 lignes.
Boutons : « Join AI University » fond `--gradient-brand`, rayon 8, hauteur 48, 600, `padding`
12×24 ; « Explore The Rundown University » outline blanc 40 %, hauteur 50. Grille `md:grid-cols-2
gap-5 max-w-[900px]` de 4 cartes : fond ink-soft, bordure ink-border, rayon 16, `padding` 32,
liseré dégradé 1 px sur le bord gauche des cartes 1 et 3 et le bord droit des cartes 2 et 4
(pseudo-élément), icône 56 px dans un carré rayon 12 fond #2A2A2A avec icône violette 24 px,
h3 20px / 700 blanc, description 16px blanc 70 %. Icônes : `CourseIcon`, `PlaySquareIcon`,
`Presentation01Icon`, `UserGroupIcon`.

### 8.9 Footer — 465 px desktop
Fond blanc, `padding` 48 (mobile 20). Grille `lg:grid-cols-[1.4fr_1fr_1fr_1fr]` : colonne
marque (logo, description 14px, `NewsletterForm` variante compacte 320 px) ; « Stay Updated »
(Articles, Podcast, Tools) ; « AI University » (Courses, Guides) ; « Company » (Advertise,
Careers, Contact Us, Privacy Policy, Terms & Conditions). Titres 16px / 700, liens 14px muted.
Filet line puis ligne basse : « © 2026 The Rundown AI, Inc. All rights reserved. » 12px muted et
3 icônes sociales (`NewTwitterIcon`, `InstagramIcon`, `LinkedinIcon`) dans des cercles 32 px
bordure line.

## 9. Îlots client et logique

### `lib/filter.ts`
```ts
export const ALL = 'all';
export function filterByCategory<T>(
  items: readonly T[], active: string, getCategories: (item: T) => readonly string[]
): T[]  // active === ALL → copie de items ; sinon items dont getCategories inclut active
```

### `ui/filterable-grid.tsx` (client)
```ts
type Props<T> = {
  items: readonly T[];
  categories: readonly Category[];        // sans 'all', ajouté en tête par le composant
  getCategories: (item: T) => readonly string[];
  variant: 'tabs' | 'chips';
  renderItems: (visible: T[]) => ReactNode; // la section décide de la mise en page
  emptyLabel?: string;                      // défaut « Nothing here yet. »
  labelledBy: string;                       // id du h2 pour aria
};
```
État local `active` (défaut `all`). Les contrôles sont des `<button type="button">` avec
`aria-pressed`. Le composant ne connaît pas la forme des items : Latest Articles lui passe
`renderItems` qui choisit la une et la grille 2×2 ; Guides et Tools passent une grille simple.

### `ui/newsletter-form.tsx` (client)
Props : `variant: 'hero' | 'footer'`, `placeholder`, `buttonLabel`. Validation locale via
`isValidEmail` avant envoi ; `fetch('/api/newsletter', { method: 'POST' })` ; messages sous le
champ : « Check your inbox to confirm. » en succès, « Enter a valid email address. » ou « Something
went wrong, try again. » en erreur ; bouton désactivé pendant l'envoi ; `aria-live="polite"`.

### `layout/mobile-menu.tsx` (client)
Décrit en 8.1. Le body reçoit `overflow: hidden` tant que le menu est ouvert.

## 10. Route API newsletter

`POST /api/newsletter`, corps JSON `{ email: string }`.
- 200 `{ ok: true }` si `isValidEmail(email)`.
- 400 `{ ok: false, error: 'invalid_email' }` sinon, ou si le corps n'est pas du JSON valide.
- 405 pour les autres méthodes (Next le gère en n'exportant que `POST`).
Aucun stockage, aucun appel externe ; un `console.info` de l'email masqué (`j***@domain`) pour
tracer en dev. `lib/validate-email.ts` : regex simple `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`, trim,
longueur max 254.

## 11. Placeholders d'images

`lib/placeholder.ts` : `hashToGradient(seed)` calcule un hash 32 bits du texte et en dérive deux
teintes HSL (h et h+40°, s 55 %, l 45 % et 60 %). `PlaceholderImage` remplit son conteneur
(`absolute inset-0` dans un parent `relative` qui porte le ratio via `aspect-[16/9]`,
`aspect-[16/10]` ou `aspect-square`, éventuellement différent selon le point de rupture). Il rend
un `<svg>` `width="100%" height="100%"` avec `preserveAspectRatio="xMidYMid slice"`, un dégradé
linéaire diagonal, un motif de fines lignes à 8 % d'opacité et le libellé centré (16px / 600,
blanc 90 %, tronqué à 28 caractères). `role="img"` et `aria-label` = alt. Si `image.src` est fourni, le composant rend
`next/image` avec `fill` et `object-cover` à la place. Les `LogoWordmark` rendent le nom en
texte 18px / 700 blanc, avec `letter-spacing` léger, sans logo réel.

## 12. Pages « à venir »

`app/[slug]/page.tsx` avec `generateStaticParams` sur les slugs de la nav et du footer
(`articles`, `guides`, `tools`, `courses`, `careers`, `advertise`, `university`, `podcast`,
`contact`, `privacy`, `terms`). Rendu : header, titre humanisé, phrase « This page is coming
soon. », lien retour, footer. Slug inconnu → `notFound()`.

## 13. Responsive

Points de rupture Tailwind par défaut : `md` 768, `lg` 1024. Comportements clés :
- < `md` : hamburger, une colonne partout, h1 36px, h2 32px, feuille à 8 px des bords,
  3 cartes visibles dans Guides et Tools, footer empilé, boutons University côte à côte.
- `md` : 2 colonnes pour guides, tools et cartes University.
- `lg` : nav complète, 2 colonnes articles (une + 2×2), 4 colonnes guides et tools.
Aucune requête média custom ; pas de JS pour le responsive.

## 14. Accessibilité

Sémantique `header / main / section / footer`, un seul h1, h2 par section, `aria-labelledby`,
icônes `aria-hidden` sauf boutons icône seule (`aria-label`), contrastes conformes AA pour les
textes muted sur blanc (#737373 sur #FFF = 4.7:1) et blanc 80 % sur ink, focus visible
(anneau 2 px brand) sur tous les éléments interactifs, `prefers-reduced-motion` respecté pour
les transitions.

## 15. Tests et vérification

TDD (Vitest) sur :
- `filterByCategory` : `all`, une catégorie, catégorie absente, immutabilité.
- `isValidEmail` : cas valides, espaces, sans TLD, trop long.
- `hashToGradient` : déterminisme, deux seeds → couleurs différentes.
- `route.ts` : 200 email valide, 400 email invalide, 400 JSON cassé.
- `FilterableGrid` : rendu de `all` par défaut, clic sur un onglet filtre, `aria-pressed`,
  état vide.
- `NewsletterForm` : erreur locale sans appel réseau, succès et erreur serveur avec `fetch`
  mocké, bouton désactivé pendant l'envoi.
- `MobileMenu` : ouverture, fermeture Échap, `aria-expanded`.
- `page.tsx` : présence des 8 titres de section et du bon nombre de cartes depuis `content/`.

Vérification finale hors tests : `pnpm build` sans erreur ni avertissement de dépréciation,
`pnpm lint`, puis comparaison visuelle avec le navigateur gstack (`/browse`) à 1440 et 375,
section par section, contre `screenshots/therundown-ai/sections/`. Écarts tolérés : polices
fallback si Satoshi indisponible, visuels placeholders.

## 16. Risques et notes

- Satoshi : téléchargement depuis Fontshare au moment de l'implémentation ; repli documenté.
  URL vérifiées le 2026-09-03 (woff2, ~25 Ko chacun, en-tête `wOF2` confirmé) :
  - 400 : https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2
  - 500 : https://cdn.fontshare.com/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2
  - 700 : https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2
- Next 16 : lire la doc embarquée avant chaque API (`next/font`, route handlers, `params`
  asynchrones, `generateStaticParams`).
- Noms d'icônes : vérifiés sur `@hugeicons/core-free-icons` 4.3.0 ; si un nom manque à
  l'installation, choisir le plus proche dans le même jeu et le noter dans `lib/icons.ts`.
- Contenu : textes de The Rundown conservés à l'identique comme placeholder ; à remplacer avant
  toute mise en ligne publique.
