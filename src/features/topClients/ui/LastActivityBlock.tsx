import { EyeIcon } from "@/features/freelancerProfile/ui/icons";
import NoteTextIcon from "@/shared/components/svg/NoteTextIcon";
import UsdtIcon from "@/shared/components/svg/UsdtIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import type { TopClient } from "../model/types";

const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
};

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const LastActivityBlock = ({ project }: { project: NonNullable<TopClient["lastProject"]> }) => {
    const { t, i18n } = useTranslation("topClients");
    const locale = useRouter().locale ?? "en";
    const tags = project.tags?.length ? project.tags : project.categories?.map((c) => c.title) ?? [];

    return (
        <div className="flex flex-col gap-3">
            <p className="text-xl font-bold text-text dark:text-text-dark">{t("card.lastActivity")}</p>

            <Link
                href={`/${locale}/activeProjects/discussion/${project.id}`}
                className="flex min-w-0 flex-col gap-4 rounded-[24px] bg-bg-header p-4 transition-shadow hover:shadow-card dark:bg-input-dark sm:rounded-[28px] sm:p-9"
            >
                <div className="flex items-start gap-3 sm:gap-6">
                    <p className="min-w-0 flex-1 break-words text-lg font-medium leading-[26px] text-text dark:text-text-dark sm:text-xl">
                        {project.title}
                    </p>
                    <div className="flex shrink-0 items-center gap-3">
                        <UsdtIcon width={28} height={28} />
                        <p className="text-lg font-semibold text-text dark:text-text-dark">
                            {new Intl.NumberFormat(i18n.language).format(Number(project.price))}
                        </p>
                    </div>
                </div>

                <p className="line-clamp-2 text-sm text-text opacity-50 dark:text-text-dark">
                    {stripHtml(project.description)}
                </p>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-[6px]">
                        {tags.slice(0, 5).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-surface px-3 py-[6px] text-center text-xs text-success dark:bg-bg-modalDark"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-text dark:text-text-dark">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-[6px]">
                            <NoteTextIcon className="shrink-0" />
                            {t("card.proposals", { count: project.proposalsCount ?? 0 })}
                        </span>
                        <span className="flex items-center gap-[6px]">
                            <EyeIcon className="size-[18px] shrink-0 text-success" />
                            {new Intl.NumberFormat(i18n.language).format(project.views ?? 0)}
                        </span>
                    </div>
                    <span className="opacity-50">{formatDate(project.createdAt)}</span>
                </div>
            </Link>
        </div>
    );
};
