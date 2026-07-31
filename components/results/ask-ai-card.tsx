import { Bot, MessageCircleMore, Send, UserRound } from "lucide-react";

import { ResultCard } from "@/components/results/result-card";

const suggestedQuestions = [
  "Why is my bill high?",
  "Explain Consumer ID",
  "Explain this document simply",
  "What should I do next?",
];

const conversation = [
  { role: "assistant", content: "I've analyzed your electricity bill. What would you like to know?" },
  { role: "user", content: "Why is my bill higher than last month?" },
  { role: "assistant", content: "Your bill appears higher because electricity usage increased during this billing period. The total payable amount is ₹1,240." },
  { role: "user", content: "When is the due date?" },
  { role: "assistant", content: "The payment is due before 28 March to avoid late payment charges." },
];

/** Presentational document chat UI; it deliberately has no AI or backend integration yet. */
export function AskAiCard() {
  return (
    <ResultCard>
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-primary"><MessageCircleMore className="size-4" aria-hidden="true" /></span>
        <div><h2 className="text-lg font-bold tracking-[-0.025em] text-ink">Ask ClearMate AI</h2><p className="mt-0.5 text-xs text-slate-500">Ask follow-up questions about your uploaded document.</p></div>
      </div>

      <div className="mt-5 space-y-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 sm:p-4" aria-label="Sample conversation">
        {conversation.map((message, index) => {
          const isAssistant = message.role === "assistant";
          return (
            <div key={`${message.role}-${index}`} className={`animate-clearmate-fade-up flex gap-2.5 ${isAssistant ? "justify-start" : "justify-end"}`} style={{ animationDelay: `${80 + index * 70}ms` }}>
              {isAssistant ? <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-blue-100 text-primary"><Bot className="size-3.5" aria-hidden="true" /></span> : null}
              <p className={`max-w-[84%] rounded-2xl px-3 py-2.5 text-xs leading-5 sm:text-sm ${isAssistant ? "rounded-tl-md bg-white text-slate-600 shadow-sm" : "rounded-tr-md bg-primary text-white shadow-[0_6px_16px_rgba(37,99,235,0.16)]"}`}>{message.content}</p>
              {!isAssistant ? <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-slate-200 text-slate-600"><UserRound className="size-3.5" aria-hidden="true" /></span> : null}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50">
        <input aria-label="Ask anything about this document" placeholder="Ask anything about this document..." className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-slate-400" />
        <button type="button" className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" aria-label="Send question"><Send className="size-4" aria-hidden="true" /></button>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Suggested questions</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestedQuestions.map((question) => <button key={question} type="button" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{question}</button>)}
        </div>
      </div>
    </ResultCard>
  );
}
