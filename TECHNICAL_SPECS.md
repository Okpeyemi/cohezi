# 📘 Spécifications Techniques Cohezi

Ce document détaille l'architecture technique, les modèles IA utilisés, et la structure interne du projet Cohezi.

---

## 🧠 Architecture IA & Agents

Cohezi repose sur une orchestration multi-agents stricte propulsée par **Google Gemini 2.0 Flash / 3.0 Flash Preview**.

### Modèle & Outils
- **Modèle Principal** : `gemini-3-flash-preview`.
- **Grounding** : Utilisation de l'outil `googleSearch` natif pour ancrer les hallucinations et vérifier les faits en temps réel.
- **Format de Sortie** : JSON Strict (`responseMimeType: "application/json"`).

### Workflow d'Analyse (The Cognitive Engine)
Le moteur d'analyse (`AnalysisService.ts`) suit un processus séquentiel et récursif :

1.  **Phase 1 : Orchestration**
    - **Rôle** : Analyse l'intention brute et définit les missions spécifiques pour chaque agent.
    - **Prompt** : `orchestrator.md`

2.  **Phase 2 : Analyse Multi-Agents (Hybride)**
    - *Groupe A (Parallèle)* :
        - **Logical Agent** : Détection des sophismes et incohérences.
        - **Causal Agent** : Cartographie des conséquences directes et indirectes (Ripple Effect).
        - **Risk Agent** : Identification des points de rupture.
    - *Groupe B (Récursif - dépend du Groupe A)* :
        - **Skeptic Agent** : Reçoit le rapport Logique et tente de le "debunker" (Biais cognitifs).
        - **Stress-Test Agent** : Reçoit le rapport Risque et simule un scénario catastrophe (Worst Case).
    - **Prompt Générique** : `agents.md` (injecté avec le rôle et le contexte spécifique).

3.  **Phase 3 : Synthèse & Verdict**
    - **Rôle** : Agrège tous les rapports pour produire un score de résilience et un verdict final.
    - **Prompt** : `synthesis.md`

---

## 🛠️ Stack Technique

### Frontend (`/webapp`)
- **Framework** : Next.js 16 (App Router, Turbopack).
- **Langage** : TypeScript.
- **Style** : Tailwind CSS 4, Shadcn UI (Radix Primitives).
- **Animation** : Framer Motion (Transitions complexes, Staggered lists).
- **Icônes** : Lucide React.
- **Gestion d'État** : React Context (`AuthContext`).
- **Layout** : `react-resizable-panels` pour l'interface 3-colonnes.

### Backend (`/backend`)
- **Framework** : Next.js API Routes (utilisé comme micro-service API).
- **Langage** : TypeScript.
- **Service Layer** : Architecture orientée services (`AnalysisService`, `GeminiLib`).
- **SDK IA** : `@google/generative-ai`.

### Base de Données & Auth
- **Fournisseur** : Firebase (Google Cloud).
- **Authentification** : Google Sign-In (`firebase/auth`).
- **Base de Données** : Cloud Firestore (`firebase/firestore`).
  - **Collection `decisions`** : Stocke l'intention, le statut et l'user ID.
  - **Collection `analyses`** : Stocke le résultat JSON complet (Orchestration, Agents, Verdict).

---

## 📂 Structure des Données (Firestore)

### Collection `decisions`
```json
{
  "id": "auto-generated",
  "userId": "string (uid)",
  "context": "string (Décision utilisateur)",
  "reasoning": "string (Contexte/Raisonnement)",
  "status": "pending" | "completed" | "failed",
  "createdAt": "Timestamp"
}
```

### Collection `analyses`
```json
{
  "id": "auto-generated",
  "decisionId": "string (ref -> decisions)",
  "orchestrationResult": { ... },
  "agentReports": [ ... ],
  "finalVerdict": { ... },
  "createdAt": "Timestamp"
}
```

---

## 🔑 Variables d'Environnement Requises

### Backend
- `GEMINI_API_KEY` : Clé API Google AI Studio.
- `ALLOWED_ORIGIN` : URL du frontend (CORS).
- `FIREBASE_SERVICE_ACCOUNT` : (Optionnel si admin SDK utilisé).

### Frontend
- `NEXT_PUBLIC_FIREBASE_API_KEY` : Clé publique Firebase.
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` : Domaine Auth.
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` : ID Projet.
- `NEXT_PUBLIC_API_URL` : URL de l'API Backend Proxy (interne Next.js).
