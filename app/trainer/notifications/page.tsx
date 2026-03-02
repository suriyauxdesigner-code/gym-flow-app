"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  MOCK_NOTIFICATIONS,
  type NotificationItem,
} from "@/lib/notifications-data";
import NotificationList from "@/components/notifications/NotificationList";

type TabValue = "all" | "unread" | "class" | "client" | "message" | "system";

export default function NotificationsPage() {
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
    <div className="mx-auto max-w-5xl space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Stay updated with alerts and updates
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              {unreadCount} unread
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllRead}
            disabled={unreadCount === 0}
          >
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* ── Notifications Card ── */}
      <Card className="overflow-hidden rounded-2xl shadow-sm">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabValue)}
        >
          {/* Tab Bar */}
          <div className="border-b border-slate-100 px-5 py-4">
            <TabsList className="h-9 gap-0.5">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="gap-1.5 text-xs">
                Unread
                {unreadCount > 0 && (
                  <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="class" className="text-xs">
                Classes
              </TabsTrigger>
              <TabsTrigger value="client" className="text-xs">
                Clients
              </TabsTrigger>
              <TabsTrigger value="message" className="text-xs">
                Messages
              </TabsTrigger>
              <TabsTrigger value="system" className="text-xs">
                System
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Notification List (rendered outside TabsContent for simplicity) */}
          <NotificationList notifications={filtered} onRead={markRead} />
        </Tabs>
      </Card>
    </div>
  );
}
