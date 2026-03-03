import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";

export default function OwnerAuthPage() {
  return (
    <Suspense>
      <AuthCard
        role="owner"
        roleLabel="Gym Owner"
        dashboardHref="/owner/dashboard"
      />
    </Suspense>
  );
}
