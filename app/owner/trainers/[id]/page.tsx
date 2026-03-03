"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Users, Pencil, CalendarClock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TrainerTabs from "@/components/owner/trainers/TrainerTabs";
import { MOCK_TRAINERS } from "@/lib/owner-data";
import type { TrainerAvailabilityStatus } from "@/lib/owner-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_CONFIG: Record<
  TrainerAvailabilityStatus,
  { label: string; className: string }
> = {
  available: {
    label: "Available",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  },
  moderate: {
    label: "Moderate",
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
  },
  overloaded: {
    label: "Overloaded",
    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800",
  },
  "on-leave": {
    label: "On Leave",
    className: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  },
};

const AVAILABILITY_OPTIONS: TrainerAvailabilityStatus[] = [
  "available",
  "moderate",
  "overloaded",
  "on-leave",
];

export default function TrainerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const trainer = MOCK_TRAINERS.find((t) => t.id === id);

  const [availability, setAvailability] = useState<TrainerAvailabilityStatus>(
    trainer?.status ?? "available"
  );
  const [showAvailabilityMenu, setShowAvailabilityMenu] = useState(false);

  if (!trainer) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Trainer not found</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => router.push("/owner/trainers")}
        >
          Back to Trainers
        </Button>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[availability];

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/owner/trainers")}
        className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Trainers
      </button>

      {/* Trainer Header Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Left: Avatar + Info */}
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-xl font-bold text-indigo-700 dark:text-indigo-300">
                {trainer.initials}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {trainer.name}
                  </h1>
                  <Badge
                    variant="outline"
                    className={cn("text-[11px] font-medium", statusCfg.className)}
                  >
                    {statusCfg.label}
                  </Badge>
                </div>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {trainer.specialization} · {trainer.employmentType}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {trainer.activeClients} active clients
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarClock className="h-3.5 w-3.5" />
                    {trainer.todaysClasses} class{trainer.todaysClasses !== 1 ? "es" : ""} today
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info("Edit trainer — coming soon")}
                className="gap-1.5"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>

              {/* Update Availability */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAvailabilityMenu((p) => !p)}
                  className="gap-1.5"
                >
                  <CalendarClock className="h-3.5 w-3.5" />
                  Update Availability
                </Button>
                {showAvailabilityMenu && (
                  <div className="absolute right-0 top-10 z-20 w-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md p-1">
                    {AVAILABILITY_OPTIONS.map((opt) => {
                      const cfg = STATUS_CONFIG[opt];
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setAvailability(opt);
                            setShowAvailabilityMenu(false);
                            toast.success(`Availability updated to ${cfg.label}`);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                            availability === opt
                              ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                          )}
                        >
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <Button
                size="sm"
                onClick={() => toast.error("Remove Trainer — confirm action not yet implemented.")}
                className="gap-1.5 bg-red-600 text-white hover:bg-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <TrainerTabs trainer={{ ...trainer, status: availability }} />
    </div>
  );
}
