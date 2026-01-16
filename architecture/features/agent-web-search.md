# 🌍 Feature: Agent Web Search

## Objectif
Donner aux agents la capacité d'effectuer des recherches sur Internet pour :
1. Vérifier la véracité des affirmations de l'utilisateur.
2. Enrichir l'analyse avec des données contextuelles (tendances de marché, précédents historiques, actualités réglementaires).
3. Éviter les hallucinations en s'ancrant dans la réalité.

## Architecture Technique

### 1. Outil de Recherche (`backend/utils/search-tool.ts`)
Nous allons implémenter un outil ("Tool") que le modèle Gemini peut appeler.
D'expérience, l'utilisation de **Tavily AI** ou **Serper** est plus adaptée aux agents que Google Custom Search (moins de bruit, format optimisé pour les LLMs).
*Alternative* : Utiliser le "Grounding with Google Search" natif de Gemini si la clé API le permet.

**Choix proposé** : Utilisation du **Grounding Google Search** natif (si disponible via Google AI Studio) ou abstraction d'un outil de recherche simple.

### 2. Mise à jour du Wrapper Gemini (`backend/lib/gemini.ts`)
L'appel actuel `callGeminiJSON` est trop simple. Il faut l'étendre pour supporter :
- La déclaration de `tools`.
- La logique de "Function Calling" (si l'IA demande une recherche, le code exécute la recherche et renvoie le résultat à l'IA).

### 3. Mise à jour des Prompts (`simulation/prompts/agents.md`)
Les agents doivent savoir qu'ils ont accès à cet outil.
*Exemple d'instruction* :
> "Tu as accès à un outil de recherche. UTILISE-LE SYSTÉMATIQUEMENT pour vérifier les faits ou si l'utilisateur mentionne des événements récents."

### 4. Flux d'Exécution (`backend/services/AnalysisService.ts`)
Modifier `runAgent` pour :
1. Passer l'outil de recherche au modèle.
2. Gérer la boucle d'interaction (Modèle demande recherche -> Code exécute -> Code renvoie résultats -> Modèle finalise analyse).

## Étapes d'Implémentation
1.  [ ] Choisir et configurer le provider de recherche (Google Grounding ou API Tierce).
2.  [ ] Mettre à jour `gemini.ts` pour supporter les `tools`.
3.  [ ] Mettre à jour `AnalysisService.ts` pour gérer la boucle d'outils.
4.  [ ] Mettre à jour le prompt des agents pour encourager l'usage de la recherche.
