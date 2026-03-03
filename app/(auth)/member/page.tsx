import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";

export default function MemberAuthPage() {
  return (
    <Suspense>
      <AuthCard
        role="member"
        roleLabel="Gym Member"
        dashboardHref="/member/dashboard"
      />
    </Suspense>
  );
}
