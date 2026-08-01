import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_EXTRACTED_TEXT_LENGTH = 30000;

type ChatMessageInput = {
  role: "user" | "assistant";
  content: string;
};

function isValidPayload(
  payload: unknown
): payload is { extractedText: string; messages: ChatMessageInput[] } {
  if (typeof payload !== "object" || payload === null) return false;
  const p = payload as Record<string, unknown>;

  if (typeof p.extractedText !== "string" || !p.extractedText.trim()) {
    return false;
  }

  if (!Array.isArray(p.messages) || p.messages.length === 0) {
    return false;
  }

  return p.messages.every(
    (m) =>
      typeof m === "object" &&
      m !== null &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0
  );
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  if (!isValidPayload(payload)) {
    return NextResponse.json(
      {
        error:
          "Invalid request payload. Must provide extractedText and non-empty messages array.",
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: "OpenRouter API key is missing." },
      { status: 500 }
    );
  }

  const extractedText = payload.extractedText.slice(
    0,
    MAX_EXTRACTED_TEXT_LENGTH
  );

  const systemPrompt = `You are ClearMate AI, an intelligent document assistant.

Answer the user's question based ONLY on the provided document text.

Rules:
- Base your answers strictly and exclusively on the document context below.
- Do NOT make assumptions or use external knowledge not present in the document.
- If the requested information is not in the document context, clearly state that the document does not contain that information.
- Keep responses concise, direct, helpful, and polite.

DOCUMENT CONTEXT:
---
${extractedText}
---`;

  try {
    const client = new OpenAI({
      apiKey: apiKey.trim(),
      baseURL: "https://openrouter.ai/api/v1",
    });

    const apiMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
      ...payload.messages.map((m) => ({
        role: m.role,
        content: m.content.trim(),
      })),
    ];

    const response = await client.chat.completions.create({
      model: "google/gemini-2.5-flash",
      messages: apiMessages,
      max_tokens: 1000,
    });

    const reply = response.choices[0]?.message?.content?.trim() ?? "";

    if (!reply) {
      return NextResponse.json(
        { error: "ClearMate AI returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: reply });
  } catch (error: any) {
    console.error("========== OPENROUTER CHAT ERROR ==========");
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Unknown error occurred while generating answer.",
      },
      {
        status: error?.status ?? 500,
      }
    );
  }
}
