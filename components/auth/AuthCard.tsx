"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthCardProps {
  role: string;
  roleLabel: string;
  dashboardHref: string;
}

export default function AuthCard({ role, roleLabel, dashboardHref }: AuthCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-16">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
          <Dumbbell className="h-5 w-5 text-white" />
        </div>
        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">FitPro</span>
      </Link>

      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            {isSignup ? `Sign up as ${roleLabel}` : `Login as ${roleLabel}`}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            {isSignup
              ? "Create your account to get started"
              : "Enter your credentials to continue"}
          </p>

          <div className="space-y-4">
            {isSignup && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your full name" />
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@fitpro.com" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2"
              onClick={() => router.push(dashboardHref)}
            >
              {isSignup ? "Create Account" : "Log In"}
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-400">or</span>
            </div>
          </div>

          {isSignup ? (
            <div className="space-y-3">
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/${role}`)}
              >
                Log In
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Don&apos;t have an account?
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/${role}?mode=signup`)}
              >
                Sign Up
              </Button>
            </div>
          )}

          <p className="text-center text-xs text-slate-400 mt-6">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              ← Back to role selection
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
