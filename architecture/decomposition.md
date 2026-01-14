# 🏗️ Décomposition du Projet : Cohezi

## 📖 Compréhension du Projet
**Cohezi** n'est pas un chatbot classique. C'est un **moteur d'évaluation cognitive** qui utilise Gemini 3 pour disséquer, stress-tester et visualiser le raisonnement humain derrière une décision.

Le système fonctionne par **orchestration multi-agents** :
1. **Input** : L'utilisateur soumet une décision et son raisonnement.
2. **Orchestration** : Gemini extrait les hypothèses et définit les missions des agents.
3. **Analyse Multi-Agents** : 5 agents spécialisés (Logique, Causal, Risque, Sceptique, Stress-test) analysent la décision de manière indépendante.
4. **Synthèse** : Une synthèse finale identifie les failles critiques et les chemins de décision conditionnels.
5. **Visualisation** : Une interface moderne affiche ce processus de manière séquentielle et graphique (pas de chat).

---

## 🏗️ Structure du Projet

### 1. 🟢 Backend (Service d'Orchestration)
Le backend est le "cerveau" opérationnel. Il ne prend pas de décision mais gère le flux de données vers Gemini.
- **Technologies** : Node.js (Next.js API Routes / Route Handlers).
- **Responsabilités** :
    - Validation des entrées.
    - Gestion de l'état (JSON in-memory pour la démo).
    - Dispatcher d'agents (appels Gemini en parallèle/séquence).
    - Normalisation des sorties JSON.

### 2. 🔵 Webapp (Interface de Raisonnement)
L'interface utilisateur se concentre sur la clarté et la progression.
- **Technologies** : Next.js, Tailwind CSS, lucide-react (Icônes), Framer Motion (Animations).
- **Composants Clés** :
    - **Three-Panel Layout** : Interface triptyque redimensionnable (Input | Process | Output).
    - **Capture Engine** : Panneau gauche pour la saisie structurée.
    - **Reasoning Arena** : Panneau central pour le déploiement des agents et graphes.
    - **Verdict Panel** : Panneau droit pour la synthèse et les chemins de décision.

---

## 🛠️ Roadmap de Réalisation

### Phase 1 : Infrastructure & Backend (L'Orchestrateur)
1. Mise en place du client Gemini 3 sur le Backend.
2. Création de l'API `/api/analyze` qui gère le premier appel (Orchestrateur).
3. Implémentation du Dispatcher d'Agents (appels parallèles).
4. Implémentation de la Synthèse finale.

### Phase 2 : Frontend (La "Reasoning UI")
1. Design du système de navigation par étapes (Step-by-step).
2. Création de l'interface de capture de décision.
3. Développement des cartes Agents et de la Timeline de raisonnement.
4. Intégration de la visualisation causale.

### Phase 3 : Polissage & Démo (Hackathon Ready)
1. Intégration des micro-animations pour rendre le processus "vivant".
2. Gestion des états de chargement (Simuler le "travail" des agents).
3. Test avec des scénarios de décision complexes.

---

## 📂 Organisation des Dossiers (Architecture)
- `architecture/decomposition.md` : Ce document.
- `architecture/prompts/` : Stockage des instructions "system" pour Gemini.
- `architecture/features/` : Spécifications détaillées par fonctionnalité.
