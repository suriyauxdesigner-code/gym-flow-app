import {
  Users,
  Dumbbell,
  ClipboardList,
  CalendarClock,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/dashboard/MetricCard";
import ClassTable, { type ClassItem } from "@/components/dashboard/ClassTable";
import ClientAttentionList, {
  type ClientAttentionItem,
} from "@/components/dashboard/ClientAttentionList";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const metrics = [
  {
    title: "Total Assigned Clients",
    value: 47,
    subtext: "Active this month",
    icon: Users,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    trend: { value: "+3 this week", positive: true },
  },
  {
    title: "Today's Classes",
    value: 5,
    subtext: "2 in progress",
    icon: Dumbbell,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    trend: { value: "On schedule", positive: true },
  },
  {
    title: "Pending Progress Updates",
    value: 12,
    subtext: "Needs attention",
    icon: ClipboardList,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    trend: { value: "+4 since yesterday", positive: false },
  },
  {
    title: "Upcoming Sessions",
    value: 8,
    subtext: "Next 7 days",
    icon: CalendarClock,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trend: { value: "2 need confirmation", positive: false },
  },
];

const todaysClasses: ClassItem[] = [
  { id: 1, name: "Morning HIIT",      time: "07:00 AM", booked: 18, capacity: 20, status: "In Progress" },
  { id: 2, name: "Yoga Flow",         time: "09:30 AM", booked: 12, capacity: 15, status: "In Progress" },
  { id: 3, name: "Strength Training", time: "12:00 PM", booked: 8,  capacity: 10, status: "Upcoming" },
  { id: 4, name: "Pilates Core",      time: "03:00 PM", booked: 14, capacity: 15, status: "Upcoming" },
  { id: 5, name: "Evening Cycling",   time: "06:00 PM", booked: 20, capacity: 20, status: "Upcoming" },
];

const clientsNeedingAttention: ClientAttentionItem[] = [
  { id: 1, name: "Sarah Johnson",   initials: "SJ", lastUpdate: "3 days ago",  goal: "Weight Loss · 12-week program" },
  { id: 2, name: "Mike Chen",       initials: "MC", lastUpdate: "5 days ago",  goal: "Muscle Gain · Hypertrophy" },
  { id: 3, name: "Emily Rodriguez", initials: "ER", lastUpdate: "1 week ago",  goal: "Endurance · Marathon prep" },
  { id: 4, name: "David Kim",       initials: "DK", lastUpdate: "1 week ago",  goal: "Flexibility · Injury recovery" },
  { id: 5, name: "Jessica Wang",    initials: "JW", lastUpdate: "2 weeks ago", goal: "Strength · Powerlifting" },
];

interface ScheduleSession {
  id: number;
  session: string;
  date: string;
  time: string;
  clientCount: number;
  status: "confirmed" | "pending";
}

const weeklySchedule: ScheduleSession[] = [
  { id: 1, session: "Morning HIIT",      date: "Mon, Mar 3", time: "07:00 AM", clientCount: 18, status: "confirmed" },
  { id: 2, session: "Yoga Flow",         date: "Tue, Mar 4", time: "09:30 AM", clientCount: 12, status: "confirmed" },
  { id: 3, session: "Strength Training", date: "Wed, Mar 5", time: "12:00 PM", clientCount: 8,  status: "pending" },
  { id: 4, session: "Pilates Core",      date: "Thu, Mar 6", time: "03:00 PM", clientCount: 14, status: "confirmed" },
  { id: 5, session: "Evening Cycling",   date: "Fri, Mar 7", time: "06:00 PM", clientCount: 20, status: "confirmed" },
];

// ─── Weekly Schedule Card ─────────────────────────────────────────────────────

function WeeklyScheduleCard({ sessions }: { sessions: ScheduleSession[] }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-900">
            Weekly Schedule
          </CardTitle>
          <span className="text-xs font-medium text-indigo-600">
            Mar 3–7, 2025
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-slate-100">
          {sessions.map((s) => (
            <li key={s.id} className="flex items-center gap-4 px-6 py-3.5">
              <div
                className={
                  s.status === "confirmed"
                    ? "h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"
                    : "h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400 shadow-sm shadow-amber-200"
                }
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {s.session}
                </p>
                <p className="text-xs text-slate-500">
                  {s.date} · {s.time}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Users className="h-3 w-3" />
                  {s.clientCount}
                </div>
                {s.status === "confirmed" ? (
                  <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-600">
                    <CheckCircle2 className="h-3 w-3" />
                    Confirmed
                  </span>
                ) : (
                  <span className="flex items-center gap-0.5 text-[10px] font-medium text-amber-600">
                    <Clock className="h-3 w-3" />
                    Pending
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TrainerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* ── Metrics ── */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">Key Metrics</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((m) => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>
      </section>

      {/* ── Classes + Schedule ── */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3" aria-label="Classes and schedule">
        <div className="xl:col-span-2">
          <ClassTable classes={todaysClasses} />
        </div>
        <div>
          <WeeklyScheduleCard sessions={weeklySchedule} />
        </div>
      </section>

      {/* ── Clients Needing Attention ── */}
      <section aria-labelledby="attention-heading">
        <h2 id="attention-heading" className="sr-only">Clients Needing Attention</h2>
        <ClientAttentionList clients={clientsNeedingAttention} />
      </section>
    </div>
  );
}
