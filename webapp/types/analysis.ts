export type Severity = "low" | "medium" | "high";

export interface Finding {
    point: string;
    explanation: string;
    severity: Severity;
    detailed_explanation: string; // Extra depth for the "Explain" feature
}

export interface CausalElement {
    cause: string;
    effect: string;
    confidence: number;
}

export interface AgentReport {
    agent_name: string;
    findings: Finding[];
    causal_elements?: CausalElement[];
    rationale?: string; // Hidden chain-of-thought for Gemini-Core
}

export interface CriticalFlaw {
    title: string;
    impact: string;
    evidence: string[];
    detailed_explanation: string;
    solution?: string; // Proposed solution specifically for critical flaws
}

export interface DecisionPath {
    path: string;
    valid_if: string;
    fails_if: string;
    robustness_score: number;
    detailed_explanation: string;
}

export interface FinalVerdict {
    critical_flaws: CriticalFlaw[];
    decision_paths: DecisionPath[];
    synthesis_summary: string;
}

export interface OrchestrationResult {
    decision_summary: string;
    assumptions: string[];
    agent_tasks: {
        logical: string;
        causal: string;
        risk: string;
        skeptic: string;
        stress: string;
    };
}

export interface AnalysisResponse {
    id: string;
    orchestration: OrchestrationResult;
    agents: AgentReport[];
    verdict: FinalVerdict;
    timestamp: string;
}
