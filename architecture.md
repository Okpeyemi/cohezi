# 🏗️ Cohezi — Architecture de Réalisation

## 🎯 Objectif du document

Ce document décrit **l’architecture de réalisation technique et logique** du projet **Cohezi**.

Il sert de référence pour :

* l’implémentation concrète
* la compréhension du rôle de chaque composant
* la justification technique face au jury

Ce n’est **pas** un document marketing, mais une **spécification d’architecture orientée raisonnement**.

---

## 🧠 Principe d’Architecture

Cohezi est conçu comme un **système de raisonnement orchestré**, et non comme une application conversationnelle.

Principes clés :

* Gemini 3 = moteur central de raisonnement
* Raisonnement distribué en agents spécialisés
* Orchestration explicite et traçable
* Sorties structurées (JSON → UI)
* Aucune dépendance à un RAG ou base vectorielle

---

## 🧩 Vue d’Ensemble du Système

```
[ Frontend (UI Raisonnement) ]
            ↓
[ API Backend / Orchestrator Layer ]
            ↓
[ Gemini 3 – Reasoning Core ]
            ↓
┌──────────────────────────────────┐
│ Multi‑Agent Reasoning Subsystem  │
│  • Logical Agent                 │
│  • Causal Agent                  │
│  • Risk Agent                    │
│  • Skeptic Agent                 │
│  • Stress‑Test Agent             │
└──────────────────────────────────┘
            ↓
[ Synthesis & Structuring Layer ]
            ↓
[ UI Visualization Engine ]
```

---

## 🖥️ Frontend — Reasoning UI Layer

### Rôle

* Capturer une **décision + raisonnement humain**
* Visualiser le raisonnement comme un **processus séquentiel**
* Afficher agents, chaînes causales et conflits

### Caractéristiques

* Aucun champ de chat
* Navigation par étapes
* Cards par agent
* Visualisation causale simple (graph / timeline)

### Technologies recommandées

* Next.js / React
* Tailwind CSS (design sobre)
* D3.js ou pseudo‑graphe statique (optionnel)

---

## 🔌 Backend — Orchestration Layer

### Rôle

Le backend ne décide rien.
Il **oriente, structure et contrôle** les appels Gemini.

Responsabilités :

* Validation de l’entrée utilisateur
* Injection des system prompts
* Déclenchement séquentiel et parallèle des agents
* Gestion de l’état de raisonnement
* Normalisation des sorties

### Composants

* API routes (Node.js)
* State manager (JSON en mémoire)
* Agent dispatcher

---

## 🤖 Gemini 3 — Reasoning Core

### Rôle central

Gemini 3 agit comme :

* orchestrateur cognitif
* moteur de raisonnement long
* simulateur causal
* synthétiseur de conflits

Aucune logique métier n’est codée en dur :
👉 **le raisonnement est délégué au modèle**.

---

## 🧠 Reasoning Orchestrator (Gemini Call #1)

### Entrée

* Décision brute
* Raisonnement utilisateur

### Objectifs

* Résumer la décision
* Extraire les hypothèses
* Identifier la structure logique
* Générer les missions des agents

### Sortie (exemple)

```json
{
  "decision_summary": "...",
  "assumptions": ["..."],
  "agent_tasks": {
    "logical": "...",
    "causal": "...",
    "risk": "...",
    "skeptic": "...",
    "stress": "..."
  }
}
```

---

## 🧩 Multi‑Agent Reasoning Subsystem

Chaque agent est invoqué **indépendamment**, avec :

* le contexte global
* une mission stricte
* des règles de non‑décision

### Agents et responsabilités

| Agent             | Responsabilité principale |
| ----------------- | ------------------------- |
| Logical Agent     | Cohérence interne         |
| Causal Agent      | Chaînes cause → effet     |
| Risk Agent        | Points de défaillance     |
| Skeptic Agent     | Hypothèses et biais       |
| Stress‑Test Agent | Robustesse extrême        |

### Contraintes

* Aucun agent ne peut recommander une décision
* Sorties strictement structurées

---

## 🔗 Causal Decomposition Engine

### Fonction

Transformer chaque hypothèse en **structure causale explicite**.

### Étapes

1. Identification de la cause initiale
2. Effet direct attendu
3. Effets secondaires
4. Dépendances critiques
5. Points de fragilité

### Sortie normalisée

```json
{
  "assumption": "...",
  "causal_chain": ["cause", "effect", "second_order_effect"],
  "fragility_point": "..."
}
```

---

## 🧪 Human Reasoning Stress Test Layer

### Fonction

Comparer :

* raisonnement humain
* raisonnement structurel généré

### Analyse

* raccourcis logiques
* ambiguïtés
* sur‑généralisations
* biais cognitifs

👉 L’objectif est l’**évaluation**, pas la correction.

---

## 🧠 Synthesis & Verdict Layer (Gemini Call Final)

### Objectifs

* Consolider les résultats des agents
* Identifier convergences et conflits
* Extraire les risques dominants

### Sortie

* chemins de décision conditionnels
* aucun classement
* aucune recommandation finale

```json
{
  "critical_flaws": ["..."],
  "decision_paths": [
    {
      "path": "A",
      "valid_if": "...",
      "fails_if": "..."
    }
  ]
}
```

---

## 📊 Gestion de l’État

* État stocké sous forme JSON
* Identifiant unique par analyse
* Pas de persistance requise

Cela permet :

* traçabilité du raisonnement
* affichage progressif
* clarté pour la démo

---

## 🚫 Choix Architecturaux Volontaires

* ❌ Pas de RAG
* ❌ Pas de base vectorielle
* ❌ Pas de chatbot
* ❌ Pas d’agent auto‑exécutant des actions

Ces choix sont alignés avec les recommandations du hackathon.

---

## 🧪 Architecture de Démo (Optimisée Jury)

* Données mockées possibles
* Graphe causal simplifié
* Appels Gemini réels pour l’orchestration

Objectif :

> Montrer **le raisonnement**, pas la performance produit.

---

## 🧠 Résumé Architectural

Cohezi est une architecture :

* orientée raisonnement
* distribuée en agents cognitifs
* orchestrée par Gemini 3
* transparente pour l’humain

Elle transforme l’IA d’un **outil de réponse** en un **système d’évaluation cognitive**.
