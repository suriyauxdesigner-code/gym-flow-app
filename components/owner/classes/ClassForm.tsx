"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MOCK_TRAINERS } from "@/lib/owner-data";

const STATUS_COLOR = {
  available: "bg-emerald-500",
  moderate: "bg-amber-400",
  overloaded: "bg-red-500",
  "on-leave": "bg-slate-400",
};

interface FormState {
  name: string;
  description: string;
  location: string;
  trainerId: string;
  isRecurring: boolean;
  date: string;
  time: string;
  duration: string;
  capacity: string;
  enableWaitlist: boolean;
  bookingCutoff: string;
}

const DEFAULT_FORM: FormState = {
  name: "",
  description: "",
  location: "",
  trainerId: "",
  isRecurring: false,
  date: "",
  time: "",
  duration: "60",
  capacity: "15",
  enableWaitlist: false,
  bookingCutoff: "2",
};

export default function ClassForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);

  function set<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handlePublish() {
    if (!form.name.trim() || !form.trainerId || !form.date || !form.time) {
      toast.error("Class name, trainer, date, and time are required.");
      return;
    }
    toast.success("Class published successfully!");
    router.push("/owner/classes");
  }

  const selectedTrainer = MOCK_TRAINERS.find((t) => t.id === form.trainerId);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Create Class</h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Schedule a new class session
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/owner/classes")}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handlePublish}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Publish Class
          </Button>
        </div>
      </div>

      {/* Section 1 — Basic Info */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Class Name <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="e.g. Morning HIIT Blast"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Description
            </Label>
            <Textarea
              placeholder="What will participants do in this class?"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className="text-sm resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Location
            </Label>
            <Input
              placeholder="e.g. Studio A, Weight Room, Yoga Studio"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className="h-9 text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Section 2 — Assign Trainer */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Assign Trainer <span className="text-red-500">*</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {MOCK_TRAINERS.map((t) => {
              const isSelected = form.trainerId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => set("trainerId", t.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  )}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                    {t.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm font-medium", isSelected ? "text-indigo-700 dark:text-indigo-300" : "text-slate-900 dark:text-slate-100")}>
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.specialization}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <div className={cn("h-2 w-2 rounded-full", STATUS_COLOR[t.status])} />
                    <span className="text-[10px] text-slate-400">{t.utilizationPct}%</span>
                  </div>
                </button>
              );
            })}
          </div>
          {selectedTrainer && selectedTrainer.status === "overloaded" && (
            <p className="text-xs font-medium text-red-600 dark:text-red-400">
              ⚠ This trainer is currently overloaded. Consider another trainer.
            </p>
          )}
          {selectedTrainer && selectedTrainer.status === "on-leave" && (
            <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
              ⚠ This trainer is currently on leave.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Section 3 — Schedule */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Recurring Class</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Repeat this class on a weekly schedule</p>
            </div>
            <Switch
              checked={form.isRecurring}
              onCheckedChange={(v) => set("isRecurring", v)}
              aria-label="Recurring class"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Start Time <span className="text-red-500">*</span>
              </Label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Duration (minutes)
            </Label>
            <Input
              type="number"
              min="15"
              max="180"
              step="5"
              value={form.duration}
              onChange={(e) => set("duration", e.target.value)}
              className="h-9 text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Section 4 — Capacity & Rules */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Capacity & Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Max Capacity
            </Label>
            <Input
              type="number"
              min="1"
              value={form.capacity}
              onChange={(e) => set("capacity", e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Enable Waitlist</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Allow members to join a waitlist when class is full</p>
            </div>
            <Switch
              checked={form.enableWaitlist}
              onCheckedChange={(v) => set("enableWaitlist", v)}
              aria-label="Enable waitlist"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Booking Cutoff (hours before class)
            </Label>
            <Input
              type="number"
              min="0"
              value={form.bookingCutoff}
              onChange={(e) => set("bookingCutoff", e.target.value)}
              className="h-9 text-sm"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
