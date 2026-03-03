"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Pencil, ClipboardList } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { type ProgressLog } from "@/lib/progress-data";
import { cn } from "@/lib/utils";

interface ProgressTableProps {
  logs: ProgressLog[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ProgressTable({ logs }: ProgressTableProps) {
  const [editLog, setEditLog] = useState<ProgressLog | null>(null);
  const [editForm, setEditForm] = useState<{
    weight: number;
    bodyFat: number;
    pr: string;
    notes: string;
  }>({ weight: 0, bodyFat: 0, pr: "", notes: "" });

  function openEdit(log: ProgressLog) {
    setEditLog(log);
    setEditForm({
      weight: log.weight,
      bodyFat: log.bodyFat,
      pr: log.pr,
      notes: log.notes,
    });
  }

  function handleSave() {
    toast.success("Log updated", {
      description: `Progress log for ${editLog?.clientName} has been saved.`,
    });
    setEditLog(null);
  }

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Recent Progress Logs
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {logs.length} {logs.length === 1 ? "entry" : "entries"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {logs.length === 0 ? (
            /* ── Empty State ── */
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <ClipboardList className="h-7 w-7 text-slate-400" />
              </div>
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-300">No logs found</p>
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Try adjusting your search or date filter.
                </p>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-[420px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <TableHead className="pl-6 w-48">Client</TableHead>
                    <TableHead className="w-32">Date</TableHead>
                    <TableHead className="w-32">Weight</TableHead>
                    <TableHead className="w-28">Body Fat</TableHead>
                    <TableHead className="w-36">PR</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="pr-6 text-right w-36">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => {
                    const isDeclining = log.weightDelta > 0.5;
                    return (
                      <TableRow key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50">
                        {/* Client */}
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-2.5">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback
                                className={cn(
                                  "text-xs font-semibold",
                                  isDeclining
                                    ? "bg-red-100 text-red-700"
                                    : "bg-indigo-100 text-indigo-700"
                                )}
                              >
                                {log.initials}
                              </AvatarFallback>
                            </Avatar>
                            <Link
                              href={`/trainer/clients/${log.clientId}`}
                              className="font-medium text-slate-900 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline underline-offset-2"
                            >
                              {log.clientName}
                            </Link>
                          </div>
                        </TableCell>

                        {/* Date */}
                        <TableCell className="text-slate-600 dark:text-slate-400">
                          {formatDate(log.date)}
                        </TableCell>

                        {/* Weight with trend indicator */}
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-slate-900 dark:text-slate-200">
                              {log.weight} kg
                            </span>
                            <span
                              className={cn(
                                "text-[11px] font-bold",
                                log.weightDelta < 0
                                  ? "text-emerald-600"
                                  : log.weightDelta > 0
                                  ? "text-red-500"
                                  : "text-slate-400"
                              )}
                            >
                              {log.weightDelta < 0
                                ? `↓${Math.abs(log.weightDelta)}`
                                : log.weightDelta > 0
                                ? `↑${log.weightDelta}`
                                : "→"}
                            </span>
                          </div>
                        </TableCell>

                        {/* Body Fat */}
                        <TableCell>
                          <span
                            className={cn(
                              "font-medium",
                              isDeclining ? "text-red-500" : "text-slate-700"
                            )}
                          >
                            {log.bodyFat}%
                          </span>
                        </TableCell>

                        {/* PR */}
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="text-xs font-normal bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-0"
                          >
                            {log.pr}
                          </Badge>
                        </TableCell>

                        {/* Notes – truncated */}
                        <TableCell className="max-w-[200px]">
                          <p
                            className="truncate text-sm text-slate-500 dark:text-slate-400"
                            title={log.notes}
                          >
                            {log.notes}
                          </p>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="pr-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-xs"
                              asChild
                            >
                              <Link href={`/trainer/clients/${log.clientId}`}>
                                <Eye className="h-3.5 w-3.5" />
                                View
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                              onClick={() => openEdit(log)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editLog} onOpenChange={(open) => !open && setEditLog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Progress Log</DialogTitle>
          </DialogHeader>

          {editLog && (
            <div className="space-y-4 py-1">
              {/* Client info banner */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-indigo-100 text-sm font-semibold text-indigo-700">
                    {editLog.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {editLog.clientName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(editLog.date)}
                  </p>
                </div>
              </div>

              {/* Weight + Body Fat */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-weight">Weight (kg)</Label>
                  <Input
                    id="edit-weight"
                    type="number"
                    step="0.1"
                    value={editForm.weight}
                    onChange={(e) =>
                      setEditForm((f) => ({
                        ...f,
                        weight: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-bf">Body Fat (%)</Label>
                  <Input
                    id="edit-bf"
                    type="number"
                    step="0.1"
                    value={editForm.bodyFat}
                    onChange={(e) =>
                      setEditForm((f) => ({
                        ...f,
                        bodyFat: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>

              {/* PR */}
              <div className="space-y-1.5">
                <Label htmlFor="edit-pr">PR / Achievement</Label>
                <Input
                  id="edit-pr"
                  value={editForm.pr}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, pr: e.target.value }))
                  }
                  placeholder="e.g. Bench 120kg"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  rows={3}
                  value={editForm.notes}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  placeholder="Session notes..."
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEditLog(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
