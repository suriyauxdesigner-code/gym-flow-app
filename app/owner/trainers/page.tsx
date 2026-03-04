"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrainerTable from "@/components/owner/trainers/TrainerTable";
import AddTrainerDialog from "@/components/owner/trainers/AddTrainerDialog";
import { MOCK_TRAINERS } from "@/lib/owner-data";
import type { TrainerAvailabilityStatus } from "@/lib/owner-data";

export default function TrainersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | TrainerAvailabilityStatus>("all");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const specializations = Array.from(new Set(MOCK_TRAINERS.map((t) => t.specialization)));

  const filtered = MOCK_TRAINERS.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesSpec = specializationFilter === "all" || t.specialization === specializationFilter;
    return matchesSearch && matchesStatus && matchesSpec;
  });

  const selectCls =
    "h-9 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Trainers</h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Manage your gym trainers
          </p>
        </div>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 shrink-0 self-start sm:self-auto"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Trainers
        </Button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            placeholder="Search trainers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm bg-white dark:bg-slate-900"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | TrainerAvailabilityStatus)}
            className={selectCls}
          >
            <option value="all">Status: All</option>
            <option value="available">Available</option>
            <option value="moderate">Moderate</option>
            <option value="overloaded">Overloaded</option>
            <option value="on-leave">On Leave</option>
          </select>

          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className={selectCls}
          >
            <option value="all">Specialization: All</option>
            {specializations.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <TrainerTable trainers={filtered} />

      {/* Add Trainer Dialog */}
      <AddTrainerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
