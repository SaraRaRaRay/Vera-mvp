"use client";

import Image from "next/image";
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
    <section className="mt-10 rounded-2xl border border-grey/20 bg-white/75 shadow-[0_8px_30px_rgba(124,58,237,0.08)]">
      <div className="flex items-center gap-3 border-b border-grey/20 px-4 py-3 sm:px-5">
        <div className="relative size-12 overflow-hidden rounded-full ring-2 ring-white/80">
          <Image src="/vera-portrait.png" alt="VERA avatar" fill className="object-cover" sizes="48px" />
        </div>
        <h2 className="text-base font-semibold text-ink">Ask VERA</h2>
      </div>

      <div className="max-h-96 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" ? (
              <div className="flex items-end gap-2">
                {index === 0 || messages[index - 1]?.role === "user" ? (
                  <div className="relative mb-1 size-8 overflow-hidden rounded-full">
                    <Image
                      src="/vera-portrait.png"
                      alt="VERA"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                ) : (
                  <div className="size-8" aria-hidden="true" />
                )}
                <p className="max-w-[85%] rounded-full bg-peach px-4 py-2 text-sm leading-relaxed text-ink">
                  {message.content}
                </p>
              </div>
            ) : (
              <p className="max-w-[85%] rounded-full bg-pink px-4 py-2 text-sm leading-relaxed text-ink">
                {message.content}
              </p>
            )}
          </div>
        ))}
        {loading ? <p className="text-sm text-grey">VERA is thinking...</p> : null}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-grey/20 px-4 py-3 sm:px-5"
        aria-label="Ask VERA about this milestone"
      >
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Ask a question about this step..."
          disabled={loading}
          className="h-11 rounded-full border-grey/35 bg-cream px-4 text-ink focus-visible:ring-purple/30"
        />
        <Button
          type="submit"
          disabled={loading || inputValue.trim().length === 0}
          className="h-11 rounded-full bg-purple px-5 text-white hover:bg-purple/90 focus-visible:ring-purple/30"
        >
          Send
        </Button>
      </form>
    </section>
  );
}
