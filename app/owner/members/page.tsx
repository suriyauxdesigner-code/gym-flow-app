"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MemberTable from "@/components/owner/members/MemberTable";
import AddMemberModal from "@/components/owner/members/AddMemberModal";
import { MOCK_MEMBERS, MOCK_TRAINERS, type MemberPaymentStatus } from "@/lib/owner-data";

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MemberPaymentStatus>("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [trainerFilter, setTrainerFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const plans = Array.from(new Set(MOCK_MEMBERS.map((m) => m.plan)));

  const filtered = MOCK_MEMBERS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.plan.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || m.paymentStatus === statusFilter;
    const matchesPlan = planFilter === "all" || m.plan === planFilter;
    const matchesTrainer = trainerFilter === "all" || m.trainer === trainerFilter;
    return matchesSearch && matchesStatus && matchesPlan && matchesTrainer;
  });

  const selectCls =
    "h-9 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Members</h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {MOCK_MEMBERS.length} total members registered
          </p>
        </div>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 shrink-0 self-start sm:self-auto"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
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

        {/* Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | MemberPaymentStatus)}
            className={selectCls}
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="due">Due</option>
            <option value="expired">Expired</option>
            <option value="frozen">Frozen</option>
          </select>

          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className={selectCls}
          >
            <option value="all">Membership Plan: All</option>
            {plans.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            value={trainerFilter}
            onChange={(e) => setTrainerFilter(e.target.value)}
            className={selectCls}
          >
            <option value="all">Assigned Trainer: All</option>
            {MOCK_TRAINERS.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
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
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No members found</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filter.</p>
        </div>
      )}

      {/* Add Member Modal */}
      <AddMemberModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
