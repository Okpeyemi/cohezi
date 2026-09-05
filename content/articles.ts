import type { Article } from './types';

/**
 * Contenu fictif au ton Cohezi : chaque titre dit ce qui s’est passé et pourquoi c’est important,
 * chaque extrait apporte le contexte ou l’impact. À remplacer par de vrais articles avant publication.
 */
export const articles: Article[] = [
  // Actualité
  {
    slug: 'openai-lance-gpt-6-ce-que-ca-change-pour-les-entreprises',
    title: 'OpenAI lance GPT-6. Voilà pourquoi les entreprises vont devoir revoir leurs plans.',
    excerpt:
      'Fenêtre de contexte illimitée, agents natifs et prix divisé par trois : la nouvelle génération ne change pas seulement les benchmarks, elle bouscule les contrats signés l’an dernier.',
    category: 'actualite',
    publishedAt: '2026-09-02',
    readingMinutes: 6,
    image: { alt: 'Salle de conférence lors de l’annonce de GPT-6' },
    featured: true,
  },
  {
    slug: 'ai-act-entre-en-application-ce-qui-devient-obligatoire',
    title: 'L’AI Act entre en application : ce qui devient obligatoire dès ce mois-ci.',
    excerpt:
      'Transparence des modèles, registre des systèmes à haut risque, sanctions jusqu’à 7 % du chiffre d’affaires. Le calendrier, les obligations réelles et les zones grises qui restent.',
    category: 'actualite',
    publishedAt: '2026-09-01',
    readingMinutes: 5,
    image: { alt: 'Façade du Parlement européen à Bruxelles' },
  },
  {
    slug: 'apple-assistant-ia-hors-ligne-ios-27',
    title: 'Apple intègre un assistant IA hors ligne dans iOS 27. La fin du cloud obligatoire ?',
    excerpt:
      'Le modèle tourne entièrement sur la puce du téléphone. Ce que cela change pour la vie privée, l’autonomie et les développeurs qui vendaient de l’IA par abonnement.',
    category: 'actualite',
    publishedAt: '2026-08-28',
    readingMinutes: 4,
    image: { alt: 'Main tenant un iPhone affichant un assistant vocal' },
  },
  {
    slug: 'google-fusionne-search-et-gemini',
    title: 'Google fusionne Search et Gemini. Ce que ça change pour ceux qui vivent du web.',
    excerpt:
      'Les réponses générées remplacent les dix liens bleus par défaut. Médias, e-commerçants et créateurs découvrent un trafic qui ne revient plus : les premiers chiffres et les parades.',
    category: 'actualite',
    publishedAt: '2026-08-26',
    readingMinutes: 6,
    image: { alt: 'Écran d’ordinateur affichant une page de résultats de recherche' },
  },
  {
    slug: 'nvidia-devoile-ses-puces-rubin',
    title: 'Nvidia dévoile ses puces Rubin. Pourquoi la course au calcul repart de plus belle.',
    excerpt:
      'Quatre fois plus de mémoire, une consommation en hausse et des livraisons déjà réservées jusqu’en 2028. Derrière l’annonce, une question : qui pourra encore se payer l’entraînement des modèles ?',
    category: 'actualite',
    publishedAt: '2026-08-22',
    readingMinutes: 5,
    image: { alt: 'Gros plan sur une carte accélératrice dans un centre de données' },
  },

  // Analyses
  {
    slug: 'open-source-contre-modeles-fermes-la-vraie-ligne-de-fracture',
    title: 'Open source contre modèles fermés : la vraie ligne de fracture n’est pas celle qu’on croit.',
    excerpt:
      'Le débat oppose des licences. Il devrait opposer des dépendances : qui contrôle les données, les puces et la distribution. Une grille de lecture pour ne plus confondre ouverture et indépendance.',
    category: 'analyse',
    publishedAt: '2026-08-31',
    readingMinutes: 9,
    image: { alt: 'Deux serveurs face à face dans une salle blanche' },
  },
  {
    slug: 'les-agents-ia-vont-ils-faire-disparaitre-les-applications',
    title: 'Les agents IA vont-ils faire disparaître les applications ?',
    excerpt: 'Comprendre le changement qui pourrait redéfinir notre manière d’utiliser Internet.',
    category: 'analyse',
    publishedAt: '2026-08-23',
    readingMinutes: 8,
    image: { alt: 'Écran de smartphone dont les icônes d’applications s’effacent' },
    deepDive: true,
  },
  {
    slug: 'ce-que-l-histoire-du-cloud-nous-apprend-sur-l-economie-de-l-ia',
    title: 'Ce que l’histoire du cloud nous apprend sur l’économie de l’IA.',
    excerpt:
      'En 2010, tout le monde prédisait la commoditisation du cloud. Trois acteurs ont capté le marché. Les mêmes mécanismes de capital, d’échelle et de verrouillage sont à l’œuvre aujourd’hui.',
    category: 'analyse',
    publishedAt: '2026-08-10',
    readingMinutes: 8,
    image: { alt: 'Rangées de serveurs dans un centre de données' },
  },

  // Business
  {
    slug: 'mistral-leve-3-milliards-d-euros',
    title: 'Mistral lève 3 milliards d’euros. Ce que ce tour de table dit de l’ambition européenne.',
    excerpt:
      'Valorisation multipliée par quatre en dix-huit mois, entrée d’investisseurs souverains et pari sur les modèles spécialisés : la startup française devient l’alternative que Bruxelles attendait.',
    category: 'business',
    publishedAt: '2026-08-30',
    readingMinutes: 6,
    image: { alt: 'Bureaux vitrés d’une startup à Paris' },
  },
  {
    slug: 'microsoft-facture-les-agents-a-la-tache',
    title: 'Microsoft facture désormais les agents à la tâche. Le modèle économique de l’IA bascule.',
    excerpt:
      'Fini l’abonnement par utilisateur : on paie un résultat. Pourquoi ce changement inquiète les DSI, ravit les directions financières et redéfinit ce qu’est un logiciel.',
    category: 'business',
    publishedAt: '2026-08-27',
    readingMinutes: 5,
    image: { alt: 'Tableau de bord de facturation sur un écran de portable' },
  },
  {
    slug: 'salesforce-rachete-une-startup-d-agents-pour-4-milliards',
    title: 'Salesforce rachète une startup d’agents pour 4 milliards. La consolidation commence.',
    excerpt:
      'Troisième acquisition du secteur en un trimestre. Les grands éditeurs préfèrent acheter que construire, et les startups indépendantes ont de moins en moins de temps pour prouver leur valeur.',
    category: 'business',
    publishedAt: '2026-08-25',
    readingMinutes: 4,
    image: { alt: 'Poignée de main devant un logo d’entreprise' },
  },
  {
    slug: 'le-cout-de-l-inference-a-chute-de-80-pour-cent-en-un-an',
    title: 'Le coût de l’inférence a chuté de 80 % en un an. Qui en profite vraiment ?',
    excerpt:
      'Les fournisseurs de modèles se livrent une guerre des prix que leurs clients ne voient pas toujours. Où va la marge, et pourquoi les applications restent chères.',
    category: 'business',
    publishedAt: '2026-08-21',
    readingMinutes: 7,
    image: { alt: 'Courbe de prix en baisse sur un écran' },
  },
  {
    slug: 'tsmc-samsung-intel-la-guerre-des-fonderies',
    title: 'TSMC, Samsung, Intel : la guerre des fonderies décide de qui aura de l’IA en 2027.',
    excerpt:
      'Les capacités de gravure avancée sont réservées deux ans à l’avance. Comprendre pourquoi une usine à Taïwan pèse plus que n’importe quel modèle sur la disponibilité de l’IA.',
    category: 'business',
    publishedAt: '2026-08-18',
    readingMinutes: 8,
    image: { alt: 'Salle blanche d’une usine de semi-conducteurs' },
  },
  {
    slug: 'les-data-centers-manquent-d-electricite',
    title: 'Les data centers manquent d’électricité. L’IA se heurte à un mur physique.',
    excerpt:
      'Files d’attente de raccordement, réacteurs nucléaires relancés, contrats d’énergie à vingt ans : la contrainte n’est plus logicielle. Cartographie des goulets d’étranglement.',
    category: 'business',
    publishedAt: '2026-08-14',
    readingMinutes: 6,
    image: { alt: 'Lignes à haute tension au-dessus d’un centre de données' },
  },
  {
    slug: 'pourquoi-les-banques-adoptent-l-ia-plus-vite-que-les-hopitaux',
    title: 'Pourquoi les banques adoptent l’IA plus vite que les hôpitaux.',
    excerpt:
      'Mêmes outils, résultats opposés. Données structurées, responsabilité juridique et culture du risque expliquent l’écart, et ce qu’il faudrait pour le combler.',
    category: 'business',
    publishedAt: '2026-08-11',
    readingMinutes: 5,
    image: { alt: 'Hall d’une banque avec des écrans d’information' },
  },
  {
    slug: 'startups-ia-le-retour-des-valorisations-raisonnables',
    title: 'Startups IA : le retour des valorisations raisonnables.',
    excerpt:
      'Après deux ans d’euphorie, les investisseurs exigent des revenus. Ce que révèlent les derniers tours de table sur les modèles qui tiennent vraiment.',
    category: 'business',
    publishedAt: '2026-08-07',
    readingMinutes: 4,
    image: { alt: 'Fondateurs en réunion autour d’une table' },
  },

  // Société
  {
    slug: 'le-bac-2026-corrige-par-des-ia',
    title: 'Le bac 2026 corrigé par des IA : ce que les enseignants en disent vraiment.',
    excerpt:
      'Trois académies ont testé la pré-correction automatique. Gain de temps réel, désaccords sur les copies limites et une question qui dépasse l’examen : qui juge ?',
    category: 'societe',
    publishedAt: '2026-08-29',
    readingMinutes: 6,
    image: { alt: 'Copies d’examen empilées sur un bureau' },
  },
  {
    slug: 'radiologie-l-ia-detecte-mieux-mais-qui-est-responsable',
    title: 'Radiologie : l’IA détecte mieux, mais qui est responsable en cas d’erreur ?',
    excerpt:
      'Les algorithmes dépassent les praticiens sur certains cancers. Les assureurs, les hôpitaux et les patients ne sont pas d’accord sur la suite. État des lieux du droit et des pratiques.',
    category: 'societe',
    publishedAt: '2026-08-24',
    readingMinutes: 7,
    image: { alt: 'Radiologue examinant une image médicale sur écran' },
  },
  {
    slug: 'recruteurs-et-candidats-utilisent-des-ia-qui-gagne',
    title: 'Les recruteurs trient avec des IA, les candidats postulent avec des IA. Qui gagne ?',
    excerpt:
      'CV optimisés contre filtres automatisés : l’embauche devient une conversation entre machines. Ce que les entreprises changent pour retrouver le contact humain.',
    category: 'societe',
    publishedAt: '2026-08-20',
    readingMinutes: 5,
    image: { alt: 'Entretien d’embauche dans un bureau lumineux' },
  },
  {
    slug: 'deepfakes-en-campagne-comment-la-france-prepare-les-municipales',
    title: 'Deepfakes en campagne : comment la France prépare les municipales.',
    excerpt:
      'Cellule de veille, étiquetage obligatoire et délais de retrait raccourcis. Les mesures existent, leur application reste incertaine : retour sur les premiers cas.',
    category: 'societe',
    publishedAt: '2026-08-16',
    readingMinutes: 6,
    image: { alt: 'Panneaux d’affichage électoral dans une rue' },
  },
  {
    slug: 'musique-generee-les-plateformes-commencent-a-l-etiqueter',
    title: 'Musique générée : les plateformes commencent à l’étiqueter. Trop tard ?',
    excerpt:
      'Un titre sur cinq ajouté chaque jour est produit par une IA. Comment l’étiquetage fonctionne, ce qu’il change pour les artistes et pourquoi les redevances restent le vrai sujet.',
    category: 'societe',
    publishedAt: '2026-08-13',
    readingMinutes: 4,
    image: { alt: 'Casque audio posé sur une table de mixage' },
  },
  {
    slug: 'vos-photos-entrainent-des-modeles-le-nouveau-consentement',
    title: 'Vos photos entraînent des modèles. Ce que permet vraiment le nouveau consentement.',
    excerpt:
      'Les réseaux sociaux ont mis à jour leurs conditions. Entre opt-out caché et droit d’opposition, ce que vous pouvez réellement refuser, et comment.',
    category: 'societe',
    publishedAt: '2026-08-09',
    readingMinutes: 5,
    image: { alt: 'Personne photographiant une rue avec son téléphone' },
  },
  {
    slug: 'assistants-vocaux-a-l-ecole-primaire-l-experimentation-qui-divise',
    title: 'Assistants vocaux à l’école primaire : l’expérimentation qui divise.',
    excerpt:
      'Cinquante classes équipées à la rentrée. Les premiers retours des enseignants, les inquiétudes des parents et ce que dit la recherche sur l’apprentissage assisté.',
    category: 'societe',
    publishedAt: '2026-08-05',
    readingMinutes: 5,
    image: { alt: 'Salle de classe avec des élèves et une enseignante' },
  },
  {
    slug: 'le-teletravail-augmente-par-l-ia-change-les-horaires',
    title: 'Le télétravail augmenté par l’IA change les horaires plus que les métiers.',
    excerpt:
      'Réunions résumées, mails rédigés, tâches déléguées à des agents : le temps gagné ne réduit pas la charge, il la déplace. Enquête auprès de 1 200 salariés.',
    category: 'societe',
    publishedAt: '2026-08-02',
    readingMinutes: 4,
    image: { alt: 'Bureau à domicile avec un ordinateur portable' },
  },
];
