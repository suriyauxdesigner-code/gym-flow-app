"use client";

import { useState } from "react";
import { Monitor, Smartphone, Globe, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MOCK_SESSIONS, type ActiveSession } from "@/lib/profile-data";
import { toast } from "sonner";

function getDeviceIcon(
  device: string
): React.ComponentType<{ className?: string }> {
  const lower = device.toLowerCase();
  if (lower.includes("iphone") || lower.includes("android"))
    return Smartphone;
  if (lower.includes("safari") && lower.includes("iphone")) return Smartphone;
  if (lower.includes("firefox")) return Globe;
  return Monitor;
}

export default function SecurityCard() {
  const [sessions, setSessions] = useState<ActiveSession[]>(MOCK_SESSIONS);
  const [pwDialogOpen, setPwDialogOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  function handleChangePassword() {
    if (!currentPw || !newPw || !confirmPw) {
      toast.error("All fields are required");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPw.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    toast.success("Password changed successfully");
    setPwDialogOpen(false);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
  }

  function handleLogoutAll() {
    setSessions((prev) => prev.filter((s) => s.current));
    toast.success("All other sessions have been logged out");
  }

  return (
    <>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900">
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Last Login */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-900">Last Login</p>
              <p className="text-xs text-slate-400">
                Today, 9:32 AM · New York, US · Chrome on macOS
              </p>
            </div>
            <ShieldCheck className="h-5 w-5 text-indigo-400" />
          </div>

          {/* Active Sessions */}
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Active Sessions
            </p>
            <div className="flex flex-col gap-2">
              {sessions.map((session) => {
                const DevIcon = getDeviceIcon(session.device);
                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                        <DevIcon className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {session.device}
                        </p>
                        <p className="text-xs text-slate-400">
                          {session.location} · {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {session.current && (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                        Current
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div
            className={cn(
              "flex flex-wrap gap-3 border-t border-slate-100 pt-4"
            )}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPwDialogOpen(true)}
            >
              Change Password
            </Button>
            <Button
              size="sm"
              onClick={handleLogoutAll}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Logout All Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Change Password Dialog ── */}
      <Dialog open={pwDialogOpen} onOpenChange={setPwDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a strong new one.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-1">
            <div className="space-y-1.5">
              <Label htmlFor="current-pw">Current Password</Label>
              <Input
                id="current-pw"
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-pw">New Password</Label>
              <Input
                id="new-pw"
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="Min. 8 characters"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-pw">Confirm New Password</Label>
              <Input
                id="confirm-pw"
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button
              size="sm"
              onClick={handleChangePassword}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
