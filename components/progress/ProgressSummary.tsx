import MetricCard from "@/components/dashboard/MetricCard";
import {
  ClipboardList,
  Users,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface ProgressSummaryProps {
  logsThisWeek: number;
  clientsUpdated: number;
  clientsNeedingUpdate: number;
  avgWeightChange: number;
}

export default function ProgressSummary({
  logsThisWeek,
  clientsUpdated,
  clientsNeedingUpdate,
  avgWeightChange,
}: ProgressSummaryProps) {
  const isWeightLoss = avgWeightChange <= 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Logs This Week"
        value={logsThisWeek}
        subtext="Progress entries recorded"
        icon={ClipboardList}
        iconColor="text-indigo-600"
        iconBg="bg-indigo-50"
      />
      <MetricCard
        title="Clients Updated"
        value={clientsUpdated}
        subtext="Active in last 7 days"
        icon={Users}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50"
        trend={{ value: "on track", positive: true }}
      />
      <MetricCard
        title="Needs Update"
        value={clientsNeedingUpdate}
        subtext="No log in 7+ days"
        icon={AlertTriangle}
        iconColor="text-amber-600"
        iconBg="bg-amber-50"
      />
      <MetricCard
        title="Avg Weight Change"
        value={`${avgWeightChange > 0 ? "+" : ""}${avgWeightChange} kg`}
        subtext="Across all recent logs"
        icon={isWeightLoss ? TrendingDown : TrendingUp}
        iconColor={isWeightLoss ? "text-emerald-600" : "text-red-500"}
        iconBg={isWeightLoss ? "bg-emerald-50" : "bg-red-50"}
        trend={{
          value: isWeightLoss
            ? `${Math.abs(avgWeightChange)} kg avg loss`
            : `${avgWeightChange} kg avg gain`,
          positive: isWeightLoss,
        }}
      />
    </div>
  );
}
