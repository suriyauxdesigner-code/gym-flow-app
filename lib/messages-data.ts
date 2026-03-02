export interface Message {
  id: string;
  sender: "trainer" | "client";
  content: string;
  timestamp: string; // ISO string
}

export interface Conversation {
  id: string;
  clientId: string;
  clientName: string;
  initials: string;
  isOnline: boolean;
  unread: number;
  lastMessage: string;
  lastMessageTime: string; // ISO string
  messages: Message[];
}

export function formatConvTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatMsgTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    clientId: "1",
    clientName: "Marcus Johnson",
    initials: "MJ",
    isOnline: true,
    unread: 2,
    lastMessage: "Hey, are we still on for Friday?",
    lastMessageTime: "2026-03-03T10:42:00.000Z",
    messages: [
      {
        id: "m-1-1",
        sender: "trainer",
        content: "Hey Marcus! How did the workout go yesterday?",
        timestamp: "2026-03-03T08:15:00.000Z",
      },
      {
        id: "m-1-2",
        sender: "client",
        content: "It was great! Hit a new bench press PR — 120kg! Feeling strong 💪",
        timestamp: "2026-03-03T08:32:00.000Z",
      },
      {
        id: "m-1-3",
        sender: "trainer",
        content: "That's incredible Marcus! I knew you had it in you. Let's push for 125kg next session.",
        timestamp: "2026-03-03T08:45:00.000Z",
      },
      {
        id: "m-1-4",
        sender: "client",
        content: "Sounds like a plan! Hey, are we still on for Friday?",
        timestamp: "2026-03-03T10:42:00.000Z",
      },
    ],
  },
  {
    id: "conv-2",
    clientId: "2",
    clientName: "Sarah Chen",
    initials: "SC",
    isOnline: false,
    unread: 0,
    lastMessage: "Thanks! See you tomorrow at 9 😊",
    lastMessageTime: "2026-03-02T18:10:00.000Z",
    messages: [
      {
        id: "m-2-1",
        sender: "trainer",
        content: "Sarah, reminder about tomorrow's session at 9 AM. Focus will be deadlifts and core.",
        timestamp: "2026-03-02T14:00:00.000Z",
      },
      {
        id: "m-2-2",
        sender: "client",
        content: "Perfect! I've been working on my form all week.",
        timestamp: "2026-03-02T14:25:00.000Z",
      },
      {
        id: "m-2-3",
        sender: "trainer",
        content: "That's what I like to hear! Don't forget to eat a good meal 2 hours before.",
        timestamp: "2026-03-02T14:30:00.000Z",
      },
      {
        id: "m-2-4",
        sender: "client",
        content: "Thanks! See you tomorrow at 9 😊",
        timestamp: "2026-03-02T18:10:00.000Z",
      },
    ],
  },
  {
    id: "conv-3",
    clientId: "3",
    clientName: "David Kim",
    initials: "DK",
    isOnline: true,
    unread: 1,
    lastMessage: "Can we reschedule? Something came up",
    lastMessageTime: "2026-03-03T09:15:00.000Z",
    messages: [
      {
        id: "m-3-1",
        sender: "trainer",
        content: "David, great session last time. Your OHP is really coming along!",
        timestamp: "2026-03-02T11:00:00.000Z",
      },
      {
        id: "m-3-2",
        sender: "client",
        content: "Thanks coach! I've been doing the shoulder mobility work you suggested.",
        timestamp: "2026-03-02T11:45:00.000Z",
      },
      {
        id: "m-3-3",
        sender: "client",
        content: "Can we reschedule? Something came up",
        timestamp: "2026-03-03T09:15:00.000Z",
      },
    ],
  },
  {
    id: "conv-4",
    clientId: "4",
    clientName: "Emma Rodriguez",
    initials: "ER",
    isOnline: false,
    unread: 0,
    lastMessage: "Couldn't have done it without you. Thank you! 🙏",
    lastMessageTime: "2026-03-01T20:07:00.000Z",
    messages: [
      {
        id: "m-4-1",
        sender: "client",
        content: "I hit my target weight! 🎉",
        timestamp: "2026-03-01T20:00:00.000Z",
      },
      {
        id: "m-4-2",
        sender: "trainer",
        content: "Emma that is AMAZING!! All your hard work has paid off. I'm so proud of you!! 🔥",
        timestamp: "2026-03-01T20:05:00.000Z",
      },
      {
        id: "m-4-3",
        sender: "client",
        content: "Couldn't have done it without you. Thank you! 🙏",
        timestamp: "2026-03-01T20:07:00.000Z",
      },
      {
        id: "m-4-4",
        sender: "trainer",
        content: "Now let's set a new goal. How about we focus on building strength next?",
        timestamp: "2026-03-01T20:10:00.000Z",
      },
    ],
  },
  {
    id: "conv-5",
    clientId: "5",
    clientName: "James Wilson",
    initials: "JW",
    isOnline: true,
    unread: 3,
    lastMessage: "What should I eat before training?",
    lastMessageTime: "2026-03-03T07:50:00.000Z",
    messages: [
      {
        id: "m-5-1",
        sender: "client",
        content: "Morning coach! Quick question about nutrition",
        timestamp: "2026-03-03T07:30:00.000Z",
      },
      {
        id: "m-5-2",
        sender: "client",
        content: "I've been feeling sluggish in the mornings before training",
        timestamp: "2026-03-03T07:35:00.000Z",
      },
      {
        id: "m-5-3",
        sender: "client",
        content: "What should I eat before training?",
        timestamp: "2026-03-03T07:50:00.000Z",
      },
    ],
  },
  {
    id: "conv-6",
    clientId: "6",
    clientName: "Priya Patel",
    initials: "PP",
    isOnline: false,
    unread: 0,
    lastMessage: "Got it! I'll track my macros this week",
    lastMessageTime: "2026-02-28T16:45:00.000Z",
    messages: [
      {
        id: "m-6-1",
        sender: "trainer",
        content: "Priya, your consistency this month has been outstanding. Keep it up!",
        timestamp: "2026-02-28T15:00:00.000Z",
      },
      {
        id: "m-6-2",
        sender: "client",
        content: "Thank you! I've been really focused. Should I increase my protein intake?",
        timestamp: "2026-02-28T15:30:00.000Z",
      },
      {
        id: "m-6-3",
        sender: "trainer",
        content: "Yes! Aim for 140g protein daily. Try to hit it through whole foods first.",
        timestamp: "2026-02-28T16:00:00.000Z",
      },
      {
        id: "m-6-4",
        sender: "client",
        content: "Got it! I'll track my macros this week",
        timestamp: "2026-02-28T16:45:00.000Z",
      },
    ],
  },
];
