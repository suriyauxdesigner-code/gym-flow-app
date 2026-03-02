export interface ProgressLog {
  id: string;
  clientId: string;
  clientName: string;
  initials: string;
  date: string;
  weight: number;
  bodyFat: number;
  pr: string;
  notes: string;
  weightDelta: number; // kg change vs previous log (negative = loss)
}

export interface ClientNeedingUpdate {
  id: string;
  name: string;
  initials: string;
  lastUpdate: string;
  daysSinceUpdate: number;
}

export type DateFilter = "week" | "month" | "all";

export const PROGRESS_LOGS: ProgressLog[] = [
  // Marcus Johnson – 2 logs
  {
    id: "log-1",
    clientId: "1",
    clientName: "Marcus Johnson",
    initials: "MJ",
    date: "2026-03-01",
    weight: 87.5,
    bodyFat: 16.2,
    pr: "Bench 120kg",
    notes: "Great session, energy levels high. Hit a new bench PR.",
    weightDelta: -0.5,
  },
  {
    id: "log-2",
    clientId: "1",
    clientName: "Marcus Johnson",
    initials: "MJ",
    date: "2026-02-26",
    weight: 88.0,
    bodyFat: 16.5,
    pr: "Squat 140kg",
    notes: "Slight fatigue but pushed through. Body fat trending down.",
    weightDelta: -0.3,
  },
  // Sarah Chen – 2 logs
  {
    id: "log-3",
    clientId: "2",
    clientName: "Sarah Chen",
    initials: "SC",
    date: "2026-03-02",
    weight: 62.1,
    bodyFat: 21.4,
    pr: "Deadlift 80kg",
    notes: "Excellent form improvement on deadlifts. Nutrition on track.",
    weightDelta: -0.4,
  },
  {
    id: "log-4",
    clientId: "2",
    clientName: "Sarah Chen",
    initials: "SC",
    date: "2026-02-28",
    weight: 62.5,
    bodyFat: 21.8,
    pr: "Seated Row 60kg",
    notes: "Good progress on upper body strength.",
    weightDelta: 0.2,
  },
  // David Kim – 2 logs
  {
    id: "log-5",
    clientId: "3",
    clientName: "David Kim",
    initials: "DK",
    date: "2026-02-28",
    weight: 79.3,
    bodyFat: 14.1,
    pr: "OHP 75kg",
    notes: "Weight stable, body fat slightly up. Review diet next session.",
    weightDelta: 0.6,
  },
  {
    id: "log-6",
    clientId: "3",
    clientName: "David Kim",
    initials: "DK",
    date: "2026-02-25",
    weight: 78.7,
    bodyFat: 13.8,
    pr: "Pull-up 15 reps",
    notes: "Strong session, new pull-up rep PR.",
    weightDelta: -0.2,
  },
  // Emma Rodriguez – 2 logs
  {
    id: "log-7",
    clientId: "4",
    clientName: "Emma Rodriguez",
    initials: "ER",
    date: "2026-02-27",
    weight: 58.4,
    bodyFat: 24.2,
    pr: "Hip Thrust 90kg",
    notes: "Steady progress. Mood and sleep improving significantly.",
    weightDelta: -0.3,
  },
  {
    id: "log-8",
    clientId: "4",
    clientName: "Emma Rodriguez",
    initials: "ER",
    date: "2026-02-24",
    weight: 58.7,
    bodyFat: 24.6,
    pr: "Leg Press 120kg",
    notes: "Lower body focus this week. Good volume work.",
    weightDelta: -0.1,
  },
  // James Wilson – 2 logs
  {
    id: "log-9",
    clientId: "5",
    clientName: "James Wilson",
    initials: "JW",
    date: "2026-03-01",
    weight: 94.2,
    bodyFat: 22.1,
    pr: "Squat 160kg",
    notes: "Weight up slightly. Need to monitor caloric intake this week.",
    weightDelta: 1.1,
  },
  {
    id: "log-10",
    clientId: "5",
    clientName: "James Wilson",
    initials: "JW",
    date: "2026-02-24",
    weight: 93.1,
    bodyFat: 21.8,
    pr: "Deadlift 200kg",
    notes: "New deadlift PR! Motivation very high.",
    weightDelta: -0.5,
  },
  // Priya Patel – 2 logs
  {
    id: "log-11",
    clientId: "6",
    clientName: "Priya Patel",
    initials: "PP",
    date: "2026-02-26",
    weight: 55.2,
    bodyFat: 19.8,
    pr: "Romanian DL 60kg",
    notes: "Consistent improvement. Increase protein intake this week.",
    weightDelta: -0.5,
  },
  {
    id: "log-12",
    clientId: "6",
    clientName: "Priya Patel",
    initials: "PP",
    date: "2026-02-22",
    weight: 55.7,
    bodyFat: 20.1,
    pr: "Goblet Squat 30kg",
    notes: "Technique improving well. Slightly over calories last week.",
    weightDelta: 0.3,
  },
];

export const CLIENTS_NEEDING_UPDATE: ClientNeedingUpdate[] = [
  {
    id: "7",
    name: "Ryan Foster",
    initials: "RF",
    lastUpdate: "2026-02-19",
    daysSinceUpdate: 12,
  },
  {
    id: "8",
    name: "Aisha Okafor",
    initials: "AO",
    lastUpdate: "2026-02-21",
    daysSinceUpdate: 10,
  },
  {
    id: "9",
    name: "Jake Martinez",
    initials: "JM",
    lastUpdate: "2026-02-16",
    daysSinceUpdate: 15,
  },
];

export function filterLogsByDate(
  logs: ProgressLog[],
  filter: DateFilter
): ProgressLog[] {
  if (filter === "all") return logs;

  const today = new Date();

  if (filter === "week") {
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    return logs.filter((log) => new Date(log.date) >= weekAgo);
  }

  if (filter === "month") {
    return logs.filter((log) => {
      const d = new Date(log.date);
      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });
  }

  return logs;
}

export function getProgressMetrics(logs: ProgressLog[]) {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const logsThisWeek = logs.filter((log) => new Date(log.date) >= weekAgo);
  const uniqueClientsUpdated = new Set(
    logsThisWeek.map((log) => log.clientId)
  ).size;

  const avgWeightChange =
    logs.length > 0
      ? logs.reduce((sum, log) => sum + log.weightDelta, 0) / logs.length
      : 0;

  return {
    logsThisWeek: logsThisWeek.length,
    clientsUpdated: uniqueClientsUpdated,
    clientsNeedingUpdate: CLIENTS_NEEDING_UPDATE.length,
    avgWeightChange: Number(avgWeightChange.toFixed(1)),
  };
}
