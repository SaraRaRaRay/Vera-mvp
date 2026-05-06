"use server";

import Anthropic from "@anthropic-ai/sdk";

import { milestones } from "@/lib/milestones";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const FALLBACK_ERROR_MESSAGE =
  "Sorry, I couldn't get an answer right now. Please try again in a moment.";

export async function askMilestoneQuestion(
  milestoneSlug: string,
  conversation: ChatMessage[],
): Promise<string> {
  const milestone = milestones.find((item) => item.id === milestoneSlug);
  if (!milestone) {
    return "Sorry, I couldn't find this milestone's guidance. Please refresh and try again.";
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return "I’m not connected yet. Please add an Anthropic API key and try again.";
  }

  const anthropic = new Anthropic({ apiKey });
  const recentConversation = conversation
    .filter((message) => message.content.trim().length > 0)
    .slice(-10);

  const systemPrompt = [
    "You are VERA, a friendly AI guide for NSW first home buyers in Australia.",
    "Answer in plain Australian English.",
    "Be calm, warm, and reassuring — the user is making a stressful decision.",
    "Stay grounded in the milestone context provided.",
    "Never give regulated financial or legal advice — instead point users to NSW Government, Revenue NSW, Fair Trading, a licensed mortgage broker, or a conveyancer/solicitor.",
    "If you don't know something specific to NSW, say so honestly.",
    "Keep replies concise (2–4 short paragraphs max) unless the user asks for more detail.",
    "",
    `Milestone title: ${milestone.title}`,
    "Milestone guidance:",
    milestone.guidance,
  ].join("\n");

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      system: systemPrompt,
      messages: recentConversation,
    });

    const textBlock = response.content.find((block) => block.type === "text");
    return textBlock?.text?.trim() || FALLBACK_ERROR_MESSAGE;
  } catch (error) {
    console.error("Anthropic ask action failed:", error);
    return FALLBACK_ERROR_MESSAGE;
  }
}
