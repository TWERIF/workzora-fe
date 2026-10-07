import { type Project, ProjectStatus } from "@/features/projects/model/types";
import UsdtIcon from "@/shared/components/svg/UsdtIcon";
import { IconCalendar, IconClock } from "@/shared/components/svg/UiIcons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const DAY_MS = 24 * 60 * 60 * 1000;

const STATUS_STYLES: Partial<Record<ProjectStatus, string>> = {
    [ProjectStatus.AWAITING_PAYMENT]: "border-[#F2A23A]/40 bg-[#F2A23A]/10 text-[#E08A1C]",
    [ProjectStatus.IN_PROGRESS]: "border-primary/40 bg-primary-10 text-primary",
    [ProjectStatus.COMPLETED]: "border-main-10 bg-background text-main-50",
};

export default function DealCard({ project }: { project: Project }) {
    const { t, i18n } = useTranslation("chat");
    const { locale = "en" } = useRouter();
    const days = Number(project.time) || 0;
    const deadline = project.startedAt && days ? new Date(new Date(project.startedAt).getTime() + days * DAY_MS) : null;
    const left = deadline ? Math.ceil((deadline.getTime() - Date.now()) / DAY_MS) : null;

    const deadlineText = deadline
        ? deadline.toLocaleDateString(i18n.language, { month: "long", day: "numeric", year: "numeric" })
        : project.status === ProjectStatus.AWAITING_PAYMENT
          ? t("hub.afterPayment")
          : "–";
    const leftText =
        project.status === ProjectStatus.COMPLETED
            ? t("hub.finished")
            : left === null
              ? days
                  ? t("hub.duration", { count: days })
                  : "–"
              : left < 0
                ? t("hub.overdue")
                : t("hub.daysLeft", { count: left });

    return (
        <article className="flex flex-col gap-3 rounded-20 bg-main-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex min-w-0 flex-col gap-2.5">
                <span className={`w-fit rounded-[6px] border px-1.5 py-0.5 text-[10px] ${STATUS_STYLES[project.status] ?? STATUS_STYLES[ProjectStatus.COMPLETED]}`}>
                    {t(`hub.status.${project.status}`, { defaultValue: project.status })}
                </span>
                <h3 className="break-words text-base font-medium">{project.title}</h3>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="flex items-center gap-2 text-base font-semibold">
                        <UsdtIcon width={22} height={22} />
                        {Number(project.price).toLocaleString("en-US")}
                    </span>
                    <span className="flex items-center gap-2">
                        <IconCalendar size={22} className="text-main-50" />
                        <span className="flex flex-col leading-tight">
                            <span className="text-[10px] text-main-50">{t("hub.deadline")}</span>
                            <span className="text-xs">{deadlineText}</span>
                        </span>
                    </span>
                    <span className="flex items-center gap-2">
                        <IconClock size={22} className="text-main-50" />
                        <span className="flex flex-col leading-tight">
                            <span className="text-[10px] text-main-50">{t("hub.timeLeft")}</span>
                            <span className={`text-xs ${left !== null && left < 0 ? "text-status-danger" : ""}`}>{leftText}</span>
                        </span>
                    </span>
                </div>
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
