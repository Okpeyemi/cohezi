import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // Utilisation de flash 2.0 pour la réactivité
});

/**
 * Helper to call Gemini with a structured JSON expectation
 */
export async function callGeminiJSON(prompt: string, systemInstruction?: string) {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction,
    });

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
        },
    });

    try {
        return JSON.parse(result.response.text());
    } catch (e) {
        console.error("Failed to parse Gemini response as JSON:", result.response.text());
        throw new Error("Invalid structure returned by AI");
    }
}
