import { Users, CheckCircle2, XCircle, TrendingUp } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import { type ClassSession } from "@/lib/class-data";

interface ClassMetricsProps {
  session: ClassSession;
}

export default function ClassMetrics({ session }: ClassMetricsProps) {
  const present = session.roster.filter((m) => m.attended).length;
  const absent = session.roster.length - present;
  const pct =
    session.roster.length > 0
      ? Math.round((present / session.roster.length) * 100)
      : 0;

  const metrics = [
    {
      title: "Total Booked",
      value: session.booked,
      subtext: `of ${session.capacity} capacity`,
      icon: Users,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Present",
      value: present,
      subtext: "Checked in",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Absent",
      value: absent,
      subtext: "Did not attend",
      icon: XCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      title: "Attendance Rate",
      value: `${pct}%`,
      subtext: session.roster.length > 0 ? `${present} of ${session.roster.length} members` : "No roster data",
      icon: TrendingUp,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      trend: pct >= 80
        ? { value: "On track", positive: true }
        : pct > 0
        ? { value: "Below target", positive: false }
        : undefined,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m) => (
        <MetricCard key={m.title} {...m} />
      ))}
    </div>
  );
}
