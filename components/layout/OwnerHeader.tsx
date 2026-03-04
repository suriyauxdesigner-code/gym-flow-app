"use client";

import { Bell, ChevronDown, MapPin, Moon, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationsPanel from "@/components/notifications/NotificationsPanel";
import ThemeToggle from "@/components/theme/ThemeToggle";

const INITIAL_UNREAD = 3;

export default function OwnerHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-[79px] items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8">
      {/* Left: Gym Branding */}
      <div className="flex items-center gap-3">
        {/* Colorful gym logo */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 text-white font-bold text-sm">
          mfb
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
            Maxburn Fitness
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-0.5 leading-tight">
            <MapPin className="h-3 w-3 shrink-0" />
            Dharmapuri, Tamil Nadu
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Dark Mode Toggle */}
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
                <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500" />
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
              aria-label="Owner menu"
              className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-indigo-600 text-white text-xs font-bold">S</AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                  Suriya
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  Founder
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="w-48 p-1.5">
            <div className="px-2 py-1.5 mb-1">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Suriya</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Founder · Maxburn Fitness</p>
            </div>
            <Separator className="mb-1" />
            <button
              type="button"
              onClick={() => router.push("/owner/profile")}
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
