import { callGeminiJSON } from "./gemini";
import { loadPrompt } from "./prompt-loader";

export class AnalysisService {
    // Instruction universelle pour forcer la langue de réponse
    private readonly LANGUAGE_INSTRUCTION = `
IMPORTANT: You must output your analysis in the SAME language as the user's decision (e.g. if the decision is in English, respond in English; if French, in French). 
This overrides the language of the system prompt. Maintain the JSON structure rigorously.`;

    async analyze(decision: string, reasoning: string) {
        const userInput = this.formatUserInput(decision, reasoning);

        // Phase 1: Orchestration
        const orchestration = await this.orchestrate(userInput);

        // Phase 2: Multi-Agent Analysis
        const foundations = await this.runFoundations(userInput, orchestration);
        const [logicalReport, causalReport, riskReport] = foundations;

        const challenges = await this.runChallenge(userInput, orchestration, logicalReport, riskReport);
        const [skepticReport, stressReport] = challenges;

        const allReports = [...foundations, ...challenges];

        // Phase 3: Synthesis
        const verdict = await this.synthesize(orchestration, allReports);

        return {
            orchestration,
            agents: allReports,
            verdict
        };
    }

    private formatUserInput(decision: string, reasoning: string) {
        return `DÉCISION/DECISION: ${decision}\nRAISONNEMENT/REASONING: ${reasoning || "Non fourni / Not provided"}`;
    }

    async orchestrate(userInput: string) {
        let orchestratorPrompt = loadPrompt("orchestrator.md");
        orchestratorPrompt += `\n\n${this.LANGUAGE_INSTRUCTION}`;
        console.log("[AnalysisService] Starting Orchestration (Model: Pro)...");
        return await callGeminiJSON(userInput, orchestratorPrompt, [], 'reasoning');
    }

    async runFoundations(userInput: string, orchestration: any) {
        console.log("[AnalysisService] Starting Multi-Agent Phase 1...");
        return await Promise.all([
            this.runAgent("logical", orchestration.agent_tasks.logical, userInput),
            this.runAgent("causal", orchestration.agent_tasks.causal, userInput),
            this.runAgent("risk", orchestration.agent_tasks.risk, userInput),
        ]);
    }

    async runChallenge(userInput: string, orchestration: any, logicalReport: any, riskReport: any) {
        console.log("[AnalysisService] Starting Multi-Agent Phase 2 (Recursive)...");
        return await Promise.all([
            this.runAgent("skeptic", orchestration.agent_tasks.skeptic, `${userInput}\n\nRAPPORT LOGIQUE À CONTESTER: ${JSON.stringify(logicalReport)}`),
            this.runAgent("stress", orchestration.agent_tasks.stress, `${userInput}\n\nPOINTS DE RISQUES À AMPLIFIER: ${JSON.stringify(riskReport)}`),
        ]);
    }

    async synthesize(orchestration: any, allReports: any[]) {
        console.log("[AnalysisService] Starting Synthesis (Model: Flash)...");
        let synthesisPrompt = loadPrompt("synthesis.md");
        synthesisPrompt += `\n\n${this.LANGUAGE_INSTRUCTION}`;

        const synthesisInput = `
            RAPPORT ORCHESTRATEUR: ${JSON.stringify(orchestration)}
            RAPPORTS DES AGENTS: ${JSON.stringify(allReports)}
        `;
        return await callGeminiJSON(synthesisInput, synthesisPrompt, [], 'fast');
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

