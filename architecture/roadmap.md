# 🗺️ Roadmap Post-MVP : Cohezi Evolution

Ce document explore les fonctionnalités futures pour transformer Cohezi d'un outil de démonstration en une plateforme SaaS complète d'aide à la décision.

## 🚀 Phase 4 : Persistance & Historique (Le "Cerveau Long-Terme")
Actuellement, tout est "in-memory". L'objectif est de permettre à l'utilisateur de construire une base de connaissances décisionnelle.

- **[Backend] Base de données (PostgreSQL/Supabase)** : Stocker les utilisateurs, les décisions, les rapports d'agents et les verdicts.
- **[Frontend] Tableau de bord utilisateur** :
    - Liste des décisions passées.
    - Filtrage par statut (Validé, Rejeté, En attente).
    - Recherche sémantique ("Quelle décision ai-je prise concernant le marketing l'an dernier ?").
- **[Feature] "Memory Replay"** : Rejouer l'animation de l'analyse d'une vieille décision pour se remémorer le raisonnement.

## 🤝 Phase 5 : Collaboration & Intelligence Collective
La décision est rarement un acte solitaire dans les entreprises.

- **[Feature] Mode Multijoueur** :
    - Inviter des collègues à une session de décision.
    - Chaque participant soumet son propre "contexte" ou "raisonnement".
    - L'IA synthétise les divergences entre les humains *avant* de lancer les agents.
- **[Feature] Partage de Verdict** : Générer un lien public (ou protégé) vers un rapport de décision pour les parties prenantes (investisseurs, équipes).
- **[UI] Commentaires Humains** : Permettre aux utilisateurs d'annoter les rapports des agents ("Je ne suis pas d'accord avec l'Agent Risque ici").

## 🧠 Phase 6 : Personnalisation des Agents (Le "Conseil d'Administration Custom")
Permettre à l'utilisateur de configurer son propre panel d'experts IA.

- **[Feature] Agent Builder** :
    - Créer un agent sur mesure (ex: "Agent Compliance RGPD", "Agent Brand Voice").
    - Définir sa personnalité et ses objectifs via un prompt simple.
- **[Feature] Sélection d'Équipe** : Choisir quels agents activer pour une décision donnée (ex: Tech Lead + CFO + Marketing pour un lancement produit).

## 📄 Phase 7 : Export & Intégration
Sortir Cohezi du navigateur.

- **[Feature] Export PDF Premium** : Générer un "One-Pager" exécutif propre, prêt à être signé.
- **[Feature] Intégration Slack/Notion** :
    - Envoyer le verdict directement dans un canal Slack.
    - Créer une page Notion avec le résumé de la décision.

## 🔬 Phase 8 : Comparaison A/B (Le "Battle Mode")
Souvent, on hésite entre deux options distinctes.

- **[Feature] Analyse Comparative** :
    - Entrer Option A vs Option B.
    - Les agents analysent les deux en parallèle.
    - Le Verdict est un "Winner Takes All" argumenté.
