import { NextResponse } from "next/server";

import { spots } from "@/lib/spots";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const model = "gemini-3.8-flash";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = body.messages?.filter(
      (message): message is ChatMessage =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.text === "string",
    );

    if (!messages?.length) {
      return NextResponse.json(
        { error: "At least one message is required." },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `You are Layag, a warm, concise, and friendly Batangas travel guide. Use your general knowledge to answer questions and make useful recommendations about Batangas. The destination catalog below is supplemental reference material only; it may be incomplete, outdated, or contain sample data, so do not limit your answers to it. You may recommend other real Batangas destinations when relevant. Do not invent current opening hours, prices, travel times, reservations, or availability. When a detail may have changed or you are uncertain, say so and recommend checking with the destination before traveling. Be helpful and conversational, especially when the user says hello or asks a broad question. Keep replies under 120 words and use plain text.\n\nSupplemental destination catalog:\n${JSON.stringify(spots)}`,
              },
            ],
          },
          contents: messages.slice(-8).map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.text }],
          })),
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 256,
            thinkingConfig: {
              thinkingLevel: "LOW",
            },
          },
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini request failed:", data.error ?? data);
      return NextResponse.json(
        { error: data.error?.message ?? "Gemini request failed." },
        { status: response.status },
      );
    }

    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach Gemini right now." },
      { status: 502 },
    );
  }
}
