# 📄 Feature: Export PDF "Executive Summary"

## Objectif
Permettre à l'utilisateur de télécharger un **Executive Summary** propre et professionnel de l'analyse effectuée par Cohezi. Ce document doit pouvoir être partagé avec des parties prenantes (investisseurs, équipe, management).

## Contraintes & Tech Stack
- **Library** : `@react-pdf/renderer` (Solution robuste pour générer des PDFs côté client React).
- **Design** : Minimaliste, propre, "Black & White" ou avec des touches subtiles de la couleur de marque (Emerald).
- **Data** : Doit utiliser les données du `FinalVerdict` et de l'orchestration déjà présentes dans le frontend.

## Structure du Document PDF

### 1. Header
- Logo Cohezi.
- Date de l'analyse.
- Titre : "Rapport d'Analyse Décisionnelle".

### 2. Contexte (The "Intent")
- **Décision** : Le texte initial rentré par l'utilisateur.
- **Raisonnement** : Le contexte fourni.

### 3. Synthèse (The "Verdict")
- Un bloc encadré ou mis en avant avec le `synthesis_summary`.
- C'est le "TL;DR" pour le décideur.

### 4. Failles Critiques (Risks)
- Liste des failles identifiées (`critical_flaws`).
- Pour chaque faille :
    - Titre.
    - Impact.
    - Explication.
    - **Solution** (Prioritaire).

### 5. Chemins de Succès (Pathways)
- Tableau ou liste succincte des conditions pour que la décision fonctionne.
- Focus sur les conditions avec un score de robustesse élevé.

## Implémentation Components

### `components/pdf/AnalysisPDF.tsx`
Ce fichier contiendra la structure du document PDF (tags `<Document>`, `<Page>`, `<View>`, `<Text>` de `@react-pdf/renderer`).

### `components/pdf/DownloadRequestButton.tsx`
Un bouton dans l'interface (probablement dans le `VerdictSidebar` ou le `Header`) qui déclenche la génération et le téléchargement via `usePDF` ou `<PDFDownloadLink>`.

## Prompt d'Implémentation
1. Installer `@react-pdf/renderer`.
2. Créer le composant de document `AnalysisPDF`.
3. Styliser le PDF pour qu'il soit lisible et professionnel (police standard ou Helvetica).
4. Intégrer le bouton de téléchargement dans le `ConclusionModal` ou le `VerdictSidebar`.
