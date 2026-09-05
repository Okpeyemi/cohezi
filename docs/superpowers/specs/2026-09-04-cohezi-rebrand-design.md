# Spec — Refonte de la page d'accueil vers l'identité Cohezi

- Date : 2026-09-04
- Statut : **implémenté le 2026-09-05** (branche `feat/cohezi-rebrand`, plan `docs/superpowers/plans/2026-09-04-cohezi-rebrand.md`).
  Écarts connus : visuels en placeholders générés (champ `image.src` prêt pour de vraies photos) ;
  textes d'articles fictifs, à remplacer avant publication ; sections Société, Décryptage et
  Newsletter plus courtes que leurs équivalents Rundown (8 cartes au lieu de 12, bloc texte au lieu
  du lecteur podcast, pas de cartes sous le CTA) — écarts voulus par le guide, pas des régressions.
- Base : réplique The Rundown (tag git `rundown-replica-v1`, spec `2026-09-03-therundown-homepage-replica-design.md`)
- Source de vérité éditoriale et visuelle : `cohezi-homepage-spec-corrige.md` (racine du dépôt) ; logos : `logos-png/` (voir `LISEZ-MOI.txt`)

## 1. Contexte et objectif

Transformer le clone The Rundown déjà codé en page d'accueil **Cohezi**, média digital-native sur
l'IA et le monde qu'elle transforme (« The Rundown = apprendre et utiliser l'IA ; Cohezi =
comprendre l'IA et le monde qu'elle transforme »). Règle du guide : **conserver la structure, les
proportions, les grilles, le rythme et les comportements du clone, remplacer l'identité et le
contenu.** Aucune nouvelle maquette.

## 2. Décisions de cadrage

| Question | Décision |
|---|---|
| Haut de page | Hero sombre #111111 comme le clone, header sombre puis clair #F7F7F4 grâce à la bascule au défilement existante |
| Ordre des sections | Ordre du clone, blocs renommés : À la une → Business → Société → Décryptage → Newsletter → Footer |
| Contenus | Rédigés par l'implémentation : ~24 articles français réalistes au ton Cohezi, un Décryptage ; images = placeholders générés aux couleurs Cohezi, remplaçables via `image.src` |
| Approche | A : adaptation en place des composants existants ; pas de couche multi-marque, pas d'arborescence parallèle |
| Ce qui disparaît | Satoshi, dégradé rose-violet, halo animé des cartes, logos « trusted by », podcast, University, guides, outils, puces de filtre |

## 3. Périmètre et hors périmètre

Périmètre : page d'accueil complète rebrandée, pages « à venir » rebrandées, favicon, métadonnées,
tests et QA visuelle. Hors périmètre (guide §23 et §24 nice-to-have) : recherche fonctionnelle
(le bouton mène à une page « à venir »), dark mode commutable, partage social, articles liés, pages
de liste et d'article, annuaire d'outils, formations, communauté.

## 4. Tokens de design (`app/globals.css`, `@theme`)

| Token | Valeur | Remplace | Usage |
|---|---|---|---|
| `--color-ink` | #111111 | #171717 | fond sombre, texte principal, boutons noirs |
| `--color-paper` | #F7F7F4 | #FFFFFF | feuille, header en clair, cartes, footer, texte sur fond sombre |
| `--color-accent` | #7CFF6B | nouveau | vert signature : repères, état actif, numéro du Décryptage, CTA newsletter sombre, point du H1 |
| `--color-accent-deep` | #123C2A | nouveau | texte vert sur fond clair (contraste), survol du vert |
| `--color-muted` | #8A8A8A | #737373 | métadonnées, descriptions secondaires |
| `--color-line` | #E2E2DE | #E5E5E5 | bordures claires |
| `--color-line-dark` | #2A2A2A | `--color-ink-border` | bordures sur fond sombre |
| `--color-ink-soft` | #1A1A1A | #212121 | surfaces légèrement relevées sur fond sombre (survol) |
| `--radius-sheet` | 28.8px | inchangé | feuille |
| `--font-sans` | Inter | Satoshi | tout le texte et l'interface |
| `--font-display` | Space Grotesk | nouveau | hero, titres de sections et d'articles, grands chiffres, Décryptage |

Supprimés : `--color-brand` (violet), `--color-podcast-card`, `--color-icon-box`, utilitaires
`bg-brand-gradient`, `text-brand-gradient`, `bg-university-gradient`, `.animated-border`,
`@property --border-angle`. Aucun dégradé décoratif, aucun effet néon (guide §2).

Polices : `next/font/google` — `Space_Grotesk` (variable, poids 500–700 utilisés, `--font-space-grotesk`)
et `Inter` (variable, `--font-inter`), `subsets: ['latin', 'latin-ext']`, `display: 'swap'`.
`@theme inline { --font-sans: var(--font-inter), …; --font-display: var(--font-space-grotesk), …; }`
donne les utilitaires `font-sans` et `font-display`. Les fichiers `public/fonts/satoshi/` et
`app/fonts.ts` sont remplacés (le fichier `app/fonts.ts` exporte désormais `inter` et `spaceGrotesk`).
Repli si le téléchargement Google échoue au build : `@fontsource-variable/space-grotesk` et
`@fontsource-variable/inter` en `next/font/local` équivalent, mêmes variables.

Règle 70 / 20 / 10 : neutres (paper, line, muted) dominants ; noir pour le haut de page, le
Décryptage et le bloc newsletter ; vert réservé aux accents listés ci-dessus.

## 5. Marque et assets

Copiés dans `public/brand/` depuis `logos-png/` : `cohezi-lockup-transparent-blanc.png` (header sur
fond sombre), `cohezi-lockup-transparent-noir.png` (header en clair, footer),
`cohezi-symbole-vert-64.png` et `-32.png` (repères), `cohezi-app-256.png` → `app/icon.png` (favicon
par convention Next) et `app/apple-icon.png`. Tailles : header desktop = lockup transparent complet (disque + mot + signature) affiché à
120 px de large, soit 51 px de haut, minimum de la charte, centré dans les 68 px du header ;
header mobile = symbole vert 32 px suivi du logotype à 24 px de haut ; footer = lockup noir à
160 px de large. Zone de protection : le padding du lien vaut au moins 15 % du diamètre du disque.
Interdits respectés : pas de capitales dans le
mot, pas de contour, pas d'ombre, pas de vert sur vert.

Composant `components/ui/cohezi-logo.tsx` : `CoheziLogo({ tone: 'dark' | 'light'; size?: 'header' | 'footer' })`
rend `next/image` avec la bonne variante, `alt="Cohezi"`, `priority` dans le header. Dans le header,
les deux variantes sont rendues et l'une est masquée selon `body.hero-light` (classes
`hero-light-hidden` / `hero-light-only`) pour que la bascule au défilement reste purement CSS.

## 6. Modèle de contenu (`content/types.ts`)

```ts
export type CategorySlug = 'actualite' | 'business' | 'societe' | 'analyse';
export type Category = { slug: CategorySlug; label: string; href: string };     // label en capitales : ACTUALITÉ…
export type Article = {
  slug: string; title: string; excerpt: string; category: CategorySlug;
  publishedAt: string;          // ISO 8601, ex. '2026-09-02'
  readingMinutes: number; image: ImageRef; featured?: boolean; deepDive?: boolean;
};
export type HeroContent = { eyebrow: string; titleLine1: string; titleLine2: string; description: string;
  emailPlaceholder: string; subscribeLabel: string; microCopy: string; promise: string };
export type SectionCopy = { title: string; subtitle: string; viewAllLabel: string; viewAllHref: string };
export type DeepDiveCopy = { eyebrow: string; number: string; readLabel: string; ctaLabel: string };
export type NewsletterCopy = { eyebrow: string; title: string; description: string; buttonLabel: string; microCopy: string };
export type SiteConfig = { name: string; tagline: string; nav: NavItem[]; headerCta: NavItem; searchHref: string;
  hero: HeroContent; sections: { latest: SectionCopy; business: SectionCopy; societe: SectionCopy };
  deepDive: DeepDiveCopy; newsletter: NewsletterCopy;
  footer: { tagline: string; columns: FooterColumn[]; copyright: string; social: SocialLink[] }; comingSoonSlugs: string[] };
```
`IconName` se réduit à : menu, close, arrow-right, arrow-up-right, send, search, clock, calendar,
instagram, linkedin, tiktok, all. `NavItem`, `ImageRef`, `FooterColumn`, `SocialLink` inchangés.
Types supprimés : `ArticleTag`, `Guide`, `Tool`, `UniversityFeature`, `PodcastContent`, `UniversityContent`.

Contenu (`content/`) : `site.ts`, `categories.ts` (4), `articles.ts` (24 articles : 8 business,
8 société, 5 actualité, 3 analyses dont 1 `deepDive`, 1 `featured` parmi les plus récents ; dates
échelonnées sur août–septembre 2026 ; chaque titre suit le principe « ce qui s'est passé + pourquoi
c'est important », chaque extrait apporte contexte ou impact). Sélecteurs purs dans
`lib/articles.ts` : `sortByDate`, `latest(articles, n = 5)` (le `featured` en tête puis les plus
récents), `byCategory(articles, slug, n = 8)`, `deepDive(articles)`, `pickFeatured` conservé.
`lib/format-date.ts` : `formatDateFr('2026-09-02')` → « 2 septembre 2026 » via `Intl.DateTimeFormat('fr-FR')`.
Fichiers supprimés : `guides.ts`, `tools.ts`, `podcast.ts`, `university.ts`.

## 7. Sections (mapping sur les composants existants)

### 7.1 Header (`site-header.tsx`, `mobile-menu.tsx`)
Structure inchangée (68 px, sticky, bascule au défilement). Gauche : `CoheziLogo`. Centre : nav
Actualité / Business / Société / Analyses (Inter 500, 16 px, blanc cassé 90 % puis ink en clair ;
survol : soulignement animé vert 2 px). Droite : bouton icône « Rechercher » (`search`, lien vers
`/recherche`, page à venir) puis CTA « S'inscrire » (bouton paper/ink, bordure line, ancre `#newsletter`).
Mobile : symbole + logotype, bouton menu ; panneau ink avec les 4 liens, la recherche et le CTA.

### 7.2 Hero (`hero.tsx`)
Même squelette et mêmes espacements. Eyebrow « COHEZI / INTELLIGENCE ARTIFICIELLE » (Inter 12 px,
capitales, espacement 0.18em, précédé d'un carré vert 8 px). H1 Space Grotesk 700, capitales,
64 px desktop / 36 px mobile, deux lignes : « L'IA CHANGE LE MONDE. » / « COMPRENEZ CE QUI COMPTE »
suivi d'un **carré vert** (`<span aria-hidden>` 0.18em, écho du point du logo) qui remplace le point
final. Description Inter 18 px paper 80 %. Formulaire newsletter inchangé (bouton ink « S'inscrire »).
Micro-copy « La newsletter IA claire, 3× par semaine. » (Inter 14 px) à la place de « Join over… ».
Promesse « POUR CEUX QUI VEULENT COMPRENDRE L'IA, PAS SEULEMENT LA SUIVRE. » (Space Grotesk 500,
capitales, 14 px, espacement 0.12em, paper 70 %) à la place de la rangée de logos. La bascule au
défilement passe ces textes en ink ; le carré vert reste vert.

### 7.3 À la une (`latest-articles.tsx`)
Titre « À LA UNE » (Space Grotesk, capitales), sous-titre « Les dernières actualités de l'IA, avec le
contexte qui compte. ». Onglets Toutes / Actualité / Business / Société / Analyses (`FilterableGrid`
variante tabs, onglet actif ink/paper, sans changement). Grille une + 2×2 inchangée ; `ArticleCard`
montre `CategoryBadge`, titre Space Grotesk 600, extrait (variante une), méta « 2 septembre 2026 ·
6 min de lecture ». Bouton « Voir toutes les actualités → » vers `/actualite`.

### 7.4 Business et Société (`article-grid-section.tsx`, remplace `guides.tsx` et `trending-tools.tsx`)
Un composant partagé : titre (« BUSINESS » / « SOCIÉTÉ »), sous-titre (« Entreprises, financements,
marchés et infrastructures de l'IA. » / « Emploi, éducation, santé, culture : ce que l'IA change au
quotidien. »), grille `md:grid-cols-2 lg:grid-cols-4 gap-5` de 8 `ArticleCard` variante `grid`
(cadre `CardFrame` conservé : bordure line, rayon 12, padding 10 ; image 16:9, badge, titre, méta),
3 cartes visibles sur mobile comme aujourd'hui, bouton « Voir tout → ». Sans puces : `Chip` et la
variante `chips` de `FilterableGrid` sont supprimés.

### 7.5 Décryptage (`deep-dive.tsx`, remplace `podcast.tsx`)
Bloc `bg-ink text-paper rounded-2xl` dans la feuille, `px-8 py-16 md:px-16 md:py-20`, `max-w-6xl`.
Desktop deux colonnes `lg:grid-cols-[1fr_1.4fr] gap-12` : à gauche eyebrow « COHEZI / DÉCRYPTAGE »
(Inter 12 px capitales, carré vert) et le numéro « 01 » (Space Grotesk 700, 96 px, vert) ; à droite
le titre (Space Grotesk 700, capitales, 40 px desktop / 28 px mobile, `text-balance`), la
description (Inter 18 px paper 70 %), la méta « 8 MIN DE LECTURE » (Inter 12 px capitales, espacement
0.16em, muted) et le lien « Lire le décryptage → » (Inter 600, vert, flèche qui se décale au survol).
Mobile : empilé. Contenu = l'article `deepDive` de `articles.ts`.

### 7.6 Newsletter (`newsletter-cta.tsx`, remplace `university-cta.tsx`)
Section `id="newsletter"`, fond ink plat, `py-24`, centré : eyebrow « NEWSLETTER » (carré vert),
titre « MOINS DE BRUIT. / PLUS DE CONTEXTE. » (Space Grotesk 700, capitales, 48 px / 32 px),
description « L'essentiel de l'IA, directement dans votre boîte mail. » (Inter 18 px paper 80 %),
`NewsletterForm` avec `buttonTone="accent"` (bouton vert #7CFF6B texte ink « Je m'inscris »),
micro-copy « La newsletter IA claire, 3× par semaine. ». Pas de cartes.

### 7.7 Footer (`site-footer.tsx`)
Structure conservée, fond paper, bordure line. Colonne marque : `CoheziLogo tone="light"`, tagline
« Comprendre l'IA. / Comprendre ce qui change. », formulaire compact. Colonnes : « ACTUALITÉ »
(Business, Société, Analyses), « COHEZI » (À propos, Newsletter → `#newsletter`, Contact),
« SUIVRE » (Instagram, LinkedIn, TikTok, liens externes). Bas : « © 2026 COHEZI » et les trois
icônes rondes.

### 7.8 Pages « à venir » et 404
Mêmes composants, textes en français : « Cette page arrive bientôt. », « Retour à l'accueil »,
« Page introuvable ». Slugs : `actualite`, `business`, `societe`, `analyses`, `a-propos`,
`contact`, `recherche`.

## 8. Composants transverses

- `CategoryBadge({ category, tone })` : carré vert 6 px + libellé capitales Inter 11 px espacement
  0.12em ; `tone: 'light'` texte ink, `tone: 'dark'` texte paper. Nouveau fichier `components/ui/category-badge.tsx`.
- `ArticleCard({ article, variant: 'featured' | 'compact' | 'grid' })` : `featured` et `compact`
  comme aujourd'hui + badge, extrait (featured) et méta datée ; `grid` dans un `CardFrame`.
- `PlaceholderImage` : palette Cohezi — fond dérivé du hash entre #1A1A1A et #3A3A3A (gris neutres
  chauds, jamais de vert plein), motif de fines lignes conservé, libellé Space Grotesk 600, carré vert
  8 px en haut à gauche. Pas d'autre changement d'API.
- `NewsletterForm` : nouvelle prop `buttonTone?: 'ink' | 'accent'` (défaut ink) ; messages en
  français : « Saisissez une adresse e-mail valide. », « Vérifiez votre boîte mail pour confirmer. »,
  « Une erreur est survenue, réessayez. ». Route API inchangée.
- `Button` : variantes `ink`, `paper` (ex-`white`, fond paper), `outline`, `outline-light`, `accent`
  (fond accent, texte ink, survol accent-deep + texte paper). Variante `gradient` supprimée.
- `Icon` / `lib/icons.ts` : mapping réduit aux 12 noms ; `SearchIcon`, `TiktokIcon`, `Clock01Icon`,
  `Calendar03Icon`, `ArrowUpRight01Icon` ajoutés.
- `HeroLightSwitch` conservé tel quel ; CSS de bascule : header clair = paper 95 %, bordure line ;
  `.brand-mark` / `.brand-name` remplacés par les classes `hero-light-hidden` / `hero-light-only`.
- `app/layout.tsx` : `lang="fr"`, polices Inter + Space Grotesk, `metadata` : titre « Cohezi — L'IA
  change le monde. Comprenez ce qui compte. », description « Actualités, business, société et analyses
  pour comprendre l'intelligence artificielle sans le bruit. », `metadataBase` absent (pas de domaine).

## 9. Suppressions

Composants : `guides.tsx`, `trending-tools.tsx`, `podcast.tsx`, `university-cta.tsx`,
`guide-card.tsx`, `tool-card.tsx`, `brand-logo.tsx`, `logo-wordmark.tsx`, `chip.tsx`. Contenus :
`guides.ts`, `tools.ts`, `podcast.ts`, `university.ts`. Assets : `public/fonts/satoshi/`. Tests
correspondants supprimés ; JSON de référence Rundown et captures conservés dans `docs/` et
`screenshots/` (historique).

## 10. Accessibilité et responsive

Inchangés par rapport à la spec Rundown : sémantique, `aria-labelledby`, focus visible (anneau
2 px **vert**), `prefers-reduced-motion`. Contrastes : muted #8A8A8A sur paper #F7F7F4 = 3.2:1, donc réservé aux textes d'au moins 18 px
(ou 14 px gras) ; les métadonnées plus petites utilisent ink à 60 % d'opacité (6.4:1). Vert
#7CFF6B sur ink = 13.6:1, texte autorisé ; vert sur paper = 1.4:1, donc jamais de texte vert sur
fond clair : on utilise accent-deep #123C2A (11.9:1).
Responsive : points de rupture et comportements du clone conservés (filtres masqués sous `md`,
3 cartes sur mobile, menu mobile). Le H1 mobile passe à 36 px et le Décryptage s'empile.

## 11. Tests et vérification

Mise à jour des tests existants sur les nouveaux contenus (header 4 liens + recherche + CTA, hero
eyebrow/H1/promesse, À la une 5 cartes et onglet Business, footer colonnes du guide, page :
h2 « À LA UNE », « BUSINESS », « SOCIÉTÉ », titre du Décryptage, « MOINS DE BRUIT. PLUS DE
CONTEXTE. »). Nouveaux tests : `formatDateFr`, `latest` / `byCategory` / `deepDive`,
`CategoryBadge`, `ArticleGridSection` (8 cartes, lien voir tout), `DeepDive`, `NewsletterCta`
(bouton accent, id newsletter), `CoheziLogo` (variante selon tone), contenu (24 articles, 1 featured,
1 deepDive, ≥ 8 business, ≥ 8 société, slugs uniques, dates ISO valides). Suppression des tests
des composants retirés. `pnpm typecheck`, `pnpm lint`, `pnpm build` verts ; QA visuelle gstack à 1440
et 375 : structure comparée aux captures Rundown (sections, hauteurs ± 10 %), identité comparée au
guide (palette, polices, part de vert), bascule au défilement, formulaire, pages à venir.

## 12. Risques et notes

- Téléchargement des polices Google au build : repli Fontsource documenté en §4.
- Contraste du gris #8A8A8A : règle de taille en §10.
- Lockup ≥ 120 px : hauteur de logo fixée en §5 ; à valider visuellement en QA.
- Le guide demande « images réelles » : V1 en placeholders, champ `src` prêt ; à remplacer avant mise en ligne.
- Les textes d'articles sont fictifs mais plausibles ; ils ne doivent pas être publiés tels quels.
