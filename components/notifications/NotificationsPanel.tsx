"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Users,
  MessageSquare,
  Settings,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  MOCK_NOTIFICATIONS,
  formatNotifTime,
  type NotificationItem,
} from "@/lib/notifications-data";

type TabValue = "all" | "unread" | "class" | "client" | "message" | "system";

const TYPE_CONFIG = {
  class: {
    icon: Dumbbell,
    iconBg: "bg-indigo-100 dark:bg-indigo-950",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    actionHref: "/trainer/classes",
  },
  client: {
    icon: Users,
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    actionHref: "/trainer/clients",
  },
  message: {
    icon: MessageSquare,
    iconBg: "bg-sky-100 dark:bg-sky-950",
    iconColor: "text-sky-600 dark:text-sky-400",
    actionHref: "/trainer/messages",
  },
  system: {
    icon: Settings,
    iconBg: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-500 dark:text-slate-400",
    actionHref: null,
  },
} as const;

export default function NotificationsPanel() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<TabValue>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.read);
      case "class":
        return notifications.filter((n) => n.type === "class");
      case "client":
        return notifications.filter((n) => n.type === "client");
      case "message":
        return notifications.filter((n) => n.type === "message");
      case "system":
        return notifications.filter((n) => n.type === "system");
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="flex flex-col">
      {/* ── Panel Header ── */}
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <Badge className="h-5 min-w-[20px] rounded-full bg-indigo-600 px-1.5 text-[10px] font-bold text-white hover:bg-indigo-600">
              {unreadCount}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="h-7 text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          Mark all as read
        </Button>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="border-b border-slate-100 dark:border-slate-800 px-4 pb-3">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabValue)}
        >
          <TabsList className="h-7 gap-0.5 bg-slate-100 dark:bg-slate-800 p-0.5">
            <TabsTrigger value="all" className="h-6 px-2 text-[11px]">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="h-6 gap-1 px-2 text-[11px]">
              Unread
              {unreadCount > 0 && (
                <span className="rounded-full bg-indigo-600 px-1 text-[9px] font-bold leading-none text-white">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="class" className="h-6 px-2 text-[11px]">
              Classes
            </TabsTrigger>
            <TabsTrigger value="client" className="h-6 px-2 text-[11px]">
              Clients
            </TabsTrigger>
            <TabsTrigger value="message" className="h-6 px-2 text-[11px]">
              Messages
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* ── Notifications List ── */}
      <ScrollArea className="h-[420px]">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Bell className="h-5 w-5 text-slate-300 dark:text-slate-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                All caught up!
              </p>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                No notifications here.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((notif) => {
              const config = TYPE_CONFIG[notif.type];
              const Icon = config.icon;

              return (
                <button
                  key={notif.id}
                  type="button"
                  onClick={() => markRead(notif.id)}
                  className={cn(
                    "relative flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors",
                    notif.read
                      ? "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      : "border-l-[3px] border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100/60 dark:hover:bg-indigo-950/60"
                  )}
                >
                  {/* Unread dot */}
                  {!notif.read && (
                    <span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  )}

                  {/* Icon */}
                  <div
                    className={cn(
                      "mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg",
                      config.iconBg
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", config.iconColor)} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 pr-4">
                    <div className="flex items-baseline justify-between gap-1">
                      <p
                        className={cn(
                          "truncate text-xs",
                          notif.read
                            ? "font-medium text-slate-700 dark:text-slate-300"
                            : "font-semibold text-slate-900 dark:text-slate-100"
                        )}
                      >
                        {notif.title}
                      </p>
                      <span className="flex-shrink-0 text-[10px] text-slate-400 dark:text-slate-500">
                        {formatNotifTime(notif.timestamp)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                      {notif.description}
                    </p>
                    {config.actionHref && (
                      <Link
                        href={config.actionHref}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 inline-block text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                      >
                        View →
                      </Link>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
