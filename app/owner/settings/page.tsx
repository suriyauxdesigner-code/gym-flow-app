"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Upload, CreditCard, Smartphone, Building2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SettingsTab = "gym-profile" | "payments" | "membership-plans" | "class-settings" | "notification-settings";

const TABS: { value: SettingsTab; label: string }[] = [
  { value: "gym-profile", label: "Gym Pofile" },
  { value: "payments", label: "Payments & Billing" },
  { value: "membership-plans", label: "Membership Plans" },
  { value: "class-settings", label: "Class Settings" },
  { value: "notification-settings", label: "Notification Settings" },
];

// ── Gym Profile Tab ────────────────────────────────────────────────────────────
function GymProfileTab() {
  const [form, setForm] = useState({
    gymName: "GOLDS GYM",
    ownerName: "GOLDS GYM",
    email: "jessicaparker@gmail.com",
    phone: "+1 9707 840 311",
    gstNumber: "+1 9707 840 311",
    address: "14th Street, Brooklyn,  New York, 272 236",
  });

  const labelCls = "text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400";
  const inputCls = "h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm";

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Logo upload */}
      <div className="flex justify-center">
        <button
          type="button"
          className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-dashed border-indigo-300 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-950/20 gap-1.5 hover:border-indigo-500 transition-colors"
          onClick={() => toast.info("Image upload coming soon")}
        >
          <Upload className="h-5 w-5 text-indigo-500" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-500">
            Upload
          </span>
        </button>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className={labelCls}>Gym Name</label>
          <Input
            value={form.gymName}
            onChange={(e) => setForm((f) => ({ ...f, gymName: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Owner Name</label>
          <Input
            value={form.ownerName}
            onChange={(e) => setForm((f) => ({ ...f, ownerName: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Email Address</label>
          <Input
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Phone Number</label>
          <Input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Gym GST Number</label>
          <Input
            value={form.gstNumber}
            onChange={(e) => setForm((f) => ({ ...f, gstNumber: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Gym Address</label>
          <Input
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            className={inputCls}
          />
        </div>
      </div>

      <Button
        className="bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={() => toast.success("Settings saved")}
      >
        Save Changes
      </Button>
    </div>
  );
}

// ── Payments & Billing Tab ─────────────────────────────────────────────────────
function PaymentsBillingTab() {
  const [autoPay, setAutoPay] = useState(true);
  const [methods, setMethods] = useState({
    card: true,
    upi: true,
    emandate: false,
  });

  return (
    <div className="space-y-4 max-w-3xl">
      {/* Stripe Connect */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/40">
            <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Stripe Connect</p>
            <p className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
              Connected
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Payouts are processed daily to your primary bank account ending in •••• 4242.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950/40 shrink-0"
          onClick={() => toast.info("Disconnect coming soon")}
        >
          Disconnect
        </Button>
      </div>

      {/* Auto-Pay Default */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Auto-Pay Default</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Enable recurring payments for all new memberships by default.
          </p>
        </div>
        <Switch
          checked={autoPay}
          onCheckedChange={setAutoPay}
          className="data-[state=checked]:bg-indigo-600"
        />
      </div>

      {/* Payment Methods */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Payment Methods
          </p>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {[
            { key: "card" as const, icon: CreditCard, label: "Credit / Debit Cards" },
            { key: "upi" as const, icon: Smartphone, label: "UPI" },
            { key: "emandate" as const, icon: Building2, label: "eMandate / Netbanking" },
          ].map(({ key, icon: Icon, label }) => (
            <div key={key} className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40">
                  <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</span>
              </div>
              <Switch
                checked={methods[key]}
                onCheckedChange={(v) => setMethods((m) => ({ ...m, [key]: v }))}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        className="bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={() => toast.success("Payment settings saved")}
      >
        Save Changes
      </Button>
    </div>
  );
}

// ── Membership Plans Tab ───────────────────────────────────────────────────────
interface Plan {
  id: string;
  name: string;
  duration: "monthly" | "semi-annual" | "annual";
  price: string;
  autoPay: boolean;
}

function MembershipPlansTab() {
  const [plans, setPlans] = useState<Plan[]>([
    { id: "p1", name: "Platinum Membership", duration: "monthly", price: "1,800", autoPay: true },
    { id: "p2", name: "Gold Membership", duration: "monthly", price: "1,800", autoPay: true },
    { id: "p3", name: "Silver Membership", duration: "monthly", price: "1,800", autoPay: true },
  ]);

  function updatePlan(id: string, field: keyof Plan, value: string | boolean) {
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function addPlan() {
    setPlans((prev) => [
      ...prev,
      { id: `p${Date.now()}`, name: "", duration: "monthly", price: "", autoPay: false },
    ]);
  }

  function removePlan(id: string) {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  }

  const durationOptions: { value: Plan["duration"]; label: string; sub: string }[] = [
    { value: "monthly", label: "1 Month", sub: "Monthly" },
    { value: "semi-annual", label: "6 Month", sub: "Semi- Annual" },
    { value: "annual", label: "1 Year", sub: "Annual" },
  ];

  const labelCls = "text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400";

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Plan {idx + 1}
              </h3>
              <button
                type="button"
                onClick={() => removePlan(plan.id)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Plan Name */}
            <div className="space-y-1.5">
              <label className={labelCls}>Plan Name</label>
              <Input
                value={plan.name}
                onChange={(e) => updatePlan(plan.id, "name", e.target.value)}
                placeholder="e.g. Gold Membership"
                className="h-10 rounded-lg text-sm"
              />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label className={labelCls}>Duration</label>
              <div className="grid grid-cols-3 gap-1.5">
                {durationOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updatePlan(plan.id, "duration", opt.value)}
                    className={cn(
                      "flex flex-col items-center rounded-xl py-2 px-1 text-center transition-colors",
                      plan.duration === opt.value
                        ? "bg-indigo-600 text-white"
                        : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300"
                    )}
                  >
                    <span className="text-xs font-semibold">{opt.label}</span>
                    <span className={cn("text-[10px] mt-0.5", plan.duration === opt.value ? "text-indigo-200" : "text-slate-400")}>
                      {opt.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <label className={labelCls}>Price Per Bill Cycle</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">₹</span>
                <Input
                  value={plan.price}
                  onChange={(e) => updatePlan(plan.id, "price", e.target.value)}
                  className="pl-7 h-10 rounded-lg text-sm"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Auto-Pay */}
            <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 p-3">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Enable AutoPay</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Recommended for higher retention</p>
              </div>
              <Switch
                checked={plan.autoPay}
                onCheckedChange={(v) => updatePlan(plan.id, "autoPay", v)}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Plan */}
      <button
        type="button"
        onClick={addPlan}
        className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-800 py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Another Plan
      </button>

      <Button
        className="bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={() => toast.success("Membership plans saved")}
      >
        Save Changes
      </Button>
    </div>
  );
}

// ── Class Settings Tab ─────────────────────────────────────────────────────────
function ClassSettingsTab() {
  const [bookingWindow, setBookingWindow] = useState("7 Days");
  const [cancellationWindow, setCancellationWindow] = useState("1 Hr before class starts");

  const selectCls =
    "h-10 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-4">
          General Configuration
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Booking Window
            </label>
            <div className="relative">
              <Input
                value={bookingWindow}
                onChange={(e) => setBookingWindow(e.target.value)}
                className="h-10 rounded-lg text-sm pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Cancellation Window
            </label>
            <select
              value={cancellationWindow}
              onChange={(e) => setCancellationWindow(e.target.value)}
              className={selectCls}
            >
              <option>30 Min before class starts</option>
              <option>1 Hr before class starts</option>
              <option>2 Hrs before class starts</option>
              <option>24 Hrs before class starts</option>
            </select>
          </div>
        </div>
      </div>

      <Button
        className="bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={() => toast.success("Class settings saved")}
      >
        Save Changes
      </Button>
    </div>
  );
}

// ── Notification Settings Tab ──────────────────────────────────────────────────
function NotificationSettingsTab() {
  const [prefs, setPrefs] = useState({ push: true, email: true });
  const [alerts, setAlerts] = useState({
    payments: true,
    renewal: true,
    classes: true,
  });
  const [timings, setTimings] = useState({
    payments: "3 days before",
    renewal: "3 days before",
    classes: "3 days before",
  });

  const timingOptions = ["1 day before", "3 days before", "7 days before", "14 days before"];
  const selectCls = "rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-xs font-medium text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-2 py-1";

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Preferences */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Preferences
        </p>
        <Card>
          <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { key: "push" as const, label: "Push Notifications", desc: "Mobile app alerts for urgent updates" },
              { key: "email" as const, label: "Email Notifications", desc: "Weekly summaries and billing reports" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
                </div>
                <Switch
                  checked={prefs[key]}
                  onCheckedChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))}
                  className="data-[state=checked]:bg-indigo-600"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Automated Alerts */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Automated Alerts
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "payments" as const, label: "Payment Reminders", desc: "Sent to members for unpaid dues", timingKey: "payments" as const, timingLabel: "Timing" },
            { key: "renewal" as const, label: "Auto-Renewal Notices", desc: "Alert members before renewal", timingKey: "renewal" as const, timingLabel: "Timing" },
          ].map(({ key, label, desc, timingKey, timingLabel }) => (
            <div key={key} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600 dark:text-indigo-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                  </div>
                </div>
                <Switch
                  checked={alerts[key]}
                  onCheckedChange={(v) => setAlerts((a) => ({ ...a, [key]: v }))}
                  className="data-[state=checked]:bg-indigo-600 shrink-0"
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-100 dark:border-slate-800 px-3 py-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">{timingLabel}</span>
                <select
                  value={timings[timingKey]}
                  onChange={(e) => setTimings((t) => ({ ...t, [timingKey]: e.target.value }))}
                  className={selectCls}
                >
                  {timingOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Class Reminders - full width */}
        <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 max-w-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-600 dark:text-indigo-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Class Reminders</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Upcoming booking alerts</p>
              </div>
            </div>
            <Switch
              checked={alerts.classes}
              onCheckedChange={(v) => setAlerts((a) => ({ ...a, classes: v }))}
              className="data-[state=checked]:bg-indigo-600 shrink-0"
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-100 dark:border-slate-800 px-3 py-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Remind booking at</span>
            <select
              value={timings.classes}
              onChange={(e) => setTimings((t) => ({ ...t, classes: e.target.value }))}
              className={selectCls}
            >
              {timingOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      <Button
        className="bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={() => toast.success("Notification settings saved")}
      >
        Save Changes
      </Button>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("gym-profile");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <span>GymFlow</span>
        <span className="text-slate-300 dark:text-slate-600">›</span>
        <span className="font-medium text-slate-900 dark:text-slate-100">Settings</span>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>

      {/* Tab Bar */}
      <div className="flex items-center gap-1 flex-wrap border-b border-slate-200 dark:border-slate-800">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
              activeTab === tab.value
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "gym-profile" && <GymProfileTab />}
        {activeTab === "payments" && <PaymentsBillingTab />}
        {activeTab === "membership-plans" && <MembershipPlansTab />}
        {activeTab === "class-settings" && <ClassSettingsTab />}
        {activeTab === "notification-settings" && <NotificationSettingsTab />}
      </div>
    </div>
  );
}
