"use client";

import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/trainer/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back, Alex 👋",
  },
  "/trainer/clients": {
    title: "My Clients",
    subtitle: "Manage and track your assigned clients",
  },
  "/trainer/classes": {
    title: "Classes",
    subtitle: "Schedule and manage your class sessions",
  },
  "/trainer/progress": {
    title: "Progress Logs",
    subtitle: "Track client performance over time",
  },
  "/trainer/availability": {
    title: "Availability",
    subtitle: "Set your working hours and open slots",
  },
  "/trainer/messages": {
    title: "Messages",
    subtitle: "Communicate with your clients",
  },
  "/trainer/notifications": {
    title: "Notifications",
    subtitle: "Stay updated with alerts and updates",
  },
  "/trainer/profile": {
    title: "Profile",
    subtitle: "Manage your personal information",
  },
};

export default function TrainerHeader() {
  const pathname = usePathname();
  const page = PAGE_TITLES[pathname] ?? { title: "FitPro", subtitle: "" };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      {/* Left: Page Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">{page.title}</h1>
        <p className="text-xs text-slate-500">{page.subtitle}</p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="text-slate-500"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Badge className="absolute -right-0.5 -top-0.5 h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]">
            3
          </Badge>
        </div>

        {/* Trainer Avatar + Name */}
        <button
          type="button"
          aria-label="Trainer menu"
          className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 transition-colors hover:bg-slate-100"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">AT</AvatarFallback>
          </Avatar>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Alex Thompson
            </p>
            <p className="text-xs text-slate-500">Senior Trainer</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
