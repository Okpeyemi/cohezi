import { AnalysisService } from '@/lib/ai/AnalysisService';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const analysisService = new AnalysisService();

export async function POST(req: Request) {
    const { decision, reasoning } = await req.json();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            const sendData = (data: any) => {
                // Vercel AI SDK Data Protocol: '2:[JSON]\n'
                // We send a JSON list with one element
                const text = `2:${JSON.stringify([data])}\n`;
                controller.enqueue(encoder.encode(text));
            };

            const sendStatus = (message: string) => {
                sendData({ type: 'status', message });
            };

            try {
                sendStatus('Initialization...');

                const userInput = `DÉCISION/DECISION: ${decision}\nRAISONNEMENT/REASONING: ${reasoning || "Non fourni / Not provided"}`;

                // Phase 1: Orchestration
                sendStatus('Orchestration de l\'analyse...');
                const orchestration = await analysisService.orchestrate(userInput);
                sendData({ type: 'orchestration', data: orchestration });

                // Phase 2: Foundations
                sendStatus('Analyse multi-agents en cours (Logique, Causalité, Risque)...');
                const foundations = await analysisService.runFoundations(userInput, orchestration);

                // Send partial results
                sendData({ type: 'agent_result', name: 'logical', data: foundations[0] });
                sendData({ type: 'agent_result', name: 'causal', data: foundations[1] });
                sendData({ type: 'agent_result', name: 'risk', data: foundations[2] });

                // Phase 2b: Challenges
                sendStatus('Contestation et Stress Test (Agents Sceptique & Stress)...');
                const challenges = await analysisService.runChallenge(userInput, orchestration, foundations[0], foundations[2]);

                sendData({ type: 'agent_result', name: 'skeptic', data: challenges[0] });
                sendData({ type: 'agent_result', name: 'stress', data: challenges[1] });

                // Phase 3: Synthesis
                sendStatus('Synthèse finale...');
                const allReports = [...foundations, ...challenges];
                const verdict = await analysisService.synthesize(orchestration, allReports);

                sendData({ type: 'synthesis', data: verdict });
                sendStatus('Analyse terminée');

            } catch (error: any) {
                console.error("Streaming analysis error:", error);
                sendData({ type: 'error', message: error.message || "An error occurred" });
            } finally {
                controller.close();
            }
        }
    });

    return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
