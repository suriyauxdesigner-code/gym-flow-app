"use client";

import { useState } from "react";
import { Plus, Search, LayoutList, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ClassTable from "@/components/owner/classes/ClassTable";
import AddClassDialog from "@/components/owner/classes/AddClassDialog";
import { MOCK_GYM_CLASSES } from "@/lib/owner-data";
import type { GymClassStatus } from "@/lib/owner-data";
import { cn } from "@/lib/utils";

type FilterStatus = "all" | GymClassStatus;
type ViewMode = "list" | "week";

const STATUS_FILTERS: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getWeekDates(baseMonday: Date): Date[] {
  return DAY_NAMES.map((_, i) => {
    const d = new Date(baseMonday);
    d.setDate(baseMonday.getDate() + i);
    return d;
  });
}

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function fmtMonth(dates: Date[]): string {
  const months = Array.from(new Set(dates.map((d) => d.toLocaleString("default", { month: "long", year: "numeric" }))));
  return months.join(" / ");
}

export default function ClassesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [dialogOpen, setDialogOpen] = useState(false);

  const today = new Date();
  const [weekStart, setWeekStart] = useState<Date>(getMondayOfWeek(today));
  const weekDates = getWeekDates(weekStart);

  const todayNum = today.toDateString();
  const [selectedDay, setSelectedDay] = useState<string>(today.toDateString());

  const filtered = MOCK_GYM_CLASSES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.trainer.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Classes</h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Manage all scheduled sessions
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* View Toggle */}
          <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                viewMode === "list"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <LayoutList className="h-3.5 w-3.5" />
              List
            </button>
            <button
              type="button"
              onClick={() => setViewMode("week")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                viewMode === "week"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <Calendar className="h-3.5 w-3.5" />
              Week
            </button>
          </div>

          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Create Class
          </Button>
        </div>
      </div>

      {/* Calendar Week Picker — always visible */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4">
        {/* Month + nav */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {fmtMonth(weekDates)}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                const prev = new Date(weekStart);
                prev.setDate(prev.getDate() - 7);
                setWeekStart(prev);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setWeekStart(getMondayOfWeek(today))}
              className="px-2.5 py-1 rounded-md text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => {
                const next = new Date(weekStart);
                next.setDate(next.getDate() + 7);
                setWeekStart(next);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Day pills */}
        <div className="grid grid-cols-7 gap-1.5">
          {weekDates.map((date, i) => {
            const isToday = date.toDateString() === todayNum;
            const isSelected = date.toDateString() === selectedDay;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedDay(date.toDateString())}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl py-2 px-1 transition-colors",
                  isSelected
                    ? "bg-indigo-600 text-white"
                    : isToday
                    ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                )}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  {DAY_NAMES[i]}
                </span>
                <span className={cn("text-sm font-bold", isSelected ? "text-white" : "")}>
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm bg-white dark:bg-slate-900"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatusFilter(value)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                statusFilter === value
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-700"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
              )}
            >
              {label}
              {value !== "all" && (
                <span className="ml-1 text-slate-400 dark:text-slate-500">
                  {MOCK_GYM_CLASSES.filter((c) => c.status === value).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* List View */}
      {viewMode === "list" && <ClassTable classes={filtered} />}

      {/* Week View */}
      {viewMode === "week" && (
        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center py-24 text-center">
          <div>
            <Calendar className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Week View</p>
            <p className="text-xs text-slate-400 mt-1">Coming soon</p>
          </div>
        </div>
      )}

      {/* Create Class Dialog */}
      <AddClassDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
