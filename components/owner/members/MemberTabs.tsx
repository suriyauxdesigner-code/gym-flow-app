"use client";

import { toast } from "sonner";
import { Download, FileText, Mail, Phone, User, Calendar, RefreshCw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const PLAN_FEES: Record<string, string> = {
  Elite: "₹3,500.00 / Month",
  Premium: "₹2,500.00 / Month",
  Basic: "₹1,500.00 / Month",
  "Day Pass": "₹500.00 / Visit",
};

function InfoItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40">
        <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}

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
  const thisMonthCount = attendance.filter((a) => {
    const now = new Date();
    const d = new Date(a.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <Tabs defaultValue="overview" className="space-y-5">
      <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl h-auto gap-0.5">
        {[
          { value: "overview", label: "Overview" },
          { value: "payments", label: "Payments" },
          { value: "attendance", label: "Attendance" },
          { value: "progress", label: "Progress" },
        ].map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* ── OVERVIEW ──────────────────────────────────────────────────────── */}
      <TabsContent value="overview">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* LEFT col */}
          <div className="space-y-5">
            {/* Personal Information */}
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <InfoItem icon={Mail} label="Mail" value={member.email} />
                <InfoItem icon={Phone} label="Phone Number" value={member.phone} />
                <InfoItem icon={User} label="Gender" value={member.gender} />
                <InfoItem icon={Calendar} label="Member Since" value={member.joinDate} />
              </CardContent>
            </Card>

            {/* Trainer Assigned */}
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Trainer Assigned
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="text-sm font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                      {member.trainer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {member.trainer}
                    </p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400">
                      Strength & Conditioning
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full gap-2 text-slate-600 dark:text-slate-400"
                  size="sm"
                  onClick={() => toast.info("Reassign trainer coming soon")}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Reassign Trainer
                </Button>
              </CardContent>
            </Card>

            {/* Membership Info */}
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Membership Info
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-2 gap-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Joined Date
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                      {member.joinDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Expiry Date
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                      {member.expiryDate}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Amount
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                      {PLAN_FEES[member.plan] ?? "₹1,800.00 / Month"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Renewing Status
                    </p>
                    <p className={cn("text-sm font-medium mt-1", member.autoPayEnabled ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-slate-100")}>
                      {member.autoPayEnabled ? "Auto-renewing" : "Manual"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT col */}
          <div className="space-y-5">
            {/* Attendance Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Attendance Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                {/* 3 stat boxes */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 text-center">
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {attendance.length}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Total Visits
                    </p>
                  </div>
                  <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 p-3 text-center">
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {thisMonthCount}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      This Month
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 text-center">
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      {member.attendanceRate}%
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Attendance
                    </p>
                  </div>
                </div>

                {/* Attendance Rate bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Attendance Rate</span>
                    <span className="text-xs text-slate-400">Target: 85%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${member.attendanceRate}%` }}
                    />
                  </div>
                </div>

                {/* Monthly Trend placeholder chart */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Monthly Trend</span>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      3 Months
                    </span>
                  </div>
                  <div className="h-16 w-full rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-end px-3 pb-2 gap-1">
                    {[40, 55, 35, 65, 80, 70, 90].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-indigo-200 dark:bg-indigo-900/60"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Outstanding Balance */}
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Outstanding Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Amount Due</span>
                  <span
                    className={cn(
                      "text-2xl font-bold",
                      member.balance > 0 ? "text-red-600" : "text-emerald-600"
                    )}
                  >
                    ${member.balance.toFixed(2)}
                  </span>
                </div>
                {member.balance > 0 && (
                  <Button
                    size="sm"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => toast.success("Payment recorded")}
                  >
                    Record Payment
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Auto-Pay Status */}
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Auto-Pay Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Recurring billing</span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      member.autoPayEnabled
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    )}
                  >
                    {member.autoPayEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
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
                          className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 ml-auto"
                          onClick={() => toast.info(`Downloading ${p.invoice}…`)}
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
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 text-xs font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Attended
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 px-2.5 py-1 text-xs font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            Missed
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
    </Tabs>
  );
}
