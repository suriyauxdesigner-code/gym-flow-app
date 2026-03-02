"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import { MessageSquare, Paperclip, Send, Wifi, WifiOff } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { type Conversation } from "@/lib/messages-data";
import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  conversation: Conversation | null;
  onSend: (content: string) => void;
}

const AVATAR_COLORS: Record<string, string> = {
  MJ: "bg-indigo-100 text-indigo-700",
  SC: "bg-emerald-100 text-emerald-700",
  DK: "bg-sky-100 text-sky-700",
  ER: "bg-rose-100 text-rose-700",
  JW: "bg-amber-100 text-amber-700",
  PP: "bg-violet-100 text-violet-700",
};

export default function ChatWindow({ conversation, onSend }: ChatWindowProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages.length, conversation?.id]);

  // Reset input when switching conversations
  useEffect(() => {
    setInput("");
  }, [conversation?.id]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  /* ── Empty State ── */
  if (!conversation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-slate-50">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <MessageSquare className="h-7 w-7 text-slate-300" />
        </div>
        <div className="text-center">
          <h3 className="text-base font-semibold text-slate-700">
            No conversation selected
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  const avatarColor =
    AVATAR_COLORS[conversation.initials] ?? "bg-slate-100 text-slate-600";

  // Find last trainer message for read receipt
  const lastTrainerMsgId = [...conversation.messages]
    .reverse()
    .find((m) => m.sender === "trainer")?.id;

  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      {/* ── Chat Header ── */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3.5 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Avatar with online indicator */}
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarFallback className={cn("text-sm font-semibold", avatarColor)}>
                {conversation.initials}
              </AvatarFallback>
            </Avatar>
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            )}
          </div>

          {/* Name + status */}
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {conversation.clientName}
            </p>
            <div className="flex items-center gap-1.5">
              {conversation.isOnline ? (
                <>
                  <Wifi className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs text-emerald-600 font-medium">
                    Online
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-400">Offline</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* View Profile CTA */}
        <Button variant="outline" size="sm" className="text-xs gap-1.5" asChild>
          <Link href={`/trainer/clients/${conversation.clientId}`}>
            View Profile
          </Link>
        </Button>
      </div>

      {/* ── Messages Area ── */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-3 p-6">
          {conversation.messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isLastTrainerMsg={msg.id === lastTrainerMsgId}
            />
          ))}
          {/* Auto-scroll anchor */}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* ── Message Input ── */}
      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="flex items-end gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          {/* Attach icon (UI only) */}
          <button
            type="button"
            aria-label="Attach file"
            className="mb-1 flex-shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          {/* Textarea */}
          <Textarea
            placeholder="Type a message… (Enter to send)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="flex-1 resize-none border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 placeholder:text-slate-400"
          />

          {/* Send button */}
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!input.trim()}
            className={cn(
              "mb-0.5 h-8 w-8 flex-shrink-0 rounded-xl p-0 transition-all",
              input.trim()
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-slate-100 text-slate-400"
            )}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-slate-400">
          Press <kbd className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[10px]">Enter</kbd> to send,{" "}
          <kbd className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[10px]">Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}
