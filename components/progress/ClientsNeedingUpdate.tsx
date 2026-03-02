import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ClientNeedingUpdate } from "@/lib/progress-data";

interface ClientsNeedingUpdateProps {
  clients: ClientNeedingUpdate[];
}

function formatLastUpdate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ClientsNeedingUpdateCard({
  clients,
}: ClientsNeedingUpdateProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Clients Needing Update
          </CardTitle>
          {clients.length > 0 && (
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-xs">
              {clients.length} overdue
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {clients.length === 0 ? (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <span className="text-base">✓</span>
            All clients are up to date — great work!
          </div>
        ) : (
          <div className="space-y-3">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3 transition-colors hover:bg-amber-50"
              >
                {/* Left: Avatar + Name + Last update */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-amber-100 text-sm font-semibold text-amber-700">
                      {client.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-900">{client.name}</p>
                    <p className="text-xs text-slate-500">
                      Last update: {formatLastUpdate(client.lastUpdate)}
                    </p>
                  </div>
                </div>

                {/* Right: Warning badge + CTA */}
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-0 text-xs hidden sm:flex">
                    No update in {client.daysSinceUpdate} days
                  </Badge>
                  <Button size="sm" className="text-xs gap-1.5" asChild>
                    <Link
                      href={`/trainer/clients/${client.id}?tab=progress`}
                    >
                      Log Now
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
