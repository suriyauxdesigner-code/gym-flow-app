import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export default function MetricCard({
  title,
  value,
  subtext,
  icon: Icon,
  iconColor = "text-indigo-600",
  iconBg = "bg-indigo-50",
  trend,
}: MetricCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {title}
            </span>
            <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">{subtext}</span>
            {trend && (
              <span
                className={cn(
                  "mt-1 inline-flex items-center text-xs font-medium",
                  trend.positive ? "text-emerald-600" : "text-red-500"
                )}
              >
                {trend.positive ? "↑" : "↓"} {trend.value}
              </span>
            )}
          </div>
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", iconBg)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
