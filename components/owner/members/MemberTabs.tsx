"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Download, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  type OwnerMember,
  type MemberPayment,
  type AttendanceEntry,
  type ProgressEntry,
} from "@/lib/owner-data";

interface MemberTabsProps {
  member: OwnerMember;
  payments: MemberPayment[];
  attendance: AttendanceEntry[];
  progress: ProgressEntry[];
}

// ── Info Row helper ───────────────────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-0.5">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-900 dark:text-slate-100 text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
}

// ── Payment status badge ──────────────────────────────────────────────────────
function PayStatusBadge({ status }: { status: string }) {
  if (status === "Paid")
    return <Badge variant="success">Paid</Badge>;
  if (status === "Failed")
    return <Badge variant="destructive">Failed</Badge>;
  return <Badge variant="warning">Pending</Badge>;
}

export default function MemberTabs({
  member,
  payments,
  attendance,
  progress,
}: MemberTabsProps) {
  const [notes, setNotes] = useState(member.notes);

  function saveNotes() {
    toast.success("Notes saved", {
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    });
  }

  // Attendance stats
  const attended = attendance.filter((a) => a.attended).length;
  const missed = attendance.filter((a) => !a.attended).length;

  return (
    <Tabs defaultValue="overview" className="space-y-5">
      <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl h-auto gap-0.5">
        {["overview", "payments", "attendance", "progress", "notes"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="rounded-lg px-4 py-2 text-sm font-medium capitalize data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {tab === "overview"
              ? "Overview"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* ── OVERVIEW ──────────────────────────────────────────────────────── */}
      <TabsContent value="overview">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* LEFT col */}
          <div className="space-y-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <InfoRow label="Email" value={member.email} />
                <InfoRow label="Phone" value={member.phone} />
                <InfoRow label="Gender" value={member.gender} />
                <InfoRow label="Date of Birth" value={member.dob} />
                <InfoRow label="Member Since" value={member.joinDate} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Trainer Assigned
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3 py-2">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-300">
                    {member.trainer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {member.trainer}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Personal Trainer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Membership Info
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <InfoRow label="Plan" value={member.plan} />
                <InfoRow label="Expiry Date" value={member.expiryDate} />
                <InfoRow
                  label="Auto-Pay"
                  value={member.autoPayEnabled ? "Enabled" : "Disabled"}
                />
              </CardContent>
            </Card>
          </div>

          {/* RIGHT col */}
          <div className="space-y-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Attendance Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Rate bar */}
                <div className="py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Attendance Rate
                    </span>
                    <span
                      className={cn(
                        "text-sm font-bold",
                        member.attendanceRate >= 80
                          ? "text-emerald-600"
                          : member.attendanceRate >= 60
                          ? "text-amber-600"
                          : "text-red-500"
                      )}
                    >
                      {member.attendanceRate}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        member.attendanceRate >= 80
                          ? "bg-emerald-500"
                          : member.attendanceRate >= 60
                          ? "bg-amber-400"
                          : "bg-red-400"
                      )}
                      style={{ width: `${member.attendanceRate}%` }}
                    />
                  </div>
                </div>
                <Separator className="my-2" />
                <InfoRow label="Sessions Attended" value={String(attended)} />
                <InfoRow label="Sessions Missed" value={String(missed)} />
                <InfoRow label="Last Visit" value={member.lastVisit} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Outstanding Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Amount Due
                  </span>
                  <span
                    className={cn(
                      "text-2xl font-bold",
                      member.balance > 0
                        ? "text-red-600"
                        : "text-emerald-600"
                    )}
                  >
                    {member.balance > 0
                      ? `$${member.balance.toFixed(2)}`
                      : "$0.00"}
                  </span>
                </div>
                {member.balance > 0 && (
                  <Button
                    size="sm"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-1"
                    onClick={() =>
                      toast.success("Payment recorded", {
                        icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
                      })
                    }
                  >
                    Record Payment
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Auto-Pay Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Recurring billing
                  </span>
                  <Badge
                    variant={member.autoPayEnabled ? "success" : "secondary"}
                  >
                    {member.autoPayEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                {!member.autoPayEnabled && (
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Manual payment collection required each cycle.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      {/* ── PAYMENTS ──────────────────────────────────────────────────────── */}
      <TabsContent value="payments">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Payment History
              </CardTitle>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {payments.length} transactions
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {payments.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">
                No payments recorded yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 dark:border-slate-800">
                    <TableHead className="pl-6">Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="pl-6 text-sm text-slate-700 dark:text-slate-300">
                        {p.date}
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        ${p.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span className="rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                          {p.mode}
                        </span>
                      </TableCell>
                      <TableCell>
                        <PayStatusBadge status={p.status} />
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <button
                          type="button"
                          className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 ml-auto"
                          onClick={() =>
                            toast.info(`Downloading ${p.invoice}…`)
                          }
                        >
                          <FileText className="h-3.5 w-3.5" />
                          {p.invoice}
                          <Download className="h-3 w-3" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ── ATTENDANCE ────────────────────────────────────────────────────── */}
      <TabsContent value="attendance">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Attendance Log
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {attendance.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">
                No attendance records yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 dark:border-slate-800">
                    <TableHead className="pl-6">Date</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Trainer</TableHead>
                    <TableHead className="pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell className="pl-6 text-sm text-slate-700 dark:text-slate-300">
                        {a.date}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {a.className}
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                        {a.trainer}
                      </TableCell>
                      <TableCell className="pr-6">
                        {a.attended ? (
                          <Badge variant="success">Attended</Badge>
                        ) : (
                          <Badge variant="destructive">Missed</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Placeholder chart strip */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                Weekly Pattern
              </p>
              <div className="flex items-end gap-1.5 h-16">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, i) => {
                    const heights = [60, 90, 40, 80, 100, 70, 20];
                    return (
                      <div
                        key={day}
                        className="flex flex-1 flex-col items-center gap-1"
                      >
                        <div
                          className="w-full rounded-t-sm bg-indigo-200 dark:bg-indigo-900/60"
                          style={{ height: `${heights[i]}%` }}
                        />
                        <span className="text-[9px] text-slate-400">{day}</span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ── PROGRESS ──────────────────────────────────────────────────────── */}
      <TabsContent value="progress">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Progress Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {progress.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">
                No progress entries yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 dark:border-slate-800">
                    <TableHead className="pl-6">Date</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Body Fat</TableHead>
                    <TableHead className="pr-6">Trainer Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {progress.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell className="pl-6 text-sm text-slate-700 dark:text-slate-300">
                        {p.date}
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {p.weight}
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                        {p.bodyFat}
                      </TableCell>
                      <TableCell className="pr-6 text-sm text-slate-500 dark:text-slate-400 max-w-xs truncate">
                        {p.note}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ── NOTES ─────────────────────────────────────────────────────────── */}
      <TabsContent value="notes">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Internal Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              rows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this member..."
              className="w-full resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={saveNotes}
              >
                Save Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
