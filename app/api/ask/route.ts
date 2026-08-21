import { NextResponse } from "next/server";
import { portfolioContext } from "@/data/portfolio-context";

// Simple in-memory rate limiter (resets on container cold starts, which is acceptable for a portfolio scale)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 15; // 15 requests per hour per IP
const WINDOW_MS = 60 * 60 * 1000; // 1 hour window

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    
    // Check rate limit
    const now = Date.now();
    const limitRecord = rateLimitMap.get(ip);
    
    if (limitRecord) {
      if (now - limitRecord.lastReset > WINDOW_MS) {
        // Reset window
        rateLimitMap.set(ip, { count: 1, lastReset: now });
      } else if (limitRecord.count >= LIMIT) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in an hour or email Sadik directly at sadikmondal789@gmail.com." },
          { status: 429 }
        );
      } else {
        limitRecord.count += 1;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    }

    const body = await request.json();
    const { question } = body;

    // Input Validation
    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    if (question.length > 300) {
      return NextResponse.json({ error: "Question is too long (maximum 300 characters)." }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("[✗] GROQ_API_KEY environment variable is not configured.");
      return NextResponse.json({ error: "Service is temporarily offline. Please try again later." }, { status: 503 });
    }

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "groq/compound-mini",
        max_tokens: 300,
        temperature: 0.1, // Low temperature for high factual precision
        messages: [
          { role: "system", content: portfolioContext },
          { role: "user", content: question }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[✗] Groq API error:", errorData);
      return NextResponse.json({ error: "Failed to fetch response from AI engine." }, { status: 502 });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that question.";

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error("[✗] Q&A API route error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
