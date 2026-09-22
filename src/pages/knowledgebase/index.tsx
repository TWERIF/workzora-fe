
import IconSearch from "@/shared/components/svg/IconSearch";
import AiFolderIcon from "@/shared/components/svg/Knowledgebase/AiFolderIcon";
import { ArrowIcon } from "@/shared/components/svg/Knowledgebase/ArrowIcon";
import UsersThreeIcon from "@/shared/components/svg/Knowledgebase/GroupPeople";
import MoneyIcon from "@/shared/components/svg/Knowledgebase/MoneyIcon";
import { PersonSupportIcon } from "@/shared/components/svg/Knowledgebase/PersonSupportIcon";
import RocketIcon from "@/shared/components/svg/Knowledgebase/RocketIcon";
import SolarCaseOutline from "@/shared/components/svg/Knowledgebase/SolarCaseOutline";
import { UserRoundIcon } from "@/shared/components/svg/Knowledgebase/UserRoundIcon";
import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";


interface HelpCategory {
    key: string;
    icon: ReactNode;
    link: string;
}

const categories: HelpCategory[] = [
    { key: "gettingStarted", icon: <RocketIcon />, link: "getting-started" },
    { key: "forClients", icon: <SolarCaseOutline />, link: "#" },
    { key: "forFreelancers", icon: <UsersThreeIcon />, link: "#" },
    { key: "paymentsEscrow", icon: <MoneyIcon />, link: "#" },
    { key: "projectsProposals", icon: <AiFolderIcon />, link: "#" },
    { key: "accountSettings", icon: <UserRoundIcon />, link: "#" },
    { key: "safetyArbitration", icon: <RocketIcon />, link: "#" },
    { key: "technicalSupport", icon: <PersonSupportIcon />, link: "#" },
];

const popularSearches = ["payments", "profile", "project", "arbitration", "proposals"];

export default function HelpKnowledgeBase() {
    const { t } = useTranslation("help");

    const router = useRouter();
    const locale = router.locale || "en";

    return (
        <section className="bg-white dark:bg-bg-dark px-4 py-28">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
                <span className="mb-6 rounded-full bg-gradient px-5 py-2 text-sm font-medium text-text-dark">
                    {t("badge")}
                </span>

                <h1 className="mb-4 text-4xl font-bold text-text dark:text-text-dark md:text-5xl">
                    {t("title")}
                </h1>

                <p className="mb-10 max-w-2xl text-text-light dark:text-text-muted">
                    {t("subtitle")}
                </p>

                <div className="mb-4 flex w-full max-w-2xl items-center rounded-full border border-border bg-input px-2 py-2 shadow-input dark:bg-input-dark dark:shadow-input-dark">
                    <span className="pl-4 text-success">
                        <IconSearch />
                    </span>
                    <input
                        type="text"
                        placeholder={t("searchPlaceholder")}
                        className="flex-1 bg-transparent px-4 text-text outline-none placeholder:text-text-muted dark:text-text-dark"
                    />
                    <ButtonGradient text={t("searchButton")} type="button" className="!px-8 !py-3 text-sm" />
                </div>

                <div className="mb-16 flex flex-wrap items-center justify-center gap-2 text-sm text-text-light dark:text-text-muted">
                    <span>{t("popularSearches")}:</span>
                    {popularSearches.map((item) => (
                        <a key={item} href="#" className="text-success hover:underline">
                            {t(`popular.${item}`)}
                        </a>
                    ))}
                </div>

                <div className="grid w-full grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category, index) => (
                        <Link
                            key={`${category.key}-${index}`}
                            href={`/${locale}/knowledgebase/${category.link}`}
                            className="flex flex-col gap-4 rounded-2xl bg-bg p-6 dark:bg-bg-modalDark dark:shadow-card-dark"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7EA310] text-text-dark">
                                {category.icon}
                            </div>

                            <div className="flex items-center justify-between gap-2">
                                <h3 className="text-lg font-semibold text-text dark:text-text-dark">
                                    {t(`categories.${category.key}.title`)}
                                </h3>
                                <span className="shrink-0 text-success">
                                    <ArrowIcon />
                                </span>
                            </div>

                            <p className="text-sm leading-relaxed text-text-light dark:text-text-muted">
                                {t(`categories.${category.key}.description`)}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}