"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { type RosterMember, type ClassSession } from "@/lib/class-data";

interface ClassRosterTableProps {
  session: ClassSession;
  roster: RosterMember[];
  onToggle: (memberId: string) => void;
  onSave: () => void;
}

export default function ClassRosterTable({
  session,
  roster,
  onToggle,
  onSave,
}: ClassRosterTableProps) {
  const isCompleted = session.status === "completed";
  const present = roster.filter((m) => m.attended).length;
  const pct = roster.length > 0 ? Math.round((present / roster.length) * 100) : 0;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-slate-900">
              Class Roster
            </CardTitle>
            <p className="mt-0.5 text-xs text-slate-500">
              {roster.length} registered members
            </p>
          </div>
          {/* Live attendance pill */}
          <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-sm font-semibold text-indigo-800">
              {present} / {roster.length} present
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Member</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Check-in Status</TableHead>
              <TableHead className="pr-6 text-right">Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roster.map((member) => (
              <TableRow
                key={member.id}
                className={cn(
                  "transition-colors",
                  member.attended && "bg-emerald-50/50"
                )}
              >
                {/* Avatar + Name */}
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="text-xs font-semibold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-slate-900">
                      {member.name}
                    </span>
                  </div>
                </TableCell>

                {/* Membership */}
                <TableCell>
                  <Badge
                    variant={
                      member.membershipStatus === "active"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {member.membershipStatus === "active" ? "Active" : "Expired"}
                  </Badge>
                </TableCell>

                {/* Check-in status chip */}
                <TableCell>
                  {member.attended ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Checked In
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                      <XCircle className="h-3.5 w-3.5" />
                      Absent
                    </span>
                  )}
                </TableCell>

                {/* Toggle */}
                <TableCell className="pr-6 text-right">
                  <Switch
                    checked={member.attended}
                    onCheckedChange={() => onToggle(member.id)}
                    disabled={isCompleted}
                    aria-label={`Mark ${member.name} as ${member.attended ? "absent" : "present"}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ── Attendance Summary + Save ── */}
        <div className="border-t border-slate-100 px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Progress bar + summary */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-slate-700">
                  Attendance Rate
                </p>
                <span className="text-sm font-bold text-slate-900">{pct}%</span>
              </div>
              <div className="h-2 w-64 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    pct >= 80
                      ? "bg-emerald-500"
                      : pct >= 50
                      ? "bg-amber-400"
                      : "bg-red-400"
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-slate-400">
                {isCompleted
                  ? "This session is completed — read only."
                  : "Toggle switches to mark attendance, then save."}
              </p>
            </div>

            {/* Save button */}
            <Button
              onClick={onSave}
              disabled={isCompleted}
              className="gap-1.5 self-end sm:self-auto"
            >
              <CheckCircle2 className="h-4 w-4" />
              Save Attendance
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
