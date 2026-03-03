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

// ── Full Trainer Types ─────────────────────────────────────────────────────────

export type TrainerAvailabilityStatus = "available" | "moderate" | "overloaded" | "on-leave";

export interface TrainerPermissions {
  canAssignWorkout: boolean;
  canAssignMealPlan: boolean;
  canMarkAttendance: boolean;
  canViewPayments: boolean;
  canEditClasses: boolean;
}

export interface TrainerClientEntry {
  id: string;
  name: string;
  initials: string;
  plan: string;
  status: MemberPaymentStatus;
  expiryDate: string;
  attendanceRate: number;
}

export interface TrainerClassEntry {
  id: string;
  name: string;
  time: string;
  date: string;
  capacity: number;
  booked: number;
  status: "upcoming" | "in-progress" | "completed" | "cancelled";
}

export interface FullTrainer {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  gender: "Male" | "Female" | "Other";
  specialization: string;
  experience: number;
  employmentType: "Full-time" | "Part-time" | "Contract";
  certification: string;
  bio: string;
  status: TrainerAvailabilityStatus;
  activeClients: number;
  todaysClasses: number;
  utilizationPct: number;
  attendanceRate: number;
  weeklyClassCount: number;
  joinDate: string;
  permissions: TrainerPermissions;
  clients: TrainerClientEntry[];
  classes: TrainerClassEntry[];
}

export const MOCK_TRAINERS: FullTrainer[] = [
  {
    id: "t-1",
    name: "Alex Thompson",
    initials: "AT",
    phone: "+1 (555) 123-4567",
    email: "alex@fitpro.com",
    gender: "Male",
    specialization: "HIIT & Strength",
    experience: 7,
    employmentType: "Full-time",
    certification: "NASM-CPT, CSCS",
    bio: "Certified personal trainer with 7 years of experience specializing in high-intensity interval training and strength development. Known for high-energy sessions and measurable client results.",
    status: "available",
    activeClients: 18,
    todaysClasses: 3,
    utilizationPct: 90,
    attendanceRate: 94,
    weeklyClassCount: 15,
    joinDate: "Jan 15, 2022",
    permissions: {
      canAssignWorkout: true,
      canAssignMealPlan: true,
      canMarkAttendance: true,
      canViewPayments: false,
      canEditClasses: true,
    },
    clients: [
      { id: "m-1", name: "Marcus Johnson", initials: "MJ", plan: "Premium", status: "active", expiryDate: "Apr 15, 2026", attendanceRate: 92 },
      { id: "m-3", name: "James Wilson", initials: "JW", plan: "Basic", status: "expired", expiryDate: "Feb 28, 2026", attendanceRate: 45 },
      { id: "m-6", name: "Sarah Chen", initials: "SC", plan: "Basic", status: "active", expiryDate: "Apr 1, 2026", attendanceRate: 95 },
    ],
    classes: [
      { id: "gc-1", name: "HIIT Cardio Blast", time: "7:00 AM", date: "Mon, Mar 3", capacity: 20, booked: 20, status: "in-progress" },
      { id: "gc-7", name: "Evening HIIT", time: "6:00 PM", date: "Tue, Mar 4", capacity: 20, booked: 16, status: "upcoming" },
    ],
  },
  {
    id: "t-2",
    name: "Sarah Kim",
    initials: "SK",
    phone: "+1 (555) 234-5678",
    email: "sarah@fitpro.com",
    gender: "Female",
    specialization: "Yoga & Pilates",
    experience: 5,
    employmentType: "Full-time",
    certification: "RYT-500, PMA-CPT",
    bio: "Sarah brings a holistic approach to fitness, blending yoga philosophy with pilates precision. She specializes in flexibility, core strength, and mindful movement for all fitness levels.",
    status: "moderate",
    activeClients: 14,
    todaysClasses: 2,
    utilizationPct: 70,
    attendanceRate: 91,
    weeklyClassCount: 10,
    joinDate: "Mar 8, 2022",
    permissions: {
      canAssignWorkout: true,
      canAssignMealPlan: false,
      canMarkAttendance: true,
      canViewPayments: false,
      canEditClasses: true,
    },
    clients: [
      { id: "m-2", name: "Priya Patel", initials: "PP", plan: "Elite", status: "due", expiryDate: "Mar 28, 2026", attendanceRate: 78 },
      { id: "m-5", name: "David Kim", initials: "DK", plan: "Elite", status: "frozen", expiryDate: "Jun 5, 2026", attendanceRate: 30 },
      { id: "m-8", name: "Lisa Park", initials: "LP", plan: "Elite", status: "active", expiryDate: "Jul 10, 2026", attendanceRate: 97 },
    ],
    classes: [
      { id: "gc-4", name: "Spin Cycling", time: "12:00 PM", date: "Mon, Mar 3", capacity: 18, booked: 14, status: "upcoming" },
      { id: "gc-6", name: "Pilates Core", time: "8:00 AM", date: "Tue, Mar 4", capacity: 12, booked: 11, status: "upcoming" },
    ],
  },
  {
    id: "t-3",
    name: "Mike Chen",
    initials: "MC",
    phone: "+1 (555) 345-6789",
    email: "mike@fitpro.com",
    gender: "Male",
    specialization: "Strength & Powerlifting",
    experience: 10,
    employmentType: "Full-time",
    certification: "NSCA-CSCS, IPF Coach",
    bio: "Former competitive powerlifter turned coach with a decade of experience. Mike excels in programming for maximal strength development and athletic performance at all levels.",
    status: "overloaded",
    activeClients: 20,
    todaysClasses: 4,
    utilizationPct: 100,
    attendanceRate: 89,
    weeklyClassCount: 18,
    joinDate: "Sep 1, 2020",
    permissions: {
      canAssignWorkout: true,
      canAssignMealPlan: true,
      canMarkAttendance: true,
      canViewPayments: true,
      canEditClasses: true,
    },
    clients: [
      { id: "m-4", name: "Emma Rodriguez", initials: "ER", plan: "Premium", status: "active", expiryDate: "May 20, 2026", attendanceRate: 88 },
      { id: "m-7", name: "Omar Hassan", initials: "OH", plan: "Premium", status: "due", expiryDate: "Mar 15, 2026", attendanceRate: 67 },
    ],
    classes: [
      { id: "gc-2", name: "Strength & Conditioning", time: "9:00 AM", date: "Mon, Mar 3", capacity: 15, booked: 11, status: "upcoming" },
    ],
  },
  {
    id: "t-4",
    name: "Lisa Nguyen",
    initials: "LN",
    phone: "+1 (555) 456-7890",
    email: "lisa@fitpro.com",
    gender: "Female",
    specialization: "Yoga & Flexibility",
    experience: 4,
    employmentType: "Part-time",
    certification: "RYT-200, ACE-GFI",
    bio: "Lisa creates welcoming, mindful fitness experiences for beginners and experienced practitioners alike. She specializes in flexibility training and injury prevention.",
    status: "available",
    activeClients: 8,
    todaysClasses: 1,
    utilizationPct: 40,
    attendanceRate: 96,
    weeklyClassCount: 6,
    joinDate: "Jun 15, 2023",
    permissions: {
      canAssignWorkout: false,
      canAssignMealPlan: false,
      canMarkAttendance: true,
      canViewPayments: false,
      canEditClasses: false,
    },
    clients: [],
    classes: [
      { id: "gc-3", name: "Morning Yoga Flow", time: "10:30 AM", date: "Mon, Mar 3", capacity: 12, booked: 12, status: "in-progress" },
      { id: "gc-8", name: "Sunday Recovery Flow", time: "10:00 AM", date: "Sun, Mar 2", capacity: 15, booked: 10, status: "completed" },
    ],
  },
  {
    id: "t-5",
    name: "Jake Rivera",
    initials: "JR",
    phone: "+1 (555) 567-8901",
    email: "jake@fitpro.com",
    gender: "Male",
    specialization: "Boxing & Cardio",
    experience: 6,
    employmentType: "Contract",
    certification: "USA Boxing Coach, ACE-CPT",
    bio: "Former amateur boxer turned fitness trainer. Jake brings high-energy, results-driven workouts combining combat sports training with cardiovascular conditioning.",
    status: "on-leave",
    activeClients: 16,
    todaysClasses: 0,
    utilizationPct: 80,
    attendanceRate: 87,
    weeklyClassCount: 12,
    joinDate: "Nov 20, 2021",
    permissions: {
      canAssignWorkout: true,
      canAssignMealPlan: false,
      canMarkAttendance: true,
      canViewPayments: false,
      canEditClasses: false,
    },
    clients: [],
    classes: [
      { id: "gc-5", name: "BoxFit Training", time: "6:00 PM", date: "Mon, Mar 3", capacity: 16, booked: 9, status: "upcoming" },
    ],
  },
];

// ── Full Class Types ───────────────────────────────────────────────────────────

export type GymClassStatus = "upcoming" | "in-progress" | "completed" | "cancelled";

export interface ClassRosterMember {
  id: string;
  name: string;
  initials: string;
  plan: string;
  status: "booked" | "attended" | "absent" | "waitlist";
}

export interface GymClass {
  id: string;
  name: string;
  description: string;
  location: string;
  trainer: string;
  trainerId: string;
  date: string;
  time: string;
  duration: number;
  capacity: number;
  booked: number;
  waitlist: number;
  status: GymClassStatus;
  isRecurring: boolean;
  bookingCutoff: number;
  enableWaitlist: boolean;
  roster: ClassRosterMember[];
  notes: string;
}

export const MOCK_GYM_CLASSES: GymClass[] = [
  {
    id: "gc-1",
    name: "HIIT Cardio Blast",
    description: "High-intensity interval training designed to maximize calorie burn and improve cardiovascular endurance. No equipment needed.",
    location: "Studio A",
    trainer: "Alex Thompson",
    trainerId: "t-1",
    date: "Mon, Mar 3",
    time: "7:00 AM",
    duration: 45,
    capacity: 20,
    booked: 20,
    waitlist: 3,
    status: "in-progress",
    isRecurring: true,
    bookingCutoff: 2,
    enableWaitlist: true,
    roster: [
      { id: "m-1", name: "Marcus Johnson", initials: "MJ", plan: "Premium", status: "attended" },
      { id: "m-4", name: "Emma Rodriguez", initials: "ER", plan: "Premium", status: "attended" },
      { id: "m-6", name: "Sarah Chen", initials: "SC", plan: "Basic", status: "booked" },
      { id: "m-8", name: "Lisa Park", initials: "LP", plan: "Elite", status: "attended" },
    ],
    notes: "High energy session. Ensure all participants have water bottles.",
  },
  {
    id: "gc-2",
    name: "Strength & Conditioning",
    description: "Progressive resistance training targeting all major muscle groups for total body strength development.",
    location: "Weight Room",
    trainer: "Mike Chen",
    trainerId: "t-3",
    date: "Mon, Mar 3",
    time: "9:00 AM",
    duration: 60,
    capacity: 15,
    booked: 11,
    waitlist: 0,
    status: "upcoming",
    isRecurring: true,
    bookingCutoff: 4,
    enableWaitlist: false,
    roster: [
      { id: "m-4", name: "Emma Rodriguez", initials: "ER", plan: "Premium", status: "booked" },
      { id: "m-7", name: "Omar Hassan", initials: "OH", plan: "Premium", status: "booked" },
      { id: "m-3", name: "James Wilson", initials: "JW", plan: "Basic", status: "booked" },
    ],
    notes: "Focus on compound movements. Review form for deadlifts.",
  },
  {
    id: "gc-3",
    name: "Morning Yoga Flow",
    description: "A gentle vinyasa flow to energize the body and calm the mind. Suitable for all experience levels.",
    location: "Yoga Studio",
    trainer: "Lisa Nguyen",
    trainerId: "t-4",
    date: "Mon, Mar 3",
    time: "10:30 AM",
    duration: 60,
    capacity: 12,
    booked: 12,
    waitlist: 2,
    status: "in-progress",
    isRecurring: true,
    bookingCutoff: 1,
    enableWaitlist: true,
    roster: [
      { id: "m-2", name: "Priya Patel", initials: "PP", plan: "Elite", status: "attended" },
      { id: "m-5", name: "David Kim", initials: "DK", plan: "Elite", status: "absent" },
      { id: "m-8", name: "Lisa Park", initials: "LP", plan: "Elite", status: "attended" },
      { id: "m-6", name: "Sarah Chen", initials: "SC", plan: "Basic", status: "attended" },
    ],
    notes: "Blocks and straps available. Encourage modifications for beginners.",
  },
  {
    id: "gc-4",
    name: "Spin Cycling",
    description: "Indoor cycling with energizing music and motivating coaching. Adjustable for all fitness levels.",
    location: "Cycling Studio",
    trainer: "Sarah Kim",
    trainerId: "t-2",
    date: "Mon, Mar 3",
    time: "12:00 PM",
    duration: 45,
    capacity: 18,
    booked: 14,
    waitlist: 0,
    status: "upcoming",
    isRecurring: true,
    bookingCutoff: 2,
    enableWaitlist: false,
    roster: [
      { id: "m-1", name: "Marcus Johnson", initials: "MJ", plan: "Premium", status: "booked" },
      { id: "m-8", name: "Lisa Park", initials: "LP", plan: "Elite", status: "booked" },
    ],
    notes: "",
  },
  {
    id: "gc-5",
    name: "BoxFit Training",
    description: "Boxing-inspired cardio and conditioning workout. No experience needed — just bring energy and a positive attitude.",
    location: "Studio B",
    trainer: "Jake Rivera",
    trainerId: "t-5",
    date: "Mon, Mar 3",
    time: "6:00 PM",
    duration: 50,
    capacity: 16,
    booked: 9,
    waitlist: 0,
    status: "upcoming",
    isRecurring: false,
    bookingCutoff: 3,
    enableWaitlist: false,
    roster: [
      { id: "m-7", name: "Omar Hassan", initials: "OH", plan: "Premium", status: "booked" },
    ],
    notes: "Sub trainer arranged — Jake is on leave this week.",
  },
  {
    id: "gc-6",
    name: "Pilates Core",
    description: "Low-impact, high-reward core strengthening using classic Pilates principles. Great for posture and stability.",
    location: "Yoga Studio",
    trainer: "Sarah Kim",
    trainerId: "t-2",
    date: "Tue, Mar 4",
    time: "8:00 AM",
    duration: 55,
    capacity: 12,
    booked: 11,
    waitlist: 1,
    status: "upcoming",
    isRecurring: true,
    bookingCutoff: 2,
    enableWaitlist: true,
    roster: [
      { id: "m-2", name: "Priya Patel", initials: "PP", plan: "Elite", status: "booked" },
      { id: "m-8", name: "Lisa Park", initials: "LP", plan: "Elite", status: "booked" },
    ],
    notes: "",
  },
  {
    id: "gc-7",
    name: "Evening HIIT",
    description: "Evening energy burn with full-body high-intensity intervals. Perfect for those who prefer afternoon workouts.",
    location: "Studio A",
    trainer: "Alex Thompson",
    trainerId: "t-1",
    date: "Tue, Mar 4",
    time: "6:00 PM",
    duration: 40,
    capacity: 20,
    booked: 16,
    waitlist: 0,
    status: "upcoming",
    isRecurring: true,
    bookingCutoff: 2,
    enableWaitlist: false,
    roster: [
      { id: "m-1", name: "Marcus Johnson", initials: "MJ", plan: "Premium", status: "booked" },
      { id: "m-4", name: "Emma Rodriguez", initials: "ER", plan: "Premium", status: "booked" },
    ],
    notes: "",
  },
  {
    id: "gc-8",
    name: "Sunday Recovery Flow",
    description: "Gentle yoga and mobility work to restore and prepare the body for the week ahead. All levels welcome.",
    location: "Yoga Studio",
    trainer: "Lisa Nguyen",
    trainerId: "t-4",
    date: "Sun, Mar 2",
    time: "10:00 AM",
    duration: 60,
    capacity: 15,
    booked: 10,
    waitlist: 0,
    status: "completed",
    isRecurring: true,
    bookingCutoff: 1,
    enableWaitlist: false,
    roster: [
      { id: "m-2", name: "Priya Patel", initials: "PP", plan: "Elite", status: "attended" },
      { id: "m-5", name: "David Kim", initials: "DK", plan: "Elite", status: "absent" },
      { id: "m-6", name: "Sarah Chen", initials: "SC", plan: "Basic", status: "attended" },
      { id: "m-8", name: "Lisa Park", initials: "LP", plan: "Elite", status: "attended" },
    ],
    notes: "Great turnout. All participants reported feeling refreshed.",
  },
];
