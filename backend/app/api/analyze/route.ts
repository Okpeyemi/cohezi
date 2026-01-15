import { NextRequest, NextResponse } from "next/server";
import { AnalysisService } from "../../../services/AnalysisService";

const analysisService = new AnalysisService();

export const maxDuration = 60; // Allow 60 seconds for complex AI orchestration
export const dynamic = 'force-dynamic';

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

function corsResponse(data: any, status = 200) {
    return NextResponse.json(data, {
        status,
        headers: { "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "http://localhost:3000" }
    });
}

export async function POST(req: NextRequest) {
    try {
        const { decision, reasoning } = await req.json();

        if (!decision) {
            return corsResponse({ error: "Decision is required" }, 400);
        }

        const result = await analysisService.analyze(decision, reasoning);

        return corsResponse({
            id: crypto.randomUUID(),
            ...result,
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        console.error("Analysis error:", error);
        return corsResponse({ error: error.message || "Internal Server Error" }, 500);
    }
}
