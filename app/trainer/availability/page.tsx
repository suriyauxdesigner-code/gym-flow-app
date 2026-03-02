"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import WeeklyGrid from "@/components/availability/WeeklyGrid";
import AdvancedSettingsCard from "@/components/availability/AdvancedSettings";
import TimeOffCard from "@/components/availability/TimeOffCard";
import {
  getDefaultSlots,
  DEFAULT_ADVANCED_SETTINGS,
  DEFAULT_TIME_OFFS,
  type AvailabilitySlot,
  type AdvancedSettings,
  type TimeOff,
} from "@/lib/availability-data";

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>(getDefaultSlots);
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>(
    DEFAULT_ADVANCED_SETTINGS
  );
  const [timeOffs, setTimeOffs] = useState<TimeOff[]>(DEFAULT_TIME_OFFS);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleSlot = useCallback((day: string, hour: number) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.day === day && s.hour === hour ? { ...s, available: !s.available } : s
      )
    );
    setHasChanges(true);
  }, []);

  const toggleDay = useCallback((day: string, enabled: boolean) => {
    setSlots((prev) =>
      prev.map((s) => (s.day === day ? { ...s, available: enabled } : s))
    );
    setHasChanges(true);
  }, []);

  function handleAdvancedChange(next: AdvancedSettings) {
    setAdvancedSettings(next);
    setHasChanges(true);
  }

  function handleAddTimeOff(timeOff: Omit<TimeOff, "id">) {
    setTimeOffs((prev) => [
      ...prev,
      { ...timeOff, id: `to-${Date.now()}` },
    ]);
    setHasChanges(true);
  }

  function handleRemoveTimeOff(id: string) {
    setTimeOffs((prev) => prev.filter((t) => t.id !== id));
    setHasChanges(true);
  }

  function handleSave() {
    toast.success("Availability saved", {
      description: "Your schedule has been updated successfully.",
    });
    setHasChanges(false);
  }

  function handleReset() {
    setSlots(getDefaultSlots());
    setAdvancedSettings(DEFAULT_ADVANCED_SETTINGS);
    setTimeOffs(DEFAULT_TIME_OFFS);
    setHasChanges(false);
  }

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Availability</h2>
          <p className="text-sm text-slate-500">
            Set your weekly working schedule
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Unsaved changes indicator */}
          {hasChanges && (
            <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-600">
              Unsaved changes
            </span>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-1.5 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>

          <Button
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges}
            className="gap-1.5 text-xs"
          >
            <Save className="h-3.5 w-3.5" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* ── Weekly Availability Grid ── */}
      <WeeklyGrid
        slots={slots}
        onToggleSlot={toggleSlot}
        onToggleDay={toggleDay}
      />

      {/* ── Advanced Settings + Time-Off (side by side on lg) ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdvancedSettingsCard
          settings={advancedSettings}
          onChange={handleAdvancedChange}
        />
        <TimeOffCard
          timeOffs={timeOffs}
          onAdd={handleAddTimeOff}
          onRemove={handleRemoveTimeOff}
        />
      </div>
    </div>
  );
}
