"use client";

import Link from "next/link";
import { Eye, ClipboardEdit, TrendingUp } from "lucide-react";
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
import { cn } from "@/lib/utils";

export interface Client {
  id: string;
  name: string;
  initials: string;
  plan: string;
  lastVisit: string;
  lastProgress: string;
  attendance: number;
  status: "active" | "attention" | "inactive";
}

interface ClientTableProps {
  clients: Client[];
  totalCount: number;
}

function StatusBadge({ status }: { status: Client["status"] }) {
  if (status === "active") {
    return <Badge variant="success">Active</Badge>;
  }
  if (status === "attention") {
    return <Badge variant="destructive">Attention Needed</Badge>;
  }
  return <Badge variant="secondary">Inactive</Badge>;
}

function AttendancePill({ value }: { value: number }) {
  const color =
    value >= 85
      ? "bg-emerald-500"
      : value >= 65
      ? "bg-amber-400"
      : "bg-red-400";

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${value}%` }}
        />
      </div>
      <span
        className={cn(
          "text-sm font-medium",
          value >= 85
            ? "text-emerald-700"
            : value >= 65
            ? "text-amber-700"
            : "text-red-600"
        )}
      >
        {value}%
      </span>
    </div>
  );
}

export default function ClientTable({ clients, totalCount }: ClientTableProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              All Clients
            </CardTitle>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Showing {clients.length} of {totalCount} clients
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 px-3 py-1">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              {clients.filter((c) => c.status === "active").length} Active
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-64 pl-6">Client</TableHead>
              <TableHead>Membership Plan</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Last Progress</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                {/* Client */}
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="text-xs font-semibold">
                        {client.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {client.name}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Plan */}
                <TableCell>
                  <span className="rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                    {client.plan}
                  </span>
                </TableCell>

                {/* Last Visit */}
                <TableCell className="text-slate-600 dark:text-slate-400">{client.lastVisit}</TableCell>

                {/* Last Progress */}
                <TableCell>
                  <span
                    className={cn(
                      "text-sm",
                      client.lastProgress === "Today" ||
                        client.lastProgress === "Yesterday"
                        ? "text-slate-600"
                        : "font-medium text-amber-600"
                    )}
                  >
                    {client.lastProgress}
                  </span>
                </TableCell>

                {/* Attendance */}
                <TableCell>
                  <AttendancePill value={client.attendance} />
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={client.status} />
                </TableCell>

                {/* Actions */}
                <TableCell className="pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" asChild>
                      <Link href={`/trainer/clients/${client.id}`}>
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>
                    </Button>
                    <Button size="sm" className="gap-1.5 text-xs" asChild>
                      <Link href={`/trainer/clients/${client.id}?tab=progress`}>
                        <ClipboardEdit className="h-3.5 w-3.5" />
                        Log Progress
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
