"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  CalendarDays,
  Activity,
  Plus,
  Dumbbell,
  Salad,
  ClipboardEdit,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProgressEntry {
  date: string;
  weight: number;
  bodyFat: number;
  pr: string;
  notes: string;
}

interface ClientDetail {
  id: string;
  name: string;
  initials: string;
  plan: string;
  status: "active" | "attention" | "inactive";
  attendance: number;
  lastVisit: string;
  phone: string;
  email: string;
  joinedDate: string;
  assignedPlan: string;
  nextSession: string;
  totalVisits: number;
  thisMonthVisits: number;
  workoutPlan: {
    name: string;
    schedule: string;
    exercises: string[];
  };
  mealPlan: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  notes: string[];
  progress: ProgressEntry[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_CLIENTS: ClientDetail[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    initials: "SJ",
    plan: "Premium · 3×/week",
    status: "attention",
    attendance: 87,
    lastVisit: "Today",
    phone: "+1 (555) 012-3456",
    email: "sarah.johnson@email.com",
    joinedDate: "Jan 15, 2024",
    assignedPlan: "Weight Loss · 12-week",
    nextSession: "Tomorrow, 9:00 AM",
    totalVisits: 62,
    thisMonthVisits: 9,
    workoutPlan: {
      name: "Fat Burn & Tone",
      schedule: "Mon / Wed / Fri",
      exercises: ["Treadmill HIIT – 20 min", "Squats 4×12", "Lunges 3×15", "Plank 3×60s", "Cable Row 3×12"],
    },
    mealPlan: {
      name: "Calorie Deficit Plan",
      calories: 1600,
      protein: 130,
      carbs: 140,
      fat: 50,
    },
    notes: [
      "Client prefers morning sessions.",
      "Knee discomfort on high-impact exercises — avoid deep squats.",
    ],
    progress: [
      { date: "Feb 28, 2025", weight: 68.2, bodyFat: 24.1, pr: "Squat 60kg", notes: "Good form, energy high." },
      { date: "Feb 14, 2025", weight: 69.0, bodyFat: 24.8, pr: "Deadlift 70kg", notes: "Slightly fatigued." },
      { date: "Jan 31, 2025", weight: 70.5, bodyFat: 25.5, pr: "Bench 45kg", notes: "Consistent effort." },
      { date: "Jan 17, 2025", weight: 71.2, bodyFat: 26.0, pr: "—", notes: "Starting measurements." },
    ],
  },
  {
    id: "2",
    name: "Mike Chen",
    initials: "MC",
    plan: "Standard · 2×/week",
    status: "attention",
    attendance: 72,
    lastVisit: "Yesterday",
    phone: "+1 (555) 023-4567",
    email: "mike.chen@email.com",
    joinedDate: "Mar 3, 2024",
    assignedPlan: "Muscle Gain · Hypertrophy",
    nextSession: "Friday, 7:00 AM",
    totalVisits: 44,
    thisMonthVisits: 5,
    workoutPlan: {
      name: "Hypertrophy Push / Pull / Legs",
      schedule: "Tue / Thu",
      exercises: ["Bench Press 4×8", "Shoulder Press 3×10", "Lat Pulldown 4×10", "Barbell Row 3×10", "Leg Press 4×12"],
    },
    mealPlan: {
      name: "Lean Bulk Plan",
      calories: 2800,
      protein: 200,
      carbs: 300,
      fat: 80,
    },
    notes: ["Responds well to progressive overload.", "Prefers evening sessions when possible."],
    progress: [
      { date: "Feb 25, 2025", weight: 78.4, bodyFat: 16.2, pr: "Bench 100kg", notes: "Personal record!" },
      { date: "Feb 11, 2025", weight: 77.8, bodyFat: 16.8, pr: "Squat 120kg", notes: "Solid session." },
      { date: "Jan 28, 2025", weight: 77.0, bodyFat: 17.5, pr: "Deadlift 140kg", notes: "Great form." },
    ],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    initials: "ER",
    plan: "Premium · 4×/week",
    status: "active",
    attendance: 95,
    lastVisit: "Today",
    phone: "+1 (555) 034-5678",
    email: "emily.rodriguez@email.com",
    joinedDate: "Sep 10, 2023",
    assignedPlan: "Endurance · Marathon Prep",
    nextSession: "Tomorrow, 6:30 AM",
    totalVisits: 118,
    thisMonthVisits: 16,
    workoutPlan: {
      name: "Marathon Base Training",
      schedule: "Mon / Tue / Thu / Sat",
      exercises: ["Long Run 10km", "Tempo Run 6km", "Interval Training 8×400m", "Cross Training 45 min", "Recovery Run 5km"],
    },
    mealPlan: {
      name: "Endurance Fueling Plan",
      calories: 2200,
      protein: 140,
      carbs: 280,
      fat: 65,
    },
    notes: ["Elite-level endurance. On track for sub-4 marathon.", "Prefers data-driven feedback."],
    progress: [
      { date: "Mar 1, 2025", weight: 58.1, bodyFat: 18.4, pr: "10km – 48:32", notes: "New 10km PR!" },
      { date: "Feb 15, 2025", weight: 58.4, bodyFat: 18.9, pr: "5km – 23:10", notes: "Excellent pace." },
      { date: "Feb 1, 2025", weight: 58.9, bodyFat: 19.2, pr: "Half Marathon 2:05", notes: "Strong finish." },
    ],
  },
  {
    id: "4",
    name: "David Kim",
    initials: "DK",
    plan: "Basic · 1×/week",
    status: "attention",
    attendance: 64,
    lastVisit: "3 days ago",
    phone: "+1 (555) 045-6789",
    email: "david.kim@email.com",
    joinedDate: "May 20, 2024",
    assignedPlan: "Flexibility · Injury Recovery",
    nextSession: "Saturday, 10:00 AM",
    totalVisits: 22,
    thisMonthVisits: 3,
    workoutPlan: {
      name: "Rehab & Mobility",
      schedule: "Saturday",
      exercises: ["Hip Mobility Routine 20 min", "Foam Rolling 10 min", "Resistance Band Work 3×15", "Yoga Flow 20 min", "Core Stability 3×12"],
    },
    mealPlan: {
      name: "Anti-Inflammatory Diet",
      calories: 2000,
      protein: 140,
      carbs: 200,
      fat: 70,
    },
    notes: ["Lower back injury — avoid heavy loading.", "Progress is steady. Needs encouragement."],
    progress: [
      { date: "Feb 22, 2025", weight: 82.0, bodyFat: 22.5, pr: "—", notes: "Improved hip mobility." },
      { date: "Feb 8, 2025", weight: 82.5, bodyFat: 23.0, pr: "—", notes: "Pain levels reduced." },
    ],
  },
  {
    id: "5",
    name: "Jessica Wang",
    initials: "JW",
    plan: "Premium · 5×/week",
    status: "attention",
    attendance: 91,
    lastVisit: "Today",
    phone: "+1 (555) 056-7890",
    email: "jessica.wang@email.com",
    joinedDate: "Nov 5, 2023",
    assignedPlan: "Strength · Powerlifting",
    nextSession: "Tomorrow, 8:00 AM",
    totalVisits: 85,
    thisMonthVisits: 14,
    workoutPlan: {
      name: "Powerlifting SBD",
      schedule: "Mon / Tue / Thu / Fri / Sat",
      exercises: ["Squat 5×5", "Bench Press 5×5", "Deadlift 3×3", "Accessory Work 3×10", "Mobility & Stretching"],
    },
    mealPlan: {
      name: "Strength Performance Plan",
      calories: 2400,
      protein: 180,
      carbs: 260,
      fat: 75,
    },
    notes: ["Competing in local meet in April.", "Progress logs missing for last 2 weeks — follow up."],
    progress: [
      { date: "Feb 27, 2025", weight: 65.3, bodyFat: 20.1, pr: "Squat 95kg", notes: "Competition prep going well." },
      { date: "Feb 13, 2025", weight: 65.7, bodyFat: 20.5, pr: "Deadlift 110kg", notes: "Strong session." },
    ],
  },
  {
    id: "6",
    name: "Ryan Thompson",
    initials: "RT",
    plan: "Standard · 3×/week",
    status: "active",
    attendance: 88,
    lastVisit: "Yesterday",
    phone: "+1 (555) 067-8901",
    email: "ryan.thompson@email.com",
    joinedDate: "Feb 14, 2024",
    assignedPlan: "General Fitness · 8-week",
    nextSession: "Thursday, 5:30 PM",
    totalVisits: 53,
    thisMonthVisits: 10,
    workoutPlan: {
      name: "Full Body Functional",
      schedule: "Mon / Wed / Fri",
      exercises: ["Kettlebell Swings 4×15", "Pull-ups 3×8", "Push-ups 3×15", "Romanian Deadlift 3×12", "Box Jumps 3×10"],
    },
    mealPlan: {
      name: "Balanced Maintenance Plan",
      calories: 2200,
      protein: 160,
      carbs: 230,
      fat: 70,
    },
    notes: ["Motivated and consistent.", "Interested in adding a 4th session per week."],
    progress: [
      { date: "Mar 1, 2025", weight: 80.1, bodyFat: 15.8, pr: "Pull-up 10 reps", notes: "Best session yet." },
      { date: "Feb 15, 2025", weight: 80.8, bodyFat: 16.5, pr: "KB Swing 32kg", notes: "Great form." },
    ],
  },
  {
    id: "7",
    name: "Priya Patel",
    initials: "PP",
    plan: "Premium · 4×/week",
    status: "active",
    attendance: 97,
    lastVisit: "Today",
    phone: "+1 (555) 078-9012",
    email: "priya.patel@email.com",
    joinedDate: "Aug 1, 2023",
    assignedPlan: "Body Recomposition · 16-week",
    nextSession: "Tomorrow, 7:00 AM",
    totalVisits: 132,
    thisMonthVisits: 17,
    workoutPlan: {
      name: "Recomp Upper/Lower Split",
      schedule: "Mon / Tue / Thu / Fri",
      exercises: ["Incline Bench 4×10", "Seated Row 4×10", "Leg Press 4×12", "RDL 3×12", "Cable Flyes 3×15"],
    },
    mealPlan: {
      name: "Recomp Cycling Plan",
      calories: 1900,
      protein: 155,
      carbs: 180,
      fat: 60,
    },
    notes: ["Model client. Near-perfect compliance.", "Goal: visible abs by summer."],
    progress: [
      { date: "Mar 2, 2025", weight: 60.2, bodyFat: 19.8, pr: "Bench 55kg", notes: "Incredible progress." },
      { date: "Feb 16, 2025", weight: 60.9, bodyFat: 20.5, pr: "Leg Press 120kg", notes: "Consistent form." },
      { date: "Feb 2, 2025", weight: 61.8, bodyFat: 21.3, pr: "Row 50kg", notes: "Strong session." },
    ],
  },
  {
    id: "8",
    name: "Lucas Martin",
    initials: "LM",
    plan: "Basic · 1×/week",
    status: "inactive",
    attendance: 42,
    lastVisit: "2 weeks ago",
    phone: "+1 (555) 089-0123",
    email: "lucas.martin@email.com",
    joinedDate: "Jun 30, 2024",
    assignedPlan: "Beginner Strength · 6-week",
    nextSession: "Not scheduled",
    totalVisits: 12,
    thisMonthVisits: 1,
    workoutPlan: {
      name: "Beginner 3-Day Full Body",
      schedule: "Saturday",
      exercises: ["Goblet Squat 3×10", "Dumbbell Press 3×10", "Seated Row 3×10", "Plank 3×30s", "Walking Lunges 2×12"],
    },
    mealPlan: {
      name: "Basic Nutrition Guide",
      calories: 2000,
      protein: 120,
      carbs: 220,
      fat: 65,
    },
    notes: ["Low motivation. Needs re-engagement call.", "Missing sessions frequently."],
    progress: [
      { date: "Feb 1, 2025", weight: 90.0, bodyFat: 28.0, pr: "—", notes: "Initial assessment." },
    ],
  },
  {
    id: "9",
    name: "Aisha Ibrahim",
    initials: "AI",
    plan: "Standard · 2×/week",
    status: "active",
    attendance: 80,
    lastVisit: "Yesterday",
    phone: "+1 (555) 090-1234",
    email: "aisha.ibrahim@email.com",
    joinedDate: "Apr 12, 2024",
    assignedPlan: "General Fitness · 12-week",
    nextSession: "Wednesday, 6:00 PM",
    totalVisits: 36,
    thisMonthVisits: 7,
    workoutPlan: {
      name: "Cardio & Strength Combo",
      schedule: "Tue / Thu",
      exercises: ["Elliptical 20 min", "Dumbbell Circuit 3×12", "Core Work 3×15", "Resistance Band Legs 3×15", "Cool Down Stretching"],
    },
    mealPlan: {
      name: "Balanced Active Plan",
      calories: 1850,
      protein: 135,
      carbs: 195,
      fat: 58,
    },
    notes: ["Steady progress. Enjoys variety in workouts.", "Has a halal dietary requirement."],
    progress: [
      { date: "Feb 26, 2025", weight: 63.5, bodyFat: 26.2, pr: "Plank 90s", notes: "Core strength improving." },
      { date: "Feb 12, 2025", weight: 64.1, bodyFat: 26.8, pr: "—", notes: "Good energy." },
    ],
  },
  {
    id: "10",
    name: "Omar Hassan",
    initials: "OH",
    plan: "Premium · 3×/week",
    status: "active",
    attendance: 93,
    lastVisit: "Today",
    phone: "+1 (555) 101-2345",
    email: "omar.hassan@email.com",
    joinedDate: "Oct 22, 2023",
    assignedPlan: "Athletic Performance · 20-week",
    nextSession: "Tomorrow, 6:00 AM",
    totalVisits: 95,
    thisMonthVisits: 12,
    workoutPlan: {
      name: "Sport-Specific Conditioning",
      schedule: "Mon / Wed / Fri",
      exercises: ["Sprint Intervals 8×100m", "Agility Ladder 15 min", "Olympic Lifts 4×5", "Plyometrics 3×10", "Weighted Carries 3×40m"],
    },
    mealPlan: {
      name: "Athletic Performance Plan",
      calories: 3000,
      protein: 210,
      carbs: 350,
      fat: 85,
    },
    notes: ["High performer. Targeting sports scholarship.", "Works with external sports coach — coordinate plans."],
    progress: [
      { date: "Mar 1, 2025", weight: 83.5, bodyFat: 12.1, pr: "Clean & Jerk 90kg", notes: "Exceptional form." },
      { date: "Feb 15, 2025", weight: 83.8, bodyFat: 12.4, pr: "100m Sprint 11.8s", notes: "New personal best." },
      { date: "Feb 1, 2025", weight: 84.2, bodyFat: 12.9, pr: "Snatch 75kg", notes: "Technique improving." },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getClient(id: string): ClientDetail | undefined {
  return MOCK_CLIENTS.find((c) => c.id === id);
}

function StatusBadge({ status }: { status: ClientDetail["status"] }) {
  if (status === "active") return <Badge variant="success">Active</Badge>;
  if (status === "attention") return <Badge variant="destructive">Attention Needed</Badge>;
  return <Badge variant="secondary">Inactive</Badge>;
}

function AttendanceBar({ value }: { value: number }) {
  const color =
    value >= 85 ? "bg-emerald-500" : value >= 65 ? "bg-amber-400" : "bg-red-400";
  const text =
    value >= 85 ? "text-emerald-700" : value >= 65 ? "text-amber-700" : "text-red-600";
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
      <span className={cn("text-sm font-semibold", text)}>{value}%</span>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function OverviewTab({ client }: { client: ClientDetail }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Personal Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-900">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
              <Phone className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Phone</p>
              <p className="text-sm font-medium text-slate-900">{client.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
              <Mail className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Email</p>
              <p className="text-sm font-medium text-slate-900">{client.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
              <CalendarDays className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Joined Date</p>
              <p className="text-sm font-medium text-slate-900">{client.joinedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
              <ClipboardEdit className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Assigned Plan</p>
              <p className="text-sm font-medium text-slate-900">{client.assignedPlan}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
              <CalendarDays className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Next Session</p>
              <p className="text-sm font-medium text-slate-900">{client.nextSession}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-900">Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-2xl font-bold text-slate-900">{client.totalVisits}</p>
              <p className="mt-0.5 text-xs text-slate-500">Total Visits</p>
            </div>
            <div className="rounded-xl bg-indigo-50 p-3 text-center">
              <p className="text-2xl font-bold text-indigo-700">{client.thisMonthVisits}</p>
              <p className="mt-0.5 text-xs text-indigo-500">This Month</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-center">
              <p className="text-2xl font-bold text-emerald-700">{client.attendance}%</p>
              <p className="mt-0.5 text-xs text-emerald-500">Attendance</p>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium text-slate-600">Attendance Rate</p>
              <span className="text-xs text-slate-400">Target: 85%</span>
            </div>
            <AttendanceBar value={client.attendance} />
          </div>

          {/* Mini chart placeholder */}
          <div>
            <p className="mb-2 text-xs font-medium text-slate-600">Monthly Trend</p>
            <div className="flex h-16 items-end gap-1.5">
              {[65, 72, 80, 75, 88, client.attendance].map((val, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={cn(
                      "w-full rounded-t-sm",
                      i === 5 ? "bg-indigo-500" : "bg-slate-200"
                    )}
                    style={{ height: `${(val / 100) * 56}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-slate-400">
              <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface ProgressFormState {
  weight: string;
  bodyFat: string;
  pr: string;
  notes: string;
}

function ProgressTab({ client }: { client: ClientDetail }) {
  const [entries, setEntries] = useState<ProgressEntry[]>(client.progress);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ProgressFormState>({ weight: "", bodyFat: "", pr: "", notes: "" });

  function handleSave() {
    if (!form.weight) return;
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    setEntries([
      { date: today, weight: parseFloat(form.weight), bodyFat: parseFloat(form.bodyFat) || 0, pr: form.pr || "—", notes: form.notes },
      ...entries,
    ]);
    setForm({ weight: "", bodyFat: "", pr: "", notes: "" });
    setOpen(false);
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-slate-900">Progress Chart</CardTitle>
            <Button size="sm" onClick={() => setOpen(true)} className="gap-1.5 text-xs">
              <Plus className="h-3.5 w-3.5" />
              Add New Progress Log
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Chart placeholder */}
          <div className="flex h-36 items-end gap-3 rounded-xl bg-slate-50 px-4 pb-4 pt-6">
            {entries.slice(0, 6).reverse().map((entry, i, arr) => {
              const max = Math.max(...arr.map((e) => e.weight));
              const min = Math.min(...arr.map((e) => e.weight));
              const range = max - min || 1;
              const height = 20 + ((max - entry.weight) / range) * 60;
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] font-medium text-slate-500">{entry.weight}kg</span>
                  <div
                    className="w-full rounded-t-md bg-indigo-400 opacity-80 transition-all hover:opacity-100"
                    style={{ height: `${100 - height + 20}px` }}
                  />
                  <span className="text-[9px] text-slate-400 truncate w-full text-center">{entry.date.split(",")[0]}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-center text-xs text-slate-400">Weight over time (kg)</p>
        </CardContent>
      </Card>

      {/* Progress History Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-900">Progress History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Date</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead>Body Fat %</TableHead>
                <TableHead>PR</TableHead>
                <TableHead className="pr-6">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-6 font-medium text-slate-900">{entry.date}</TableCell>
                  <TableCell>{entry.weight}</TableCell>
                  <TableCell>{entry.bodyFat > 0 ? `${entry.bodyFat}%` : "—"}</TableCell>
                  <TableCell>
                    {entry.pr !== "—" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                        <TrendingUp className="h-3 w-3" />
                        {entry.pr}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </TableCell>
                  <TableCell className="pr-6 text-slate-500 text-sm">{entry.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Progress Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Progress Log</DialogTitle>
            <DialogDescription>
              Record {client.name}&apos;s latest measurements and achievements.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g. 68.5"
                  value={form.weight}
                  onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bodyFat">Body Fat %</Label>
                <Input
                  id="bodyFat"
                  type="number"
                  placeholder="e.g. 22.5"
                  value={form.bodyFat}
                  onChange={(e) => setForm((f) => ({ ...f, bodyFat: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pr">Personal Record (PR)</Label>
              <Input
                id="pr"
                placeholder="e.g. Squat 80kg"
                value={form.pr}
                onChange={(e) => setForm((f) => ({ ...f, pr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pnotes">Notes</Label>
              <Textarea
                id="pnotes"
                placeholder="Session observations…"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={!form.weight}>
              Save Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function WorkoutTab({ client }: { client: ClientDetail }) {
  const [assignOpen, setAssignOpen] = useState(false);
  const [planName, setPlanName] = useState("");

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold text-slate-900">Current Workout Plan</CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">Schedule: {client.workoutPlan.schedule}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <ClipboardEdit className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button size="sm" onClick={() => setAssignOpen(true)} className="gap-1.5 text-xs">
                <Plus className="h-3.5 w-3.5" />
                Assign New Plan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
              {client.workoutPlan.name}
            </span>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Exercises</p>
            <ul className="space-y-2">
              {client.workoutPlan.exercises.map((ex, i) => (
                <li key={i} className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-2.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                    {i + 1}
                  </div>
                  <span className="text-sm text-slate-700">{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign New Workout Plan</DialogTitle>
            <DialogDescription>Select or create a plan for {client.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="wplan">Plan Name</Label>
              <Input
                id="wplan"
                placeholder="e.g. Strength Phase 2"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Quick Select</Label>
              <div className="flex flex-wrap gap-2">
                {["Beginner Full Body", "PPL Split", "Upper/Lower", "5/3/1 Program"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlanName(p)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      planName === p
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => setAssignOpen(false)} disabled={!planName}>
              Assign Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MealTab({ client }: { client: ClientDetail }) {
  const macros = [
    { label: "Protein", value: client.mealPlan.protein, unit: "g", color: "bg-indigo-500", total: 250 },
    { label: "Carbs", value: client.mealPlan.carbs, unit: "g", color: "bg-amber-400", total: 400 },
    { label: "Fat", value: client.mealPlan.fat, unit: "g", color: "bg-emerald-500", total: 100 },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-slate-900">Current Meal Plan</CardTitle>
            <p className="mt-0.5 text-xs text-slate-500">{client.mealPlan.name}</p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ClipboardEdit className="h-3.5 w-3.5" />
            Edit Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Calorie target */}
        <div className="flex items-center justify-center rounded-2xl bg-indigo-50 py-5">
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-700">{client.mealPlan.calories}</p>
            <p className="mt-1 text-sm text-indigo-500">Daily Calories (kcal)</p>
          </div>
        </div>

        {/* Macros */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Daily Macros</p>
          <div className="grid grid-cols-3 gap-3">
            {macros.map((m) => (
              <div key={m.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                <p className="text-xl font-bold text-slate-900">{m.value}{m.unit}</p>
                <p className="mt-0.5 text-xs text-slate-500">{m.label}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={cn("h-full rounded-full", m.color)}
                    style={{ width: `${Math.min((m.value / m.total) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NotesTab({ client }: { client: ClientDetail }) {
  const [notes, setNotes] = useState<string[]>(client.notes);
  const [newNote, setNewNote] = useState("");

  function handleSave() {
    if (!newNote.trim()) return;
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    setNotes([`[${today}] ${newNote.trim()}`, ...notes]);
    setNewNote("");
  }

  return (
    <div className="space-y-4">
      {/* Add note */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-900">Add Trainer Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Write a note about this client…"
            rows={3}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={!newNote.trim()} className="gap-1.5 text-xs">
              <Plus className="h-3.5 w-3.5" />
              Save Note
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-slate-900">
            Trainer Notes
            <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
              {notes.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {notes.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-400">No notes yet.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {notes.map((note, i) => (
                <li key={i} className="flex items-start gap-3 px-6 py-3.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                  <p className="text-sm text-slate-700">{note}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const client = getClient(id);

  if (!client) {
    notFound();
  }

  const [logOpen, setLogOpen] = useState(false);
  const [logForm, setLogForm] = useState<ProgressFormState>({ weight: "", bodyFat: "", pr: "", notes: "" });

  function handleQuickLog() {
    setLogOpen(false);
    setLogForm({ weight: "", bodyFat: "", pr: "", notes: "" });
  }

  return (
    <div className="space-y-6">
      {/* ── Back nav ── */}
      <div>
        <Link
          href="/trainer/clients"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Clients
        </Link>
      </div>

      {/* ── Header Card ── */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Left: Identity */}
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 shrink-0 ring-2 ring-indigo-100 ring-offset-2">
                <AvatarFallback className="text-lg font-bold text-indigo-700 bg-indigo-50">
                  {client.initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <h1 className="text-xl font-bold text-slate-900">{client.name}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {client.plan}
                  </span>
                  <StatusBadge status={client.status} />
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-0.5 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Last visit: {client.lastVisit}
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5" />
                    Attendance: <span className="font-semibold text-slate-700">{client.attendance}%</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={() => setLogOpen(true)} className="gap-1.5 text-xs">
                <ClipboardEdit className="h-3.5 w-3.5" />
                Log Progress
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Dumbbell className="h-3.5 w-3.5" />
                Assign Workout
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Salad className="h-3.5 w-3.5" />
                Assign Meal Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Tab Navigation ── */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="workout">Workout Plan</TabsTrigger>
          <TabsTrigger value="meal">Meal Plan</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab client={client} />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTab client={client} />
        </TabsContent>

        <TabsContent value="workout">
          <WorkoutTab client={client} />
        </TabsContent>

        <TabsContent value="meal">
          <MealTab client={client} />
        </TabsContent>

        <TabsContent value="notes">
          <NotesTab client={client} />
        </TabsContent>
      </Tabs>

      {/* ── Quick Log Progress Dialog (header button) ── */}
      <Dialog open={logOpen} onOpenChange={setLogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Progress – {client.name}</DialogTitle>
            <DialogDescription>Record the latest measurements and performance data.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="ql-weight">Weight (kg)</Label>
                <Input
                  id="ql-weight"
                  type="number"
                  placeholder="e.g. 68.5"
                  value={logForm.weight}
                  onChange={(e) => setLogForm((f) => ({ ...f, weight: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ql-bf">Body Fat %</Label>
                <Input
                  id="ql-bf"
                  type="number"
                  placeholder="e.g. 22.5"
                  value={logForm.bodyFat}
                  onChange={(e) => setLogForm((f) => ({ ...f, bodyFat: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ql-pr">Personal Record (PR)</Label>
              <Input
                id="ql-pr"
                placeholder="e.g. Squat 80kg"
                value={logForm.pr}
                onChange={(e) => setLogForm((f) => ({ ...f, pr: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ql-notes">Notes</Label>
              <Textarea
                id="ql-notes"
                placeholder="Session observations…"
                rows={3}
                value={logForm.notes}
                onChange={(e) => setLogForm((f) => ({ ...f, notes: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleQuickLog} disabled={!logForm.weight}>
              Save Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
