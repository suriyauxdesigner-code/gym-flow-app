"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { FullTrainer, TrainerAvailabilityStatus } from "@/lib/owner-data";

const PAGE_SIZE = 10;

const STATUS_CONFIG: Record<TrainerAvailabilityStatus, { label: string; dotCls: string; pillCls: string }> = {
  available: {
    label: "Available",
    dotCls: "bg-emerald-500",
    pillCls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  moderate: {
    label: "Moderate",
    dotCls: "bg-amber-500",
    pillCls: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  overloaded: {
    label: "Overloaded",
    dotCls: "bg-red-500",
    pillCls: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  },
  "on-leave": {
    label: "On Leave",
    dotCls: "bg-amber-400",
    pillCls: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
};

interface Props {
  trainers: FullTrainer[];
}

export default function TrainerTable({ trainers }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(PAGE_SIZE);

  const totalPages = Math.max(1, Math.ceil(trainers.length / rowsPerPage));
  const paginated = trainers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  function toggleAll() {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((t) => t.id)));
    }
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const allChecked = paginated.length > 0 && selected.size === paginated.length;

  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="w-10 pl-4 py-3">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 accent-indigo-600 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Trainer Name
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Specialization
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Sessions Today
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Total Clients
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginated.map((trainer) => {
                const statusCfg = STATUS_CONFIG[trainer.status];
                const pct = Math.min(trainer.utilizationPct, 100);
                return (
                  <tr
                    key={trainer.id}
                    onClick={() => router.push(`/owner/trainers/${trainer.id}`)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    {/* Checkbox */}
                    <td className="pl-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.has(trainer.id)}
                        onChange={() => toggleOne(trainer.id)}
                        className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 accent-indigo-600 cursor-pointer"
                      />
                    </td>

                    {/* Trainer Name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                            {trainer.initials}
                          </AvatarFallback>
                        </Avatar>
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

                    {/* Specialization */}
                    <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300">
                      <span className="font-medium">{trainer.specialization}</span>
                    </td>

                    {/* Sessions Today */}
                    <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300">
                      {trainer.todaysClasses}
                    </td>

                    {/* Total Clients */}
                    <td className="px-4 py-3.5">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                          {trainer.activeClients} Clients
                        </p>
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                          statusCfg.pillCls
                        )}
                      >
                        <span className={cn("h-1.5 w-1.5 rounded-full", statusCfg.dotCls)} />
                        {statusCfg.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/owner/trainers/${trainer.id}`);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 ml-auto"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {trainers.length === 0 && (
            <div className="flex flex-col items-center py-12 text-center">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No trainers found</p>
              <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 px-4 py-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {selected.size} of {trainers.length} row(s) selected.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Rows per page</span>
              <span className="flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 px-2 py-1 text-xs text-slate-700 dark:text-slate-300">
                {rowsPerPage}
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronFirst className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronLast className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
