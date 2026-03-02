"use client";

import { useState } from "react";
import { CalendarOff, PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type TimeOff } from "@/lib/availability-data";

interface TimeOffCardProps {
  timeOffs: TimeOff[];
  onAdd: (timeOff: Omit<TimeOff, "id">) => void;
  onRemove: (id: string) => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TimeOffCard({
  timeOffs,
  onAdd,
  onRemove,
}: TimeOffCardProps) {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  function handleAdd() {
    if (!date) return;
    onAdd({ date, note: note.trim() || undefined });
    setDate("");
    setNote("");
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
            <CalendarOff className="h-4 w-4 text-red-500" />
            Time-Off Exceptions
          </CardTitle>
          {timeOffs.length > 0 && (
            <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-0 text-xs">
              {timeOffs.length} scheduled
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Add Form */}
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Add Exception
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="timeoff-date" className="text-xs font-medium text-slate-700">
                Date
              </Label>
              <Input
                id="timeoff-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="timeoff-note" className="text-xs font-medium text-slate-700">
                Note (optional)
              </Label>
              <Input
                id="timeoff-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Personal appointment"
                className="h-9 text-sm"
              />
            </div>
          </div>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={!date}
            className="gap-1.5 text-xs"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add Time Off
          </Button>
        </div>

        {/* Scheduled List */}
        {timeOffs.length === 0 ? (
          <p className="py-3 text-center text-sm text-slate-400">
            No upcoming time-offs scheduled.
          </p>
        ) : (
          <div className="space-y-2">
            {timeOffs.map((to) => (
              <div
                key={to.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 transition-colors hover:bg-slate-50"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {formatDate(to.date)}
                  </p>
                  {to.note && (
                    <p className="text-xs text-slate-500">{to.note}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(to.id)}
                  aria-label="Remove time off"
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
