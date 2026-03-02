"use client";

import { Camera } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type TrainerProfile } from "@/lib/profile-data";

interface ProfileFormProps {
  profile: TrainerProfile;
  onChange: (next: TrainerProfile) => void;
}

export default function ProfileForm({ profile, onChange }: ProfileFormProps) {
  function handleField<K extends keyof TrainerProfile>(
    key: K,
    value: TrainerProfile[K]
  ) {
    onChange({ ...profile, [key]: value });
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-900">
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ── Left Column ── */}
          <div className="flex flex-col gap-5">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-indigo-100 text-xl font-bold text-indigo-700">
                    AT
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  aria-label="Change photo"
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md transition-colors hover:bg-indigo-700"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Profile Photo
                </p>
                <p className="text-xs text-slate-400">JPG, PNG up to 5 MB</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 h-7 text-xs"
                >
                  Upload Photo
                </Button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-slate-700"
              >
                Full Name
              </Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => handleField("name", e.target.value)}
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleField("email", e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-slate-700"
              >
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => handleField("phone", e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Specialization */}
            <div className="space-y-1.5">
              <Label
                htmlFor="specialization"
                className="text-sm font-medium text-slate-700"
              >
                Specialization
              </Label>
              <Input
                id="specialization"
                value={profile.specialization}
                onChange={(e) =>
                  handleField("specialization", e.target.value)
                }
                placeholder="e.g. Strength & Conditioning"
              />
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-5">
            {/* Years of Experience */}
            <div className="space-y-1.5">
              <Label
                htmlFor="experience"
                className="text-sm font-medium text-slate-700"
              >
                Years of Experience
              </Label>
              <Input
                id="experience"
                type="number"
                min={0}
                max={50}
                value={profile.experience}
                onChange={(e) =>
                  handleField(
                    "experience",
                    Math.max(0, parseInt(e.target.value, 10) || 0)
                  )
                }
                className="w-28"
              />
            </div>

            {/* Certification */}
            <div className="space-y-1.5">
              <Label
                htmlFor="certification"
                className="text-sm font-medium text-slate-700"
              >
                Certification
              </Label>
              <Input
                id="certification"
                value={profile.certification}
                onChange={(e) =>
                  handleField("certification", e.target.value)
                }
                placeholder="e.g. NSCA-CSCS, NASM-CPT"
              />
            </div>

            {/* Employment Type */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Employment Type
              </Label>
              <div className="flex gap-2">
                {(["Full-time", "Part-time"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleField("employmentType", type)}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                      profile.employmentType === type
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-1 flex-col gap-1.5">
              <Label
                htmlFor="bio"
                className="text-sm font-medium text-slate-700"
              >
                Bio
              </Label>
              <Textarea
                id="bio"
                rows={7}
                value={profile.bio}
                onChange={(e) => handleField("bio", e.target.value)}
                placeholder="Tell clients about yourself..."
                className="resize-none"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
