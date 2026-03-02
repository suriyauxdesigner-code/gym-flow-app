import { ClipboardEdit, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export interface ClientAttentionItem {
  id: number;
  name: string;
  initials: string;
  lastUpdate: string;
  goal: string;
}

interface ClientAttentionListProps {
  clients: ClientAttentionItem[];
}

export default function ClientAttentionList({
  clients,
}: ClientAttentionListProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-900">
            Clients Needing Attention
          </CardTitle>
          <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1">
            <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-medium text-amber-700">
              {clients.length} overdue
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="max-h-[340px]">
          <ul>
            {clients.map((client, index) => (
              <li key={client.id}>
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="text-xs font-semibold">
                        {client.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {client.name}
                      </p>
                      <p className="text-xs text-slate-500">{client.goal}</p>
                      <p className="text-xs text-amber-600 font-medium mt-0.5">
                        Last update: {client.lastUpdate}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1.5 shrink-0 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                    <ClipboardEdit className="h-3.5 w-3.5" />
                    Log Progress
                  </Button>
                </div>
                {index < clients.length - 1 && (
                  <Separator className="mx-6 w-auto" />
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
