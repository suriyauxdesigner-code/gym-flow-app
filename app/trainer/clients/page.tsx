"use client";

import { useState, useMemo } from "react";
import { Search, Download, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ClientTable, { type Client } from "@/components/clients/ClientTable";
import ClientAttentionCard from "@/components/clients/ClientAttentionCard";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ALL_CLIENTS: Client[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    initials: "SJ",
    plan: "Premium · 3×/week",
    lastVisit: "Today",
    lastProgress: "3 days ago",
    attendance: 87,
    status: "attention",
  },
  {
    id: "2",
    name: "Mike Chen",
    initials: "MC",
    plan: "Standard · 2×/week",
    lastVisit: "Yesterday",
    lastProgress: "5 days ago",
    attendance: 72,
    status: "attention",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    initials: "ER",
    plan: "Premium · 4×/week",
    lastVisit: "Today",
    lastProgress: "Today",
    attendance: 95,
    status: "active",
  },
  {
    id: "4",
    name: "David Kim",
    initials: "DK",
    plan: "Basic · 1×/week",
    lastVisit: "3 days ago",
    lastProgress: "1 week ago",
    attendance: 64,
    status: "attention",
  },
  {
    id: "5",
    name: "Jessica Wang",
    initials: "JW",
    plan: "Premium · 5×/week",
    lastVisit: "Today",
    lastProgress: "2 weeks ago",
    attendance: 91,
    status: "attention",
  },
  {
    id: "6",
    name: "Ryan Thompson",
    initials: "RT",
    plan: "Standard · 3×/week",
    lastVisit: "Yesterday",
    lastProgress: "Yesterday",
    attendance: 88,
    status: "active",
  },
  {
    id: "7",
    name: "Priya Patel",
    initials: "PP",
    plan: "Premium · 4×/week",
    lastVisit: "Today",
    lastProgress: "Today",
    attendance: 97,
    status: "active",
  },
  {
    id: "8",
    name: "Lucas Martin",
    initials: "LM",
    plan: "Basic · 1×/week",
    lastVisit: "2 weeks ago",
    lastProgress: "3 weeks ago",
    attendance: 42,
    status: "inactive",
  },
  {
    id: "9",
    name: "Aisha Ibrahim",
    initials: "AI",
    plan: "Standard · 2×/week",
    lastVisit: "Yesterday",
    lastProgress: "Yesterday",
    attendance: 80,
    status: "active",
  },
  {
    id: "10",
    name: "Omar Hassan",
    initials: "OH",
    plan: "Premium · 3×/week",
    lastVisit: "Today",
    lastProgress: "Today",
    attendance: 93,
    status: "active",
  },
];

type FilterStatus = "all" | "active" | "attention" | "inactive";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MyClientsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const filtered = useMemo(() => {
    return ALL_CLIENTS.filter((client) => {
      const matchesSearch = client.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || client.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [search, filterStatus]);

  const attentionClients = useMemo(
    () => ALL_CLIENTS.filter((c) => c.status === "attention").slice(0, 3),
    []
  );

  return (
    <div className="space-y-6">
      {/* ── Page Controls ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Summary chips */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { label: "All Clients", value: ALL_CLIENTS.length, filter: "all" as FilterStatus, color: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
              { label: "Active",      value: ALL_CLIENTS.filter((c) => c.status === "active").length,    filter: "active" as FilterStatus,    color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
              { label: "Attention",   value: ALL_CLIENTS.filter((c) => c.status === "attention").length, filter: "attention" as FilterStatus, color: "bg-amber-50 text-amber-700 hover:bg-amber-100" },
              { label: "Inactive",   value: ALL_CLIENTS.filter((c) => c.status === "inactive").length,  filter: "inactive" as FilterStatus,  color: "bg-slate-50 text-slate-500 hover:bg-slate-100" },
            ] as const
          ).map((chip) => (
            <button
              key={chip.filter}
              type="button"
              onClick={() => setFilterStatus(chip.filter)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${chip.color} ${filterStatus === chip.filter ? "ring-2 ring-indigo-400 ring-offset-1" : ""}`}
            >
              {chip.label}
              <span className="rounded-full bg-white/60 px-1.5 py-0.5 font-bold">
                {chip.value}
              </span>
            </button>
          ))}
        </div>

        {/* Search + filter + export */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="Search clients…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 pl-8"
              aria-label="Search clients"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              aria-label="Filter by status"
              className="h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-8 pr-8 text-sm text-slate-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="attention">Attention Needed</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <Button variant="ghost" className="gap-1.5 text-slate-600">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* ── Clients Table ── */}
      <section aria-labelledby="clients-table-heading">
        <h2 id="clients-table-heading" className="sr-only">
          Clients List
        </h2>
        {filtered.length > 0 ? (
          <ClientTable clients={filtered} totalCount={ALL_CLIENTS.length} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
            <Search className="mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">
              No clients match your search
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </section>

      {/* ── Attention Section ── */}
      {attentionClients.length > 0 && (
        <section aria-labelledby="attention-heading">
          <h2 id="attention-heading" className="sr-only">
            Clients Needing Attention
          </h2>
          <ClientAttentionCard clients={attentionClients} />
        </section>
      )}
    </div>
  );
}
