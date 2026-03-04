import {
  Users,
  AlertCircle,
  CalendarClock,
  Zap,
  XCircle,
  TrendingUp,
  Calendar,
  Clock,
  UsersRound,
  UserRound,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_GYM_CLASSES, MOCK_MEMBERS } from "@/lib/owner-data";
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

// ── Chart SVG data ─────────────────────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const REVENUE_PATH =
  "M 0,55 C 28,52 58,44 86,44 C 114,44 144,46 172,46 C 200,46 230,30 258,30 C 286,30 316,15 344,15 C 372,15 402,10 430,10";
const REVENUE_FILL = REVENUE_PATH + " L 430,88 L 0,88 Z";
const REVENUE_DOTS = [
  { cx: 0, cy: 55 }, { cx: 86, cy: 44 }, { cx: 172, cy: 46 },
  { cx: 258, cy: 30 }, { cx: 344, cy: 15 }, { cx: 430, cy: 10 },
];

const MEMBER_PATH =
  "M 0,58 C 28,54 58,48 86,48 C 114,48 144,38 172,38 C 200,38 230,27 258,27 C 286,27 316,13 344,13 C 372,13 402,6 430,6";
const MEMBER_FILL = MEMBER_PATH + " L 430,88 L 0,88 Z";
const MEMBER_DOTS = [
  { cx: 0, cy: 58 }, { cx: 86, cy: 48 }, { cx: 172, cy: 38 },
  { cx: 258, cy: 27 }, { cx: 344, cy: 13 }, { cx: 430, cy: 6 },
];

// ── Status configs ─────────────────────────────────────────────────────────────
const CLASS_STATUS_CONFIG: Record<string, { label: string; pillCls: string; dotCls: string }> = {
  upcoming: {
    label: "Not Started",
    pillCls: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
    dotCls: "bg-indigo-500",
  },
  "in-progress": {
    label: "On Going",
    pillCls: "bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    dotCls: "bg-amber-500",
  },
  completed: {
    label: "Completed",
    pillCls: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dotCls: "bg-slate-400",
  },
  cancelled: {
    label: "Cancelled",
    pillCls: "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400",
    dotCls: "bg-red-500",
  },
};

const MEMBER_BADGE: Record<string, { label: string; cls: string }> = {
  expired: { label: "EXPIRED", cls: "bg-red-200 text-red-600 dark:bg-red-950/40 dark:text-red-400" },
  due: { label: "DUE", cls: "bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" },
  active: { label: "ACTIVE", cls: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" },
  frozen: { label: "FROZEN", cls: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" },
};

const DUMMY_DATES = ["Monday, Oct 12", "Tuesday, Oct 13", "Wednesday, Oct 14", "Thursday, Oct 15"];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function OwnerDashboardPage() {
  const upcomingClasses = [
    ...MOCK_GYM_CLASSES.filter((c) => c.status === "in-progress"),
    ...MOCK_GYM_CLASSES.filter((c) => c.status === "upcoming"),
  ].slice(0, 4);

  const expiringMembers = [
    ...MOCK_MEMBERS.filter((m) => m.paymentStatus === "expired"),
    ...MOCK_MEMBERS.filter((m) => m.paymentStatus === "due"),
  ].slice(0, 6);

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

      {/* Chart Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Revenue Trend */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Monthly Revenue Trend
              </CardTitle>
              <span className="flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                Last 6 Months <ChevronDown className="h-3 w-3 ml-0.5" />
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              ₹18,000
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">+18%</span>{" "}
              since last Month
            </p>
            <div className="mt-4">
              <svg viewBox="0 0 430 90" className="w-full" height="110" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path d={REVENUE_FILL} fill="url(#revenueGrad)" />
                <path d={REVENUE_PATH} fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                {REVENUE_DOTS.map((d, i) => (
                  <circle key={i} cx={d.cx} cy={d.cy} r="3.5" fill="#4f46e5" />
                ))}
              </svg>
              <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                {MONTHS.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Member Growth Trend */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Member Growth Trend
              </CardTitle>
              <span className="flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                Last 6 Months <ChevronDown className="h-3 w-3 ml-0.5" />
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              26
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">+18%</span>{" "}
              since last Month
            </p>
            <div className="mt-4">
              <svg viewBox="0 0 430 90" className="w-full" height="110" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="memberGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path d={MEMBER_FILL} fill="url(#memberGrad)" />
                <path d={MEMBER_PATH} fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                {MEMBER_DOTS.map((d, i) => (
                  <circle key={i} cx={d.cx} cy={d.cy} r="3.5" fill="#4f46e5" />
                ))}
              </svg>
              <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                {MONTHS.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Classes */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Upcoming Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2 pb-4">
            {upcomingClasses.map((cls, i) => {
              const statusCfg = CLASS_STATUS_CONFIG[cls.status] ?? CLASS_STATUS_CONFIG.upcoming;
              return (
                <div
                  key={cls.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {cls.name}
                    </p>
                    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", statusCfg.pillCls)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", statusCfg.dotCls)} />
                      {statusCfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="h-3 w-3" />
                      {DUMMY_DATES[i % DUMMY_DATES.length]}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="h-3 w-3" />
                      {cls.time}
                    </span>
                  </div>
                  <hr className="border-slate-100 dark:border-slate-800" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                          {cls.trainer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                          Assigned Trainer
                        </p>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {cls.trainer}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 shrink-0">
                        <UsersRound className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                          Capacity
                        </p>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {cls.booked}/{cls.capacity} filled
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {upcomingClasses.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400">No upcoming classes</p>
            )}
          </CardContent>
        </Card>

        {/* Expiring Members */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Expiring Members
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2 pb-4">
            {expiringMembers.map((member) => {
              const badge = MEMBER_BADGE[member.paymentStatus] ?? MEMBER_BADGE.active;
              return (
                <div
                  key={member.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="text-sm font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                          {member.name}
                        </p>
                        <span className={cn("rounded-full px-3 py-0.5 text-xs font-semibold", badge.cls)}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{member.plan}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <UserRound className="h-3 w-3" />
                          Tr. {member.trainer}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          Exp: {member.expiryDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {expiringMembers.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400">No expiring members</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
