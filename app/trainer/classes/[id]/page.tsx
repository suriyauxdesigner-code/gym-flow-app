"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { getClassSession, type RosterMember } from "@/lib/class-data";
import ClassHeader from "@/components/classes/ClassHeader";
import ClassMetrics from "@/components/classes/ClassMetrics";
import ClassRosterTable from "@/components/classes/ClassRosterTable";

export default function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const session = getClassSession(id);

  if (!session) {
    notFound();
  }

  const [roster, setRoster] = useState<RosterMember[]>(
    session.roster.map((m) => ({ ...m }))
  );

  // Derive a live-updated session view for metric calculations
  const liveSession = { ...session, roster };

  function handleToggle(memberId: string) {
    setRoster((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, attended: !m.attended } : m))
    );
  }

  function handleSave() {
    const present = roster.filter((m) => m.attended).length;
    toast.success("Attendance saved", {
      description: `${present} of ${roster.length} members marked present.`,
    });
  }

  function scrollToRoster() {
    document
      .getElementById("roster-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <ClassHeader session={session} onMarkAttendance={scrollToRoster} />

      {/* ── Metrics ── */}
      <ClassMetrics session={liveSession} />

      {/* ── Roster ── */}
      <div id="roster-section">
        <ClassRosterTable
          session={session}
          roster={roster}
          onToggle={handleToggle}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
