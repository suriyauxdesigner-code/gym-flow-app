"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { User } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const PERMISSIONS = [
  { key: "canAssignWorkout", label: "Can Assign Workout" },
  { key: "canAssignMealPlan", label: "Can Assign Meal Plan" },
  { key: "canMarkAttendance", label: "Can Mark Attendance" },
  { key: "canViewPayments", label: "Can View Payments" },
  { key: "canEditClasses", label: "Can Edit Classes" },
] as const;

type PermissionKey = (typeof PERMISSIONS)[number]["key"];

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  specialization: string;
  experience: string;
  employmentType: string;
  certification: string;
  bio: string;
  permissions: Record<PermissionKey, boolean>;
}

const DEFAULT_FORM: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  gender: "Male",
  specialization: "",
  experience: "",
  employmentType: "Full-time",
  certification: "",
  bio: "",
  permissions: {
    canAssignWorkout: true,
    canAssignMealPlan: false,
    canMarkAttendance: true,
    canViewPayments: false,
    canEditClasses: false,
  },
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddTrainerDialog({ open, onOpenChange }: Props) {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);

  useEffect(() => {
    if (!open) setForm(DEFAULT_FORM);
  }, [open]);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function setPermission(key: PermissionKey, value: boolean) {
    setForm((prev) => ({
      ...prev,
      permissions: { ...prev.permissions, [key]: value },
    }));
  }

  function handleSave() {
    if (!form.firstName.trim() || !form.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    toast.success("Trainer added successfully!");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 flex flex-col max-h-[90vh]">
        <DialogTitle className="sr-only">Add Trainer</DialogTitle>

        {/* Sticky Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-slate-200 dark:border-slate-800 shrink-0 pr-14">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Add Trainer</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              Register a new trainer at Iron Forge Gym
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* LEFT — Personal Info */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Profile Photo */}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                    <User className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Profile Photo</p>
                    <label className="mt-1 inline-block cursor-pointer text-xs text-indigo-600 hover:underline">
                      Upload photo
                      <input type="file" accept="image/*" className="sr-only" />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Alex"
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Last Name
                    </Label>
                    <Input
                      placeholder="Thompson"
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">Phone</Label>
                  <Input
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="trainer@fitpro.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">Gender</Label>
                  <select
                    value={form.gender}
                    onChange={(e) => set("gender", e.target.value)}
                    className="flex h-9 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* RIGHT — Professional Info */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">Specialization</Label>
                  <Input
                    placeholder="e.g. HIIT & Strength, Yoga, Pilates"
                    value={form.specialization}
                    onChange={(e) => set("specialization", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">Experience (years)</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="5"
                    value={form.experience}
                    onChange={(e) => set("experience", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">Employment Type</Label>
                  <select
                    value={form.employmentType}
                    onChange={(e) => set("employmentType", e.target.value)}
                    className="flex h-9 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">Certification</Label>
                  <Input
                    placeholder="e.g. NASM-CPT, CSCS"
                    value={form.certification}
                    onChange={(e) => set("certification", e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600 dark:text-slate-400">Bio</Label>
                  <Textarea
                    placeholder="Brief description of the trainer's background and expertise..."
                    value={form.bio}
                    onChange={(e) => set("bio", e.target.value)}
                    rows={5}
                    className="text-sm resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Permissions */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PERMISSIONS.map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3"
                  >
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                      {label}
                    </Label>
                    <Switch
                      checked={form.permissions[key]}
                      onCheckedChange={(v) => setPermission(key, v)}
                      aria-label={label}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-indigo-600 text-white hover:bg-indigo-700">
            Save Trainer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
