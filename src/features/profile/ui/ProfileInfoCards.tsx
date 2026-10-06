import ArrowUpRightIcon from "@/shared/components/svg/Profile/ArrowUpRightIcon";
import GiftIcon from "@/shared/components/svg/Profile/GiftIcon";
import RocketIcon from "@/shared/components/svg/Profile/RocketIcon";
import SettingsIcon from "@/shared/components/svg/Profile/SettingsIcon";
import ShoppingBagIcon from "@/shared/components/svg/Profile/ShoppingBagIcon";
import { Icon } from "@iconify/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface InfoCard {
    key: string;
    icon: ReactNode;
    href: string;
}

// Figma exported the megaphone and users-three layers empty, so those two are
// rendered through Iconify by the exact icon names used in the design.
const cards: InfoCard[] = [
    { key: "achievements", icon: <RocketIcon />, href: "/coming-soon" },
    { key: "store", icon: <ShoppingBagIcon />, href: "/coming-soon" },
    { key: "advertising", icon: <Icon icon="hugeicons:megaphone-01" width={24} height={24} className="text-white" />, href: "/coming-soon" },
    { key: "settings", icon: <SettingsIcon />, href: "/profile/settings" },
    { key: "affiliate", icon: <Icon icon="ph:users-three" width={24} height={24} className="text-white" />, href: "/coming-soon" },
    { key: "bonuses", icon: <GiftIcon />, href: "/payment-data" },
];

export const ProfileInfoCards = () => {
    const { t, i18n } = useTranslation("profile");
    const locale = i18n.language;

    return (
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
                <Link
                    key={card.key}
                    href={`/${locale}${card.href}`}
                    className="group flex flex-col gap-6 rounded-3xl bg-surface p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success dark:bg-input-dark"
                >
                    <span className="flex size-14 items-center justify-center rounded-18 bg-success">
                        {card.icon}
                    </span>
                    <span className="flex flex-col gap-[6px]">
                        <span className="flex items-center gap-[6px]">
                            <span className="flex-1 text-xl font-medium leading-[26px] text-text dark:text-text-dark">
                                {t(`overview.cards.${card.key}.title`)}
                            </span>
                            <ArrowUpRightIcon className="shrink-0" />
                        </span>
                        <span className="text-sm text-text opacity-50 dark:text-text-dark">
                            {t(`overview.cards.${card.key}.description`)}
                        </span>
                    </span>
                </Link>
            ))}
        </section>
    );
};

export default ProfileInfoCards;
