import type { Article } from '../types';

export const actualiteArticles: Article[] = [
  {
    slug: 'openai-lance-gpt-6-ce-que-ca-change-pour-les-entreprises',
    title: 'OpenAI lance GPT-6. Voilà pourquoi les entreprises vont devoir revoir leurs plans.',
    excerpt:
      'Fenêtre de contexte illimitée, agents natifs et prix divisé par trois : la nouvelle génération ne change pas seulement les benchmarks, elle bouscule les contrats signés l’an dernier.',
    category: 'actualite',
    publishedAt: '2026-09-02',
    readingMinutes: 2,
    image: { alt: 'Salle de conférence lors de l’annonce de GPT-6' },
    featured: true,
    body: [
      {
        type: 'paragraph',
        text: 'OpenAI a présenté GPT-6 mardi, avec trois annonces qui comptent davantage que les scores affichés : une fenêtre de contexte présentée comme illimitée, des agents capables d’enchaîner des tâches sans supervision, et un prix par million de jetons divisé par trois par rapport à la génération précédente.',
      },
      { type: 'heading', text: 'Le prix change la donne avant la performance' },
      {
        type: 'paragraph',
        text: 'Les gains de qualité sont réels mais incrémentaux. La rupture est ailleurs : à ce tarif, des usages qui n’étaient pas rentables le deviennent. Traiter l’intégralité des tickets de support, relire chaque contrat, résumer tous les appels commerciaux : ces chantiers étaient chiffrés puis abandonnés depuis deux ans faute d’équation économique.',
      },
      {
        type: 'paragraph',
        text: 'Les directions qui ont signé des engagements pluriannuels en 2025, souvent avec un volume minimum garanti, découvrent qu’elles paient une génération dépassée au prix fort. Plusieurs revendeurs confirment recevoir des demandes de renégociation depuis l’annonce.',
      },
      {
        type: 'list',
        items: [
          'Les contrats à volume garanti signés avant 2026 deviennent défavorables presque partout.',
          'Les projets écartés pour cause de coût méritent d’être rouverts, chiffres à l’appui.',
          'La fenêtre de contexte étendue supprime une partie du travail de découpage des documents.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Deux inconnues demeurent. La première est la stabilité des agents en production : les démonstrations enchaînent une dizaine d’étapes sans erreur, les retours terrain diront si cela tient sur des processus réels. La seconde est la politique tarifaire à douze mois, car ce prix d’appel ressemble à une conquête de marché plus qu’à un équilibre durable.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'La baisse de prix pèse plus que le gain de performance dans les décisions à venir.',
          'Les engagements pluriannuels signés en 2025 sont à renégocier.',
          'La fiabilité des agents en production reste à démontrer hors démonstration.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Cohezi',
        title: 'Contenu de démonstration, en attente de sources réelles',
        url: 'https://cohezi.example/placeholder',
        publishedAt: '2026-09-05',
      },
    ],
  },
  {
    slug: 'ai-act-entre-en-application-ce-qui-devient-obligatoire',
    title: 'L’AI Act entre en application : ce qui devient obligatoire dès ce mois-ci.',
    excerpt:
      'Transparence des modèles, registre des systèmes à haut risque, sanctions jusqu’à 7 % du chiffre d’affaires. Le calendrier, les obligations réelles et les zones grises qui restent.',
    category: 'actualite',
    publishedAt: '2026-09-01',
    readingMinutes: 2,
    image: { alt: 'Façade du Parlement européen à Bruxelles' },
    body: [
      {
        type: 'paragraph',
        text: 'Les premières obligations contraignantes du règlement européen sur l’intelligence artificielle s’appliquent depuis ce mois-ci. Après deux ans de transition, les entreprises qui déploient des systèmes classés à haut risque doivent tenir un registre, documenter leurs jeux de données et désigner un responsable de conformité.',
      },
      { type: 'heading', text: 'Trois obligations qui mordent vraiment' },
      {
        type: 'paragraph',
        text: 'La documentation technique arrive en tête : il faut décrire les données d’entraînement, les limites connues du système et les mesures prises contre les biais. Vient ensuite la supervision humaine, qui doit être effective et non déclarative. Enfin, l’information des personnes concernées lorsqu’une décision automatisée les affecte.',
      },
      {
        type: 'paragraph',
        text: 'Les sanctions atteignent 7 % du chiffre d’affaires mondial pour les pratiques interdites, 3 % pour un manquement aux obligations de transparence. Les autorités nationales disposent désormais du pouvoir d’ordonner le retrait d’un système du marché.',
      },
      {
        type: 'quote',
        text: 'La difficulté n’est pas de comprendre le texte, c’est de savoir dans quelle catégorie tombe un système qui évolue tous les trois mois.',
        author: 'Une responsable conformité d’un groupe bancaire européen',
      },
      { type: 'heading', text: 'Les zones grises qui subsistent' },
      {
        type: 'paragraph',
        text: 'La classification reste le point faible. Un assistant interne d’aide à la rédaction n’est pas à haut risque ; le même assistant utilisé pour trier des candidatures l’est. Beaucoup d’entreprises découvrent que l’usage, et non l’outil, détermine le régime applicable. Les premières décisions des autorités, attendues d’ici la fin de l’année, feront jurisprudence.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Registre, documentation et supervision humaine sont exigibles dès maintenant.',
          'C’est l’usage qui classe un système, pas sa nature technique.',
          'Les premières décisions d’autorité fixeront l’interprétation réelle du texte.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Cohezi',
        title: 'Contenu de démonstration, en attente de sources réelles',
        url: 'https://cohezi.example/placeholder',
        publishedAt: '2026-09-05',
      },
    ],
  },
  {
    slug: 'apple-assistant-ia-hors-ligne-ios-27',
    title: 'Apple intègre un assistant IA hors ligne dans iOS 27. La fin du cloud obligatoire ?',
    excerpt:
      'Le modèle tourne entièrement sur la puce du téléphone. Ce que cela change pour la vie privée, l’autonomie et les développeurs qui vendaient de l’IA par abonnement.',
    category: 'actualite',
    publishedAt: '2026-08-28',
    readingMinutes: 2,
    image: { alt: 'Main tenant un iPhone affichant un assistant vocal' },
    body: [
      {
        type: 'paragraph',
        text: 'iOS 27 embarque un assistant qui fonctionne sans connexion. Résumé de messages, réponses suggérées, recherche dans les photos et transcription vocale s’exécutent sur la puce du téléphone, sans qu’aucune donnée ne quitte l’appareil.',
      },
      { type: 'heading', text: 'Un argument de vie privée qui devient vérifiable' },
      {
        type: 'paragraph',
        text: 'Jusqu’ici, la promesse de confidentialité reposait sur la parole du fournisseur. Un traitement local la rend démontrable : en mode avion, l’assistant continue de fonctionner. C’est un déplacement du débat, du contrat de confiance vers la preuve technique.',
      },
      {
        type: 'paragraph',
        text: 'Le compromis est ailleurs. Le modèle local est nettement plus petit, donc moins capable sur les tâches de raisonnement complexes, et il consomme de la batterie. Apple bascule vers ses serveurs pour les requêtes lourdes, en le signalant à l’utilisateur.',
      },
      {
        type: 'list',
        items: [
          'Les usages courants deviennent gratuits et instantanés, sans latence réseau.',
          'Les applications qui vendaient ces mêmes fonctions par abonnement perdent leur raison d’être.',
          'La bascule vers le cloud reste nécessaire pour les tâches longues ou multiétapes.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'La question ouverte est celle de l’accès des développeurs tiers à ce modèle local. S’il reste réservé aux applications d’Apple, l’écosystème se referme d’un cran. S’il s’ouvre, une génération entière d’applications payantes voit son modèle économique s’effondrer en une mise à jour.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le traitement local rend la promesse de confidentialité vérifiable.',
          'Les fonctions simples deviennent gratuites, les usages complexes restent dans le cloud.',
          'L’ouverture du modèle aux développeurs tiers décidera de l’impact réel.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Cohezi',
        title: 'Contenu de démonstration, en attente de sources réelles',
        url: 'https://cohezi.example/placeholder',
        publishedAt: '2026-09-05',
      },
    ],
  },
  {
    slug: 'google-fusionne-search-et-gemini',
    title: 'Google fusionne Search et Gemini. Ce que ça change pour ceux qui vivent du web.',
    excerpt:
      'Les réponses générées remplacent les dix liens bleus par défaut. Médias, e-commerçants et créateurs découvrent un trafic qui ne revient plus : les premiers chiffres et les parades.',
    category: 'actualite',
    publishedAt: '2026-08-26',
    readingMinutes: 2,
    image: { alt: 'Écran d’ordinateur affichant une page de résultats de recherche' },
    body: [
      {
        type: 'paragraph',
        text: 'Depuis la semaine dernière, une recherche sur Google affiche par défaut une réponse générée, suivie de quelques sources. Les dix liens bleus existent encore, sous un onglet. Le changement paraît cosmétique ; il déplace en réalité l’économie de l’attention sur le web.',
      },
      { type: 'heading', text: 'Le trafic baisse là où la réponse suffit' },
      {
        type: 'paragraph',
        text: 'Les premières mesures des éditeurs convergent : les requêtes informationnelles, celles qui appelaient une définition ou un chiffre, perdent entre 30 et 60 % de clics. Les requêtes transactionnelles et les recherches de marque bougent peu. Autrement dit, le contenu explicatif générique perd sa fonction d’appel.',
      },
      {
        type: 'paragraph',
        text: 'Plusieurs médias observent un effet secondaire inattendu : le trafic restant convertit mieux. Les visiteurs qui cliquent malgré la réponse affichée cherchent quelque chose que la synthèse ne donne pas, et vont plus loin dans la page.',
      },
      {
        type: 'list',
        items: [
          'Les contenus de définition et de comparaison basique perdent l’essentiel de leur audience.',
          'L’analyse, l’enquête et le point de vue restent des motifs de clic.',
          'La newsletter et l’application deviennent les seuls canaux réellement possédés.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Deux échéances comptent. La première est la position des autorités de concurrence européennes, saisies par plusieurs syndicats d’éditeurs. La seconde est l’arrivée annoncée d’un partage de revenus avec les sources citées, dont ni le montant ni le mécanisme ne sont connus.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le contenu explicatif générique perd sa fonction d’acquisition.',
          'Le trafic résiduel est plus qualifié, mais nettement moins volumineux.',
          'Les canaux possédés deviennent la seule protection à court terme.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Cohezi',
        title: 'Contenu de démonstration, en attente de sources réelles',
        url: 'https://cohezi.example/placeholder',
        publishedAt: '2026-09-05',
      },
    ],
  },
  {
    slug: 'nvidia-devoile-ses-puces-rubin',
    title: 'Nvidia dévoile ses puces Rubin. Pourquoi la course au calcul repart de plus belle.',
    excerpt:
      'Quatre fois plus de mémoire, une consommation en hausse et des livraisons déjà réservées jusqu’en 2028. Derrière l’annonce, une question : qui pourra encore se payer l’entraînement des modèles ?',
    category: 'actualite',
    publishedAt: '2026-08-22',
    readingMinutes: 2,
    image: { alt: 'Gros plan sur une carte accélératrice dans un centre de données' },
    body: [
      {
        type: 'paragraph',
        text: 'Nvidia a présenté Rubin, sa nouvelle génération d’accélérateurs, avec quatre fois plus de mémoire embarquée que la précédente et une bande passante doublée. Les premières livraisons sont annoncées pour le premier trimestre 2027, et le carnet de commandes couvre déjà 2028.',
      },
      { type: 'heading', text: 'La mémoire, pas la puissance brute' },
      {
        type: 'paragraph',
        text: 'Le goulet d’étranglement de l’entraînement n’est plus le nombre d’opérations par seconde mais la quantité de mémoire disponible par accélérateur. Un modèle qui tient en mémoire s’entraîne sans découpage coûteux entre machines. C’est là que Rubin change les équations, plus que sur les scores de calcul pur.',
      },
      {
        type: 'paragraph',
        text: 'La contrepartie est énergétique. Chaque carte consomme davantage, et les centres de données conçus pour la génération précédente ne peuvent pas simplement les accueillir : refroidissement et alimentation sont à revoir.',
      },
      {
        type: 'quote',
        text: 'On ne remplace plus des cartes, on reconstruit des salles. Le cycle d’investissement n’a plus rien à voir avec celui du serveur classique.',
        author: 'Un directeur technique d’un opérateur de centres de données européen',
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Le carnet de commandes déjà rempli signifie que les acteurs sans contrat d’approvisionnement attendront trois ans ou loueront à prix fort. La question n’est plus la performance des modèles mais l’accès au matériel qui permet de les entraîner, ce qui referme un peu plus le champ des concurrents crédibles.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'La mémoire par accélérateur devient le facteur limitant de l’entraînement.',
          'Accueillir ces cartes suppose de reconstruire l’infrastructure électrique et de refroidissement.',
          'L’accès au matériel, réservé jusqu’en 2028, sélectionne les acteurs capables de rivaliser.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Cohezi',
        title: 'Contenu de démonstration, en attente de sources réelles',
        url: 'https://cohezi.example/placeholder',
        publishedAt: '2026-09-05',
      },
    ],
  },
];
