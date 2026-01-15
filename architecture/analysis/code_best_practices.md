# 🛠️ Audit de Qualité & Normes de Développement

## 🎯 Objectifs de Code Quality
Pour transformer Cohezi d'un prototype en un système robuste, nous imposons les normes de développement suivantes.

---

## � Normes de Structure & Métriques

### 1. Granularité des Fichiers (Modularity)
- **Limite de taille** : Aucun fichier ne doit dépasser **150 à 200 lignes**. 
- **Règle de Division** : Si un composant ou une fonction dépasse cette limite, il doit être décomposé en sous-composants ou en utilitaires extraits.
- **Responsabilité Unique** : Un fichier = Une fonction / Un composant. Ne mélangez pas la logique métier, les styles complexes et le rendu dans un seul fichier.

### 2. Organisation des Dossiers
- `components/ui/` : Composants de base (Radix, boutons, inputs).
- `components/analysis/` : Composants métier spécifiques à l'Arène et au Verdict.
- `services/` : Logique purement métier et orchestrations (ex: calls API Gemini).
- `types/` : Définitions TypeScript partagées.

---

## 🔍 Points de Refactorisation Immédiats

### 1. Éclatement de `page.tsx`
Le fichier `webapp/app/page.tsx` fait plus de 350 lignes. Il doit être divisé en :
- `ArenaContainer.tsx` (Gestion de l'état global)
- `AgentReportList.tsx` (Rendu de la liste d'agents)
- `VerdictSidebar.tsx` (Panneau droit de synthèse)

### 2. Centralisation du Typage
- Suppression systématique des `any`.
- Création de `webapp/types/analysis.ts` pour garantir que tout le triptyque de raisonnement utilise la même interface de données.

### 3. Abstraction de l'IA (Backend Service)
- Sortir les appels Gemini de `route.ts`.
- Créer `services/GeminiOrchestrator.ts` pour gérer le lock-in technologique et le raffinage des prompts.

---

## 💎 Principes "Gemini-Core"
- **Prompt Isolation** : Les prompts ne sont pas des chaînes de caractères perdues dans le code, mais des ressources versionnées et traitées comme du code source de haute importance.
- **Immutable Results** : Une fois l'analyse terminée, les données sont traitées comme immuables pour garantir la cohérence d'affichage.
