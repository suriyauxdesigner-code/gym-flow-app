"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Dumbbell,
  CreditCard,
  Settings,
  Receipt,
  HelpCircle,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const GENERAL_NAV = [
  { label: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard },
  { label: "Members", href: "/owner/members", icon: Users },
  { label: "Trainers", href: "/owner/trainers", icon: UserCog },
  { label: "Classes", href: "/owner/classes", icon: Dumbbell },
  { label: "Payments", href: "/owner/payments", icon: CreditCard },
];

const SUPPORT_NAV = [
  { label: "Settings", href: "/owner/settings", icon: Settings },
  { label: "Billings", href: "/owner/billings", icon: Receipt },
  { label: "Help & Support", href: "/owner/help", icon: HelpCircle },
];

const PLACEHOLDER_ROUTES = [
  "/owner/payments",
  "/owner/settings",
  "/owner/billings",
  "/owner/help",
];

export default function OwnerSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/owner/dashboard") return pathname === "/owner/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[240px] flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      {/* Brand / Workspace */}
      <div className="flex h-[79px] items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
            <span className="text-[11px] font-bold text-white tracking-tight">GF</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Gym Flow
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
              Enterprice
            </p>
          </div>
        </div>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-4 space-y-5">
        {/* GENERAL */}
        <div>
          <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            General
          </p>
          <div className="space-y-0.5">
            {GENERAL_NAV.map((item) => {
              const active = isActive(item.href);
              const placeholder = PLACEHOLDER_ROUTES.includes(item.href);

              if (placeholder) {
                return (
                  <div
                    key={item.href}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 dark:text-slate-600 cursor-not-allowed"
                  >
                    <item.icon className="h-[18px] w-[18px] shrink-0" />
                    {item.label}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-700 dark:hover:text-indigo-300"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      active ? "text-white" : "text-slate-500 dark:text-slate-500"
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* SUPPORT */}
        <div>
          <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Support
          </p>
          <div className="space-y-0.5">
            {SUPPORT_NAV.map((item) => (
              <div
                key={item.href}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 dark:text-slate-600 cursor-not-allowed"
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
