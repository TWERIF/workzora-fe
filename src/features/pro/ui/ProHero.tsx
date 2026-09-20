import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export default function ProHero() {
  const { t } = useTranslation("pro");

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 px-4 pb-10 pt-8 md:grid-cols-2 md:gap-6 md:px-10 md:pb-16 md:pt-10">
        <div className="flex flex-col items-start gap-5 md:gap-6">
          <span className="rounded-full bg-[#7EA310] px-5 py-2 text-[12px] font-semibold uppercase tracking-wide text-text-dark">
            {t("hero.badge")}
          </span>

          <h1 className="text-[32px] font-bold leading-tight text-text dark:text-text-dark md:text-[48px]">
            {t("hero.titleLine1")}
            <br />
            <span className="text-success">{t("hero.titleLine2")}</span>
          </h1>

          <p className="max-w-[520px] text-[14px] leading-relaxed text-[#333333] dark:text-[#FFFFFF] md:text-[16px]">
            {t("hero.description")}
          </p>

          <ButtonGradient text={t("hero.cta")} />
        </div>

        <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
          <div className="relative aspect-square w-full max-w-[440px]">
            <span className="absolute right-2 top-4 z-20 rounded-[10px] rounded-bl-none bg-[#F5A524] px-4 py-2 text-[12px] font-medium text-white shadow-md md:right-6 md:top-8">
              {t("hero.tagMoreClients")}
            </span>

            <Image
              src="/images/pro/pro-freelancer.png"
              alt="WorkZora Pro freelancer"
              fill
              priority
              className="relative z-10 object-contain object-bottom"
            />

            <span className="absolute bottom-8 left-0 z-20 rounded-[10px] rounded-bl-none bg-[#2AC1A8] px-4 py-2 text-[12px] font-medium text-white shadow-md md:bottom-10">
              {t("hero.tagAdvancedAnalytics")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
