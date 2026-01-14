import { NextRequest, NextResponse } from "next/server";
import { callGeminiJSON } from "@/lib/gemini";
import fs from "fs";
import path from "path";

// Helper to read prompt files from the architecture folder
function getPrompt(filename: string) {
    const filePath = path.join(process.cwd(), "..", "architecture", "prompts", filename);
    return fs.readFileSync(filePath, "utf-8");
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "http://localhost:3000",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}

export async function POST(req: NextRequest) {
    try {
        const { decision, reasoning } = await req.json();

        if (!decision) {
            return NextResponse.json(
                { error: "Decision is required" },
                {
                    status: 400,
                    headers: { "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "http://localhost:3000" }
                }
            );
        }

        // 1. Orchestration Phase
        const orchestratorPrompt = getPrompt("orchestrator.md");
        const userInput = `DÉCISION: ${decision}\nRAISONNEMENT: ${reasoning || "Non fourni"}`;

        console.log("--- Phase 1: Orchestration ---");
        const orchestrationResult = await callGeminiJSON(userInput, orchestratorPrompt);

        // 2. Multi-Agent Analysis Phase (Parallel)
        const agentPromptTemplate = getPrompt("agents.md");
        const agentNames = ["logical", "causal", "risk", "skeptic", "stress"];

        console.log("--- Phase 2: Multi-Agent Analysis ---");
        const agentPromises = agentNames.map(async (name) => {
            const mission = orchestrationResult.agent_tasks[name];
            const agentSystemPrompt = agentPromptTemplate.replace("[NOM_DE_L_AGENT]", name);
            const agentInput = `MISSION Spécifique: ${mission}\nCONTEXTE: ${userInput}`;

            return callGeminiJSON(agentInput, agentSystemPrompt);
        });

        const agentReports = await Promise.all(agentPromises);

        // 3. Synthesis Phase
        const synthesisPrompt = getPrompt("synthesis.md");
        const synthesisInput = `
      RAPPORT ORCHESTRATEUR: ${JSON.stringify(orchestrationResult)}
      RAPPORTS DES AGENTS: ${JSON.stringify(agentReports)}
    `;

        console.log("--- Phase 3: Synthesis ---");
        const finalVerdict = await callGeminiJSON(synthesisInput, synthesisPrompt);

        return NextResponse.json({
            id: crypto.randomUUID(),
            orchestration: orchestrationResult,
            agents: agentReports,
            verdict: finalVerdict,
            timestamp: new Date().toISOString()
        }, {
            headers: { "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "http://localhost:3000" }
        });

    } catch (error: any) {
        console.error("Analysis error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, {
            status: 500,
            headers: { "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "http://localhost:3000" }
        });
    }
}
