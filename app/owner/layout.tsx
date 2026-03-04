import OwnerSidebar from "@/components/layout/OwnerSidebar";
import OwnerHeader from "@/components/layout/OwnerHeader";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <OwnerSidebar />
      <div className="flex flex-1 flex-col pl-[240px]">
        <OwnerHeader />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
