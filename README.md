# 🧠 Cohezi

**Cohezi** n'est pas un chatbot. C'est un **moteur d'évaluation cognitive** conçu pour disséquer, stress-tester et visualiser la structure du raisonnement humain derrière une décision.

Utilisant la puissance de **Gemini 2.0 Flash**, Cohezi orchestre une équipe d'agents spécialisés pour identifier les angles morts, modéliser les chaînes de causalité et produire un verdict de résilience interactif.

---

## 🏗️ L'Architecture : Le Triptyque de Raisonnement

L'interface de Cohezi est divisée en trois panneaux redimensionnables, chacun représentant une étape du processus cognitif :

1.  **L'Intention (Gauche)** : Saisie structurée de votre décision et de vos hypothèses.
2.  **L'Arène (Centre)** : Visualisation du flux de causalité et rapports détaillés des 5 agents spécialisés.
3.  **Le Verdict (Droite)** : Synthèse finale, identification des failles critiques et chemins de décision avec indice de robustesse.

---

## 🤖 L'Équipe d'Analyse

Cohezi utilise une orchestration multi-agents stricte :
- **Logical Agent** : Traque les sophismes et les incohérences de structure.
- **Causal Agent** : Modélise les ondes de choc et les dépendances invisibles.
- **Risk Agent** : Identifie les points de rupture systémiques.
- **Skeptic Agent** : Déconstruit les biais cognitifs (ancrage, confirmation).
- **Stress-Test Agent** : Simule des scénarios de rupture extrêmes (Worst Case).

---

## ✨ Fonctionnalités Clés

- **Flux de Causalité Neural** : Un graphe schématique animé montrant comment votre décision se propage.
- **Deep Dive Interactif** : Chaque verdict peut être étendu pour obtenir une explication approfondie de l'IA.
- **Historique & Profil** : Sauvegarde automatique des analyses, recherche et gestion via un compte utilisateur.
- **UI Premium** : Design "Glassmorphism", animations staggered avec Framer Motion, et iconographie Lucide.
- **Orchestration Stricte** : Chaque agent est obligé de fournir une analyse critique (3-5 points min) pour garantir une valeur ajoutée maximale.

---

## 🔐 Authentification & Données

Cohezi intègre **Firebase Authentication** et **Firestore** pour offrir une expérience personnalisée :
- Connexion via Google.
- Persistance des décisions et des analyses.
- Gestion de profil utilisateur.
- Historique complet avec recherche et suppression.

---

## 🛠️ Stack Technique

- **Frontend** : Next.js 16 (Turbopack), Tailwind CSS 4, Framer Motion, Lucide React, Shadcn UI.
- **Backend/API** : Next.js API Routes + Express (Legacy).
- **Database** : Firebase Firestore & Authentication.
- **IA** : Google Gemini 2.0 Flash / 3.0 Flash Preview via SDK.
- **Layout** : `react-resizable-panels` pour une interface flexible.

---

## 🚀 Installation & Lancement

### 1. Cloner le projet
```bash
git clone <repo-url>
cd cohezi
```

### 2. Configuration (Backend)
Allez dans le dossier `backend` et créez votre fichier `.env` :
```env
GEMINI_API_KEY=votre_cle_api_ici
ALLOWED_ORIGIN=http://localhost:3000
```

### 3. Lancement
Dans deux terminaux séparés :

**Terminal 1 (Backend)** :
```bash
cd backend
npm install
npm run dev:3001
```

**Terminal 2 (Webapp)** :
```bash
cd webapp
npm install
npm run dev
```

### 4. Test
Utilisez les scénarios fournis dans `simulation/intentions.md` pour tester la profondeur d'analyse du système.

---

## 📝 Licence
Projet réalisé dans le cadre d'un Hackathon de démonstration de l'Advanced Agentic Coding.
