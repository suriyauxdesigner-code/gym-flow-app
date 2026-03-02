"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Users, ClipboardEdit, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type ClassSession, getStatusConfig } from "@/lib/class-data";

interface ClassHeaderProps {
  session: ClassSession;
  onMarkAttendance: () => void;
}

export default function ClassHeader({ session, onMarkAttendance }: ClassHeaderProps) {
  const cfg = getStatusConfig(session.status);
  const isCompleted = session.status === "completed";

  return (
    <div className="space-y-4">
      {/* Back nav */}
      <Link
        href="/trainer/classes"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-indigo-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Classes
      </Link>

      {/* Header card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Left: Class info */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-bold text-slate-900">{session.name}</h1>
                <Badge variant={cfg.badge}>{cfg.label}</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 shrink-0 text-slate-400" />
                  {session.date} · {session.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 shrink-0 text-slate-400" />
                  <span>
                    <span className="font-semibold text-slate-900">{session.booked}</span>
                    {" / "}
                    <span>{session.capacity}</span>
                    {" booked"}
                  </span>
                </span>
              </div>

              {/* Capacity bar */}
              <div className="flex items-center gap-2 pt-1">
                <div className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${Math.min((session.booked / session.capacity) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400">
                  {Math.round((session.booked / session.capacity) * 100)}% full
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={onMarkAttendance}
                disabled={isCompleted}
                className="gap-1.5"
              >
                <ClipboardEdit className="h-4 w-4" />
                Mark Attendance
              </Button>
              <Button
                variant="outline"
                disabled={isCompleted}
                className="gap-1.5"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
