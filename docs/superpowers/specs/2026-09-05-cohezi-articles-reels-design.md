# Articles réels, vérifiés et sourcés — spec de conception

- Date : 2026-09-05
- Auteur : Maqsoud Tawaliou, avec Claude
- Statut : validé en brainstorming, en attente de relecture avant plan

## 1. Pourquoi

Les 24 articles actuels sont fictifs. Entreprises, chiffres, citations et dates ont
été inventés pour donner corps à la maquette. Le site ne peut pas être publié dans cet
état : un média d'information qui invente ses faits n'est pas un média.

Cette refonte remplace les 24 corps par des faits réels, vérifiés sur des sources
consultées, et rend l'absence de source structurellement impossible.

## 2. Modèle éditorial

Cohezi est un **agrégateur sourcé**. Chaque article rapporte un fait d'actualité établi
par d'autres, reformulé dans nos mots, et renvoie aux sources qui l'établissent.

Ce que cela implique :

- Nous n'allons pas sur le terrain. Nous n'avons pas de source de première main, pas
  d'interview, pas de document exclusif.
- Notre apport est la sélection, la synthèse et la mise en perspective pour un lecteur
  francophone.
- Quand deux sources se contredisent, nous rapportons l'écart au lieu de trancher.

## 3. Contrainte juridique, non négociable

**Aucune phrase d'un article source n'est reproduite.** Reprendre le texte d'un média
est une contrefaçon, que la source soit citée ou non. Les corps sont rédigés
intégralement par nous à partir des faits.

Ce qui est repris sans reformulation, et uniquement cela :

- Les **chiffres** (montants, dates, pourcentages, scores) — un fait brut n'est pas
  protégé par le droit d'auteur.
- Les **noms propres** (personnes, entreprises, produits, institutions).
- Les **citations directes de personnes**, entre guillemets, avec le nom de l'auteur et
  le média qui l'a recueillie. Courtes, une phrase au plus, et toujours attribuées.

Les **images restent des visuels générés** par `PlaceholderImage`. Les photographies de
presse sont sous licence ; en reprendre poserait le même problème que recopier le texte.

## 4. Modèle de données

### 4.1 Nouveau type `Source`

```ts
export type Source = {
  /** Média ou organisme, tel qu'on le nomme dans la prose : « Next », « CNIL ». */
  outlet: string;
  /** Titre exact de la page consultée. */
  title: string;
  url: string;
  /** Date de publication de la source (AAAA-MM-JJ). */
  publishedAt: string;
};
```

### 4.2 `Article.sources` devient obligatoire

```ts
export type Article = {
  // …champs existants inchangés…
  /** Sources consultées, 2 à 4 par article. Obligatoire : pas d'article sans source. */
  sources: Source[];
};
```

Le caractère obligatoire est le cœur de la garantie. TypeScript refusera de compiler un
article sans source — la règle est tenue par le compilateur, pas par la discipline de
celui qui écrit.

### 4.3 Attribution dans la prose

Les sources sont listées en fin d'article, et **le corps nomme le média dans la phrase**
quand il rapporte un fait précis : « selon Next », « la CNIL indique que », « rapporte
TechCrunch ». La traçabilité passe par l'écriture, pas par un appareil de notes.

Les références numérotées en ligne, façon Wikipédia, ont été écartées : sur des brèves de
250 mots, l'appareil de notes pèserait plus lourd que le texte. Rien n'empêche d'y passer
plus tard pour des formats longs — la liste de sources en fin d'article reste alors valide.

## 5. Règles de vérification

Ces règles définissent ce que « vérifié » veut dire ici. Elles s'appliquent article par
article.

1. **Toute page citée en source a été chargée et lue.** Une URL devinée, reconstruite ou
   citée de mémoire n'est pas une source.
2. **Aucun fait ne provient d'une portion non lue.** Deux articles de Next sont payants
   au-delà d'un extrait ; seules les parties visibles sont exploitables.
3. **Deux sources indépendantes** pour tout chiffre financier ou score de benchmark, quand
   elles existent. À défaut, la source unique est nommée dans la prose.
4. **Les contradictions sont rapportées, pas arbitrées.** Voir §7.
5. **Une projection n'est pas un chiffre d'affaires.** Les montants prévisionnels sont
   qualifiés comme tels dans le texte.
6. **La source primaire est privilégiée** quand elle est accessible. `openai.com` est
   derrière Cloudflare et `lemonde.fr` derrière un CAPTCHA : tout ce qui concerne OpenAI
   vient de la presse tierce, ce qui est signalé dans la liste de sources.

## 6. Les 24 sujets

Six par rubrique.

**Écart assumé sur l'équilibre.** L'intention était de moitié d'actualité récente, moitié
de sujets de fond. Le relevé donne en réalité **18 faits datés du 1er au 5 septembre 2026
et 6 sujets de fond** (Model Hardware Standard, filigrane obligatoire, souveraineté de
Mistral, enquête CNIL sur les jeunes, affiches IA, AI Act). La raison est simple : ce qui
est librement accessible et vérifiable en ligne, c'est l'actualité chaude. Les sujets de
fond documentés par des sources primaires stables sont plus rares. Rééquilibrer
demanderait un second relevé ciblé sur des dossiers durables — économie de l'inférence,
consommation électrique des datacenters, IA et santé, ouvert contre fermé. Cette décision
revient au commanditaire ; en l'état, la spec décrit le lot 18/6.

### Actualité

| Sujet | Date du fait | Sources |
|---|---|---|
| Claude Fable 5.1 et Mythos 5.1 | 2026-09-01 | Anthropic, Next |
| GPT-6 Astra et le retour du mot AGI | 2026-09-03 | Next, Numerama |
| Gemini 3.8 Flash et sa variante Cyber | 2026-09-03 | Next |
| La panne simultanée des quatre assistants | 2026-09-03 | Next, Numerama |
| Le Model Hardware Standard | 2026-08-27 | Anthropic |
| Le filigrane obligatoire sur les textes générés | 2026-08-02 | Anthropic, Next |

### Business

| Sujet | Date du fait | Sources |
|---|---|---|
| NVIDIA rachète Hugging Face pour 12,9 Md$ | 2026-09-03 | Next |
| Nscale cherche 3,5 Md$ avant son IPO | 2026-09-04 | TechCrunch |
| Crusoe lève 3 Md$ sur 30 Md$ de valorisation | 2026-09-03 | TechCrunch |
| Thinking Machines en discussion à 40 Md$ | 2026-09-03 | TechCrunch |
| La publicité devient un pilier d'OpenAI | 2026-09-01 | Next |
| La souveraineté selon Mistral : Europe et Golfe | 2026-08-11 et 2026-08-24 | Mistral AI |

### Société

| Sujet | Date du fait | Sources |
|---|---|---|
| Des agents OpenAI détournent un wiki allemand | 2026-09-02 à 09-05 | Numerama, TechCrunch |
| Les scribes IA médicaux produisent des erreurs | 2026-09-03 | Next |
| Le Parlement australien inondé de citations inventées | 2026-09-01 | Next |
| New York interdit l'IA générative avant la 4e | 2026-09-03 | Next |
| Les jeunes se confient aux IA conversationnelles | 2026-05-05 | CNIL |
| L'été où les affiches IA ont inondé la France | 2026-08-27 | Next |

### Analyses

| Sujet | Date du fait | Sources |
|---|---|---|
| Le raisonnement opaque d'Astra inquiète la sûreté | 2026-09-02 | TechCrunch |
| Terence Tao veut sanctuariser des problèmes de maths | 2026-09-03 | Numerama |
| Le G20 adopte l'approche américaine | 2026-09-03 | Next |
| Washington prend le parti d'OpenAI contre le NYT | 2026-09-03 | Next |
| RSF montre le contournement des sanctions | 2026-09-03 | Next |
| L'AI Act remanié par l'Omnibus | 2026-07-27 | Commission européenne |

**Mise en avant** : NVIDIA / Hugging Face en une (`featured`), l'AI Act en analyse de fond
(`deepDive`).

Les sujets d'appoint relevés mais non retenus (Genmod de la CNIL, DLSS 5, WeatherNext 3,
Abliteration.ai, Muse Spark de Meta, AfterQuery, le vote Debian, l'étiquetage d'Apple
Music, l'étude Pew, les datacenters dans l'Ohio, les profils IA d'Instagram) servent de
réserve si un sujet retenu se révèle infondé à la rédaction.

## 7. Les contradictions à rapporter

Trois écarts ont été relevés entre sources. Ils ne sont pas des obstacles : ils sont la
matière même de ce qu'un agrégateur apporte.

1. **Benchmarks de GPT-6 Astra.** Numerama annonce 98,6 % à ARC-AGI-3 d'après les chiffres
   d'OpenAI. Next, citant le rapport de l'ARC Prize Foundation, donne 62,7 % avec le
   harnais standard et 99,9 % avec un harnais adapté au fournisseur, pour un coût
   d'inférence atteignant 26 098 $. L'article rapporte les deux et explique que le harnais
   change le résultat.
2. **Volumétrie de Hugging Face.** Le communiqué de NVIDIA parle de 3 millions de modèles,
   500 000 jeux de données et 1 million d'applications ; d'autres décomptes circulent.
   L'article retient les chiffres du communiqué en les attribuant à NVIDIA.
3. **Cause de la panne du 3 septembre.** Aucune cause commune n'est établie. Anthropic n'a
   pas commenté, OpenAI a évoqué une erreur de routage, SpaceXAI a invoqué une panne dans
   son datacenter de Memphis, et aucun grand hébergeur n'a déclaré d'incident. L'article
   dit qu'on ne sait pas.

Un quatrième point relève de la prudence plus que de la contradiction : les
« 103 milliards de revenus » de Nscale sont une projection fondée sur des baux signés, pas
un chiffre d'affaires réalisé. Le texte le qualifie explicitement.

## 8. Structure du corps

Inchangée : 5 à 8 blocs parmi `paragraph`, `heading`, `quote`, `list`, `takeaway`, avec un
`takeaway` final. Le type `ArticleBlock` n'est pas modifié.

Deux règles s'ajoutent pour le contenu réel :

- Un bloc `quote` ne porte que des **paroles réellement prononcées**, avec le nom de la
  personne dans `author`. Plus de citation d'illustration.
- Le premier paragraphe énonce le fait, sa date et son auteur. Un lecteur qui s'arrête
  après une phrase doit savoir ce qui s'est passé.

Longueur visée : 250 à 350 mots. `readingMinutes` est calculé sur la longueur réelle, pas
choisi. La leçon de la version précédente est retenue : on n'allonge pas un texte pour
atteindre un quota.

## 9. Rendu

Nouveau composant `components/article/article-sources.tsx` :

```
Sources
─────────────────────────────
Next · Anthropic relance la course aux modèles avec Claude Fable 5.1 · 1 septembre 2026
Anthropic · Introducing Claude Fable 5.1 and Claude Mythos 5.1 · 1 septembre 2026
```

Placé après le corps, avant « À lire ensuite ». Chaque entrée est un lien externe
(`target="_blank"`, `rel="noopener noreferrer"`), le nom du média en gras, le titre et la
date en gris. Section `aria-labelledby`, comme `RelatedArticles`.

## 10. Ce qui ne change pas

Routes, pagination, recherche, onglets, cartes, composants de mise en page, palette,
polices. La refonte touche le contenu, le type `Article`, et ajoute un composant de rendu.

Les slugs changent, puisque les titres changent. Ces URL n'ont jamais été publiées : rien
ne casse, aucune redirection n'est nécessaire.

## 11. Tests

- `content.test.ts` : chaque article a entre 2 et 4 sources ; chaque source a un `url`
  absolu en `https://`, un `outlet` non vide, un `publishedAt` au format ISO ; la date de
  la source n'est pas postérieure à celle de l'article de plus d'un jour.
- `content.test.ts` : les 24 slugs sont uniques et en minuscules sans accent.
- `article-sources.test.tsx` : la section rend un lien par source, avec `rel` et `target`
  corrects, et ne rend rien pour une liste vide.
- `article-page.test.tsx` : la page d'article affiche la section des sources.
- Les tests existants continuent de passer sans modification autre que l'ajout du champ
  `sources` aux fabriques de test.

## 12. Risques

- **Péremption.** Douze articles portent sur des faits datés de deux semaines. Ils
  vieilliront ensemble. C'est le prix d'un site d'actualité, assumé.
- **Sources qui disparaissent.** Une URL peut mourir. Nous ne construisons pas d'archive :
  la date de publication de la source permet de la retrouver.
- **Sujets non revérifiés.** Le relevé a été fait le 5 septembre 2026. Un fait peut être
  démenti entre le relevé et la rédaction. Chaque source est rechargée au moment d'écrire
  l'article, pas seulement au moment du relevé.
- **Contenu tiers non fiable.** Les pages consultées sont du contenu externe. Elles sont
  traitées comme des données à vérifier, jamais comme des instructions.
