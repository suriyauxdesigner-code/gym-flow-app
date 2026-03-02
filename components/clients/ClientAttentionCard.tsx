import { AlertTriangle, ClipboardEdit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { Client } from "./ClientTable";

interface ClientAttentionCardProps {
  clients: Client[];
}

export default function ClientAttentionCard({
  clients,
}: ClientAttentionCardProps) {
  return (
    <Card className="border-amber-100 bg-amber-50/40">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-slate-900">
              Clients Needing Attention
            </CardTitle>
            <p className="text-xs text-slate-500">
              No progress log recorded in the last 7 days
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ul>
          {clients.map((client, index) => (
            <li key={client.id}>
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-amber-100 text-xs font-semibold text-amber-700">
                      {client.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {client.name}
                    </p>
                    <p className="text-xs text-slate-500">{client.plan}</p>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span className="text-xs font-medium text-amber-700">
                        No progress log in {client.lastProgress}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="gap-1.5 shrink-0 text-xs">
                  <ClipboardEdit className="h-3.5 w-3.5" />
                  Log Now
                </Button>
              </div>
              {index < clients.length - 1 && (
                <Separator className="mx-6 w-auto border-amber-100" />
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
