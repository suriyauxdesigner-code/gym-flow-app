import {
  Users,
  DollarSign,
  AlertCircle,
  CalendarClock,
  Zap,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MetricCard from "@/components/dashboard/MetricCard";
import RevenueCard from "@/components/owner/dashboard/RevenueCard";
import { MOCK_TRAINER_WORKLOADS, MOCK_OWNER_CLASSES } from "@/lib/owner-data";
import { cn } from "@/lib/utils";

// ── KPI Data ──────────────────────────────────────────────────────────────────
const metrics = [
  {
    title: "Total Active Members",
    value: 248,
    subtext: "Across all plans",
    icon: Users,
    iconBg: "bg-indigo-50 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    trend: { value: "+12 this month", positive: true },
  },
  {
    title: "Monthly Revenue",
    value: "$12,480",
    subtext: "March 2026",
    icon: DollarSign,
    iconBg: "bg-emerald-50 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    trend: { value: "+8.3% vs Feb", positive: true },
  },
  {
    title: "Pending Payments",
    value: 7,
    subtext: "Requires collection",
    icon: AlertCircle,
    iconBg: "bg-amber-50 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    trend: { value: "↑ 2 from last week", positive: false },
  },
  {
    title: "Expiring Soon",
    value: 14,
    subtext: "Within 30 days",
    icon: CalendarClock,
    iconBg: "bg-orange-50 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Auto-Pay Active",
    value: 183,
    subtext: "74% of members",
    icon: Zap,
    iconBg: "bg-purple-50 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    trend: { value: "+5 this month", positive: true },
  },
  {
    title: "Failed Payments",
    value: 3,
    subtext: "Needs follow-up",
    icon: XCircle,
    iconBg: "bg-red-50 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
  },
];

// ── Trainer Status Badge ───────────────────────────────────────────────────────
function TrainerStatusBadge({
  status,
}: {
  status: "available" | "busy" | "full";
}) {
  if (status === "available") {
    return (
      <Badge variant="success" className="gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Available
      </Badge>
    );
  }
  if (status === "busy") {
    return (
      <Badge variant="warning" className="gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Busy
      </Badge>
    );
  }
  return (
    <Badge variant="destructive" className="gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      Full
    </Badge>
  );
}

// ── Class Status Badge ────────────────────────────────────────────────────────
function ClassStatusBadge({
  status,
}: {
  status: "Scheduled" | "In Progress" | "Full";
}) {
  if (status === "In Progress") {
    return (
      <Badge variant="success" className="gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        In Progress
      </Badge>
    );
  }
  if (status === "Full") {
    return (
      <Badge variant="indigo" className="gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
        Full
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      Scheduled
    </Badge>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function OwnerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m) => (
          <div key={m.title} className="xl:col-span-2 sm:col-span-1">
            <MetricCard {...m} />
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <RevenueCard />

      {/* Two-column: Trainer Workload + Upcoming Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Trainer Workload Table — 3 cols */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Trainer Workload
                </CardTitle>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {MOCK_TRAINER_WORKLOADS.length} trainers active
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 dark:border-slate-800">
                    <TableHead className="pl-6">Trainer</TableHead>
                    <TableHead>Clients</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead className="pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_TRAINER_WORKLOADS.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="text-xs font-semibold">
                              {t.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                            {t.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                        {t.activeClients}
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                        {t.todayClasses}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                t.utilization >= 90
                                  ? "bg-red-400"
                                  : t.utilization >= 70
                                  ? "bg-amber-400"
                                  : "bg-emerald-500"
                              )}
                              style={{ width: `${t.utilization}%` }}
                            />
                          </div>
                          <span
                            className={cn(
                              "text-xs font-medium",
                              t.utilization >= 90
                                ? "text-red-600"
                                : t.utilization >= 70
                                ? "text-amber-600"
                                : "text-emerald-600"
                            )}
                          >
                            {t.utilization}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="pr-6">
                        <TrainerStatusBadge status={t.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Classes — 2 cols */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Today&apos;s Classes
                </CardTitle>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {MOCK_OWNER_CLASSES.length} scheduled
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_OWNER_CLASSES.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {cls.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {cls.trainer} · {cls.time}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="h-1 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{
                              width: `${Math.round((cls.booked / cls.capacity) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {cls.booked}/{cls.capacity}
                        </span>
                      </div>
                    </div>
                    <ClassStatusBadge status={cls.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
