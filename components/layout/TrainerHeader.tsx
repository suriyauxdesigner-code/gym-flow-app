"use client";

import { useRouter } from "next/navigation";
import { Bell, ChevronDown, User, LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";
import ThemeToggle from "@/components/theme/ThemeToggle";

// Static initial unread count — matches MOCK_NOTIFICATIONS unread items
const INITIAL_UNREAD = 5;

export default function TrainerHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 shadow-sm">
      {/* Left: Gym Branding */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shrink-0">
          <span className="text-base font-black text-white">F</span>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
            Iron Forge Gym
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-0.5 leading-tight">
            <MapPin className="h-3 w-3 shrink-0" />
            San Francisco, CA
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Bell */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open notifications"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <Bell className="h-5 w-5" />
              </Button>
              {INITIAL_UNREAD > 0 && (
                <Badge className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 p-0 text-[10px] hover:bg-indigo-600">
                  {INITIAL_UNREAD}
                </Badge>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="w-[380px] p-0">
            <NotificationsPanel />
          </PopoverContent>
        </Popover>

        {/* Profile Dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Trainer menu"
              className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">AT</AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Alex Thompson
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Senior Trainer
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="w-48 p-1.5">
            <div className="px-2 py-1.5 mb-1">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                Alex Thompson
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                alex@fitpro.com
              </p>
            </div>
            <Separator className="mb-1" />
            <button
              type="button"
              onClick={() => router.push("/trainer/profile")}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <User className="h-4 w-4" />
              Profile
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
