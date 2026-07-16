import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

// TODO: wire these to real, live numbers (an API/hook) instead of hardcoded values.
const REGISTERED_USERS = "82 741 914+";
const TOTAL_JOBS_POSTED = "24 897 510+";

export default function StatsBar() {
  const { t } = useTranslation("main");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`py-10 ${isDark ? "bg-bg-dark text-text-dark" : "bg-white text-text"}`}>
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20 text-center">
        <div>
          <p className="text-3xl md:text-4xl font-bold text-success">{REGISTERED_USERS}</p>
          <p className="text-sm opacity-70">{t("statsBar.registeredUsers")}</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-success">{TOTAL_JOBS_POSTED}</p>
          <p className="text-sm opacity-70">{t("statsBar.totalJobsPosted")}</p>
        </div>
      </div>
    </section>
  );
}
