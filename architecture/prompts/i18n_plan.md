# Plan d'Implémentation Internationalisation (i18n) - Cohezi Webapp

Ce document détaille la stratégie pour "internationaliser" l'application Next.js existante en utilisant `next-intl`.

## Objectif
Permettre à l'application de supporter plusieurs langues (FR / EN pour commencer) et d'ajouter un sélecteur de langue.

## Étapes Techniques

### 1. Installation & Configuration
- **Installation** : `npm install next-intl`
- **Messages** : Création du dossier `webapp/messages` avec `fr.json` et `en.json`.
- **Config** : 
    - Créer `webapp/src/i18n/request.ts` (ou `webapp/i18n.ts` selon la structure) pour charger les messages server-side.
    - Mettre à jour `next.config.ts` pour utiliser le plugin `createNextIntlPlugin`.

### 2. Middleware
- Créer `webapp/middleware.ts` pour gérer la détection de la locale et la redirection (ex: `/decision` -> `/fr/decision`).
- Configurer les `matcher` pour exclure `/api`, `/_next`, etc.

### 3. Refactoring du Routing (`app` directory)
Actuellement : `webapp/app/page.tsx`, `layout.tsx`, etc.
Transition vers : `webapp/app/[locale]/...`

- **Déplacer** : Déplacer `page.tsx`, `layout.tsx`, `decision/` à l'intérieur de `webapp/app/[locale]/`.
- **Layout Racine** : Garder un `webapp/app/layout.tsx` (ou `root-layout`) minimal si nécessaire, ou tout déplacer dans `[locale]`. On déplacera tout dans `[locale]` pour avoir les providers (Auth, Theme) englobés correctement avec la locale.
- **NotFound** : Gérer la page 404.

### 4. Extraction des Textes (Traductions)
Pour chaque page et **composant** (dans `webapp/components/` et `webapp/app/`) :
- Remplacer le texte en dur par des clés `t('key')`.
- Remplir `fr.json` (source actuelle) et `en.json` (traduction).

**Priorité des éléments à traduire** :
1.  **Landing Page** (`page.tsx`) (Titres, Boutons)
2.  **Composants Globaux** : `Header`, `Footer`, `Modals`.
3.  **Pages de Décision** : Formulaires, labels, messages d'erreur.
4.  **Feedback Utilisateur** : Toasts, messages de validation (Zod).

### 5. Composant Selecteur de Langue
- Créer un composant `LanguageSwitcher.tsx` dans le Header.
- Utiliser `useRouter` et `usePathname` de `next-intl/navigation` pour changer de locale sans perdre l'état ou l'URL.

## Structure des Fichiers (Cible)

```text
webapp/
├── messages/
│   ├── en.json
│   └── fr.json
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx      <-- Main Layout avec Providers + NextIntlClientProvider
│   │   ├── page.tsx        <-- Landing Page
│   │   └── decision/
│   │       └── ...
│   └── api/                <-- Reste en dehors de [locale]
├── middleware.ts           <-- Gestion I18n
├── i18n.ts                 <-- Config chargement
└── next.config.ts
```

## Validation
- Vérifier que `/fr` et `/en` chargent les bons textes.
- Vérifier que le cookie de préférence est stocké.
- Vérifier que les appels API ou Auth ne sont pas cassés par le préfixe d'URL.
