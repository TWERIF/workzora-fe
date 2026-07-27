import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import AvalibleApplestoreIcon from "../../svg/AvalibleApplestoreIcon";
import AvalibleGoogleplayIcon from "../../svg/AvalibleGoogleplayIcon";
import IconFacebookSmall from "../../svg/IconFacebookSmall";
import IconInstagramSmall from "../../svg/IconInstagramSmall";
import IconTelegramSmall from "../../svg/IconTelegramSmall";
import IconYoutubeSmall from "../../svg/IconYoutubeSmall";
import LogoGreenStripes from "../../svg/LogoGreenStripes";
import FooterMeta from "./FooterMeta";
import LogoRegWhite from "../../svg/LogoRegWhite";
import Logo from "../../svg/Logo";
import { useTheme } from "next-themes";

const icons = [
  IconFacebookSmall,
  IconInstagramSmall,
  IconTelegramSmall,
  IconYoutubeSmall,
];
export interface CopyrightInfo {
  registeredUsers: string;
  registeredUsersText: string;
  totalJobs: string;
  totalJobsText: string;
  trademark: string;
  copyright: string;
}

export default function Footer() {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";


  const footerData = t("footer", { returnObjects: true }) as any;
  const info = footerData.copyrightInfo as CopyrightInfo;
  return (
    <footer className="bg-[#3B3B3B] text-white pt-12 md:pt-16">
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 xl:gap-32">
          <div className="flex flex-col items-center lg:items-start gap-8">
            <div className="w-40">
              {isDark ? <LogoRegWhite /> : <Logo />}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 lg:gap-10">
            <FooterColumn data={{ ...footerData.freelancer, fallback: `/${locale}/coming-soon`, hrefs: [`/${locale}/categories`, "/coming-soon", `/${locale}/freelancers`, `/${locale}/news`] }} />

            <FooterColumn data={{ ...footerData.about, fallback: `/${locale}/coming-soon`, hrefs: [`/${locale}/about-us`, `/${locale}/about-us#how-it-works`, `/${locale}/about-us#benefits`, `/${locale}/about-us#team`, `/${locale}/about-us#vision`, `/${locale}/about-us#contacts`] }} />

            <div className="flex flex-col gap-10">
              <FooterColumn data={{ ...footerData.terms, fallback: `/${locale}/coming-soon`, hrefs: [`/${locale}/privacy-policy`, `/${locale}/terms-and-conditions`, `/${locale}/copyright-policy`, `/${locale}/code-of-conduct`, `/${locale}/fees`] }} />
            </div>

          </div>
        </div>
      </div>

      <FooterMeta info={info} />
    </footer>
  );
}

const FooterColumn = ({ data }: { data: { title: string; links: string[], fallback: string, hrefs?: string[] } }) => {
  if (!data) return null;
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <h4 className="text-base md:text-lg font-bold text-white uppercase tracking-wider">
        {data.title}
      </h4>
      <ul className="flex flex-col gap-2 md:gap-3">
        {data.links.map((link: string, idx: number) => (
          <li key={idx} className="leading-tight">
            {" "}
            <a
              href={data.hrefs && data.hrefs[idx] ? data.hrefs[idx] : data.fallback}
              className="text-sm text-gray-300 hover:text-[#7EA310] transition-all 
                         block w-full break-words whitespace-normal"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
