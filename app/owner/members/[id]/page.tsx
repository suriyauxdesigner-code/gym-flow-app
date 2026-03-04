"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, DollarSign, Pencil, Snowflake, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MemberTabs from "@/components/owner/members/MemberTabs";
import {
  MOCK_MEMBERS,
  MOCK_PAYMENTS,
  MOCK_ATTENDANCE,
  MOCK_PROGRESS,
  type MemberPaymentStatus,
} from "@/lib/owner-data";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

function StatusBadge({ status }: { status: MemberPaymentStatus }) {
  switch (status) {
    case "active":
      return (
        <Badge variant="success" className="gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Active
        </Badge>
      );
    case "due":
      return (
        <Badge variant="warning" className="gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Payment Due
        </Badge>
      );
    case "expired":
      return (
        <Badge variant="destructive" className="gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          Expired
        </Badge>
      );
    case "frozen":
      return (
        <Badge variant="outline" className="gap-1.5 text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          Frozen
        </Badge>
      );
  }
}

export default function MemberDetailPage({ params }: Props) {
  const { id } = use(params);
  const member = MOCK_MEMBERS.find((m) => m.id === id);
  if (!member) notFound();

  const payments = MOCK_PAYMENTS.filter((p) => p.memberId === id);
  const attendance = MOCK_ATTENDANCE[id] ?? [];
  const progress = MOCK_PROGRESS[id] ?? [];

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/owner/members"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Members
      </Link>

      {/* Member Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        {/* Left: Identity */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 shrink-0">
            <AvatarFallback className="text-lg font-bold">
              {member.initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {member.name}
              </h2>
              <StatusBadge status={member.paymentStatus} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 text-xs font-medium">
                {member.plan}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Expires {member.expiryDate}
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {member.trainer}
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {member.email} · {member.phone}
            </p>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button
            size="sm"
            className="gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => toast.success("Payment recorded")}
          >
            <DollarSign className="h-3.5 w-3.5" />
            Record Payment
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => toast.info("Edit member coming soon")}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() =>
              toast.info(
                member.paymentStatus === "frozen"
                  ? "Membership unfrozen"
                  : "Membership frozen"
              )
            }
          >
            <Snowflake className="h-3.5 w-3.5" />
            {member.paymentStatus === "frozen" ? "Unfreeze" : "Freeze"}
          </Button>
          <Button
            size="sm"
            className="gap-1.5 bg-red-600 hover:bg-red-700 text-white"
            onClick={() => toast.error("Membership cancellation requested")}
          >
            <XCircle className="h-3.5 w-3.5" />
            Cancel
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <MemberTabs
        member={member}
        payments={payments}
        attendance={attendance}
        progress={progress}
      />
    </div>
  );
}
