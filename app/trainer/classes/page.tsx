"use client";

import Link from "next/link";
import {
  Users,
  Clock,
  CheckCircle2,
  CalendarDays,
  ListFilter,
  LayoutGrid,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CLASS_SESSIONS, type ClassSession, getStatusConfig } from "@/lib/class-data";

// ─── Constants ────────────────────────────────────────────────────────────────

const DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = ["Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9"];
const TODAY_DAY = "Wed";

// ─── Shared helpers ───────────────────────────────────────────────────────────

function CapacityBar({ booked, capacity }: { booked: number; capacity: number }) {
  const pct   = Math.round((booked / capacity) * 100);
  const color = pct >= 100 ? "bg-red-400" : pct >= 80 ? "bg-amber-400" : "bg-emerald-400";
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <span className="text-xs tabular-nums text-slate-500">{booked}/{capacity}</span>
    </div>
  );
}

// ─── Stats row ────────────────────────────────────────────────────────────────

function StatsRow({ sessions }: { sessions: ClassSession[] }) {
  const todayCount    = sessions.filter((s) => s.day === TODAY_DAY).length;
  const inProgress    = sessions.filter((s) => s.status === "in-progress").length;
  const completed     = sessions.filter((s) => s.status === "completed").length;
  const totalBooked   = sessions.reduce((a, s) => a + s.booked, 0);
  const totalCapacity = sessions.reduce((a, s) => a + s.capacity, 0);

  const stats = [
    { label: "Today's Classes", value: todayCount,       sub: `${inProgress} in progress`,              icon: CalendarDays, iconBg: "bg-indigo-50",  iconColor: "text-indigo-600"  },
    { label: "Total This Week", value: sessions.length,  sub: "Mon – Sun",                              icon: LayoutGrid,   iconBg: "bg-violet-50",  iconColor: "text-violet-600"  },
    { label: "Completed",       value: completed,        sub: `${sessions.length - completed} remaining`,icon: CheckCircle2, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
    { label: "Spots Filled",    value: totalBooked,      sub: `of ${totalCapacity} total`,               icon: Users,        iconBg: "bg-amber-50",   iconColor: "text-amber-600"   },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", s.iconBg)}>
              <s.icon className={cn("h-5 w-5", s.iconColor)} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs font-medium text-slate-600">{s.label}</p>
              <p className="text-[10px] text-slate-400">{s.sub}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Week view ────────────────────────────────────────────────────────────────

function WeekView({ sessions }: { sessions: ClassSession[] }) {
  return (
    <div className="grid grid-cols-7 gap-3">
      {DAYS.map((day, i) => {
        const daySessions = sessions.filter((s) => s.day === day);
        const isToday     = day === TODAY_DAY;
        return (
          <div key={day} className="min-w-0">
            {/* Day header */}
            <div className={cn("mb-3 rounded-lg py-2 text-center", isToday ? "bg-indigo-600" : "bg-slate-50")}>
              <p className={cn("text-[10px] font-bold uppercase tracking-widest", isToday ? "text-indigo-100" : "text-slate-400")}>{day}</p>
              <p className={cn("text-sm font-bold", isToday ? "text-white" : "text-slate-700")}>{DATES[i].split(" ")[1]}</p>
            </div>

            {/* Session blocks */}
            <div className="space-y-2">
              {daySessions.length === 0 ? (
                <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-slate-200">
                  <span className="text-[10px] text-slate-300">No classes</span>
                </div>
              ) : (
                daySessions.map((session) => {
                  const cfg = getStatusConfig(session.status);
                  return (
                    <div key={session.id} className={cn("rounded-xl p-3 transition-shadow hover:shadow-md", cfg.cardBg)}>
                      <div className="mb-1 flex items-start justify-between gap-1">
                        <p className="truncate text-[11px] font-semibold leading-tight text-slate-900">{session.name}</p>
                        <div className={cn("mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full", cfg.dot)} />
                      </div>
                      <p className="mb-2 text-[10px] text-slate-500">{session.time}</p>
                      <CapacityBar booked={session.booked} capacity={session.capacity} />
                      <Button size="sm" variant="outline" className="mt-2 h-6 w-full text-[10px] font-medium" asChild>
                        <Link href={`/trainer/classes/${session.id}`}>View Roster</Link>
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── List view ────────────────────────────────────────────────────────────────

function ListView({ sessions }: { sessions: ClassSession[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-6">Class</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Booked / Cap.</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="pr-6 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => {
          const cfg         = getStatusConfig(session.status);
          const isCompleted = session.status === "completed";
          return (
            <TableRow key={session.id}>
              <TableCell className="pl-6">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 shrink-0 rounded-full", cfg.dot)} />
                  <span className="font-semibold text-slate-900">{session.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-slate-600">{session.date}</TableCell>
              <TableCell>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {session.time}
                </span>
              </TableCell>
              <TableCell>
                <CapacityBar booked={session.booked} capacity={session.capacity} />
              </TableCell>
              <TableCell>
                <Badge variant={cfg.badge}>{cfg.label}</Badge>
              </TableCell>
              <TableCell className="pr-6">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs" asChild>
                    <Link href={`/trainer/classes/${session.id}`}>
                      <Users className="h-3.5 w-3.5" />
                      View
                    </Link>
                  </Button>
                  <Button size="sm" className="gap-1.5 text-xs" disabled={isCompleted} asChild={!isCompleted}>
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Attendance
                      </>
                    ) : (
                      <Link href={`/trainer/classes/${session.id}`}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Attendance
                      </Link>
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsRow sessions={CLASS_SESSIONS} />

      {/* Schedule card with tab toggle */}
      <Tabs defaultValue="week">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">Weekly Schedule</CardTitle>
                <p className="mt-0.5 text-xs text-slate-500">Mar 3 – 9, 2025</p>
              </div>
              <TabsList>
                <TabsTrigger value="week" className="gap-1.5 text-xs">
                  <LayoutGrid className="h-3.5 w-3.5" />
                  Week View
                </TabsTrigger>
                <TabsTrigger value="list" className="gap-1.5 text-xs">
                  <ListFilter className="h-3.5 w-3.5" />
                  List View
                </TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>

          <TabsContent value="week" className="mt-0">
            <CardContent className="overflow-x-auto pb-6">
              <div className="min-w-[900px]">
                <WeekView sessions={CLASS_SESSIONS} />
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <CardContent className="p-0 pb-2">
              <ListView sessions={CLASS_SESSIONS} />
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
