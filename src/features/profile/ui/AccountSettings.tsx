import BidsIcon from "@/shared/components/svg/AccountSettings/BidsIcon";
import CabinetIcon from "@/shared/components/svg/AccountSettings/CabinetIcon";
import CompetitionsIcon from "@/shared/components/svg/AccountSettings/CompetitionsIcon";
import CorrespondenceIcon from "@/shared/components/svg/AccountSettings/CorrespondenceIcon";
import CustomerProfileIcon from "@/shared/components/svg/AccountSettings/CustomerProfileIcon";
import FinancesIcon from "@/shared/components/svg/AccountSettings/FinancesIcon";
import NewsIcon from "@/shared/components/svg/AccountSettings/NewsIcon";
import PerformerProfileIcon from "@/shared/components/svg/AccountSettings/PerformerProfileIcon";
import PortfolioIcon from "@/shared/components/svg/AccountSettings/PortfolioIcon";
import ProAccountIcon from "@/shared/components/svg/AccountSettings/ProAccountIcon";
import ProfileDescIcon from "@/shared/components/svg/AccountSettings/ProfileDescIcon";
import ReviewsIcon from "@/shared/components/svg/AccountSettings/ReviewsIcon";
import SettingsIcon from "@/shared/components/svg/AccountSettings/SettingsIcon";
import StatisticsIcon from "@/shared/components/svg/AccountSettings/StatisticsIcon";
import SupportIcon from "@/shared/components/svg/AccountSettings/SupportIcon";
import IconArrowSmall from "@/shared/components/svg/IconArrowSmall";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AccountSettings = () => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const locale = router.locale || "en";

  const activePath = router.asPath;

  const mainLinks = [
    {
      name: t("profilePage.settings_menu.cabinet"),
      icon: CabinetIcon,
      link: `/${locale}/profile`,
    },
    {
      name: t("profilePage.settings_menu.correspondence"),
      icon: CorrespondenceIcon,
      link: `/${locale}/activeProjects`,
    },
    {
      name: t("profilePage.settings_menu.bids"),
      icon: BidsIcon,
      link: `/${locale}/bids`,
    },
    {
      name: t("profilePage.settings_menu.competitions"),
      icon: CompetitionsIcon,
      link: `/${locale}/competitions`,
    },
    {
      name: t("profilePage.settings_menu.reviews"),
      icon: ReviewsIcon,
      link: `/${locale}/reviews`,
    },
    {
      name: t("profilePage.settings_menu.finances"),
      icon: FinancesIcon,
      link: `/${locale}/finances`,
    },
    {
      name: t("profilePage.settings_menu.portfolio"),
      icon: PortfolioIcon,
      link: `/${locale}/portfolio`,
    },
    {
      name: t("profilePage.settings_menu.statistics"),
      icon: StatisticsIcon,
      link: `/${locale}/statistics`,
    },
  ];

  const secondaryLinks = [
    {
      name: t("profilePage.settings_menu.profile_desc"),
      icon: ProfileDescIcon,
      link: `/${locale}/settings/description`,
    },
    {
      name: t("profilePage.settings_menu.performer_profile"),
      icon: PerformerProfileIcon,
      link: `/${locale}/settings/performer`,
    },
    {
      name: t("profilePage.settings_menu.customer_profile"),
      icon: CustomerProfileIcon,
      link: `/${locale}/settings/customer`,
    },
    {
      name: t("profilePage.settings_menu.settings"),
      icon: SettingsIcon,
      link: `/${locale}/settings`,
    },
    {
      name: t("profilePage.settings_menu.pro_account"),
      icon: ProAccountIcon,
      link: `/${locale}/pro`,
    },
    {
      name: t("profilePage.settings_menu.support"),
      icon: SupportIcon,
      link: `/${locale}/support`,
    },
    {
      name: t("profilePage.settings_menu.news"),
      icon: NewsIcon,
      link: `/${locale}/news`,
    },
  ];

  const NavItem = ({ link }: { link: any }) => {
    const Icon = link.icon;
    // Перевіряємо, чи є посилання активним
    const isActive =
      activePath === link.link ||
      activePath === link.link?.replace(`/${locale}`, "");

    // Якщо посилання не задане (наприклад, ще в розробці), використовуємо "#" або запобігаємо рендеру
    const href = link.link || "#";

    return (
      <Link href={href}>
        <div
          className={`
          flex items-center gap-3 py-2 px-3 cursor-pointer transition-all rounded-xl group
          ${
            isActive
              ? "bg-gray-100 dark:bg-zinc-800"
              : "hover:bg-gray-50 dark:hover:bg-zinc-800/50"
          }
        `}
        >
          <div
            className={`${isActive ? "text-[#7EA310]" : "text-[#333333] dark:text-gray-400 group-hover:text-black dark:group-hover:text-white"}`}
          >
            <Icon />
          </div>
          <span
            className={`
            text-xs font-medium transition-colors
            ${
              isActive
                ? "text-black dark:text-white font-bold"
                : "text-[#333333] dark:text-gray-300 group-hover:text-black dark:group-hover:text-white"
            }
          `}
          >
            {link.name}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full lg:max-w-[320px] bg-white dark:bg-[#1A1A1A] rounded-[30px] lg:rounded-[40px] p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-zinc-800/50">
      {/* Заголовок-тригер */}
      <div
        className="flex items-center justify-between cursor-pointer lg:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold text-[#333333] dark:text-white tracking-tight">
          {t("profilePage.settings_menu.title")}
        </h2>
        <div className="lg:hidden text-[#333333] dark:text-white transition-transform duration-300">
          <div className={isOpen ? "rotate-180" : "rotate-0"}>
            <IconArrowSmall h={20} w={20} />
          </div>
        </div>
      </div>

      {/* Список посилань */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block mt-6`}>
        <div className="space-y-1 mb-6">
          {mainLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
        </div>

        <hr className="border-t border-gray-100 dark:border-zinc-800 mb-6 mx-2" />

        <div className="space-y-1">
          {secondaryLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
