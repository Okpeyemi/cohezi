import type { Article } from '../types';

export const businessArticles: Article[] = [
  {
    slug: 'mistral-leve-3-milliards-d-euros',
    title: 'Mistral lève 3 milliards d’euros. Ce que ce tour de table dit de l’ambition européenne.',
    excerpt:
      'Valorisation multipliée par quatre en dix-huit mois, entrée d’investisseurs souverains et pari sur les modèles spécialisés : la startup française devient l’alternative que Bruxelles attendait.',
    category: 'business',
    publishedAt: '2026-08-30',
    readingMinutes: 2,
    image: { alt: 'Bureaux vitrés d’une startup à Paris' },
    body: [
      {
        type: 'paragraph',
        text: 'Mistral annonce une levée de 3 milliards d’euros, qui porte sa valorisation à quatre fois celle de son tour précédent, dix-huit mois plus tôt. Deux fonds souverains européens entrent au capital aux côtés des investisseurs historiques.',
      },
      { type: 'heading', text: 'Un financement à visée industrielle' },
      {
        type: 'paragraph',
        text: 'Le montant ne sert pas à recruter mais à réserver du calcul. L’entreprise annonce des engagements pluriannuels auprès de fournisseurs d’infrastructure européens, ce qui répond directement à la contrainte d’accès au matériel qui pèse sur tous les acteurs hors des trois géants.',
      },
      {
        type: 'paragraph',
        text: 'La stratégie affichée reste celle des modèles spécialisés plutôt que du modèle universel : des versions adaptées à la santé, au juridique et à l’industrie, entraînées sur des corpus sectoriels. C’est un pari sur la valeur d’usage plutôt que sur les classements généralistes.',
      },
      {
        type: 'list',
        items: [
          'L’entrée d’investisseurs souverains signale une lecture stratégique, pas seulement financière.',
          'L’essentiel du montant est fléché vers la réservation de capacité de calcul.',
          'Le pari sectoriel évite la comparaison frontale avec les modèles généralistes.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'La valorisation suppose une croissance des revenus que l’entreprise ne communique pas. Le prochain jalon crédible sera la signature de contrats d’entreprise à plusieurs années, seule preuve que la stratégie sectorielle trouve son marché.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'L’argent va au calcul, ressource devenue le vrai facteur limitant.',
          'Deux fonds souverains européens entrent au capital : la levée est aussi politique.',
          'La validation viendra des contrats pluriannuels, pas de la valorisation.',
        ],
      },
    ],
  },
  {
    slug: 'microsoft-facture-les-agents-a-la-tache',
    title: 'Microsoft facture désormais les agents à la tâche. Le modèle économique de l’IA bascule.',
    excerpt:
      'Fini l’abonnement par utilisateur : on paie un résultat. Pourquoi ce changement inquiète les DSI, ravit les directions financières et redéfinit ce qu’est un logiciel.',
    category: 'business',
    publishedAt: '2026-08-27',
    readingMinutes: 2,
    image: { alt: 'Tableau de bord de facturation sur un écran de portable' },
    body: [
      {
        type: 'paragraph',
        text: 'Microsoft abandonne l’abonnement mensuel par utilisateur pour ses agents et facture désormais à la tâche accomplie : un dossier traité, un rapport produit, un ticket résolu. Le prix unitaire varie selon la complexité déclarée de la tâche.',
      },
      { type: 'heading', text: 'Pourquoi les directions financières applaudissent' },
      {
        type: 'paragraph',
        text: 'Le logiciel devient une dépense variable, corrélée à l’activité. Une entreprise qui traite moins de dossiers paie moins. Cela supprime le coût des licences dormantes, longtemps le principal poste de gaspillage informatique.',
      },
      {
        type: 'paragraph',
        text: 'Les directions techniques y voient l’inverse : un budget devenu imprévisible, sensible à un pic d’activité ou à une boucle mal maîtrisée. Plusieurs grandes entreprises exigent déjà des plafonds contractuels avant de signer.',
      },
      {
        type: 'quote',
        text: 'On sait budgéter mille licences. On ne sait pas budgéter mille agents qui décident eux-mêmes combien de fois s’exécuter.',
        author: 'Un directeur des systèmes d’information dans l’assurance',
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'La question ouverte est celle de la définition d’une tâche. Tant que le fournisseur décide seul de ce qui compte comme unité facturable, le client ne peut ni auditer ni contester. Les premiers contrats avec plafond et journal de facturation détaillé feront référence.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le logiciel passe d’un coût fixe à un coût variable indexé sur l’activité.',
          'L’imprévisibilité budgétaire devient le principal frein à l’adoption.',
          'La définition contractuelle de la tâche facturable est le point à négocier.',
        ],
      },
    ],
  },
  {
    slug: 'salesforce-rachete-une-startup-d-agents-pour-4-milliards',
    title: 'Salesforce rachète une startup d’agents pour 4 milliards. La consolidation commence.',
    excerpt:
      'Troisième acquisition du secteur en un trimestre. Les grands éditeurs préfèrent acheter que construire, et les startups indépendantes ont de moins en moins de temps pour prouver leur valeur.',
    category: 'business',
    publishedAt: '2026-08-25',
    readingMinutes: 2,
    image: { alt: 'Poignée de main devant un logo d’entreprise' },
    body: [
      {
        type: 'paragraph',
        text: 'Salesforce acquiert pour 4 milliards de dollars une startup spécialisée dans les agents commerciaux, trois ans après sa création. C’est la troisième opération de ce type en un trimestre dans le secteur.',
      },
      { type: 'heading', text: 'Acheter revient moins cher que rattraper' },
      {
        type: 'paragraph',
        text: 'Les grands éditeurs disposent de la distribution et des données clients, mais pas de l’avance technique. Les startups ont l’inverse. L’acquisition résout l’équation des deux côtés, et le calendrier compte : construire en interne demanderait dix-huit mois, un délai que le marché ne laisse plus.',
      },
      {
        type: 'paragraph',
        text: 'Pour les startups, la fenêtre d’indépendance se referme. Lever suffisamment pour financer le calcul tout en restant autonome suppose une croissance que peu atteignent avant d’être rattrapées par un éditeur intégré.',
      },
      {
        type: 'list',
        items: [
          'Les éditeurs achètent la technologie, les startups achètent la distribution.',
          'Le délai de construction interne est devenu le principal argument d’acquisition.',
          'Les clients héritent d’une intégration incertaine pendant douze à vingt-quatre mois.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Le sort des clients existants de la startup rachetée dira si ces opérations créent de la valeur ou seulement de la part de marché. Les précédents du secteur logiciel penchent vers l’attrition, avec des tarifs révisés et des fonctionnalités abandonnées dans l’année qui suit.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Les éditeurs intégrés achètent le temps qu’ils n’ont pas pour construire.',
          'La fenêtre d’indépendance des startups d’agents se referme rapidement.',
          'Le traitement des clients existants sera le juge de paix de ces rachats.',
        ],
      },
    ],
  },
  {
    slug: 'le-cout-de-l-inference-a-chute-de-80-pour-cent-en-un-an',
    title: 'Le coût de l’inférence a chuté de 80 % en un an. Qui en profite vraiment ?',
    excerpt:
      'Les fournisseurs de modèles se livrent une guerre des prix que leurs clients ne voient pas toujours. Où va la marge, et pourquoi les applications restent chères.',
    category: 'business',
    publishedAt: '2026-08-21',
    readingMinutes: 2,
    image: { alt: 'Courbe de prix en baisse sur un écran' },
    body: [
      {
        type: 'paragraph',
        text: 'Le prix du million de jetons a baissé d’environ 80 % en douze mois chez les principaux fournisseurs. Pourtant, le prix des applications construites au-dessus n’a pratiquement pas bougé. Cet écart mérite d’être expliqué.',
      },
      { type: 'heading', text: 'La marge se déplace vers la couche applicative' },
      {
        type: 'paragraph',
        text: 'Le coût du modèle ne représente souvent qu’une fraction du prix payé par l’utilisateur final. Le reste couvre l’intégration, la sécurité, le support et la conformité, dont les coûts n’ont pas baissé. Les éditeurs d’applications encaissent donc l’essentiel de la baisse.',
      },
      {
        type: 'paragraph',
        text: 'Second effet : la baisse encourage la consommation. Des produits qui appelaient le modèle une fois par requête en font désormais cinq ou dix pour améliorer la qualité. Le coût unitaire chute, la facture totale non.',
      },
      {
        type: 'list',
        items: [
          'La part du modèle dans le prix final reste minoritaire chez la plupart des éditeurs.',
          'La baisse du coût unitaire est absorbée par l’augmentation du nombre d’appels.',
          'Les clients qui appellent les modèles directement sont les seuls à voir la baisse.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'La question est de savoir si ces prix sont soutenables. Plusieurs fournisseurs vendent probablement à perte pour capter le marché. Une remontée tarifaire, ou l’instauration de paliers de volume moins favorables, prendrait à revers tous les modèles économiques bâtis sur les prix actuels.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'La baisse profite d’abord aux éditeurs d’applications, pas aux utilisateurs finaux.',
          'La consommation augmente à mesure que le coût unitaire diminue.',
          'La soutenabilité de ces prix reste la principale incertitude du secteur.',
        ],
      },
    ],
  },
  {
    slug: 'tsmc-samsung-intel-la-guerre-des-fonderies',
    title: 'TSMC, Samsung, Intel : la guerre des fonderies décide de qui aura de l’IA en 2027.',
    excerpt:
      'Les capacités de gravure avancée sont réservées deux ans à l’avance. Comprendre pourquoi une usine à Taïwan pèse plus que n’importe quel modèle sur la disponibilité de l’IA.',
    category: 'business',
    publishedAt: '2026-08-18',
    readingMinutes: 2,
    image: { alt: 'Salle blanche d’une usine de semi-conducteurs' },
    body: [
      {
        type: 'paragraph',
        text: 'Les capacités de production en gravure avancée sont réservées jusqu’en 2028. Trois fondeurs se partagent ce marché, et un seul détient l’essentiel des volumes disponibles pour les accélérateurs destinés à l’intelligence artificielle.',
      },
      { type: 'heading', text: 'Une contrainte physique qui précède tout le reste' },
      {
        type: 'paragraph',
        text: 'Une usine de gravure avancée coûte plusieurs dizaines de milliards et demande quatre à cinq ans entre la décision et la première production en volume. Aucune quantité d’argent injectée aujourd’hui ne produit de capacité supplémentaire avant 2029. Le calendrier est donc figé.',
      },
      {
        type: 'paragraph',
        text: 'Cette rigidité explique la course aux contrats d’approvisionnement. Les acteurs qui n’ont pas sécurisé de volume achèteront de la capacité de calcul en location, à des tarifs fixés par ceux qui l’ont fait.',
      },
      {
        type: 'quote',
        text: 'La feuille de route d’un modèle se décide aujourd’hui dans un carnet de commandes signé il y a deux ans.',
        author: 'Un analyste du secteur des semi-conducteurs',
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Les investissements annoncés aux États-Unis, en Europe et au Japon visent à réduire la concentration géographique. Les premiers volumes significatifs sont attendus vers 2029 : d’ici là, la disponibilité de l’IA reste suspendue à la production d’un nombre réduit de sites.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'La capacité de production est figée jusqu’en 2028, quel que soit l’argent investi.',
          'Sans contrat d’approvisionnement, un acteur loue son calcul à ses concurrents.',
          'La diversification géographique ne produira d’effet qu’à partir de 2029.',
        ],
      },
    ],
  },
  {
    slug: 'les-data-centers-manquent-d-electricite',
    title: 'Les data centers manquent d’électricité. L’IA se heurte à un mur physique.',
    excerpt:
      'Files d’attente de raccordement, réacteurs nucléaires relancés, contrats d’énergie à vingt ans : la contrainte n’est plus logicielle. Cartographie des goulets d’étranglement.',
    category: 'business',
    publishedAt: '2026-08-14',
    readingMinutes: 2,
    image: { alt: 'Lignes à haute tension au-dessus d’un centre de données' },
    body: [
      {
        type: 'paragraph',
        text: 'Dans plusieurs régions d’Europe et d’Amérique du Nord, les demandes de raccordement de centres de données s’accumulent avec des délais de quatre à sept ans. Le foncier est disponible, le financement aussi ; l’électricité, non.',
      },
      { type: 'heading', text: 'Le réseau, pas la production' },
      {
        type: 'paragraph',
        text: 'Le problème est rarement la quantité d’énergie produite, mais la capacité du réseau à l’acheminer jusqu’au site. Renforcer une ligne à haute tension demande des années d’autorisations et de travaux, un calendrier sans rapport avec celui d’un projet informatique.',
      },
      {
        type: 'paragraph',
        text: 'D’où les stratégies de contournement : contrats d’approvisionnement de vingt ans signés directement avec des producteurs, relance de capacités nucléaires existantes, et implantation dans des régions choisies pour leur réseau plutôt que pour leur proximité avec les utilisateurs.',
      },
      {
        type: 'list',
        items: [
          'Les délais de raccordement dépassent souvent la durée de vie d’une génération de matériel.',
          'Les contrats d’énergie de long terme deviennent un avantage concurrentiel.',
          'La localisation des centres se décide sur la carte du réseau électrique.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'La tension entre usage industriel et consommation domestique commence à devenir politique. Plusieurs autorités locales conditionnent déjà les autorisations à des engagements sur la chaleur récupérée ou sur l’approvisionnement en énergie décarbonée. Ce cadre, plus que la technique, décidera où l’IA peut croître.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le goulet d’étranglement est le réseau de transport, pas la production.',
          'Les contrats d’énergie longs deviennent un actif stratégique.',
          'Les conditions posées par les autorités locales orienteront la géographie du secteur.',
        ],
      },
    ],
  },
  {
    slug: 'pourquoi-les-banques-adoptent-l-ia-plus-vite-que-les-hopitaux',
    title: 'Pourquoi les banques adoptent l’IA plus vite que les hôpitaux.',
    excerpt:
      'Mêmes outils, résultats opposés. Données structurées, responsabilité juridique et culture du risque expliquent l’écart, et ce qu’il faudrait pour le combler.',
    category: 'business',
    publishedAt: '2026-08-11',
    readingMinutes: 2,
    image: { alt: 'Hall d’une banque avec des écrans d’information' },
    body: [
      {
        type: 'paragraph',
        text: 'Les banques déploient des systèmes d’intelligence artificielle en production depuis plusieurs années. Les hôpitaux, qui disposent des mêmes outils et de cas d’usage tout aussi évidents, en sont encore aux expérimentations. Trois différences structurelles expliquent cet écart.',
      },
      { type: 'heading', text: 'Des données prêtes contre des données à construire' },
      {
        type: 'paragraph',
        text: 'Une transaction bancaire est structurée par nature : montant, date, contrepartie, catégorie. Un dossier médical mêle texte libre, images, résultats hétérogènes et informations manquantes. La première tâche d’un projet hospitalier est de rendre les données exploitables, ce qui consomme l’essentiel du budget avant tout résultat.',
      },
      {
        type: 'paragraph',
        text: 'La responsabilité joue ensuite. Une erreur de scoring coûte de l’argent et se corrige ; une erreur de diagnostic engage une responsabilité personnelle et parfois pénale. Cette asymétrie suffit à expliquer la prudence, indépendamment de la qualité des outils.',
      },
      {
        type: 'list',
        items: [
          'Les données bancaires sont structurées dès l’origine, les données de santé ne le sont pas.',
          'La responsabilité en cas d’erreur n’a pas la même nature ni les mêmes conséquences.',
          'Le secteur financier dispose d’équipes de modélisation depuis trente ans.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Les projets hospitaliers qui avancent partagent un trait : ils commencent par des tâches administratives, comptes rendus et codage des actes, où l’erreur se corrige sans risque clinique. C’est probablement par là que l’adoption se fera, plutôt que par le diagnostic.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'La qualité des données explique l’écart plus que la maturité technologique.',
          'Le régime de responsabilité conditionne le rythme d’adoption.',
          'Les usages administratifs sont la voie d’entrée réaliste à l’hôpital.',
        ],
      },
    ],
  },
  {
    slug: 'startups-ia-le-retour-des-valorisations-raisonnables',
    title: 'Startups IA : le retour des valorisations raisonnables.',
    excerpt:
      'Après deux ans d’euphorie, les investisseurs exigent des revenus. Ce que révèlent les derniers tours de table sur les modèles qui tiennent vraiment.',
    category: 'business',
    publishedAt: '2026-08-07',
    readingMinutes: 2,
    image: { alt: 'Fondateurs en réunion autour d’une table' },
    body: [
      {
        type: 'paragraph',
        text: 'Les tours de table du trimestre marquent une inflexion : les multiples de valorisation appliqués aux startups d’intelligence artificielle reviennent vers ceux du logiciel classique. Les levées se font toujours, mais sur des bases différentes.',
      },
      { type: 'heading', text: 'Ce que les investisseurs regardent maintenant' },
      {
        type: 'paragraph',
        text: 'La question posée est passée de la démonstration technique à la marge brute. Une entreprise qui reverse la moitié de son chiffre d’affaires en coûts de calcul ne présente pas le même profil qu’un éditeur logiciel, même avec une croissance identique.',
      },
      {
        type: 'paragraph',
        text: 'Deuxième critère, la rétention. Beaucoup de produits ont connu une adoption rapide suivie d’un abandon silencieux. Les investisseurs demandent désormais l’usage à six mois, pas le nombre d’inscriptions.',
      },
      {
        type: 'list',
        items: [
          'La marge brute redevient le premier indicateur examiné.',
          'La rétention à six mois remplace le nombre d’utilisateurs inscrits.',
          'Les entreprises sans coûts de calcul propres sont revalorisées à la hausse.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Cette normalisation n’est pas un retournement, mais une sélection. Les entreprises qui avaient levé sur la promesse et non sur l’usage arrivent en fin de trésorerie dans les douze prochains mois. Le nombre de rachats à prix cassés, davantage que les faillites, mesurera l’ampleur de la correction.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Les multiples reviennent vers ceux du logiciel classique.',
          'Marge brute et rétention ont remplacé la démonstration technique.',
          'Les rachats à prix cassés diront l’ampleur réelle de la correction.',
        ],
      },
    ],
  },
];
