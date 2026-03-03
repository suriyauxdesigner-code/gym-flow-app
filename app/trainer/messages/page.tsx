"use client";

import { useState } from "react";
import {
  MOCK_CONVERSATIONS,
  type Conversation,
  type Message,
} from "@/lib/messages-data";
import ConversationList from "@/components/messages/ConversationList";
import ChatWindow from "@/components/messages/ChatWindow";

export default function MessagesPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(
    MOCK_CONVERSATIONS[0]?.id ?? null
  );
  const [search, setSearch] = useState("");

  const activeConversation =
    conversations.find((c) => c.id === activeId) ?? null;

  function selectConversation(id: string) {
    setActiveId(id);
    // Clear unread count on open
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  }

  function sendMessage(content: string) {
    if (!activeId) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "trainer",
      content,
      timestamp: new Date().toISOString(),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: content,
              lastMessageTime: newMsg.timestamp,
            }
          : c
      )
    );
  }

  // Break out of the layout's p-6 padding and fill the viewport height below the header
  return (
    <div className="-m-6 flex h-[calc(100vh-64px)] overflow-hidden border-t border-slate-200 dark:border-slate-800">
      <ConversationList
        conversations={conversations}
        activeId={activeId}
        search={search}
        onSearch={setSearch}
        onSelect={selectConversation}
      />
      <ChatWindow conversation={activeConversation} onSend={sendMessage} />
    </div>
  );
}
