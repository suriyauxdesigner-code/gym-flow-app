"use client";

import { useState } from "react";
import { CheckCircle2, Clock, XCircle, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { GymClass, ClassRosterMember } from "@/lib/owner-data";

type RosterStatus = ClassRosterMember["status"];

const ROSTER_STATUS_CONFIG: Record<
  RosterStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  booked: {
    label: "Booked",
    icon: <Clock className="h-3.5 w-3.5" />,
    className: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800",
  },
  attended: {
    label: "Attended",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  },
  absent: {
    label: "Absent",
    icon: <XCircle className="h-3.5 w-3.5" />,
    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800",
  },
  waitlist: {
    label: "Waitlist",
    icon: <Users className="h-3.5 w-3.5" />,
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
  },
};

interface Props {
  gymClass: GymClass;
}

export default function ClassTabs({ gymClass }: Props) {
  const [notes, setNotes] = useState(gymClass.notes);
  const [roster, setRoster] = useState(gymClass.roster);

  const booked = roster.filter((r) => r.status === "booked").length;
  const attended = roster.filter((r) => r.status === "attended").length;
  const absent = roster.filter((r) => r.status === "absent").length;
  const waitlisted = roster.filter((r) => r.status === "waitlist").length;

  function toggleAttendance(id: string) {
    setRoster((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        if (m.status === "booked") return { ...m, status: "attended" as const };
        if (m.status === "attended") return { ...m, status: "absent" as const };
        if (m.status === "absent") return { ...m, status: "booked" as const };
        return m;
      })
    );
  }

  return (
    <Tabs defaultValue="roster">
      <TabsList className="w-full justify-start rounded-none border-b border-slate-200 dark:border-slate-800 bg-transparent p-0 h-auto">
        {["roster", "attendance", "waitlist", "notes"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-1 text-sm font-medium capitalize text-slate-500 dark:text-slate-400 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* ── Roster ── */}
      <TabsContent value="roster" className="mt-6">
        <Card className="rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-4 px-6 pt-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Class Roster
              </CardTitle>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {roster.filter((r) => r.status !== "waitlist").length} / {gymClass.capacity} enrolled
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {roster.filter((r) => r.status !== "waitlist").length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-slate-400">No members enrolled.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Member</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Plan</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status</th>
                      <th className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {roster
                      .filter((m) => m.status !== "waitlist")
                      .map((m) => {
                        const sc = ROSTER_STATUS_CONFIG[m.status];
                        return (
                          <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="px-6 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
                                  {m.initials}
                                </div>
                                <span className="font-medium text-slate-900 dark:text-slate-100">{m.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{m.plan}</td>
                            <td className="px-4 py-3.5">
                              <Badge variant="outline" className={cn("gap-1 text-[11px] font-medium", sc.className)}>
                                {sc.icon}
                                {sc.label}
                              </Badge>
                            </td>
                            <td className="px-6 py-3.5 text-right">
                              <button
                                onClick={() => toggleAttendance(m.id)}
                                className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                              >
                                Toggle
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ── Attendance ── */}
      <TabsContent value="attendance" className="mt-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
          <StatCard label="Booked" value={booked} color="indigo" />
          <StatCard label="Present" value={attended} color="emerald" />
          <StatCard label="Absent" value={absent} color="red" />
          <StatCard
            label="Attendance Rate"
            value={
              booked + attended + absent > 0
                ? `${Math.round((attended / (attended + absent + booked)) * 100)}%`
                : "—"
            }
            color="slate"
          />
        </div>
        <Card className="rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-4 px-6 pt-6">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Attendance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Member</th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Plan</th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {roster
                    .filter((m) => m.status !== "waitlist" && m.status !== "booked")
                    .map((m) => {
                      const sc = ROSTER_STATUS_CONFIG[m.status];
                      return (
                        <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
                                {m.initials}
                              </div>
                              <span className="font-medium text-slate-900 dark:text-slate-100">{m.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{m.plan}</td>
                          <td className="px-4 py-3.5">
                            <Badge variant="outline" className={cn("gap-1 text-[11px] font-medium", sc.className)}>
                              {sc.icon}
                              {sc.label}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {roster.filter((m) => m.status !== "waitlist" && m.status !== "booked").length === 0 && (
                <p className="px-6 py-8 text-center text-sm text-slate-400">
                  No attendance data recorded yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ── Waitlist ── */}
      <TabsContent value="waitlist" className="mt-6">
        <Card className="rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-4 px-6 pt-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Waitlist
              </CardTitle>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {waitlisted} waiting
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {waitlisted === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-slate-400">
                {gymClass.enableWaitlist
                  ? "No members on the waitlist."
                  : "Waitlist is not enabled for this class."}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Member</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Plan</th>
                      <th className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {roster
                      .filter((m) => m.status === "waitlist")
                      .map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
                                {m.initials}
                              </div>
                              <span className="font-medium text-slate-900 dark:text-slate-100">{m.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{m.plan}</td>
                          <td className="px-6 py-3.5 text-right">
                            <button className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:border-emerald-300 hover:text-emerald-600 transition-colors">
                              Admit
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ── Notes ── */}
      <TabsContent value="notes" className="mt-6">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Class Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="Add notes about this class..."
              className="text-sm resize-none"
            />
            <Button
              size="sm"
              onClick={() => toast.success("Notes saved.")}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Notes
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
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
      </CardContent>
    </Card>
  );
}
