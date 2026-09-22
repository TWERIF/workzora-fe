import { useCountProjects } from "@/features/projects/model/useProjects";
import { useCountUsers } from "@/features/users/model/useUsers";
import { useTranslation } from "react-i18next";

function formatCount(value?: number | string) {
  if (value === undefined || value === null) return "—";
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return String(value);
  return `${num.toLocaleString("uk-UA")}+`;
}

export default function FooterMeta() {
  const { t } = useTranslation("footer");
  const { data: users } = useCountUsers();
  const { data: projects } = useCountProjects();

  return (
    <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-auto">
      <StatCard value={formatCount(users)} label={t("stats.registeredUsers")} />
      <StatCard value={formatCount(projects)} label={t("stats.totalJobs")} />
    </div>
  );
}

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="flex-1 lg:flex-none lg:w-56 rounded-20 bg-bg-modalDark border border-border/40 px-6 py-5 text-center lg:text-left">
    <div className="text-2xl md:text-3xl font-bold tracking-tight text-success">{value}</div>
    <div className="mt-1 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-text-muted">
      {label}
    </div>
  </div>
);