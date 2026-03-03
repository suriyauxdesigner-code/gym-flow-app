"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ProfileForm from "@/components/profile/ProfileForm";
import SecurityCard from "@/components/profile/SecurityCard";
import { MOCK_PROFILE, type TrainerProfile } from "@/lib/profile-data";

export default function ProfilePage() {
  const [profile, setProfile] = useState<TrainerProfile>(MOCK_PROFILE);
  const [saved, setSaved] = useState<TrainerProfile>(MOCK_PROFILE);
  const [hasChanges, setHasChanges] = useState(false);

  // Account settings (local UI state only)
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  function handleProfileChange(next: TrainerProfile) {
    setProfile(next);
    setHasChanges(JSON.stringify(next) !== JSON.stringify(saved));
  }

  function handleSave() {
    setSaved(profile);
    setHasChanges(false);
    toast.success("Profile saved successfully");
  }

  function handleCancel() {
    setProfile(saved);
    setHasChanges(false);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Profile
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Manage your personal information
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              Unsaved changes
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            disabled={!hasChanges}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* ── Section 1: Profile Information ── */}
      <ProfileForm profile={profile} onChange={handleProfileChange} />

      {/* ── Section 2: Account Settings ── */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
          {/* Email Notifications */}
          <div className="flex items-center justify-between py-4 first:pt-0">
            <div>
              <Label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Email Notifications
              </Label>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                Receive updates and session alerts via email
              </p>
            </div>
            <Switch
              checked={emailNotifs}
              onCheckedChange={setEmailNotifs}
              aria-label="Email notifications"
            />
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between py-4 last:pb-0">
            <div>
              <Label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Push Notifications
              </Label>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                Get real-time alerts directly on your device
              </p>
            </div>
            <Switch
              checked={pushNotifs}
              onCheckedChange={setPushNotifs}
              aria-label="Push notifications"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Section 3: Security ── */}
      <SecurityCard />
    </div>
  );
}
