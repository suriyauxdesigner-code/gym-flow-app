// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface RosterMember {
  id: string;
  name: string;
  initials: string;
  membershipStatus: "active" | "expired";
  attended: boolean;
}

export interface ClassSession {
  id: string;
  name: string;
  day: string;
  date: string;
  time: string;
  capacity: number;
  booked: number;
  status: "upcoming" | "in-progress" | "completed";
  roster: RosterMember[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const CLASS_SESSIONS: ClassSession[] = [
  {
    id: "1",
    name: "Morning HIIT",
    day: "Mon",
    date: "Mar 3",
    time: "07:00 AM",
    capacity: 20,
    booked: 18,
    status: "completed",
    roster: [
      { id: "r1",  name: "Sarah Johnson",   initials: "SJ", membershipStatus: "active",  attended: true  },
      { id: "r2",  name: "Mike Chen",       initials: "MC", membershipStatus: "active",  attended: true  },
      { id: "r3",  name: "Emily Rodriguez", initials: "ER", membershipStatus: "active",  attended: false },
      { id: "r4",  name: "David Kim",       initials: "DK", membershipStatus: "expired", attended: false },
      { id: "r5",  name: "Jessica Wang",    initials: "JW", membershipStatus: "active",  attended: true  },
      { id: "r6",  name: "Ryan Thompson",   initials: "RT", membershipStatus: "active",  attended: true  },
    ],
  },
  {
    id: "2",
    name: "Yoga Flow",
    day: "Mon",
    date: "Mar 3",
    time: "09:30 AM",
    capacity: 15,
    booked: 12,
    status: "completed",
    roster: [
      { id: "r7",  name: "Priya Patel",   initials: "PP", membershipStatus: "active",  attended: true  },
      { id: "r8",  name: "Aisha Ibrahim", initials: "AI", membershipStatus: "active",  attended: true  },
      { id: "r9",  name: "Omar Hassan",   initials: "OH", membershipStatus: "active",  attended: false },
      { id: "r10", name: "Lucas Martin",  initials: "LM", membershipStatus: "expired", attended: false },
    ],
  },
  {
    id: "3",
    name: "Strength Training",
    day: "Tue",
    date: "Mar 4",
    time: "12:00 PM",
    capacity: 10,
    booked: 8,
    status: "completed",
    roster: [
      { id: "r11", name: "Sarah Johnson", initials: "SJ", membershipStatus: "active", attended: true  },
      { id: "r12", name: "Mike Chen",     initials: "MC", membershipStatus: "active", attended: true  },
      { id: "r13", name: "Jessica Wang",  initials: "JW", membershipStatus: "active", attended: true  },
      { id: "r14", name: "Omar Hassan",   initials: "OH", membershipStatus: "active", attended: false },
    ],
  },
  {
    id: "4",
    name: "Pilates Core",
    day: "Wed",
    date: "Mar 5",
    time: "08:00 AM",
    capacity: 12,
    booked: 10,
    status: "in-progress",
    roster: [
      { id: "r15", name: "Emily Rodriguez", initials: "ER", membershipStatus: "active", attended: true  },
      { id: "r16", name: "Priya Patel",     initials: "PP", membershipStatus: "active", attended: false },
      { id: "r17", name: "Aisha Ibrahim",   initials: "AI", membershipStatus: "active", attended: true  },
      { id: "r18", name: "Ryan Thompson",   initials: "RT", membershipStatus: "active", attended: false },
      { id: "r19", name: "David Kim",       initials: "DK", membershipStatus: "active", attended: true  },
    ],
  },
  {
    id: "5",
    name: "Boxing Fundamentals",
    day: "Wed",
    date: "Mar 5",
    time: "06:00 PM",
    capacity: 14,
    booked: 11,
    status: "upcoming",
    roster: [
      { id: "r20", name: "Mike Chen",     initials: "MC", membershipStatus: "active",  attended: false },
      { id: "r21", name: "Omar Hassan",   initials: "OH", membershipStatus: "active",  attended: false },
      { id: "r22", name: "Lucas Martin",  initials: "LM", membershipStatus: "expired", attended: false },
      { id: "r23", name: "Ryan Thompson", initials: "RT", membershipStatus: "active",  attended: false },
    ],
  },
  {
    id: "6",
    name: "Evening Cycling",
    day: "Thu",
    date: "Mar 6",
    time: "06:00 PM",
    capacity: 20,
    booked: 20,
    status: "upcoming",
    roster: [
      { id: "r24", name: "Sarah Johnson",   initials: "SJ", membershipStatus: "active",  attended: false },
      { id: "r25", name: "Emily Rodriguez", initials: "ER", membershipStatus: "active",  attended: false },
      { id: "r26", name: "Priya Patel",     initials: "PP", membershipStatus: "active",  attended: false },
      { id: "r27", name: "Aisha Ibrahim",   initials: "AI", membershipStatus: "active",  attended: false },
      { id: "r28", name: "David Kim",       initials: "DK", membershipStatus: "expired", attended: false },
    ],
  },
  {
    id: "7",
    name: "Morning HIIT",
    day: "Fri",
    date: "Mar 7",
    time: "07:00 AM",
    capacity: 20,
    booked: 16,
    status: "upcoming",
    roster: [
      { id: "r29", name: "Mike Chen",    initials: "MC", membershipStatus: "active", attended: false },
      { id: "r30", name: "Jessica Wang", initials: "JW", membershipStatus: "active", attended: false },
      { id: "r31", name: "Omar Hassan",  initials: "OH", membershipStatus: "active", attended: false },
    ],
  },
  {
    id: "8",
    name: "Flexibility & Stretch",
    day: "Fri",
    date: "Mar 7",
    time: "10:00 AM",
    capacity: 15,
    booked: 9,
    status: "upcoming",
    roster: [
      { id: "r32", name: "Priya Patel",  initials: "PP", membershipStatus: "active",  attended: false },
      { id: "r33", name: "Aisha Ibrahim",initials: "AI", membershipStatus: "active",  attended: false },
      { id: "r34", name: "Lucas Martin", initials: "LM", membershipStatus: "expired", attended: false },
    ],
  },
  {
    id: "9",
    name: "Weekend Bootcamp",
    day: "Sat",
    date: "Mar 8",
    time: "09:00 AM",
    capacity: 25,
    booked: 21,
    status: "upcoming",
    roster: [
      { id: "r35", name: "Sarah Johnson",   initials: "SJ", membershipStatus: "active", attended: false },
      { id: "r36", name: "Mike Chen",       initials: "MC", membershipStatus: "active", attended: false },
      { id: "r37", name: "Emily Rodriguez", initials: "ER", membershipStatus: "active", attended: false },
      { id: "r38", name: "Ryan Thompson",   initials: "RT", membershipStatus: "active", attended: false },
      { id: "r39", name: "Omar Hassan",     initials: "OH", membershipStatus: "active", attended: false },
    ],
  },
  {
    id: "10",
    name: "Active Recovery",
    day: "Sun",
    date: "Mar 9",
    time: "10:00 AM",
    capacity: 12,
    booked: 7,
    status: "upcoming",
    roster: [
      { id: "r40", name: "David Kim",    initials: "DK", membershipStatus: "active", attended: false },
      { id: "r41", name: "Priya Patel",  initials: "PP", membershipStatus: "active", attended: false },
      { id: "r42", name: "Aisha Ibrahim",initials: "AI", membershipStatus: "active", attended: false },
    ],
  },
];

export function getClassSession(id: string): ClassSession | undefined {
  return CLASS_SESSIONS.find((s) => s.id === id);
}

// ─── Shared Status Config ─────────────────────────────────────────────────────

export type StatusConfig = {
  label: string;
  badge: "success" | "secondary" | "indigo";
  dot: string;
  cardBg: string;
};

export function getStatusConfig(status: ClassSession["status"]): StatusConfig {
  if (status === "in-progress") {
    return {
      label: "In Progress",
      badge: "success",
      dot: "bg-emerald-500",
      cardBg: "bg-emerald-50/60 ring-1 ring-emerald-200 dark:bg-emerald-950/20 dark:ring-emerald-900",
    };
  }
  if (status === "completed") {
    return {
      label: "Completed",
      badge: "secondary",
      dot: "bg-slate-400",
      cardBg: "bg-slate-50 ring-1 ring-slate-200 dark:bg-slate-800/50 dark:ring-slate-700",
    };
  }
  return {
    label: "Upcoming",
    badge: "indigo",
    dot: "bg-indigo-500",
    cardBg: "bg-white ring-1 ring-indigo-100 dark:bg-slate-800 dark:ring-indigo-900/50",
  };
}
