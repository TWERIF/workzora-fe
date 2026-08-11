import { Project, ProjectStatus } from "@/features/projects/model/types";
import { useTranslation } from "react-i18next";

export const ProjectMeta = ({ project, postedText }: { project: Project; postedText: string }) => {
    const { t } = useTranslation("discussion");

    const status = project.status || ProjectStatus.OPEN;

    return (
        <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mt-2 mb-6 font-medium">
            <span>{t("projectId", { id: project.id || "33245622" })}</span>
            <span>•</span>
            <span className="text-success capitalize flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                {t(`status.${status}`)}
            </span>
            <span>•</span>
            <span className="lowercase">{postedText}</span>
            <span>•</span>
        </div>
    );
};