"use client";

import { FormEvent, useState } from "react";

import { askMilestoneQuestion, type ChatMessage } from "@/app/actions/ask";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MilestoneChatProps = {
  slug: string;
};

const initialAssistantMessage: ChatMessage = {
  role: "assistant",
  content: "Hi, I'm VERA. Ask me anything about this step in your home buying journey.",
};

export function MilestoneChat({ slug }: MilestoneChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || loading) {
      return;
    }

    const userMessage: ChatMessage = { role: "user", content: trimmedInput };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue("");
    setLoading(true);

    const reply = await askMilestoneQuestion(slug, nextMessages);

    setMessages((current) => [...current, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  return (
    <section className="mt-10 rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-200 px-4 py-3 sm:px-5">
        <h2 className="text-base font-semibold text-stone-900">Ask VERA</h2>
      </div>

      <div className="max-h-96 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <p
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-emerald-100 text-emerald-900"
                  : "bg-stone-100 text-stone-900"
              }`}
            >
              {message.content}
            </p>
          </div>
        ))}
        {loading ? <p className="text-sm text-stone-500">VERA is thinking...</p> : null}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-stone-200 px-4 py-3 sm:px-5"
        aria-label="Ask VERA about this milestone"
      >
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Ask a question about this step..."
          disabled={loading}
        />
        <Button type="submit" disabled={loading || inputValue.trim().length === 0}>
          Send
        </Button>
      </form>
    </section>
  );
}
