import { callGeminiJSON } from "../lib/gemini";
import { loadPrompt } from "../utils/prompt-loader";

export class AnalysisService {
    // Instruction universelle pour forcer la langue de réponse
    private readonly LANGUAGE_INSTRUCTION = `
IMPORTANT: You must output your analysis in the SAME language as the user's decision (e.g. if the decision is in English, respond in English; if French, in French). 
This overrides the language of the system prompt. Maintain the JSON structure rigorously.`;

    async analyze(decision: string, reasoning: string) {
        const userInput = `DÉCISION/DECISION: ${decision}\nRAISONNEMENT/REASONING: ${reasoning || "Non fourni / Not provided"}`;

        // Phase 1: Orchestration
        let orchestratorPrompt = loadPrompt("orchestrator.md");
        orchestratorPrompt += `\n\n${this.LANGUAGE_INSTRUCTION}`;

        console.log("[AnalysisService] Starting Orchestration (Model: Pro)...");
        const orchestration = await callGeminiJSON(userInput, orchestratorPrompt, [], 'reasoning');

        // Phase 2: Multi-Agent Analysis with Dependencies (Recursive)
        // Parallel group 1: Foundations
        console.log("[AnalysisService] Starting Multi-Agent Phase 1...");
        const foundations = await Promise.all([
            this.runAgent("logical", orchestration.agent_tasks.logical, userInput),
            this.runAgent("causal", orchestration.agent_tasks.causal, userInput),
            this.runAgent("risk", orchestration.agent_tasks.risk, userInput),
        ]);

        const [logicalReport, causalReport, riskReport] = foundations;

        // Recursive group 2: Challenge & Stress
        // Skeptic depends on Logical + User Input
        // Stress-test depends on Risk + User Input
        console.log("[AnalysisService] Starting Multi-Agent Phase 2 (Recursive)...");
        const [skepticReport, stressReport] = await Promise.all([
            this.runAgent("skeptic", orchestration.agent_tasks.skeptic, `${userInput}\n\nRAPPORT LOGIQUE À CONTESTER: ${JSON.stringify(logicalReport)}`),
            this.runAgent("stress", orchestration.agent_tasks.stress, `${userInput}\n\nPOINTS DE RISQUES À AMPLIFIER: ${JSON.stringify(riskReport)}`),
        ]);

        const allReports = [logicalReport, causalReport, riskReport, skepticReport, stressReport];

        // Phase 3: Synthesis
        console.log("[AnalysisService] Starting Synthesis (Model: Flash)...");
        let synthesisPrompt = loadPrompt("synthesis.md");
        synthesisPrompt += `\n\n${this.LANGUAGE_INSTRUCTION}`;

        const synthesisInput = `
            RAPPORT ORCHESTRATEUR: ${JSON.stringify(orchestration)}
            RAPPORTS DES AGENTS: ${JSON.stringify(allReports)}
        `;
        const verdict = await callGeminiJSON(synthesisInput, synthesisPrompt, [], 'fast');

        return {
            orchestration,
            agents: allReports,
            verdict
        };
    }

    private async runAgent(name: string, mission: string, context: string) {
        let agentPrompt = loadPrompt("agents.md", { NOM_DE_L_AGENT: name });
        agentPrompt += `\n\n${this.LANGUAGE_INSTRUCTION}`;

        const input = `MISSION Spécifique: ${mission}\nCONTEXTE: ${context}\n\nNOTE: Tu as accès à un outil de recherche Google via 'googleSearch'. Utilise-le pour vérifier les faits et enrichir ton analyse.`;

        // Define the tool
        // Note: For native Gemini Grounding, we pass it in the tools array.
        const tools = [
            { googleSearch: {} } // Activate Google Search Grounding
        ];

        // On force Gemini à trouver un "rationale" interne (CoT) pour améliorer la qualité
        // Ce champ ne sera pas forcément affiché à l'utilisateur mais garantit la réflexion.
        // Utilisation du modèle 'reasoning' (Pro) pour les agents cognitifs
        return callGeminiJSON(input, agentPrompt, tools, 'reasoning');
    }
}

