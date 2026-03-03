"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type OwnerMember, type MemberPaymentStatus } from "@/lib/owner-data";

interface MemberTableProps {
  members: OwnerMember[];
}

function PaymentBadge({ status }: { status: MemberPaymentStatus }) {
  switch (status) {
    case "active":
      return <Badge variant="success">Active</Badge>;
    case "due":
      return <Badge variant="warning">Due</Badge>;
    case "expired":
      return <Badge variant="destructive">Expired</Badge>;
    case "frozen":
      return <Badge variant="outline">Frozen</Badge>;
  }
}

function PlanPill({ plan }: { plan: string }) {
  const colors: Record<string, string> = {
    Elite:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    Premium:
      "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    Basic:
      "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300",
    "Day Pass":
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        colors[plan] ?? colors["Basic"]
      }`}
    >
      {plan}
    </span>
  );
}

export default function MemberTable({ members }: MemberTableProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              All Members
            </CardTitle>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Showing {members.length} members
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              {members.filter((m) => m.paymentStatus === "active").length} Active
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100 dark:border-slate-800">
              <TableHead className="w-60 pl-6">Member</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
              >
                {/* Member */}
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="text-xs font-semibold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                        {member.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Plan */}
                <TableCell>
                  <PlanPill plan={member.plan} />
                </TableCell>

                {/* Trainer */}
                <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                  {member.trainer}
                </TableCell>

                {/* Expiry */}
                <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                  {member.expiryDate}
                </TableCell>

                {/* Payment Status */}
                <TableCell>
                  <PaymentBadge status={member.paymentStatus} />
                </TableCell>

                {/* Last Visit */}
                <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                  {member.lastVisit}
                </TableCell>

                {/* Actions */}
                <TableCell className="pr-6">
                  <div className="flex items-center justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-xs"
                      asChild
                    >
                      <Link href={`/owner/members/${member.id}`}>
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
