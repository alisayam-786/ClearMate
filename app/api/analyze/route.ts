import OpenAI from "openai";
import { NextResponse } from "next/server";

import { isAnalysisResult } from "@/types/analysis";

export const runtime = "nodejs";

const MAX_EXTRACTED_TEXT_LENGTH = 30000;

const systemPrompt = `You are ClearMate, an AI document intelligence assistant.

Given the extracted document text, return ONLY valid JSON in this format:

{
  "documentType": "",
  "summary": "",
  "importantInformation": [
    {
      "label": "",
      "value": ""
    }
  ],
  "actionsRequired": [
    ""
  ]
}

Rules:

- Detect document type.
- Write a simple summary understandable by a normal person.
- Extract important facts.
- Suggest actions if needed.
- Never return markdown.
- Never wrap JSON in \`\`\`.`;

function hasExtractedText(
  payload: unknown
): payload is { extractedText: string } {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "extractedText" in payload &&
    typeof payload.extractedText === "string" &&
    payload.extractedText.trim().length > 0
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

  if (!hasExtractedText(payload)) {
    return NextResponse.json(
      { error: "extractedText must be a non-empty string." },
      { status: 400 }
    );
  }

  const extractedText = payload.extractedText.slice(
    0,
    MAX_EXTRACTED_TEXT_LENGTH
  );

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: "OpenRouter API key is missing." },
      { status: 500 }
    );
  }

  try {
    const client = new OpenAI({
      apiKey: apiKey.trim(),
      baseURL: "https://openrouter.ai/api/v1",
    });

    console.log("🚀 Calling OpenRouter...");

    const response = await client.chat.completions.create({
      model: "google/gemini-2.5-flash",

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: extractedText,
        },
      ],

      response_format: {
        type: "json_object",
      },

      max_tokens: 2000,
    });

    console.log("✅ OpenRouter responded successfully.");

    const responseText =
      response.choices[0]?.message?.content?.trim();

    if (!responseText) {
      return NextResponse.json(
        { error: "OpenRouter returned an empty response." },
        { status: 502 }
      );
    }

    let analysis: unknown;

    try {
      analysis = JSON.parse(responseText);
    } catch {
      console.error("❌ Invalid JSON received:");
      console.error(responseText);

      return NextResponse.json(
        { error: "OpenRouter returned invalid JSON." },
        { status: 502 }
      );
    }

    if (!isAnalysisResult(analysis)) {
      return NextResponse.json(
        {
          error: "OpenRouter returned an unexpected response format.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("========== OPENROUTER ERROR ==========");
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Unknown OpenRouter error",
        debug: {
          message: error?.message,
          status: error?.status,
          code: error?.code,
          type: error?.type,
        },
      },
      {
        status: error?.status ?? 500,
      }
    );
  }
}