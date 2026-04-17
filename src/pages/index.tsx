import React from 'react';
import Head from "next/head";
import { useTranslation } from "react-i18next";
import Iphones from '../../public/iphones.png'
// Імпорти (припускаємо виправлення typo в назві папки)
import IconAdidas from "@/components/svg/IconAdidas";
import IconApple from "@/components/svg/IconApple";
import IconBmw from "@/components/svg/IconBmw";
import IconIbm from "@/components/svg/IconIbm";
import IconM9cow from "@/components/svg/IconM9cow";
import IconTesla from "@/components/svg/IconTesla";
import Image from 'next/image';
import ButtonGradientSmall from '@/components/ui/Button/ButtonGradientSmall';

const LOGOS = [
  IconM9cow, IconAdidas, IconBmw, IconIbm,
  IconApple, IconTesla, IconM9cow, IconAdidas
];

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Workzora</title>
        <meta name="description" content="Workzora" />
      </Head>

      {/* hero Section */}
      <section className="text-white bg-[url('/bg-main.png')] bg-cover bg-center h-auto w-full min-h-[100vh] flex pt-24 px-8">
        <div className="container mx-auto flex flex-col">
          <div className="max-w-[550px]">
            <h1 className="font-bold text-5xl md:text-[55px] leading-tight pb-4">
              {t("hero.title")}
            </h1>

            <ul className="list-disc pl-5 pb-9 space-y-2">
              {[0, 1, 2, 3].map((index) => (
                <li className="text-lg" key={index}>
                  {t(`hero.title-list.${index}`)}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-5">
              <button className="bg-white hover:bg-gray-200 transition-colors rounded-2xl border-2 border-white text-black px-6 py-2 font-medium">
                {t("hero.HireFreelancerBtn1")}
              </button>
              <button className="rounded-2xl border-white border-2 px-6 py-2 hover:bg-white/10 transition-colors">
                {t("hero.HireFreelancerBtn2")}
              </button>
            </div>
          </div>

          <p className="mt-auto py-10 text-end lg:pr-20 opacity-80 italic">
            {t("hero.ThisBannerCost")}
          </p>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-[#333333] text-white py-6">
        <div className="container mx-auto flex flex-wrap items-center justify-evenly  gap-8 md:gap-10">
          <span className="whitespace-nowrap opacity-70 uppercase tracking-wider text-sm font-semibold">
            {t("makeItReal.asUsedBy")}
          </span>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {LOGOS.map((Icon, idx) => (
              <div key={idx} className="grayscale hover:grayscale-0 transition-all duration-300">
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Make It Real Section */}
      <section className="relative bg-[url('/bg-main1.png')] bg-cover bg-center py-20 overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ЛІВА ЧАСТИНА: Заголовок + Зображення */}
          <div className="flex flex-col gap-10">
            <div className='max-w-[415px]'>
              <h2 className="text-[55px] font-bold leading-tight">
                {t("makeItReal.title.1")}
                <span className="text-[#7EA310]">
                  {t("makeItReal.title.2")}
                </span>
              </h2>
            </div>

            <div className="relative -ml-8">
              {/* Використовуємо -ml-8 або подібне, якщо треба, щоб фото трохи виходило */}
              <Image
                src={Iphones}
                alt='Iphones photo'
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* ПРАВА ЧАСТИНА: Сітка (2х2 всередині правої колонки) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 self-center">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <h3 className="text-2xl font-semibold border-l-2  ">
                  {t(`makeItReal.grid.${i}.title`)}
                </h3>
                <p className="opacity-80 text-base leading-relaxed">
                  {t(`makeItReal.grid.${i}.content`)}
                </p>
              </div>
            ))}
            <div className='rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)] flex w-[550px] p-6 bg-white justify-center items-center gap-14'>
              <div className='text-[30px]  font-bold'>{t("makeItReal.makeDreamsReality")}</div>
              <ButtonGradientSmall text={t("getStarted")} onClick={() => { }} />

            </div>
          </div>

        </div>
      </section>
      <section className="relative bg-[url('/bg-main2.png')] bg-cover bg-center py-20 overflow-hidden text-white">
        <div className="container mx-auto">


          {/* ОСНОВНА СІТКА 4x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 tracking-wider">

            {/* 1. ВЕЛИКЕ ЗОБРАЖЕННЯ (ЗАЙМАЄ 4 КЛІТИНКИ: 2х2) */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl aspect-[1/1] md:aspect-auto">
              <Image
                src="/guitar.png"
                alt="hero service"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />

            </div>

            {/* МАЛІ ЗОБРАЖЕННЯ (ПО 1 КЛІТИНЦІ) */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="relative group overflow-hidden rounded-2xl aspect-[1/1]">
                <Image
                  src={`/grid${item}.png`}
                  alt={`Service ${item}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Оверлей з текстом (опціонально) */}

              </div>
            ))}

          </div>

        </div>
      </section>
      <section className="relative bg-[url('/bg-main3.png')] bg-cover bg-center py-20 overflow-hidden">
        <div className="container mx-auto flex flex-col gap-20">

          {/* ВЕРХНЯ ЧАСТИНА: ТЕКСТ ЗЛІВА + ГАЛЕРЕЯ СПРАВА */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-start">

            {/* ЛІВА КОЛОНКА (Заголовок, 4 пункти, Картка з кнопкою) */}
            <div className="flex flex-col gap-10">
              <h2 className="text-[55px] font-bold leading-tight">
                {t("makeItReal.title.1")}
                <span className="text-[#7EA310]">{t("makeItReal.title.2")}</span>
              </h2>

              {/* Сітка з 4 елементів (2х2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <h3 className="text-2xl font-semibold border-l-4 border-[#7EA310] pl-4">
                      {t(`makeItReal.grid.${i}.title`)}
                    </h3>
                    <p className="opacity-80 text-base leading-relaxed">
                      {t(`makeItReal.grid.${i}.content`)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Біла картка з кнопкою (Create the future) */}
              <div className='rounded-2xl shadow-xl flex flex-wrap lg:flex-nowrap w-full max-w-[600px] p-6 bg-white justify-between items-center gap-6'>
                <div className='text-2xl md:text-[30px] font-bold text-black'>
                  {t("makeItReal.makeDreamsReality")}
                </div>
                <ButtonGradientSmall text={t("hero.getStarted")} onClick={() => { }} />
              </div>
            </div>

            {/* ПРАВА КОЛОНКА (Твоя галерея з 4 малих і 1 великого фото) */}
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[700px] rounded-3xl overflow-hidden  group">
              <Image
                src="/laptops.png" // Твоє основне зображення
                alt="Main focus"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />


            </div>
          </div>

          {/* НИЖНЯ ЧАСТИНА: КАРУСЕЛЬ (буде під усім верхнім блоком) */}
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

              {/* МАЛІ ЗОБРАЖЕННЯ (перші 4 клітинки зліва: 2 зверху, 2 знизу) */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="relative overflow-hidden rounded-2xl aspect-square shadow-lg">
                  <Image
                    src={`/grid${item}.png`}
                    alt={`Gallery image ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}

              {/* ВЕЛИКЕ ЗОБРАЖЕННЯ (займає 2 останні колонки та 2 рядки) */}
              <div className="col-span-2 row-span-2 md:col-start-3 md:row-start-1 relative overflow-hidden rounded-2xl shadow-xl min-h-[300px] md:min-h-full">
                {/* ВЕЛИКЕ ЗОБРАЖЕННЯ */}
                <div className="col-span-2 row-span-2 md:col-start-3 md:row-start-1 relative overflow-hidden rounded-2xl shadow-xl min-h-[400px] md:min-h-full group">
                  <Image
                    src="/guitar.png"
                    alt="hero focus"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />

                  {/* КОНТЕНТ-ОВЕРЛЕЙ У ПРАВОМУ НИЖНЬОМУ КУТІ */}
                  <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 
                  flex flex-row items-center gap-6 p-4 md:p-6 
                  rounded-2xl shadow-lg border border-white/20"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(4px)' }}>

                    {/* ТЕКСТ (тепер чорний або темно-сірий для контрасту на білому фоні) */}
                    <p className="text-lg md:text-xl font-bold tracking-wide text-black whitespace-nowrap">
                      {t("globalNetwork.sameStyle")}
                    </p>

                    {/* КНОПКА */}
                    <ButtonGradientSmall text={t("getStarted")} onClick={() => { }} />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


    </>
  );
}
