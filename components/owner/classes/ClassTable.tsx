"use client";

import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { GymClass, GymClassStatus } from "@/lib/owner-data";

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

interface Props {
  classes: GymClass[];
}

export default function ClassTable({ classes }: Props) {
  const router = useRouter();

  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      <CardHeader className="pb-4 px-6 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Class Schedule
          </CardTitle>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {classes.length} class{classes.length !== 1 ? "es" : ""}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Trainer
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Capacity
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Booked
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {classes.map((cls) => {
                const statusCfg = STATUS_CONFIG[cls.status];
                const pct = Math.round((cls.booked / cls.capacity) * 100);
                return (
                  <tr
                    key={cls.id}
                    onClick={() => router.push(`/owner/classes/${cls.id}`)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-3.5">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{cls.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{cls.location}</p>
                    </td>

                    <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300">
                      {cls.trainer}
                    </td>

                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">
                      {cls.date}
                    </td>

                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">
                      {cls.time}
                    </td>

                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">
                      {cls.capacity}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              pct >= 100
                                ? "bg-red-500"
                                : pct >= 80
                                ? "bg-amber-400"
                                : "bg-indigo-500"
                            )}
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {cls.booked}/{cls.capacity}
                        </span>
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

                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/owner/classes/${cls.id}`);
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

          {classes.length === 0 && (
            <div className="flex flex-col items-center py-12 text-center">
              <Users className="h-8 w-8 text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No classes found
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
