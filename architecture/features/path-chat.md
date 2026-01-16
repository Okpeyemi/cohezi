# 💬 Feature: Contextual Path Chat

## Objectif
Permettre à l'utilisateur de discuter avec une IA (Gemini) spécifiquement à propos d'un "Chemin de Résilience" proposé dans le verdict. L'IA doit avoir le contexte de la décision, du raisonnement et du chemin spécifique.

## Contraintes & Tech Stack
- **Framework** : Vercel AI SDK (`useChat`).
- **Provider** : Google Gemini.
- **UI** : Shadcn `Dialog` ou `Sheet`, `ScrollArea` pour les messages.
- **Context** : Le prompt système doit inclure :
    - La décision initiale.
    - Le raisonnement.
    - Le détail du chemin de résilience sélectionné.

## Architecture

### 1. Composant UI (`components/chat/PathChatDialog.tsx`)
- Un modal qui s'ouvre au clic sur un bouton dans `VerdictCard`.
- Affiche un historique de chat standard (User/AI).
- Input field pour poser des questions ("Comment appliquer concrètement ce chemin ?", "Quels sont les risques cachés ?").

### 2. API Route (`app/api/chat/route.ts`)
- Utilise `streamText` du Vercel AI SDK.
- Construit le prompt système dynamiquement avec les données envoyées dans le body de la requête initiale (ou via contexte de session si on stockait, mais ici on passera le contexte au démarrage).

### 3. Intégration Updates
- **`VerdictCard.tsx`** : Ajouter un bouton "Discuter avec l'IA" (Icône `MessageCircleQuestion`) uniquement si `type === "path"`.
- **`VerdictSidebar.tsx`** : Devra passer les `originalDecision` et `originalReasoning` au `VerdictCard` pour qu'il puisse les passer au Chat.
