"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { REVENUE_MONTHS } from "@/lib/owner-data";

type Period = "monthly" | "weekly";

const WEEKLY_DATA = [
  { month: "Mon", revenue: 1640 },
  { month: "Tue", revenue: 2100 },
  { month: "Wed", revenue: 1880 },
  { month: "Thu", revenue: 2450 },
  { month: "Fri", revenue: 2890 },
  { month: "Sat", revenue: 3120 },
  { month: "Sun", revenue: 400 },
];

export default function RevenueCard() {
  const [period, setPeriod] = useState<Period>("monthly");
  const data = period === "monthly" ? REVENUE_MONTHS : WEEKLY_DATA;
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const totalRevenue = period === "monthly"
    ? "$12,480"
    : "$14,480";

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Revenue Overview
            </CardTitle>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {period === "monthly" ? "Last 7 months" : "This week"}
            </p>
          </div>
          <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 dark:border-slate-700 p-0.5">
            {(["monthly", "weekly"] as Period[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-colors capitalize",
                  period === p
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                {p === "monthly" ? "Monthly" : "Weekly"}
              </button>
            ))}
          </div>
        </div>

        {/* Summary row */}
        <div className="mt-3 flex items-end gap-2">
          <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            {totalRevenue}
          </span>
          <span className="mb-1 text-sm font-medium text-emerald-600">
            ↑ {period === "monthly" ? "+8.3% vs last month" : "+12% vs last week"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        {/* Bar Chart */}
        <div className="mt-4 flex items-end gap-2 h-40">
          {data.map((item, idx) => {
            const heightPct = (item.revenue / maxRevenue) * 100;
            const isLast = idx === data.length - 1;
            return (
              <div
                key={item.month}
                className="flex flex-1 flex-col items-center gap-1.5"
              >
                <div className="relative w-full flex items-end" style={{ height: "120px" }}>
                  <div
                    className={cn(
                      "w-full rounded-t-md transition-all duration-300",
                      isLast
                        ? "bg-indigo-600"
                        : "bg-indigo-100 dark:bg-indigo-950/60 hover:bg-indigo-200 dark:hover:bg-indigo-900/60"
                    )}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-indigo-600" />
            <span>Current period</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-indigo-100 dark:bg-indigo-950/60" />
            <span>Previous periods</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
