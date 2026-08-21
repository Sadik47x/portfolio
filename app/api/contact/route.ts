import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // 1. Log to server terminal
    console.log("\n\x1b[36m====================================================\x1b[0m");
    console.log("\x1b[32m[✉] NEW PORTFOLIO CONTACT MESSAGE RECEIVED!\x1b[0m");
    console.log("\x1b[36m====================================================\x1b[0m");
    console.log(`\x1b[33mSender:\x1b[0m    ${name}`);
    console.log(`\x1b[33mEmail:\x1b[0m     ${email}`);
    console.log(`\x1b[33mMessage:\x1b[0m   ${message}`);
    console.log(`\x1b[33mReceived:\x1b[0m  ${timestamp}`);
    console.log("\x1b[36m====================================================\n\x1b[0m");

    // 2. Log locally in workspace files as backup (only works locally)
    try {
      const filePath = path.join(process.cwd(), "messages.txt");
      const fileContent = `====================================================\n[✉] NEW CONTACT MESSAGE RECEIVED\n====================================================\nSender:    ${name}\nEmail:     ${email}\nMessage:   ${message}\nReceived:  ${timestamp}\n====================================================\n\n`;
      await fs.appendFile(filePath, fileContent, "utf-8");
    } catch (fsError) {
      console.log("[ℹ] Local file writing skipped (normal in serverless/read-only hosting environments like Vercel).");
    }

    // Note: Web3Forms is called directly from the client (components/Contact.tsx)
    // to comply with free plan limitations and prevent server-side 403 blocks.

    return NextResponse.json({
      status: 200,
      message: `Thank you ${name}! Your message has been logged in Sadik's console.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[✗] Contact route error:", error);
    return NextResponse.json(
      { error: error?.message || "Invalid request payload" },
      { status: 400 }
    );
  }
}
