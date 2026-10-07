import { useAuth } from "@/features/auth/model/useAuth";
import { useSwitchRole } from "@/features/auth/model/useSwitchRole";
import { useUnreadNotifications } from "@/features/notifications/model/useNotifications";
import NavIcon, { NavIconName } from "@/shared/components/svg/NavIcon";
import Link from "next/link";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";


interface NavItem {
    icon: NavIconName;
    labelKey: string;
    href: string;
    accent?: boolean;
}

const primaryItems: NavItem[] = [
    { icon: "profile", labelKey: "profile", href: "/profile" },
    { icon: "chat", labelKey: "chat", href: "/activeProjects" },
    { icon: "bids", labelKey: "bids", href: "/coming-soon" },
    { icon: "reviews", labelKey: "reviews", href: "/coming-soon" },
    { icon: "finances", labelKey: "finances", href: "/payment-data" },
];

const settingsItems: NavItem[] = [
    { icon: "lock", labelKey: "security", href: "/security" },
    { icon: "notifications", labelKey: "notifications", href: "/notifications" },
    { icon: "settings", labelKey: "privacy", href: "/coming-soon" },
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
    const { data: unread } = useUnreadNotifications();
    const unreadCount = unread?.total ?? 0;

    const itemClasses = (isActive: boolean, accent?: boolean) =>
        `flex items-center gap-2 rounded-2xl py-[14px] text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success ${isActive
            ? "bg-success px-6 text-white"
            : `px-3 hover:bg-black/5 dark:hover:bg-white/10 ${accent ? "text-success" : "text-text dark:text-text-dark"}`
        }`;

    const renderItem = (item: NavItem) => {
        const isActive = item.href === activeHref;
        const className = itemClasses(isActive, item.accent);

        const badge = item.icon === "notifications" ? unreadCount : 0;
        const content = (
            <>
                <NavIcon name={item.icon} />
                {t(`nav.${item.labelKey}`)}
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
            <li key={item.labelKey}>
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

    const { user } = useAuth();
    const switchRole = useSwitchRole();
    const canSwitch = user?.role === "client" || user?.role === "freelancer";
    const targetRole = user?.role === "client" ? "freelancer" : "client";
    const targetRoleLabel = t(targetRole === "client" ? "nav.roleClient" : "nav.roleFreelancer");

    const handleSwitchRole = () => {
        if (switchRole.isPending) return;
        if (!window.confirm(t("nav.switchConfirm", { role: targetRoleLabel }))) return;

        switchRole.mutate(undefined, {
            onSuccess: () => toast.success(t("nav.switchSuccess", { role: targetRoleLabel })),
            onError: (error) => {
                const status = error.response?.status;
                const message = error.response?.data?.message ?? "";
                if (status === 429) {
                    const date = message.match(/\d{4}-\d{2}-\d{2}T[\d:.]+Z/)?.[0];
                    toast.error(t("nav.switchTooSoon", {
                        date: date ? new Date(date).toLocaleString(locale) : "",
                    }));
                } else if (status === 409) {
                    toast.error(t("nav.switchActiveDeals"));
                } else {
                    toast.error(t("nav.switchError"));
                }
            },
        });
    };

    return (
        <nav
            aria-label={t("nav.title")}
            className="flex flex-col gap-4 rounded-22 bg-surface p-6 dark:bg-input-dark"
        >
            <h2 className="text-22 font-semibold text-text dark:text-text-dark">
                {t("nav.title")}
            </h2>

            <div className="flex flex-col gap-3">
                <ul className="flex flex-col gap-0.5">{primaryItems.map(renderItem)}</ul>

                <hr className="border-text/10 dark:border-white/10" />

                <ul className="flex flex-col gap-0.5">
                    {settingsItems.map(renderItem)}
                    {canSwitch && (
                        <li>
                            <button
                                type="button"
                                onClick={handleSwitchRole}
                                disabled={switchRole.isPending}
                                className={`${itemClasses(false, true)} w-full text-left disabled:opacity-60`}
                            >
                                <NavIcon name="userSwitch" />
                                {t(targetRole === "client" ? "nav.clientAccount" : "nav.freelancerAccount")}
                            </button>
                        </li>
                    )}
                </ul>

                <hr className="border-text/10 dark:border-white/10" />

                <ul className="flex flex-col gap-0.5">{secondaryItems.map(renderItem)}</ul>
            </div>
        </nav>
    );
};

export default ProfileNavigation;