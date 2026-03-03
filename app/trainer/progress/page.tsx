"use client";

import { useState, useMemo } from "react";
import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  PROGRESS_LOGS,
  CLIENTS_NEEDING_UPDATE,
  type DateFilter,
  filterLogsByDate,
  getProgressMetrics,
} from "@/lib/progress-data";
import ProgressSummary from "@/components/progress/ProgressSummary";
import ProgressTable from "@/components/progress/ProgressTable";
import ClientsNeedingUpdateCard from "@/components/progress/ClientsNeedingUpdate";

const DATE_FILTER_OPTIONS: { label: string; value: DateFilter }[] = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All Time", value: "all" },
];

export default function ProgressLogsPage() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("week");
  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    let logs = filterLogsByDate(PROGRESS_LOGS, dateFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      logs = logs.filter((log) =>
        log.clientName.toLowerCase().includes(q)
      );
    }
    return [...logs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [dateFilter, search]);

  const metrics = useMemo(() => getProgressMetrics(PROGRESS_LOGS), []);

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Progress Logs</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track and manage client performance updates
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Date filter pill group */}
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-sm">
            {DATE_FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDateFilter(opt.value)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  dateFilter === opt.value
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-44 pl-8 text-sm"
            />
          </div>

          {/* Export (UI only) */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <Download className="h-3.5 w-3.5" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* ── Summary Metrics ── */}
      <ProgressSummary
        logsThisWeek={metrics.logsThisWeek}
        clientsUpdated={metrics.clientsUpdated}
        clientsNeedingUpdate={metrics.clientsNeedingUpdate}
        avgWeightChange={metrics.avgWeightChange}
      />

      {/* ── Recent Logs Table ── */}
      <ProgressTable logs={filteredLogs} />

      {/* ── Clients Needing Update ── */}
      <ClientsNeedingUpdateCard clients={CLIENTS_NEEDING_UPDATE} />
    </div>
  );
}
