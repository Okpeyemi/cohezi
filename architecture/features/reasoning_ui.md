# 🎨 Feature: Reasoning UI

## Description
L'interface utilisateur de Cohezi doit refléter la profondeur du processus de réflexion. Elle évite le paradigme du "chat" pour privilégier une "Timeline de Raisonnement".

## Layout : Le "Triptyque de Raisonnement"
L'interface est divisée en **trois panneaux redimensionnables (resizable)** pour offrir une visibilité totale sur le cycle de vie de la décision :

1. **Panneau Gauche : L'Intention (Input)**
    - Formulaire structuré pour capturer la décision.
    - Édition en temps réel du raisonnement initial.
    - État : Toujours accessible pour permettre des itérations rapides.

2. **Panneau Central : L'Arène (Process)**
    - Affichage de l'orchestration en temps réel.
    - Cartes d'agents dynamiques (HugeIcons animés).
    - Visualisation des chaînes causales au coeur du processus.
    - État : S'anime et se peuple pendant l'analyse.

3. **Panneau Droit : Le Verdict (Output)**
    - Synthèse finale consolidée.
    - Liste des failles critiques et scores de robustesse.
    - Chemins de décision conditionnels.
    - État : Se déverrouille une fois la synthèse terminée.

## Technologies Frontend
- **Framework** : Next.js (App Router).
- **Layout** : `react-resizable-panels` (ou équivalent Shadcn) pour les colonnes.
- **Icônes** : HugeIcons.
- **Animations** : Framer Motion pour les transitions entre états d'agents.

## Esthétique
- Couleurs : Noir, Blanc, Gris Acier, avec des accents de couleurs pour les agents (ex: Risk = Rouge/Orange, Logic = Bleu).
- Typographie : Figtree.
- Animations : Micro-interactions fluides lors du chargement des agents.
