import UsdtIcon from "@/shared/components/svg/UsdtIcon";
import { IconCalendar, IconClock } from "@/shared/components/svg/UiIcons";
import { useTranslation } from "react-i18next";
import { dealTiming } from "../model/dealTiming";
import type { Project } from "../model/types";

export default function DealTimingInfo({ project }: { project: Project }) {
    const { t, i18n } = useTranslation("chat");
    const { deadline, daysLeft, days, isFinished, isAwaitingPayment } = dealTiming(project);

    const deadlineText = deadline
        ? deadline.toLocaleDateString(i18n.language, { month: "long", day: "numeric", year: "numeric" })
        : isAwaitingPayment
          ? t("hub.afterPayment")
          : "–";
    const leftText = isFinished
        ? t("hub.finished")
        : daysLeft === null
          ? days
              ? t("hub.duration", { count: days })
              : "–"
          : daysLeft < 0
            ? t("hub.overdue")
            : t("hub.daysLeft", { count: daysLeft });

    return (
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
                    <span className={`text-xs ${daysLeft !== null && daysLeft < 0 && !isFinished ? "text-status-danger" : ""}`}>{leftText}</span>
                </span>
            </span>
        </div>
    );
}
