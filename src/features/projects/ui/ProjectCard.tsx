import { Eye, FileText, Flame, Star, UserRound } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Project } from "../model/types";

const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const pad = (part: number) => String(part).padStart(2, "0");
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
};

export default function ProjectCard({ project }: { project: Project }) {
    const { t } = useTranslation("findWork");
    const tags = project.tags?.length ? project.tags : project.categories?.map((c) => c.title) ?? [];

    return (
        <article className="relative rounded-20 border border-border bg-bg-header px-15 py-13 transition-colors duration-200 hover:border-primary dark:border-border/20 dark:bg-bg-modalDark">
            {(project.isFeatured || project.isUrgent) && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                    {project.isFeatured && (
                        <span className="flex items-center gap-1 rounded-md bg-status-warningSoft px-2 py-0.5 text-[11px] font-medium text-status-warning">
                            <Star size={12} fill="currentColor" />
                            {t("findWork.featured")}
                        </span>
                    )}
                    {project.isUrgent && (
                        <span className="flex items-center gap-1 rounded-md bg-primary-10 px-2 py-0.5 text-[11px] font-medium text-primary">
                            <Flame size={12} />
                            {t("findWork.asap")}
                        </span>
                    )}
                </div>
            )}

            <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-text dark:text-text-dark">
                    <Link href={`/activeProjects/discussion/${project.id}`} className="after:absolute after:inset-0 hover:text-primary">
                        {project.title}
                    </Link>
                </h3>

                <div className="flex shrink-0 items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-xs font-bold text-white">T</span>
                    <span className="font-bold text-text dark:text-text-dark">{project.price}</span>
                </div>
            </div>

            <p dangerouslySetInnerHTML={{ __html: project.description }} className="mt-2 line-clamp-2 text-sm text-text-light dark:text-text-muted" />

            {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-y-2 text-sm text-text-light dark:text-text-muted">
                <div className="flex flex-wrap items-center gap-4">
                    {project.clientName && (
                        <span className="flex items-center gap-1.5">
                            <UserRound size={16} />
                            {project.clientName}
                        </span>
                    )}
                    <span className="flex items-center gap-1.5">
                        <FileText size={16} />
                        {t("findWork.proposalsCount", { count: project.proposalsCount ?? 0 })}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Eye size={16} />
                        {project.views}
                    </span>
                </div>

                <span>{formatDate(project.createdAt)}</span>
            </div>
        </article>
    );
}
