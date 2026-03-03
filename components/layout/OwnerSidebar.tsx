"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  Zap,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard },
  { label: "Members", href: "/owner/members", icon: Users },
  { label: "Trainers", href: "/owner/trainers", icon: UserCog },
  { label: "Classes", href: "/owner/classes", icon: Dumbbell },
  { label: "Payments", href: "/owner/payments", icon: CreditCard },
  { label: "Reports", href: "/owner/reports", icon: BarChart3 },
  { label: "Settings", href: "/owner/settings", icon: Settings },
];

// Routes that are placeholder (not yet built)
const PLACEHOLDER_ROUTES = [
  "/owner/trainers",
  "/owner/classes",
  "/owner/payments",
  "/owner/reports",
  "/owner/settings",
];

export default function OwnerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-none">
            FitPro
          </span>
          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Owner
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Menu
        </p>
        {navItems.map((item) => {
          const isPlaceholder = PLACEHOLDER_ROUTES.includes(item.href);
          // Members section: active if on /owner/members or any child
          const isActive =
            item.href === "/owner/dashboard"
              ? pathname === "/owner/dashboard"
              : pathname.startsWith(item.href);

          if (isPlaceholder) {
            return (
              <div
                key={item.href}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 dark:text-slate-600 cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  {item.label}
                </div>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 px-1.5 py-0.5 rounded-md font-medium">
                  Soon
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-700 dark:hover:text-indigo-300"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0",
                  isActive
                    ? "text-white"
                    : "text-slate-500 dark:text-slate-500"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Owner Profile */}
      <div className="border-t border-slate-100 dark:border-slate-800 px-4 py-4">
        <div className="flex items-center gap-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 px-3 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            JD
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              Jordan Davis
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              Gym Owner
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
