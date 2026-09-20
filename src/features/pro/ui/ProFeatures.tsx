import { useTranslation } from "next-i18next";
import { ProIcon1, ProIcon2, ProIcon3, ProIcon4, ProIcon5, ProIcon6, ProIcon7, ProIcon8 } from "./icons/pro";


const FEATURE_KEYS = [
  { key: "advancedStatistics", Icon: ProIcon1 },
  { key: "exportReports", Icon: ProIcon2 },
  { key: "profileAnalytics", Icon: ProIcon3 },
  { key: "proposalPerformance", Icon: ProIcon4 },
  { key: "reviewAnalytics", Icon: ProIcon5 },
  { key: "profilePersonalization", Icon: ProIcon6 },
  { key: "visibilityTools", Icon: ProIcon7 },
  { key: "priorityFeatures", Icon: ProIcon8 },
] as const;

export default function ProFeatures() {
  const { t } = useTranslation("pro");

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-10 md:px-10 md:py-16">
      <h2 className="text-center text-[26px] font-bold text-text dark:text-text-dark md:text-[36px]">
        {t("features.title")}
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURE_KEYS.map(({ key, Icon }) => (
          <div
            key={key}
            className="flex flex-col items-start gap-4 rounded-20 bg-black/[0.03] p-6 dark:bg-white/5"
          >
            <Icon className="h-14 w-14 shrink-0" />
            <h3 className="text-[16px] font-semibold text-text dark:text-text-dark">
              {t(`features.items.${key}.title`)}
            </h3>
            <p className="text-[13px] leading-relaxed text-text-light dark:text-text-muted">
              {t(`features.items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
