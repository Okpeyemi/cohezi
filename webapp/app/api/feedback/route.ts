import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { feedback, user } = await req.json();

        if (!feedback) {
            return NextResponse.json({ error: "Feedback is required" }, { status: 400 });
        }

        const apiKey = process.env.MAILEROO_API_KEY;
        const senderEmail = process.env.MAILEROO_SENDER_EMAIL || "no-reply@cohezi.com";
        const recipientEmail = "maqsoudt9@gmail.com";

        if (!apiKey) {
            console.error("Maileroo API key is missing");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const subject = `[Cohezi] Feedback from ${user?.displayName || "Anonymous"}`;
        const htmlContent = `
            <h3>New Feedback Received</h3>
            <p><strong>User:</strong> ${user?.displayName || "Anonymous"} (${user?.email || "No email"})</p>
            <p><strong>Feedback:</strong></p>
            <p>${feedback.replace(/\n/g, "<br>")}</p>
        `;

        const response = await fetch("https://smtp.maileroo.com/api/v2/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": apiKey,
            },
            body: JSON.stringify({
                from: {
                    address: senderEmail,
                    display_name: "Cohezi Feedback"
                },
                to: [
                    {
                        address: recipientEmail,
                        display_name: "Admin"
                    }
                ],
                subject: subject,
                html: htmlContent,
                reply_to: {
                    address: user?.email || senderEmail,
                    display_name: user?.displayName || "User"
                }
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Maileroo API Error:", data);
            return NextResponse.json({ error: "Failed to send email" }, { status: response.status });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error processing feedback:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
