// ── Types ─────────────────────────────────────────────────────────────────────

export type MemberPaymentStatus = "active" | "due" | "expired" | "frozen";
export type TrainerStatus = "available" | "busy" | "full";
export type PaymentMode = "Card" | "Cash" | "Auto-Pay" | "Bank Transfer";
export type PaymentStatus = "Paid" | "Pending" | "Failed";
export type ClassStatus = "Scheduled" | "In Progress" | "Full";

export interface OwnerMember {
  id: string;
  name: string;
  initials: string;
  plan: string;
  trainer: string;
  expiryDate: string;
  paymentStatus: MemberPaymentStatus;
  lastVisit: string;
  phone: string;
  email: string;
  gender: "Male" | "Female";
  dob: string;
  joinDate: string;
  autoPayEnabled: boolean;
  balance: number;
  attendanceRate: number;
  notes: string;
}

export interface TrainerWorkload {
  id: string;
  name: string;
  initials: string;
  activeClients: number;
  todayClasses: number;
  utilization: number;
  status: TrainerStatus;
}

export interface OwnerClass {
  id: string;
  name: string;
  trainer: string;
  time: string;
  capacity: number;
  booked: number;
  status: ClassStatus;
}

export interface MemberPayment {
  id: string;
  memberId: string;
  date: string;
  amount: number;
  mode: PaymentMode;
  status: PaymentStatus;
  invoice: string;
}

export interface AttendanceEntry {
  date: string;
  className: string;
  trainer: string;
  attended: boolean;
}

export interface ProgressEntry {
  date: string;
  weight: string;
  bodyFat: string;
  note: string;
}

// ── Members ───────────────────────────────────────────────────────────────────

export const MOCK_MEMBERS: OwnerMember[] = [
  {
    id: "m-1",
    name: "Marcus Johnson",
    initials: "MJ",
    plan: "Premium",
    trainer: "Alex Thompson",
    expiryDate: "Apr 15, 2026",
    paymentStatus: "active",
    lastVisit: "Today",
    phone: "+1 (555) 234-5678",
    email: "marcus.j@email.com",
    gender: "Male",
    dob: "Jun 12, 1990",
    joinDate: "Jan 10, 2025",
    autoPayEnabled: true,
    balance: 0,
    attendanceRate: 92,
    notes: "Focused on weight loss. Prefers morning sessions.",
  },
  {
    id: "m-2",
    name: "Priya Patel",
    initials: "PP",
    plan: "Elite",
    trainer: "Sarah Kim",
    expiryDate: "Mar 28, 2026",
    paymentStatus: "due",
    lastVisit: "2 days ago",
    phone: "+1 (555) 345-6789",
    email: "priya.patel@email.com",
    gender: "Female",
    dob: "Feb 22, 1995",
    joinDate: "Mar 28, 2025",
    autoPayEnabled: false,
    balance: 120,
    attendanceRate: 78,
    notes: "Competitive athlete. Training for half-marathon.",
  },
  {
    id: "m-3",
    name: "James Wilson",
    initials: "JW",
    plan: "Basic",
    trainer: "Alex Thompson",
    expiryDate: "Feb 28, 2026",
    paymentStatus: "expired",
    lastVisit: "1 week ago",
    phone: "+1 (555) 456-7890",
    email: "james.wilson@email.com",
    gender: "Male",
    dob: "Nov 8, 1988",
    joinDate: "Feb 28, 2024",
    autoPayEnabled: false,
    balance: 240,
    attendanceRate: 45,
    notes: "Membership expired. Follow up needed.",
  },
  {
    id: "m-4",
    name: "Emma Rodriguez",
    initials: "ER",
    plan: "Premium",
    trainer: "Mike Chen",
    expiryDate: "May 20, 2026",
    paymentStatus: "active",
    lastVisit: "Today",
    phone: "+1 (555) 567-8901",
    email: "emma.rodriguez@email.com",
    gender: "Female",
    dob: "Jul 30, 1997",
    joinDate: "May 20, 2025",
    autoPayEnabled: true,
    balance: 0,
    attendanceRate: 88,
    notes: "Very consistent. Strength training focus.",
  },
  {
    id: "m-5",
    name: "David Kim",
    initials: "DK",
    plan: "Elite",
    trainer: "Sarah Kim",
    expiryDate: "Jun 5, 2026",
    paymentStatus: "frozen",
    lastVisit: "3 weeks ago",
    phone: "+1 (555) 678-9012",
    email: "david.kim@email.com",
    gender: "Male",
    dob: "Apr 15, 1992",
    joinDate: "Jun 5, 2025",
    autoPayEnabled: false,
    balance: 0,
    attendanceRate: 30,
    notes: "Membership frozen per member request (travel).",
  },
  {
    id: "m-6",
    name: "Sarah Chen",
    initials: "SC",
    plan: "Basic",
    trainer: "Alex Thompson",
    expiryDate: "Apr 1, 2026",
    paymentStatus: "active",
    lastVisit: "Yesterday",
    phone: "+1 (555) 789-0123",
    email: "sarah.chen@email.com",
    gender: "Female",
    dob: "Sep 17, 1993",
    joinDate: "Apr 1, 2025",
    autoPayEnabled: true,
    balance: 0,
    attendanceRate: 95,
    notes: "Top-performing member. Yoga + cardio.",
  },
  {
    id: "m-7",
    name: "Omar Hassan",
    initials: "OH",
    plan: "Premium",
    trainer: "Mike Chen",
    expiryDate: "Mar 15, 2026",
    paymentStatus: "due",
    lastVisit: "4 days ago",
    phone: "+1 (555) 890-1234",
    email: "omar.hassan@email.com",
    gender: "Male",
    dob: "Dec 3, 1985",
    joinDate: "Mar 15, 2025",
    autoPayEnabled: false,
    balance: 80,
    attendanceRate: 67,
    notes: "Renewal due. Interested in upgrading to Elite.",
  },
  {
    id: "m-8",
    name: "Lisa Park",
    initials: "LP",
    plan: "Elite",
    trainer: "Sarah Kim",
    expiryDate: "Jul 10, 2026",
    paymentStatus: "active",
    lastVisit: "Today",
    phone: "+1 (555) 901-2345",
    email: "lisa.park@email.com",
    gender: "Female",
    dob: "Mar 25, 1996",
    joinDate: "Jul 10, 2025",
    autoPayEnabled: true,
    balance: 0,
    attendanceRate: 97,
    notes: "Elite member. Group classes + PT sessions.",
  },
];

// ── Trainer Workloads ─────────────────────────────────────────────────────────

export const MOCK_TRAINER_WORKLOADS: TrainerWorkload[] = [
  {
    id: "t-1",
    name: "Alex Thompson",
    initials: "AT",
    activeClients: 18,
    todayClasses: 3,
    utilization: 90,
    status: "busy",
  },
  {
    id: "t-2",
    name: "Sarah Kim",
    initials: "SK",
    activeClients: 14,
    todayClasses: 2,
    utilization: 70,
    status: "available",
  },
  {
    id: "t-3",
    name: "Mike Chen",
    initials: "MC",
    activeClients: 20,
    todayClasses: 4,
    utilization: 100,
    status: "full",
  },
  {
    id: "t-4",
    name: "Lisa Nguyen",
    initials: "LN",
    activeClients: 8,
    todayClasses: 1,
    utilization: 40,
    status: "available",
  },
  {
    id: "t-5",
    name: "Jake Rivera",
    initials: "JR",
    activeClients: 16,
    todayClasses: 3,
    utilization: 80,
    status: "busy",
  },
];

// ── Classes ───────────────────────────────────────────────────────────────────

export const MOCK_OWNER_CLASSES: OwnerClass[] = [
  {
    id: "oc-1",
    name: "HIIT Cardio Blast",
    trainer: "Alex Thompson",
    time: "7:00 AM",
    capacity: 20,
    booked: 20,
    status: "Full",
  },
  {
    id: "oc-2",
    name: "Strength & Conditioning",
    trainer: "Mike Chen",
    time: "9:00 AM",
    capacity: 15,
    booked: 11,
    status: "Scheduled",
  },
  {
    id: "oc-3",
    name: "Morning Yoga Flow",
    trainer: "Lisa Nguyen",
    time: "10:30 AM",
    capacity: 12,
    booked: 12,
    status: "In Progress",
  },
  {
    id: "oc-4",
    name: "Spin Cycling",
    trainer: "Sarah Kim",
    time: "12:00 PM",
    capacity: 18,
    booked: 14,
    status: "Scheduled",
  },
  {
    id: "oc-5",
    name: "BoxFit Training",
    trainer: "Jake Rivera",
    time: "6:00 PM",
    capacity: 16,
    booked: 9,
    status: "Scheduled",
  },
];

// ── Payments ─────────────────────────────────────────────────────────────────

export const MOCK_PAYMENTS: MemberPayment[] = [
  {
    id: "p-1",
    memberId: "m-1",
    date: "Mar 1, 2026",
    amount: 89.99,
    mode: "Auto-Pay",
    status: "Paid",
    invoice: "INV-2026-031",
  },
  {
    id: "p-2",
    memberId: "m-1",
    date: "Feb 1, 2026",
    amount: 89.99,
    mode: "Auto-Pay",
    status: "Paid",
    invoice: "INV-2026-021",
  },
  {
    id: "p-3",
    memberId: "m-1",
    date: "Jan 1, 2026",
    amount: 89.99,
    mode: "Auto-Pay",
    status: "Paid",
    invoice: "INV-2026-011",
  },
  {
    id: "p-4",
    memberId: "m-2",
    date: "Feb 28, 2026",
    amount: 149.99,
    mode: "Card",
    status: "Pending",
    invoice: "INV-2026-028",
  },
  {
    id: "p-5",
    memberId: "m-2",
    date: "Jan 28, 2026",
    amount: 149.99,
    mode: "Card",
    status: "Paid",
    invoice: "INV-2026-018",
  },
  {
    id: "p-6",
    memberId: "m-3",
    date: "Jan 15, 2026",
    amount: 49.99,
    mode: "Cash",
    status: "Paid",
    invoice: "INV-2026-015",
  },
  {
    id: "p-7",
    memberId: "m-3",
    date: "Dec 15, 2025",
    amount: 49.99,
    mode: "Cash",
    status: "Paid",
    invoice: "INV-2025-121",
  },
  {
    id: "p-8",
    memberId: "m-4",
    date: "Mar 1, 2026",
    amount: 89.99,
    mode: "Auto-Pay",
    status: "Paid",
    invoice: "INV-2026-032",
  },
  {
    id: "p-9",
    memberId: "m-4",
    date: "Feb 1, 2026",
    amount: 89.99,
    mode: "Auto-Pay",
    status: "Paid",
    invoice: "INV-2026-022",
  },
];

// ── Attendance ────────────────────────────────────────────────────────────────

export const MOCK_ATTENDANCE: Record<string, AttendanceEntry[]> = {
  "m-1": [
    { date: "Mar 3, 2026", className: "HIIT Cardio Blast", trainer: "Alex Thompson", attended: true },
    { date: "Mar 1, 2026", className: "Strength & Conditioning", trainer: "Alex Thompson", attended: true },
    { date: "Feb 27, 2026", className: "BoxFit Training", trainer: "Jake Rivera", attended: true },
    { date: "Feb 25, 2026", className: "Morning Yoga Flow", trainer: "Lisa Nguyen", attended: false },
    { date: "Feb 22, 2026", className: "HIIT Cardio Blast", trainer: "Alex Thompson", attended: true },
  ],
  "m-2": [
    { date: "Mar 1, 2026", className: "Spin Cycling", trainer: "Sarah Kim", attended: true },
    { date: "Feb 26, 2026", className: "Morning Yoga Flow", trainer: "Lisa Nguyen", attended: false },
    { date: "Feb 22, 2026", className: "Spin Cycling", trainer: "Sarah Kim", attended: true },
  ],
};

// ── Progress ──────────────────────────────────────────────────────────────────

export const MOCK_PROGRESS: Record<string, ProgressEntry[]> = {
  "m-1": [
    { date: "Mar 1, 2026", weight: "185 lbs", bodyFat: "18.2%", note: "Good improvement in endurance." },
    { date: "Feb 1, 2026", weight: "189 lbs", bodyFat: "19.1%", note: "Started strength program." },
    { date: "Jan 1, 2026", weight: "195 lbs", bodyFat: "20.5%", note: "Initial assessment." },
  ],
  "m-2": [
    { date: "Feb 28, 2026", weight: "132 lbs", bodyFat: "22.0%", note: "Running pace improved." },
    { date: "Jan 28, 2026", weight: "135 lbs", bodyFat: "23.5%", note: "Starting half-marathon prep." },
  ],
};

// ── Revenue Chart ─────────────────────────────────────────────────────────────

export const REVENUE_MONTHS = [
  { month: "Sep", revenue: 8200 },
  { month: "Oct", revenue: 9100 },
  { month: "Nov", revenue: 8750 },
  { month: "Dec", revenue: 10200 },
  { month: "Jan", revenue: 11400 },
  { month: "Feb", revenue: 10800 },
  { month: "Mar", revenue: 12480 },
];

export const TRAINERS_LIST = [
  "Alex Thompson",
  "Sarah Kim",
  "Mike Chen",
  "Lisa Nguyen",
  "Jake Rivera",
];
