# Cohezi — Guide d’adaptation du clone The Rundown AI

## 1. Vision générale

**Cohezi** est un média digital-native spécialisé dans l’intelligence artificielle et son impact sur le monde.

### Positionnement

> **The Rundown = apprendre et utiliser l’IA**  
> **Cohezi = comprendre l’IA et le monde qu’elle transforme**

## Principe de travail

La base du site **The Rundown AI a déjà été reproduite**.

On ne cherche donc **pas à refaire la structure du site**.

La règle pour la V1 est simple :

> **Conserver au maximum la structure, les proportions, les placements, le rythme, les composants et les comportements du clone The Rundown existant, puis remplacer son identité et son contenu par ceux de Cohezi.**

Concrètement :

- ne pas déplacer une section sans raison ;
- ne pas recréer un layout déjà fonctionnel ;
- conserver les grilles et espacements généraux du clone ;
- conserver les positions du hero, des cartes, CTA et blocs newsletter ;
- adapter principalement les couleurs, typographies, textes, catégories, images et détails de marque ;
- n’ajouter un nouveau composant que lorsqu’il répond à un besoin éditorial propre à Cohezi.

Cohezi doit rester distinct grâce à sa ligne éditoriale :

- Actualité
- Business
- Société
- Analyses / Décryptages

L’objectif est de transformer le clone Rundown en **Cohezi**, pas de concevoir une nouvelle homepage depuis zéro.

---

# 2. Direction artistique

## Charte officielle à respecter

| Élément | Choix |
|---|---|
| **Positionnement** | Média IA accessible |
| **Style** | Éditorial + Tech |
| **Primaire** | `#111111` |
| **Secondaire** | `#F7F7F4` |
| **Accent** | `#7CFF6B` |
| **Typo titres** | Space Grotesk |
| **Typo texte** | Inter |
| **Logo** | Wordmark COHEZI + symbole |
| **Images** | Réelles + traitement graphique |
| **Graphisme** | Minimal / géométrique |
| **Personnalité** | Intelligent, accessible, moderne |

Cette charte est la **source de vérité** pour toutes les adaptations visuelles du clone Rundown.

## Palette

| Élément | Couleur |
|---|---|
| Noir principal | `#111111` |
| Blanc cassé | `#F7F7F4` |
| Vert signature | `#7CFF6B` |
| Vert profond | `#123C2A` |
| Gris texte | `#8A8A8A` |
| Bordure claire | `#E2E2DE` |

### Usage recommandé

- **70 %** tons neutres ;
- **20 %** noir ;
- **10 %** vert signature.

Le vert doit rester rare et immédiatement reconnaissable.

### À éviter

- gradients verts décoratifs sans fonction ;
- grands fonds verts ;
- effets néon ;
- esthétique “startup IA générique”.

Le vert sert surtout pour :

- accents ;
- état actif ;
- petits repères ;
- liens importants ;
- chiffres ;
- détail du logo ;
- CTA clés ;
- indicateurs.

---

# 3. Typographie

## Titres

**Space Grotesk**

Utilisations :

- hero ;
- titres de sections ;
- titres d’articles ;
- grands chiffres ;
- blocs Décryptage.

## Texte / UI

**Inter**

Utilisations :

- navigation ;
- paragraphes ;
- descriptions ;
- boutons ;
- metadata ;
- formulaires ;
- éléments d’interface.

> Ne pas remplacer ces polices dans la V1.

---

# 4. Système de marque

## Logo

Base recommandée :

```text
COHEZI
```

avec un **symbole graphique minimal** pouvant être utilisé séparément.

Si une version du type :

```text
cohezi°
```

est utilisée, le symbole `°` doit être **vert `#7CFF6B`**.

Le symbole peut servir pour :

- favicon ;
- loader ;
- bullet ;
- marqueur de catégorie ;
- signature de carte ;
- détail d’interface ;
- posts sociaux.

---

# 5. Règle d’adaptation du clone The Rundown

Le clone Rundown existant est la **source de vérité pour le layout**.

## À conserver

- largeur des conteneurs ;
- placement du header ;
- structure du hero ;
- positions relatives texte / visuel / formulaire ;
- grilles d’articles ;
- taille générale des cartes ;
- radius déjà utilisés s’ils sont cohérents ;
- comportement responsive ;
- transitions et micro-interactions déjà présentes ;
- emplacement des CTA newsletter ;
- rythme vertical global des sections.

## À remplacer

- logo Rundown → logo Cohezi ;
- palette Rundown → palette Cohezi ;
- typographies → Space Grotesk + Inter ;
- textes marketing → positionnement Cohezi ;
- catégories → Actualité / Business / Société / Analyses ;
- images → visuels éditoriaux cohérents avec Cohezi ;
- icônes et détails de marque → système Cohezi ;
- exemples d’articles → contenus Cohezi.

## À éviter

- reconstruire le hero alors qu’il est déjà prêt ;
- déplacer les blocs juste pour “faire différent” ;
- ajouter des sections SaaS inutiles ;
- transformer le site en média old-school ;
- multiplier les couleurs ;
- utiliser des visuels robots / cerveaux / circuits génériques ;
- modifier fortement les proportions de The Rundown sans raison.

---

# 6. Structure globale

La structure existante du clone Rundown reste prioritaire.

La logique éditoriale Cohezi peut être mappée ainsi :

```text
NAVBAR

↓

HERO
+ inscription newsletter

↓

PROMESSE ÉDITORIALE / PREUVE

↓

DERNIÈRES ACTUALITÉS

↓

CONTENUS / ARTICLES

↓

DÉCRYPTAGE

↓

BUSINESS

↓

SOCIÉTÉ

↓

NEWSLETTER CTA

↓

FOOTER
```

Le but est de **mapper les blocs Cohezi sur les blocs déjà présents**, pas de reconstruire la page.

---

# 7. Header / Navbar

Conserver la structure générale du header du clone.

## Contenu Cohezi

### Gauche

```text
COHEZI
```

ou :

```text
cohezi°
```

### Navigation

- Actualité
- Business
- Société
- Analyses

### Droite

- recherche ;
- CTA newsletter ou bouton existant ;
- menu si déjà présent.

## Style

```css
background: #F7F7F4;
color: #111111;
border-color: #E2E2DE;
```

Accent actif :

```css
color: #7CFF6B;
```

ou un indicateur vert discret selon le composant existant.

---

# 8. Hero

Conserver **la structure et la position du hero de The Rundown**.

Ne pas inventer un nouveau layout.

## Texte recommandé

### Eyebrow

```text
COHEZI / INTELLIGENCE ARTIFICIELLE
```

### H1

> **L'IA CHANGE LE MONDE.  
> COMPRENEZ CE QUI COMPTE.**

### Description

> Actualités, business, société et analyses pour comprendre l’intelligence artificielle sans le bruit.

### CTA principal

```text
S'inscrire
```

### Micro-copy

```text
La newsletter IA claire, 3× par semaine.
```

## Style

Le hero doit garder l’esprit Rundown :

- très lisible ;
- beaucoup d’espace ;
- peu d’éléments ;
- CTA newsletter immédiatement visible ;
- pas de surcharge graphique.

Le vert `#7CFF6B` reste un accent, pas le fond principal du hero.

---

# 9. Preuve / promesse éditoriale

Si le clone possède déjà une zone de preuve sociale, on la conserve au même emplacement.

Au lancement, ne pas inventer de métriques.

Utiliser plutôt :

> **POUR CEUX QUI VEULENT COMPRENDRE L'IA, PAS SEULEMENT LA SUIVRE.**

Plus tard, remplacer par des métriques réelles uniquement.

---

# 10. Cartes d’articles

Conserver les cartes Rundown existantes autant que possible.

## Adapter seulement

- image ;
- catégorie ;
- titre ;
- extrait ;
- date ;
- temps de lecture ;
- CTA ;
- accents de couleur.

## Catégories

```text
ACTUALITÉ
BUSINESS
SOCIÉTÉ
ANALYSE
```

## Principe éditorial

Ne pas se contenter de :

> OpenAI lance X.

Préférer :

> **OpenAI lance X. Voilà pourquoi c’est important.**

Cohezi doit toujours apporter :

- le contexte ;
- l’impact ;
- ce qui change ;
- ce qu’il faut retenir.

---

# 11. Dernières actualités

Si le clone possède déjà une section **Latest Articles**, on la garde presque telle quelle.

On adapte uniquement :

- heading ;
- contenus ;
- catégories ;
- images ;
- couleurs ;
- CTA.

## Heading recommandé

```text
DERNIÈRES ACTUALITÉS
```

ou :

```text
À LA UNE
```

selon ce qui s’intègre le mieux au composant déjà codé.

---

# 12. Décryptage

Le Décryptage est l’un des rares éléments pouvant devenir plus spécifique à Cohezi.

Il peut être intégré dans une section existante du clone au lieu d’ajouter un nouveau bloc complexe.

## Direction

```css
background: #111111;
color: #F7F7F4;
```

Accent :

```css
color: #7CFF6B;
```

## Exemple

```text
COHEZI / DÉCRYPTAGE

01

LES AGENTS IA
VONT-ILS FAIRE
DISPARAÎTRE
LES APPLICATIONS ?

Comprendre le changement qui pourrait
redéfinir notre manière d'utiliser Internet.

8 MIN DE LECTURE
```

Le numéro `01` peut être vert.

---

# 13. Business

Réutiliser une grille ou un composant déjà présent dans Rundown.

Ne pas créer un design complètement différent.

## Contenu

- entreprises IA ;
- financements ;
- marchés ;
- stratégies ;
- acquisitions ;
- startups ;
- modèles économiques ;
- industrie des puces ;
- cloud ;
- infrastructures.

---

# 14. Société

Même composant que Business.

## Thèmes

- emploi ;
- éducation ;
- santé ;
- culture ;
- politique publique ;
- créativité ;
- vie quotidienne ;
- vie privée ;
- éthique ;
- usages.

---

# 15. Newsletter CTA

Conserver **la place centrale de la newsletter**, comme dans The Rundown.

Le bloc peut rester très proche du clone.

## Texte

### Titre

> **MOINS DE BRUIT.  
> PLUS DE CONTEXTE.**

### Description

> L’essentiel de l’IA, directement dans votre boîte mail.

### CTA

```text
Je m'inscris
```

## Couleurs

### Option claire

```css
background: #F7F7F4;
color: #111111;
```

Bouton :

```css
background: #111111;
color: #F7F7F4;
```

avec un petit accent vert.

### Option sombre

```css
background: #111111;
color: #F7F7F4;
```

CTA :

```css
background: #7CFF6B;
color: #111111;
```

---

# 16. Footer

Conserver la structure du footer existant s’il est déjà propre.

Remplacer seulement les contenus.

## Exemple

```text
COHEZI

Comprendre l'IA.
Comprendre ce qui change.

ACTUALITÉ
Business
Société
Analyses

COHEZI
À propos
Newsletter
Contact

SUIVRE
Instagram
LinkedIn
TikTok

© 2026 COHEZI
```

---

# 17. Images

## Direction

Privilégier :

- photos réelles ;
- captures de produits ;
- dirigeants ;
- entreprises ;
- événements ;
- objets technologiques ;
- environnements ;
- données ;
- illustrations conceptuelles sobres.

## Éviter

- robots 3D génériques ;
- cerveaux lumineux ;
- circuits futuristes ;
- images “IA” cliché ;
- néons ;
- cyberpunk sans rapport avec l’article.

## Traitement

Les images peuvent recevoir :

- léger contraste ;
- crop fort ;
- grain subtil ;
- overlays simples ;
- textes courts ;
- marqueur vert ;
- traitement éditorial cohérent.

---

# 18. Responsive

Conserver le responsive déjà reproduit depuis The Rundown.

Ne modifier que si un composant Cohezi introduit un problème.

Priorités mobile :

- hero lisible ;
- newsletter visible ;
- navigation compacte ;
- cartes empilées proprement ;
- titres courts ;
- marges généreuses ;
- aucune surcharge.

---

# 19. Animations

Conserver les interactions du clone Rundown si elles sont propres.

Ajouter uniquement des animations discrètes.

## Autorisées

- apparition légère ;
- déplacement de flèche ;
- underline animé ;
- scale très léger des images ;
- changement de fond au hover ;
- micro-animation du symbole.

## À éviter

- animations 3D ;
- grosses parallaxes ;
- effets néon ;
- scroll hijacking ;
- transitions longues ;
- glassmorphism excessif.

---

# 20. Composants

Si le clone est déjà codé, **ne pas renommer ou restructurer les composants sans nécessité**.

L’idée est d’adapter les composants existants.

Exemples de mapping :

```text
Rundown Header       → Cohezi Header
Rundown Hero         → Cohezi Hero
Latest Articles      → Dernières actualités
Article Card         → Article Cohezi
Newsletter CTA       → Newsletter Cohezi
Footer               → Footer Cohezi
```

Créer un nouveau composant uniquement si besoin pour :

```text
DeepDive / Décryptage
CategoryBadge
CoheziLogo
```

---

# 21. Data Model simplifié

```ts
type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "actualite" | "business" | "societe" | "analyse";
  image: string;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
  deepDive?: boolean;
};
```

---

# 22. Principes éditoriaux

Chaque contenu Cohezi doit répondre à au moins une de ces questions :

```text
Que s'est-il passé ?
```

```text
Pourquoi est-ce important ?
```

```text
Qu'est-ce que cela change ?
```

```text
Que faut-il surveiller maintenant ?
```

Cohezi ne doit pas simplement relayer des annonces.

---

# 23. Ce qu'il ne faut PAS intégrer au lancement

Ne pas ajouter immédiatement :

- annuaire d’outils IA ;
- marketplace ;
- formations ;
- comparateur ;
- prompts ;
- jobs ;
- communauté ;
- bibliothèque de ressources ;
- dizaines de catégories.

Cohezi V1 doit gagner sur :

> **l’information + le contexte + le décryptage.**

---

# 24. Priorités V1

## Must-have

- adaptation du logo ;
- palette Cohezi ;
- Space Grotesk + Inter ;
- hero ;
- newsletter ;
- dernières actualités ;
- Business ;
- Société ;
- Analyses ;
- footer ;
- responsive.

## Nice-to-have

- recherche ;
- dark mode ;
- animations légères ;
- lecture estimée ;
- partage social ;
- articles liés.

---

# 25. Résumé final

Cohezi doit ressembler à :

> **The Rundown AI adapté en média Cohezi, et non à une nouvelle maquette indépendante.**

## Référence structurelle

> **The Rundown AI**

## Identité Cohezi à appliquer

- primaire : `#111111`
- secondaire : `#F7F7F4`
- accent : `#7CFF6B`
- titres : **Space Grotesk**
- texte : **Inter**
- logo : **Wordmark COHEZI + symbole**
- images : **réelles + traitement graphique**
- graphisme : **minimal / géométrique**
- personnalité : **intelligent, accessible, moderne**
- beaucoup d’espace négatif ;
- articles faciles à scanner ;
- newsletter très visible ;
- ton orienté contexte et compréhension.

## Règle finale

> **On garde la structure Rundown déjà codée et on remplace les éléments nécessaires pour la faire devenir Cohezi.**

## Promesse de marque

> **L'IA change le monde. Comprenez ce qui compte.**

## Signature newsletter

> **Moins de bruit. Plus de contexte.**
