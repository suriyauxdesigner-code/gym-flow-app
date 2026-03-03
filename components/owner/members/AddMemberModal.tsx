"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TRAINERS_LIST } from "@/lib/owner-data";
import { cn } from "@/lib/utils";

// ── Constants ─────────────────────────────────────────────────────────────────

const PLANS = [
  { name: "Basic", price: "$49/mo", duration: "1 month" },
  { name: "Premium", price: "$89/mo", duration: "3 months" },
  { name: "Elite", price: "$149/mo", duration: "12 months" },
  { name: "Day Pass", price: "$15", duration: "Single day" },
];

const PAYMENT_MODES = ["Card", "Cash", "Bank Transfer", "Auto-Pay"];

const PLAN_DURATION: Record<string, number> = {
  Basic: 1,
  Premium: 3,
  Elite: 12,
  "Day Pass": 0,
};

function addMonths(dateStr: string, months: number): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const EMPTY_FORM = {
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
};

// ── Step Indicator ─────────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: 1 | 2 }) {
  const steps = [
    { n: 1, label: "Personal Info" },
    { n: 2, label: "Membership" },
  ];

  return (
    <div className="flex items-start justify-center gap-0 py-1">
      {steps.map((s, idx) => {
        const done = step > s.n;
        const active = step === s.n;
        return (
          <div key={s.n} className="flex items-start">
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "h-9 w-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-200",
                  done || active
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : s.n}
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-widest leading-none",
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : done
                    ? "text-indigo-400 dark:text-indigo-500"
                    : "text-slate-400 dark:text-slate-600"
                )}
              >
                {s.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {idx < steps.length - 1 && (
              <div className="relative mx-4 mt-4 h-0.5 w-24 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div
                  className="absolute inset-0 rounded-full bg-indigo-600 transition-all duration-300"
                  style={{ width: step >= 2 ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Pill Button ───────────────────────────────────────────────────────────────

function PillBtn({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors text-left",
        active
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300"
          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600",
        className
      )}
    >
      {children}
    </button>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ── Modal ─────────────────────────────────────────────────────────────────────

export default function AddMemberModal({
  open,
  onOpenChange,
}: AddMemberModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ ...EMPTY_FORM });

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

  function handleClose(nextOpen: boolean) {
    if (!nextOpen) {
      // Reset state when closing
      setStep(1);
      setForm({ ...EMPTY_FORM });
    }
    onOpenChange(nextOpen);
  }

  function handleCreate() {
    toast.success("Member created successfully!", {
      description: `${form.firstName || "New member"} has been added to the ${form.plan} plan.`,
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    });
    handleClose(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[560px] p-0 gap-0 overflow-hidden">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Add New Member
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Complete both steps to register the new member.
          </DialogDescription>

          {/* Step progress */}
          <div className="mt-5">
            <StepIndicator step={step} />
          </div>
        </DialogHeader>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <ScrollArea className="max-h-[58vh]">
          <div className="px-6 py-5 space-y-5">
            {step === 1 ? (
              /* ───── STEP 1: Personal Information ───── */
              <>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                    Personal Information
                  </p>

                  <div className="space-y-4">
                    {/* Name */}
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

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                      />
                    </div>

                    {/* Email */}
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

                    {/* Gender */}
                    <div className="space-y-1.5">
                      <Label>Gender</Label>
                      <div className="flex gap-2">
                        {["Male", "Female", "Other"].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => set("gender", g)}
                            className={cn(
                              "flex-1 rounded-xl border py-2 text-sm font-medium transition-colors",
                              form.gender === g
                                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300"
                                : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                            )}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* DOB */}
                    <div className="space-y-1.5">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={form.dob}
                        onChange={(e) => set("dob", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* ───── STEP 2: Membership Details ───── */
              <>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                    Membership Details
                  </p>

                  <div className="space-y-4">
                    {/* Plan grid */}
                    <div className="space-y-1.5">
                      <Label>Membership Plan</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {PLANS.map((p) => (
                          <PillBtn
                            key={p.name}
                            active={form.plan === p.name}
                            onClick={() => set("plan", p.name)}
                          >
                            <span className="block font-semibold text-[13px]">
                              {p.name}
                            </span>
                            <span className="block text-xs opacity-70 mt-0.5">
                              {p.price} · {p.duration}
                            </span>
                          </PillBtn>
                        ))}
                      </div>
                    </div>

                    {/* Start Date + auto Expiry */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={form.startDate}
                          onChange={(e) => set("startDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Expiry Date</Label>
                        <div className="flex h-10 items-center justify-center rounded-xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-3">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {expiryDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Trainer */}
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

                    {/* Auto-Pay toggle */}
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

                    {/* Payment amount */}
                    <div className="space-y-1.5">
                      <Label htmlFor="initialPayment">
                        Initial Payment (USD)
                      </Label>
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

                    {/* Payment mode */}
                    <div className="space-y-1.5">
                      <Label>Payment Mode</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {PAYMENT_MODES.map((mode) => (
                          <PillBtn
                            key={mode}
                            active={form.paymentMode === mode}
                            onClick={() => set("paymentMode", mode)}
                            className="py-2 text-sm"
                          >
                            {mode}
                          </PillBtn>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 px-6 py-4">
          {/* Left: step hint */}
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Step {step} of 2
          </span>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            {step === 1 ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleClose(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
                  onClick={() => setStep(2)}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleCreate}
                >
                  Create Member
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
