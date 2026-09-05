import type { Article } from '../types';

export const societeArticles: Article[] = [
  {
    slug: 'le-bac-2026-corrige-par-des-ia',
    title: 'Le bac 2026 corrigé par des IA : ce que les enseignants en disent vraiment.',
    excerpt:
      'Trois académies ont testé la pré-correction automatique. Gain de temps réel, désaccords sur les copies limites et une question qui dépasse l’examen : qui juge ?',
    category: 'societe',
    publishedAt: '2026-08-29',
    readingMinutes: 2,
    image: { alt: 'Copies d’examen empilées sur un bureau' },
    body: [
      {
        type: 'paragraph',
        text: 'Trois académies ont expérimenté cette année une pré-correction automatique sur les épreuves écrites. Le système propose une note et un commentaire, que le correcteur valide, modifie ou rejette. Les enseignants gardent la décision finale.',
      },
      { type: 'heading', text: 'Un gain de temps réel, une fatigue déplacée' },
      {
        type: 'paragraph',
        text: 'Les retours convergent sur le temps gagné : un tiers environ, essentiellement sur les copies clairement bonnes ou clairement insuffisantes. Le désaccord porte sur le reste. Sur les copies moyennes, celles qui demandent un jugement, les correcteurs décrivent un effort supplémentaire pour se défaire de la note proposée.',
      },
      {
        type: 'paragraph',
        text: 'Ce phénomène a un nom en psychologie de la décision : l’ancrage. Une valeur affichée avant l’évaluation influence le jugement même quand on la sait faillible. Plusieurs académies envisagent de masquer la note proposée jusqu’à ce que le correcteur ait formé la sienne.',
      },
      {
        type: 'quote',
        text: 'Ce n’est pas la machine qui me dérange, c’est de devoir justifier pourquoi je ne suis pas d’accord avec elle.',
        author: 'Une enseignante de lettres ayant participé à l’expérimentation',
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'La généralisation dépendra moins de la performance du système que du protocole qui l’entoure. Afficher la note avant ou après, rendre l’écart traçable, mesurer les divergences par correcteur : ces choix décideront si l’outil reste une aide ou devient une norme implicite.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le gain de temps se concentre sur les copies faciles à trancher.',
          'L’effet d’ancrage pèse sur les copies moyennes, celles qui demandent un jugement.',
          'Le protocole d’affichage comptera plus que la qualité du modèle.',
        ],
      },
    ],
  },
  {
    slug: 'radiologie-l-ia-detecte-mieux-mais-qui-est-responsable',
    title: 'Radiologie : l’IA détecte mieux, mais qui est responsable en cas d’erreur ?',
    excerpt:
      'Les algorithmes dépassent les praticiens sur certains cancers. Les assureurs, les hôpitaux et les patients ne sont pas d’accord sur la suite. État des lieux du droit et des pratiques.',
    category: 'societe',
    publishedAt: '2026-08-24',
    readingMinutes: 2,
    image: { alt: 'Radiologue examinant une image médicale sur écran' },
    body: [
      {
        type: 'paragraph',
        text: 'Sur plusieurs types de cancers, les systèmes de détection affichent des performances supérieures à celles des radiologues en lecture seule. Le point de bascule est franchi ; la question du régime de responsabilité, elle, reste entière.',
      },
      { type: 'heading', text: 'Trois configurations, trois responsabilités' },
      {
        type: 'paragraph',
        text: 'Si le praticien suit l’algorithme et que celui-ci se trompe, la responsabilité reste médicale : le professionnel valide. S’il l’écarte et que l’algorithme avait raison, la question devient plus délicate, et les assureurs commencent à en tenir compte dans leurs conditions. Troisième cas, le plus incertain : si le système n’a pas été utilisé alors qu’il était disponible.',
      },
      {
        type: 'paragraph',
        text: 'Cette dernière configuration inquiète les établissements. Elle transforme la disponibilité d’un outil en obligation implicite de l’employer, sans qu’aucun texte ne l’impose.',
      },
      {
        type: 'list',
        items: [
          'Suivre l’algorithme n’exonère pas le praticien de sa responsabilité.',
          'S’en écarter demande de plus en plus une justification écrite.',
          'Ne pas l’utiliser pourrait devenir une faute, sans base légale explicite.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Les premières décisions de justice trancheront ce que les textes ne disent pas. En attendant, les établissements documentent systématiquement les écarts entre proposition et décision, ce qui alourdit le travail mais constitue la seule protection disponible.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'La performance technique est acquise, le cadre de responsabilité ne l’est pas.',
          'La non-utilisation d’un outil disponible devient un risque juridique nouveau.',
          'La traçabilité des écarts est aujourd’hui la seule protection des praticiens.',
        ],
      },
    ],
  },
  {
    slug: 'recruteurs-et-candidats-utilisent-des-ia-qui-gagne',
    title: 'Les recruteurs trient avec des IA, les candidats postulent avec des IA. Qui gagne ?',
    excerpt:
      'CV optimisés contre filtres automatisés : l’embauche devient une conversation entre machines. Ce que les entreprises changent pour retrouver le contact humain.',
    category: 'societe',
    publishedAt: '2026-08-20',
    readingMinutes: 2,
    image: { alt: 'Entretien d’embauche dans un bureau lumineux' },
    body: [
      {
        type: 'paragraph',
        text: 'D’un côté, les entreprises filtrent des milliers de candidatures avec des systèmes automatisés. De l’autre, les candidats génèrent des lettres et adaptent leur CV avec les mêmes outils. Le nombre de candidatures par offre a doublé en deux ans ; leur pouvoir discriminant s’est effondré.',
      },
      { type: 'heading', text: 'Une course qui annule ses propres gains' },
      {
        type: 'paragraph',
        text: 'Chaque camp répond à l’automatisation de l’autre par davantage d’automatisation. Le résultat net est un volume accru, une qualité de signal en baisse et un temps de traitement inchangé. Les recruteurs décrivent des lots de candidatures interchangeables, correctement rédigées et impossibles à départager.',
      },
      {
        type: 'paragraph',
        text: 'Les entreprises qui s’en sortent le mieux ont modifié l’épreuve plutôt que le filtre : exercice pratique court, échange de vingt minutes en amont, mise en situation. Ce qui se vérifie difficilement à distance redevient discriminant.',
      },
      {
        type: 'list',
        items: [
          'Le CV a perdu l’essentiel de sa valeur de tri.',
          'Les exercices pratiques courts remplacent la lettre de motivation.',
          'Le premier échange humain remonte plus tôt dans le processus.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Le risque est celui d’un report de la charge sur les candidats, sommés de réaliser des exercices non rémunérés pour chaque candidature. Plusieurs entreprises limitent désormais ces épreuves à une heure et les rendent réutilisables, ce qui pourrait devenir la norme acceptable.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'L’automatisation des deux côtés annule les gains de chacun.',
          'Le CV cède la place à des épreuves pratiques courtes.',
          'La charge imposée aux candidats devient le point de vigilance.',
        ],
      },
    ],
  },
  {
    slug: 'deepfakes-en-campagne-comment-la-france-prepare-les-municipales',
    title: 'Deepfakes en campagne : comment la France prépare les municipales.',
    excerpt:
      'Cellule de veille, étiquetage obligatoire et délais de retrait raccourcis. Les mesures existent, leur application reste incertaine : retour sur les premiers cas.',
    category: 'societe',
    publishedAt: '2026-08-16',
    readingMinutes: 2,
    image: { alt: 'Panneaux d’affichage électoral dans une rue' },
    body: [
      {
        type: 'paragraph',
        text: 'À six mois des municipales, le dispositif est en place : une cellule de veille interministérielle, une obligation d’étiquetage des contenus générés à caractère politique, et un délai de retrait ramené à vingt-quatre heures pour les plateformes.',
      },
      { type: 'heading', text: 'Les premiers cas révèlent le vrai problème' },
      {
        type: 'paragraph',
        text: 'Les contenus signalés jusqu’ici ne sont pas des faux spectaculaires mais des montages ordinaires : une phrase authentique replacée dans un autre contexte, une voix synthétisée sur des propos plausibles. Ils passent sous le seuil des détecteurs, calibrés sur des falsifications grossières.',
      },
      {
        type: 'paragraph',
        text: 'Le délai de vingt-quatre heures pose une autre difficulté. Un contenu partagé massivement atteint l’essentiel de son audience dans les six premières heures. Le retrait intervient après que le dommage est fait, ce qui limite son intérêt à la trace juridique.',
      },
      {
        type: 'quote',
        text: 'Un démenti publié le lendemain touche dix fois moins de monde que la vidéo qu’il corrige. Nous le savons, et nous n’avons pas mieux.',
        author: 'Un membre de la cellule de veille',
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Les scrutins locaux, moins couverts médiatiquement que les nationaux, sont les plus exposés : peu de journalistes pour vérifier, et des candidats sans moyens de riposte. C’est là, plus que dans les grandes villes, que se jouera l’efficacité réelle du dispositif.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Les manipulations efficaces sont ordinaires, pas spectaculaires.',
          'Le délai de retrait intervient après le pic de diffusion.',
          'Les scrutins locaux peu couverts sont les plus vulnérables.',
        ],
      },
    ],
  },
  {
    slug: 'musique-generee-les-plateformes-commencent-a-l-etiqueter',
    title: 'Musique générée : les plateformes commencent à l’étiqueter. Trop tard ?',
    excerpt:
      'Un titre sur cinq ajouté chaque jour est produit par une IA. Comment l’étiquetage fonctionne, ce qu’il change pour les artistes et pourquoi les redevances restent le vrai sujet.',
    category: 'societe',
    publishedAt: '2026-08-13',
    readingMinutes: 2,
    image: { alt: 'Casque audio posé sur une table de mixage' },
    body: [
      {
        type: 'paragraph',
        text: 'Les principales plateformes de streaming affichent désormais une mention sur les titres entièrement générés. Selon leurs propres chiffres, environ un morceau sur cinq déposé chaque jour entre dans cette catégorie.',
      },
      { type: 'heading', text: 'L’étiquette ne règle pas la question des revenus' },
      {
        type: 'paragraph',
        text: 'L’enveloppe de redevances est répartie au prorata des écoutes. Chaque titre supplémentaire, généré ou non, dilue la part des autres. L’étiquetage informe l’auditeur mais ne modifie pas cette mécanique : un morceau généré écouté rapporte autant qu’un morceau enregistré.',
      },
      {
        type: 'paragraph',
        text: 'Le phénomène se concentre sur les usages fonctionnels, musique d’ambiance, playlists de concentration, fonds sonores, où l’identité de l’auteur importe peu à l’auditeur. C’est précisément le segment qui faisait vivre beaucoup de musiciens de production.',
      },
      {
        type: 'list',
        items: [
          'L’étiquetage repose sur la déclaration du déposant, difficilement vérifiable.',
          'La dilution des redevances continue quelle que soit l’étiquette.',
          'La musique fonctionnelle est le segment le plus directement touché.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Deux pistes circulent : exclure les titres générés du partage de redevances, ou passer d’une répartition au prorata global à une répartition par abonné, qui protège les artistes de niche. La seconde changerait davantage l’économie du secteur que n’importe quelle mention affichée.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'L’étiquetage informe sans modifier la répartition des revenus.',
          'La musique fonctionnelle absorbe l’essentiel du choc.',
          'La réforme du mode de répartition est le seul levier vraiment structurant.',
        ],
      },
    ],
  },
  {
    slug: 'vos-photos-entrainent-des-modeles-le-nouveau-consentement',
    title: 'Vos photos entraînent des modèles. Ce que permet vraiment le nouveau consentement.',
    excerpt:
      'Les réseaux sociaux ont mis à jour leurs conditions. Entre opt-out caché et droit d’opposition, ce que vous pouvez réellement refuser, et comment.',
    category: 'societe',
    publishedAt: '2026-08-09',
    readingMinutes: 2,
    image: { alt: 'Personne photographiant une rue avec son téléphone' },
    body: [
      {
        type: 'paragraph',
        text: 'Les principales plateformes ont actualisé leurs conditions d’utilisation pour couvrir explicitement l’entraînement de modèles sur les contenus publiés. La base juridique invoquée est l’intérêt légitime, ce qui ouvre un droit d’opposition sans exiger de consentement préalable.',
      },
      { type: 'heading', text: 'Ce que vous pouvez refuser, et ce qui vous échappe' },
      {
        type: 'paragraph',
        text: 'Le droit d’opposition existe et fonctionne, mais il n’est pas rétroactif : les contenus déjà intégrés à un corpus d’entraînement y restent. Il ne couvre pas non plus les contenus publiés par d’autres où vous apparaissez, ni les copies présentes sur des sites tiers.',
      },
      {
        type: 'paragraph',
        text: 'Le formulaire d’opposition est en général accessible, mais rarement mis en avant. Il se trouve dans les paramètres de confidentialité, sous une rubrique distincte de celle qui gère la publicité.',
      },
      {
        type: 'list',
        items: [
          'L’opposition vaut pour l’avenir, jamais pour les corpus déjà constitués.',
          'Les photos publiées par des tiers échappent à votre opposition.',
          'Le formulaire existe mais n’est pas présenté au moment de l’acceptation.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Les autorités de protection des données examinent si l’intérêt légitime constitue une base valable pour ce traitement. Une décision négative obligerait les plateformes à recueillir un consentement explicite, ce qui changerait complètement l’équilibre actuel.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'L’opposition est possible mais ne concerne que les usages futurs.',
          'Les contenus publiés par d’autres restent hors de votre contrôle.',
          'La validité de l’intérêt légitime est en cours d’examen par les autorités.',
        ],
      },
    ],
  },
  {
    slug: 'assistants-vocaux-a-l-ecole-primaire-l-experimentation-qui-divise',
    title: 'Assistants vocaux à l’école primaire : l’expérimentation qui divise.',
    excerpt:
      'Cinquante classes équipées à la rentrée. Les premiers retours des enseignants, les inquiétudes des parents et ce que dit la recherche sur l’apprentissage assisté.',
    category: 'societe',
    publishedAt: '2026-08-05',
    readingMinutes: 2,
    image: { alt: 'Salle de classe avec des élèves et une enseignante' },
    body: [
      {
        type: 'paragraph',
        text: 'Cinquante classes de cycle 3 sont équipées cette rentrée d’assistants vocaux destinés à l’entraînement à la lecture. L’élève lit à voix haute, le système repère les hésitations et propose des exercices adaptés.',
      },
      { type: 'heading', text: 'Ce que dit la recherche, et ce qu’elle ne dit pas' },
      {
        type: 'paragraph',
        text: 'Les travaux disponibles convergent sur un point : la répétition guidée améliore la fluence de lecture, quel que soit le support. Ce que la recherche ne dit pas, faute de recul, c’est l’effet à long terme d’un retour immédiat et systématique sur la tolérance à l’erreur et sur la motivation.',
      },
      {
        type: 'paragraph',
        text: 'Les enseignants relèvent un bénéfice concret : les élèves les plus en difficulté lisent davantage à voix haute, parce que la machine ne juge pas devant la classe. C’est un effet social, pas pédagogique, et il n’est pas anodin.',
      },
      {
        type: 'quote',
        text: 'Des élèves qui refusaient de lire devant les autres lisent vingt minutes avec le casque. Je ne l’attendais pas.',
        author: 'Un professeur des écoles participant à l’expérimentation',
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Les inquiétudes des parents portent moins sur la pédagogie que sur les enregistrements de voix d’enfants. Le cadre annoncé prévoit un traitement local et une suppression sous sept jours ; sa vérification indépendante conditionnera l’acceptation du dispositif.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le bénéfice observé tient surtout à la levée du jugement social.',
          'Les effets à long terme sur la motivation restent inconnus.',
          'Le traitement des enregistrements de voix décidera de l’acceptabilité.',
        ],
      },
    ],
  },
  {
    slug: 'le-teletravail-augmente-par-l-ia-change-les-horaires',
    title: 'Le télétravail augmenté par l’IA change les horaires plus que les métiers.',
    excerpt:
      'Réunions résumées, mails rédigés, tâches déléguées à des agents : le temps gagné ne réduit pas la charge, il la déplace. Enquête auprès de 1 200 salariés.',
    category: 'societe',
    publishedAt: '2026-08-02',
    readingMinutes: 2,
    image: { alt: 'Bureau à domicile avec un ordinateur portable' },
    body: [
      {
        type: 'paragraph',
        text: 'Une enquête menée auprès de 1 200 salariés en télétravail montre un gain de temps mesurable, entre quarante minutes et une heure par jour, sur la rédaction, les comptes rendus et la recherche d’information. Ce temps n’est presque jamais rendu.',
      },
      { type: 'heading', text: 'Le temps gagné est réinvesti, pas restitué' },
      {
        type: 'paragraph',
        text: 'Deux tiers des répondants déclarent utiliser ce temps pour traiter davantage de dossiers. Un tiers observe une journée qui s’étale plutôt qu’elle ne raccourcit, avec des tâches reprises le soir parce qu’elles sont devenues rapides à exécuter.',
      },
      {
        type: 'paragraph',
        text: 'Le contenu du travail change peu ; c’est son rythme qui se modifie. Les moments de latence, autrefois consacrés à la rédaction ou à la relecture, disparaissent au profit d’un enchaînement continu de décisions.',
      },
      {
        type: 'list',
        items: [
          'Le gain se concentre sur la rédaction et la synthèse, pas sur la décision.',
          'Le temps libéré est absorbé par un volume de dossiers plus élevé.',
          'Les pauses implicites du travail intellectuel se raréfient.',
        ],
      },
      { type: 'heading', text: 'Ce qu’il faut surveiller' },
      {
        type: 'paragraph',
        text: 'Les accords d’entreprise commencent à aborder le sujet, non pas sous l’angle des outils mais sous celui de la charge. La question posée aux directions est simple : le gain de productivité finance-t-il davantage de production, ou du temps rendu aux salariés ? Aucune réponse ne s’impose aujourd’hui.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le gain de temps est réel mais rarement restitué aux salariés.',
          'C’est le rythme du travail qui change, pas son contenu.',
          'La négociation porte désormais sur la charge, pas sur les outils.',
        ],
      },
    ],
  },
];
