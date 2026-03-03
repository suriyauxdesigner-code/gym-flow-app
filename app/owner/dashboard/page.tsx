import Link from "next/link";
import { Building2, Users, DollarSign, TrendingUp, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Members",
    value: "248",
    subtext: "Active memberships",
    icon: Users,
    iconBg: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Monthly Revenue",
    value: "$12,480",
    subtext: "+8% from last month",
    icon: DollarSign,
    iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Active Trainers",
    value: "14",
    subtext: "On staff",
    icon: Building2,
    iconBg: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Retention Rate",
    value: "91%",
    subtext: "Last 90 days",
    icon: TrendingUp,
    iconBg: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

export default function OwnerDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Owner Dashboard
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Welcome back! Here&apos;s your gym at a glance.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Switch Role
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {stat.subtext}
                    </p>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}
                  >
                    <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder content */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "Marcus Johnson joined as a new member",
                "Trainer Sarah updated class schedule for March",
                "5 memberships renewed this week",
                "Monthly revenue report is ready to view",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"
                >
                  <div className="h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
