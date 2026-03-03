import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  iconBg: string;
  iconColor: string;
}

export default function RoleCard({
  icon: Icon,
  title,
  description,
  href,
  iconBg,
  iconColor,
}: RoleCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200"
    >
      <div
        className={`h-12 w-12 rounded-xl ${iconBg} flex items-center justify-center`}
      >
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
        Continue
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
