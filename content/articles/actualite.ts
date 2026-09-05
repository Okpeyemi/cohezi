import type { Article } from '../types';

export const actualiteArticles: Article[] = [
  {
    slug: 'anthropic-lance-claude-fable-5-1-et-mythos-5-1',
    title: 'Anthropic sort deux modèles jumeaux, et un seul est ouvert à tous.',
    excerpt:
      'Fable 5.1 et Mythos 5.1 sont le même modèle avec des garde-fous différents. Le prix affiché ne bouge pas, mais la lecture de cache chute de 75 % — et le coût par tâche reste le plus élevé du marché.',
    category: 'actualite',
    publishedAt: '2026-09-02',
    readingMinutes: 2,
    image: { alt: 'Deux portes identiques, une seule ouverte' },
    body: [
      {
        type: 'paragraph',
        text: 'Anthropic a présenté le 1er septembre 2026 Claude Fable 5.1 et Claude Mythos 5.1. L’entreprise le dit elle-même : ce sont le même modèle, avec des niveaux de garde-fous différents. Fable 5.1 est disponible partout — API Claude, AWS, Google Cloud, Azure. Mythos 5.1 passe par des programmes d’accès de confiance et n’est ouvert, pour l’instant, qu’à un ensemble d’organisations américaines, Anthropic disant travailler avec le gouvernement des États-Unis pour élargir ce cercle.',
      },
      { type: 'heading', text: 'Le prix affiché ne bouge pas, le cache s’effondre' },
      {
        type: 'paragraph',
        text: 'Le tarif reste à 10 dollars par million de tokens en entrée et 50 en sortie. Ce qui change, c’est la lecture de cache : 0,25 dollar par million, soit 75 % de moins. Anthropic en déduit environ 25 % de coût en moins sur une charge typique et jusqu’à 45 % sur du travail très agentique, mesures faites sur quatre semaines d’usage réel en août 2026.',
      },
      {
        type: 'paragraph',
        text: 'Next apporte le contrepoint qui manque à cette présentation. Sur l’index d’Artificial Analysis, plateforme indépendante de comparaison, Fable 5.1 prend bien la première place devant Opus 5 et Fable 5 — mais affiche le coût moyen par tâche le plus élevé, et de loin : 3,69 dollars, contre 2,34 pour Opus 5 et 0,95 pour GPT-5.6 Sol. Un cache moins cher ne fait pas un modèle bon marché.',
      },
      {
        type: 'list',
        items: [
          'Terminal-Bench-Science 0.1 : 52,6 % pour Fable 5.1, contre 29,0 % pour Opus 5 et 22,4 % pour GPT-5.6 Sol.',
          'Terminal-Bench 4.0 : 55,8 % pour Fable 5.1, 60,9 % pour Mythos 5.1.',
          'Humanity’s Last Exam sans outils : 60,9 %, contre 56,6 % pour Opus 5.',
        ],
      },
      { type: 'heading', text: 'Les données restent chez le client' },
      {
        type: 'paragraph',
        text: 'Anthropic annonce en parallèle les Enterprise Frontier Safeguards, qui stockent les données dans une infrastructure contrôlée entièrement par le client et non par Anthropic. Le déploiement se fera par étapes à partir de l’automne. Côté cybersécurité, l’entreprise dit avoir réduit de 60 % les faux positifs de ses filtres, et autorise désormais la découverte de vulnérabilités logicielles — mais pas le développement d’exploits.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Un même modèle, deux régimes d’accès : la vérification devient un produit.',
          'La baisse porte sur le cache, pas sur le prix du token ni sur le coût par tâche.',
          'Le stockage chez le client vise les secteurs régulés, et arrive par étapes.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Anthropic',
        title: 'Introducing Claude Fable 5.1 and Claude Mythos 5.1',
        url: 'https://www.anthropic.com/claude-fable-and-mythos-5-1',
        publishedAt: '2026-09-01',
      },
      {
        outlet: 'Next',
        title: 'Anthropic relance la course aux modèles avec Claude Fable 5.1',
        url: 'https://next.ink/brief-article/anthropic-relance-la-course-aux-modeles-avec-claude-fable-5-1/',
        publishedAt: '2026-09-02',
      },
    ],
  },
  {
    slug: 'gpt-6-astra-openai-agi-et-benchmarks-contestes',
    title: 'OpenAI ressort le mot AGI. Le même test donne 98,6 % ou 62,7 % selon qui le mesure.',
    excerpt:
      'GPT-6 Astra affiche des résultats spectaculaires sur ARC-AGI-3. Mais le score dépend entièrement du harnais de test employé, et l’écart entre les deux lectures est de plus de trente points.',
    category: 'actualite',
    publishedAt: '2026-09-04',
    readingMinutes: 2,
    image: { alt: 'Deux règles graduées différemment' },
    body: [
      {
        type: 'paragraph',
        text: 'OpenAI a dévoilé GPT-6 Astra le 3 septembre 2026. Greg Brockman, président de l’entreprise, a fait le tour des médias pour annoncer l’entrée dans l’ère de l’intelligence artificielle générale. Le modèle est d’abord réservé aux organisations du programme Daybreak, avec un déploiement promis « dans les prochains jours » aux abonnés Plus, Pro, Business et Entreprise, via l’API et AWS. Selon Numerama, il est issu du plus gros entraînement jamais mené par OpenAI : plus de 100 000 GPU au centre Stargate du Texas, avec des modèles antérieurs participant à la supervision.',
      },
      { type: 'heading', text: 'Un score, deux mesures' },
      {
        type: 'paragraph',
        text: 'C’est sur le benchmark ARC-AGI-3 que les lectures divergent. Numerama, reprenant les chiffres publiés par OpenAI, donne 98,6 % pour Astra, contre 7,8 % pour GPT-5.6 Sol et 39,2 % pour Claude Opus 5. Next, s’appuyant sur le rapport de l’ARC Prize Foundation — l’organisation à but non lucratif cofondée par François Chollet qui publie ce test —, donne 62,7 % avec le harnais standard, et 99,9 % seulement avec un harnais adapté aux spécificités du fournisseur.',
      },
      {
        type: 'paragraph',
        text: 'Le harnais, c’est le cadre de test. Le standard est commun et minimal, identique pour tous les modèles ; l’autre est taillé pour celui qu’on évalue. Trente-six points d’écart séparent les deux façons de compter la même chose.',
      },
      {
        type: 'quote',
        text: 'Même si nous pensons qu’Astra représente un progrès significatif vers la généralisation, nous n’affirmons pas qu’il s’agit d’une AGI.',
        author: 'Les auteurs du rapport ARC-AGI-3, cités par Next',
      },
      { type: 'heading', text: 'Et la facture' },
      {
        type: 'paragraph',
        text: 'Next relève que le score standard de 62,7 % a coûté jusqu’à 26 098 dollars d’inférence, et celui de 99,9 % environ 18 817 dollars. À titre de comparaison, les participants humains du même test étaient payés 115 dollars par session de 90 minutes. Surtout, les humains résolvent 100 % des environnements du benchmark, là où Astra n’atteint pas 63 % avec le harnais commun. Côté tarif, le modèle s’aligne sur Fable 5.1 — 10 et 50 dollars par million de tokens —, soit une hausse de 150 % par rapport à GPT-5.6 Sol.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le même test donne 98,6 % ou 62,7 % selon le harnais employé.',
          'Les auteurs du benchmark refusent eux-mêmes d’y voir une preuve d’AGI.',
          'Le score le plus élevé a coûté des dizaines de milliers de dollars d’inférence.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Next',
        title: 'GPT-6 Astra : quand OpenAI annonce l’AGI, l’API présente la facture',
        url: 'https://next.ink/254620/gpt-6-astra-quand-openai-annonce-lagi-lapi-presente-la-facture/',
        publishedAt: '2026-09-04',
      },
      {
        outlet: 'Numerama',
        title: 'OpenAI dévoile GPT-6-Astra, le nouveau modèle flagship de ChatGPT',
        url: 'https://www.numerama.com/tech/2324799-openai-devoile-gpt-6-astra-le-nouveau-modele-flagship-de-chatgpt.html',
        publishedAt: '2026-09-04',
      },
    ],
  },
  {
    slug: 'google-lance-gemini-3-8-flash-et-sa-variante-cyber',
    title: 'Troisième Gemini Flash en six semaines, et Google admet que le gain se paie en tokens.',
    excerpt:
      'La version 3.8 talonne les modèles frontière sur le développement logiciel. Google précise dans la même annonce que ces gains viennent d’un modèle qui « travaille davantage ».',
    category: 'actualite',
    publishedAt: '2026-09-03',
    readingMinutes: 2,
    image: { alt: 'Un compteur qui tourne plus vite' },
    body: [
      {
        type: 'paragraph',
        text: 'Google a déployé le 3 septembre 2026 Gemini 3.8 Flash, troisième sortie de cette famille en six semaines après les versions 3.6 et 3.7, publiées à trois semaines d’intervalle. Flash est la gamme utilitaire de Google, censée offrir le meilleur rapport entre rapidité et coût. Cette fois, elle vient chatouiller les modèles frontière.',
      },
      { type: 'heading', text: 'À un dixième de point des meilleurs' },
      {
        type: 'paragraph',
        text: 'Selon les chiffres rapportés par Next, Google revendique 73,7 % au test DeepSWE, qui mesure le développement logiciel avancé, contre 74 % pour Opus 5 chez Anthropic et 72,7 % pour GPT-5.6 Sol chez OpenAI. Sur les missions de code autonomes dans le terminal, Gemini 3.8 Flash passerait même légèrement devant Opus 5. Pour un modèle vendu comme utilitaire, l’écart avec le haut de gamme se réduit à presque rien.',
      },
      {
        type: 'heading',
        text: 'La nuance vient de Google lui-même',
      },
      {
        type: 'paragraph',
        text: 'L’entreprise ne cache pas d’où viennent ces gains, et c’est le point le plus instructif de l’annonce.',
      },
      {
        type: 'quote',
        text: 'Ces gains de performance découlent d’un choix de conception fondamental : Flash 3.8 travaille davantage. Le modèle peut parfois utiliser plus de jetons pour optimiser les performances, notamment lorsque le niveau d’effort est élevé.',
        author: 'Google, cité par Next',
      },
      {
        type: 'paragraph',
        text: 'Autrement dit, le score monte parce que le modèle exécute des étapes de raisonnement supplémentaires et appelle les outils de façon itérative. Sur une facturation au token, un modèle qui travaille davantage coûte davantage — ce qui relativise l’argument du rapport qualité-prix.',
      },
      {
        type: 'list',
        items: [
          'Tarif de lancement : 0,75 dollar par million de tokens en entrée, 3,75 en sortie.',
          'À partir du 1er janvier : 1,50 et 7,50 dollars par million.',
          'La variante Cyber est réservée aux organisations enregistrées dans le programme Fairwind.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Gemini 3.8 Flash est accessible par l’API et par l’application Gemini pour les abonnés Google AI Pro et Ultra. C’est aussi lui qui alimente désormais les Aperçus IA affichés dans les résultats du moteur de recherche.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Un modèle utilitaire à un dixième de point des modèles frontière sur DeepSWE.',
          'Google reconnaît que le gain vient d’une consommation de tokens plus élevée.',
          'Le tarif de lancement double au 1er janvier.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Next',
        title: 'Google lance Gemini 3.8 Flash et sa déclinaison Cyber',
        url: 'https://next.ink/brief-article/google-lance-gemini-3-8-flash-et-sa-declinaison-cyber/',
        publishedAt: '2026-09-03',
      },
    ],
  },
  {
    slug: 'panne-simultanee-claude-chatgpt-gemini-grok',
    title: 'Quatre assistants tombent le même soir. Un seul acteur a expliqué pourquoi.',
    excerpt:
      'Le 3 septembre, Claude, ChatGPT, Gemini et Grok ont connu des pannes en quelques heures. SpaceXAI s’est excusé pour son datacenter de Memphis. Les autres n’ont rien dit.',
    category: 'actualite',
    publishedAt: '2026-09-04',
    readingMinutes: 2,
    image: { alt: 'Quatre rideaux de fer baissés' },
    body: [
      {
        type: 'paragraph',
        text: 'Dans la soirée du jeudi 3 septembre 2026, quatre des principaux services d’IA générative sont devenus inaccessibles à quelques heures d’intervalle. Anthropic a d’abord signalé un problème sur Claude Sonnet 5, puis un nombre d’erreurs anormal sur Mythos 5.1, Fable 5.1 et Opus 5 ; selon Numerama, la liste s’est ensuite élargie à Mythos 5, Fable 5, Opus 4.8 et Opus 4.6, avant un correctif en fin d’après-midi. OpenAI a relevé une hausse des erreurs sur ChatGPT et Codex, le statut de Grok signalait des problèmes, et les utilisateurs de Gemini remontaient des difficultés d’accès sur Downdetector.',
      },
      { type: 'heading', text: 'Une seule explication publique' },
      {
        type: 'paragraph',
        text: 'Vers 21 h 38 heure française, SpaceXAI a publié des excuses sur X.',
      },
      {
        type: 'quote',
        text: 'Nous sommes désolés pour les problèmes que vous avez pu rencontrer avec Grok à la suite d’une panne survenue ce matin dans notre centre de données de Memphis. Nous tenons également à présenter nos excuses à nos partenaires informatiques concernés.',
        author: 'SpaceXAI, sur X',
      },
      {
        type: 'paragraph',
        text: 'La formule « partenaires informatiques concernés » n’est pas anodine. L’entreprise d’Elon Musk a ouvert en septembre 2024, au sud de Memphis, un datacenter baptisé Colossus, dont elle loue désormais des parties à la plupart des acteurs du secteur — Anthropic compris. Elon Musk a ajouté que des mesures correctives étaient prises.',
      },
      { type: 'heading', text: 'Ce qu’on ne sait pas' },
      {
        type: 'paragraph',
        text: 'Aucune cause commune n’est établie. Wired s’est penché le 3 septembre sur cette simultanéité troublante : mise à part SpaceXAI, aucun grand fournisseur de cloud — ni Cloudflare, ni AWS, ni Microsoft Azure — n’a signalé d’incident ce jour-là. Sollicité, Anthropic a refusé de commenter, renvoyant vers sa page de statut. OpenAI a évoqué une erreur de routage. Et aucun détail technique n’a été donné sur la nature exacte de la panne de Memphis, ni sur la façon dont elle se serait propagée.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Quatre services indépendants, une même soirée, aucune cause commune établie.',
          'Le datacenter Colossus loue de la capacité aux concurrents de son propriétaire.',
          'La concentration de l’infrastructure est le vrai sujet, pas la panne elle-même.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Next',
        title: 'Claude, ChatGPT, Gemini et Grok sont simultanément tombés en panne, SpaceXAI s’excuse',
        url: 'https://next.ink/brief-article/claude-chatgpt-gemini-et-grok-sont-simultanement-tombes-en-panne-spacexai-sexcuse/',
        publishedAt: '2026-09-04',
      },
      {
        outlet: 'Numerama',
        title:
          'Pannes quasi simultanées chez Claude, ChatGPT et Grok : ce que l’on sait de la coïncidence du 3 septembre',
        url: 'https://www.numerama.com/tech/2325131-pannes-quasi-simultanees-chez-claude-chatgpt-et-grok-ce-que-lon-sait-de-la-coincidence-du-3-septembre.html',
        publishedAt: '2026-09-04',
      },
    ],
  },
  {
    slug: 'le-model-hardware-standard-des-agents-aux-commandes-des-instruments',
    title: 'Anthropic ouvre une norme pour laisser des agents piloter microscopes et bras robotisés.',
    excerpt:
      'Le Model Hardware Standard veut ramener de plusieurs mois à quelques heures l’intégration d’instruments de laboratoire. La preview est réservée à un premier cercle de partenaires.',
    category: 'actualite',
    publishedAt: '2026-08-27',
    readingMinutes: 2,
    image: { alt: 'Un bras robotisé au-dessus d’une paillasse' },
    body: [
      {
        type: 'paragraph',
        text: 'Anthropic a ouvert le 27 août 2026 une preview de recherche du Model Hardware Standard, une spécification partagée permettant à des agents d’IA de piloter des appareils physiques. Microscopes, robots de manipulation de liquides, bras robotisés : l’idée est de les faire fonctionner en parallèle, pour des tâches allant d’expériences de découverte de médicaments à la calibration laser d’un ordinateur quantique. La spécification est née d’une collaboration avec le HHMI Janelia Research Campus.',
      },
      { type: 'heading', text: 'Le problème n’est pas l’IA, c’est la plomberie' },
      {
        type: 'paragraph',
        text: 'Anthropic décrit un obstacle très concret : dans un laboratoire ou une usine, chaque appareil a sa propre interface de programmation, et rien ne standardise leur mise en relation. Il faut des spécialistes pour construire des intégrations sur mesure, ce qui prend des semaines, parfois des mois. Une fois les appareils connectés, il n’existe toujours aucun moyen commun de partager leurs données avec un agent, ni de lui permettre de les manœuvrer sans danger.',
      },
      {
        type: 'paragraph',
        text: 'La réponse tient dans un pilote standardisé, une couche logicielle de traduction. Anthropic annonce que le travail d’intégration passe ainsi de plusieurs semaines à quelques heures, voire quelques minutes. Les agents peuvent alors raisonner sur chaque étape d’une expérience, ajuster les paramètres en temps réel et, dans certains cas, se remettre seuls d’une erreur matérielle — ce qui ouvre la voie à des campagnes de mesure tournant en continu.',
      },
      {
        type: 'list',
        items: [
          'Fonctionne avec tout appareil doté d’une interface programmable.',
          'Agnostique du modèle : n’importe quel harnais d’agent peut s’y brancher.',
          'Accessible via des protocoles standards, dont le Model Context Protocol.',
        ],
      },
      { type: 'heading', text: 'Une ouverture progressive, et assumée comme telle' },
      {
        type: 'paragraph',
        text: 'La preview n’est ouverte qu’à un premier groupe de laboratoires de recherche et d’industriels avancés. Anthropic dit vouloir construire avec eux les évaluations de sécurité et les bonnes pratiques applicables à des systèmes d’IA qui manipulent des équipements physiques, avant seulement de publier la norme en open source. L’ordre est notable : la sécurité d’abord, l’ouverture ensuite. Il faut cependant garder en tête que cette description vient de l’entreprise qui promeut la norme, et qu’aucune évaluation indépendante n’est disponible à ce stade.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le verrou de la robotique de laboratoire est l’intégration, pas l’intelligence.',
          'Un pilote standardisé ramène ce travail de plusieurs semaines à quelques heures.',
          'La norme est annoncée en open source, mais après la phase de partenaires fermés.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Anthropic',
        title: 'Previewing the Model Hardware Standard',
        url: 'https://www.anthropic.com/news/model-hardware-standard-research-preview',
        publishedAt: '2026-08-27',
      },
    ],
  },
  {
    slug: 'filigrane-obligatoire-comment-fonctionne-le-tatouage-de-claude',
    title: 'L’Europe impose de marquer les textes générés. Le filigrane se cache dans le choix des mots.',
    excerpt:
      'Depuis le 2 août, les fournisseurs d’IA servant le marché européen doivent marquer leurs contenus. La méthode retenue par Anthropic n’ajoute aucun caractère, et reste indétectable sans la clé.',
    category: 'actualite',
    publishedAt: '2026-08-17',
    readingMinutes: 2,
    image: { alt: 'Un filigrane apparaissant dans du papier tenu à la lumière' },
    body: [
      {
        type: 'paragraph',
        text: 'Depuis le 2 août 2026, le règlement européen sur l’intelligence artificielle impose aux fournisseurs servant le marché de l’Union de marquer les contenus générés. La Commission européenne rappelle qu’au même titre, les agents conversationnels doivent signaler leur nature et les deepfakes être étiquetés. Anthropic a publié le 14 août une note expliquant comment son filigrane fonctionne — et ce qu’il ne fait pas.',
      },
      { type: 'heading', text: 'Rien n’est ajouté au texte' },
      {
        type: 'paragraph',
        text: 'Un modèle de langage écrit un mot à la fois, en choisissant à chaque étape parmi plusieurs candidats plausibles. Après « le temps était froid et », « sucré » est improbable, « couvert » ou « gris » le sont beaucoup moins. Le filigrane exploite cette marge : quand plusieurs mots conviennent également, le choix est orienté par une clé secrète et par les mots précédents. Il en résulte un motif statistique, repérable seulement si l’on détient la clé.',
      },
      {
        type: 'list',
        items: [
          'Aucun caractère caché n’est inséré dans le texte.',
          'Le marquage ne consomme pas de tokens supplémentaires et ne coûte pas plus cher.',
          'La marque ne contient aucune information permettant de remonter à une personne, une organisation ou une conversation.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Anthropic affirme que la différence entre un texte marqué et un texte non marqué est indiscernable pour un lecteur, et sans effet pratique sur la qualité. Elle précise aussi appliquer le marquage à l’échelle mondiale, faute de moyen durable de le limiter à une région — une décision européenne qui déborde donc sur tous les utilisateurs.',
      },
      { type: 'heading', text: 'Ce que la méthode ne peut pas faire' },
      {
        type: 'paragraph',
        text: 'La limite est structurelle et vient du principe même : s’il n’existe qu’une seule façon raisonnable d’écrire quelque chose, il n’y a pas de marge où loger un motif. Les textes courts, le code et les passages très factuels sont donc mal couverts. Anthropic indique avoir signé, avec environ 190 autres signataires, le code de bonnes pratiques européen sur la transparence des contenus générés, en juillet 2026.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le filigrane ne s’ajoute pas au texte : il oriente le choix entre mots équivalents.',
          'Il ne permet d’identifier ni un utilisateur ni une conversation.',
          'Il devient inopérant là où l’écriture n’offre aucune alternative : code, textes courts.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Anthropic',
        title: 'How Claude’s text watermark works',
        url: 'https://www.anthropic.com/news/claude-text-watermark',
        publishedAt: '2026-08-14',
      },
      {
        outlet: 'Next',
        title: 'Anthropic : le tatouage de Claude se niche dans le choix des mots',
        url: 'https://next.ink/251980/anthropic-le-tatouage-de-claude-se-niche-dans-le-choix-des-mots/',
        publishedAt: '2026-08-17',
      },
      {
        outlet: 'Commission européenne',
        title: 'Commission starts enforcing AI Act rules and new transparency requirements on 2 August',
        url: 'https://digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august',
        publishedAt: '2026-08-02',
      },
    ],
  },
];
