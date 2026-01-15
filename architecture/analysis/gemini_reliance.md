# 🎯 Analyse de Dépendance : Gemini-Core

## Question : Le projet respecte-t-il l'utilisation de Gemini comme coeur ?
**Réponse : Actuellement, partiellement.** 

### Situation Actuelle
Le système utilise Gemini pour l'orchestration, l'analyse multi-agents et la synthèse. Cependant, l'implémentation actuelle pourrait être portée sur d'autres modèles (GPT-4o, Claude 3.5) sans changement structurel majeur, car elle repose sur des appels JSON standard.

### Pourquoi Gemini 2.0/3 est le moteur idéal pour Cohezi ?
1. **Context Window Massive** : Gemini permet de garder en mémoire des centaines de pages de contexte (historique de décision, théories cognitives complexes) là où d'autres saturent.
2. **Flash Speed vs Reasoning** : L'utilisation de `gemini-2.0-flash` permet une orchestration parallèle ultra-rapide (indispensable pour 5 agents en temps réel).
3. **Structured Output Natif** : Gemini 2.0 a une fidélité exceptionnelle aux schémas JSON complexes, ce qui est le squelette de notre Arena.

---

## 🏗️ Stratégie de "Verrouillage" (Gemini-Core Enforcement)

Pour rendre Gemini **irremplaçable** dans Cohezi, nous allons implémenter :

### 1. Raisonnement Récursif Dépendent (Gemini-Specific)
Au lieu d'appels 100% parallèles, nous allons créer des dépendances :
- L'agent **Sceptique** examine les `findings` de l'agent **Logique** en temps réel.
- Cette chaîne de pensée profite de la vitesse de Gemini 2.0 Flash pour rester réactive.

### 2. Inner-Monologue JSON (Double validation)
Forcer Gemini à produire un champ `"rationale_chain_of_thought"` caché dans chaque réponse JSON. Cela utilise la capacité de raisonnement étendue (CoT) de Gemini pour améliorer la qualité des `findings`.

### 3. Exploitation du Context Cache
Pré-charger les théories de psychologie cognitive et de logique formelle dans le contexte de Gemini (via System Instructions massives) pour que les analyses ne soient pas génériques, mais basées sur des frameworks que seul Gemini peut gérer efficacement à grande échelle.

### 4. Feed-forward Synthesis
La synthèse finale ne se contentera pas de lire les rapports, elle "re-discutera" avec l'orchestrateur les points de conflit identifiés, créant un cycle de réflexion que seul un modèle à haute fenêtre de contexte peut maintenir sans perte d'information.

---

## 📐 Architecture au Service de Gemini (Coding Standards)

Pour que Gemini reste le coeur efficace du système, l'architecture doit respecter des contraintes de propreté strictes :

### 1. Granularité Extrême (Atomic Prompts)
- **Règle** : Aucun fichier de code ou de prompt ne doit être massif. 
- **Métriques** : Limite stricte de **150 à 200 lignes par fichier**. 
- **Bénéfice** : Des fichiers courts permettent à l'IA d'analyser le code plus vite et avec plus de précision lors des phases de maintenance ou d'évolution ("Contextual Precision").

### 2. Découpage en Micro-Services Internes
- L'orchestration doit être isolée dans une couche de service dédiée (`backend/services/`). 
- Cela évite la dilution de la logique Gemini dans le transport HTTP (API routes), rendant le "coeur" IA plus pur et robuste.

### 3. Modularité du Triptyque
- Le frontend doit être éclaté en composants atomiques (`AgentCard`, `CausalSVG`, `VerdictSidebar`).
- Cela permet d'injecter des optimisations spécifiques à Gemini (ex: streaming de texte, feedback loops) sans impacter l'ensemble de l'application.
