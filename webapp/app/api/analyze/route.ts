import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { decisions, analyses } from "@/db/schema";
import { eq } from "drizzle-orm";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        const { decision, reasoning } = await req.json();

        if (!decision) {
            return NextResponse.json({ error: "Decision is required" }, { status: 400 });
        }

        // Call the separate Backend Service
        // TODO: Ensure BACKEND_URL isn't exposed to client, but here we are server-side.
        const backendUrl = process.env.BACKEND_API_URL || "http://localhost:3001";

        console.log(`Proxying analysis to ${backendUrl}/api/analyze`);

        const backendResponse = await fetch(`${backendUrl}/api/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ decision, reasoning }),
        });

        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            throw new Error(`Backend Error: ${backendResponse.status} - ${errorText}`);
        }

        const result = await backendResponse.json();

        // Persist to Database if user is logged in
        // (Optional: Persist even for guests? Schema says userId is nullable)

        let decisionId: string | null = null;

        try {
            // 1. Save Decision
            const [savedDecision] = await db.insert(decisions).values({
                userId: userId || null,
                context: decision, // 'decision' input acts as context/title
                status: "completed",
            }).returning({ id: decisions.id });

            decisionId = savedDecision.id;

            // 2. Save Analysis
            await db.insert(analyses).values({
                decisionId: savedDecision.id,
                orchestrationResult: result.orchestration,
                agentReports: result.agents,
                finalVerdict: result.verdict,
            });

            console.log(`Saved analysis for decision ${decisionId}`);

        } catch (dbError) {
            console.error("Failed to save to DB:", dbError);
            // Don't fail the request if DB fails, just log it. 
            // The user still wants their analysis.
        }

        return NextResponse.json({
            ...result,
            saved_decision_id: decisionId
        });

    } catch (error: any) {
        console.error("Proxy Analysis Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
