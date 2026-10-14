"use client";

import { FormEvent, useRef, useState } from "react";
import { MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import Link from "next/link";

import { spots, type Spot } from "@/lib/spots";
import { useTripPlanner } from "./trip-planner";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  spot?: Spot;
};

const quickPrompts = [
  "Suggest a beach",
  "Plan a heritage day",
  "Show me food stops",
];

function findSpot(input: string) {
  const normalizedInput = input.toLowerCase();
  return spots.find(
    (spot) =>
      normalizedInput.includes(spot.name.toLowerCase()) ||
      normalizedInput.includes(spot.category.toLowerCase()),
  );
}

function createReply(input: string) {
  const normalizedInput = input.toLowerCase();
  const matchingSpot = findSpot(input);

  if (matchingSpot) {
    return {
      text: `${matchingSpot.name} is a ${matchingSpot.category.toLowerCase()} destination. ${matchingSpot.description}`,
      spot: matchingSpot,
    };
  }

  if (normalizedInput.includes("beach") || normalizedInput.includes("swim")) {
    const beach = spots.find((spot) => spot.category === "Beach") ?? spots[0];
    return {
      text: `${beach.name} is a good place to start for a seaside escape. ${beach.description}`,
      spot: beach,
    };
  }

  if (
    normalizedInput.includes("heritage") ||
    normalizedInput.includes("history")
  ) {
    const heritage =
      spots.find((spot) => spot.category === "Heritage Town") ?? spots[0];
    return {
      text: `${heritage.name} is the strongest heritage stop in this guide. ${heritage.description}`,
      spot: heritage,
    };
  }

  if (
    normalizedInput.includes("food") ||
    normalizedInput.includes("restaurant") ||
    normalizedInput.includes("eat")
  ) {
    const restaurant =
      spots.find((spot) => spot.category === "Restaurant") ?? spots[0];
    return {
      text: `${restaurant.name} is the featured food stop. ${restaurant.description}`,
      spot: restaurant,
    };
  }

  if (
    normalizedInput.includes("plan") ||
    normalizedInput.includes("itinerary") ||
    normalizedInput.includes("day trip")
  ) {
    return {
      text: "Try a morning heritage walk in Taal, stop for a local meal at Kakang Emong, then finish with a slower coastal afternoon at Laiya Beach.",
    };
  }

  return {
    text: "I can help you discover beaches, heritage towns, pilgrimage sites, food stops, and photo destinations around Batangas. Try asking about Laiya Beach or request a one-day itinerary.",
  };
}

export default function TravelAssistant() {
  const { openPlanner } = useTripPlanner();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [nextMessageId, setNextMessageId] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const requestIdRef = useRef(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hi, I am your local Batangas guide. Ask me about a destination or tell me what kind of day you want.",
    },
  ]);

  const submitMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) {
      return;
    }

    const userMessage = {
      id: nextMessageId,
      role: "user" as const,
      text: trimmedInput,
    };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setNextMessageId((currentId) => currentId + 2);
    setInput("");
    setIsLoading(true);
    const requestId = requestIdRef.current;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversation.map(({ role, text }) => ({ role, text })),
        }),
      });
      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        throw new Error(data.error ?? "Gemini is unavailable.");
      }

      const assistantReply = data.reply;
      if (requestId === requestIdRef.current) {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nextMessageId + 1,
            role: "assistant",
            text: assistantReply,
            spot: findSpot(trimmedInput),
          },
        ]);
      }
    } catch {
      if (requestId === requestIdRef.current) {
        const fallbackReply = createReply(trimmedInput);
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nextMessageId + 1,
            role: "assistant",
            text: fallbackReply.text,
            spot: fallbackReply.spot,
          },
        ]);
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  const askQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const restartConversation = () => {
    requestIdRef.current += 1;
    setMessages([
      {
        id: 1,
        role: "assistant",
        text: "Hi, I am your local Batangas guide. Ask me about a destination or tell me what kind of day you want.",
      },
    ]);
    setNextMessageId(2);
    setInput("");
    setIsLoading(false);
  };

  return (
    <>
      {isOpen ? (
        <section
          className="fixed bottom-5 right-5 z-50 flex h-[min(620px,calc(100vh-6rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-[0_24px_80px_-28px_rgba(0,0,0,0.5)]"
          aria-label="Layag travel assistant"
        >
          <header className="flex items-start justify-between bg-[#0E3B43] px-5 py-5 text-[#F5EFE2]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#F5EFE2]/65">
                <Sparkles className="size-4" />
                Local guide
              </div>
              <h2 className="mt-2 font-heading text-2xl font-semibold">
                Ask Layag
              </h2>
              <p className="mt-1 text-sm text-[#F5EFE2]/65">
                Powered by Gemini
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={restartConversation}
                aria-label="Restart conversation"
                title="Restart conversation"
                className="rounded-full p-2 text-[#F5EFE2]/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close travel assistant"
                className="rounded-full p-2 text-[#F5EFE2]/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[#FBFAF7] px-4 py-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-[#0E3B43] text-white" : "rounded-bl-md border border-border/70 bg-white text-foreground"}`}
                >
                  <p>{message.text}</p>
                  {message.spot ? (
                    <div className="mt-3 flex flex-wrap gap-3 border-t border-border/70 pt-3">
                      <Link
                        href={`https://www.google.com/maps?q=${message.spot.coordinates.lat},${message.spot.coordinates.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold underline underline-offset-4 hover:text-primary"
                      >
                        Open in maps
                      </Link>
                      <button
                        type="button"
                        onClick={openPlanner}
                        className="text-xs font-semibold underline underline-offset-4 hover:text-primary"
                      >
                        Open trip planner
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border/70 bg-white px-4 py-3"
                  aria-label="Assistant is typing"
                >
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" />
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-border bg-background px-4 py-4">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => askQuickPrompt(prompt)}
                  className="shrink-0 rounded-full border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={submitMessage} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Batangas..."
                aria-label="Ask about Batangas"
                disabled={isLoading}
                className="h-11 min-w-0 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/80"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-label={isOpen ? "Close travel assistant" : "Open travel assistant"}
        className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#0E3B43] text-[#F5EFE2] shadow-[0_16px_40px_-16px_rgba(14,59,67,0.65)] transition-transform hover:-translate-y-1"
      >
        {isOpen ? (
          <X className="size-5" />
        ) : (
          <MessageCircle className="size-6" />
        )}
      </button>
    </>
  );
}
