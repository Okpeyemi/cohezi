import type { Article } from '../types';

export const analyseArticles: Article[] = [
  {
    slug: 'open-source-contre-modeles-fermes-la-vraie-ligne-de-fracture',
    title: 'Open source contre modèles fermés : la vraie ligne de fracture n’est pas celle qu’on croit.',
    excerpt:
      'Le débat oppose des licences. Il devrait opposer des dépendances : qui contrôle les données, les puces et la distribution. Une grille de lecture pour ne plus confondre ouverture et indépendance.',
    category: 'analyse',
    publishedAt: '2026-08-31',
    readingMinutes: 2,
    image: { alt: 'Deux serveurs face à face dans une salle blanche' },
    body: [
      {
        type: 'paragraph',
        text: 'Le débat public oppose deux camps : les modèles ouverts, dont les poids sont téléchargeables, et les modèles fermés, accessibles seulement par interface de programmation. Cette ligne de partage est réelle, mais elle masque la question qui décide vraiment de l’autonomie d’un acteur.',
      },
      { type: 'heading', text: 'Trois dépendances, pas une licence' },
      {
        type: 'paragraph',
        text: 'Télécharger des poids ne rend indépendant que si l’on peut les faire tourner, les mettre à jour et les distribuer. Or ces trois capacités dépendent de ressources que la licence ne donne pas : l’accès aux accélérateurs, la propriété des données d’entraînement, et le canal par lequel l’utilisateur final rencontre le service.',
      },
      {
        type: 'paragraph',
        text: 'Une entreprise qui déploie un modèle ouvert sur une infrastructure louée à un seul fournisseur, entraîné sur des données qu’elle ne possède pas, et distribué via une place de marché qu’elle ne contrôle pas, n’est pas plus indépendante qu’un client d’interface. Elle a simplement déplacé sa dépendance.',
      },
      {
        type: 'list',
        items: [
          'Le calcul : peut-on entraîner et servir sans autorisation d’un tiers ?',
          'Les données : le corpus est-il détenu, licencié, ou emprunté ?',
          'La distribution : l’accès à l’utilisateur passe-t-il par un intermédiaire qui peut le couper ?',
        ],
      },
      { type: 'heading', text: 'Ce que la grille change en pratique' },
      {
        type: 'paragraph',
        text: 'Appliquée aux acteurs européens, cette lecture donne un résultat contre-intuitif : certains fournisseurs de modèles fermés, mais adossés à une infrastructure et à des données propres, sont structurellement plus autonomes que des projets ouverts entièrement dépendants d’un fondeur et d’un hébergeur étrangers. La licence rassure ; elle ne protège pas.',
      },
      {
        type: 'takeaway',
        title: 'Ce qu’il faut retenir',
        items: [
          'L’ouverture des poids ne dit rien de l’indépendance réelle.',
          'Calcul, données et distribution forment la vraie grille d’analyse.',
          'Un modèle fermé bien adossé peut être plus souverain qu’un modèle ouvert dépendant.',
        ],
      },
    ],
  },
  {
    slug: 'les-agents-ia-vont-ils-faire-disparaitre-les-applications',
    title: 'Les agents IA vont-ils faire disparaître les applications ?',
    excerpt: 'Comprendre le changement qui pourrait redéfinir notre manière d’utiliser Internet.',
    category: 'analyse',
    publishedAt: '2026-08-23',
    readingMinutes: 2,
    image: { alt: 'Écran de smartphone dont les icônes d’applications s’effacent' },
    deepDive: true,
    body: [
      {
        type: 'paragraph',
        text: 'L’hypothèse circule depuis deux ans : si un agent réserve le billet, compare les offres et remplit le formulaire, l’utilisateur n’a plus besoin d’ouvrir l’application. L’interface disparaîtrait au profit d’une conversation. Cette prédiction mérite d’être prise au sérieux, et démontée.',
      },
      { type: 'heading', text: 'Ce que les agents remplacent déjà' },
      {
        type: 'paragraph',
        text: 'Les tâches transactionnelles simples sont les premières concernées : commander à nouveau la même chose, transférer un document, prendre un rendez-vous dans un créneau connu. Ces gestes n’avaient pas besoin d’interface, ils en avaient une par défaut.',
      },
      {
        type: 'paragraph',
        text: 'À l’inverse, tout ce qui suppose de comparer, de découvrir ou d’arbitrer résiste. Choisir un logement, sélectionner un vêtement, arbitrer entre deux offres d’assurance : l’utilisateur veut voir, pas déléguer. L’interface visuelle n’est pas une limite technique, c’est le format d’un choix.',
      },
      {
        type: 'quote',
        text: 'On délègue volontiers ce qui nous ennuie. On ne délègue presque jamais ce qui nous engage.',
        author: 'Une chercheuse en interaction homme-machine',
      },
      { type: 'heading', text: 'Le vrai enjeu est la place de l’intermédiaire' },
      {
        type: 'paragraph',
        text: 'Si l’agent devient le point d’entrée, il devient aussi celui qui décide quelle offre est présentée. Le débat n’est donc pas la disparition des applications, mais le déplacement du pouvoir de recommandation depuis les plateformes vers ceux qui possèdent l’agent. C’est la même bataille que celle du moteur de recherche, avec un cran d’intermédiation supplémentaire.',
      },
      {
        type: 'takeaway',
        title: 'Ce qu’il faut surveiller',
        items: [
          'Les tâches répétitives migrent vers les agents, les choix engageants restent visuels.',
          'La question centrale est le contrôle de la recommandation, pas la survie des interfaces.',
          'Les acteurs qui possèdent l’agent hériteront du pouvoir de prescription.',
        ],
      },
    ],
  },
  {
    slug: 'ce-que-l-histoire-du-cloud-nous-apprend-sur-l-economie-de-l-ia',
    title: 'Ce que l’histoire du cloud nous apprend sur l’économie de l’IA.',
    excerpt:
      'En 2010, tout le monde prédisait la commoditisation du cloud. Trois acteurs ont capté le marché. Les mêmes mécanismes de capital, d’échelle et de verrouillage sont à l’œuvre aujourd’hui.',
    category: 'analyse',
    publishedAt: '2026-08-10',
    readingMinutes: 2,
    image: { alt: 'Rangées de serveurs dans un centre de données' },
    body: [
      {
        type: 'paragraph',
        text: 'Au début des années 2010, la thèse dominante annonçait la banalisation du cloud : de l’informatique vendue au litre, des marges qui s’effondrent, des fournisseurs interchangeables. Quinze ans plus tard, trois acteurs concentrent l’essentiel du marché avec des marges confortables. Comprendre pourquoi éclaire ce qui se joue aujourd’hui.',
      },
      { type: 'heading', text: 'Trois mécanismes qui empêchent la banalisation' },
      {
        type: 'paragraph',
        text: 'Le premier est l’intensité capitalistique : construire des centres de données demande des milliards, ce qui élimine mécaniquement les nouveaux entrants. Le deuxième est l’effet d’échelle sur les coûts d’exploitation, qui creuse l’écart avec le temps. Le troisième, le plus décisif, est le verrouillage par les services annexes : on ne migre pas une base de données, une file de messages et une chaîne d’authentification pour économiser quelques points.',
      },
      {
        type: 'paragraph',
        text: 'Les trois mécanismes se retrouvent aujourd’hui dans l’IA. L’entraînement exige un capital hors de portée de la plupart des acteurs, l’échelle réduit le coût unitaire de l’inférence, et l’intégration des modèles dans les outils quotidiens crée une dépendance qui n’a rien à voir avec la qualité du modèle.',
      },
      {
        type: 'list',
        items: [
          'Le capital sélectionne les acteurs avant même la compétition technique.',
          'L’échelle transforme un avantage de coût temporaire en écart durable.',
          'Le verrouillage se fait par l’intégration, pas par la performance du modèle.',
        ],
      },
      { type: 'heading', text: 'Ce que l’analogie ne dit pas' },
      {
        type: 'paragraph',
        text: 'Une différence compte : les poids d’un modèle se copient, pas un centre de données. Un acteur qui publie ses modèles remet à zéro l’avantage technique de ses concurrents, ce qui n’avait pas d’équivalent dans le cloud. C’est la seule force connue qui pousse en sens inverse de la concentration.',
      },
      {
        type: 'takeaway',
        title: 'Ce qu’il faut retenir',
        items: [
          'Capital, échelle et verrouillage ont concentré le cloud malgré les prédictions inverses.',
          'Les trois mécanismes sont à l’œuvre dans l’IA, avec la même trajectoire.',
          'La diffusion des poids est le seul contrepoids structurel à cette concentration.',
        ],
      },
    ],
  },
];
