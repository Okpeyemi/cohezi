import type { Article } from '../types';

export const businessArticles: Article[] = [
  {
    slug: 'hypervault-campus-ia-hyderabad-un-gigawatt',
    title: 'TCS engage jusqu’à 7,4 milliards de dollars dans un campus IA d’un gigawatt.',
    excerpt:
      'HyperVault a sécurisé 264 acres à Hyderabad. Le projet sera construit par phases : le gigawatt, les milliers d’emplois et la neutralité hydrique restent des objectifs, pas encore des résultats.',
    category: 'business',
    publishedAt: '2026-09-05',
    readingMinutes: 3,
    image: { src: '/images/articles/hypervault-hyderabad.webp', alt: 'Un vaste campus de centres de données en construction à Hyderabad' },
    body: [
      {
        type: 'paragraph',
        text: 'HyperVault, filiale de Tata Consultancy Services, a annoncé le 5 septembre 2026 avoir sécurisé 264 acres à Hyderabad, dans l’État indien du Telangana, pour développer un campus de centres de données consacré à l’IA. La capacité visée atteint un gigawatt et l’investissement annoncé par HyperVault et ses partenaires peut aller jusqu’à 700 milliards de roupies, soit environ 7,4 milliards de dollars.',
      },
      { type: 'heading', text: 'Un gigawatt est une cible de long terme' },
      {
        type: 'paragraph',
        text: 'Le communiqué de TCS précise que la construction sera menée par phases, au rythme de la demande et des besoins technologiques. Il serait donc trompeur de présenter le campus comme déjà opérationnel à pleine capacité. L’entreprise vise des déploiements de GPU à haute densité pour l’entraînement, l’inférence et les charges de calcul avancées, avec refroidissement liquide direct sur puce.',
      },
      { type: 'heading', text: 'L’infrastructure devient le terrain de la compétition' },
      {
        type: 'paragraph',
        text: 'L’annonce illustre le déplacement de la course à l’IA vers l’électricité, le foncier, le refroidissement et les réseaux. L’Inde cherche ici à héberger directement les charges des laboratoires de pointe et des hyperscalers, plutôt qu’à rester seulement un marché de services numériques.',
      },
      {
        type: 'paragraph',
        text: 'TCS promet de l’énergie verte, une conception visant la neutralité hydrique et plusieurs milliers d’emplois directs et indirects. Ces éléments sont des engagements du promoteur : leur réalisation dépendra du calendrier de construction, des contrats clients et de l’approvisionnement énergétique du site.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          '264 acres sécurisés à Hyderabad pour un campus pouvant atteindre un gigawatt.',
          'Jusqu’à 700 milliards de roupies investies par HyperVault et ses partenaires.',
          'La capacité, les emplois et les objectifs environnementaux seront réalisés par phases.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'TCS',
        title: 'TCS’ HyperVault to establish large-scale AI data center campus in Telangana',
        url: 'https://www.tcs.com/who-we-are/newsroom/press-release/tcs-hypervault-establish-large-scale-ai-data-center-campus-telangana',
        publishedAt: '2026-09-05',
      },
      {
        outlet: 'Reuters',
        title: 'India’s TCS unit to invest up to $7.4 billion in AI data center campus',
        url: 'https://www.reuters.com/world/india/indias-tcs-unit-invest-up-74-billion-ai-data-center-campus-2026-09-05/',
        publishedAt: '2026-09-05',
      },
    ],
  },
  {
    slug: 'foxconn-record-aout-serveurs-ia',
    title: 'La demande en serveurs IA porte Foxconn vers un nouveau record mensuel.',
    excerpt:
      'Le chiffre d’affaires d’août atteint 921,8 milliards de dollars taïwanais, en hausse de 51,98 % sur un an. C’est un signal industriel fort, pas une mesure directe de tout le marché de l’IA.',
    category: 'business',
    publishedAt: '2026-09-05',
    readingMinutes: 2,
    image: { src: '/images/articles/foxconn-ai-servers.webp', alt: 'Des rangées de serveurs IA en cours d’assemblage dans une usine' },
    body: [
      {
        type: 'paragraph',
        text: 'Foxconn a déclaré le 5 septembre 2026 un chiffre d’affaires d’août de 921,8 milliards de dollars taïwanais, environ 29,15 milliards de dollars américains. La progression atteint 51,98 % sur un an : un record pour un mois d’août et le deuxième mois consécutif au-dessus de 900 milliards de dollars taïwanais.',
      },
      { type: 'heading', text: 'Le signal vient de la chaîne de production' },
      {
        type: 'paragraph',
        text: 'Foxconn est le plus grand fabricant de serveurs de NVIDIA et reste un fournisseur majeur d’Apple. Sa croissance fournit donc un indicateur concret de commandes et de livraisons liées aux infrastructures d’IA, au-delà des annonces de modèles. L’entreprise attribue l’amélioration de ses perspectives trimestrielles à la demande en produits IA et à la haute saison des équipements informatiques et télécoms.',
      },
      { type: 'heading', text: 'Ce que le chiffre ne dit pas' },
      {
        type: 'paragraph',
        text: 'Le revenu mensuel agrège plusieurs activités et ne permet pas d’isoler à lui seul la part exacte des serveurs IA. Foxconn ne publie pas non plus de prévision chiffrée pour le trimestre. Il faut donc lire ce record comme un signal de capacité industrielle et non comme une mesure exhaustive de la demande mondiale.',
      },
      {
        type: 'paragraph',
        text: 'La dynamique s’inscrit néanmoins dans une tendance plus longue : le bénéfice net du deuxième trimestre avait déjà progressé de 35 %, tandis que les activités cloud et réseau représentaient plus de la moitié du chiffre d’affaires trimestriel.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          '921,8 milliards de dollars taïwanais de revenus en août, +51,98 % sur un an.',
          'La demande en serveurs IA soutient la croissance, sans être isolée dans ce total mensuel.',
          'Foxconn anticipe un troisième trimestre supérieur aux attentes, sans donner de chiffre précis.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Reuters',
        title: 'Foxconn says third quarter to outperform market expectations on AI strength',
        url: 'https://www.reuters.com/world/asia-pacific/foxconn-says-third-quarter-outperform-market-expectations-ai-strength-2026-09-05/',
        publishedAt: '2026-09-05',
      },
      {
        outlet: 'Hon Hai Technology Group',
        title: 'Hon Hai Technology Group Announces Second Quarter 2026 Financial Results',
        url: 'https://www.honhai.com/en-us/press-center/press-releases/latest-news/2095',
        publishedAt: '2026-08-12',
      },
    ],
  },
  {
    slug: 'nvidia-rachete-hugging-face-pour-12-9-milliards',
    title: 'NVIDIA va racheter Hugging Face. En janvier, la startup refusait encore son argent.',
    excerpt:
      'Un accord de 12,93 milliards de dollars pour la plateforme fondée par trois Français, encore soumis aux autorisations réglementaires. Huit mois plus tôt, elle déclinait un investissement du même NVIDIA au nom de son indépendance.',
    category: 'business',
    publishedAt: '2026-09-03',
    readingMinutes: 2,
    featured: true,
    image: { src: '/images/articles/nvidia-hugging-face.webp', alt: 'Deux écosystèmes technologiques en cours de rapprochement' },
    body: [
      {
        type: 'paragraph',
        text: 'NVIDIA a annoncé le jeudi 3 septembre 2026 un accord pour acquérir Hugging Face pour 12,93 milliards de dollars. L’opération reste soumise aux autorisations réglementaires et doit être finalisée en 2027 : parler d’un rachat déjà achevé serait prématuré. La plateforme, souvent décrite comme le GitHub des modèles d’IA, a été fondée aux États-Unis par trois Français : Clément Delangue, Julien Chaumond et Thomas Wolf.',
      },
      { type: 'heading', text: 'Le même acheteur, éconduit huit mois plus tôt' },
      {
        type: 'paragraph',
        text: 'L’histoire vaut d’être racontée dans l’ordre. Lors de son dernier tour de table en 2023, Hugging Face avait levé 235 millions de dollars sur une valorisation de 4,5 milliards, avec les fonds de Google, IBM, Salesforce — et de NVIDIA, déjà au capital. Puis, en janvier dernier, le Financial Times révélait que la startup avait refusé une proposition d’investissement de 500 millions de dollars formulée par ce même NVIDIA, qui l’aurait valorisée autour de 7 milliards. Le motif invoqué alors par Clément Delangue et son équipe : maintenir une forme d’indépendance vis-à-vis de l’un des principaux fournisseurs du secteur.',
      },
      {
        type: 'paragraph',
        text: 'Julien Chaumond, directeur technique et cofondateur, a justifié le revirement sur X.',
      },
      {
        type: 'quote',
        text: 'Compte tenu de la position de Jensen Huang sur l’IA open source et de son engagement à la défendre lorsqu’elle était menacée plus tôt cet été, NVIDIA était le seul partenaire que nous avons sérieusement envisagé.',
        author: 'Julien Chaumond, cofondateur de Hugging Face, cité par Next',
      },
      { type: 'heading', text: 'Ce que NVIDIA achète, selon NVIDIA' },
      {
        type: 'paragraph',
        text: 'Le communiqué avance ses chiffres : plus de 18 millions de développeurs, chercheurs et créateurs, plus de 3 millions de modèles, 500 000 jeux de données, 1 million d’applications et plus de 200 000 entreprises utilisatrices. Ces volumes viennent de l’acheteur, pas d’un comptage indépendant. Rapportés au chiffre d’affaires annuel estimé par The Information, environ 150 millions de dollars, ils donnent un multiple de l’ordre de 86.',
      },
      {
        type: 'paragraph',
        text: 'Selon Next, The Information voit surtout dans l’opération une façon pour NVIDIA de remettre un pied dans le cloud, en s’appuyant sur la popularité de la plateforme pour vendre de la capacité de calcul. Détail piquant relevé par le média : ce sont aujourd’hui les modèles chinois Qwen et GLM qui trustent le classement des plus populaires.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le refus de janvier portait sur 500 millions, l’accord de septembre sur 12,93 milliards.',
          'Les chiffres d’usage émanent du communiqué de l’acquéreur, pas d’un tiers.',
          'La promesse de neutralité de la plateforme est désormais celle de son futur propriétaire.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'NVIDIA',
        title: 'NVIDIA to Acquire Hugging Face',
        url: 'https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/',
        publishedAt: '2026-09-03',
      },
      {
        outlet: 'Next',
        title: '[MàJ] NVIDIA rachète Hugging Face pour 12,9 milliards de dollars',
        url: 'https://next.ink/253379/nvidia-en-passe-de-racheter-hugging-face-pour-129-milliards-de-dollars/',
        publishedAt: '2026-09-03',
      },
    ],
  },
  {
    slug: 'nscale-cherche-3-5-milliards-avant-son-introduction-en-bourse',
    title: 'Nscale cherche 3,5 milliards, et parle de 103 milliards qui n’existent pas encore.',
    excerpt:
      'Le fournisseur britannique de calcul pourrait entrer en Bourse ce mois-ci. Le chiffre qu’il présente aux investisseurs est une projection fondée sur des baux signés, pas des ventes réalisées.',
    category: 'business',
    publishedAt: '2026-09-04',
    readingMinutes: 2,
    image: { src: '/images/articles/nscale-financing.webp', alt: 'Un centre de données en construction devant des projections financières' },
    body: [
      {
        type: 'paragraph',
        text: 'Nscale, société britannique d’infrastructure d’IA fondée il y a deux ans à peine, dit pouvoir entrer en Bourse dès ce mois-ci. Avant cette introduction, elle négocie 3,5 milliards de dollars supplémentaires, rapporte TechCrunch d’après Bloomberg : 1,5 milliard en obligations convertibles auprès d’un groupe d’investisseurs, et 2 milliards de financement auprès de NVIDIA.',
      },
      { type: 'heading', text: 'Une trajectoire de levées en accéléré' },
      {
        type: 'paragraph',
        text: 'Le rythme donne le vertige. La série A de décembre 2024 avait levé 155 millions de dollars. La série B de mars a porté 1,1 milliard, menée par le fonds Aker, et Nscale la présentait comme la plus importante série B de l’histoire européenne. NVIDIA participait déjà à ce tour : l’entreprise est donc à la fois investisseur, fournisseur et, désormais, prêteur potentiel.',
      },
      {
        type: 'paragraph',
        text: 'Nscale a par ailleurs signé avec Anthropic un contrat d’environ 45 milliards de dollars, dans un contexte où, comme le note TechCrunch, la capacité de calcul est devenue une monnaie d’échange concurrentielle.',
      },
      { type: 'heading', text: 'Le chiffre qu’il faut lire deux fois' },
      {
        type: 'paragraph',
        text: 'C’est ici que la prudence s’impose. Des informations parues cette semaine indiquent que Nscale a présenté à des investisseurs potentiels un montant d’environ 103 milliards de dollars de revenus, à la suite de ce contrat. Or, selon The Information citée par TechCrunch, ce chiffre n’est pas un chiffre d’affaires : c’est une projection fondée sur des baux clients signés. La différence est considérable. Un bail signé est une promesse de paiement étalée sur des années, suspendue à la capacité du client à honorer son engagement autant qu’à celle du fournisseur à livrer la capacité promise.',
      },
      {
        type: 'list',
        items: [
          '155 millions de dollars en décembre 2024, série A.',
          '1,1 milliard en mars, série B menée par Aker.',
          '3,5 milliards recherchés aujourd’hui, dont 2 auprès de NVIDIA.',
        ],
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Les 103 milliards annoncés sont une projection sur baux signés, pas des ventes.',
          'NVIDIA serait à la fois investisseur, fournisseur et prêteur de la même société.',
          'Deux ans séparent la fondation de l’entreprise d’une possible introduction en Bourse.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'TechCrunch',
        title: 'AI compute provider Nscale is looking for $3.5B in pre-IPO financing',
        url: 'https://techcrunch.com/2026/09/04/ai-compute-provider-nscale-is-looking-for-3-5b-in-pre-ipo-financing/',
        publishedAt: '2026-09-04',
      },
    ],
  },
  {
    slug: 'la-publicite-devient-un-pilier-du-modele-d-openai',
    title: 'La publicité rapporte un milliard à OpenAI, et devient un « pilier » en moins de 200 jours.',
    excerpt:
      'Introduite en février aux États-Unis, la réclame arrive en France. Le mot « pilier » sert surtout à démontrer, avant l’introduction en Bourse, que les revenus sont diversifiés.',
    category: 'business',
    publishedAt: '2026-09-01',
    readingMinutes: 2,
    image: { src: '/images/articles/openai-advertising.webp', alt: 'Un bandeau publicitaire glissé dans une conversation' },
    body: [
      {
        type: 'paragraph',
        text: 'La publicité dans ChatGPT représente déjà un milliard de dollars de revenus annualisés, d’après les projections d’OpenAI rapportées par Next. Il faut lire cette phrase avec précaution : il s’agit d’une projection annualisée, pas d’un encaissement constaté sur douze mois. La réclame a été introduite aux États-Unis en février et n’est en phase de lancement en France et en Europe que depuis peu.',
      },
      { type: 'heading', text: 'Un mot choisi pour la Bourse' },
      {
        type: 'paragraph',
        text: 'OpenAI qualifie désormais la publicité de « pilier » de son modèle économique. Next relève l’écart : sa présence dans ChatGPT ne remonte même pas à deux cents jours. Le vocabulaire s’explique mieux par le calendrier financier que par l’histoire du produit. L’entreprise prépare son introduction en Bourse et cherche à démontrer que ses revenus reposent sur des sources diversifiées — abonnements, offres aux entreprises, API facturée à l’usage, et maintenant publicité.',
      },
      {
        type: 'quote',
        text: 'Ces offres donnent aux particuliers, aux développeurs et aux entreprises le choix dans la manière d’accéder aux produits OpenAI, y compris avec une formule gratuite financée par la publicité qui contribue à maintenir ChatGPT accessible à plus d’un milliard d’utilisateurs actifs hebdomadaires.',
        author: 'OpenAI, cité par Next',
      },
      { type: 'heading', text: 'Où elle apparaît, et ce qu’OpenAI promet' },
      {
        type: 'paragraph',
        text: 'Les annonces prennent la forme de bandeaux étiquetés et séparés de la conversation. Elles apparaissent dans la version gratuite ainsi que dans ChatGPT Go, l’abonnement à 8 euros par mois — payer ne suffit donc pas toujours à les éviter. OpenAI assure que la publicité n’influence pas les réponses fournies, et que les annonceurs n’ont pas accès aux conversations privées.',
      },
      {
        type: 'paragraph',
        text: 'Ces garanties reposent sur la parole de l’entreprise, sans mécanisme de vérification externe décrit à ce stade. Next note qu’OpenAI ajoute continuer « d’apprendre et de s’améliorer », formule qui semble s’adresser davantage aux annonceurs qu’aux utilisateurs.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le milliard annoncé est une projection annualisée, pas un revenu encaissé.',
          'Le mot « pilier » sert le récit de l’introduction en Bourse.',
          'L’abonnement à 8 euros n’exonère pas de publicité.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Next',
        title: 'OpenAI veut mettre toujours plus de publicité dans ChatGPT',
        url: 'https://next.ink/brief-article/openai-veut-mettre-toujours-plus-de-publicite-dans-chatgpt/',
        publishedAt: '2026-09-01',
      },
    ],
  },
  {
    slug: 'le-prix-du-token-s-effondre-9-a-900-fois-par-an',
    title: 'Le prix de l’inférence s’effondre, mais pas au même rythme selon ce qu’on demande.',
    excerpt:
      'Epoch AI mesure la baisse du prix pour atteindre un niveau de performance donné. Selon le palier, elle va de 9 à 900 fois par an — et les chutes les plus vives sont les moins sûres de durer.',
    category: 'business',
    publishedAt: '2025-03-12',
    readingMinutes: 2,
    image: { src: '/images/articles/inference-price.webp', alt: 'Plusieurs courbes de coût descendant à des rythmes différents' },
    body: [
      {
        type: 'paragraph',
        text: 'Tout le monde répète que l’IA devient moins chère. Encore faut-il dire moins chère pour quoi. C’est l’apport de ce travail d’Epoch AI, signé Ben Cottier, Ben Snodin, David Owen et Tom Adamczewski : plutôt que de suivre le prix d’un modèle, il suit le prix nécessaire pour atteindre un niveau de performance donné, et mesure à quelle vitesse ce prix tombe.',
      },
      { type: 'heading', text: 'Une méthode qui change la question' },
      {
        type: 'paragraph',
        text: 'Les auteurs ont examiné les résultats des meilleurs modèles sur six jeux d’épreuves — MMLU pour les connaissances générales, GPQA Diamond pour les questions scientifiques de niveau doctorat, MATH-500 et MATH 5 pour les mathématiques, HumanEval pour le code et l’Elo de la Chatbot Arena — sur trois années. Pour chaque palier atteint, ils mesurent la chute du prix.',
      },
      {
        type: 'paragraph',
        text: 'L’exemple qu’ils mettent en avant est parlant : le prix pour atteindre le niveau de GPT-4 sur des questions scientifiques de niveau doctorat a été divisé par 40 chaque année. Mais l’amplitude est énorme selon le palier considéré, de 9 à 900 fois par an. Un seul chiffre ne peut donc pas résumer « la baisse du prix de l’IA » : elle dépend entièrement de la tâche demandée.',
      },
      { type: 'heading', text: 'La réserve vient des auteurs eux-mêmes' },
      {
        type: 'paragraph',
        text: 'Epoch AI ajoute une nuance que les reprises omettent souvent : les baisses les plus rapides de cette fourchette se sont produites au cours de la dernière année, et il est donc moins évident qu’elles se poursuivent. Extrapoler le haut de la fourchette serait une erreur de lecture.',
      },
      {
        type: 'paragraph',
        text: 'Sur les causes, les auteurs restent prudents. Certaines sont connues — des modèles plus petits, du matériel plus rentable — mais ils reconnaissent que d’autres facteurs importants sont difficiles à établir à partir des seules informations publiques. Les données proviennent d’Epoch AI et d’Artificial Analysis, et sont publiées sous licence Creative Commons.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'La baisse se mesure à performance constante, pas sur le tarif d’un modèle.',
          'De 9 à 900 fois par an selon le palier : la moyenne ne veut rien dire.',
          'Les auteurs préviennent que les chutes les plus rapides sont les moins durables.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Epoch AI',
        title: 'LLM inference prices have fallen rapidly but unequally across tasks',
        url: 'https://epoch.ai/data-insights/llm-inference-price-trends',
        publishedAt: '2025-03-12',
      },
    ],
  },
  {
    slug: 'l-electricite-que-consomme-l-ia-415-terawattheures-mesures',
    title: 'Les centres de données ont consommé 415 térawattheures. Le reste est une projection.',
    excerpt:
      'L’Agence internationale de l’énergie mesure 1,5 % de l’électricité mondiale en 2024, et en attend le double d’ici 2030. Distinguer les deux registres change tout au débat.',
    category: 'business',
    publishedAt: '2026-04-16',
    readingMinutes: 2,
    image: { src: '/images/articles/data-centre-electricity.webp', alt: 'Des lignes à haute tension au-dessus d’un centre de données' },
    body: [
      {
        type: 'paragraph',
        text: 'Le débat sur la consommation électrique de l’IA mélange en permanence deux choses : ce qui a été mesuré et ce qui est anticipé. L’Agence internationale de l’énergie les sépare nettement dans son rapport spécial sur l’énergie et l’IA, et c’est cette séparation qui rend ses chiffres utilisables.',
      },
      { type: 'heading', text: 'Ce qui est mesuré' },
      {
        type: 'paragraph',
        text: 'Les centres de données ont consommé environ 415 térawattheures en 2024, soit près de 1,5 % de l’électricité mondiale. Les États-Unis en représentent la plus grande part, 45 %, devant la Chine avec 25 % et l’Europe avec 15 %. Depuis 2017, cette consommation croît d’environ 12 % par an — plus de quatre fois plus vite que la consommation électrique totale. L’investissement mondial dans ces installations a presque doublé depuis 2022, pour atteindre un demi-billion de dollars en 2024.',
      },
      {
        type: 'paragraph',
        text: 'L’AIE insiste sur un point que le pourcentage mondial masque : l’effet local est bien plus marqué. Un centre orienté IA peut consommer autant qu’une usine à forte intensité énergétique comme une fonderie d’aluminium, mais il est géographiquement bien plus concentré. Aux États-Unis, près de la moitié de la capacité tient dans cinq grappes régionales.',
      },
      { type: 'heading', text: 'Ce qui est projeté' },
      {
        type: 'paragraph',
        text: 'La mise à jour d’avril 2026 part de 485 térawattheures en 2025 et voit la consommation à peu près doubler pour atteindre 950 térawattheures en 2030, soit environ 3 % de la demande électrique mondiale. Les centres orientés IA croissent nettement plus vite que l’ensemble, triplant sur la période. L’agence note toutefois que des goulots d’étranglement le long de la chaîne de valeur réduisent la probabilité des scénarios les plus agressifs à court terme.',
      },
      {
        type: 'paragraph',
        text: 'Un chiffre donne la mesure du basculement américain : d’ici la fin de la décennie, les États-Unis consommeraient plus d’électricité pour leurs centres de données que pour produire l’aluminium, l’acier, le ciment, les produits chimiques et tous les autres biens énergivores réunis.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          '415 térawattheures en 2024 et 485 en 2025 sont des mesures ; 950 en 2030 est un scénario.',
          'La croissance est quatre fois plus rapide que celle de la consommation totale.',
          'L’impact se joue localement, dans quelques grappes très concentrées.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Agence internationale de l’énergie',
        title: 'Energy and AI – Executive summary',
        url: 'https://www.iea.org/reports/energy-and-ai/executive-summary',
        publishedAt: '2025-04-10',
      },
      {
        outlet: 'Agence internationale de l’énergie',
        title: 'Key Questions on Energy and AI – Executive summary',
        url: 'https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary',
        publishedAt: '2026-04-16',
      },
    ],
  },
  {
    slug: 'la-souverainete-selon-mistral-europe-et-golfe',
    title: 'Mistral vend la souveraineté européenne, et signe en Arabie saoudite.',
    excerpt:
      'Deux annonces à treize jours d’intervalle : une coalition pour bâtir jusqu’à 1 GW de calcul européen, puis une collaboration de plusieurs centaines de millions d’euros avec HUMAIN.',
    category: 'business',
    publishedAt: '2026-08-24',
    readingMinutes: 2,
    image: { src: '/images/articles/mistral-sovereignty.webp', alt: 'Deux campus de calcul reliés entre l’Europe et le Golfe' },
    body: [
      {
        type: 'paragraph',
        text: 'Deux communiqués de Mistral AI, publiés à treize jours d’intervalle en août 2026, éclairent la difficulté du mot « souveraineté » appliqué à l’intelligence artificielle. Ils émanent de l’entreprise elle-même : ce sont des annonces commerciales, pas des analyses indépendantes.',
      },
      { type: 'heading', text: 'Le 11 août : bâtir la capacité européenne' },
      {
        type: 'paragraph',
        text: 'Mistral annonce donner aux entreprises et aux États le contrôle sur les modèles, l’infrastructure et la capacité de calcul, avec une conformité régionale à la clé. Concrètement, l’entreprise introduit des points d’accès régionaux permettant de choisir où l’inférence s’exécute, ainsi qu’un niveau de service prioritaire. Elle constitue surtout une coalition, les European Compute Units, destinée à rassembler des engagements d’entreprises sur le long terme pour que la capacité dont l’Europe a besoin soit effectivement construite. L’objectif affiché va jusqu’à 1 gigawatt de capacité d’ici 2030.',
      },
      { type: 'heading', text: 'Le 24 août : la même promesse, ailleurs' },
      {
        type: 'paragraph',
        text: 'Treize jours plus tard, Mistral annonce une collaboration stratégique avec HUMAIN pour soutenir l’IA souveraine en Arabie saoudite et dans la région. Elle porte sur l’infrastructure, le développement de modèles avancés et le déploiement de solutions, avec deux domaines prioritaires — la cybersécurité et la voix — et l’ambition de modèles performants en langue arabe. Le communiqué chiffre l’ensemble à plusieurs centaines de millions d’euros.',
      },
      {
        type: 'paragraph',
        text: 'L’entreprise rappelle au passage avoir élargi plus tôt cet été son partenariat avec Microsoft pour accroître sa capacité de calcul en Europe. La souveraineté, dans ce vocabulaire, ne désigne donc pas l’autonomie d’un continent : elle désigne un service vendu à qui veut l’acheter, et qui consiste à garantir à chaque client que ses données et ses calculs restent chez lui.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'La souveraineté est ici un produit commercial, pas une position géopolitique.',
          'Jusqu’à 1 GW de capacité européenne visé d’ici 2030, sur engagements d’entreprises.',
          'Les deux annonces viennent de Mistral : aucune vérification indépendante.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Mistral AI',
        title: 'In-region inference, open models, and new European infrastructure for sovereign AI.',
        url: 'https://mistral.ai/news/regional-inference-open-models-new-compute/',
        publishedAt: '2026-08-11',
      },
      {
        outlet: 'Mistral AI',
        title: 'Mistral x HUMAIN',
        url: 'https://mistral.ai/news/mistral-x-humain/',
        publishedAt: '2026-08-24',
      },
    ],
  },
];
