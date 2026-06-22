import { Project } from "@/features/projects/model/types";

export const ProjectMeta = ({ project, postedText }: { project: Project; postedText: string }) => (
    <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mt-2 mb-6 font-medium">
        <span>Project ID: {project.id || "33245622"}</span>
        <span>•</span>
        <span className="text-success capitalize flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            {project.status || "Open"}
        </span>
        <span>•</span>
        <span className="lowercase">{postedText}</span>
        <span>•</span>
        {/* <span>Ends in 12 days</span>  */}
    </div>
);
