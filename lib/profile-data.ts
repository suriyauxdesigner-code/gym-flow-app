export interface TrainerProfile {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  bio: string;
  certification: string;
  employmentType: "Full-time" | "Part-time";
}

export const MOCK_PROFILE: TrainerProfile = {
  name: "Alex Thompson",
  email: "alex.thompson@fitpro.com",
  phone: "+1 (555) 234-5678",
  specialization: "Strength & Conditioning",
  experience: 8,
  bio: "Certified strength and conditioning specialist with over 8 years of experience helping clients achieve their fitness goals. Passionate about empowering clients to push their limits safely and effectively.",
  certification: "NSCA-CSCS, NASM-CPT",
  employmentType: "Full-time",
};

export interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export const MOCK_SESSIONS: ActiveSession[] = [
  {
    id: "s-1",
    device: "Chrome on macOS",
    location: "New York, US",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "s-2",
    device: "Safari on iPhone",
    location: "New York, US",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "s-3",
    device: "Firefox on Windows",
    location: "Brooklyn, US",
    lastActive: "Yesterday",
    current: false,
  },
];
