import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview", // Utilisation de Gemini 3 Flash Preview
});

/**
 * Helper to call Gemini with a structured JSON expectation and retry logic
 */
/**
 * Helper to call Gemini with a structured JSON expectation and retry logic
 */
export async function callGeminiJSON(prompt: string, systemInstruction?: string, tools: any[] = [], retries = 3) {
    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview", // Returned to Gemini 3 Flash Preview
        systemInstruction,
        tools: tools,
    });

    let lastError: any;
    for (let i = 0; i < retries; i++) {
        try {
            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                },
            });

            return JSON.parse(result.response.text());
        } catch (e: any) {
            lastError = e;
            console.error(`Gemini attempt ${i + 1} failed:`, e.message || e);

            // Si c'est une erreur de parsing JSON, on ne retente pas forcément car le contenu est peut-être invalide
            if (e instanceof SyntaxError) {
                // If it failed to parse, it might be because the model used a tool (Wait, we asked for JSON responseMimeType, so it should be JSON)
                // However, with tools, sometimes the flow is different.
                // For this implementation, we assume we use tools for grounding (Google Search) which returns enriched text/JSON.
                throw new Error("Invalid structure returned by AI");
            }

            // Attente exponentielle avant de réessayer (500ms, 1000ms, 2000ms...)
            if (i < retries - 1) {
                const delay = Math.pow(2, i) * 500;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError || new Error("Gemini call failed after multiple attempts");
}
