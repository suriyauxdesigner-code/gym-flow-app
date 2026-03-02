"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  ClipboardList,
  Calendar,
  MessageSquare,
  Bell,
  UserCircle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/trainer/dashboard", icon: LayoutDashboard },
  { label: "My Clients", href: "/trainer/clients", icon: Users },
  { label: "Classes", href: "/trainer/classes", icon: Dumbbell },
  { label: "Progress Logs", href: "/trainer/progress", icon: ClipboardList },
  { label: "Availability", href: "/trainer/availability", icon: Calendar },
  { label: "Messages", href: "/trainer/messages", icon: MessageSquare },
  { label: "Notifications", href: "/trainer/notifications", icon: Bell },
  { label: "Profile", href: "/trainer/profile", icon: UserCircle },
];

export default function TrainerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">
          FitPro
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Menu
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0",
                  isActive ? "text-white" : "text-slate-500"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-100 px-4 py-4">
        <div className="flex items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            AT
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              Alex Thompson
            </p>
            <p className="truncate text-xs text-slate-500">Senior Trainer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
