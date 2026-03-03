"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MemberTable from "@/components/owner/members/MemberTable";
import { MOCK_MEMBERS, type MemberPaymentStatus } from "@/lib/owner-data";
import { cn } from "@/lib/utils";

type FilterStatus = "all" | MemberPaymentStatus;

const STATUS_FILTERS: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Due", value: "due" },
  { label: "Expired", value: "expired" },
  { label: "Frozen", value: "frozen" },
];

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");

  const filtered = MOCK_MEMBERS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.plan.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || m.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Member Directory
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {MOCK_MEMBERS.length} total members registered
          </p>
        </div>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 shrink-0 self-start sm:self-auto"
          asChild
        >
          <Link href="/owner/members/add">
            <Plus className="h-4 w-4" />
            Add Member
          </Link>
        </Button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            placeholder="Search by name, email, plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm bg-white dark:bg-slate-900"
          />
        </div>

        {/* Status Pill Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatusFilter(f.value)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border",
                statusFilter === f.value
                  ? "border-indigo-500 bg-indigo-600 text-white"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-700 dark:hover:text-indigo-300 bg-white dark:bg-slate-900"
              )}
            >
              {f.label}
              <span className="ml-1 text-[10px] opacity-70">
                {f.value === "all"
                  ? MOCK_MEMBERS.length
                  : MOCK_MEMBERS.filter((m) => m.paymentStatus === f.value)
                      .length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <MemberTable members={filtered} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No members found
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search or filter.
          </p>
        </div>
      )}
    </div>
  );
}
