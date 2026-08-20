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

    // 3. Web3Forms Integration: If environment key exists, forward to your email!
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    
    if (accessKey) {
      try {
        const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: name,
            email: email,
            message: message,
            subject: `New Portfolio Message from ${name}`,
            from_name: "Sadik Mondal Portfolio"
          })
        });

        const web3formsResult = await web3formsResponse.json();

        if (!web3formsResponse.ok) {
          console.warn("[⚠️] Web3Forms API warning:", web3formsResult.message || "Failed to dispatch email");
        } else {
          console.log("[✓] Web3Forms email dispatched successfully!");
        }
      } catch (err) {
        console.error("[✗] Web3Forms API network error:", err);
      }
    } else {
      console.log("[ℹ] env.WEB3FORMS_ACCESS_KEY not configured. Falling back to local logging only.");
    }

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
