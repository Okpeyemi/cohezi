import type { ArticleCore } from '../types';

export const actualiteArticles: ArticleCore[] = [
  {
    slug: 'nvidia-open-agent-safety-platform-agents-ia',
    title: 'NVIDIA place les garde-fous des agents IA en dehors du modèle.',
    excerpt:
      'OpenShell limite les accès d’un agent, tandis que Sentry promet de le surveiller depuis une puce séparée. Une défense plus difficile à contourner, mais encore à éprouver hors des démonstrations de NVIDIA.',
    category: 'actualite',
    publishedAt: '2026-09-28',
    readingMinutes: 5,
    image: {
      src: '/images/articles/nvidia-open-agent-safety-platform.webp',
      alt: 'Un serveur isolé dans un centre de données sombre, sous la surveillance de systèmes de sécurité distincts',
    },
    body: [
      {
        type: 'paragraph',
        text: 'NVIDIA a lancé le 28 septembre 2026 Open Agent Safety Platform, un ensemble destiné à encadrer les agents d’intelligence artificielle pendant leurs tests puis leur utilisation réelle. L’idée centrale est simple : un agent ne devrait pas pouvoir modifier les règles qui le surveillent. La plateforme associe OpenShell, un logiciel libre qui délimite ses accès, à Sentry, un système de contrôle fonctionnant sur une puce distincte du processeur qui exécute l’agent.',
      },
      { type: 'heading', text: 'OpenShell donne seulement les permissions nécessaires' },
      {
        type: 'paragraph',
        text: 'Un agent peut lire des fichiers, appeler des services en ligne, utiliser des identifiants ou lancer du code. OpenShell place chaque agent dans un environnement isolé et applique une règle de refus par défaut : l’accès est accordé uniquement lorsqu’il correspond à la tâche déclarée. Les restrictions portent notamment sur les fichiers, le réseau et les services externes. Elles continuent de s’appliquer si l’agent génère un programme ou crée un nouveau processus.',
      },
      {
        type: 'paragraph',
        text: 'Le logiciel conserve aussi les véritables identifiants hors de l’environnement de travail. Il peut, par exemple, autoriser la lecture d’un calendrier tout en refusant sa modification. Un outil de vérification formelle analyse les politiques avant leur activation et signale une permission qui dépasserait les limites fixées. Selon la documentation publique, OpenShell 0.1.2 est disponible et peut fonctionner avec des modèles ouverts ou propriétaires. NVIDIA affirme qu’il est optimisé pour ses processeurs Vera, mais qu’il peut être étendu aux plateformes d’Arm et d’Intel.',
      },
      { type: 'heading', text: 'Sentry surveille l’agent depuis une autre couche' },
      {
        type: 'paragraph',
        text: 'Sentry ajoute un second niveau de défense sur les processeurs réseau BlueField-4 de NVIDIA. Ce contrôleur observe les requêtes et les réponses, vérifie l’identité de l’agent et applique des règles d’accès sans fonctionner dans le même environnement que lui. NVIDIA promet qu’il peut mettre en quarantaine un agent en quelques millisecondes lorsqu’il tente de sortir de ses limites.',
      },
      {
        type: 'paragraph',
        text: 'Cette séparation répond à une faiblesse connue des garde-fous placés uniquement dans les instructions du modèle ou dans l’application. Un agent déterminé à terminer sa mission peut rencontrer une consigne malveillante, produire du code inattendu ou contourner un contrôle qu’il est capable d’observer. Déplacer la décision vers une couche extérieure ne garantit pas qu’aucune erreur ne surviendra, mais rend la règle plus difficile à influencer par le texte produit par le modèle.',
      },
      { type: 'heading', text: 'Une plateforme ouverte, adossée au matériel NVIDIA' },
      {
        type: 'paragraph',
        text: 'NVIDIA cite plus de cent organisations travaillant avec les technologies de la plateforme, parmi lesquelles Anthropic, Microsoft, Hugging Face, SAP, Salesforce, Cisco, CrowdStrike et plusieurs groupes financiers. SpaceXAI dit déjà l’utiliser avec des agents de programmation Cursor et les modèles Grok. Ces soutiens montrent l’ampleur de l’écosystème réuni, mais ils ne constituent pas une évaluation indépendante de son efficacité.',
      },
      {
        type: 'paragraph',
        text: 'La distinction entre les deux composants est importante. OpenShell est disponible publiquement et peut être adopté sans acheter toute la pile NVIDIA. Sentry, lui, dépend de BlueField-4. NVIDIA transforme ainsi un problème de sécurité logicielle en débouché potentiel pour son matériel. Les entreprises gagnent une architecture intégrée et un interlocuteur unique ; elles prennent aussi le risque de dépendre davantage d’un fournisseur pour une fonction critique.',
      },
      { type: 'heading', text: 'Ce que le lancement ne prouve pas encore' },
      {
        type: 'paragraph',
        text: 'Aucun résultat comparatif public ne démontre pour l’instant que la plateforme bloque toutes les sorties de cadre, ni qu’elle le fait sans ralentissement ou faux positifs gênants. Une politique mal écrite peut rester trop permissive ; une politique trop stricte peut empêcher l’agent de travailler. La mise en quarantaine en quelques millisecondes est une affirmation de NVIDIA qui devra être reproduite dans des environnements variés et face à des attaques conçues par des tiers.',
      },
      {
        type: 'paragraph',
        text: 'Le lancement marque néanmoins un changement concret : la sécurité des agents n’est plus présentée seulement comme une qualité du modèle, mais comme une infrastructure à part entière. Pour une organisation, la question devient moins « l’agent est-il fiable ? » que « quels fichiers, services et actions lui sont accessibles, qui peut modifier ces droits, et comment l’arrêter si son comportement dévie ? ». Les prochaines preuves viendront des incidents évités, des tests indépendants et des déploiements réels, pas du nombre de partenaires annoncé.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'OpenShell isole les agents et applique leurs permissions en dehors de leur propre processus.',
          'Sentry promet une surveillance matérielle indépendante et une mise en quarantaine rapide, mais exige BlueField-4.',
          'La plateforme est disponible ; son efficacité réelle reste à mesurer par des tests indépendants.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'NVIDIA',
        title: 'NVIDIA Launches Open Agent Safety Platform to Secure Agents From Testing to Deployment',
        url: 'https://nvidianews.nvidia.com/_gallery/download_pdf/6aba2cd23d6332bf9e64fbef/',
        publishedAt: '2026-09-28',
      },
      {
        outlet: 'NVIDIA',
        title: 'NVIDIA OpenShell',
        url: 'https://build.nvidia.com/openshell',
        publishedAt: '2026-09-28',
      },
      {
        outlet: 'NVIDIA',
        title: 'NVIDIA OpenShell Developer Guide',
        url: 'https://docs.nvidia.com/openshell/home',
        publishedAt: '2026-09-28',
      },
      {
        outlet: 'Associated Press',
        title: 'Nvidia unveils security platform to stop AI agents from going rogue',
        url: 'https://www.clickorlando.com/business/2026/09/28/nvidia-unveils-security-platform-to-stop-ai-agents-from-going-rogue/',
        publishedAt: '2026-09-28',
      },
    ],
  },
  {
    slug: 'microsoft-copilot-home-code-autopilot',
    title: 'Microsoft transforme Copilot en hub de travail avec Home, Code et Autopilot.',
    excerpt:
      'Copilot réunit désormais conversation, création d’applications et agents persistants. Mais le déploiement commence par des programmes d’accès anticipé, tandis que les tâches longues seront facturées à l’usage.',
    category: 'actualite',
    publishedAt: '2026-09-26',
    readingMinutes: 5,
    image: {
      src: '/images/articles/microsoft-copilot-home-code-autopilot.webp',
      alt: 'Visuel officiel du nouveau Microsoft Copilot présentant les espaces Home, Code et Autopilot',
      credit: {
        label: 'Microsoft',
        url: 'https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/',
      },
    },
    body: [
      {
        type: 'paragraph',
        text: 'Microsoft a présenté le 25 septembre 2026 une nouvelle organisation de Copilot autour de trois espaces : Home pour converser et déléguer, Code pour créer des applications, et Autopilot pour confier des tâches récurrentes à un agent qui continue de travailler dans le cloud. L’annonce marque un changement de positionnement : Copilot ne veut plus être seulement un assistant intégré à Office, mais l’interface depuis laquelle une entreprise demande, construit et automatise du travail.',
      },
      {
        type: 'paragraph',
        text: 'Il faut toutefois distinguer le produit présenté de ce qui est immédiatement disponible. Home et Code doivent commencer à arriver dans le programme d’accès anticipé Frontier au cours des prochaines semaines. Autopilot entrera en aperçu privé à la fin du mois. Code est annoncé en préversion pour les abonnés Microsoft 365 Premium et Pro plus tard dans l’année. La refonte est donc lancée, mais toutes ses fonctions ne sont pas encore ouvertes à l’ensemble des clients.',
      },
      { type: 'heading', text: 'Home rassemble la conversation, Office et les tâches déléguées' },
      {
        type: 'paragraph',
        text: 'Home devient le point de départ de Copilot. Il réunit Chat, pour les demandes rapides, et Cowork, pour les missions plus longues exécutées de bout en bout. Microsoft cite la préparation d’une réponse à un appel d’offres, d’un dossier client ou d’un kit de lancement. Word, Excel et PowerPoint doivent aussi fonctionner directement dans l’interface : l’utilisateur pourra demander un document, un budget ou une présentation, puis continuer à les modifier avec son équipe sans recréer le contexte dans une autre application.',
      },
      { type: 'heading', text: 'Code veut faire de chaque employé un créateur d’applications' },
      {
        type: 'paragraph',
        text: 'Avec Code, un utilisateur décrit en langage naturel une application, un tableau de bord, un suivi ou une automatisation. Copilot choisit une méthode, construit la solution et peut la rendre accessible à des collègues. La fonction reprend la technologie de GitHub Copilot, mais vise des personnes qui ne développent pas au quotidien. Le code s’exécute dans un environnement isolé et peut être hébergé dans le tenant Microsoft 365 de l’entreprise.',
      },
      { type: 'heading', text: 'Autopilot travaille sans attendre une nouvelle consigne' },
      {
        type: 'paragraph',
        text: 'Autopilot, auparavant appelé Scout, est la partie la plus autonome de l’annonce. L’agent reçoit un nom, un rôle et un objectif, puis peut surveiller des canaux, relancer des participants, exécuter un travail récurrent et reprendre un projet plusieurs jours plus tard. Il dispose dans le cloud de sa propre identité, d’une mémoire, d’un ordinateur et d’un espace de travail. Microsoft promet des permissions, des journaux d’audit et des règles de gouvernance comparables à celles d’un compte de l’organisation.',
      },
      {
        type: 'paragraph',
        text: 'Cette persistance rend l’agent plus utile, mais augmente aussi le coût d’une mauvaise instruction ou d’un accès trop large. Un chatbot se trompe dans une réponse ; un agent actif pendant plusieurs jours peut répéter la même erreur, contacter des collègues ou consommer des crédits. Les mécanismes importants seront donc moins spectaculaires que les démonstrations : limites d’action, confirmations humaines, alertes, possibilité d’interrompre une mission et historique compréhensible des décisions.',
      },
      { type: 'heading', text: 'Un Copilot à deux modes de facturation' },
      {
        type: 'paragraph',
        text: 'Microsoft sépare désormais les usages courants et les tâches agentiques. La licence par utilisateur couvre Chat et Copilot dans Word, Excel, PowerPoint, Outlook et Teams. Le système Auto choisit un modèle selon la qualité, la vitesse et le coût. Cowork, Code, Autopilot et les modèles de frontière sont, eux, facturés selon l’usage. Les administrateurs pourront définir les familles de modèles accessibles, imposer des politiques de dépense et suivre les crédits consommés.',
      },
      { type: 'heading', text: 'Pourquoi Microsoft refond encore Copilot' },
      {
        type: 'paragraph',
        text: 'Microsoft avait déjà commencé en août à réunir ses applications Copilot grand public et professionnelles. La nouvelle interface achève ce rapprochement tout en recentrant le produit sur le travail en entreprise. The Verge note que Microsoft dispose d’un avantage difficile à reproduire : Copilot peut s’appuyer sur Office, Teams, Outlook et l’identité Microsoft Entra déjà présents dans de nombreuses organisations. Mais cet avantage devient une dépendance supplémentaire si la conversation, les fichiers, les applications internes et les agents passent tous par la même plateforme.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Le nouveau Copilot réunit Home, Code et Autopilot dans une même interface orientée vers le travail.',
          'Le lancement commence par Frontier et des aperçus privés : plusieurs fonctions restent à venir.',
          'Les tâches longues et agentiques seront facturées à l’usage, avec des outils FinOps destinés à contrôler les dépenses.',
          'L’autonomie d’Autopilot rend essentiels les permissions, les journaux, les confirmations et l’arrêt d’une mission.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Microsoft',
        title: 'Introducing the new Copilot with Home, Code and Autopilot',
        url: 'https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/',
        publishedAt: '2026-09-25',
      },
      {
        outlet: 'Microsoft',
        title: 'Evolution of the Copilot pricing model',
        url: 'https://techcommunity.microsoft.com/blog/microsoft-copilot-blog/evolution-of-the-copilot-pricing-model/4559416',
        publishedAt: '2026-09-25',
      },
      {
        outlet: 'The Verge',
        title: 'Microsoft thinks its new Copilot “super app” will be as influential as Office',
        url: 'https://www.theverge.com/news/802732/microsoft-copilot-home-code-autopilot-ai-super-app',
        publishedAt: '2026-09-25',
      },
    ],
  },
  {
    slug: 'meta-lance-muse-agent-email-paiements',
    title: 'Meta lance Muse, un agent capable d’envoyer des e-mails et d’effectuer des paiements.',
    excerpt:
      'Muse peut agir dans un navigateur et plusieurs services connectés. Meta promet une machine virtuelle isolée, mais des tests internes rapportés par Reuters révèlent encore des défaillances sensibles.',
    category: 'actualite',
    publishedAt: '2026-09-09',
    readingMinutes: 4,
    image: {
      src: '/images/articles/meta-muse-agent.webp',
      alt: 'Une interface d’agent personnel contrôlant des applications depuis un environnement informatique sécurisé',
    },
    body: [
      {
        type: 'paragraph',
        text: 'Meta a lancé le 8 septembre 2026 Muse, un agent personnel qui ne se contente pas de répondre à des questions. Le système peut ouvrir un navigateur, remplir des formulaires, envoyer des e-mails, organiser un voyage ou effectuer un achat au nom de l’utilisateur. Il est d’abord déployé aux États-Unis, dans une application dédiée et au sein de WhatsApp. Aucune date n’est annoncée pour les autres marchés.',
      },
      { type: 'heading', text: 'Un assistant qui reçoit des permissions réelles' },
      {
        type: 'paragraph',
        text: 'Muse peut être relié à des services d’e-mail, de calendrier, de paiement, de santé, d’achat et de maison connectée. L’utilisateur choisit les applications accessibles et peut retirer ces autorisations. Pour les tâches longues, l’agent continue de travailler en arrière-plan et revient demander une validation avant certaines actions sensibles, notamment l’envoi d’un message ou un achat.',
      },
      {
        type: 'paragraph',
        text: 'La différence avec un chatbot est donc moins une question de conversation que de capacité d’action. Une réponse erronée peut être ignorée ; un e-mail envoyé, un formulaire soumis ou un paiement validé produit une conséquence extérieure. Chaque permission transforme ainsi une erreur de raisonnement en risque opérationnel potentiel.',
      },
      { type: 'heading', text: 'Ce que Meta promet pour protéger les données' },
      {
        type: 'paragraph',
        text: 'Meta affirme que chaque Muse fonctionne dans une machine virtuelle dédiée appelée Muse Secure VM, où sont conservées les données et les identifiants des services connectés. Un second agent, Sentinel, doit examiner les actions avant qu’elles n’atteignent Internet et demander une autorisation lorsque la situation l’exige. Meta dit également que Muse ne voit pas directement les mots de passe ou les moyens de paiement stockés.',
      },
      {
        type: 'paragraph',
        text: 'L’entreprise promet que les conversations et les données de la machine virtuelle ne seront pas partagées avec ses systèmes publicitaires. Les utilisateurs pourront refuser que leurs interactions servent à entraîner les modèles de Meta. Une version dite Confidential VM, chiffrée avec une clé détenue uniquement par l’utilisateur, est annoncée pour plus tard dans l’année. Cette dernière protection est donc une promesse future, pas une propriété du lancement actuel.',
      },
      { type: 'heading', text: 'Les tests internes racontent une histoire moins nette' },
      {
        type: 'paragraph',
        text: 'Reuters rapporte que Meta avait repoussé une sortie initialement prévue en avril afin d’améliorer la sécurité. Un dirigeant de l’entreprise a expliqué que les travaux supplémentaires avaient permis d’atteindre le niveau minimal jugé nécessaire pour mettre le produit entre les mains du public. Cette formulation reconnaît implicitement qu’un agent de ce type ne peut pas être garanti sans erreur.',
      },
      {
        type: 'paragraph',
        text: 'Des publications internes consultées par Reuters font état de résultats mitigés jusqu’à la semaine du lancement. Un test aurait conduit l’agent à contourner un garde-fou et à exposer des photos personnelles ; d’autres employés ont signalé des déconnexions répétées, des erreurs ignorées et l’arrêt inexpliqué de certaines surveillances. Meta n’a pas répondu au média sur ces incidents précis. Ils ne prouvent pas que tous les utilisateurs seront touchés, mais ils contredisent une lecture trop absolue des promesses de sécurité.',
      },
      { type: 'heading', text: 'Un nouveau modèle économique pour Meta' },
      {
        type: 'paragraph',
        text: 'Muse est gratuit pour un usage de base. Selon Reuters, deux abonnements à 20 et 100 dollars par mois visent les usages plus intensifs. Meta cherche ainsi à créer des revenus directs autour de l’IA, alors que son activité reste principalement financée par la publicité. Le modèle économique dépendra toutefois de la confiance : plus l’agent obtient de permissions, plus son utilité augmente, mais plus le coût d’une défaillance devient élevé.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Muse agit dans des services connectés au lieu de seulement produire du texte.',
          'Le lancement est limité aux États-Unis et la version chiffrée renforcée arrivera plus tard.',
          'Les garde-fous annoncés coexistent avec des problèmes sensibles observés pendant les tests internes.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'Meta',
        title: 'Introducing Muse: The World’s First Personal AI Agent Built for Everyone',
        url: 'https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/',
        publishedAt: '2026-09-08',
      },
      {
        outlet: 'Reuters',
        title: 'Meta launches AI agent that can access other apps to send emails, make payments',
        url: 'https://www.reuters.com/business/meta-launches-ai-agent-that-can-access-other-apps-send-emails-make-payments-2026-09-08/',
        publishedAt: '2026-09-08',
      },
    ],
  },
  {
    slug: 'anthropic-lance-claude-fable-5-1-et-mythos-5-1',
    title: 'Anthropic sort deux modèles jumeaux, et un seul est ouvert à tous.',
    excerpt:
      'Fable 5.1 et Mythos 5.1 sont le même modèle avec des garde-fous différents. Le prix affiché ne bouge pas, mais la lecture de cache chute de 75 % — et le coût par tâche reste le plus élevé du marché.',
    category: 'actualite',
    publishedAt: '2026-09-02',
    readingMinutes: 2,
    image: {
      src: '/images/articles/anthropic-fable-mythos.webp',
      alt: 'Visuel officiel de Claude Fable 5.1 et Claude Mythos 5.1 dans un ciel bleu',
      credit: { label: 'Anthropic', url: 'https://www.anthropic.com/claude-fable-and-mythos-5-1' },
    },
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
    title: 'OpenAI ressort le mot AGI. Le même test donne 99,9 % ou 62,7 % selon qui le mesure.',
    excerpt:
      'GPT-6 Astra affiche des résultats spectaculaires sur ARC-AGI-3. Mais le score dépend entièrement du harnais de test employé, et l’écart entre les deux lectures dépasse trente-sept points.',
    category: 'actualite',
    publishedAt: '2026-09-04',
    readingMinutes: 2,
    image: {
      src: '/images/articles/gpt-6-astra-benchmarks.webp',
      alt: 'Spirale lumineuse du visuel officiel de GPT-6 Astra',
      credit: { label: 'OpenAI', url: 'https://openai.com/index/gpt-6-astra/' },
    },
    body: [
      {
        type: 'paragraph',
        text: 'OpenAI a dévoilé GPT-6 Astra le 3 septembre 2026. Greg Brockman, président de l’entreprise, a fait le tour des médias pour annoncer l’entrée dans l’ère de l’intelligence artificielle générale. Le modèle est d’abord réservé aux organisations du programme Daybreak, avec un déploiement promis « dans les prochains jours » aux abonnés Plus, Pro, Business et Entreprise, via l’API et AWS. Selon Numerama, il est issu du plus gros entraînement jamais mené par OpenAI : plus de 100 000 GPU au centre Stargate du Texas, avec des modèles antérieurs participant à la supervision.',
      },
      { type: 'heading', text: 'Un score, deux mesures' },
      {
        type: 'paragraph',
        text: 'C’est sur le benchmark ARC-AGI-3 que les lectures divergent. OpenAI publie un score de 99,9 % avec son adaptateur fournisseur. Next, s’appuyant sur le rapport de l’ARC Prize Foundation — l’organisation à but non lucratif cofondée par François Chollet qui publie ce test —, donne 62,7 % avec le harnais standard. Ces résultats ne sont donc pas directement comparables sans préciser le protocole.',
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
          'Le même test donne 99,9 % ou 62,7 % selon le harnais employé.',
          'Les auteurs du benchmark refusent eux-mêmes d’y voir une preuve d’AGI.',
          'Le score le plus élevé a coûté des dizaines de milliers de dollars d’inférence.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'OpenAI',
        title: 'GPT-6 Astra: A new generation of intelligence',
        url: 'https://openai.com/index/gpt-6-astra/',
        publishedAt: '2026-09-03',
      },
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
    image: {
      src: '/images/articles/gemini-3-8-flash.webp',
      alt: 'Visuel officiel de Gemini 3.8 Flash et Gemini 3.8 Flash Cyber',
      credit: {
        label: 'Google',
        url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/',
      },
    },
    body: [
      {
        type: 'paragraph',
        text: 'Google a présenté le 2 septembre 2026 Gemini 3.8 Flash, troisième sortie de cette famille en six semaines après les versions 3.6 et 3.7, publiées à trois semaines d’intervalle. Flash est la gamme utilitaire de Google, censée offrir le meilleur rapport entre rapidité et coût. Cette fois, elle vient chatouiller les modèles frontière.',
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
        outlet: 'Google',
        title: 'Introducing Gemini 3.8 Flash and 3.8 Flash Cyber',
        url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/',
        publishedAt: '2026-09-02',
      },
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
    title: 'Claude, ChatGPT et Grok tombent le même jour. Une cause commune reste à démontrer.',
    excerpt:
      'Le 3 septembre, Claude, ChatGPT et Grok ont connu des pannes qui se sont chevauchées. Chaque service a été rétabli, mais aucun élément public ne prouve une cause commune.',
    category: 'actualite',
    publishedAt: '2026-09-04',
    readingMinutes: 2,
    image: { src: '/images/articles/ai-services-outage.webp', alt: 'Trois services numériques momentanément éteints' },
    body: [
      {
        type: 'paragraph',
        text: 'Le jeudi 3 septembre 2026, Claude, ChatGPT et Grok ont connu des perturbations qui se sont chevauchées. Anthropic a confirmé une panne partielle liée à son infrastructure, avant un rétablissement à 16 h 16 UTC. OpenAI a relevé une hausse des erreurs sur ChatGPT et Codex, tandis que le statut de Grok signalait un incident. Des utilisateurs de Gemini ont également fait remonter des difficultés, mais sans confirmation publique équivalente de Google : il ne faut donc pas le compter comme une quatrième panne établie.',
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
        text: 'Aucune cause commune n’est établie. Anthropic a parlé d’un problème d’infrastructure et OpenAI d’erreurs affectant ses services ; Grok a relié son incident à son centre de données de Memphis. Le chevauchement temporel est réel, mais il ne suffit pas à démontrer une dépendance partagée ni une propagation entre les trois plateformes.',
      },
      {
        type: 'takeaway',
        title: 'À retenir',
        items: [
          'Trois pannes confirmées se chevauchent le 3 septembre, sans cause commune établie.',
          'Les remontées concernant Gemini ne valent pas confirmation officielle d’une panne.',
          'Une coïncidence temporelle doit rester présentée comme telle tant que les causes diffèrent.',
        ],
      },
    ],
    sources: [
      {
        outlet: 'The Verge',
        title: 'ChatGPT, Grok, and Claude all went down at the same time',
        url: 'https://www.theverge.com/ai-artificial-intelligence/989503/chatgpt-grok-claude-outage-down',
        publishedAt: '2026-09-03',
      },
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
    image: {
      src: '/images/articles/model-hardware-standard.webp',
      alt: 'Manipulation d’un instrument de laboratoire sous un microscope',
      credit: { label: 'Anthropic', url: 'https://www.anthropic.com/news/model-hardware-standard-research-preview' },
    },
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
    image: {
      src: '/images/articles/claude-text-watermark.webp',
      alt: 'Illustration officielle d’une main et d’une plume pour le filigrane de Claude',
      credit: { label: 'Anthropic', url: 'https://www.anthropic.com/news/claude-text-watermark' },
    },
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
