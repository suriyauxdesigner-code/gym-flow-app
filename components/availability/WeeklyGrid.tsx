"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DAYS,
  HOURS,
  formatHour,
  type AvailabilitySlot,
} from "@/lib/availability-data";

interface WeeklyGridProps {
  slots: AvailabilitySlot[];
  onToggleSlot: (day: string, hour: number) => void;
  onToggleDay: (day: string, enabled: boolean) => void;
}

export default function WeeklyGrid({
  slots,
  onToggleSlot,
  onToggleDay,
}: WeeklyGridProps) {
  function isAvailable(day: string, hour: number): boolean {
    return (
      slots.find((s) => s.day === day && s.hour === hour)?.available ?? false
    );
  }

  function isDayEnabled(day: string): boolean {
    return slots.some((s) => s.day === day && s.available);
  }

  function isDayOff(day: string): boolean {
    return slots.filter((s) => s.day === day).every((s) => !s.available);
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse">
        {/* ── Column Header ── */}
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {/* Time column */}
            <th className="sticky left-0 z-20 bg-slate-50 w-20 px-4 py-3 text-left">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Time
              </span>
            </th>

            {DAYS.map((day) => (
              <th
                key={day}
                className="px-2 py-3 text-center min-w-[96px]"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-700">
                    {day.slice(0, 3)}
                  </span>

                  {isDayOff(day) ? (
                    <Badge className="bg-slate-100 text-slate-400 hover:bg-slate-100 border-0 text-[10px] px-2 py-0">
                      Off Day
                    </Badge>
                  ) : (
                    <div className="h-5" />
                  )}

                  {/* Enable entire day toggle */}
                  <Switch
                    checked={isDayEnabled(day)}
                    onCheckedChange={(checked) => onToggleDay(day, checked)}
                    aria-label={`Toggle all slots for ${day}`}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Hourly Rows ── */}
        <tbody>
          {HOURS.map((hour) => (
            <tr
              key={hour}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50/40 transition-colors"
            >
              {/* Sticky time label */}
              <td className="sticky left-0 z-10 bg-white px-4 py-1.5 text-xs font-medium text-slate-500 border-r border-slate-100 whitespace-nowrap">
                {formatHour(hour)}
              </td>

              {DAYS.map((day) => {
                const active = isAvailable(day, hour);
                return (
                  <td key={day} className="p-1 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleSlot(day, hour)}
                      aria-label={`${active ? "Disable" : "Enable"} ${day} ${formatHour(hour)}`}
                      aria-pressed={active}
                      className={cn(
                        "w-full rounded-lg py-2 text-[11px] font-semibold transition-all",
                        active
                          ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                          : "bg-slate-50 text-slate-300 hover:bg-slate-100 hover:text-slate-400"
                      )}
                    >
                      {active ? "✓" : "—"}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
