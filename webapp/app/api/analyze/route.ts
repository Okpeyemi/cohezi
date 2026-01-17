import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

export const maxDuration = 300;

export async function POST(req: NextRequest) {
    try {
        const { decision, reasoning, userId } = await req.json(); // Expect userId if auth is active, or handle anonymous

        if (!decision) {
            return NextResponse.json({ error: "Decision is required" }, { status: 400 });
        }

        const db = getAdminDb();
        const decisionsCollection = db.collection("decisions");
        const analysesCollection = db.collection("analyses");

        // 1. Create Decision Document (Pending)
        const decisionDoc = await decisionsCollection.add({
            userId: userId || "anonymous", // TODO: Enforce userId from session if required
            context: decision,
            reasoning: reasoning || "",
            createdAt: FieldValue.serverTimestamp(),
            status: "pending",
        });

        const decisionId = decisionDoc.id;

        // 2. Call the separate Backend Service
        // TODO: Ensure BACKEND_URL isn't exposed to client, but here we are server-side.
        const backendUrl = process.env.BACKEND_API_URL || "http://localhost:3001";

        console.log(`Proxying analysis to ${backendUrl}/api/analyze for decision ${decisionId}`);

        const backendResponse = await fetch(`${backendUrl}/api/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ decision, reasoning }),
        });

        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            // Mark as failed
            await decisionDoc.update({ status: "failed" });
            throw new Error(`Backend Error: ${backendResponse.status} - ${errorText}`);
        }

        const result = await backendResponse.json();

        // 3. Save Analysis Result and Update Decision
        await analysesCollection.add({
            decisionId: decisionId,
            orchestrationResult: result.orchestration || {},
            agentReports: result.agents || {},
            finalVerdict: result.verdict || {},
            createdAt: FieldValue.serverTimestamp(),
        });

        await decisionDoc.update({ status: "completed" });

        // Add decisionId to result for client reference
        return NextResponse.json({ ...result, decisionId });

    } catch (error: any) {
        console.error("Proxy Analysis Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
