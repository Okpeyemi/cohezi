# Plan de Migration : Backend vers Webapp & Streaming AI

Ce document détaille les étapes pour fusionner le projet `backend` dans `webapp` et migrer vers le SDK Vercel AI pour activer le streaming.

## 🎯 Objectifs
1.  Supprimer la duplication de code et d'infrastructure (`backend` séparé).
2.  Améliorer la latence (suppression du saut réseau).
3.  Activer le **Streaming** pour un retour utilisateur progressif.

---

## 📦 Phase 1 : Préparation & Dépendances

### 1.1 Installation des paquets dans `webapp`
Nous devons installer les dépendances nécessaires pour Gemini et le SDK AI.

```bash
cd webapp
npm install @google/generative-ai ai zod
```

### 1.2 Structure des dossiers
Réorganisation recommandée des fichiers pour une architecture Next.js propre ("Feature-based" ou "Layer-based") :

```text
webapp/
├── app/
│   └── api/
│       └── analyze/       <-- Nouvelle Route API (Streaming)
├── lib/
│   ├── ai/               <-- Logique IA (ex-backend/services)
│   │   ├── gemini.ts     <-- Client Gemini shared (ex-backend/lib)
│   │   └── orchestration.ts <-- Service d'analyse
│   └── prompts/          <-- Prompts migrés pour accès runtime
└── ...
```

---

## 🚚 Phase 2 : Migration du Code

### 2.1 Déplacement des Prompts (Uniquement ceux utilisés)
Les prompts nécessaires au fonctionnement de l'application (ex: `orchestrator.md`, `agents.md`, `synthesis.md`) doivent être accessibles au runtime.
*   **Action** : Copier **uniquement** les fichiers utilisés par `AnalysisService` depuis `architecture/prompts` vers `webapp/lib/prompts`.
*   **Fichiers à copier** : `orchestrator.md`, `agents.md`, `synthesis.md`.
*   **Fichiers exclus** : `migration-plan-backend-to-webapp.md` et autres docs d'architecture inutiles au runtime.
*   **Pourquoi** : Pour garantir leur présence dans le bundle de production tout en gardant l'application légère.

### 2.2 Migration de `gemini.ts`
*   Copier `backend/lib/gemini.ts` vers `webapp/lib/ai/gemini.ts`.
*   Mettre à jour les variables d'environnement (`GEMINI_API_KEY`) dans `.env.local` de `webapp`.

### 2.3 Adaptation de `AnalysisService` pour le Streaming (Vercel AI SDK)
C'est le changement majeur. Au lieu de tout attendre (`await Promise.all`), nous allons utiliser `StreamData` du SDK AI pour envoyer l'avancement au frontend.

**Nouveau concept :**
L'analyse se fait en plusieurs étapes. Le streaming permet d'envoyer des "updates" JSON partiels ou des événements.

**Approche recommandée avec `ai` SDK :**
Utiliser `createDataStreamResponse` (Next.js 15+ / AI SDK 4) ou `StreamData` (AI SDK 3).

```typescript
// Exemple conceptuel pour webapp/app/api/analyze/route.ts
import { streamObject, streamText, StreamData } from 'ai';
import { google } from '@ai-sdk/google'; // Si on utilise le provider Google officiel du SDK AI

export async function POST(req: Request) {
  const { decision, reasoning } = await req.json();
  const data = new StreamData();

  // 1. Démarrer le stream immédiatement
  data.append({ status: 'starting', message: 'Analyse initiale...' });

  // Lancer le traitement en asynchrone (non-bloquant pour le premier octet)
  (async () => {
    try {
      // Phase 1: Orchestration
      const orchestrator = await callOrchestrator(decision); 
      data.append({ status: 'orchestration', result: orchestrator });

      // Phase 2: Agents Parallèles
      const agents = await runParallelAgents(orchestrator);
      data.append({ status: 'agents', count: agents.length });

      // Phase 3: Synthèse (Streaming du texte final ?)
      // Ici on peut streamer le texte de la synthèse directement
      const synthesis = await generateSynthesis(orchestrator, agents);
      data.append({ status: 'complete', synthesis });
    } catch (e) {
      data.append({ status: 'error', error: e.message });
    } finally {
      await data.close();
    }
  })();

  return data.toResponse();
}
```

*Alternative plus simple (Migration isochrone)* :
Garder `AnalysisService` tel quel au début, et le transformer en *Server Action*.

---

## 🔄 Phase 3 : Mise à jour du Frontend (`webapp`)

### 3.1 Utilisation de `useCompletion` ou `useChat`
Dans `ConclusionModal.tsx` ou `InputPanel.tsx` :

```typescript
import { useCompletion } from 'ai/react';

const { complete, completion, isLoading, data } = useCompletion({
  api: '/api/analyze',
  onFinish: (prompt, result) => {
    // Mise à jour du state final
  }
});

// `data` contiendra les mises à jour en temps réel (ex: "Analyse logique terminée...")
// `completion` contiendra le texte streamé s'il y en a.
```

---

## ✅ Checklist d'exécution

- [ ] **Dépendances** : Installer `@google/generative-ai ai zod` dans `webapp`.
- [ ] **Fichiers** : Déplacer `lib/gemini.ts` et `utils/prompt-loader.ts`.
- [ ] **Prompts** : Déplacer les fichiers `.md` dans `webapp/prompts`.
- [ ] **Service** : Refactoriser `AnalysisService` pour accepter un `StreamData` writer (optionnel) ou simplement retourner l'objet.
- [ ] **API** : Créer `app/api/analyze/route.ts`.
- [ ] **Frontend** : Brancher le composant UI sur la nouvelle API.
- [ ] **Nettoyage** : Supprimer le dossier `backend`.

---

## ⚠️ Points d'attention
*   **Google Provider** : Le SDK Vercel AI a un provider spécifique `@ai-sdk/google`. Il est souvent plus simple à utiliser pour le streaming que le package `@google/generative-ai` brut, mais ton code actuel utilise le package brut.
    *   *Conseil* : Dans un premier temps, garde ton implémentation `gemini.ts` actuelle pour ne pas tout casser. Tu peux streamer des données manuelles autour.
    *   *Futur* : Migrer vers `@ai-sdk/google` pour bénéficier du `streamObject` natif.
