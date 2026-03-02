import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type NotificationItem } from "@/lib/notifications-data";
import NotifItem from "./NotificationItem";

interface NotificationListProps {
  notifications: NotificationItem[];
  onRead: (id: string) => void;
}

export default function NotificationList({
  notifications,
  onRead,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <Bell className="h-6 w-6 text-slate-300" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">All caught up!</p>
          <p className="mt-0.5 text-xs text-slate-400">
            No notifications in this category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-310px)]">
      <div className="divide-y divide-slate-100">
        {notifications.map((notif) => (
          <NotifItem key={notif.id} notification={notif} onRead={onRead} />
        ))}
      </div>
    </ScrollArea>
  );
}
