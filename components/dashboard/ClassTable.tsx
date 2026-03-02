import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface ClassItem {
  id: number;
  name: string;
  time: string;
  booked: number;
  capacity: number;
  status: "In Progress" | "Upcoming" | "Completed";
}

interface ClassTableProps {
  classes: ClassItem[];
}

function StatusBadge({ status }: { status: ClassItem["status"] }) {
  if (status === "In Progress") {
    return (
      <Badge variant="success" className="gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        In Progress
      </Badge>
    );
  }
  if (status === "Upcoming") {
    return (
      <Badge variant="warning" className="gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Upcoming
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      Completed
    </Badge>
  );
}

export default function ClassTable({ classes }: ClassTableProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-900">
            Today&apos;s Classes
          </CardTitle>
          <span className="text-xs font-medium text-indigo-600">
            {classes.length} classes scheduled
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100">
              <TableHead className="pl-6">Class Name</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Booked</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell className="pl-6 font-medium text-slate-900">
                  {cls.name}
                </TableCell>
                <TableCell className="text-slate-600">{cls.time}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{
                          width: `${Math.round((cls.booked / cls.capacity) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-slate-700">{cls.booked}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{cls.capacity}</TableCell>
                <TableCell>
                  <StatusBadge status={cls.status} />
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
