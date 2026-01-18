# 🧠 Stratégie Multi-Modèle & Critique Architecturale

## 1. Analyse du Problème : Le Biais d'Homogénéité
Votre raisonnement est **extrêmement pertinent et techniquement juste**.

Dans un système multi-agents homogène (où tous les agents utilisent le même LLM, ex: `gemini-3-flash`), on s'expose au **"Biais de Consensus Artificiel"**.
- **Angle Mort Partagé** : Si le modèle a une faiblesse systémique sur un concept (ex: raisonnement causal complexe), *tous* les agents échoueront simultanément, mais valideront les erreurs des uns et des autres.
- **Fausse Certitude** : La synthèse verra 5 agents d'accord entre eux et conclura à une probabilité de 99%, alors que c'est une hallucination collective.

**Verdict** : Utiliser un modèle "Flash" (optimisé pour la vitesse/coût) pour le raisonnement profond (Deep Reasoning) est risqué pour une application de prise de décision critique.

---

## 2. La Solution : Architecture Hybride (Tiering)
Votre proposition d'utiliser une architecture multi-modèles (Tiered Architecture) est la **bonne approche** pour maximiser à la fois la qualité ("Smart") et la réactivité ("Fast").

### 🚀 Nouvelle Distribution Proposée

| Phase | Modèle Suggéré | Pourquoi ? |
| :--- | :--- | :--- |
| **1. Orchestration** | **Gemini 3 Pro** | Nécessite la plus grande capacité de compréhension de l'intention floue de l'utilisateur. C'est le "Chef d'Orchestre" qui ne doit pas se tromper de partition. |
| **2. Agents Cognitifs** | **Gemini 3 Pro** | Chaque agent (Logical, Causal, Risk) doit effectuer un raisonnement en profondeur (Chain-of-Thought). Le modèle Pro réduit drastiquement les hallucinations ici. |
| **3. Synthèse** | **Gemini 3 Flash** | La synthèse est une tâche de "résumé et formatage" plus que de découverte. Le modèle Flash excelle à digérer beaucoup de contexte (les 5 rapports) et à produire du JSON structuré rapidement. |

**Gain espéré** :
- **Robustesse** : +40% de fiabilité sur les cas complexes (estimation).
- **Coût** : Augmentation maîtrisée (seuls les agents "penseurs" coûtent cher, la synthèse reste low-cost).
- **Latence** : Légère augmentation, mais acceptable pour une analyse approfondie.

---

## 3. L'Ajout Visuel : Generative UI
L'intégration de `gemini-3-pro-image-preview` (ou équivalent Imagen) est une excellente idée pour le **"Visual Grounding"**.
Parfois, un utilisateur ne "voit" pas les conséquences.
- **Usage** : Générer une image métaphorique du "Risk Scenario" ou du "Future State".
- **Exemple** : Si la décision mène à un burn-out d'équipe, générer une image sombre et chaotique d'un bureau pour marquer l'esprit.

---

## 4. Piste d'Implémentation Technique

Il faudra refactoriser `lib/gemini.ts` pour accepter un paramètre de configuration de modèle dynamique.

```typescript
// Pseudo-code conceptuel
type ModelTier = 'fast' | 'reasoning' | 'creative';

export async function callGemini(..., tier: ModelTier = 'fast') {
  // Mapping vers les vrais modèles disponibles (Google AI Studio)
  const modelName = tier === 'reasoning' 
    ? "gemini-2.0-pro-exp-02-05" // ou gemini-1.5-pro selon dispo
    : "gemini-2.0-flash-exp";     // ou gemini-1.5-flash
  
  // ... instantiation
}
```

### Conclusion
**Go for it.** C'est une évolution mature de l'architecture qui fait passer Cohezi d'un "wrapper IA" à un véritable **système cognitif résilient**.
