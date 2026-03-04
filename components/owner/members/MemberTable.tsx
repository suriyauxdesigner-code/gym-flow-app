"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;

function StatusBadge({ status }: { status: MemberPaymentStatus }) {
  const cfg: Record<MemberPaymentStatus, { label: string; cls: string }> = {
    active: { label: "Active", cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800" },
    due: { label: "Due", cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800" },
    expired: { label: "Expired", cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800" },
    frozen: { label: "Frozen", cls: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700" },
  };
  const { label, cls } = cfg[status];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium", cls)}>
      {label}
    </span>
  );
}

function PlanPill({ plan }: { plan: string }) {
  const colors: Record<string, string> = {
    Elite: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    Premium: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    Basic: "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300",
    "Day Pass": "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  };
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", colors[plan] ?? colors["Basic"])}>
      {plan}
    </span>
  );
}

interface MemberTableProps {
  members: OwnerMember[];
}

export default function MemberTable({ members }: MemberTableProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(PAGE_SIZE);

  const totalPages = Math.max(1, Math.ceil(members.length / rowsPerPage));
  const paginated = members.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  function toggleAll() {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((m) => m.id)));
    }
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const allChecked = paginated.length > 0 && selected.size === paginated.length;

  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <TableHead className="w-10 pl-4">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 accent-indigo-600 cursor-pointer"
                  />
                </TableHead>
                <TableHead className="pl-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Member Name
                </TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Membership Plan
                </TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Assigned Trainer
                </TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Status
                </TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Exp. Date
                </TableHead>
                <TableHead className="pr-6 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((member) => (
                <TableRow
                  key={member.id}
                  onClick={() => router.push(`/owner/members/${member.id}`)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer border-slate-100 dark:border-slate-800"
                >
                  {/* Checkbox */}
                  <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(member.id)}
                      onChange={() => toggleOne(member.id)}
                      className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 accent-indigo-600 cursor-pointer"
                    />
                  </TableCell>

                  {/* Member Name */}
                  <TableCell className="pl-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">
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
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {member.trainer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {member.trainer}
                      </span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <StatusBadge status={member.paymentStatus} />
                  </TableCell>

                  {/* Expiry */}
                  <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                    {member.expiryDate}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-6" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/owner/members/${member.id}`);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 px-4 py-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {selected.size} of {members.length} row(s) selected
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
