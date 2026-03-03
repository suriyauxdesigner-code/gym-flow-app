import { redirect } from "next/navigation";

// Moved to modal — redirect back to members list
export default function AddMemberPage() {
  redirect("/owner/members");
}
