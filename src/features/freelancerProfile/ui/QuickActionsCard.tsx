import { useAuth } from "@/features/auth/model/useAuth";
import { useUserRelation } from "@/features/users/model/useUsers";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { BlockIcon, MessageIcon, ReportIcon } from "./icons";

interface QuickActionsCardProps {
    profileId: string;
    profileRole: string;
    primary?: { label: string; href: string };
}

const tileClass = "flex h-[50px] w-full items-center justify-center rounded-[10px] border transition-colors";

function Tile({ label, icon, tone, href, onClick, disabled, title }: {
    label: string;
    icon: ReactNode;
    tone: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    title?: string;
}) {
    const body = <span className={`${tileClass} ${tone}`}>{icon}</span>;
    return (
        <div className="flex flex-col items-center gap-1.5" title={title}>
            {href && !disabled ? (
                <Link href={href} className="w-full" aria-label={label}>
                    {body}
                </Link>
            ) : (
                <button type="button" onClick={onClick} disabled={disabled} aria-label={label} className="w-full disabled:cursor-not-allowed disabled:opacity-50">
                    {body}
                </button>
            )}
            <span className="text-xs text-main-50">{label}</span>
        </div>
    );
}

export const QuickActionsCard = ({ profileId, profileRole, primary }: QuickActionsCardProps) => {
    const { t } = useTranslation("common");
    const { locale = "en", asPath } = useRouter();
    const { user, isAuthenticated } = useAuth();
    const { relation, toggleBlock, isToggling } = useUserRelation(profileId, isAuthenticated);

    if (user?.id === profileId) return null;

    const loginHref = `/${locale}/login?next=${encodeURIComponent(asPath)}`;
    const blocked = relation?.blockedByMe ?? false;
    const chatHref = relation?.sharedProjectId ? `/${locale}/chats/${relation.sharedProjectId}` : undefined;
    const defaultPrimary =
        profileRole === "freelancer"
            ? { label: t("profile.header.offerJob"), href: `/${locale}/create-project` }
            : { label: t("profile.header.viewProjects"), href: "#profile-active" };
    const action = primary ?? defaultPrimary;
    const canUsePrimary = profileRole !== "freelancer" || !user || user.role === "client";

    const onBlock = () => {
        if (!isAuthenticated) return;
        if (!blocked && !window.confirm(t("profile.header.blockConfirm"))) return;
        toggleBlock(!blocked, {
            onSuccess: () => toast.success(t(blocked ? "profile.header.unblocked" : "profile.header.blocked")),
            onError: () => toast.error(t("profile.header.actionError")),
        });
    };

    return (
        <aside className="rounded-22 bg-main-5 p-6 text-main-100">
            <h2 className="text-lg font-medium">{t("profile.header.quickActions")}</h2>

            {canUsePrimary && (
                <Link
                    href={isAuthenticated || action.href.startsWith("#") ? action.href : loginHref}
                    className="mt-4 flex h-[45px] w-full items-center justify-center rounded-full bg-gradient text-sm text-white transition-opacity hover:opacity-90"
                >
                    {action.label}
                </Link>
            )}

            <div className="mt-3 grid grid-cols-3 gap-3">
                <Tile
                    label={t("profile.header.message")}
                    icon={<MessageIcon className="h-5 w-5" />}
                    tone="border-primary/20 bg-primary-10 text-primary hover:border-primary/50"
                    href={isAuthenticated ? chatHref : loginHref}
                    disabled={isAuthenticated && !chatHref}
                    title={isAuthenticated && !chatHref ? t("profile.header.messageUnavailable") : undefined}
                />
                <Tile
                    label={t(blocked ? "profile.header.unblock" : "profile.header.block")}
                    icon={<BlockIcon className="h-5 w-5" />}
                    tone={blocked ? "border-status-danger bg-status-danger text-white" : "border-status-danger/20 bg-status-dangerSoft text-status-danger hover:border-status-danger/50"}
                    href={isAuthenticated ? undefined : loginHref}
                    onClick={onBlock}
                    disabled={isToggling}
                />
                <Tile
                    label={t("profile.header.report")}
                    icon={<ReportIcon className="h-5 w-5" />}
                    tone="border-star/20 bg-star/5 text-star hover:border-star/50"
                    href={`/${locale}/contacts?report=${profileId}`}
                />
            </div>
        </aside>
    );
};
