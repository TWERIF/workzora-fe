import { Fade } from "@/shared/components/svg/Fade";
import { Vector } from "@/shared/components/svg/Vector";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

interface HeroProps {
  handleReg: () => void;
}

interface StatItem {
  value: string;
  label: string;
}

export default function Hero({ handleReg }: HeroProps) {
  const { t } = useTranslation("main");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const badges = t("hero.title-list", { returnObjects: true }) as string[];
  const stats = t("hero.stats", { returnObjects: true }) as StatItem[];

  return (
    <section className="relative text-text bg-bg dark:text-text-dark dark:bg-bg-dark overflow-hidden pt-24 md:pt-28">
      <div className="absolute top-0">
        {isDark ? <Vector fill="#ffffff" /> : <Vector />}
        <Fade />
      </div>

      <div className="relative container mx-auto md:px-16 sm:px-8 px-4 mt-14">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-6">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="font-bold text-4xl md:text-[55px] leading-tight pb-6">
              {t("hero.title")}
            </h1>

            <p className="text-text-muted mb-6">{t("hero.subtitle")}</p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 w-full">
              <ButtonGradient onClick={handleReg} text={t("hero.HireFreelancerBtn1")} />
              <ButtonGradient onClick={handleReg} filled={false} text={t("hero.HireFreelancerBtn2")} />
            </div>
          </div>

          <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <img
                src="/images/main/hero-woman.png"
                alt=""
                className="relative z-10 w-[260px] md:w-[340px] h-auto"
              />

              {badges?.[0] && (
                <span className="absolute top-6 -right-2 md:right-0 z-20 whitespace-nowrap rounded-full bg-[#F5A623] px-4 py-2 text-xs font-semibold text-white shadow-input">
                  {badges[0]}
                </span>
              )}

              <span className="absolute bottom-10 -left-4 md:-left-10 z-20 whitespace-nowrap rounded-full bg-[#2D9C8A] px-4 py-2 text-xs font-semibold text-white shadow-input">
                {t("hero.ThisBannerCost")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-16 bg-[#3E3E3E]">
        <div className="container mx-auto md:px-16 sm:px-8 px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          {stats?.map((stat, i) => (
            <div className="bg-[#333333] p-6 sm:rounded-6 rounded-[18px]" key={i}>
              <div className="text-2xl md:text-3xl font-bold text-success">{stat.value}</div>
              <div className="text-sm opacity-70">{stat.label}</div>  
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}