import { FAQSection } from "@/features/main/ui/FAQsection";
import { Project } from "@/features/projects/model/types";
import { useProjects } from "@/features/projects/model/useProjects";
import IconArrow from "@/shared/components/svg/IconArrow";
import ProjectCard from "@/shared/components/ui/Card/ProjectCard";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import TrustedBy from "./TrustedBy";
import { useRouter } from "next/router";

import Categories from "./Categories";
import { HomeFeaturesSection } from "./FeatureCards";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import LookingFor from "./LookingFor";
import { TopWorks } from "./TopWorks";
import TrustedUsers from "./TrustedUsers";
import { usePortfolioList } from "@/features/portfolio/model/usePortfolio"; 
import { PortfolioItem } from "@/features/portfolio/model/types"; 

export default function Main() {
  const { t } = useTranslation("main");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const { topProjects } = useProjects();
  
  const { data: portfolioData } = usePortfolioList(1, 10);
  
  const portfolioItems: PortfolioItem[] = portfolioData?.items || portfolioData || [];

  const router = useRouter();
  const locale = router.locale ?? "en";

  return (
    <>
      <Head>
        <title>WorkZora</title>
        <meta name="description" content="WorkZora — find the right freelancer or project in minutes" />
      </Head>

      <main className={`overflow-x-hidden w-full ${isDark ? "bg-bg-dark text-text-dark" : "bg-bg text-text"}`}>
        <Hero  showcaseItems={portfolioItems} />

        <TrustedBy />

        <LookingFor />

        <HomeFeaturesSection />

        <TopWorks items={portfolioItems} />

        <HowItWorks />

        <Categories />

        <TrustedUsers />

        <section className={`py-16 md:py-24 ${isDark ? "bg-bg-dark" : "bg-white"}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
              {t("topProjects.title.topPosted")}{" "}
              <span className="text-success">{t("topProjects.title.projects")}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {topProjects?.map((proj: Project, idx: number) => (
                <ProjectCard key={idx} project={proj} />
              ))}
            </div>

            <div className="flex flex-col items-center mt-12">
              <button className="group flex flex-col items-center gap-2" onClick={() => router.push(`/${locale}/categories`)}>
                <span className="text-xs font-bold uppercase text-success">
                  {t("topProjects.exploreAllBtn")}
                </span>
                <div className="group-hover:translate-y-1 transition-transform">
                  <IconArrow />
                </div>
              </button>
            </div>
          </div>
        </section>

        <FAQSection />

        <section className={`py-12 ${isDark ? "bg-bg-dark text-text-dark" : "bg-white text-text"}`}>
          <div className="container mx-auto px-4">
            <p className="text-sm md:text-base text-center max-w-4xl mx-auto opacity-70">
              {t("imagine-text")}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}