import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";

export default function TrainerAuthPage() {
  return (
    <Suspense>
      <AuthCard
        role="trainer"
        roleLabel="Gym Trainer"
        dashboardHref="/trainer/dashboard"
      />
    </Suspense>
  );
}
