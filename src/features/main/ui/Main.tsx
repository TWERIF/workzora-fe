import { FAQSection } from "@/features/main/ui/FAQsection";
import CubesBottom from "@/shared/components/svg/CubesBottom";
import CubesTop from "@/shared/components/svg/CubesTop";
import DogImage from "@/shared/components/svg/DogImage";
import IconArrow from "@/shared/components/svg/IconArrow";
import ButtonGradientSmall from "@/shared/components/ui/Button/ButtonGradientSmall";
import ProjectCard from "@/shared/components/ui/Card/ProjectCard";
import ProfileGrid from "@/shared/components/ui/Layout/ProfileGrid";
import { useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Iphones from "../../../../public/images/Iphones.png";
import TrustedBy from "./TrustedBy";
import { useProjects } from "@/features/projects/model/useProjects";
import { Project } from "@/features/projects/model/types";
import { usePreview } from "../model/useUsers";

export default function Main() {
  const { t } = useTranslation("common");
  const categoriesObj = t("getWorkDone.category", { returnObjects: true });
  const categoryNames = Object.values(categoriesObj);
  const { theme } = useTheme();
  const { topProjects } = useProjects();
  const { preview: previewFreelancers } = usePreview("freelancer", 14);
  const { preview: previewClients } = usePreview("client", 14);
  const isDark = theme == "dark";
  return (
    <>
      <main className="overflow-x-hidden w-full">
        <Head>
          <title>Workzora</title>
          <meta name="description" content="Workzora" />
        </Head>

        {/* Hero Section */}
        <section className="text-white bg-[url('/images/bg-main.png')] bg-cover bg-center min-h-[600px] md:min-h-[750px] flex pt-20 md:pt-24">
          <div className="container mx-auto px-4 flex flex-col">
            <div className="max-w-[550px] text-center md:text-left">
              <h1 className="font-bold text-4xl md:text-[55px] leading-tight pb-6">
                {t("hero.title")}
              </h1>

              <ul className="list-disc pl-5 pb-9 space-y-2 text-left inline-block md:block">
                {[0, 1, 2, 3].map((index) => (
                  <li className="text-base md:text-lg" key={index}>
                    {t(`hero.title-list.${index}`)}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <button className="bg-white hover:bg-gray-200 transition-colors rounded-2xl border-2 border-white text-black px-8 py-3 font-medium">
                  {t("hero.HireFreelancerBtn1")}
                </button>
                <button className="rounded-2xl border-white border-2 px-8 py-3 hover:bg-white/10 transition-colors">
                  {t("hero.HireFreelancerBtn2")}
                </button>
              </div>
            </div>

            <p className="mt-auto py-10 text-center md:text-end lg:pr-20 opacity-80 italic text-sm md:text-base">
              {t("hero.ThisBannerCost")}
            </p>
          </div>
        </section>

        {/* Trusted By Section */}
        <TrustedBy />

        {/* Make It Real Section */}
        <section
          className={`relative ${isDark ? "bg-[#333333]" : "bg-[url('/bg-main1.png')]"} bg-cover bg-center py-16 md:py-20 overflow-hidden`}
        >
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6 md:gap-10 text-center lg:text-left items-center lg:items-start">
              <h2 className="text-4xl md:text-[55px] font-bold leading-tight max-w-[500px]">
                {t("makeItReal.title.1")}{" "}
                <span className="text-[#7EA310]">
                  {t("makeItReal.title.2")}
                </span>
              </h2>
              <div className="relative w-full max-w-lg lg:-ml-8">
                <Image
                  src={Iphones}
                  alt="Iphones"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col gap-10 self-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 text-center sm:text-left"
                  >
                    <h3 className="text-xl md:text-2xl font-semibold border-l-0 sm:border-l-2 border-[#7EA310] sm:pl-4">
                      {t(`makeItReal.grid.${i}.title`)}
                    </h3>
                    <p className="opacity-80 text-sm md:text-base leading-relaxed">
                      {t(`makeItReal.grid.${i}.content`)}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className={`rounded-2xl shadow-xl ${isDark ? "bg-[#444]" : "bg-white"} p-6 flex flex-col sm:flex-row items-center justify-between gap-6 w-full lg:max-w-[550px]`}
              >
                <div className="text-xl md:text-2xl font-bold text-center sm:text-left">
                  {t("makeItReal.makeDreamsReality")}
                </div>
                <ButtonGradientSmall
                  text={t("getStarted")}
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Sections (Combined Logic for Responsiveness) */}
        <section
          className={`py-16 md:py-20 ${isDark ? "bg-[#333333]" : "bg-white"}`}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden min-h-[300px] md:min-h-[500px]">
                <Image
                  src="/guitar.png"
                  alt="Featured"
                  fill
                  className="object-cover"
                />
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden"
                >
                  <Image
                    src={`/grid${i}.png`}
                    alt="Grid"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Work Done Section */}
        <section className="relative bg-[url('/images/bg-main4.png')] bg-cover bg-center py-16 md:py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr,1fr] gap-12">
              {/* 1. ЗАГОЛОВОК */}
              <div className="order-1 text-center lg:text-left">
                <h2 className="text-4xl md:text-[65px] font-bold leading-tight mb-0 lg:mb-8">
                  {t("getWorkDone.title.1")}
                  <br />
                  <span className="text-white/80">
                    {t("getWorkDone.title.2")}
                  </span>{" "}
                  {t("getWorkDone.title.3")}
                </h2>
              </div>

              {/* 2. КАТЕГОРІЇ ТА КНОПКА */}
              <div className="order-2 lg:col-start-2 lg:row-span-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm md:text-lg">
                  {/* КОЛОНКА 1 (Видима завжди) */}
                  <div className="flex flex-col gap-4">
                    {categoryNames.map((name, i) => (
                      <p
                        key={i}
                        className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity"
                      >
                        {name as string}
                      </p>
                    ))}
                  </div>

                  {/* КОЛОНКА 2 (Видима завжди) */}
                  <div className="flex flex-col gap-4">
                    {categoryNames.map((name, i) => (
                      <p
                        key={i}
                        className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity"
                      >
                        {name as string}
                      </p>
                    ))}
                  </div>

                  {/* КОЛОНКА 3 (ПРИХОВАНА НА МОБІЛКАХ, видима від sm і вище) */}
                  <div className="hidden sm:flex flex-col gap-4">
                    {categoryNames.slice(0, 17).map((name, i) => (
                      <p
                        key={i}
                        className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity"
                      >
                        {name as string}
                      </p>
                    ))}
                    {/* Кнопка Show All ТІЛЬКИ ДЛЯ ДЕСКТОПУ (в кінці 3-ї колонки) */}
                    <div className="mt-6 lg:mt-8 flex items-center flex-col justify-center gap-2 group cursor-pointer w-fit p-2">
                      <span className="text-sm font-semibold text-white group-hover:underline transition-all">
                        {t("getWorkDone.showAllBtn")}
                      </span>
                      <div className="transform group-hover:translate-x-1 transition-transform flex items-center">
                        <IconArrow color="white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Кнопка Show All ТІЛЬКИ ДЛЯ МОБІЛОК (з'являється під 2 колонками) */}
                <div className="sm:hidden mt-8 flex items-center justify-center gap-2 group cursor-pointer w-full p-2">
                  <span className="text-sm font-semibold text-white group-hover:underline transition-all">
                    {t("getWorkDone.showAllBtn")}
                  </span>
                  <div className="transform group-hover:translate-x-1 transition-transform flex items-center">
                    <IconArrow color="white" />
                  </div>
                </div>
              </div>

              {/* 3. СОБАКА */}
              <div className="order-3 lg:col-start-1 max-w-[300px] mx-auto lg:mx-0 lg:mt-auto">
                <DogImage />
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section
          className={`py-16 md:py-20 ${isDark ? "bg-[#333333]" : "bg-white"}`}
        >
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-10">
            {/* Додаємо p-6, щоб звільнити місце для тіні */}
            <div className="flex-1 overflow-x-visible p-6">
              <ProfileGrid
                items={previewFreelancers}
                title={"community.topFreelancers"}
              />
            </div>
            <div className="flex-1 overflow-x-visible p-6">
              <ProfileGrid
                items={previewClients}
                title={"community.topClients"}
              />
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section
          className={`py-16 md:py-24 relative overflow-hidden ${isDark ? "bg-[#333333]" : "bg-white"}`}
        >
          <div className="absolute top-0 left-0 hidden md:block">
            <CubesTop />
          </div>
          <div className="absolute bottom-0 right-0 hidden md:block">
            <CubesBottom />
          </div>

          <div className="container mx-auto px-4 relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center md:text-left">
              {t("topProjects.title.topPosted")}
              <br />
              <span className="text-[#7EA310]">
                {t("topProjects.title.projects")}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {topProjects &&
                topProjects?.map((proj: Project, idx: number) => (
                  <ProjectCard key={idx} project={proj} />
                ))}
            </div>

            <div className="flex flex-col items-center mt-12">
              <button className="group flex flex-col items-center gap-2">
                <span className="text-xs font-bold uppercase text-[#7EA310]">
                  {t("community.showAll")}
                </span>
                <div className="group-hover:translate-y-1 transition-transform">
                  <IconArrow />
                </div>
              </button>
            </div>
          </div>
        </section>

        <FAQSection />

        <section
          className={`py-12 ${isDark ? "bg-[#333333] text-white" : "bg-white text-[#333333]"}`}
        >
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
