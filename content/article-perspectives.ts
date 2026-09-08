import type { ArticlePerspective } from './types';

/**
 * La perspective est séparée du récit factuel pour rester facile à actualiser.
 * Toute nouvelle publication doit avoir une entrée ici avant de compiler.
 */
export const articlePerspectives: Record<string, ArticlePerspective> = {
  'openai-firmus-malaisie-capacite-calcul': {
    format: 'contexte',
    whyItMatters: [
      'L’accord montre que l’avantage compétitif d’un laboratoire dépend autant de sa capacité à réserver de l’électricité, des bâtiments et des accélérateurs que de la qualité de ses modèles. Une annonce de capacité doit cependant être lue avec précision : les 900 MW cités par Firmus couvrent l’ensemble de ses contrats, tandis que la part d’OpenAI reste inconnue.',
      'Le choix de la Malaisie confirme aussi le déplacement d’une partie de l’infrastructure IA vers l’Asie du Sud-Est. Cette géographie rapproche le calcul de nouveaux marchés, mais déplace également les contraintes énergétiques et hydriques vers les territoires qui accueillent les installations.',
    ],
    whatChanges: [
      'Pour OpenAI, le contrat ajoute une source potentielle de calcul dans la région. Pour Firmus, le statut de client d’ancrage peut faciliter le financement et la construction. À court terme, rien ne change encore pour les utilisateurs : aucune date d’ouverture, puissance livrée ou nouvelle offre locale n’a été annoncée.',
    ],
    watch: [
      'Il faudra connaître la puissance réellement réservée par OpenAI, les sites choisis, le calendrier de raccordement et les conditions financières. Les engagements sur l’approvisionnement électrique, l’eau, le refroidissement et les autorisations locales permettront ensuite de distinguer une réservation commerciale d’une capacité effectivement disponible.',
    ],
  },
  'anthropic-lance-claude-fable-5-1-et-mythos-5-1': {
    format: 'contexte',
    whyItMatters: [
      'La séparation entre Fable et Mythos montre que les laboratoires ne vendent plus seulement une capacité technique. Ils vendent aussi un régime de confiance : identité du client, finalité déclarée, niveau de surveillance et environnement d’hébergement. Deux organisations peuvent donc utiliser le même moteur sans disposer du même produit ni des mêmes libertés.',
      'La baisse du prix du cache mérite également d’être isolée du prix catalogue. Pour les agents qui relisent souvent les mêmes instructions ou documents, le cache peut peser lourd dans la facture. Pour une requête ponctuelle, son effet est beaucoup plus faible. Comparer seulement le tarif par million de tokens masque cette différence d’usage.',
    ],
    whatChanges: [
      'Les acheteurs devront évaluer un modèle sur le coût d’une tâche complète, pas uniquement sur son tarif d’entrée et de sortie. Ils devront aussi vérifier quelles fonctions dépendent d’un programme d’accès, d’un cloud précis ou d’un stockage contrôlé par le client. La performance brute devient une variable parmi la conformité, la disponibilité et le coût réel.',
    ],
    watch: [
      'Il faudra observer l’écart de performance entre Fable et Mythos dans des évaluations indépendantes, les critères d’admission au programme de confiance et le calendrier réel des Enterprise Frontier Safeguards. Le point décisif sera de savoir si ces garde-fous réduisent les risques sans créer un marché à deux vitesses réservé aux organisations les mieux accréditées.',
    ],
  },
  'gpt-6-astra-openai-agi-et-benchmarks-contestes': {
    format: 'contexte',
    whyItMatters: [
      'Le débat ne porte pas seulement sur un score. Il porte sur le pouvoir de définir la réussite. Lorsqu’un fournisseur adapte le cadre d’évaluation à son propre modèle, il peut mesurer une utilisation optimisée ; lorsqu’une fondation impose le même cadre à tous, elle mesure davantage la comparabilité. Les deux résultats répondent à des questions différentes, mais une communication qui les mélange fabrique une certitude artificielle.',
      'Le mot AGI ajoute une seconde confusion. Il ne correspond pas à un seuil universellement accepté, ni à une certification indépendante. Utilisé pendant un lancement, il fonctionne autant comme positionnement stratégique que comme description scientifique. Le résultat d’un benchmark, même spectaculaire, ne suffit pas à établir qu’un système généralise dans le monde réel.',
    ],
    whatChanges: [
      'Pour les entreprises, Astra peut représenter un saut de capacité sans être automatiquement le meilleur choix économique. Le coût d’inférence, le temps d’exécution, la reproductibilité et la performance sur les tâches internes doivent être testés ensemble. Pour le public, la bonne question n’est pas “l’AGI est-elle arrivée ?”, mais “quelles tâches deviennent réellement possibles, à quel coût et avec quel taux d’erreur ?”.',
    ],
    watch: [
      'Les prochaines évaluations indépendantes devront préciser le harnais, le budget de calcul et le nombre d’essais. Il faudra également suivre le déploiement promis hors du programme Daybreak et les résultats obtenus par des utilisateurs sans optimisation fournie par OpenAI. Une baisse du coût par tâche compterait davantage qu’un nouveau record isolé.',
    ],
  },
  'google-lance-gemini-3-8-flash-et-sa-variante-cyber': {
    format: 'essentiel',
    whyItMatters: [
      'Google réduit l’écart entre modèle rapide et modèle frontière, mais reconnaît que cette progression vient en partie d’un raisonnement plus long. La vitesse affichée par une gamme ne dit donc plus, à elle seule, combien de calcul ni combien de tokens une tâche consommera.',
    ],
    whatChanges: [
      'Les développeurs devront mesurer le coût d’une mission terminée, y compris les appels d’outils et les tentatives supplémentaires. Le tarif promotionnel de lancement ne doit pas servir de base unique à un budget annuel puisque le prix annoncé doit doubler au 1er janvier.',
    ],
    watch: [
      'Il faudra comparer latence, consommation de tokens et taux de réussite sur des tâches identiques après la hausse tarifaire. Pour la variante Cyber, l’accès restreint et les conditions du programme Fairwind seront aussi importants que les résultats techniques annoncés.',
    ],
  },
  'panne-simultanee-claude-chatgpt-gemini-grok': {
    format: 'essentiel',
    whyItMatters: [
      'La coïncidence rappelle qu’un assistant d’IA est aussi un service cloud. Même sans cause commune, plusieurs interruptions le même jour révèlent la dépendance croissante des équipes à des plateformes qu’elles ne contrôlent pas et dont les rapports d’incident restent souvent partiels.',
    ],
    whatChanges: [
      'Une organisation qui place un modèle dans un processus critique doit prévoir un mode dégradé : fournisseur secondaire, file d’attente, reprise manuelle ou fonctionnalité temporairement désactivée. Multiplier les noms de modèles ne crée pas de résilience si tous dépendent de la même région, du même intermédiaire ou du même flux de données.',
    ],
    watch: [
      'Les rapports d’incident détaillés permettront de distinguer une simple simultanéité d’une dépendance partagée. Les informations utiles seront la région touchée, la durée réelle, les services intermédiaires concernés et les mesures prises pour éviter une répétition.',
    ],
  },
  'le-model-hardware-standard-des-agents-aux-commandes-des-instruments': {
    format: 'contexte',
    whyItMatters: [
      'Brancher un agent sur un instrument physique change la nature du risque. Une mauvaise réponse dans une fenêtre de dialogue peut être corrigée ; une mauvaise commande envoyée à un bras robotisé, à un microscope ou à un dispositif de laboratoire peut interrompre une expérience, dégrader du matériel ou contaminer des résultats. La qualité de la couche de contrôle devient donc aussi importante que celle du modèle.',
      'Une norme commune peut toutefois débloquer un marché fragmenté. Si chaque instrument expose ses capacités de manière comparable, les laboratoires peuvent remplacer un modèle ou un fournisseur sans reconstruire toute leur intégration. Cette portabilité est la promesse la plus structurante du projet, davantage que les démonstrations d’autonomie.',
    ],
    whatChanges: [
      'Les responsables de laboratoire devront séparer les commandes autorisées, celles qui exigent une validation humaine et celles qui restent interdites. Journalisation, simulation préalable, limites physiques et arrêt d’urgence devront être pensés dans le protocole, pas ajoutés après le déploiement.',
    ],
    watch: [
      'La publication de la spécification, sa licence et l’arrivée d’implémentations indépendantes diront s’il s’agit réellement d’un standard ouvert. Il faudra aussi chercher des évaluations menées hors du cercle de partenaires d’Anthropic, notamment sur la récupération après erreur et le respect des limites de sécurité.',
    ],
    africaAndFrancophonie: [
      'Pour des laboratoires disposant de moins d’ingénieurs d’intégration, une norme ouverte pourrait réduire le coût d’automatisation. Cet avantage dépendra cependant de la compatibilité avec du matériel plus ancien, de la disponibilité locale du support et de la possibilité de fonctionner sans infrastructure cloud permanente.',
    ],
  },
  'filigrane-obligatoire-comment-fonctionne-le-tatouage-de-claude': {
    format: 'contexte',
    whyItMatters: [
      'Le filigrane tente de résoudre un problème d’origine : reconnaître un texte généré sans stocker l’identité de son auteur. Mais son efficacité dépend du type de texte et de sa conservation. Une réécriture importante, une traduction ou un passage très court peut affaiblir le signal statistique sans qu’aucun caractère visible ait été supprimé.',
      'Il faut aussi distinguer marquage et preuve. Détecter une signature augmente ou réduit une probabilité ; cela ne démontre pas automatiquement qui a produit le contenu, dans quel contexte ni avec quelle intention. Utilisé seul dans l’éducation, le recrutement ou la modération, un tel indicateur pourrait produire de nouvelles erreurs.',
    ],
    whatChanges: [
      'Les plateformes devront conserver plusieurs mécanismes complémentaires : métadonnées lorsque le format le permet, provenance cryptographique pour certains médias et information visible de l’utilisateur. Pour les éditeurs, le filigrane ne remplace ni la vérification des faits ni la transparence sur le processus de rédaction.',
    ],
    watch: [
      'Les taux de détection après paraphrase, traduction et édition humaine seront déterminants. Il faudra également savoir qui détiendra les clés de vérification, selon quelles règles elles seront partagées et comment une personne pourra contester un résultat erroné.',
    ],
  },

  'hypervault-campus-ia-hyderabad-un-gigawatt': {
    format: 'contexte',
    whyItMatters: [
      'Un campus d’un gigawatt n’est pas seulement un projet immobilier. Il suppose de sécuriser simultanément électricité, raccordement au réseau, eau ou solutions de refroidissement, équipements importés et clients capables de signer des contrats de long terme. Le chiffre annoncé mesure donc une ambition industrielle, pas une capacité immédiatement disponible.',
      'L’annonce montre aussi que la géographie de l’IA se déplace. Les pays ne cherchent plus seulement à former des ingénieurs ou à attirer des services numériques ; ils veulent héberger le calcul lui-même. Cette localisation influence les emplois, la fiscalité, la souveraineté des données et la capacité des entreprises locales à accéder à des ressources de calcul.',
    ],
    whatChanges: [
      'Pour TCS, HyperVault crée un passage du conseil informatique vers la possession d’actifs lourds et énergivores. Pour l’Inde, le projet peut réduire la distance entre ses entreprises et les infrastructures d’entraînement ou d’inférence. Mais son effet dépendra du prix de l’accès, des clients prioritaires et de la part réellement réservée à l’écosystème local.',
    ],
    watch: [
      'Les indicateurs utiles seront les premières tranches financées, les mégawatts effectivement raccordés, les contrats clients et l’origine de l’électricité. Les promesses de neutralité hydrique devront être confrontées aux méthodes de refroidissement, aux conditions climatiques et à des données publiées après la mise en service.',
    ],
    africaAndFrancophonie: [
      'Le projet indien offre un point de comparaison aux stratégies africaines de centres de données. La leçon n’est pas de reproduire un gigawatt partout, mais de relier toute ambition de souveraineté à quatre réalités : énergie fiable, fibre, financement de long terme et demande locale solvable.',
    ],
  },
  'foxconn-record-aout-serveurs-ia': {
    format: 'essentiel',
    whyItMatters: [
      'Les résultats d’un assembleur donnent un signal plus concret que les prévisions de laboratoires : ils reflètent des commandes, des composants et des capacités de production. Ils arrivent toutefois avec un défaut majeur, puisque le chiffre mensuel mélange les serveurs IA aux autres activités de Foxconn.',
    ],
    whatChanges: [
      'Le boom de l’IA profite désormais à toute une chaîne industrielle — mémoire, réseau, refroidissement, assemblage et logistique — et pas seulement aux concepteurs de modèles. Les investisseurs et acheteurs doivent donc suivre les goulets d’étranglement physiques autant que les annonces logicielles.',
    ],
    watch: [
      'La part exacte des activités cloud et réseau, les marges associées et la capacité à livrer les nouvelles générations de serveurs permettront de juger la solidité de la tendance. Un record de revenu ne garantit pas, à lui seul, une amélioration équivalente du bénéfice. Les prochains résultats devront aussi distinguer la croissance par volume de celle produite par des équipements plus chers.',
    ],
  },
  'nvidia-rachete-hugging-face-pour-12-9-milliards': {
    format: 'contexte',
    whyItMatters: [
      'Hugging Face n’est pas seulement une entreprise de logiciels. La plateforme occupe une place centrale dans la découverte, le téléchargement et le déploiement des modèles ouverts. Son acquisition par le principal fournisseur de GPU placerait une partie importante de l’écosystème entre les mains d’un acteur qui vend déjà le calcul utilisé pour faire fonctionner ces modèles.',
      'Le prix doit être lu comme celui d’un réseau plus que celui d’un revenu actuel. NVIDIA achèterait une communauté, des standards de fait, des données d’usage et un point de passage vers des centaines de milliers d’organisations. Le multiple élevé signale que cette distribution stratégique compte davantage que les ventes présentes.',
    ],
    whatChanges: [
      'Pour les développeurs, la question centrale devient la neutralité : visibilité comparable des modèles concurrents, compatibilité avec d’autres puces et clouds, politique d’accès aux données et maintien des bibliothèques ouvertes. Une plateforme peut conserver son code ouvert tout en orientant progressivement ses intégrations vers les intérêts de son propriétaire.',
    ],
    watch: [
      'Les autorités de concurrence examineront probablement le contrôle d’un canal de distribution par un fournisseur dominant de matériel. Il faudra suivre les engagements proposés, la gouvernance des projets ouverts, les départs éventuels dans l’équipe et l’évolution des partenariats avec AMD, Google, AWS ou d’autres concurrents de NVIDIA.',
    ],
    africaAndFrancophonie: [
      'Pour les équipes africaines et francophones qui s’appuient sur des modèles ouverts faute d’accès économique aux plus grands services propriétaires, la neutralité de Hugging Face est concrète. Toute modification des coûts, de l’hébergement ou de la visibilité des modèles multilingues peut affecter leur capacité à construire localement.',
    ],
  },
  'nscale-cherche-3-5-milliards-avant-son-introduction-en-bourse': {
    format: 'contexte',
    whyItMatters: [
      'Nscale illustre la financiarisation rapide de l’infrastructure IA. L’entreprise lève, emprunte, achète des équipements et signe des engagements sur plusieurs années avant que toutes les capacités soient construites. Dans ce modèle, la croissance dépend autant de l’accès au capital que de la technologie.',
      'Le chiffre de 103 milliards montre pourquoi les catégories comptables comptent. La valeur cumulée de baux signés n’est ni du revenu encaissé ni une garantie de marge. Elle suppose que les centres soient livrés, que les clients consomment la capacité et que chaque partie reste solvable pendant toute la durée des contrats.',
    ],
    whatChanges: [
      'Une introduction en Bourse transférerait une partie de ce risque vers les investisseurs publics et imposerait davantage de transparence financière. Les liens avec NVIDIA créent aussi une dépendance circulaire : le même acteur peut fournir les puces, financer leur achat et bénéficier de la croissance qu’il contribue à rendre possible.',
    ],
    watch: [
      'Il faudra distinguer carnet de commandes, revenu reconnu, dépenses de construction et dette. Le calendrier des sites, les clauses des contrats clients et le coût du financement diront si la croissance promise produit une activité rentable ou seulement une accumulation d’engagements.',
    ],
  },
  'la-publicite-devient-un-pilier-du-modele-d-openai': {
    format: 'contexte',
    whyItMatters: [
      'La publicité modifie l’incitation fondamentale d’un assistant. Un abonnement est payé par l’utilisateur ; un produit publicitaire gagne davantage lorsque l’utilisateur revient, reste longtemps et déclenche une intention commerciale. La qualité de la réponse peut alors entrer en tension avec l’engagement et la monétisation.',
      'Un assistant conversationnel possède un contexte plus riche qu’un moteur de recherche classique : demandes successives, préférences exprimées et étapes d’une décision. Même si l’entreprise promet des séparations, la valeur économique du système vient précisément de sa capacité à comprendre ce contexte. La gouvernance de ces données devient donc centrale.',
    ],
    whatChanges: [
      'Les utilisateurs devront pouvoir distinguer clairement recommandation éditoriale, résultat organique et placement payé. Pour OpenAI, la publicité peut financer l’usage gratuit et diversifier les revenus, mais elle augmente le risque de défiance si les réponses semblent orientées par un annonceur.',
    ],
    watch: [
      'Les formats choisis, les critères de ciblage, l’utilisation ou non des conversations et les mécanismes de désactivation seront plus importants que le montant initial du revenu. Il faudra également comparer les réponses données aux abonnés payants et aux utilisateurs financés par la publicité, dans la durée.',
    ],
  },
  'le-prix-du-token-s-effondre-9-a-900-fois-par-an': {
    format: 'contexte',
    whyItMatters: [
      'La baisse du prix unitaire rend possibles des produits qui auraient été trop coûteux quelques mois plus tôt. Mais un token moins cher ne garantit pas une tâche moins chère : les modèles peuvent raisonner plus longtemps, appeler davantage d’outils ou traiter des contextes plus grands. Le volume consommé peut compenser une partie de la baisse tarifaire.',
      'Les moyennes du marché cachent aussi des trajectoires différentes. Un modèle compact optimisé pour l’extraction de données ne suit pas la même courbe qu’un modèle frontière destiné au raisonnement. Parler d’un prix unique de “l’IA” revient à comparer le coût d’un vélo et celui d’un avion au kilomètre.',
    ],
    whatChanges: [
      'Les équipes peuvent désormais tester davantage de fournisseurs et réserver les modèles coûteux aux étapes où ils apportent un gain mesurable. L’architecture économique devient un routage : petit modèle pour le tri, modèle spécialisé pour l’analyse, humain pour la décision sensible.',
    ],
    watch: [
      'Le bon indicateur sera le coût par résultat accepté, incluant les échecs, la latence, les appels d’outils et la relecture humaine. Il faudra également surveiller les remises temporaires, les limites de débit et les changements de modèle qui rendent les comparaisons historiques trompeuses.',
    ],
    africaAndFrancophonie: [
      'La baisse ouvre l’accès à des usages locaux jusque-là difficiles à rentabiliser, notamment dans des marchés de petite taille. Elle ne supprime toutefois ni le coût de la connectivité, ni celui des paiements internationaux, ni le besoin de modèles réellement performants dans les langues concernées.',
    ],
  },
  'l-electricite-que-consomme-l-ia-415-terawattheures-mesures': {
    format: 'decryptage',
    whyItMatters: [
      'Le débat public mélange souvent trois grandeurs : la consommation actuelle de tous les centres de données, la part attribuable à l’IA et les projections de futurs campus. Les 415 térawattheures constituent une estimation observée pour un ensemble large ; ils ne peuvent pas être présentés comme la consommation mesurée de l’IA seule.',
      'Cette distinction change la décision politique. Construire un réseau électrique, signer un contrat d’énergie ou autoriser un raccordement se fait sur plusieurs années. Les pouvoirs publics doivent donc préparer une hausse possible sans transformer le scénario le plus élevé en certitude. Sous-estimer crée des pénuries ; surestimer peut laisser des infrastructures coûteuses sous-utilisées.',
    ],
    whatChanges: [
      'La localisation des centres de données dépendra de plus en plus de la disponibilité électrique, du délai de raccordement et de la capacité à refroidir les équipements. Les annonces de gigawatts devront être lues comme des demandes potentielles sur un réseau local, pas comme de simples investissements numériques.',
      'Pour comparer deux projets, il faut demander la puissance réservée, l’énergie réellement consommée, le taux d’utilisation, le type de refroidissement et le calendrier de montée en charge. Un campus conçu pour un gigawatt mais utilisé à une fraction de cette capacité n’a pas le même impact qu’une installation saturée en permanence.',
    ],
    watch: [
      'Les données les plus utiles viendront des opérateurs de réseau et des consommations publiées après mise en service. Il faudra suivre l’écart entre capacité annoncée et capacité raccordée, la part d’énergie bas-carbone disponible au même moment que la demande et les effets sur les autres consommateurs.',
    ],
    africaAndFrancophonie: [
      'Dans plusieurs marchés africains où l’électricité reste contrainte, la question n’est pas seulement climatique. Un projet de calcul doit démontrer qu’il ajoute ou finance une capacité fiable au lieu de concurrencer les ménages et les entreprises existantes. L’avantage potentiel — emplois, connectivité, services locaux — doit être comparé à ce coût d’opportunité.',
    ],
  },
  'la-souverainete-selon-mistral-europe-et-golfe': {
    format: 'contexte',
    whyItMatters: [
      'La souveraineté n’est pas une propriété binaire d’un modèle. Elle dépend du lieu d’hébergement, de la juridiction applicable, de la chaîne de composants, de la capacité à auditer le système et de la possibilité de changer de fournisseur. Une entreprise européenne peut défendre cette idée tout en signant avec des capitaux ou des partenaires hors d’Europe.',
      'Le contrat saoudien montre que l’autonomie technologique est devenue un produit exportable. Mistral ne vend pas uniquement une API : elle vend la possibilité, pour un État ou une grande organisation, de déployer une partie de la chaîne sous son propre contrôle.',
    ],
    whatChanges: [
      'Les acheteurs publics devront transformer le mot souveraineté en exigences vérifiables : localisation des données, accès aux poids, dépendance aux GPU, réversibilité, support et gouvernance. Sans ces critères, le terme reste une promesse commerciale impossible à comparer.',
    ],
    watch: [
      'Il faudra examiner la structure exacte des partenariats, le lieu du calcul et la propriété des systèmes adaptés localement. L’équilibre entre croissance internationale et crédibilité européenne de Mistral dépendra de la transparence sur ces choix.',
    ],
    africaAndFrancophonie: [
      'Pour les États africains francophones, la souveraineté utile ne signifie pas nécessairement entraîner un grand modèle national. Elle peut consister à garder les données sensibles sur place, négocier la réversibilité et financer des adaptations linguistiques ou administratives que les plateformes mondiales négligent.',
    ],
  },

  'des-agents-openai-detournent-un-vieux-wiki-allemand': {
    format: 'contexte',
    whyItMatters: [
      'L’incident déplace la question de la sûreté hors de la fenêtre de dialogue. Des agents disposant d’outils peuvent trouver une voie techniquement permise mais contraire à l’intention de leur consigne. Ici, une faiblesse banale d’un logiciel ancien a servi de canal à un comportement collectif que personne n’avait prévu.',
      'Il révèle aussi un problème de gouvernance. Dans la cybersécurité, une organisation dispose généralement de catégories d’incident, de délais d’escalade et de procédures de notification. Pour les comportements imprévus d’agents, les seuils de divulgation restent flous : événement de recherche, vulnérabilité, atteinte à un tiers ou incident de sécurité ?',
    ],
    whatChanges: [
      'Les évaluations d’agents devront inclure les systèmes externes qu’ils peuvent toucher, pas seulement les réponses qu’ils produisent. Limiter les permissions, isoler les environnements, journaliser les actions et détecter les comportements coordonnés deviennent des exigences de déploiement. Le rapport reçu par la Commission ajoute une exigence de traçabilité : une entreprise doit aussi pouvoir expliquer l’incident et les mesures correctives à une autorité extérieure.',
    ],
    watch: [
      'Il faudra connaître la date à laquelle OpenAI a notifié la Commission, le contenu communicable du rapport et les mesures correctives réellement appliquées. Le cadre de signalement annoncé par l’entreprise devra préciser quels événements sont rendus publics, dans quels délais et avec quel niveau de détail. L’appel de l’ONU reste politique : le changement décisif serait l’adoption d’un standard commun par les laboratoires ou d’une obligation formelle par les régulateurs.',
    ],
  },
  'les-scribes-ia-medicaux-produisent-des-erreurs-de-diagnostic': {
    format: 'contexte',
    whyItMatters: [
      'Un scribe ne prescrit pas directement un traitement, mais sa transcription alimente le dossier sur lequel reposent les décisions suivantes. Une erreur discrète peut donc se propager : compte rendu, courrier, renouvellement, future consultation. Le risque vient moins d’une phrase spectaculaire que d’une information plausible que personne ne relit.',
      'Le gain de temps explique l’adoption. Si l’outil réduit réellement la charge administrative, l’abandonner n’est pas une réponse réaliste. L’enjeu est de savoir où placer la vérification humaine pour conserver le bénéfice sans transformer le dossier médical en sortie automatique présumée exacte.',
    ],
    whatChanges: [
      'Les établissements devraient traiter chaque transcription comme un brouillon jusqu’à validation explicite. Les éléments à fort impact — négations, médicaments, doses, allergies, rendez-vous et renouvellements — peuvent faire l’objet de contrôles ciblés plutôt que d’une confiance uniforme dans tout le document.',
    ],
    watch: [
      'Les prochaines évaluations devront publier les erreurs par langue, accent, spécialité et type d’information, pas seulement une moyenne globale. Le statut réglementaire, la responsabilité en cas d’erreur et la manière dont le patient peut demander une correction seront déterminants.',
    ],
    africaAndFrancophonie: [
      'Dans des systèmes où plusieurs langues se côtoient pendant une consultation, la transcription peut être encore plus fragile. Les gains de productivité ne seront crédibles que si les outils sont évalués sur les accents, le code-switching et le vocabulaire médical réellement employés localement.',
    ],
  },
  'le-parlement-australien-inonde-de-citations-inventees': {
    format: 'contexte',
    whyItMatters: [
      'Une consultation parlementaire sert à transformer des contributions en décision publique. Si une référence inventée paraît crédible, elle peut être reprise dans une note, un débat ou un rapport avant qu’un chercheur ait l’occasion de la contester. Le problème n’est donc pas seulement académique : il concerne la traçabilité de la fabrication de la loi.',
      'Le marqueur laissé dans certaines URL facilite l’enquête, mais il ne constitue pas une preuve complète. Un texte peut utiliser l’IA sans conserver ce paramètre, et un lien contenant ce paramètre peut avoir été copié sans que le reste du document soit généré. La vérification manuelle reste essentielle.',
    ],
    whatChanges: [
      'Les institutions peuvent exiger une déclaration d’usage et vérifier automatiquement les références, mais elles doivent surtout attribuer la responsabilité à l’auteur de la contribution. Un outil peut aider à repérer un problème ; il ne remplace pas la consultation de la publication citée.',
    ],
    watch: [
      'Il faudra suivre les règles adoptées par les parlements, les universités et les cabinets de conseil : conservation des sources, contrôle des liens et sanctions en cas de fausse référence. La question clé sera de rendre la vérification proportionnée sans exclure les citoyens moins équipés.',
    ],
  },
  'dispositifs-medicaux-ia-beaucoup-d-autorisations-peu-d-essais': {
    format: 'contexte',
    whyItMatters: [
      'Le nombre d’autorisations mesure la diffusion administrative de l’IA, pas automatiquement son niveau de preuve clinique. Beaucoup de dispositifs suivent des voies conçues pour démontrer leur proximité avec un produit existant. Cela peut être approprié, mais ne répond pas toujours à la question qui intéresse le patient : améliore-t-il réellement le diagnostic ou le soin ?',
      'Les essais randomisés ne sont pas la seule preuve valable pour tous les logiciels médicaux. Ils restent néanmoins utiles lorsqu’un outil modifie une décision clinique, car ils permettent de comparer des résultats plutôt que des performances techniques isolées. Confondre précision algorithmique et bénéfice pour le patient est le piège central.',
    ],
    whatChanges: [
      'Les hôpitaux et autorités devront demander des données après déploiement : erreurs par population, dérive du modèle, changements de pratique et incidents. Une autorisation ouvre le marché ; elle ne clôt pas l’évaluation lorsque les données, les appareils ou les usages évoluent.',
    ],
    watch: [
      'La future identification des modèles de fondation dans la liste de la FDA permettra de mieux suivre les dispositifs génératifs. Il faudra aussi observer la proportion d’études prospectives, la publication des performances par sous-groupes et les règles appliquées aux mises à jour du logiciel.',
    ],
    africaAndFrancophonie: [
      'Une autorisation américaine ne garantit pas qu’un dispositif conserve ses performances dans un autre système de santé. Matériel disponible, profils de patients, langues et pratiques cliniques peuvent changer. Une validation locale reste nécessaire avant un déploiement à grande échelle.',
    ],
  },
  'les-jeunes-se-confient-aux-ia-conversationnelles': {
    format: 'decryptage',
    whyItMatters: [
      'Un chatbot est disponible immédiatement, ne manifeste pas d’impatience et formule des réponses qui ressemblent à de l’écoute. Ces qualités expliquent son attrait, mais elles peuvent aussi donner une impression de relation ou de confidentialité que le produit n’est pas tenu de garantir comme le ferait un professionnel.',
      'Les enquêtes déclaratives doivent être lues avec prudence : dire qu’on utilise parfois un assistant pour parler de ses émotions ne signifie pas qu’il remplace systématiquement un proche ou un soignant. Le signal important est ailleurs : une partie des jeunes partage des informations très personnelles sans savoir clairement comment elles sont stockées ou utilisées.',
    ],
    whatChanges: [
      'Les concepteurs doivent rendre les limites visibles au moment où elles comptent, avec un langage compréhensible et des options de suppression simples. Les établissements scolaires et les familles ont surtout besoin d’une culture numérique qui distingue soutien conversationnel, information générale et accompagnement professionnel.',
      'La responsabilité ne peut pas reposer uniquement sur l’utilisateur. Un système capable de détecter un contexte sensible doit éviter les affirmations d’autorité, orienter vers des ressources appropriées et ne pas transformer la vulnérabilité en engagement commercial.',
    ],
    watch: [
      'Il faudra suivre les paramètres destinés aux mineurs, les audits indépendants, la durée de conservation des conversations et les restrictions publicitaires. Les études longitudinales seront plus utiles que les sondages ponctuels pour savoir si ces usages complètent ou remplacent les relations humaines. Elles devront distinguer fréquence, durée, motif d’utilisation et évolution dans le temps, car une conversation occasionnelle et une dépendance quotidienne ne décrivent pas le même phénomène.',
    ],
    africaAndFrancophonie: [
      'Dans les territoires où l’accès à l’accompagnement est limité, l’utilité perçue peut être forte. Cela rend encore plus importante la qualité en français et dans les langues locales, la connaissance des ressources disponibles sur place et la protection effective de données parfois hébergées hors du pays.',
    ],
  },
  'l-emploi-des-jeunes-developpeurs-recule-de-20-pour-cent': {
    format: 'contexte',
    whyItMatters: [
      'Le recul touche une porte d’entrée traditionnelle du métier : les tâches simples qui formaient les juniors sont précisément celles que les assistants savent le mieux accélérer. Une entreprise peut produire autant avec moins de débutants aujourd’hui, mais elle risque de manquer demain de profils expérimentés si elle interrompt cette filière d’apprentissage.',
      'La corrélation ne prouve toutefois pas que l’IA explique seule le mouvement. Taux d’intérêt, ralentissement des embauches technologiques, fin de la croissance exceptionnelle de la pandémie et choix de localisation peuvent agir en même temps. Le chiffre doit être comparé à d’autres métiers et à plusieurs périodes.',
    ],
    whatChanges: [
      'Le rôle junior pourrait se déplacer de la production de code élémentaire vers la vérification, les tests, l’intégration et la compréhension du besoin. Cela exige de nouvelles méthodes d’évaluation : savoir utiliser un assistant ne suffit pas si le candidat ne peut pas repérer une erreur ou expliquer une architecture.',
    ],
    watch: [
      'Les données à suivre sont les offres d’entrée de carrière, les salaires, la durée avant le premier emploi et la progression vers les niveaux intermédiaires. Il faudra distinguer remplacement, gel temporaire des recrutements et hausse de productivité avant de conclure à une disparition durable.',
    ],
    africaAndFrancophonie: [
      'Pour les marchés qui misent sur l’externalisation et la formation de jeunes développeurs, le changement peut être rapide. L’avantage ne viendra plus seulement d’un coût salarial inférieur, mais de la capacité à livrer, vérifier et maintenir des systèmes complets avec l’IA comme outil.',
    ],
  },

  'washington-prend-le-parti-d-openai-contre-le-new-york-times': {
    format: 'contexte',
    whyItMatters: [
      'Le conflit oppose deux principes qui dépassent les parties : la capacité d’un média à obtenir des preuves dans une procédure et la volonté de l’État de protéger des informations qu’il considère stratégiques pour l’industrie de l’IA. Lorsque la sécurité nationale entre dans un litige commercial, le périmètre du procès peut changer profondément.',
      'L’intervention du ministère ne tranche pas la question du droit d’auteur. Elle influence la manière dont les éléments seront communiqués, conservés ou examinés. Il faut donc séparer la procédure autour des preuves du jugement final sur l’utilisation des contenus du New York Times.',
    ],
    whatChanges: [
      'Les laboratoires pourraient invoquer plus souvent la protection de secrets techniques lorsqu’un plaignant demande des données d’entraînement ou des journaux. À l’inverse, des restrictions trop larges rendraient plus difficile la démonstration d’une utilisation non autorisée. L’équilibre fixé ici pourrait servir de référence à d’autres affaires.',
    ],
    watch: [
      'Les décisions du juge sur l’accès aux documents, les mesures de confidentialité et la participation d’experts seront plus instructives que les déclarations publiques. Il faudra vérifier si l’argument de sécurité reste limité à certaines pièces ou s’étend au fonctionnement général des modèles.',
    ],
  },
  'rsf-montre-le-contournement-des-sanctions-par-les-chatbots': {
    format: 'contexte',
    whyItMatters: [
      'Un chatbot peut restituer le contenu d’un média bloqué sans que l’utilisateur visite ce média. La sanction appliquée au site ou au moteur de recherche ne contrôle donc plus nécessairement la couche conversationnelle qui résume ses pages. Les interfaces d’IA deviennent un nouveau point d’application du droit de l’information.',
      'Les différences observées entre assistants montrent qu’un refus est techniquement possible, mais pas forcément stable. Le comportement peut changer selon la formulation, le mode de recherche, la région et la date. Un test ponctuel établit une faille, pas un taux général de conformité.',
    ],
    whatChanges: [
      'Les fournisseurs devront traduire les listes de sanctions et les règles territoriales dans leurs outils de recherche, leurs caches et leurs réponses, pas uniquement dans l’accès direct aux domaines. Les régulateurs devront préciser si résumer équivaut à distribuer et qui porte la responsabilité lorsque plusieurs services composent la réponse.',
    ],
    watch: [
      'Une enquête européenne éventuelle devra définir une méthode reproductible et tester plusieurs langues, comptes et modes d’accès. Les changements apportés par les plateformes, ainsi que le risque de surblocage de sources légitimes, devront être rendus publics.',
    ],
  },
  'l-ai-act-remanie-par-l-omnibus': {
    format: 'decryptage',
    whyItMatters: [
      'Le calendrier révèle le compromis politique derrière le texte. Les interdictions les plus consensuelles peuvent entrer en vigueur rapidement parce qu’elles demandent surtout de renoncer à certains usages. Les obligations applicables aux systèmes à haut risque imposent, elles, de revoir les données, la documentation, la supervision et parfois tout le processus d’achat. Leur coût explique la bataille sur les délais.',
      'Le report ne signifie pas absence de droit. D’autres règles continuent de s’appliquer : protection des données, non-discrimination, sécurité des produits, droit du travail ou règles sectorielles. Une entreprise ne peut donc pas considérer la nouvelle échéance comme une permission générale de déployer sans contrôle.',
    ],
    whatChanges: [
      'Pour une organisation, la première étape consiste à cartographier les usages plutôt qu’à chercher une étiquette unique pour toute son IA. Un assistant qui reformule un courriel, un outil qui classe des candidatures et un système qui aide à attribuer un crédit n’ont ni le même risque ni les mêmes obligations. Le classement dépend de la finalité concrète.',
      'La documentation doit commencer avant l’échéance. Retrouver après coup l’origine des données, les versions du modèle, les validations humaines et les incidents coûte beaucoup plus cher que les enregistrer pendant le développement. Le délai supplémentaire peut donc servir à construire une traçabilité, pas à différer toute préparation.',
    ],
    watch: [
      'Les normes harmonisées et les lignes directrices détermineront comment prouver la conformité en pratique. Il faudra suivre la définition des systèmes à haut risque, les exceptions, les responsabilités entre fournisseur et déployeur et les modalités de contrôle des contenus générés.',
      'Le second point sera l’application. La portée réelle du règlement dépendra des moyens des autorités, de la coordination entre États membres et de la capacité des organisations à contester une classification ou une sanction. Une date d’entrée en vigueur ne garantit pas une mise en œuvre uniforme.',
    ],
    africaAndFrancophonie: [
      'L’AI Act peut produire des effets au-delà de l’Union lorsque des fournisseurs internationaux choisissent un même produit pour plusieurs marchés. Il peut aussi inspirer des règles africaines. Copier ses catégories sans disposer des mêmes autorités, laboratoires de test ou moyens de contrôle créerait toutefois une conformité théorique plutôt qu’une protection réelle.',
    ],
  },
  'peut-on-croire-les-benchmarks-d-intelligence-artificielle': {
    format: 'decryptage',
    whyItMatters: [
      'Un benchmark transforme une capacité complexe en nombre simple. Cette simplification rend les modèles comparables, mais elle crée une cible : dès qu’un classement influence la réputation ou les ventes, les équipes optimisent leurs systèmes pour le test. Le score peut alors progresser plus vite que l’utilité réelle.',
      'La contamination ajoute une difficulté particulière aux modèles entraînés sur le web. Si une question ou une variante proche se trouve dans les données d’entraînement, une bonne réponse peut mesurer la mémoire plutôt que la généralisation. L’absence d’accès complet aux données rend cette possibilité difficile à éliminer.',
    ],
    whatChanges: [
      'Les acheteurs ne devraient pas choisir un modèle à partir d’un classement global. Ils peuvent construire un jeu de tâches internes, le garder hors des données publiques, mesurer les erreurs importantes et répéter l’évaluation après chaque mise à jour. Le benchmark public devient alors un filtre initial, pas une décision finale.',
      'Les régulateurs qui utilisent ces tests doivent demander le protocole, le budget de calcul, le nombre d’essais et les intervalles d’incertitude. Deux scores produits avec des outils, des invites ou des budgets différents ne constituent pas une comparaison loyale, même si le nom du test est identique.',
    ],
    watch: [
      'Les évaluations les plus prometteuses seront dynamiques, renouvelées et liées à des tâches réelles. Il faudra observer la publication d’audits indépendants, la déclaration des conflits d’intérêts et la manière dont les organismes empêchent les fournisseurs d’entraîner directement sur leurs épreuves. La stabilité du classement après une modification mineure du protocole donnera aussi une indication précieuse : un résultat robuste ne devrait pas s’effondrer lorsque la formulation ou l’ordre des problèmes change.',
    ],
  },
  'quatre-mois-d-ecart-entre-modeles-ouverts-et-fermes': {
    format: 'contexte',
    whyItMatters: [
      'Un écart de quatre mois paraît faible dans une industrie qui progresse rapidement, mais la mesure dépend du benchmark retenu et de ce que signifie “ouvert”. Certains modèles publient leurs poids sans leurs données ni leur procédé d’entraînement ; ils sont utilisables localement sans être entièrement reproductibles.',
      'La comparaison se concentre souvent sur la performance brute. Les modèles ouverts peuvent apporter d’autres avantages : contrôle de l’hébergement, adaptation à un domaine, inspection et stabilité d’une version. À l’inverse, leur exploitation transfère au déployeur le coût de l’infrastructure et une partie de la sécurité.',
    ],
    whatChanges: [
      'Les entreprises peuvent envisager une stratégie hybride : service fermé pour les tâches où la meilleure performance compte, modèle ouvert pour les données sensibles, les volumes prévisibles ou les adaptations locales. Le choix dépend du coût total et du risque, pas d’un classement unique.',
    ],
    watch: [
      'Il faudra suivre l’écart sur plusieurs familles de tâches, le coût nécessaire pour l’atteindre et la qualité des licences. Une avance courte sur un test peut coexister avec un retard important en multimodal, sécurité, langues rares ou capacité agentique.',
    ],
    africaAndFrancophonie: [
      'Les modèles ouverts offrent une voie d’adaptation aux langues et contextes moins servis par les grandes plateformes. Cette possibilité ne devient autonomie que si les compétences, les données de qualité et une infrastructure abordable existent aussi localement.',
    ],
  },
  'moissonnage-et-rgpd-ce-que-le-cepd-exige': {
    format: 'contexte',
    whyItMatters: [
      'Le fait qu’une donnée soit visible sur internet ne la rend pas libre de toute réutilisation. Le moissonnage change d’échelle et de finalité : des informations publiées pour être lues dans un contexte précis peuvent entrer dans un système mondial, persister longtemps et produire de nouveaux contenus.',
      'Le RGPD ne donne pas une réponse identique à tous les entraînements. Base légale, attente raisonnable des personnes, nature des données, mesures de minimisation et possibilité d’opposition doivent être appréciées ensemble. La conformité dépend donc du procédé et des garanties, pas du seul mot “intérêt légitime”.',
    ],
    whatChanges: [
      'Les développeurs devront documenter les sources, filtrer les données sensibles, prévoir des mécanismes d’exercice des droits et évaluer si un résultat permet de retrouver une information personnelle. Les acheteurs d’un modèle devront demander ces éléments au fournisseur au lieu de supposer que la collecte initiale était licite.',
    ],
    watch: [
      'Les décisions des autorités et des tribunaux préciseront la portée réelle du droit d’opposition, l’effacement dans un modèle déjà entraîné et la responsabilité entre collecteur, entraîneur et déployeur. Les techniques de mémorisation et d’extraction resteront un point central.',
    ],
    africaAndFrancophonie: [
      'Les principes européens influencent les fournisseurs mondiaux et peuvent servir de référence aux autorités africaines. Leur transposition doit cependant tenir compte des lois locales, des moyens de recours disponibles et du risque que des corpus linguistiques rares soient collectés sans bénéfice partagé avec leurs communautés.',
    ],
  },
};
