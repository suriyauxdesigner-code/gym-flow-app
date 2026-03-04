"use client";

import { useState } from "react";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ClassTable from "@/components/owner/classes/ClassTable";
import AddClassDialog from "@/components/owner/classes/AddClassDialog";
import { MOCK_GYM_CLASSES } from "@/lib/owner-data";
import type { GymClassStatus } from "@/lib/owner-data";
import { cn } from "@/lib/utils";

type FilterStatus = "all" | GymClassStatus;

const TWO_WEEKS = 14;

const SHORT_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getTwoWeekDates(baseMonday: Date): Date[] {
  return Array.from({ length: TWO_WEEKS }, (_, i) => {
    const d = new Date(baseMonday);
    d.setDate(baseMonday.getDate() + i);
    return d;
  });
}

function getDayName(date: Date): string {
  return SHORT_DAYS[date.getDay() === 0 ? 6 : date.getDay() - 1];
}

export default function ClassesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const today = new Date();
  const [weekStart, setWeekStart] = useState<Date>(getMondayOfWeek(today));
  const twoWeekDates = getTwoWeekDates(weekStart);

  const todayNum = today.toDateString();
  const [selectedDay, setSelectedDay] = useState<string>(today.toDateString());

  const specializations = Array.from(
    new Set(MOCK_GYM_CLASSES.map((c) => c.location))
  );

  const filtered = MOCK_GYM_CLASSES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.trainer.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesSpec =
      specializationFilter === "all" || c.location === specializationFilter;
    return matchesSearch && matchesStatus && matchesSpec;
  });

  const selectCls =
    "h-9 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8 appearance-none";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Classes</h1>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 self-start sm:self-auto"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Create Class
        </Button>
      </div>

      {/* Calendar — 2-week date strip */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4">
        {/* Nav row */}
        <div className="flex items-center justify-between mb-3">
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

        {/* 14 day pills */}
        <div className="grid grid-cols-7 gap-1.5">
          {twoWeekDates.map((date, i) => {
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
                  {getDayName(date)}
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
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm bg-white dark:bg-slate-900"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
              className={selectCls}
            >
              <option value="all">Status</option>
              <option value="upcoming">Not Started</option>
              <option value="in-progress">On Going</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronRight className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rotate-90 text-slate-400" />
          </div>

          <div className="relative">
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className={selectCls}
            >
              <option value="all">Specialization</option>
              {specializations.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronRight className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rotate-90 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <ClassTable classes={filtered} />

      {/* Create Class Dialog */}
      <AddClassDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
