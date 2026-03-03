import { Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { type AdvancedSettings } from "@/lib/availability-data";

interface AdvancedSettingsProps {
  settings: AdvancedSettings;
  onChange: (next: AdvancedSettings) => void;
}

const DURATIONS: { label: string; value: 30 | 45 | 60 }[] = [
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "60 min", value: 60 },
];

export default function AdvancedSettingsCard({
  settings,
  onChange,
}: AdvancedSettingsProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
          <Settings2 className="h-4 w-4 text-indigo-600" />
          Advanced Slot Settings
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Max Sessions Per Slot */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Max Sessions Per Slot
            </Label>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Maximum concurrent bookings allowed
            </p>
          </div>
          <Input
            type="number"
            min={1}
            max={10}
            value={settings.maxSessionsPerSlot}
            onChange={(e) =>
              onChange({
                ...settings,
                maxSessionsPerSlot: Math.max(1, Number(e.target.value)),
              })
            }
            className="h-9 w-20 text-center"
          />
        </div>

        {/* Default Session Duration */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Default Session Duration
            </Label>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Applied to all new bookings
            </p>
          </div>
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-sm">
            {DURATIONS.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() =>
                  onChange({ ...settings, sessionDuration: d.value })
                }
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  settings.sessionDuration === d.value
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Break Between Sessions */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Break Between Sessions
            </Label>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Add 15-min buffer between consecutive bookings
            </p>
          </div>
          <Switch
            checked={settings.breakBetweenSessions}
            onCheckedChange={(checked) =>
              onChange({ ...settings, breakBetweenSessions: checked })
            }
            aria-label="Enable break between sessions"
          />
        </div>
      </CardContent>
    </Card>
  );
}
