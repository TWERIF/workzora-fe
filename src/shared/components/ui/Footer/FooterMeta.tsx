import { useFormatCount, useSiteStats } from "@/features/stats/model/useSiteStats";
import { useTranslation } from "react-i18next";

export default function FooterMeta() {
  const { t } = useTranslation("footer");
  const { data: stats } = useSiteStats();
  const formatCount = useFormatCount();

  return (
    <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-auto">
      <StatCard value={formatCount(stats?.users)} label={t("stats.registeredUsers")} />
      <StatCard value={formatCount(stats?.projects)} label={t("stats.totalJobs")} />
    </div>
  );
}

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="min-w-0 flex-1 lg:flex-none lg:w-56 rounded-20 bg-bg-modalDark border border-border/40 px-3 sm:px-6 py-5 text-center lg:text-left">
    <div className="text-2xl md:text-3xl font-bold tracking-tight text-success">{value}</div>
    <div className="mt-1 break-words text-[10px] md:text-xs font-semibold uppercase tracking-wide sm:tracking-widest text-text-muted">
      {label}
    </div>
  </div>
);
