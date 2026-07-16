import { Fade } from "@/shared/components/svg/Fade";
import { Vector } from "@/shared/components/svg/Vector";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import Marquee from "@/shared/components/ui/Marquee/Marquee";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ShowcaseItem from "./ShowcaseItem";

// Підключіть правильний шлях до вашого типу
import { PortfolioItem } from "@/features/portfolio/model/types";

interface HeroProps {
  showcaseItems?: PortfolioItem[];
  onSearch?: (query: string) => void;
}

export default function Hero({ showcaseItems = [], onSearch }: HeroProps) {
  const { t } = useTranslation("main");
  const [query, setQuery] = useState("");
  const tags = t("hero.search.tags", { returnObjects: true }) as string[];
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative text-text bg-bg dark:text-text-dark dark:bg-bg-dark overflow-hidden pt-24 md:pt-28">
      <div className="absolute top-0">
        {isDark ? <Vector fill="#ffffff" /> : <Vector />}
        <Fade />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="flex flex-col w-full text-center items-center">
          <div className="max-w-[650px]">
            <h1 className="font-bold text-4xl md:text-[55px] leading-tight pb-6">
              {t("hero.title")}
            </h1>

            <h2>{t("hero.subtitle")}</h2>

            <div className="flex justify-center gap-4 mt-2 w-full ">
              <ButtonGradient text={t("hero.HireFreelancerBtn1")} />
              <ButtonGradient filled={false} text={t("hero.HireFreelancerBtn2")} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 mb-8 h-[396px]">
        <Marquee>
          {showcaseItems.map((item) => (
            <ShowcaseItem
              key={item.id}
              creator={item?.user!}
              imageUrl={item.imageUrl}
              workUrl={`/portfolio/${item.id}`}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}