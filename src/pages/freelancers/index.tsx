import TrustedBy from "@/features/main/ui/TrustedBy";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import ProfileCard from "@/shared/components/ui/Card/ProfileCard";
import Image from "next/image";
import OBJECTS_Image from "../../../public/images/OBJECTS.png";
import OBJECTS1_Image from "../../../public/images/OBJECTS (1).png";
import DESIGN_Image from "../../../public/images/design-example.png";

import { useTheme } from "next-themes";
import IconArrow from "@/shared/components/svg/IconArrow";
import StarIcon from "@/shared/components/svg/StarIcon";
import InfoCard from "@/shared/components/ui/Card/InfoCard";
import DogImage from "@/shared/components/svg/DogImage";
import ButtonGradientSmall from "@/shared/components/ui/Button/ButtonGradientSmall";
import { useTranslation } from "react-i18next";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradientSmall";
import { useUsers } from "@/features/main/model/useUsers";

export default function Freelancers() {
  const { theme } = useTheme();
  const { t } = useTranslation("common");
  const categoriesObj = t("getWorkDone.category", { returnObjects: true });
  const categoryNames = Object.values(categoriesObj);

  const { topFreelancers } = useUsers();
  console.log(topFreelancers);
  return (
    <div className="bg-white text-[#333] dark:bg-[#333333] dark:text-white transition-colors duration-300">
      <section className="relative min-h-[600px] md:min-h-[750px] flex items-center text-white py-12">
        <div className="absolute inset-0 bg-[url('/images/bg-freelancers.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90.2deg,_#7EA310_28.71%,_rgba(126,163,16,0.1)_79.83%)]" />

        <div className="absolute top-0 left-0 w-full z-10">
          <div className="container mx-auto px-4 pt-6">
            <Breadcrumbs />
          </div>
        </div>

        <div className="relative container mx-auto px-4 flex flex-col justify-center h-full z-10">
          <div className="max-w-[550px] flex flex-col gap-5 md:gap-6 text-center md:text-left mt-8 md:mt-12">
            <h1 className="text-3xl sm:text-4xl md:text-[55px] leading-tight md:leading-[1.15] font-bold">
              {t("graphicDesignPage.hero.title")}
            </h1>
            <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed max-w-[520px] mx-auto md:mx-0">
              {t("graphicDesignPage.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-2">
              <button className="bg-white text-black hover:bg-gray-200 transition-colors rounded-2xl px-6 sm:px-8 py-4 font-bold w-full sm:w-auto shadow-lg">
                {t("graphicDesignPage.hero.cta")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <TrustedBy />

      <section className={`py-10 lg:py-16`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl lg:text-[55px] font-bold mb-8 lg:mb-10 text-[#333] dark:text-white leading-tight transition-colors">
            {t("graphicDesignPage.hireSection.title")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div className="flex flex-col gap-10 lg:gap-12">
              <div className="flex flex-col gap-6">
                {topFreelancers?.slice(0, 3).map((p) => (
                  <ProfileCard profile={p} key={p.id} />
                ))}
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h3 className="text-xl md:text-2xl font-bold text-[#333] dark:text-white mb-3 md:mb-4 transition-colors">
                  {t("graphicDesignPage.hireSection.cardTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg mb-6 transition-colors">
                  {t("graphicDesignPage.hireSection.cardText")}
                </p>
                <Image
                  src={OBJECTS1_Image}
                  alt="objects image"
                  width={310}
                  height={215}
                  className="w-full max-w-[310px] h-auto object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col gap-10 lg:gap-12">
              <div className="prose prose-slate dark:prose-invert max-w-none flex flex-col gap-6">
                <Image
                  src={OBJECTS_Image}
                  alt="objects image"
                  width={650}
                  height={270}
                  className="w-full max-w-[650px] h-auto object-contain"
                />
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#333] dark:text-white mb-3 md:mb-4 transition-colors">
                    {t("graphicDesignPage.hireSection.whatIsTitle")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg transition-colors">
                    {t("graphicDesignPage.hireSection.whatIsText")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                {topFreelancers?.slice(3, 5).map((p, idx) => (
                  <ProfileCard profile={p} key={`right-${idx}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-12 lg:mt-16 flex items-center justify-center gap-2 group cursor-pointer w-fit p-2">
            <span className="text-sm font-semibold text-[#7EA310] group-hover:underline transition-all">
              {t("graphicDesignPage.seeMore.designers")}
            </span>
            <div className="transform group-hover:translate-x-1 transition-transform flex items-center">
              <IconArrow />
            </div>
          </div>
        </div>
      </section>

      <section
        className={`relative container rounded-3xl bg-[#333333] text-white overflow-hidden shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)] mx-4 lg:mx-auto`}
      >
        <div className="px-6 py-8 md:px-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative">
          <div className="flex flex-col gap-4 z-10 text-center md:text-left relative w-full">
            <h2 className="text-4xl md:text-5xl lg:text-[55px] font-bold max-w-[650px] leading-tight md:leading-[1.1]">
              {t("graphicDesignPage.rating.title")}
            </h2>
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} w={26} h={28} />
                ))}
              </div>
              <div className="flex text-base items-center gap-2 mt-1">
                <span className="font-bold">4.9</span>
                <span className="opacity-70 italic">
                  {t("graphicDesignPage.rating.outOf")}
                </span>
              </div>
              <p className="text-sm md:text-base opacity-60 tracking-wide">
                {t("graphicDesignPage.rating.reviews")}
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-full h-full max-w-[400px] flex justify-end items-center opacity-20 md:opacity-100 pointer-events-none z-0">
            <ClientsRateSvgBg />
          </div>
        </div>
      </section>

      <section className="mx-auto container px-4 mt-16 md:mt-24 flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="flex-1">
          <h2 className="text-3xl md:text-[40px] font-bold leading-tight text-black dark:text-white transition-colors">
            {t("graphicDesignPage.article.title")}
            <span className="text-success">
              {t("graphicDesignPage.article.highlight")}
            </span>
          </h2>

          <div className="flex flex-col gap-5 py-8 md:py-12 text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg transition-colors">
            <div>{t("graphicDesignPage.article.sections.intro")}</div>

            <div>
              {t("graphicDesignPage.article.sections.applicationsTitle")}
            </div>
            <ul className="list-disc ml-5 space-y-2 text-[#333] dark:text-gray-300">
              {(
                t("graphicDesignPage.article.sections.applications", {
                  returnObjects: true,
                }) as string[]
              ).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div>{t("graphicDesignPage.article.sections.techIntro")}</div>

            <div>
              <div className="mb-2 font-bold">
                {t("graphicDesignPage.article.sections.skillsTitle")}
              </div>
              <ul className="list-disc ml-5 space-y-2 text-[#333] dark:text-gray-300">
                {(
                  t("graphicDesignPage.article.sections.skills", {
                    returnObjects: true,
                  }) as string[]
                ).map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div>{t("graphicDesignPage.article.sections.valueAdded")}</div>
            <div>{t("graphicDesignPage.article.sections.software")}</div>
            <div>{t("graphicDesignPage.article.sections.decision")}</div>
            <div>{t("graphicDesignPage.article.sections.market")}</div>
            <div>{t("graphicDesignPage.article.sections.hireNow")}</div>

            {/* FAQ блоки */}
            <h3 className="text-black dark:text-white font-bold text-xl mt-4 transition-colors">
              {t("graphicDesignPage.article.whatDoes.title")}
            </h3>
            <div>{t("graphicDesignPage.article.whatDoes.text")}</div>

            <h3 className="text-black dark:text-white font-bold text-xl mt-4 transition-colors">
              {t("graphicDesignPage.article.whyHire.title")}
            </h3>
            <div>{t("graphicDesignPage.article.whyHire.text1")}</div>
            <div>{t("graphicDesignPage.article.whyHire.text2")}</div>

            <h3 className="text-black dark:text-white font-bold text-xl mt-4 transition-colors">
              {t("graphicDesignPage.article.rights.title")}
            </h3>
            <div>{t("graphicDesignPage.article.rights.text")}</div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10 w-full lg:w-1/3 xl:w-[400px] shrink-0">
          <InfoCard />
          <InfoCard />

          <div className="mx-auto flex items-center justify-center gap-2 group cursor-pointer w-fit p-2">
            <span className="text-sm font-semibold text-[#7EA310] group-hover:underline transition-all">
              {t("community.showAll")}
            </span>
            <div className="transform group-hover:translate-x-1 transition-transform flex items-center">
              <IconArrow />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-success mb-10 md:mb-20 overflow-hidden">
        <div className="z-0 absolute bottom-0 left-0 pointer-events-none opacity-50 md:opacity-100">
          <GreenSectionSvgLeft />
        </div>
        <div className="absolute top-0 right-0 z-0 pointer-events-none opacity-50 md:opacity-100">
          <GreenSectionSvgRight />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 py-12 md:py-16">
          <div className="shrink-0">
            <DogImage w={217} h={360} />
          </div>

          <div className="flex flex-col gap-5 text-center md:text-left items-center md:items-start max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-[55px] leading-tight font-bold text-black tracking-tight">
              {
                t("graphicDesignPage.cta.title").split(
                  t("graphicDesignPage.cta.highlight"),
                )[0]
              }
              <span className="text-white">
                {t("graphicDesignPage.cta.highlight")}
              </span>
              {
                t("graphicDesignPage.cta.title").split(
                  t("graphicDesignPage.cta.highlight"),
                )[1]
              }
            </h2>
            <p className="text-white text-base md:text-lg opacity-90">
              {t("graphicDesignPage.cta.subtitle")}
            </p>
            <button className="bg-white text-black hover:bg-gray-200 transition-colors rounded-2xl px-6 sm:px-8 py-4 font-bold w-full sm:w-auto shadow-lg mt-2">
              {t("graphicDesignPage.cta.button")}
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto container px-4 pt-10 md:pt-16">
        <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-8 text-[#333] dark:text-white transition-colors">
          {t("graphicDesignPage.showcase.title")}{" "}
          <br className="hidden md:block" />
          <span className="text-success block mt-2 text-xl md:text-2xl lg:text-[32px]">
            {t("graphicDesignPage.showcase.subtitle")}
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col bg-white dark:bg-[#222222]"
            >
              <div className="relative w-full h-[200px] overflow-hidden shrink-0">
                <Image
                  src={DESIGN_Image}
                  alt="design example"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col justify-between grow gap-2">
                <h3 className="text-lg font-semibold text-[#333] dark:text-white transition-colors">
                  {t("graphicDesignPage.showcase.category")}
                </h3>
                <div className="text-success mt-auto font-medium">
                  50 USDT in 12 days
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto flex justify-center mt-10 md:mt-12 mb-16 md:mb-24">
          <ButtonGradient
            text={t("graphicDesignPage.showcase.cta")}
            onClick={() => {}}
          />
        </div>
      </section>

      <section className="mx-auto container px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-[150px] mb-16 md:mb-[80px]">
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight text-[#333] dark:text-white transition-colors">
              {t("graphicDesignPage.marketplace.title")}
            </h2>
            <p className="text-[#333] dark:text-gray-200 text-2xl md:text-3xl lg:text-[40px] leading-snug md:leading-tight transition-colors">
              {t("graphicDesignPage.marketplace.subtitle")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-8 sm:gap-12 lg:gap-10 shrink-0 lg:pt-4">
            <div className="flex flex-col gap-1">
              <div className="text-success text-5xl md:text-[60px] font-bold leading-none">
                82.9M
              </div>
              <div className="text-lg md:text-xl font-bold tracking-wide text-gray-800 dark:text-gray-300 transition-colors">
                {t("graphicDesignPage.marketplace.stats.users")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[url('/images/bg-main4.png')] bg-cover bg-center py-16 md:py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr,1fr] gap-12">
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
    </div>
  );
}
function ClientsRateSvgBg() {
  return (
    <svg
      width="392"
      height="274"
      viewBox="0 0 392 274"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto object-cover"
    >
      <g opacity="0.53">
        <path
          opacity="0.4233"
          d="M391.999 56.0273L283.15 63.6035L350.977 146.692L391.999 106.088V56.0273Z"
          fill="#7EA310"
        />
        <path
          opacity="0.0654"
          d="M391.999 169.019L351.361 202.752L391.999 205.148V169.019Z"
          fill="#7EA310"
        />
        <path
          opacity="0.438"
          d="M196.23 0L206.351 21.3159L214.999 0H196.23Z"
          fill="#7EA310"
        />
        <path
          opacity="0.6882"
          d="M125.383 0L141.477 128.009L208.288 48.1007L143.4 0H125.383Z"
          fill="#7EA310"
        />
        <path
          opacity="0.1537"
          d="M392 82.7549L357.414 139.618L392 132.223V82.7549Z"
          fill="#7EA310"
        />
        <path
          opacity="0.1911"
          d="M392 255.204L384.266 264.718L392 274V255.204Z"
          fill="#7EA310"
        />
        <path
          opacity="0.8695"
          d="M392 126.455L278.775 96.5967L392 189.38V126.455Z"
          fill="#7EA310"
        />
        <path
          opacity="0.7108"
          d="M3.63591 0L0 3.32761L143.189 14.0562L139.811 0H3.63591Z"
          fill="#7EA310"
        />
        <path
          opacity="0.9801"
          d="M391.999 97.7888L378.219 94.7832L391.999 115.608V97.7888Z"
          fill="#7EA310"
        />
        <path
          opacity="0.9315"
          d="M391.999 70.9756L217.049 98.7434L388.484 170.606L391.999 155.121V70.9756Z"
          fill="#7EA310"
        />
        <path
          opacity="0.9468"
          d="M392.001 58.1462L336.645 39.4404L392.001 96.2584V58.1462Z"
          fill="#7EA310"
        />
        <path
          opacity="0.3188"
          d="M282.225 0L221.965 41.2477L267.261 142.969L318.265 0H282.225Z"
          fill="#7EA310"
        />
        <path
          opacity="0.7057"
          d="M391.998 42.6035L313.156 49.9536L323.667 151.11L391.998 72.7102V42.6035Z"
          fill="#7EA310"
        />
        <path
          opacity="0.326"
          d="M392.001 81.2306L383.263 58.8525L337.961 151.161L392.001 174.647V81.2306Z"
          fill="#7EA310"
        />
        <path
          opacity="0.4273"
          d="M392 44.3606L357.847 0H356.597L328.621 162.392L392 162.336V44.3606Z"
          fill="#7EA310"
        />
        <path
          opacity="0.177"
          d="M189.723 0L190.985 8.01678L225.054 0H189.723Z"
          fill="#7EA310"
        />
        <path
          opacity="0.8907"
          d="M23.5703 0L29.8686 83.9135L107.118 0H23.5703Z"
          fill="#7EA310"
        />
        <path
          opacity="0.4"
          d="M366.278 114.178L251.005 75.54L238.793 245.666L366.278 114.178Z"
          fill="#7EA310"
        />
        <path
          opacity="0.1567"
          d="M276.173 0L246.004 89.9699L351.379 17.6324L342.827 0H276.173Z"
          fill="#7EA310"
        />
        <path
          opacity="0.6256"
          d="M114.648 144.313L234.398 98.9862L51.5391 32.8125L114.648 144.313Z"
          fill="#7EA310"
        />
        <path
          opacity="0.2941"
          d="M391.999 17.0787L362.094 0H331.943L283.186 75.7668L391.999 49.7221V17.0787Z"
          fill="#7EA310"
        />
        <path
          opacity="0.5946"
          d="M392 179.855L262.369 179.353L392 258.825V179.855Z"
          fill="#7EA310"
        />
        <path
          opacity="0.114"
          d="M87.6836 164.086L194.976 226.452L187.969 5.0332L87.6836 164.086Z"
          fill="#7EA310"
        />
        <path
          opacity="0.2641"
          d="M153.699 87.5231L192.907 199.922L287.549 86.1729L153.699 87.5231Z"
          fill="#7EA310"
        />
        <path
          opacity="0.4736"
          d="M60.8613 0L122.72 76.795L137.468 0H60.8613Z"
          fill="#7EA310"
        />
        <path
          opacity="0.5903"
          d="M392 30.5595L389.398 27.4014L297.178 113.569L392 111.241V30.5595Z"
          fill="#7EA310"
        />
        <path
          opacity="0.7344"
          d="M33.9498 0L11.3711 9.31054L272.051 83.8683L171.435 0H33.9498Z"
          fill="#7EA310"
        />
        <path
          opacity="0.4711"
          d="M161.688 0L237.723 81.7892L361.939 47.225L228.811 0H161.688Z"
          fill="#7EA310"
        />
        <path
          opacity="0.1647"
          d="M37.1523 0L54.6648 45.3098L71.979 0H37.1523Z"
          fill="#7EA310"
        />
      </g>
    </svg>
  );
}

function GreenSectionSvgLeft() {
  return (
    <svg
      width="399"
      height="320"
      viewBox="0 0 399 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4233"
        d="M310.468 106.795L363.734 206.202L238.203 161.55L310.468 106.795Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7058"
        d="M106.514 320L92.7832 311.561L254.546 289.336L222.233 320H106.514Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.438"
        d="M112.426 248.257L168.245 180.313L180.21 304.205L112.426 248.257Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.6882"
        d="M175.892 158.367L94.9824 192.569L141.771 77.2682L175.892 158.367Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.4431"
        d="M313.692 226.046L274.471 304.795L235.125 186.736L313.692 226.046Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7393"
        d="M53.5449 320L100.985 254.922L248.506 290.968L162.188 320H53.5449Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.1424"
        d="M56.4238 320L104.685 298.02L95.4313 320H56.4238Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7108"
        d="M117.006 172.769L68.4332 263.879L2.17773 150.885L117.006 172.769Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.6939"
        d="M158.204 320L130.428 254.589L272.837 297.465L209.656 320H158.204Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.8745"
        d="M8.92773 283.117L40.8888 201.137L90.7184 315.151L8.92773 283.117Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.9315"
        d="M345.384 94.9042L340.162 185.739L194.373 117.974L345.384 94.9042Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.3188"
        d="M185.066 167.039L243.92 91.8692L252.851 251.967L185.066 167.039Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7057"
        d="M258.627 179.409L290.053 97.2228L340.62 210.905L258.627 179.409Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.629"
        d="M122.24 320L209.964 232.603L209.701 320H122.24Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7775"
        d="M0 218.217L160.517 270.56L105.815 320H43.1455L0 243.594V218.217Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.5834"
        d="M0 218.846V176.412L37.5682 172.523L0 218.846Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.6548"
        d="M0 228.245V190.191L84.7587 192.109L0 228.245Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.326"
        d="M301.277 100.258L387.904 85.8194L315.682 187.08L301.277 100.258Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.237"
        d="M118.495 320L61.9785 301.025L225.39 255.064L244.98 320H118.495Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.2399"
        d="M228.734 320L217.666 264.803L303.761 247.46L255.607 320H228.734Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.177"
        d="M153.132 188.104L238.814 236.385L112.961 279.424L153.132 188.104Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7945"
        d="M166.371 320L154.711 260.515L268.758 237.272L210.297 320H166.371Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.0801"
        d="M260.299 214.702L329.19 160.122L314.752 283.752L260.299 214.702Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.8907"
        d="M14.8809 173.051L44.0766 90.0403L97.6952 202.313L14.8809 173.051Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.0823"
        d="M378.276 320L286.816 273.348L292.766 134.822L379.266 320H378.276Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.9348"
        d="M14.6074 320L31.9008 276.253L104.963 320H14.6074Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.8306"
        d="M23.2969 320L40.0618 283.496L60.9316 320H23.2969Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.4"
        d="M315.028 137.227L215.711 144.663L245.103 0L315.028 137.227Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.1567"
        d="M281.218 214.625L220.928 286.85L215.092 131.538L281.218 214.625Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.6256"
        d="M124.448 57.8809L208.054 121.514L49.375 137.371L124.448 57.8809Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.2941"
        d="M265.401 237.418L241.021 151.403L349.854 213.308L265.401 237.418Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.8615"
        d="M144.758 205.834L157.066 292.979L57.8125 218.168L144.758 205.834Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7789"
        d="M0 223.688L118.511 279.946L80.2318 320H36.4681L0 245.097V223.688Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.114"
        d="M107.822 35.5652L206.311 6.60873L150.084 189.95L107.822 35.5652Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.868"
        d="M164.521 320L210.22 248.091L259.162 320H164.521Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.0534"
        d="M398.848 51.9203L394.963 42.4045L398.848 43.4315V51.9203Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.2641"
        d="M142.086 113.703L198.613 28.3095L246.827 143.657L142.086 113.703Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.9732"
        d="M0 297.03V236.441L72.0919 275.362L0 297.03Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.4736"
        d="M23.4355 186.535L115.32 115.982L103.897 243.661L23.4355 186.535Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.5903"
        d="M313.296 214.659L260.658 122.86L385.302 160.595L313.296 214.659Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7344"
        d="M91.5519 212.454L12.4668 148.342L234.134 142.243L91.5519 212.454Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7418"
        d="M33.2383 320L43.964 306.413L50.3821 320H33.2383Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.4711"
        d="M206.721 136.584L296.289 192.193L94.2422 211.036L206.721 136.584Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.1647"
        d="M0 249.587V204.807L54.6955 127.613L64.5504 255.311L0 249.587Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.3844"
        d="M0 217.716L99.3965 213.707L59.1227 320H52.7644L0 252.788V217.716Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.8632"
        d="M15.957 320L48.4267 218.384L132.936 290.761L35.3112 320H15.957Z"
        fill="black"
        fillOpacity="0.08"
      />
    </svg>
  );
}

function GreenSectionSvgRight() {
  return (
    <svg
      width="399"
      height="319"
      viewBox="0 0 399 319"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4233"
        d="M88.3805 212.539L35.1142 113.443L160.645 157.955L88.3805 212.539Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7058"
        d="M292.335 1.20035e-06L306.065 8.4126L144.302 30.569L176.615 1.13169e-05L292.335 1.20035e-06Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.438"
        d="M286.423 71.5197L230.604 139.251L218.638 15.7461L286.423 71.5197Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.6882"
        d="M222.956 161.13L303.866 127.035L257.078 241.975L222.956 161.13Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.4431"
        d="M85.1568 93.6614L124.377 15.1582L163.723 132.848L85.1568 93.6614Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7393"
        d="M345.303 0L297.864 64.8754L150.343 28.9421L236.66 9.49788e-06L345.303 0Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.1424"
        d="M342.425 0L294.164 21.9112L303.417 3.41014e-06L342.425 0Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7108"
        d="M281.842 146.771L330.415 55.9453L396.671 168.586L281.842 146.771Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.6939"
        d="M240.646 2.4283e-06L268.423 65.2067L126.014 22.4645L189.195 6.92633e-06L240.646 2.4283e-06Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.8745"
        d="M389.921 36.7681L357.96 118.492L308.13 4.83399L389.921 36.7681Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.9315"
        d="M53.4645 224.394L58.6861 133.844L204.475 201.396L53.4645 224.394Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.3188"
        d="M213.782 152.485L154.928 227.42L145.998 67.8223L213.782 152.485Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7057"
        d="M140.221 140.151L108.795 222.08L58.228 108.754L140.221 140.151Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.629"
        d="M276.608 0L188.885 87.1245L189.147 7.64608e-06L276.608 0Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7775"
        d="M398.848 101.465L238.332 49.2861L293.034 9.25061e-06L355.703 3.7719e-06L398.848 76.1673L398.848 101.465Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.5834"
        d="M398.848 100.84L398.848 143.141L361.28 147.018L398.848 100.84Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.6548"
        d="M398.848 91.4688L398.848 129.403L314.09 127.491L398.848 91.4688Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.326"
        d="M97.571 219.055L10.9444 233.448L83.1659 132.504L97.571 219.055Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.237"
        d="M280.353 4.94086e-06L336.87 18.9159L173.458 64.7329L153.868 1.59985e-05L280.353 4.94086e-06Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.2399"
        d="M170.116 9.67601e-07L181.184 55.0248L95.0894 72.3139L143.244 3.31686e-06L170.116 9.67601e-07Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.177"
        d="M245.717 131.484L160.034 83.3538L285.887 40.4492L245.717 131.484Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7945"
        d="M232.478 1.01932e-06L244.137 59.299L130.09 82.4693L188.551 4.8595e-06L232.478 1.01932e-06Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.0801"
        d="M138.55 104.97L69.6584 159.378L84.0967 36.1348L138.55 104.97Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.8907"
        d="M383.968 146.489L354.772 229.24L301.153 117.318L383.968 146.489Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.0823"
        d="M20.5726 7.99563e-06L112.032 46.5062L106.082 184.6L19.5821 8.08222e-06L20.5726 7.99563e-06Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.9348"
        d="M384.241 0L366.948 43.6103L293.885 7.89916e-06L384.241 0Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.8306"
        d="M375.551 0L358.787 36.3905L337.917 3.29013e-06L375.551 0Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.4"
        d="M83.8207 182.201L183.137 174.789L153.746 318.999L83.8207 182.201Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.1567"
        d="M117.631 105.046L177.92 33.0469L183.757 187.873L117.631 105.046Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.6256"
        d="M274.402 261.301L190.797 197.867L349.475 182.059L274.402 261.301Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.2941"
        d="M133.447 82.3242L157.827 168.07L48.9943 106.359L133.447 82.3242Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.8615"
        d="M254.088 113.81L241.78 26.9375L341.034 101.514L254.088 113.81Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7789"
        d="M398.848 96.0109L280.337 39.9292L318.617 7.01409e-06L362.38 3.18814e-06L398.848 74.6696L398.848 96.0109Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.114"
        d="M291.026 283.546L192.537 312.412L248.765 129.645L291.026 283.546Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.868"
        d="M234.327 0L188.629 71.6843L139.687 8.27371e-06L234.327 0Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.0534"
        d="M1.85966e-05 267.242L3.88547 276.728L1.93364e-05 275.704L1.85966e-05 267.242Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.2641"
        d="M256.762 205.653L200.236 290.779L152.021 175.793L256.762 205.653Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.9732"
        d="M398.848 22.8984L398.848 83.2975L326.756 44.4982L398.848 22.8984Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.4736"
        d="M375.413 133.048L283.528 203.381L294.952 76.1016L375.413 133.048Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.5903"
        d="M85.5521 105.014L138.19 196.525L13.5465 158.909L85.5521 105.014Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7344"
        d="M307.295 107.211L386.38 171.122L164.713 177.202L307.295 107.211Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.7418"
        d="M365.612 0L354.886 13.545L348.468 1.49876e-06L365.612 0Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.4711"
        d="M192.129 182.844L102.561 127.408L304.608 108.625L192.129 182.844Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.1647"
        d="M398.848 70.1939L398.848 114.835L344.153 191.787L334.298 64.4883L398.848 70.1939Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.3844"
        d="M398.848 101.965L299.452 105.961L339.726 5.16867e-06L346.084 4.61281e-06L398.848 67.0026L398.848 101.965Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        opacity="0.8632"
        d="M382.891 0L350.422 101.299L265.912 29.1475L363.537 1.69199e-06L382.891 0Z"
        fill="black"
        fillOpacity="0.08"
      />
    </svg>
  );
}
