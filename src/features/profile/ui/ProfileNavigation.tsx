import NavIcon, { NavIconName } from "@/shared/components/svg/NavIcon";
import Link from "next/link";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";


interface NavItem {
    icon: NavIconName;
    labelKey: string;
    href: string;
}

const primaryItems: NavItem[] = [
    { icon: "profile", labelKey: "profile", href: "/profile" },
    { icon: "chat", labelKey: "chat", href: "/chat" },
    { icon: "bids", labelKey: "bids", href: "/bids" },
    { icon: "reviews", labelKey: "reviews", href: "/reviews" },
    { icon: "finances", labelKey: "finances", href: "/payment-data" },
];

const settingsItems: NavItem[] = [
    { icon: "lock", labelKey: "security", href: "/security" },
    { icon: "notifications", labelKey: "notifications", href: "/notifications" },
    { icon: "settings", labelKey: "privacy", href: "/privacy" },
    { icon: "logo", labelKey: "proAccount", href: "/pro" },
];

const secondaryItems: NavItem[] = [
    { icon: "support", labelKey: "support", href: "/support" },
    { icon: "news", labelKey: "news", href: "/news" },
];

interface UserNavigationProps {
    activeHref: string;
    renderLink?: (item: {
        href: string;
        className: string;
        children: ReactNode;
    }) => ReactNode;
}

export const ProfileNavigation = ({
    activeHref,
    renderLink,
}: UserNavigationProps) => {
    const { t, i18n } = useTranslation("finances");
    const locale = i18n.language;

    const itemClasses = (isActive: boolean) =>
        `flex items-center gap-3 rounded-20 px-4 py-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success ${isActive
            ? "bg-success font-medium text-white"
            : "text-text hover:bg-black/5 dark:text-text-dark dark:hover:bg-white/10"
        }`;

    const renderItem = (item: NavItem) => {
        const isActive = item.href === activeHref;
        const className = itemClasses(isActive);

        const content = (
            <>
                <NavIcon name={item.icon} />
                {t(`nav.${item.labelKey}`)}
            </>
        );

        return (
            <li key={item.labelKey}>
                {renderLink ? (
                    renderLink({
                        href: locale + item.href,
                        className,
                        children: content,
                    })
                ) : (
                    <Link
                        href={`${locale}${item.href}`}
                        className={className}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {content}
                    </Link>
                )}
            </li>
        );
    };

    return (
        <nav
            aria-label={t("nav.title")}
            className="rounded-20 bg-[#F5F5F5] p-5 dark:bg-input-dark"
        >
            <h2 className="mb-4 text-xl font-semibold text-text dark:text-text-dark">
                {t("nav.title")}
            </h2>

            <ul className="flex flex-col gap-1">{primaryItems.map(renderItem)}</ul>

            <hr className="my-4 border-border dark:border-white/10" />

            <ul className="flex flex-col gap-1">{settingsItems.map(renderItem)}</ul>

            <hr className="my-4 border-border dark:border-white/10" />

            <ul className="flex flex-col gap-1">{secondaryItems.map(renderItem)}</ul>
        </nav>
    );
};

export default ProfileNavigation;