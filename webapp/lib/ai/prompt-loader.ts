import fs from "fs";
import path from "path";

export function loadPrompt(filename: string, variables: Record<string, string> = {}): string {
    // In Next.js (Node runtime), we can use process.cwd() to get the project root
    const filePath = path.join(process.cwd(), "lib", "prompts", filename);

    try {
        let content = fs.readFileSync(filePath, "utf-8");

        for (const [key, value] of Object.entries(variables)) {
            content = content.replace(new RegExp(`\\[${key}\\]`, "g"), value);
        }

        return content;
    } catch (error) {
        console.error(`Error loading prompt ${filename} from ${filePath}:`, error);
        throw error;
    }
}
