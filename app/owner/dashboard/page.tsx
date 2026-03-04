import {
  Users,
  AlertCircle,
  CalendarClock,
  Zap,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RevenueCard from "@/components/owner/dashboard/RevenueCard";
import { MOCK_TRAINER_WORKLOADS, MOCK_OWNER_CLASSES } from "@/lib/owner-data";
import { cn } from "@/lib/utils";

// ── KPI Data ──────────────────────────────────────────────────────────────────
const metrics = [
  {
    title: "Total Active Members",
    value: "248",
    subtext: "Across all plans",
    trend: "↑ +12 this month",
    trendPositive: true,
    icon: Users,
    iconBg: "bg-indigo-50 dark:bg-indigo-900/30",
    iconColor: "text-indigo-500 dark:text-indigo-400",
    valueColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Monthly Revenue",
    value: "₹18,000",
    subtext: "March 2026",
    trend: "↑ +8.3% vs Feb",
    trendPositive: true,
    icon: TrendingUp,
    iconBg: "bg-emerald-50 dark:bg-emerald-900/30",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    valueColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Pending Payments",
    value: "7",
    subtext: "Requires collection",
    trend: "↓ 2 from last week",
    trendPositive: false,
    icon: AlertCircle,
    iconBg: "bg-amber-50 dark:bg-amber-900/30",
    iconColor: "text-amber-500 dark:text-amber-400",
    valueColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Expiring Soon",
    value: "15",
    subtext: "Across all plans",
    trend: null,
    trendPositive: true,
    icon: CalendarClock,
    iconBg: "bg-orange-50 dark:bg-orange-900/30",
    iconColor: "text-orange-500 dark:text-orange-400",
    valueColor: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Auto-Pay Active",
    value: "183",
    subtext: "74% of members",
    trend: null,
    trendPositive: true,
    icon: Zap,
    iconBg: "bg-purple-50 dark:bg-purple-900/30",
    iconColor: "text-purple-500 dark:text-purple-400",
    valueColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Failed Payments",
    value: "3",
    subtext: "Needs follow-up",
    trend: null,
    trendPositive: false,
    icon: XCircle,
    iconBg: "bg-red-50 dark:bg-red-900/30",
    iconColor: "text-red-500 dark:text-red-400",
    valueColor: "text-red-600 dark:text-red-400",
  },
];

// ── Status Badges ─────────────────────────────────────────────────────────────
function TrainerStatusBadge({ status }: { status: "available" | "busy" | "full" }) {
  const styles = {
    available: { pill: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", dot: "bg-emerald-500", label: "Available" },
    busy: { pill: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", dot: "bg-amber-500", label: "Busy" },
    full: { pill: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300", dot: "bg-red-500", label: "Full" },
  }[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", styles.pill)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
      {styles.label}
    </span>
  );
}

function ClassStatusBadge({ status }: { status: "Scheduled" | "In Progress" | "Full" }) {
  const map: Record<string, { pill: string; dot: string }> = {
    "In Progress": { pill: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300", dot: "bg-emerald-500" },
    Full: { pill: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300", dot: "bg-indigo-500" },
    Scheduled: { pill: "bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300", dot: "bg-slate-400" },
  };
  const s = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", s.pill)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {status}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function OwnerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <p className="text-sm text-slate-400 dark:text-slate-500">
        GymFlow &rsaquo; <span className="text-slate-600 dark:text-slate-400">Dashboard</span>
      </p>

      {/* Greeting */}
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Good Morning,{" "}
        <span className="text-indigo-600 dark:text-indigo-400">Alex Johnson</span>
      </h1>

      {/* KPI Cards — 3 per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <Card key={m.title} className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{m.title}</p>
                  <p className={cn("text-2xl font-bold", m.valueColor)}>{m.value}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{m.subtext}</span>
                    {m.trend && (
                      <span className={cn("text-xs font-medium", m.trendPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400")}>
                        {m.trend}
                      </span>
                    )}
                  </div>
                </div>
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ml-3", m.iconBg)}>
                  <m.icon className={cn("h-5 w-5", m.iconColor)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <RevenueCard />

      {/* Two-column: Trainer Workload + Today's Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Trainer Workload — 3 cols */}
        <div className="lg:col-span-3">
          <Card className="rounded-2xl shadow-sm">
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
                            <AvatarFallback className="text-xs font-semibold">{t.initials}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-slate-900 dark:text-slate-100 text-sm">{t.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 text-sm">{t.activeClients}</TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 text-sm">{t.todayClasses}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                            <div
                              className={cn("h-full rounded-full", t.utilization >= 90 ? "bg-red-400" : t.utilization >= 70 ? "bg-amber-400" : "bg-emerald-500")}
                              style={{ width: `${t.utilization}%` }}
                            />
                          </div>
                          <span className={cn("text-xs font-medium", t.utilization >= 90 ? "text-red-600" : t.utilization >= 70 ? "text-amber-600" : "text-emerald-600")}>
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

        {/* Today's Classes — 2 cols */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl shadow-sm h-full">
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
                  <div key={cls.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{cls.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cls.trainer} &middot; {cls.time}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="h-1 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                          <div className="h-full rounded-full bg-indigo-500" style={{ width: `${Math.round((cls.booked / cls.capacity) * 100)}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400">{cls.booked}/{cls.capacity}</span>
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
