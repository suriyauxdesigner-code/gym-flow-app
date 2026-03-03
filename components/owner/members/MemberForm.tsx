"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { TRAINERS_LIST } from "@/lib/owner-data";

const PLANS = ["Basic", "Premium", "Elite", "Day Pass"];
const PAYMENT_MODES = ["Card", "Cash", "Bank Transfer", "Auto-Pay"];

function addMonths(dateStr: string, months: number): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  date.setMonth(date.getMonth() + months);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const PLAN_DURATION: Record<string, number> = {
  Basic: 1,
  Premium: 3,
  Elite: 12,
  "Day Pass": 0,
};

export default function MemberForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "Male",
    dob: "",
    plan: "Premium",
    startDate: "",
    trainer: TRAINERS_LIST[0],
    autoPay: false,
    initialPayment: "",
    paymentMode: "Card",
  });

  function set(key: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const expiryDate =
    form.startDate && form.plan !== "Day Pass"
      ? addMonths(form.startDate, PLAN_DURATION[form.plan] ?? 1)
      : form.plan === "Day Pass" && form.startDate
      ? new Date(form.startDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  function handleCreate() {
    toast.success("Member created successfully!", {
      description: `${form.firstName} ${form.lastName} has been added to the ${form.plan} plan.`,
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    });
    router.push("/owner/members");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Section header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          New Member Registration
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Fill in the member details below to register them.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── LEFT: Personal Info ───────────────────────────────────────────── */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="member@email.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>

            {/* Gender row */}
            <div className="space-y-1.5">
              <Label>Gender</Label>
              <div className="flex gap-2">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => set("gender", g)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      form.gender === g
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={form.dob}
                onChange={(e) => set("dob", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* ── RIGHT: Membership ─────────────────────────────────────────────── */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Membership Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Plan select */}
            <div className="space-y-1.5">
              <Label>Membership Plan</Label>
              <div className="grid grid-cols-2 gap-2">
                {PLANS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => set("plan", p)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors text-left ${
                      form.plan === p
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
              />
            </div>

            {/* Auto-calculated expiry */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Expiry Date
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {expiryDate}
              </span>
            </div>

            {/* Assign Trainer */}
            <div className="space-y-1.5">
              <Label htmlFor="trainer">Assign Trainer</Label>
              <select
                id="trainer"
                value={form.trainer}
                onChange={(e) => set("trainer", e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {TRAINERS_LIST.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto-Pay Toggle */}
            <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Enable Auto-Pay
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Automatically renew membership
                </p>
              </div>
              <Switch
                checked={form.autoPay}
                onCheckedChange={(v) => set("autoPay", v)}
              />
            </div>

            <Separator />

            {/* Payment */}
            <div className="space-y-1.5">
              <Label htmlFor="initialPayment">Initial Payment (USD)</Label>
              <Input
                id="initialPayment"
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
                value={form.initialPayment}
                onChange={(e) => set("initialPayment", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Payment Mode</Label>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_MODES.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => set("paymentMode", mode)}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                      form.paymentMode === mode
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="outline" asChild>
          <Link href="/owner/members">Cancel</Link>
        </Button>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
          onClick={handleCreate}
        >
          Create Member
        </Button>
      </div>
    </div>
  );
}
