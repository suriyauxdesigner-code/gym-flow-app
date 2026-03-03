"use client";

import { useRouter } from "next/navigation";
import { Users, Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FullTrainer, TrainerAvailabilityStatus } from "@/lib/owner-data";

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

interface Props {
  trainers: FullTrainer[];
}

export default function TrainerTable({ trainers }: Props) {
  const router = useRouter();

  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      <CardHeader className="pb-4 px-6 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Trainer Directory
          </CardTitle>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {trainers.length} trainer{trainers.length !== 1 ? "s" : ""}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Trainer
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Specialization
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Active Clients
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Today's Classes
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Utilization
                </th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {trainers.map((trainer) => {
                const statusCfg = STATUS_CONFIG[trainer.status];
                return (
                  <tr
                    key={trainer.id}
                    onClick={() => router.push(`/owner/trainers/${trainer.id}`)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                          {trainer.initials}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {trainer.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {trainer.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300">
                      {trainer.specialization}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Users className="h-3.5 w-3.5 text-slate-400" />
                        {trainer.activeClients}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Dumbbell className="h-3.5 w-3.5 text-slate-400" />
                        {trainer.todaysClasses}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge
                        variant="outline"
                        className={cn("text-[11px] font-medium", statusCfg.className)}
                      >
                        {statusCfg.label}
                      </Badge>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              trainer.utilizationPct >= 90
                                ? "bg-red-500"
                                : trainer.utilizationPct >= 70
                                ? "bg-amber-400"
                                : "bg-emerald-500"
                            )}
                            style={{ width: `${trainer.utilizationPct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 w-8">
                          {trainer.utilizationPct}%
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/owner/trainers/${trainer.id}`);
                        }}
                        className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {trainers.length === 0 && (
            <div className="flex flex-col items-center py-12 text-center">
              <Users className="h-8 w-8 text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No trainers found
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try adjusting your search or filter.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
