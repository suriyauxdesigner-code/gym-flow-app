"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FullTrainer, MemberPaymentStatus } from "@/lib/owner-data";

const PAYMENT_STATUS_CONFIG: Record<
  MemberPaymentStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  },
  due: {
    label: "Due",
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
  },
  expired: {
    label: "Expired",
    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800",
  },
  frozen: {
    label: "Frozen",
    className: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  },
};

const CLASS_STATUS_CONFIG = {
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
  trainer: FullTrainer;
}

export default function TrainerTabs({ trainer }: Props) {
  const TABS = ["overview", "clients", "classes", "performance"] as const;

  return (
    <Tabs defaultValue="overview">
      <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl h-auto gap-0.5">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="rounded-lg px-4 py-2 text-sm font-medium capitalize data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* ── Overview ── */}
      <TabsContent value="overview">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Left */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Email" value={trainer.email} />
                <InfoRow label="Phone" value={trainer.phone} />
                <InfoRow label="Gender" value={trainer.gender} />
                <InfoRow label="Member Since" value={trainer.joinDate} />
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Employment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Specialization" value={trainer.specialization} />
                <InfoRow label="Employment Type" value={trainer.employmentType} />
                <InfoRow label="Experience" value={`${trainer.experience} years`} />
                <InfoRow label="Certification" value={trainer.certification} />
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100 dark:divide-slate-800">
                {(
                  [
                    ["canAssignWorkout", "Can Assign Workout"],
                    ["canAssignMealPlan", "Can Assign Meal Plan"],
                    ["canMarkAttendance", "Can Mark Attendance"],
                    ["canViewPayments", "Can View Payments"],
                    ["canEditClasses", "Can Edit Classes"],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between py-2.5">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
                    {trainer.permissions[key] ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Utilization" value={`${trainer.utilizationPct}%`} />
              <StatCard label="Attendance Rate" value={`${trainer.attendanceRate}%`} />
              <StatCard label="Weekly Classes" value={trainer.weeklyClassCount} />
              <StatCard label="Active Clients" value={trainer.activeClients} />
            </div>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Bio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {trainer.bio}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      {/* ── Clients ── */}
      <TabsContent value="clients">
        <Card className="rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-4 px-6 pt-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Assigned Clients
              </CardTitle>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {trainer.clients.length} client{trainer.clients.length !== 1 ? "s" : ""}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {trainer.clients.length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-slate-400">
                No clients currently assigned to this trainer.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Member</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Plan</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Expiry</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {trainer.clients.map((c) => {
                      const sc = PAYMENT_STATUS_CONFIG[c.status];
                      return (
                        <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
                                {c.initials}
                              </div>
                              <span className="font-medium text-slate-900 dark:text-slate-100">{c.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{c.plan}</td>
                          <td className="px-4 py-3.5">
                            <Badge variant="outline" className={cn("text-[11px] font-medium", sc.className)}>
                              {sc.label}
                            </Badge>
                          </td>
                          <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{c.expiryDate}</td>
                          <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{c.attendanceRate}%</td>
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

      {/* ── Classes ── */}
      <TabsContent value="classes">
        <Card className="rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="pb-4 px-6 pt-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Assigned Classes
              </CardTitle>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {trainer.classes.length} class{trainer.classes.length !== 1 ? "es" : ""}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {trainer.classes.length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-slate-400">
                No classes currently assigned to this trainer.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Class</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Date & Time</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Capacity</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Attendance</th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {trainer.classes.map((c) => {
                      const sc = CLASS_STATUS_CONFIG[c.status];
                      const pct = Math.round((c.booked / c.capacity) * 100);
                      return (
                        <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="px-6 py-3.5 font-medium text-slate-900 dark:text-slate-100">{c.name}</td>
                          <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{c.date} · {c.time}</td>
                          <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{c.booked}/{c.capacity}</td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                                <div
                                  className="h-full rounded-full bg-indigo-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-500 dark:text-slate-400">{pct}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <Badge variant="outline" className={cn("text-[11px] font-medium", sc.className)}>
                              {sc.label}
                            </Badge>
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

      {/* ── Performance ── */}
      <TabsContent value="performance">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
          <StatCard label="Attendance Rate" value={`${trainer.attendanceRate}%`} />
          <StatCard label="Client Retention" value="87%" />
          <StatCard label="Revenue Contribution" value="$3,240" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ChartPlaceholder title="Attendance Rate (Last 30 Days)" />
          <ChartPlaceholder title="Client Retention Trend" />
        </div>
      </TabsContent>
    </Tabs>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs font-medium text-slate-400 dark:text-slate-500 shrink-0">{label}</span>
      <span className="text-sm text-slate-700 dark:text-slate-300 text-right">{value}</span>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
      </CardContent>
    </Card>
  );
}

function ChartPlaceholder({ title }: { title: string }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-40 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-400">Chart coming soon</p>
        </div>
      </CardContent>
    </Card>
  );
}
