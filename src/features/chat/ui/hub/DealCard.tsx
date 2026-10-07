import { type Project, ProjectStatus } from "@/features/projects/model/types";
import DealTimingInfo from "@/features/projects/ui/DealTimingInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const STATUS_STYLES: Partial<Record<ProjectStatus, string>> = {
    [ProjectStatus.AWAITING_PAYMENT]: "border-[#F2A23A]/40 bg-[#F2A23A]/10 text-[#E08A1C]",
    [ProjectStatus.IN_PROGRESS]: "border-primary/40 bg-primary-10 text-primary",
    [ProjectStatus.COMPLETED]: "border-main-10 bg-background text-main-50",
};

export default function DealCard({ project }: { project: Project }) {
    const { t } = useTranslation("chat");
    const { locale = "en" } = useRouter();
    return (
        <article className="flex flex-col gap-3 rounded-20 bg-main-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex min-w-0 flex-col gap-2.5">
                <span className={`w-fit rounded-[6px] border px-1.5 py-0.5 text-[10px] ${STATUS_STYLES[project.status] ?? STATUS_STYLES[ProjectStatus.COMPLETED]}`}>
                    {t(`hub.status.${project.status}`, { defaultValue: project.status })}
                </span>
                <h3 className="break-words text-base font-medium">{project.title}</h3>
                <DealTimingInfo project={project} />
            </div>
            <Link
                href={`/${locale}/chats/${project.id}`}
                className="flex h-[38px] shrink-0 items-center justify-center rounded-full bg-gradient px-5 text-xs text-white transition-opacity hover:opacity-90"
            >
                {t("hub.workingChat")}
            </Link>
        </article>
    );
}
