import { TFunction } from "i18next";
import { Eye, FileText, UserRound } from "lucide-react";
import { Project } from "../model/types";


interface ProjectCardProps {
    project: Project;
    t: TFunction<"common", undefined>;
}

const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
};

export default function ProjectCard({ project, t }: ProjectCardProps) {
    const tags = project.tags?.length
        ? project.tags
        : project.categories?.map((c) => c.title) ?? [];

    return (
        <div className="bg-bg-header dark:bg-bg-modalDark border border-border dark:border-border/20 rounded-20 px-15 py-13 transition-colors duration-200">
            <div className="flex items-start justify-between gap-4">
                <h3 className="font-bold text-lg text-text dark:text-text-dark">
                    {project.title}
                </h3>

                <div className="flex items-center gap-2 shrink-0">
                    <span className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-white text-xs font-bold">
                        T
                    </span>
                    <span className="font-bold text-text dark:text-text-dark">
                        {project.price}
                    </span>
                </div>
            </div>

            <p dangerouslySetInnerHTML={{ __html: project.description }} className="mt-2 text-sm text-text-light dark:text-text-muted line-clamp-2" />


            {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-y-2 text-sm text-text-light dark:text-text-muted">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                        <UserRound size={16} />
                        {project.clientName}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <FileText size={16} />
                        {t("findWork.proposalsCount", {
                            count: project.proposalsCount ?? 0,
                        })}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Eye size={16} />
                        {project.views}
                    </span>
                </div>

                <span>{formatDate(project.createdAt)}</span>
            </div>
        </div>
    );
}