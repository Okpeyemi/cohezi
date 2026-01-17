# Prompt d'Implémentation : Migration Complète vers Firebase

Tu es un expert Senior React/Next.js spécialisé dans l'intégration de Firebase.
Ton objectif est de migrer toute la couche authentification et base de données de l'application Cohezi vers Firebase (Auth & Firestore), en remplaçant la stack actuelle (NextAuth, Drizzle, Vercel Postgres).

## Contexte Actuel
- **Framework** : Next.js 15 (App Router)
- **Base de données actuelle** : Vercel Postgres gérée avec Drizzle ORM (`webapp/db/schema.ts` contient les tables `users`, `accounts`, `decisions`, `analyses`).
- **Authentification actuelle** : NextAuth v5 (fichiers `webapp/auth.ts`, `webapp/actions/auth.ts`, `webapp/components/layout/Header.tsx` avec code commenté).
- **Problème** : L'auth est commentée/incomplète et nous voulons tout basculer sur Firebase pour simplifier la gestion et le temps réel.

## Objectifs de la Mission

### 1. Configuration et Nettoyage
1.  **Désinstaller** les dépendances obsolètes : `next-auth`, `@auth/drizzle-adapter`, `drizzle-orm`, `drizzle-kit`, `@vercel/postgres`, `pg`.
2.  **Installer** les nouvelles dépendances : `firebase`, `firebase-admin`, `react-firebase-hooks` (optionnel mais recommandé pour simplifier le code client).
3.  **Créer** la configuration Firebase :
    -   `webapp/lib/firebase/config.ts` : Initialisation de l'app client (Firebase SDK).
    -   `webapp/lib/firebase/admin.ts` : Initialisation du SDK Admin (pour les API Routes/Server Actions sécurisés).
    -   Prévoir l'utilisation des variables d'environnement (`NEXT_PUBLIC_FIREBASE_...` et `FIREBASE_ADMIN_PRIVATE_KEY` etc).

### 2. Authentification (Remplacement de NextAuth)
1.  **Créer un Context Provider** (`webapp/context/AuthContext.tsx`) qui écoute `onAuthStateChanged` de Firebase Auth et expose l'utilisateur connecté à toute l'app.
2.  **Implémenter le Login/Logout** :
    -   Créer des fonctions utilitaires dans `webapp/lib/firebase/auth.ts` : `signInWithGoogle()`, `logout()`.
3.  **Mettre à jour `Header.tsx`** :
    -   Décommenter et refactoriser le code du Header.
    -   Utiliser le hook `useAuth` (du contexte créé) pour afficher l'avatar utilisateur ou le bouton de connexion.
    -   Brancher les actions de connexion/déconnexion sur les fonctions Firebase.

### 3. Base de Données (Migration vers Firestore)
Le schéma relationnel actuel doit être adapté en collections NoSQL Firestore.

**Mapping des données :**
-   **Users** : Géré par Firebase Auth. (Optionnel : créer une collection `users` pour stocker des métadonnées supplémentaires si nécessaire, ex: `stripeCustomerId`).
-   **Decisions** (Table `decisions`) -> Collection `decisions`.
    -   Document ID : Auto-ID.
    -   Champs : `userId` (string), `context` (string), `createdAt` (Timestamp), `status` (string).
-   **Analyses** (Table `analyses`) -> Collection `decisions/{decisionId}/analyses` OU Collection racine `analyses` avec champ `decisionId`.
    -   *Recommandation* : Collection racine `analyses` pour requêter facilement, avec `decisionId` indexé.
    -   Champs : `decisionId` (string), `orchestrationResult` (Map/Object), `agentReports` (Map/Object), `finalVerdict` (Map/Object), `createdAt` (Timestamp).

### 4. Refactoring des API
Modifier les routes API existantes pour utiliser Firestore (via `firebase-admin`) au lieu de Drizzle.
1.  **`webapp/app/api/analyze/route.ts`** :
    -   Au lieu d'appeler le backend externe (si c'est le cas actuel) ou après l'avoir appelé, sauvegarder les résultats dans Firestore :
        -   Créer le doc `decision` avec `status: 'pending'`.
        -   Une fois l'analyse terminée, mettre à jour `decision` vers `completed` et créer le doc `analysis`.
2.  **`webapp/app/decision/[id]/page.tsx`** :
    -   Cette page doit maintenant récupérer les données depuis Firestore.
    -   Tu peux choisir de le faire côté serveur (Server Component) avec `firebase-admin` ou côté client avec `useEffect` et `getDoc`. Pour le SEO et la perf, le Server Component est préférable pour la récupération initiale.

## Instructions pour l'Agent d'Exécution
-   Procède étape par étape.
-   Commence par la configuration Firebase (`lib/firebase/*`).
-   Ensuite, mets en place l'Authentication (`AuthContext` + `Header`).
-   Enfin, migre la logique de base de données (`api` et pages).
-   **Ne supprime pas** le code existant brutalement, commente-le ou renomme-le tant que la nouvelle implémentation n'est pas vérifiée.
-   Assure-toi que les types TypeScript (`AnalysisResponse`, etc.) sont mis à jour ou compatibles avec les données Firestore (remplacer les Dates JS par Timestamp Firebase).

Génère le code nécessaire pour ces fichiers et explique où les placer.
