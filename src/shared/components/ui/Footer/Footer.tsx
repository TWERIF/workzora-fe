import { useTranslation } from "react-i18next";
import AvalibleApplestoreIcon from "../../svg/AvalibleApplestoreIcon";
import AvalibleGoogleplayIcon from "../../svg/AvalibleGoogleplayIcon";
import IconFacebookSmall from "../../svg/IconFacebookSmall";
import IconInstagramSmall from "../../svg/IconInstagramSmall";
import IconTelegramSmall from "../../svg/IconTelegramSmall";
import IconYoutubeSmall from "../../svg/IconYoutubeSmall";
import LogoGreenStripes from "../../svg/LogoGreenStripes";
import FooterMeta from "./FooterMeta";
import { useRouter } from "next/router";

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


  const footerData = t("footer", { returnObjects: true }) as any;
  const info = footerData.copyrightInfo as CopyrightInfo;

  return (
    <footer className="bg-[#3B3B3B] text-white pt-12 md:pt-16">
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 xl:gap-32">
          <div className="flex flex-col items-center lg:items-start gap-8">
            <div className="w-40">
              <LogoGreenStripes />
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <AvalibleApplestoreIcon />
              </div>
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <AvalibleGoogleplayIcon />
              </div>
            </div>

            <div className="flex gap-4">
              {icons.map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#7EA310] transition-colors cursor-pointer"
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 lg:gap-10">
            <FooterColumn data={footerData.freelancer} />

            <FooterColumn data={footerData.about} />

            <div className="flex flex-col gap-10">
              <FooterColumn data={{ ...footerData.terms, hrefs: [`/${locale}/privacy-policy`, `/${locale}/terms-and-conditions`] }} />
              <FooterColumn data={footerData.clients} />
            </div>

            <FooterColumn data={footerData.information} />
          </div>
        </div>
      </div>

      <FooterMeta info={info} />
    </footer>
  );
}

const FooterColumn = ({ data }: { data: { title: string; links: string[], hrefs?: string[] } }) => {
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
              href={data.hrefs ? data.hrefs[idx] : "#"}
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
