"use client";

import ButtonGradient from "@/shared/components/ui/Button/ButtonGradient";
import { useTranslation } from "react-i18next";


const CHECKLIST_ITEMS = ["goal", "scope", "budget", "files"] as const;

interface ProjectBriefChecklistProps {
    isPending: boolean;
}

export default function ProjectBriefChecklist({ isPending }: ProjectBriefChecklistProps) {
    const { t } = useTranslation("createProject");

    return (
        <aside className="rounded-20 bg-bg p-6 dark:bg-bg-modalDark">
            <h2 className="text-2xl font-semibold text-text dark:text-text-dark">
                {t("checklist.title")}
            </h2>

            <p className="mt-5 text-sm text-text dark:text-text-dark">
                {t("checklist.description")}
            </p>

            <p className="mt-5 text-sm font-semibold text-text dark:text-text-dark">
                {t("checklist.list_title")}
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-[18px] text-xs text-text marker:text-text-muted dark:text-text-dark">
                {CHECKLIST_ITEMS.map((item) => (
                    <li key={item}>{t(`checklist.items.${item}`)}</li>
                ))}
            </ul>

            <ButtonGradient
                type="submit"
                disabled={isPending}
                text={isPending ? t("form.button_creating") : t("form.button_create")}
                className="mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
            />
        </aside>
    );
}
