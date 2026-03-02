export interface NotificationItem {
  id: string;
  type: "class" | "client" | "message" | "system";
  title: string;
  description: string;
  timestamp: string; // ISO string
  read: boolean;
}

export function formatNotifTime(timestamp: string): string {
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

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    type: "class",
    title: "Class Reminder",
    description:
      "HIIT Circuit Training starts in 30 minutes. 8 participants enrolled.",
    timestamp: "2026-03-03T09:00:00.000Z",
    read: false,
  },
  {
    id: "n-2",
    type: "message",
    title: "New Message from James Wilson",
    description: '"What should I eat before training?" — tap to reply.',
    timestamp: "2026-03-03T07:50:00.000Z",
    read: false,
  },
  {
    id: "n-3",
    type: "client",
    title: "Goal Achieved",
    description:
      "Marcus Johnson has reached his monthly weight loss target. Review his progress.",
    timestamp: "2026-03-03T08:15:00.000Z",
    read: false,
  },
  {
    id: "n-4",
    type: "message",
    title: "New Message from David Kim",
    description: '"Can we reschedule? Something came up" — tap to reply.',
    timestamp: "2026-03-03T09:15:00.000Z",
    read: false,
  },
  {
    id: "n-5",
    type: "class",
    title: "New Enrollment",
    description:
      "Emma Rodriguez has joined your Advanced Strength Training class.",
    timestamp: "2026-03-02T10:30:00.000Z",
    read: false,
  },
  {
    id: "n-6",
    type: "class",
    title: "Class Cancelled",
    description:
      "Morning Yoga class on March 5th has been cancelled due to low enrollment.",
    timestamp: "2026-03-02T14:00:00.000Z",
    read: true,
  },
  {
    id: "n-7",
    type: "client",
    title: "Session Missed",
    description:
      "David Kim missed his scheduled session on March 2nd. Consider following up.",
    timestamp: "2026-03-02T18:00:00.000Z",
    read: true,
  },
  {
    id: "n-8",
    type: "client",
    title: "Weekly Check-in Due",
    description:
      "Weekly check-in due for 3 clients: James Wilson, Priya Patel, Sarah Chen.",
    timestamp: "2026-03-02T09:00:00.000Z",
    read: true,
  },
  {
    id: "n-9",
    type: "system",
    title: "System Update",
    description:
      "FitPro has been updated to v2.4.1. New features available in availability settings.",
    timestamp: "2026-03-01T06:00:00.000Z",
    read: true,
  },
  {
    id: "n-10",
    type: "system",
    title: "Scheduled Maintenance",
    description:
      "Planned maintenance on March 10 from 2–4 AM. No data loss expected.",
    timestamp: "2026-02-28T12:00:00.000Z",
    read: true,
  },
];
