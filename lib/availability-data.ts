export interface AvailabilitySlot {
  day: string;
  hour: number;
  available: boolean;
}

export interface TimeOff {
  id: string;
  date: string;
  note?: string;
}

export interface AdvancedSettings {
  maxSessionsPerSlot: number;
  sessionDuration: 30 | 45 | 60;
  breakBetweenSessions: boolean;
}

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Day = (typeof DAYS)[number];

// 6 AM to 9 PM → 16 hourly blocks (last block = 9 PM–10 PM)
export const HOURS = Array.from({ length: 16 }, (_, i) => i + 6);

export function formatHour(hour: number): string {
  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";
  return `${hour - 12} PM`;
}

export function getDefaultSlots(): AvailabilitySlot[] {
  return DAYS.flatMap((day) =>
    HOURS.map((hour) => ({
      day,
      hour,
      available:
        day !== "Saturday" &&
        day !== "Sunday" &&
        hour >= 8 &&
        hour < 18,
    }))
  );
}

export const DEFAULT_ADVANCED_SETTINGS: AdvancedSettings = {
  maxSessionsPerSlot: 1,
  sessionDuration: 60,
  breakBetweenSessions: false,
};

export const DEFAULT_TIME_OFFS: TimeOff[] = [
  {
    id: "to-1",
    date: "2026-03-10",
    note: "Public holiday",
  },
  {
    id: "to-2",
    date: "2026-03-18",
    note: "Personal appointment",
  },
];
