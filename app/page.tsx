import { Building2, Dumbbell, Users } from "lucide-react";
import RoleCard from "@/components/auth/RoleCard";

const roles = [
  {
    icon: Building2,
    title: "Gym Owner",
    description:
      "Manage your gym, staff, memberships, and business financials from one place.",
    href: "/owner",
    iconBg: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Dumbbell,
    title: "Gym Trainer",
    description:
      "Manage your clients, schedule classes, and track training progress.",
    href: "/trainer",
    iconBg: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Users,
    title: "Gym Member",
    description:
      "Track your workouts, view scheduled classes, and connect with your trainer.",
    href: "/member",
    iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export default function RolePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
          <Dumbbell className="h-5 w-5 text-white" />
        </div>
        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          FitPro
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 text-center">
        Welcome to FitPro
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-12 text-center text-base max-w-sm">
        Choose how you want to continue
      </p>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl">
        {roles.map((role) => (
          <RoleCard key={role.href} {...role} />
        ))}
      </div>
    </div>
  );
}
