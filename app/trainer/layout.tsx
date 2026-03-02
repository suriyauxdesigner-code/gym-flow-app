import TrainerSidebar from "@/components/layout/TrainerSidebar";
import TrainerHeader from "@/components/layout/TrainerHeader";

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <TrainerSidebar />
      <div className="flex flex-1 flex-col pl-[260px]">
        <TrainerHeader />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
