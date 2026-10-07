import Link from "next/link";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import NavIcon, { NavIconName } from "../svg/NavIcon";

interface NavItem {
    key: NavIconName;
    href: string;
}

const primaryItems: NavItem[] = [
    { key: "profile", href: "/profile" },
    { key: "chat", href: "/activeProjects" },
    { key: "bids", href: "/coming-soon" },
    { key: "reviews", href: "/coming-soon" },
    { key: "finances", href: "/payment-data" },
];

const secondaryItems: NavItem[] = [
    { key: "notifications", href: "/notifications" },
    { key: "support", href: "/support" },
    { key: "news", href: "/news" },
];

interface UserNavigationProps {
    activeHref: string;
    notificationsCount?: number;
    renderLink?: (item: {
        href: string;
        className: string;
        children: ReactNode;
    }) => ReactNode;
}

export const UserNavigation = ({
    activeHref,
    notificationsCount = 0,
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

        const badge = item.key === "notifications" ? notificationsCount : 0;
        const content = (
            <>
                <NavIcon name={item.key} />
                {t(`nav.${item.key}`)}
                {badge > 0 && (
                    <span
                        className={`ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold ${
                            isActive ? "bg-white text-success" : "bg-success text-white"
                        }`}
                    >
                        {badge > 99 ? "99+" : badge}
                    </span>
                )}
            </>
        );

        return (
            <li key={item.key}>
                {renderLink ? (
                    renderLink({
                        href: `/${locale}${item.href}`,
                        className,
                        children: content,
                    })
                ) : (
                    <Link
                        href={`/${locale}${item.href}`}
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

            <ul className="flex flex-col gap-1">{secondaryItems.map(renderItem)}</ul>
        </nav>
    );
};

export default UserNavigation;
