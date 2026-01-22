
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

async function testModelJSON(modelName: string) {
    console.log(`Testing JSON mode for: ${modelName}...`);
    try {
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: { responseMimeType: "application/json" }
        });

        const result = await model.generateContent(
            "List 3 fruits in JSON format like { fruits: ['a','b'] }"
        );
        console.log(`✅ JSON Success with ${modelName}:`, result.response.text());
    } catch (error: any) {
        console.error(`❌ JSON Failed with ${modelName}:`, error.message);
    }
}

async function run() {
    await testModelJSON("gemini-3-pro-preview");
}

run();
