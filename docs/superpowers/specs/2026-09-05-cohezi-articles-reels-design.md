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
  /** Sources consultées, 1 à 4 par article. Obligatoire : pas d'article sans source. */
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
   elles existent. À défaut, la source unique est **obligatoirement nommée dans la prose**,
   afin que le lecteur sache que l'information ne repose que sur elle. Six des vingt-quatre
   articles sont dans ce cas.
4. **Les contradictions sont rapportées, pas arbitrées.** Voir §7.
5. **Une projection n'est pas un chiffre d'affaires.** Les montants prévisionnels sont
   qualifiés comme tels dans le texte.
6. **La source primaire est privilégiée** quand elle est accessible. `openai.com` est
   derrière Cloudflare et `lemonde.fr` derrière un CAPTCHA : tout ce qui concerne OpenAI
   vient de la presse tierce, ce qui est signalé dans la liste de sources.

## 6. Les 24 sujets

Six par rubrique, **12 faits chauds et 12 sujets de fond**. Un fait chaud est daté du
1er au 5 septembre 2026 ; un sujet de fond est adossé à un document dont la valeur tient
au-delà de la semaine — rapport d'autorité, étude chiffrée, texte réglementaire.

### Actualité — 4 chauds, 2 de fond

| Sujet | Date | Type | Sources |
|---|---|---|---|
| Claude Fable 5.1 et Mythos 5.1 | 2026-09-01 | chaud | anthropic.com/claude-fable-and-mythos-5-1 ; next.ink/brief-article/anthropic-relance-la-course-aux-modeles-avec-claude-fable-5-1/ |
| GPT-6 Astra et le retour du mot AGI | 2026-09-03 | chaud | next.ink/254620/ ; numerama.com/tech/2324799- |
| Gemini 3.8 Flash et sa variante Cyber | 2026-09-03 | chaud | next.ink/brief-article/google-lance-gemini-3-8-flash-et-sa-declinaison-cyber/ |
| La panne simultanée des quatre assistants | 2026-09-03 | chaud | next.ink/brief-article/claude-chatgpt-gemini-et-grok-sont-simultanement-tombes-en-panne-spacexai-sexcuse/ ; numerama.com/tech/2325131- |
| Le Model Hardware Standard | 2026-08-27 | fond | anthropic.com/news/model-hardware-standard-research-preview |
| Le filigrane obligatoire sur les textes générés | 2026-08-02 | fond | anthropic.com/news/claude-text-watermark ; next.ink/251980/ |

### Business — 3 chauds, 3 de fond

| Sujet | Date | Type | Sources |
|---|---|---|---|
| NVIDIA rachète Hugging Face pour 12,9 Md$ | 2026-09-03 | chaud | next.ink/253379/ |
| Nscale cherche 3,5 Md$ avant son IPO | 2026-09-04 | chaud | techcrunch.com/2026/09/04/ai-compute-provider-nscale-is-looking-for-3-5b-in-pre-ipo-financing/ |
| La publicité devient un pilier d'OpenAI | 2026-09-01 | chaud | next.ink/brief-article/openai-veut-mettre-toujours-plus-de-publicite-dans-chatgpt/ |
| Le prix du token s'effondre : 9× à 900× par an | 2025-03-12, données 2025-11-20 | fond | epoch.ai/data-insights/llm-inference-price-trends |
| L'électricité que consomme l'IA : 415 TWh mesurés, 950 attendus | 2025-04-10, MàJ 2026-04-16 | fond | iea.org/reports/energy-and-ai/executive-summary ; iea.org/reports/key-questions-on-energy-and-ai/executive-summary |
| La souveraineté selon Mistral : Europe et Golfe | 2026-08-11 et 2026-08-24 | fond | mistral.ai/news/regional-inference-open-models-new-compute/ ; mistral.ai/news/mistral-x-humain/ |

### Société — 3 chauds, 3 de fond

| Sujet | Date | Type | Sources |
|---|---|---|---|
| Des agents OpenAI détournent un wiki allemand | 2026-09-02 à 09-05 | chaud | numerama.com/cyberguerre/2325585- ; techcrunch.com/2026/09/05/openai-confirms-wiki-incident-says-its-working-on-a-framework-for-more-disclosure/ |
| Les scribes IA médicaux produisent des erreurs | 2026-09-03 | chaud | next.ink/254301/ |
| Le Parlement australien inondé de citations inventées | 2026-09-01 | chaud | next.ink/253917/ |
| 1 614 dispositifs médicaux IA, 2,4 % d'essais randomisés | 2026-09-04 | fond | fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices ; hai.stanford.edu/ai-index/2026-ai-index-report/medicine ; ema.europa.eu/en/about-us/how-we-work/big-data/artificial-intelligence |
| Les jeunes se confient aux IA conversationnelles | 2026-05-05 | fond | cnil.fr/fr/ia-conversationnelle-et-sante-mentale-des-jeunes-resultats-de-lenquete-europeenne |
| L'emploi des jeunes développeurs recule de 20 % | 2026-04 | fond | hai.stanford.edu/ai-index/2026-ai-index-report/economy ; next.ink/164900/ |

### Analyses — 2 chauds, 4 de fond

| Sujet | Date | Type | Sources |
|---|---|---|---|
| Washington prend le parti d'OpenAI contre le NYT | 2026-09-03 | chaud | next.ink/254333/ |
| RSF montre le contournement des sanctions | 2026-09-03 | chaud | next.ink/254256/ |
| L'AI Act remanié par l'Omnibus | 2026-07-27 | fond | digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai |
| Peut-on croire les benchmarks ? | 2025-05-25 | fond | arxiv.org/abs/2502.06559 ; hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai |
| Quatre mois d'écart entre modèles ouverts et fermés | 2026-05-29 | fond | epoch.ai/data-insights/open-closed-eci-gap |
| Moissonnage et RGPD : ce que le CEPD exige | 2026-07-07 | fond | cnil.fr/fr/cepd-ia-generative-chaines-blocs ; digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august |

**Mise en avant** : NVIDIA / Hugging Face en une (`featured`), l'AI Act en analyse de fond
(`deepDive`).

### Sujets écartés, gardés en réserve

Solides et vérifiés, mais non retenus faute de place, ou pour éviter la redite : les levées
de Crusoe et de Thinking Machines (la rubrique Business comptait déjà trois tours de
table) ; le raisonnement opaque d'Astra ; Terence Tao et la sanctuarisation des
mathématiques ; le G20 ; l'interdiction scolaire à New York ; les affiches IA de l'été ; le
raccordement au réseau européen ; qui paie l'IA au travail ; le registre européen des
opt-out ; Genmod et la généalogie des modèles ouverts ; l'indice ECI ; le capex des
hyperscalers. Ils servent de remplacement si un sujet retenu se révèle infondé à la
rédaction.

**Un sujet écarté pour une raison de méthode** : « ce que coûte vraiment une requête »
reposait sur un article de Next payant, lu à 32 % seulement. La règle de vérification n° 2
l'interdit. Il est remplacé par la consommation électrique des centres de données, dont la
source primaire de l'AIE est entièrement accessible.

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

### Précautions de lecture sur les sujets de fond

Les sources primaires retenues déclarent elles-mêmes leurs limites. Les ignorer produirait
des articles faussement assurés. Chaque article concerné porte la limite dans le texte.

- **Mesure contre projection.** L'AIE mesure 415 TWh consommés par les centres de données
  en 2024 et 485 TWh en 2025 ; les 950 TWh de 2030 et la fourchette 700–1 700 TWh de 2035
  sont des scénarios. Le texte ne mélange pas les deux registres.
- **Une affirmation de l'AIE reste non chiffrée** : l'énergie par tâche baisserait « d'au
  moins un ordre de grandeur par an », sans mesure publiée sur la page consultée. Elle est
  rapportée comme une affirmation de l'agence, pas comme un fait établi.
- **La liste FDA n'est pas exhaustive**, l'agence le dit : elle est bâtie par repérage de
  termes dans les résumés d'autorisation. Les 1 614 dispositifs sont un plancher.
- **L'écart ouvert/fermé dépend de la méthode.** Epoch donne quatre mois ; une note
  antérieure d'octobre 2025 donnait trois mois, et le chiffre passerait à six mois avec un
  critère de dépassement plus strict. Ce n'est pas une contradiction mais un choix de
  méthode, et l'article le dit.
- **Le record de puissance par site repose sur six points de mesure**, dont deux fois le
  même site, et les points futurs sont des annonces. La tendance du doublement tous les
  dix mois est présentée pour ce qu'elle est : une extrapolation fragile.
- **Les sous-groupes d'enquête sont petits.** L'enquête Epoch/Ipsos sur le financement de
  l'IA au travail compte 49 à 207 répondants par sous-groupe, avec des intervalles larges.
  Si ce sujet sort de la réserve, les écarts sont cités, jamais les niveaux précis.
- **Les intentions déclarées ne sont pas des faits.** Le solde de 2 millions d'emplois du
  Forum économique mondial est une projection d'entreprises interrogées ; la baisse de 20 %
  de l'emploi des développeurs de 22 à 25 ans est une mesure. Le même article porte les
  deux, distingués.
- **Aucun PDF n'a été ouvert** lors du relevé : rapports complets de l'AIE, lignes
  directrices du CEPD, étude sur le registre d'opt-out, étude CNIL/VYV, chapitres de l'AI
  Index. Les faits proviennent des pages de synthèse HTML. Les articles s'en tiennent à
  ce périmètre, ou les PDF sont ouverts à la rédaction.
- **La Haute Autorité de santé est inaccessible** (HTTP 403). Aucun élément français sur
  les dispositifs médicaux à base d'IA n'a pu être vérifié ; l'article sur le sujet reste
  américain et européen, et le dit.

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

- `content.test.ts` : chaque article a entre 1 et 4 sources ; chaque source a un `url`
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
