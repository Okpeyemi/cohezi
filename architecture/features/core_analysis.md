# 🛠️ Feature: Core Analysis Engine

## Description
Le moteur d'analyse est le coeur du backend. Il orchestre les appels à l'API Gemini 3 (flash-2.0 ou pro) pour transformer une entrée utilisateur en un rapport structuré.

## Flux de données
1. **Endpoint `POST /api/analyze`**
    - Input: `user_decision`, `user_reasoning`.
2. **Étape 1 : Orchestration**
    - Appel à Gemini avec `orchestrator.md`.
    - Récupère les missions JSON.
3. **Étape 2 : Analyse Parallèle**
    - 5 appels simultanés (un par agent) avec `agents.md` + mission spécifique.
    - Collecte des 5 réponses JSON.
4. **Étape 3 : Synthèse**
    - Appel à Gemini avec `synthesis.md` + tous les rapports précédents.
    - Génération du verdict final.

## Contraintes Techniques
- Utilisation de `zod` pour valider les schémas JSON retournés par Gemini.
- Gestion des timeouts (les appels parallèles peuvent être longs).
- Stockage temporaire en mémoire pour l'affichage progressif sur le frontend.
