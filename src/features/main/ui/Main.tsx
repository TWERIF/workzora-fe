import { FAQSection } from "@/features/main/ui/FAQsection";
import { Project } from "@/features/projects/model/types";
import { useProjects } from "@/features/projects/model/useProjects";
import IconArrow from "@/shared/components/svg/IconArrow";
import ProjectCard from "@/shared/components/ui/Card/ProjectCard";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import Categories from "./Categories";
import { HomeFeaturesSection } from "./FeatureCards";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import LookingFor from "./LookingFor";
import TrustedFreelancers from "./TrustedFreelancers";
import TrustedUsers from "./TrustedUsers";

export default function Main() {
  const { t } = useTranslation("main");

  const { topProjects } = useProjects();

  const router = useRouter();
  const locale = router.locale ?? "en";

  const handleReg = () => {
    void router.push(`/${locale}/registration`);
  };

  return (
    <>
      <main className="overflow-x-hidden w-full bg-bg text-text dark:bg-bg-dark dark:text-text-dark">
        <Hero handleReg={handleReg} />

        <LookingFor />

        <HomeFeaturesSection />

        <TrustedFreelancers handleReg={handleReg} />

        <HowItWorks />

        <Categories />

        <TrustedUsers />

        <section className="py-16 md:py-24 bg-white dark:bg-bg-dark">
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
              <button className="group flex flex-col items-center gap-2" onClick={() => router.push(`/${locale}/top-projects`)}>
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

        <section className="py-12 bg-white text-[#333333] dark:bg-bg-dark dark:text-text-dark">
          <div className="container mx-auto px-4">
            <p className="text-sm md:text-base text-center max-w-4xl mx-auto font-semibold ">
              {t("imagine-text")}
            </p>
          </div>
          <p className="text-center text-[14px]/[100%] bg-[#F2F6E7] dark:bg-bg-dark max-w-fit mx-auto p-6 rounded-5! mt-6">
            {t("ai-text")}
          </p>
        </section>
      </main>
    </>
  );
}