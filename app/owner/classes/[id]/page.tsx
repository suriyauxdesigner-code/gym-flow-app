"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Users, Clock, MapPin, Repeat, Pencil, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ClassTabs from "@/components/owner/classes/ClassTabs";
import { MOCK_GYM_CLASSES } from "@/lib/owner-data";
import type { GymClassStatus } from "@/lib/owner-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_CONFIG: Record<GymClassStatus, { label: string; className: string }> = {
  upcoming: {
    label: "Upcoming",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  },
  completed: {
    label: "Completed",
    className: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800",
  },
};

export default function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const gymClass = MOCK_GYM_CLASSES.find((c) => c.id === id);

  if (!gymClass) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Class not found</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => router.push("/owner/classes")}
        >
          Back to Classes
        </Button>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[gymClass.status];
  const pct = Math.round((gymClass.booked / gymClass.capacity) * 100);
  const roster = gymClass.roster;
  const present = roster.filter((m) => m.status === "attended").length;
  const absent = roster.filter((m) => m.status === "absent").length;
  const occupancyPct = Math.round((gymClass.booked / gymClass.capacity) * 100);

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/owner/classes")}
        className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Classes
      </button>

      {/* Class Header Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {gymClass.name}
                </h1>
                <Badge
                  variant="outline"
                  className={cn("text-[11px] font-medium", statusCfg.className)}
                >
                  {statusCfg.label}
                </Badge>
                {gymClass.isRecurring && (
                  <Badge
                    variant="outline"
                    className="text-[11px] font-medium bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800 gap-0.5"
                  >
                    <Repeat className="h-2.5 w-2.5" />
                    Recurring
                  </Badge>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {gymClass.date} · {gymClass.time} · {gymClass.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {gymClass.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {gymClass.booked}/{gymClass.capacity} enrolled
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Trainer: <span className="font-medium text-slate-700 dark:text-slate-300">{gymClass.trainer}</span>
              </p>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info("Edit class — coming soon")}
                className="gap-1.5"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button
                size="sm"
                onClick={() => toast.error("Cancel Class — confirm action not yet implemented.")}
                className="gap-1.5 bg-red-600 text-white hover:bg-red-700"
              >
                <XCircle className="h-3.5 w-3.5" />
                Cancel Class
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard
          label="Booked"
          value={gymClass.booked}
          sub={`of ${gymClass.capacity}`}
          color="indigo"
        />
        <MetricCard
          label="Present"
          value={present}
          sub="attended"
          color="emerald"
        />
        <MetricCard
          label="Absent"
          value={absent}
          sub="missed"
          color="red"
        />
        <MetricCard
          label="Occupancy"
          value={`${occupancyPct}%`}
          sub={gymClass.booked >= gymClass.capacity ? "Full" : "Available"}
          color={occupancyPct >= 100 ? "red" : occupancyPct >= 80 ? "amber" : "slate"}
        />
      </div>

      {/* Tabs */}
      <ClassTabs gymClass={gymClass} />
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string | number;
  sub: string;
  color: "indigo" | "emerald" | "red" | "amber" | "slate";
}) {
  const colorMap = {
    indigo: "text-indigo-600 dark:text-indigo-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    red: "text-red-600 dark:text-red-400",
    amber: "text-amber-600 dark:text-amber-400",
    slate: "text-slate-900 dark:text-slate-100",
  };
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className={cn("mt-1 text-2xl font-bold", colorMap[color])}>{value}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>
      </CardContent>
    </Card>
  );
}
