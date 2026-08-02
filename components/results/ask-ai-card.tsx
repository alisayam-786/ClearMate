"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Bot,
  LoaderCircle,
  MessageCircleMore,
  RotateCcw,
  Send,
  UserRound,
} from "lucide-react";

import { ResultCard } from "@/components/results/result-card";
import { useDocumentContext, type ChatMessage } from "@/contexts/document-context";

function formatInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    const boldMatch =
      remaining.match(/^([\s\S]*?)\*\*([\s\S]*?)\*\*([\s\S]*)$/) ||
      remaining.match(/^([\s\S]*?)__([\s\S]*?)__([\s\S]*)$/);

    if (boldMatch) {
      if (boldMatch[1]) parts.push(<span key={keyIdx++}>{boldMatch[1]}</span>);
      parts.push(
        <strong key={keyIdx++} className="font-semibold text-ink">
          {boldMatch[2]}
        </strong>
      );
      remaining = boldMatch[3];
      continue;
    }

    const codeMatch = remaining.match(/^([\s\S]*?)`([\s\S]*?)`([\s\S]*)$/);
    if (codeMatch) {
      if (codeMatch[1]) parts.push(<span key={keyIdx++}>{codeMatch[1]}</span>);
      parts.push(
        <code
          key={keyIdx++}
          className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[11px] text-primary"
        >
          {codeMatch[2]}
        </code>
      );
      remaining = codeMatch[3];
      continue;
    }

    parts.push(<span key={keyIdx++}>{remaining}</span>);
    break;
  }

  return <>{parts}</>;
}

function renderMarkdown(content: string) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let keyCounter = 0;

  const flushList = () => {
    if (!currentList) return;
    const ListTag = currentList.type;
    const isUl = currentList.type === "ul";
    elements.push(
      <ListTag
        key={`list-${keyCounter++}`}
        className={`my-2 space-y-1.5 ${
          isUl ? "list-disc pl-5" : "list-decimal pl-5"
        }`}
      >
        {currentList.items.map((item, idx) => (
          <li
            key={idx}
            className="text-xs leading-relaxed text-slate-700 sm:text-sm"
          >
            {formatInlineMarkdown(item)}
          </li>
        ))}
      </ListTag>
    );
    currentList = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushList();
      const text = headingMatch[2];
      elements.push(
        <h4
          key={`heading-${keyCounter++}`}
          className="mt-3 mb-1.5 text-xs font-bold tracking-tight text-ink sm:text-sm"
        >
          {formatInlineMarkdown(text)}
        </h4>
      );
      continue;
    }

    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      continue;
    }

    const numMatch = line.match(/^\d+\.\s+(.*)$/);
    if (numMatch) {
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(numMatch[1]);
      continue;
    }

    flushList();
    elements.push(
      <p
        key={`p-${keyCounter++}`}
        className="my-1 text-xs leading-relaxed text-slate-700 sm:text-sm"
      >
        {formatInlineMarkdown(line)}
      </p>
    );
  }

  flushList();
  return <div className="space-y-1">{elements}</div>;
}

function getSuggestedQuestions(documentType?: string): string[] {
  const type = (documentType || "").toLowerCase();

  if (type.includes("resume") || type.includes("cv")) {
    return [
      "What are the strengths of this resume?",
      "Suggest improvements based on this resume.",
      "Is this resume ATS friendly?",
      "What skills stand out?",
    ];
  }

  if (
    type.includes("medical") ||
    type.includes("health") ||
    type.includes("lab") ||
    type.includes("report")
  ) {
    return [
      "Which results are abnormal?",
      "Explain the abnormal values.",
      "Summarize this report.",
      "What should I discuss with my doctor?",
    ];
  }

  if (
    type.includes("bill") ||
    type.includes("electricity") ||
    type.includes("utility") ||
    type.includes("invoice")
  ) {
    return [
      "Explain the charges.",
      "When is the due date?",
      "How much do I need to pay?",
      "Summarize this bill.",
    ];
  }

  if (
    type.includes("legal") ||
    type.includes("contract") ||
    type.includes("agreement") ||
    type.includes("policy")
  ) {
    return [
      "Summarize this agreement.",
      "What are my obligations?",
      "Are there any risks?",
      "What deadlines should I know?",
    ];
  }

  return [
    "What are the key points of this document?",
    "Suggest next steps or improvements.",
    "Explain any important details simply.",
    "Summarize this document.",
  ];
}

function getWelcomeMessage(documentType?: string): string {
  const type = (documentType || "").toLowerCase();

  if (type.includes("resume") || type.includes("cv")) {
    return "I've analyzed your resume. Ask me about your skills, projects, ATS improvements, or experience.";
  }

  if (
    type.includes("medical") ||
    type.includes("health") ||
    type.includes("lab") ||
    type.includes("report")
  ) {
    return "I've analyzed your medical report. Ask me about test results, abnormal values, or medical terminology.";
  }

  if (
    type.includes("bill") ||
    type.includes("electricity") ||
    type.includes("utility") ||
    type.includes("invoice")
  ) {
    return "I've analyzed your electricity bill. Ask me about charges, due dates, payment details, or consumption.";
  }

  if (
    type.includes("legal") ||
    type.includes("contract") ||
    type.includes("agreement") ||
    type.includes("policy")
  ) {
    return "I've analyzed your legal document. Ask me about clauses, obligations, penalties, or agreement terms.";
  }

  return `I've analyzed your ${
    documentType ? documentType.toLowerCase() : "document"
  }. What would you like to know about it?`;
}

export function AskAiCard() {
  const { extractedText, chatMessages, setChatMessages, analysisResult } =
    useDocumentContext();
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(
    null
  );

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const documentType = analysisResult?.documentType;

  const initialGreeting: ChatMessage = {
    id: "initial-greeting",
    role: "assistant",
    content: getWelcomeMessage(documentType),
  };

  const displayMessages =
    chatMessages.length > 0 ? chatMessages : [initialGreeting];

  const suggestedQuestions = getSuggestedQuestions(documentType);
  const showSuggestions = chatMessages.length === 0;

  // Scroll ONLY the internal chat message container (never the page window)
  useEffect(() => {
    if (chatContainerRef.current) {
      const el = chatContainerRef.current;
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [displayMessages, isSending, error]);

  // Maintain keyboard focus on input after sending/receiving replies without page scrolling
  useEffect(() => {
    if (!isSending && extractedText) {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }
  }, [isSending, extractedText]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend ?? input).trim();
    if (!messageText || isSending || !extractedText) return;

    setError(null);
    setLastFailedMessage(null);

    const userMessage: ChatMessage = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      role: "user",
      content: messageText,
    };

    const updatedHistory = [...chatMessages, userMessage];
    setChatMessages(updatedHistory);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          extractedText,
          messages: updatedHistory.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "ClearMate couldn't generate a response."
        );
      }

      const assistantMessage: ChatMessage = {
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now() + 1),
        role: "assistant",
        content: data.message,
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setLastFailedMessage(messageText);
      setError(
        err?.message || "ClearMate couldn't generate a response. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      void handleSendMessage(lastFailedMessage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleSendMessage();
  };

  return (
    <ResultCard>
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-primary">
          <MessageCircleMore className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-bold tracking-[-0.025em] text-ink">
            Ask ClearMate AI
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Ask follow-up questions grounded in your uploaded document.
          </p>
        </div>
      </div>

      {/* Internal Chat Scroll Container */}
      <div
        ref={chatContainerRef}
        className="mt-5 h-[340px] sm:h-[380px] space-y-3.5 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 sm:p-4"
        aria-label="Document conversation"
      >
        {displayMessages.map((message, index) => {
          const isAssistant = message.role === "assistant";
          return (
            <div
              key={message.id || `${message.role}-${index}`}
              className={`animate-clearmate-fade-up flex gap-2.5 ${
                isAssistant ? "justify-start" : "justify-end"
              }`}
            >
              {isAssistant ? (
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-blue-100 text-primary shadow-2xs">
                  <Bot className="size-3.5" aria-hidden="true" />
                </span>
              ) : null}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed sm:text-sm ${
                  isAssistant
                    ? "rounded-tl-md bg-white text-slate-700 shadow-xs border border-slate-100/90"
                    : "rounded-tr-md bg-primary text-white shadow-[0_6px_16px_rgba(37,99,235,0.16)]"
                }`}
              >
                {isAssistant
                  ? renderMarkdown(message.content)
                  : <p className="whitespace-pre-wrap">{message.content}</p>}
              </div>

              {!isAssistant ? (
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-slate-200 text-slate-600 shadow-2xs">
                  <UserRound className="size-3.5" aria-hidden="true" />
                </span>
              ) : null}
            </div>
          );
        })}

        {isSending && (
          <div className="animate-clearmate-fade-up flex gap-2.5 justify-start">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-blue-100 text-primary shadow-2xs">
              <Bot className="size-3.5" aria-hidden="true" />
            </span>
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-slate-100 bg-white px-4 py-3 text-xs text-slate-500 shadow-xs">
              <LoaderCircle className="animate-clearmate-spin size-4 text-primary" />
              <span className="font-medium text-slate-600">ClearMate is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {error ? (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-rose-200/90 bg-rose-50/90 p-3.5 text-xs text-rose-800 shadow-xs animate-clearmate-fade-up">
          <div className="flex items-center gap-2.5 min-w-0">
            <AlertCircle className="size-4 shrink-0 text-rose-600" />
            <p className="truncate font-medium">{error}</p>
          </div>
          {lastFailedMessage ? (
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <RotateCcw className="size-3.5" /> Retry
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Question Input Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex gap-2 rounded-xl border border-slate-200/90 bg-slate-50 p-1.5 transition duration-150 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending || !extractedText}
          aria-label="Ask anything about this document"
          placeholder={
            extractedText
              ? "Ask anything about this document..."
              : "No document text available for chat..."
          }
          className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-ink outline-none placeholder:text-slate-400 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending || !extractedText}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-xs transition duration-150 hover:scale-[1.03] hover:bg-primary-dark active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-primary"
          aria-label="Send question"
        >
          {isSending ? (
            <LoaderCircle className="animate-clearmate-spin size-4" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
        </button>
      </form>

      {/* Dynamic Suggested Questions - Shown only before the first user message */}
      {showSuggestions ? (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            Suggested questions
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                disabled={isSending || !extractedText}
                onClick={() => void handleSendMessage(question)}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition duration-150 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </ResultCard>
  );
}
