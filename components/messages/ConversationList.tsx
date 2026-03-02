"use client";

import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type Conversation, formatConvTime } from "@/lib/messages-data";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  search: string;
  onSearch: (q: string) => void;
  onSelect: (id: string) => void;
}

const AVATAR_COLORS: Record<string, string> = {
  MJ: "bg-indigo-100 text-indigo-700",
  SC: "bg-emerald-100 text-emerald-700",
  DK: "bg-sky-100 text-sky-700",
  ER: "bg-rose-100 text-rose-700",
  JW: "bg-amber-100 text-amber-700",
  PP: "bg-violet-100 text-violet-700",
};

export default function ConversationList({
  conversations,
  activeId,
  search,
  onSearch,
  onSelect,
}: ConversationListProps) {
  const filtered = conversations.filter((c) =>
    c.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex w-80 flex-shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 px-4 pb-3 pt-4">
        <h2 className="mb-3 text-lg font-bold text-slate-900">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="h-9 pl-8 text-sm"
          />
        </div>
      </div>

      {/* Conversation Items */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-400">
            No conversations found.
          </p>
        ) : (
          filtered.map((conv) => {
            const isActive = conv.id === activeId;
            const avatarColor =
              AVATAR_COLORS[conv.initials] ?? "bg-slate-100 text-slate-600";

            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => onSelect(conv.id)}
                className={cn(
                  "relative flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors",
                  isActive
                    ? "border-l-[3px] border-indigo-600 bg-indigo-50"
                    : "border-l-[3px] border-transparent hover:bg-slate-50"
                )}
              >
                {/* Avatar with online dot */}
                <div className="relative mt-0.5 flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback
                      className={cn("text-xs font-semibold", avatarColor)}
                    >
                      {conv.initials}
                    </AvatarFallback>
                  </Avatar>
                  {conv.isOnline && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "truncate text-sm font-semibold",
                        isActive ? "text-indigo-900" : "text-slate-900"
                      )}
                    >
                      {conv.clientName}
                    </p>
                    <span className="flex-shrink-0 text-[10px] text-slate-400">
                      {formatConvTime(conv.lastMessageTime)}
                    </span>
                  </div>

                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "truncate text-xs",
                        conv.unread > 0
                          ? "font-medium text-slate-700"
                          : "text-slate-400"
                      )}
                    >
                      {conv.lastMessage}
                    </p>
                    {conv.unread > 0 && (
                      <Badge className="h-5 min-w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-[10px] font-bold text-white hover:bg-indigo-600">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
