import { NextRequest, NextResponse } from "next/server";
import { AnalysisService } from "../../../services/AnalysisService";

const analysisService = new AnalysisService();

export const maxDuration = 300; // Allow 300 seconds for complex AI orchestration
export const dynamic = 'force-dynamic';

const allowedOrigins = [
    "http://localhost:3000",
    process.env.ALLOWED_ORIGIN
].filter(Boolean);

function getCorsHeaders(request: NextRequest) {
    const origin = request.headers.get("origin") || "";
    // Si l'origine est dans la liste blanche, on la renvoie. Sinon on renvoie la première par défaut (ou null)
    const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

    return {
        "Access-Control-Allow-Origin": allowedOrigin || "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
}

export async function OPTIONS(request: NextRequest) {
    return new NextResponse(null, {
        status: 204,
        headers: getCorsHeaders(request),
    });
}

function corsResponse(data: any, request: NextRequest, status = 200) {
    return NextResponse.json(data, {
        status,
        headers: getCorsHeaders(request)
    });
}

export async function POST(req: NextRequest) {
    try {
        const { decision, reasoning } = await req.json();

        if (!decision) {
            return corsResponse({ error: "Decision is required" }, req, 400);
        }

        const result = await analysisService.analyze(decision, reasoning);

        return corsResponse({
            id: crypto.randomUUID(),
            ...result,
            timestamp: new Date().toISOString()
        }, req);

    } catch (error: any) {
        console.error("Analysis error:", error);
        return corsResponse({ error: error.message || "Internal Server Error" }, req, 500);
    }
}
