import Link from "next/link";
import { Dumbbell, Users, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type NotificationItem as NotifType,
  formatNotifTime,
} from "@/lib/notifications-data";

const TYPE_CONFIG = {
  class: {
    icon: Dumbbell,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    actionHref: "/trainer/classes",
  },
  client: {
    icon: Users,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    actionHref: "/trainer/clients",
  },
  message: {
    icon: MessageSquare,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    actionHref: "/trainer/messages",
  },
  system: {
    icon: Settings,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    actionHref: null,
  },
} as const;

interface NotificationItemProps {
  notification: NotifType;
  onRead: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const config = TYPE_CONFIG[notification.type];
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={() => onRead(notification.id)}
      className={cn(
        "relative flex w-full items-start gap-4 px-5 py-4 text-left transition-colors",
        notification.read
          ? "bg-white hover:bg-slate-50"
          : "border-l-[3px] border-indigo-600 bg-indigo-50 hover:bg-indigo-100/60"
      )}
    >
      {/* Unread dot */}
      {!notification.read && (
        <span className="absolute right-5 top-4 h-2 w-2 rounded-full bg-indigo-600" />
      )}

      {/* Icon */}
      <div
        className={cn(
          "mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl",
          config.iconBg
        )}
      >
        <Icon className={cn("h-4 w-4", config.iconColor)} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pr-6">
        <div className="flex items-baseline justify-between gap-2">
          <p
            className={cn(
              "text-sm",
              notification.read
                ? "font-medium text-slate-700"
                : "font-semibold text-slate-900"
            )}
          >
            {notification.title}
          </p>
          <span className="flex-shrink-0 text-[10px] text-slate-400">
            {formatNotifTime(notification.timestamp)}
          </span>
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
          {notification.description}
        </p>
        {config.actionHref && (
          <Link
            href={config.actionHref}
            onClick={(e) => e.stopPropagation()}
            className="mt-1.5 inline-block text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            View →
          </Link>
        )}
      </div>
    </button>
  );
}
