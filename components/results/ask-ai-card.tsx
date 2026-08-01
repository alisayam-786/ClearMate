"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Bot,
  LoaderCircle,
  MessageCircleMore,
  Send,
  UserRound,
} from "lucide-react";

import { ResultCard } from "@/components/results/result-card";
import { useDocumentContext, type ChatMessage } from "@/contexts/document-context";

const suggestedQuestions = [
  "What is the due date or deadline?",
  "What is the total amount or summary?",
  "What should I do next?",
  "Explain key terms simply",
];

export function AskAiCard() {
  const { extractedText, chatMessages, setChatMessages, analysisResult } =
    useDocumentContext();
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialGreeting: ChatMessage = {
    id: "initial-greeting",
    role: "assistant",
    content: `I've analyzed your ${
      analysisResult?.documentType ? analysisResult.documentType.toLowerCase() : "document"
    }. What would you like to know about it?`,
  };

  const displayMessages =
    chatMessages.length > 0 ? chatMessages : [initialGreeting];

  // Scroll ONLY the internal chat message container (never the page window)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [displayMessages, isSending]);

  // Maintain keyboard focus on input after sending/receiving replies
  useEffect(() => {
    if (!isSending && extractedText) {
      inputRef.current?.focus();
    }
  }, [isSending, extractedText]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend ?? input).trim();
    if (!messageText || isSending || !extractedText) return;

    setError(null);

    const userMessage: ChatMessage = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
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
        throw new Error(data?.error || "Failed to get an answer from ClearMate AI.");
      }

      const assistantMessage: ChatMessage = {
        id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + 1),
        role: "assistant",
        content: data.message,
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setError(err?.message || "Something went wrong. Please try asking again.");
    } finally {
      setIsSending(false);
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
        className="mt-5 h-[320px] sm:h-[360px] space-y-3 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/70 p-3 sm:p-4"
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
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-blue-100 text-primary">
                  <Bot className="size-3.5" aria-hidden="true" />
                </span>
              ) : null}

              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-5 sm:text-sm ${
                  isAssistant
                    ? "rounded-tl-md bg-white text-slate-700 shadow-sm border border-slate-100"
                    : "rounded-tr-md bg-primary text-white shadow-[0_6px_16px_rgba(37,99,235,0.16)]"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>

              {!isAssistant ? (
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-slate-200 text-slate-600">
                  <UserRound className="size-3.5" aria-hidden="true" />
                </span>
              ) : null}
            </div>
          );
        })}

        {isSending && (
          <div className="animate-clearmate-fade-up flex gap-2.5 justify-start">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-blue-100 text-primary">
              <Bot className="size-3.5" aria-hidden="true" />
            </span>
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-slate-100 bg-white px-3.5 py-2.5 text-xs text-slate-500 shadow-sm">
              <LoaderCircle className="animate-clearmate-spin size-4 text-primary" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {error ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700 border border-rose-100">
          <AlertCircle className="size-4 shrink-0" />
          <p className="flex-1">{error}</p>
        </div>
      ) : null}

      {/* Question Input Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50"
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
          className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-slate-400 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending || !extractedText}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-40 disabled:hover:bg-primary"
          aria-label="Send question"
        >
          {isSending ? (
            <LoaderCircle className="animate-clearmate-spin size-4" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
        </button>
      </form>

      {/* Suggested Questions */}
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
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </ResultCard>
  );
}
