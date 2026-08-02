import OpenAI from "openai";
import { NextResponse } from "next/server";

import { isAnalysisResult } from "@/types/analysis";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_EXTRACTED_TEXT_LENGTH = 30000;

const systemPrompt = `
You are ClearMate, an AI-powered document intelligence assistant.

Analyze the uploaded document and return ONLY valid JSON.

Your goal is to help ordinary users understand complex documents quickly and accurately.

Rules:

- Return ONLY valid JSON.
- Never wrap JSON inside markdown.
- Never use \`\`\`.
- Never explain your reasoning.
- Never include extra text outside the JSON.
- Use simple, natural, and non-technical language.
- The summary should be 4–6 informative sentences explaining the document in an easy-to-understand way.
- Extract ALL useful information that a normal user would care about.
- Include important dates, names, IDs, amounts, account numbers, medical values, diagnoses, prescriptions, legal clauses, deadlines, bill details, addresses, contact information, skills, education, work experience, and any other significant information depending on the document type.
- Return up to 15 importantInformation items whenever appropriate.
- Return up to 5 clear and actionable actionsRequired items.
- Never invent information.
- If information is missing, leave the value as an empty string.

Document Types may include (but are not limited to):
- Resume / CV
- Medical Report
- Electricity Bill
- Bank Statement
- Legal Agreement
- Insurance Document
- Government Document
- Invoice
- Academic Certificate
- Any other document

JSON Schema:

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
`;

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
      {
        error: "Invalid request body.",
      },
      {
        status: 400,
      }
    );
  }

  if (!hasExtractedText(payload)) {
    return NextResponse.json(
      {
        error: "Document text is missing.",
      },
      {
        status: 400,
      }
    );
  }

  const extractedText = payload.extractedText
    .trim()
    .slice(0, MAX_EXTRACTED_TEXT_LENGTH);

  const apiKey = process.env.OPENROUTER_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "OpenRouter API key is not configured.",
      },
      {
        status: 500,
      }
    );
  }

  try {
    const client = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });

    console.log(
      `🚀 ClearMate → OpenRouter (${extractedText.length} characters)`
    );

    const response = await client.chat.completions.create({
      model: "google/gemini-2.5-flash-lite",

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

      temperature: 0.1,

      max_tokens: 1400,
    });

    const raw =
      response.choices[0]?.message?.content?.trim() ?? "";

    if (!raw) {
      return NextResponse.json(
        {
          error: "The AI returned an empty response.",
        },
        {
          status: 502,
        }
      );
    }

    // Remove reasoning tags (<think>...</think>) if returned by free router/reasoning models
    const withoutReasoning = raw
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .replace(/^```json/i, "")
      .replace(/^```/i, "")
      .replace(/```$/i, "")
      .trim();

    // Extract JSON object if wrapped in additional text
    const firstBrace = withoutReasoning.indexOf("{");
    const lastBrace = withoutReasoning.lastIndexOf("}");

    const cleaned =
      firstBrace !== -1 && lastBrace !== -1
        ? withoutReasoning.slice(firstBrace, lastBrace + 1)
        : withoutReasoning;

    let analysis: unknown;

    try {
      analysis = JSON.parse(cleaned);
    } catch {
      console.error("Invalid JSON:");
      console.error(cleaned);

      return NextResponse.json(
        {
          error: "The AI returned invalid JSON.",
        },
        {
          status: 502,
        }
      );
    }

    if (!isAnalysisResult(analysis)) {
      console.error("Unexpected JSON structure:");
      console.error(analysis);

      return NextResponse.json(
        {
          error: "Unexpected response format.",
        },
        {
          status: 502,
        }
      );
    }

    console.log("✅ Analysis completed successfully.");

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("========== OPENROUTER ERROR ==========");
    console.error(error);

    if (error?.status === 402) {
      return NextResponse.json(
        {
          error:
            "The AI service does not currently have enough available credits to analyze this document. Please try again later.",
        },
        {
          status: 402,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          error?.message ??
          "An unexpected AI service error occurred.",
      },
      {
        status: error?.status ?? 500,
      }
    );
  }
}