import ButtonPill from "@/shared/components/ui/Button/ButtonPill";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ProfileCompletionCardProps {
    progress: number;
    actionHref?: string;
    actions?: ReactNode;
    variant?: "freelancer" | "client";
}

export const ProfileCompletionCard = ({ progress, actionHref, actions, variant = "freelancer" }: ProfileCompletionCardProps) => {
    const { t } = useTranslation("profile");

    return (
        <section className="flex flex-col gap-4 rounded-22 bg-surface p-6 dark:bg-input-dark">
            <h3 className="text-22 font-semibold text-text dark:text-text-dark">
                {t(variant === "client" ? "completion.clientTitle" : "completion.title")}
            </h3>
            <p className="text-sm text-text dark:text-text-dark">{t(variant === "client" ? "completion.clientDescription" : "completion.description")}</p>

            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold leading-[21px] text-text dark:text-text-dark">
                    {t("completion.label")} <span className="text-success">{progress}%</span>
                </p>
                <div
                    className="h-2.5 w-full rounded-full bg-border-light dark:bg-white/10"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div className="h-2.5 rounded-full bg-success" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-text-light">{t(variant === "client" ? "completion.clientHint" : "completion.hint")}</p>
            </div>

            {actions ?? (actionHref && <ButtonPill href={actionHref} text={t("completion.action")} className="w-full" />)}
        </section>
    );
};

export default ProfileCompletionCard;
