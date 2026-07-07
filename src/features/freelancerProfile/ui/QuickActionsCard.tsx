import { useTranslation } from "react-i18next";
import { BlockIcon, MessageIcon, ReportIcon } from "./icons";

interface QuickActionsCardProps {
    onOfferJob?: () => void;
    onMessage?: () => void;
    onBlock?: () => void;
    onReport?: () => void;
}

export const QuickActionsCard = ({
    onOfferJob,
    onMessage,
    onBlock,
    onReport,
}: QuickActionsCardProps) => {
    const { t } = useTranslation("common");

    const actions = [
        { label: t("profile.header.message"), icon: MessageIcon, onClick: onMessage },
        { label: t("profile.header.block"), icon: BlockIcon, onClick: onBlock },
        { label: t("profile.header.report"), icon: ReportIcon, onClick: onReport },
    ];

    return (
        <aside className="rounded-20 border border-border bg-bg-header px-15 py-13 shadow-input dark:bg-bg-modalDark dark:shadow-input-dark">
            <h2 className="text-sm font-semibold text-text dark:text-text-dark">
                {t("profile.header.quickActions")}
            </h2>

            <button
                type="button"
                onClick={onOfferJob}
                className="mt-3 w-full rounded-20 bg-gradient py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
                {t("profile.header.offerJob")}
            </button>

            <div className="mt-3 grid grid-cols-3 gap-2">
                {actions.map(({ label, icon: Icon, onClick }) => (
                    <button
                        key={label}
                        type="button"
                        onClick={onClick}
                        title={label}
                        className="flex flex-col items-center gap-1 rounded-20 border border-border py-2 text-text-muted transition-colors hover:text-error"
                    >
                        <Icon className="h-4 w-4" />
                        <span className="text-[11px]">{label}</span>
                    </button>
                ))}
            </div>
        </aside>
    );
};