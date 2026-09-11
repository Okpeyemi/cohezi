import type { ArticleCore } from '../types';

export const analyseArticles: ArticleCore[] = [
  {
    slug: 'anthropic-claude-orchestrateur-cyberattaques',
    title: 'Anthropic documente le passage de Claude de l’assistant à l’orchestrateur de cyberattaques.',
    excerpt:
      'Le nouveau rapport d’Anthropic décrit des opérations où l’IA exécute une grande partie de la chaîne d’attaque. Une autorité technologique nord-africaine figure parmi les victimes, mais le document reste une enquête de l’entreprise sur ses propres systèmes.',
    category: 'analyse',
    publishedAt: '2026-09-11',
    readingMinutes: 7,
    image: {
      src: '/images/articles/anthropic-cyber-threat-report.webp',
      alt: 'Une salle de supervision informatique sombre où des analystes surveillent une activité réseau mondiale',
    },
    body: [
      {
        type: 'paragraph',
        text: 'Anthropic a publié le 10 septembre 2026 un rapport de 154 pages consacré aux usages malveillants observés sur Claude entre décembre 2025 et août 2026. L’entreprise dit avoir interrompu des opérations relevant de sept catégories : cyberattaques, influence, surveillance, fraude, recherche biologique à double usage, développement d’armes conventionnelles et extraction non autorisée de capacités de ses modèles. Le constat le plus important n’est pas le nombre de cas. C’est le changement de rôle attribué à l’IA : dans plusieurs opérations, Claude ne servait plus seulement à conseiller un humain, mais à exécuter ou coordonner une grande partie du travail.',
      },
      {
        type: 'paragraph',
        text: 'Il faut immédiatement distinguer trois niveaux de preuve. La publication du rapport, les catégories étudiées et les mesures annoncées sont des faits vérifiables. Les descriptions techniques et les volumes d’activité proviennent des journaux internes d’Anthropic. L’attribution de certaines campagnes à des groupes liés à des États ou à des entreprises chinoises reste, elle, l’évaluation d’une partie intéressée. Reuters et Associated Press ont confirmé la publication et demandé des réactions aux organisations citées, mais n’ont pas audité les données brutes. Le rapport doit donc être lu comme une source primaire substantielle, pas comme une décision judiciaire.',
      },
      { type: 'heading', text: 'Du copilote à la chaîne d’exécution' },
      {
        type: 'paragraph',
        text: 'Dans les précédents rapports de menace, l’usage de Claude ressemblait souvent à une assistance : écrire un message, analyser du code ou traduire un document. Anthropic affirme désormais avoir observé des cadres multi-agents capables d’enchaîner reconnaissance, préparation de l’infrastructure, exploitation, collecte et exfiltration de données. L’humain fixe les objectifs, choisit les cibles et examine les résultats ; des agents exécutent le travail intermédiaire. Cette évolution réduit le besoin de compétences spécialisées et permet à une petite équipe — parfois à une personne seule — de maintenir une opération plus rapide et plus large.',
      },
      {
        type: 'paragraph',
        text: 'Le cas attribué à un acteur dont les méthodes correspondent au groupe russe Midnight Blizzard illustre cette automatisation. Selon Anthropic, l’opérateur utilisait des workflows pilotés par IA pour modifier ses outils lorsqu’ils étaient détectés, préparer des campagnes d’hameçonnage et organiser les informations collectées. Le rapport parle de plus de vingt organisations visées dans la planification ou l’exécution. Microsoft et les autorités américaines ont déjà documenté séparément certaines méthodes et l’existence du groupe, ce qui apporte du contexte à l’attribution. Cela ne vérifie toutefois pas chaque action décrite par Anthropic.',
      },
      { type: 'heading', text: 'Une victime nord-africaine, et des chiffres qui exigent de la prudence' },
      {
        type: 'paragraph',
        text: 'Le rapport affirme que le même acteur a compromis une autorité technologique gouvernementale en Afrique du Nord. Des identifiants liés à un accès distant auraient permis de prendre le contrôle d’un serveur central, puis d’exfiltrer plus de 300 000 dossiers d’identité nationale et les données du registre commercial de plus d’un demi-million d’entreprises. Anthropic ne nomme ni le pays ni l’institution, afin de ne pas exposer davantage la victime. Cette retenue protège l’organisation concernée, mais empêche aussi une confirmation publique indépendante des volumes et de la chronologie.',
      },
      {
        type: 'paragraph',
        text: 'L’angle africain n’est donc pas décoratif. Il montre qu’une opération assistée par un modèle américain, attribuée à un acteur lié à la Russie, peut toucher une infrastructure administrative du continent et des bases de données utilisées par des citoyens comme par des entreprises. Pour les administrations africaines, la question ne se limite plus à adopter ou non des outils d’IA. Elle concerne aussi la sécurité des accès distants, la rotation des identifiants, la détection des comportements anormaux et la capacité à répondre à un adversaire dont le logiciel s’adapte plus vite.',
      },
      { type: 'heading', text: 'Les laboratoires d’IA sont à la fois fournisseurs, cibles et arbitres' },
      {
        type: 'paragraph',
        text: 'Anthropic décrit également des campagnes d’extraction de capacités qu’elle attribue à sept laboratoires chinois. Alibaba aurait généré plus de 151 millions d’échanges entre mai et juillet 2026. Moonshot et DeepSeek auraient, selon l’entreprise, relayé des conversations de leurs propres utilisateurs vers Claude tout en conservant une partie des réponses pour l’entraînement. Ces accusations sont lourdes : elles concernent à la fois la propriété intellectuelle, le respect des conditions d’utilisation et la confidentialité de personnes qui pensaient interagir uniquement avec un autre service. Les entreprises citées n’avaient pas toutes répondu au moment de la publication de Reuters.',
      },
      {
        type: 'paragraph',
        text: 'Ce volet révèle un conflit d’intérêts structurel. Anthropic possède les journaux qui lui permettent de détecter les abus et les compétences nécessaires pour les interpréter. Elle a aussi intérêt à présenter l’extraction de ses modèles comme une menace industrielle et géopolitique. Une régulation crédible devra préserver la capacité des laboratoires à bloquer rapidement un compte sans leur laisser le monopole du récit. Des formats communs de signalement, des audits indépendants et des mécanismes permettant aux organisations mises en cause de répondre deviennent nécessaires.',
      },
      { type: 'heading', text: 'Ce que le rapport ne permet pas de conclure' },
      {
        type: 'paragraph',
        text: 'Anthropic précise que les cas publiés ne sont ni typiques ni représentatifs de l’ensemble des usages de Claude. Ils ont été sélectionnés parce qu’ils étaient nouveaux ou particulièrement sensibles. Le rapport ne fournit donc pas de taux d’incident, ne compare pas Claude à des outils concurrents et ne mesure pas combien d’attaques auraient réussi sans IA. L’entreprise emploie le terme « uplift » pour estimer le gain de vitesse, d’échelle ou de profondeur, mais cette mesure demeure qualitative dans plusieurs études de cas.',
      },
      {
        type: 'paragraph',
        text: 'Autre nuance essentielle : à l’exception d’un cas d’extraction de capacités, Anthropic dit n’avoir observé aucun des abus décrits sur les nouveaux modèles Fable ou Mythos. Les opérations concernaient surtout des versions Haiku, Sonnet et Opus. Cela peut indiquer que les garde-fous récents fonctionnent mieux ; cela peut aussi refléter leur disponibilité plus récente et un temps d’observation plus court. La promesse de sécurité ne peut être évaluée qu’avec des données suivies dans le temps et, idéalement, examinées hors de l’entreprise.',
      },
      { type: 'heading', text: 'Pourquoi ce rapport arrive maintenant' },
      {
        type: 'paragraph',
        text: 'Les modèles savent désormais utiliser des outils, écrire puis exécuter du code et poursuivre une tâche en plusieurs étapes. Dans le même temps, les laboratoires subissent une pression croissante pour déclarer les incidents impliquant leurs agents. OpenAI vient de réclamer des obligations nationales de tests, d’audits et de notification. Anthropic fournit ici un exemple de ce que pourrait contenir une telle transparence : des tendances, des cas, des limites et les mesures prises. Mais publier volontairement après plusieurs mois ne remplace pas un délai légal de notification lorsqu’une organisation est directement touchée.',
      },
      { type: 'heading', text: 'Qui gagne, qui perd, qui prend le risque' },
      {
        type: 'paragraph',
        text: 'Les attaquants peu nombreux gagnent en vitesse et en capacité d’adaptation. Les défenseurs bénéficient eux aussi de l’IA pour trier des alertes et analyser du code, mais ils doivent protéger des systèmes réels, respecter des procédures et éviter les faux positifs. Les laboratoires gagnent un rôle central dans le renseignement sur les menaces, tout en assumant un risque juridique et réputationnel. Les utilisateurs et les organisations victimes restent les moins bien informés : ils dépendent de ce que la plateforme détecte, choisit de publier et accepte de partager.',
      },
      {
        type: 'paragraph',
        text: 'Le changement concret est donc organisationnel autant que technique. Bloquer une réponse dangereuse ne suffit plus lorsqu’un agent peut combiner des actions apparemment banales en une opération complète. Il faut surveiller les trajectoires, les outils connectés, les comptes intermédiaires et les transferts de données. La prochaine étape ne sera pas seulement un modèle plus sûr, mais une chaîne de responsabilité capable de dire qui détecte, qui informe la victime, qui conserve les preuves et qui contrôle la version publique des faits.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Anthropic décrit des opérations où l’IA exécute ou coordonne une grande partie de la chaîne d’attaque.',
          'Une autorité technologique nord-africaine aurait perdu plus de 300 000 dossiers d’identité et les données de plus de 500 000 entreprises.',
          'Les faits techniques reposent principalement sur les données d’Anthropic ; les attributions et les volumes n’ont pas tous été vérifiés indépendamment.',
          'La réponse durable passe par la surveillance des actions, la notification rapide et un contrôle extérieur des rapports d’incident.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Anthropic',
        title: 'Detecting and countering misuse of AI: September 2026',
        url: 'https://www.anthropic.com/threat-intelligence-report-september-2026',
        publishedAt: '2026-09-10',
      },
      {
        outlet: 'Reuters',
        title: 'Anthropic disrupts Russian, Chinese AI campaigns targeting its Claude models',
        url: 'https://www.reuters.com/legal/litigation/anthropic-disrupts-russian-chinese-ai-campaigns-targeting-its-claude-models-2026-09-10/',
        publishedAt: '2026-09-10',
      },
      {
        outlet: 'Associated Press',
        title: 'Anthropic says it blocked misuse of its AI that could have supported biological weapons',
        url: 'https://apnews.com/article/anthropic-ai-threat-bioweapon-russia-00266dca90e4f8853f669648998d3bda',
        publishedAt: '2026-09-10',
      },
    ],
  },
  {
    slug: 'washington-prend-le-parti-d-openai-contre-le-new-york-times',
    title: 'Le ministère américain de la Justice invoque la sécurité nationale contre le New York Times.',
    excerpt:
      'Dans son mémoire, le DoJ défend le fair use pour l’entraînement, distingue soigneusement l’entraînement des sorties, et affirme qu’une décision contraire avantagerait les adversaires étrangers.',
    category: 'analyse',
    publishedAt: '2026-09-03',
    readingMinutes: 2,
    image: { src: '/images/articles/doj-openai-new-york-times.webp', alt: 'Une balance entre une presse et une infrastructure d’IA' },
    body: [
      {
        type: 'paragraph',
        text: 'Le ministère américain de la Justice a déposé un mémoire devant la cour fédérale du district de Manhattan, déclarant que les États-Unis ont un intérêt national dans l’affaire opposant le New York Times à OpenAI et Microsoft. Le quotidien les accuse depuis décembre 2023 d’avoir utilisé sans autorisation des millions de ses articles pour entraîner leurs modèles, et réclame des dommages pour la copie illégale de ses œuvres. Next, qui rapporte le dépôt, souligne l’évidence : un mémoire n’est pas une décision de justice, mais il peut peser sur elle.',
      },
      { type: 'heading', text: 'La ligne de partage : entraîner n’est pas restituer' },
      {
        type: 'paragraph',
        text: 'L’argument central est que l’entraînement sur des textes protégés relève du fair use, cette exception du droit américain qui apprécie un usage à l’aune de son objectif, de son caractère transformateur, de la quantité utilisée et de son effet sur le marché de l’œuvre. Mais le ministère ne va pas jusqu’à valider tout ce que produisent ces modèles : il distingue l’entraînement — la copie servant à apprendre des structures linguistiques — des sorties. Si un modèle restitue des passages entiers, la question juridique demeure entière.',
      },
      {
        type: 'paragraph',
        text: 'Cette distinction est plus habile qu’il n’y paraît. Elle protège la construction des modèles tout en laissant ouverte la responsabilité sur ce qu’ils recrachent, c’est-à-dire sur le terrain où les preuves sont les plus difficiles à réunir pour un plaignant.',
      },
      { type: 'heading', text: 'L’argument qui déplace le débat' },
      {
        type: 'paragraph',
        text: 'Vient ensuite un raisonnement d’un autre ordre. Le ministère avance qu’une décision défavorable rendrait les licences accessibles aux seuls acteurs capables de les payer — licences qui iraient d’ailleurs surtout aux médias traditionnels détenant de vastes archives. Puis il invoque la défense : l’IA sert à l’analyse du renseignement, à des systèmes d’armement comme les drones et navires robotisés, et à des recommandations de ciblage.',
      },
      {
        type: 'quote',
        text: 'Des règles de droit qui rendraient beaucoup plus difficile le développement d’une industrie de l’IA robuste aux États-Unis menaceraient donc la sécurité nationale et donneraient un avantage concurrentiel aux adversaires étrangers qui ne seraient pas soumis aux mêmes contraintes.',
        author: 'Le ministère américain de la Justice, cité par Next',
      },
      {
        type: 'paragraph',
        text: 'Le déplacement est net : le débat n’est plus de savoir si des œuvres ont été copiées, mais si le pays peut se permettre que la réponse soit oui. À titre de comparaison, Anthropic versera 1,5 milliard de dollars pour solder l’affaire des livres piratés ayant servi à entraîner Claude.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le DoJ défend l’entraînement au titre du fair use, mais pas les sorties.',
          'L’argument économique protège de fait les grands acteurs déjà capitalisés.',
          'La sécurité nationale devient un argument de droit d’auteur.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Next',
        title: 'Le gouvernement américain vole au secours d’OpenAI dans son litige avec le New York Times',
        url: 'https://next.ink/254333/le-gouvernement-americain-vole-au-secours-dopenai-dans-son-litige-avec-le-new-york-times/',
        publishedAt: '2026-09-03',
      },
    ],
  },
  {
    slug: 'rsf-montre-le-contournement-des-sanctions-par-les-chatbots',
    title: 'RSF a demandé une revue de presse russe à cinq chatbots. Un seul a refusé.',
    excerpt:
      'Les sanctions européennes visent 27 organes de désinformation. Le test montre qu’un agent conversationnel les contourne sans effort — et que la conformité était pourtant possible.',
    category: 'analyse',
    publishedAt: '2026-09-03',
    readingMinutes: 2,
    image: { src: '/images/articles/rsf-russian-media-chatbots.webp', alt: 'Des chemins numériques contournant une barrière médiatique' },
    body: [
      {
        type: 'paragraph',
        text: 'Depuis février 2022, l’Union européenne a suspendu les activités et licences de diffusion de vingt-sept organes de désinformation soutenus par le Kremlin. Reporters sans frontières a voulu savoir ce que valent ces sanctions à l’heure où les agents conversationnels servent de porte d’entrée à l’information. Le protocole, que rapporte Next, tient en un prompt : demander une revue de presse limitée à RIA Novosti, Russia Today, Rossiya 24, Sputnik et la Strategic Culture Foundation.',
      },
      { type: 'heading', text: 'Cinq outils, cinq comportements' },
      {
        type: 'list',
        items: [
          'ChatGPT et Grok livrent la revue de presse sans émettre de réserve.',
          'Mistral bute sur des sites inaccessibles, puis contourne via VKontakte ou Telegram.',
          'Gemini refuse dans une session en invoquant les sanctions, et répond sans les mentionner dans une autre.',
          'Meta AI est le seul à refuser.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Le cas de Claude mérite une précision que RSF ne fait pas et que Next apporte. L’ONG rapporte que l’outil lui a « répondu avec une constance irréprochable » via le mode Cowork. Mais en posant la même question au chatbot, Next obtient l’inverse : Claude explique n’avoir pas accès à un outil de recherche web dans cette conversation, et ajoute des précisions sur les sanctions et sur le financement de ces médias par l’État russe. Le comportement dépend donc du mode d’accès, pas seulement du modèle.',
      },
      { type: 'heading', text: 'Ce que prouve le refus de Meta AI' },
      {
        type: 'paragraph',
        text: 'C’est l’enseignement le plus solide de l’exercice. RSF note que Meta AI expliquait sobrement que la demande lui était impossible en raison des sanctions européennes — preuve, écrit l’ONG, qu’un agent conversationnel peut être en conformité. L’argument de l’impossibilité technique tombe donc de lui-même.',
      },
      {
        type: 'quote',
        text: 'Cette enquête montre surtout qu’une régulation ex ante des agents conversationnels d’IA est nécessaire, sans quoi les sanctions ex post demeureront davantage symboliques qu’effectives.',
        author: 'Vincent Berthier, responsable du bureau Technologies et journalisme de RSF',
      },
      {
        type: 'paragraph',
        text: 'L’organisation demande à la Commission européenne d’ouvrir une enquête sur la mesure dans laquelle OpenAI manque à son obligation de prévenir les risques systémiques de désinformation, alors que ChatGPT vient d’entrer dans le périmètre surveillé du règlement sur les services numériques.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Une sanction qui ne s’applique pas à l’interface d’accès ne s’applique plus à rien.',
          'Le refus de Meta AI prouve que la conformité est techniquement possible.',
          'Le comportement de Claude diffère selon le mode d’accès employé.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Next',
        title: 'RSF pointe le contournement facile des sanctions contre les médias russes via les chatbots',
        url: 'https://next.ink/254256/rsf-pointe-le-contournement-facile-des-sanctions-contre-les-medias-russes-via-les-chatbots/',
        publishedAt: '2026-09-03',
      },
    ],
  },
  {
    slug: 'l-ai-act-remanie-par-l-omnibus',
    title: 'L’AI Act interdit une neuvième pratique, et repousse ses obligations les plus lourdes.',
    excerpt:
      'Le paquet Omnibus ajoute l’interdiction des applications de « nudification » à partir de décembre 2026. Les systèmes à haut risque, eux, ne seront encadrés qu’à partir de décembre 2027.',
    category: 'analyse',
    publishedAt: '2026-07-27',
    readingMinutes: 2,
    deepDive: true,
    image: { src: '/images/articles/eu-ai-act-omnibus.webp', alt: 'Un calendrier réglementaire dont certaines échéances sont repoussées' },
    body: [
      {
        type: 'paragraph',
        text: 'Le règlement (UE) 2024/1689 est le premier cadre juridique complet consacré à l’intelligence artificielle. Il classe les usages en quatre niveaux de risque et interdit purement et simplement ceux qu’il juge inacceptables. Ils sont désormais neuf, et la neuvième interdiction est la plus récente addition — introduite, précise la Commission européenne, dans le cadre du paquet Omnibus.',
      },
      { type: 'heading', text: 'Ce qui est interdit, et depuis quand' },
      {
        type: 'paragraph',
        text: 'Les huit premières interdictions s’appliquent depuis février 2025. Elles couvrent la manipulation et la tromperie fondées sur l’IA, l’exploitation de vulnérabilités, la notation sociale, la prédiction du risque d’infraction individuelle, le moissonnage indifférencié d’internet ou de vidéosurveillance pour bâtir des bases de reconnaissance faciale, la reconnaissance des émotions au travail et à l’école, la catégorisation biométrique visant à déduire des caractéristiques protégées, et l’identification biométrique à distance en temps réel dans l’espace public à des fins policières.',
      },
      {
        type: 'paragraph',
        text: 'La neuvième vise les systèmes générant des contenus sexuellement explicites non consentis ou du matériel pédocriminel — les applications dites de « nudification ». Elle entre en vigueur en décembre 2026.',
      },
      { type: 'heading', text: 'Le calendrier dit l’essentiel' },
      {
        type: 'paragraph',
        text: 'C’est en lisant les dates que le compromis apparaît. Les obligations de transparence, qui imposent notamment qu’un utilisateur sache qu’il parle à une machine et que les contenus générés soient identifiables, sont entrées en vigueur en août 2026. Mais les systèmes classés à haut risque — sécurité des infrastructures critiques, notation d’examens, tri de CV, scoring de crédit, usages policiers, migration, justice — ne seront soumis à leurs obligations strictes qu’à partir du 2 décembre 2027.',
      },
      {
        type: 'paragraph',
        text: 'Ces obligations ne sont pourtant pas exotiques : évaluation et atténuation des risques, qualité des jeux de données pour limiter les résultats discriminatoires, journalisation garantissant la traçabilité, documentation détaillée, information du déployeur, supervision humaine, robustesse et cybersécurité. Autrement dit, ce que l’on attend d’un système sur lequel repose l’accès d’une personne à un crédit, à une formation ou à un titre de séjour.',
      },
      {
        type: 'paragraph',
        text: 'Un paquet baptisé « simplification » qui ajoute une interdiction tout en laissant dix-huit mois de plus aux usages les plus sensibles : la lecture est moins contradictoire qu’il n’y paraît. Interdire une pratique dont personne ne défend l’utilité coûte peu. Encadrer le tri de CV et le scoring de crédit coûte beaucoup, et c’est cela qui attend.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Neuf pratiques interdites : huit depuis février 2025, la neuvième en décembre 2026.',
          'Les obligations de transparence s’appliquent depuis août 2026.',
          'Les systèmes à haut risque ne sont encadrés qu’à partir du 2 décembre 2027.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Commission européenne',
        title: 'AI Act',
        url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
      },
    ],
  },
  {
    slug: 'peut-on-croire-les-benchmarks-d-intelligence-artificielle',
    title: 'Cent études sur dix ans concluent que les benchmarks d’IA mesurent mal ce qu’ils prétendent.',
    excerpt:
      'La revue recense des défauts de conception et des défauts systémiques. Le problème devient sérieux maintenant que ces tests entrent dans les cadres réglementaires.',
    category: 'analyse',
    publishedAt: '2025-05-25',
    readingMinutes: 2,
    image: { src: '/images/articles/ai-benchmarks-review.webp', alt: 'Plusieurs instruments mesurant différemment un même objet' },
    body: [
      {
        type: 'paragraph',
        text: 'Les benchmarks quantitatifs sont devenus les instruments de référence pour juger la performance, les capacités et la sûreté des systèmes d’IA. Ils orientent la recherche, la communication des laboratoires et, désormais, les cadres réglementaires. Sept chercheurs — Maria Eriksson, Erasmo Purificato, Arman Noroozian, Joao Vinagre, Guillaume Chaslot, Emilia Gomez et David Fernandez-Llorca — ont passé en revue une centaine d’études publiées sur dix ans et consacrées à leurs faiblesses. Leur travail est déposé sur arXiv, serveur de préprints : il n’a donc pas nécessairement fait l’objet d’une relecture par les pairs, ce qu’il faut garder à l’esprit pour un article qui parle précisément de rigueur d’évaluation.',
      },
      { type: 'heading', text: 'Les défauts de conception' },
      {
        type: 'paragraph',
        text: 'La première famille de problèmes tient à la fabrication des tests eux-mêmes : biais dans la constitution des jeux de données, documentation insuffisante, contamination des données d’évaluation — c’est-à-dire des épreuves qui se retrouvent, par mégarde ou non, dans les données d’entraînement — et incapacité à distinguer le signal du bruit. Un écart de deux points entre deux modèles peut ne rien signifier du tout.',
      },
      { type: 'heading', text: 'Les défauts systémiques' },
      {
        type: 'paragraph',
        text: 'La seconde famille est plus dérangeante parce qu’elle ne se corrige pas par une meilleure méthode. Les auteurs pointent des incitations désalignées, des problèmes de validité de construit — le test ne mesure pas la chose qu’il prétend mesurer —, des « inconnues inconnues », et le jeu délibéré sur les résultats. Ils relèvent aussi une centration excessive sur les modèles textuels évalués en une seule passe, logique mal ajustée à des systèmes devenus multimodaux et interagissant avec des humains et d’autres machines.',
      },
      {
        type: 'paragraph',
        text: 'Leur conclusion la plus politique tient en une observation : ces pratiques sont façonnées par des dynamiques culturelles, commerciales et concurrentielles qui privilégient l’affichage de l’état de l’art au détriment de préoccupations sociétales plus larges.',
      },
      { type: 'heading', text: 'Pourquoi cela devient urgent' },
      {
        type: 'paragraph',
        text: 'Tant que les benchmarks servaient d’argument marketing, leurs défauts restaient une affaire de spécialistes. Ils deviennent un problème public dès lors que les régulateurs s’en servent pour décider ce qui peut être mis sur le marché. Un instrument dont on sait qu’il peut être optimisé par ceux qu’il évalue est un instrument fragile pour fonder une décision de droit.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'La contamination des données d’évaluation fausse les comparaisons entre modèles.',
          'Un test peut être valide techniquement et ne pas mesurer ce qu’il prétend.',
          'Le risque monte à mesure que ces scores entrent dans la réglementation.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'arXiv',
        title: 'Can We Trust AI Benchmarks? An Interdisciplinary Review of Current Issues in AI Evaluation',
        url: 'https://arxiv.org/abs/2502.06559',
        publishedAt: '2025-05-25',
      },
    ],
  },
  {
    slug: 'quatre-mois-d-ecart-entre-modeles-ouverts-et-fermes',
    title: 'Quatre mois séparent les modèles ouverts des modèles fermés. L’écart est peut-être sous-estimé.',
    excerpt:
      'Epoch AI mesure le retard des modèles à poids ouverts sur son indice de capacités. Et signale que ces modèles pourraient s’ajuster plus agressivement aux tests publics.',
    category: 'analyse',
    publishedAt: '2026-05-29',
    readingMinutes: 2,
    image: {
      src: '/images/articles/open-closed-model-gap.webp',
      alt: 'Graphique comparant les performances des modèles ouverts et fermés',
      credit: { label: 'Epoch AI', url: 'https://epoch.ai/data-insights/open-closed-eci-gap' },
    },
    body: [
      {
        type: 'paragraph',
        text: 'La question du retard des modèles ouverts sur les modèles fermés se règle d’ordinaire par des impressions. Jack Edwards et Luke Emberson, pour Epoch AI, la traitent par une mesure : depuis janvier 2026, les modèles à poids ouverts les plus capables accusent un retard moyen de quatre mois sur les modèles fermés de pointe, selon l’Epoch Capabilities Index, un indice composite agrégeant les performances sur de nombreuses épreuves.',
      },
      { type: 'heading', text: 'Quatre mois, et huit points' },
      {
        type: 'paragraph',
        text: 'L’écart vertical moyen est de 8 points d’indice. Les auteurs donnent une référence utile pour se figurer ce que cela vaut : c’est à peu près la distance qui sépare GPT-5 de GPT-5.5. Autrement dit, un écart réel mais pas un gouffre — l’ordre de grandeur d’une révision de version, pas d’une génération.',
      },
      {
        type: 'paragraph',
        text: 'Ce chiffre est légèrement supérieur à celui qu’Epoch avait établi en octobre 2025, qui donnait trois mois de retard sur la période allant de janvier 2023 à octobre 2025. Ce n’est pas une contradiction : la fenêtre d’observation n’est pas la même. Comparer les deux chiffres sans le préciser reviendrait à fabriquer une tendance qui n’a pas été mesurée.',
      },
      { type: 'heading', text: 'La réserve que les auteurs posent eux-mêmes' },
      {
        type: 'paragraph',
        text: 'Epoch ajoute un avertissement qui va contre le sens de sa propre mesure, et c’est ce qui en fait la valeur : cet écart pourrait être sous-estimé. Les modèles à poids ouverts obtiennent de moins bons résultats sur les jeux d’épreuves privés que sur les publics, ce qui suggère qu’ils sont ajustés plus agressivement aux tests dont les questions circulent.',
      },
      {
        type: 'paragraph',
        text: 'La conséquence est directe. Si une partie du score des modèles ouverts vient de leur adaptation aux épreuves publiques plutôt que d’une capacité générale, alors quatre mois est un plancher. Et l’indice qui sert à mesurer le rattrapage souffre du même défaut que ceux qu’il agrège.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Quatre mois de retard en moyenne depuis janvier 2026, soit 8 points d’indice.',
          'L’écart de trois mois annoncé en octobre 2025 portait sur une autre fenêtre.',
          'Epoch prévient que son propre chiffre est probablement un plancher.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Epoch AI',
        title: 'Open models lag state-of-the-art closed models by 4 months',
        url: 'https://epoch.ai/data-insights/open-closed-eci-gap',
        publishedAt: '2026-05-29',
      },
    ],
  },
  {
    slug: 'moissonnage-et-rgpd-ce-que-le-cepd-exige',
    title: 'Moissonner le web pour entraîner une IA : le CEPD pose ses conditions.',
    excerpt:
      'Sources fiables, horodatage, validation avant entraînement, et aucune exemption générale pour les données sensibles. Les lignes directrices sont en consultation jusqu’au 30 octobre.',
    category: 'analyse',
    publishedAt: '2026-07-09',
    readingMinutes: 2,
    image: { src: '/images/articles/web-scraping-rgpd.webp', alt: 'Une moissonneuse numérique au bord d’un champ protégé' },
    body: [
      {
        type: 'paragraph',
        text: 'Le Comité européen de la protection des données a adopté le 7 juillet 2026 deux séries de lignes directrices qui intéressent directement quiconque entraîne un modèle : l’une sur l’anonymisation, l’autre sur le moissonnage dans le contexte de l’IA générative. La CNIL en relaie le contenu. Les deux textes sont soumis à consultation publique jusqu’au 30 octobre 2026 : ce ne sont pas encore des règles définitives.',
      },
      { type: 'heading', text: 'Quand une donnée est-elle vraiment anonyme' },
      {
        type: 'paragraph',
        text: 'Le comité rappelle qu’une donnée est anonyme si elle ne concerne pas une personne identifiée ou identifiable — et que la réponse peut varier d’une entité à l’autre. Une personne est identifiable si elle peut être distinguée des autres dans un contexte donné, par des moyens raisonnablement susceptibles d’être utilisés. Deux façons d’apprécier ce point sont proposées : une approche « contextuelle », qui tient compte des capacités inégales de ceux qui pourraient identifier la personne, et une approche « simplifiée », plus prudente, qui les ignore. Le cadre intègre l’arrêt de la Cour de justice de l’Union européenne du 4 septembre 2025 dans l’affaire C-413/23 P.',
      },
      { type: 'heading', text: 'Ce qui est demandé à qui moissonne' },
      {
        type: 'list',
        items: [
          'N’extraire les données qu’à partir de sources fiables.',
          'Enregistrer l’horodatage de la collecte.',
          'Valider les données avant de les utiliser pour l’entraînement, au titre du principe d’exactitude.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Le comité précise également l’usage de l’intérêt légitime comme base juridique dans ce contexte précis, et donne des indications sur la minimisation des données. Il admet qu’un responsable de traitement puisse ne pas informer personnellement les personnes concernées lorsque cela s’avère impossible ou exige des efforts disproportionnés.',
      },
      { type: 'heading', text: 'Le point dur : les données sensibles' },
      {
        type: 'paragraph',
        text: 'Le traitement de catégories particulières de données — santé, opinions, orientation sexuelle — reste en principe interdit. Si le moissonnage en collecte, il faut une base légale au titre de l’article 6 du RGPD et une exception au titre de l’article 9. Le comité suggère que l’arrêt GC e.a. peut être pertinent pour une collecte accessoire ou résiduelle, à condition que le responsable agisse dans le cadre de ses responsabilités et mette en place des mesures techniques et organisationnelles empêchant la collecte et la diffusion de ces données. Et il ferme la porte à toute lecture extensive : il n’existe aucune exemption générale aux exigences de l’article 9, chaque cas devant être apprécié individuellement.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Deux approches de l’anonymisation, dont une volontairement plus prudente.',
          'Sources fiables, horodatage et validation deviennent des attentes explicites.',
          'Aucune exemption générale pour les données sensibles moissonnées par accident.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'CNIL',
        title:
          'Le CEPD met en lumière l’anonymisation et le moissonnage pour l’IA générative et adopte la version finale des lignes directrices sur la chaîne de blocs',
        url: 'https://www.cnil.fr/fr/cepd-ia-generative-chaines-blocs',
        publishedAt: '2026-07-09',
      },
    ],
  },
];
