import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { useTranslation } from "next-i18next";
import CheckIcon from "./icons/pro/CheckIcon";

const BASE_INCLUDED = [
  "createProfile",
  "addPortfolio",
  "sendProposals",
  "receiveReviews",
  "basicBalanceHistory",
] as const;

const BASE_EXCLUDED = [
  "advancedFinancialStatistics",
  "exportFinancialReports",
  "profileAnalytics",
  "proposalPerformance",
  "reviewAnalytics",
  "profilePersonalization",
  "visibilityTools",
  "priorityAccess",
] as const;

const PRO_INCLUDED = [...BASE_INCLUDED, ...BASE_EXCLUDED];

function PlanFeatureRow({
  label,
  included,
}: {
  label: string;
  included: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${included ? "bg-success text-white" : "bg-checkbox/40 text-text-light"
          }`}
      >
        {included ? (
          <CheckIcon className="h-[9px] w-[9px]" />
        ) : (
          <span className="text-[10px] leading-none">×</span>
        )}
      </span>
      <span
        className={`text-[14px] ${included
            ? "text-text dark:text-text-dark"
            : "text-text-light dark:text-text-muted"
          }`}
      >
        {label}
      </span>
    </li>
  );
}

export default function ProPricing() {
  const { t } = useTranslation("pro");

  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-16 pt-4 md:px-10 md:pb-24">
      <h2 className="text-center text-[26px] font-bold text-text dark:text-text-dark md:text-[36px]">
        {t("pricing.title")}
      </h2>
      <p className="mx-auto mt-3 max-w-[480px] text-center text-[14px] text-text-light dark:text-text-muted">
        {t("pricing.subtitle")}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-20 bg-black/[0.03] p-8 dark:bg-white/5">
          <div className="flex items-start justify-between">
            <h3 className="text-[18px] font-semibold text-text dark:text-text-dark">
              {t("pricing.base.name")}
            </h3>
            <span className="text-[16px] text-text-light dark:text-text-muted">
              {t("pricing.base.price")}
            </span>
          </div>
          <p className="mt-1 max-w-[380px] text-[13px] text-text-light dark:text-text-muted">
            {t("pricing.planDescription")}
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {BASE_INCLUDED.map((key) => (
              <PlanFeatureRow
                key={key}
                label={t(`pricing.features.${key}`)}
                included
              />
            ))}
            {BASE_EXCLUDED.map((key) => (
              <PlanFeatureRow
                key={key}
                label={t(`pricing.features.${key}`)}
                included={false}
              />
            ))}
          </ul>
        </div>

        <div className="flex flex-col rounded-20 bg-black/[0.03] p-8 dark:bg-white/5">
          <div className="flex items-start justify-between">
            <h3 className="text-[18px] font-semibold text-text dark:text-text-dark">
              {t("pricing.pro.name")}
            </h3>
            <span className="text-[16px] text-text-light dark:text-text-muted">
              <span className="text-[26px] font-bold text-success">
                ${t("pricing.pro.price")}
              </span>
              {t("pricing.perMonth")}
            </span>
          </div>
          <p className="mt-1 max-w-[380px] text-[13px] text-text-light dark:text-text-muted">
            {t("pricing.planDescription")}
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {PRO_INCLUDED.map((key) => (
              <PlanFeatureRow
                key={key}
                label={t(`pricing.features.${key}`)}
                included
              />
            ))}
          </ul>

          <div className="mt-8">
            <ButtonGradient text={t("pricing.cta")} className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
