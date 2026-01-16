import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
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

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Proxy Analysis Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
