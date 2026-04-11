import React, { useState } from 'react';
import Head from "next/head";
import { useTranslation } from "react-i18next";
import Iphones from '../../public/iphones.png'
import IconAdidas from "@/components/svg/IconAdidas";
import IconApple from "@/components/svg/IconApple";
import IconBmw from "@/components/svg/IconBmw";
import IconIbm from "@/components/svg/IconIbm";
import IconM9cow from "@/components/svg/IconM9cow";
import IconTesla from "@/components/svg/IconTesla";
import Image from 'next/image';
import ButtonGradientSmall from '@/components/ui/Button/ButtonGradientSmall';
import DogImage from '@/components/svg/DogImage';
import ProjectCard from '@/components/ui/Card/ProjectCard';
import ProfileGrid from '@/components/ui/Layout/ProfileGrid';
import CubesTop from '@/components/svg/CubesTop';
import CubesBottom from '@/components/svg/CubesBottom';
import IconArrow from '@/components/svg/IconArrow';
import { FAQSection } from '@/components/ui/Main-section/FAQsection';
import { useTheme } from 'next-themes';

const LOGOS = [
  IconM9cow, IconAdidas, IconBmw, IconIbm,
  IconApple, IconTesla, IconM9cow, IconAdidas
];

export default function Home() {
  const { t } = useTranslation("common");
  const categoriesObj = t("getWorkDone.category", { returnObjects: true });
  const categoryNames = Object.values(categoriesObj);
  const projects = t("topProjects.items", { returnObjects: true });
  const freelancers = t("community.freelancers", { returnObjects: true });
  const clients = t("community.clients", { returnObjects: true });
  const { theme } = useTheme();
  const isDark = theme == 'dark';

  return (
    <>
      <Head>
        <title>Workzora</title>
        <meta name="description" content="Workzora" />
      </Head>

      {/* Hero Section */}
      <section className="text-white bg-[url('/bg-main.png')] bg-cover bg-center min-h-[600px] md:min-h-[750px] flex pt-20 md:pt-24">
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
      <section className="bg-[#333333] text-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
          <span className="opacity-70 uppercase tracking-wider text-xs font-semibold">
            {t("hero.asUsedBy")}
          </span>
          <div className="grid grid-cols-4 md:flex md:flex-wrap items-center justify-center gap-6 md:gap-12">
            {LOGOS.map((Icon, idx) => (
              <div key={idx} className="grayscale hover:grayscale-0 transition-all duration-300 scale-75 md:scale-100">
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Make It Real Section */}
      <section className={`relative ${isDark ? "bg-[#333333]" : "bg-[url('/bg-main1.png')]"} bg-cover bg-center py-16 md:py-20 overflow-hidden`}>
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6 md:gap-10 text-center lg:text-left items-center lg:items-start">
            <h2 className="text-4xl md:text-[55px] font-bold leading-tight max-w-[500px]">
              {t("makeItReal.title.1")} <span className="text-[#7EA310]">{t("makeItReal.title.2")}</span>
            </h2>
            <div className="relative w-full max-w-lg lg:-ml-8">
              <Image src={Iphones} alt='Iphones' className="w-full h-auto object-contain" />
            </div>
          </div>

          <div className="flex flex-col gap-10 self-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-3 text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold border-l-0 sm:border-l-2 border-[#7EA310] sm:pl-4">
                    {t(`makeItReal.grid.${i}.title`)}
                  </h3>
                  <p className="opacity-80 text-sm md:text-base leading-relaxed">
                    {t(`makeItReal.grid.${i}.content`)}
                  </p>
                </div>
              ))}
            </div>
            <div className={`rounded-2xl shadow-xl ${isDark ? "bg-[#444]" : "bg-white"} p-6 flex flex-col sm:flex-row items-center justify-between gap-6 w-full lg:max-w-[550px]`}>
              <div className='text-xl md:text-2xl font-bold text-center sm:text-left'>{t("makeItReal.makeDreamsReality")}</div>
              <ButtonGradientSmall text={t("getStarted")} onClick={() => { }} />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Sections (Combined Logic for Responsiveness) */}
      <section className={`py-16 md:py-20 ${isDark ? "bg-[#333333]" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden min-h-[300px] md:min-h-[500px]">
              <Image src="/guitar.png" alt="Featured" fill className="object-cover" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src={`/grid${i}.png`} alt="Grid" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Work Done Section */}
      <section className="relative bg-[url('/bg-main4.png')] bg-cover bg-center py-16 md:py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] gap-12">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-[65px] font-bold leading-tight mb-8">
                {t("getWorkDone.title.1")}<br />
                <span className="text-white/80">{t("getWorkDone.title.2")}</span> {t("getWorkDone.title.3")}
              </h2>
              <div className="max-w-[300px] mx-auto lg:mx-0">
                <DogImage />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm md:text-lg">
              <div className="flex flex-col gap-4">
                {categoryNames.slice(0, 8).map((name, i) => (
                  <p key={i} className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity">{name as string}</p>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {categoryNames.slice(8, 16).map((name, i) => (
                  <p key={i} className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity">{name as string}</p>
                ))}
              </div>
              <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
                {categoryNames.slice(16, 21).map((name, i) => (
                  <p key={i} className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity">{name as string}</p>
                ))}
                <div className="mt-4">
                  <ButtonGradientSmall text={t("getWorkDone.showAllBtn")} onClick={() => { }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className={`py-16 md:py-20 ${isDark ? "bg-[#333333]" : "bg-white"}`}>
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="flex-1 overflow-x-auto">
            <ProfileGrid items={freelancers} title={t("community.topFreelancers")} />
          </div>
          <div className="flex-1 overflow-x-auto">
            <ProfileGrid items={clients} title={t("community.topClients")} />
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className={`py-16 md:py-24 relative overflow-hidden ${isDark ? "bg-[#333333]" : "bg-white"}`}>
        <div className="absolute top-0 left-0 hidden md:block"><CubesTop /></div>
        <div className="absolute bottom-0 right-0 hidden md:block"><CubesBottom /></div>

        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center md:text-left">
            {t("topProjects.title.topPosted")}<br />
            <span className="text-[#7EA310]">{t("topProjects.title.projects")}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {Array.isArray(projects) && projects.slice(0, 6).map((proj, idx) => (
              <ProjectCard key={idx} project={proj} />
            ))}
          </div>

          <div className="flex flex-col items-center mt-12">
            <button className="group flex flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase text-[#7EA310]">{t("community.showAll")}</span>
              <div className="group-hover:translate-y-1 transition-transform">
                <IconArrow />
              </div>
            </button>
          </div>
        </div>
      </section>

      <FAQSection />

      <section className={`py-12 ${isDark ? "bg-[#333333] text-white" : "bg-white text-[#333333]"}`}>
        <div className="container mx-auto px-4">
          <p className="text-sm md:text-base text-center max-w-4xl mx-auto opacity-70">
            {t("imagine-text")}
          </p>
        </div>
      </section>
    </>
  );
}