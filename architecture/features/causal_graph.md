# 📊 Feature: Causal Graph Visualization

## Description
Visualiser les chaînes causales identifiées par les agents (particulièrement le Causal Agent). L'objectif est de montrer graphiquement comment une cause entraîne un effet et quels sont les points de rupture.

## Spécifications
- **Format** : Arbre horizontal ou Timeline causale.
- **Éléments** :
    - Nodal (Cause Initial) -> Nodal (Effet direct) -> Nodal (Effet second ordre).
    - Lignes de connexion montrant la force de la causalité.
    - Points de fragilité marqués en surbrillance.
- **Interactivité** :
    - Au survol d'un noeud, afficher l'explication de l'agent.

## Technologies
- **Primaire** : CSS Grid/Flexbox pour un graphe statique propre.
- **Secondaire (si besoin)** : SVGs générés dynamiquement ou une librairie légère comme `react-flow` (si la complexité le justifie).
