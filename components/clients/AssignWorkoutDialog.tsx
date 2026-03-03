"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { CalendarDays, Dumbbell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const TEMPLATES = [
  "Strength Program",
  "Weight Loss Routine",
  "Hypertrophy Split",
  "Custom Plan",
] as const;

type Template = (typeof TEMPLATES)[number];

const DURATIONS = ["4", "8", "12"] as const;
type Duration = (typeof DURATIONS)[number];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const TEMPLATE_EXERCISES: Record<
  Template,
  { day: string; exercise: string; sets: number; reps: string }[]
> = {
  "Strength Program": [
    { day: "Day 1", exercise: "Barbell Squat", sets: 5, reps: "5" },
    { day: "Day 1", exercise: "Bench Press", sets: 5, reps: "5" },
    { day: "Day 2", exercise: "Deadlift", sets: 3, reps: "5" },
    { day: "Day 2", exercise: "Overhead Press", sets: 5, reps: "5" },
    { day: "Day 3", exercise: "Romanian Deadlift", sets: 4, reps: "8" },
    { day: "Day 3", exercise: "Pull-ups", sets: 3, reps: "8" },
  ],
  "Weight Loss Routine": [
    { day: "Day 1", exercise: "Treadmill HIIT", sets: 1, reps: "20 min" },
    { day: "Day 1", exercise: "Jump Rope", sets: 3, reps: "3 min" },
    { day: "Day 2", exercise: "Burpees", sets: 4, reps: "15" },
    { day: "Day 2", exercise: "Mountain Climbers", sets: 3, reps: "30s" },
    { day: "Day 3", exercise: "Cycling", sets: 1, reps: "45 min" },
    { day: "Day 3", exercise: "Plank Circuit", sets: 3, reps: "60s" },
  ],
  "Hypertrophy Split": [
    { day: "Push", exercise: "Bench Press", sets: 4, reps: "10" },
    { day: "Push", exercise: "Shoulder Press", sets: 3, reps: "12" },
    { day: "Pull", exercise: "Lat Pulldown", sets: 4, reps: "10" },
    { day: "Pull", exercise: "Barbell Row", sets: 3, reps: "10" },
    { day: "Legs", exercise: "Leg Press", sets: 4, reps: "12" },
    { day: "Legs", exercise: "Leg Curl", sets: 3, reps: "12" },
  ],
  "Custom Plan": [],
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WorkoutPlanAssignment {
  name: Template;
  startDate: string;
  duration: Duration;
  daysPerWeek: string[];
  notes: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientName: string;
  onAssign: (plan: WorkoutPlanAssignment) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AssignWorkoutDialog({
  open,
  onOpenChange,
  clientName,
  onAssign,
}: Props) {
  const [template, setTemplate] = useState<Template | "">("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState<Duration>("8");
  const [daysPerWeek, setDaysPerWeek] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const exercises = useMemo(
    () => (template ? TEMPLATE_EXERCISES[template as Template] : []),
    [template]
  );

  const isValid = template !== "" && startDate !== "" && daysPerWeek.length > 0;

  function toggleDay(day: string) {
    setDaysPerWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  function handleAssign() {
    if (!isValid) return;
    onAssign({
      name: template as Template,
      startDate,
      duration,
      daysPerWeek,
      notes,
    });
    toast.success("Workout plan assigned successfully!");
    onOpenChange(false);
    setTemplate("");
    setStartDate("");
    setDuration("8");
    setDaysPerWeek([]);
    setNotes("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900">
              <Dumbbell className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            Assign Workout Plan
          </DialogTitle>
          <DialogDescription>
            Create or assign a structured workout routine for{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">{clientName}</span>.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh]">
          <div className="space-y-6 py-2 pr-4">
            {/* ── Section 1: Select Template ── */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Select Template <span className="text-red-400">*</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTemplate(t)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                      template === t
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-300 dark:ring-indigo-800"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Section 2: Schedule ── */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Schedule
              </h4>

              <div className="grid grid-cols-2 gap-4">
                {/* Start Date */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="aw-start"
                    className="flex items-center gap-1.5"
                  >
                    <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="aw-start"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-sm"
                  />
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <Label>Duration (weeks)</Label>
                  <div className="flex gap-2">
                    {DURATIONS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(d)}
                        className={cn(
                          "flex-1 rounded-lg border py-2 text-sm font-semibold transition-colors",
                          duration === d
                            ? "border-indigo-500 bg-indigo-600 text-white"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        )}
                      >
                        {d}w
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Days per Week */}
              <div className="space-y-1.5">
                <Label>
                  Days per Week{" "}
                  <span className="text-red-500">*</span>
                  {daysPerWeek.length > 0 && (
                    <span className="ml-1.5 text-xs font-normal text-indigo-600">
                      ({daysPerWeek.length} selected)
                    </span>
                  )}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={cn(
                        "h-9 w-12 rounded-lg border text-xs font-semibold transition-colors",
                        daysPerWeek.includes(day)
                          ? "border-indigo-500 bg-indigo-600 text-white"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="aw-notes">Notes</Label>
                <Textarea
                  id="aw-notes"
                  placeholder="Any additional instructions for this plan…"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="resize-none text-sm"
                />
              </div>
            </div>

            {/* ── Section 3: Exercises Preview ── */}
            {template && template !== "Custom Plan" && exercises.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Exercises Preview
                </h4>
                <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                        <th className="py-2 pl-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Day
                        </th>
                        <th className="py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Exercise
                        </th>
                        <th className="py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Sets
                        </th>
                        <th className="py-2 pr-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Reps
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {exercises.map((ex, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-2.5 pl-4 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                            {ex.day}
                          </td>
                          <td className="py-2.5 text-sm text-slate-800 dark:text-slate-200">
                            {ex.exercise}
                          </td>
                          <td className="py-2.5 text-sm text-slate-600 dark:text-slate-400">
                            {ex.sets}
                          </td>
                          <td className="py-2.5 pr-4 text-sm text-slate-600 dark:text-slate-400">
                            {ex.reps}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {template === "Custom Plan" && (
              <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 py-6 text-center">
                <Dumbbell className="mx-auto mb-2 h-6 w-6 text-slate-300 dark:text-slate-600" />
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Custom plan
                </p>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                  Exercises will be added manually after assignment.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2 border-t border-slate-100 dark:border-slate-700 pt-4">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            onClick={handleAssign}
            disabled={!isValid}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Assign Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
