"use client";

import IconCalendar from "@/shared/components/svg/IconCalendar";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Clock } from "@/shared/components/svg/Clock";
import UsdtIcon from "@/shared/components/svg/UsdtIcon";
import { Project, ProjectStatus } from "../model/types";

interface ProjectListItemProps {
  project: Project;
  chatHref: string;
}

const STATUS_BADGE_CLASSES: Record<ProjectStatus, string> = {
  [ProjectStatus.OPEN]: "border-status-info text-status-info bg-status-infoSoft",
  [ProjectStatus.AWAITING_PAYMENT]: "border-status-danger text-status-danger bg-status-dangerSoft",
  [ProjectStatus.IN_PROGRESS]: "border-success text-success bg-status-successSoft",
  [ProjectStatus.COMPLETED]: "border-border text-text-muted bg-transparent",
  [ProjectStatus.CLOSED]: "border-border text-text-muted bg-transparent",
};

/**
 * `project.time` is the number of days the project was allotted (from
 * creation). There's no separate deadline-date field yet, so the deadline
 * date and the days-left countdown are both derived from it.
 */
function getDeadlineDate(project: Project): Date | null {
  if (!project.time) return null;
  const deadline = new Date(project.createdAt);
  deadline.setDate(deadline.getDate() + project.time);
  return deadline;
}

function formatDeadline(deadline: Date, locale: string) {
  return new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(deadline);
}

function getDaysLeft(deadline: Date) {
  const diffMs = deadline.getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

export default function ProjectListItem({ project, chatHref }: ProjectListItemProps) {
  const { t, i18n } = useTranslation("additions");
  const locale = i18n.language;

  const deadline = getDeadlineDate(project);
  const daysLeft = deadline ? getDaysLeft(deadline) : null;

  return (
    <div className="flex flex-col gap-4 rounded-20 bg-input p-5 dark:bg-input-dark sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3">
        <span
          className={`inline-flex w-fit items-center rounded-20 border px-3 py-1 text-xs font-medium ${STATUS_BADGE_CLASSES[project.status]}`}
        >
          {t(`status.badge.${project.status}`, project.status.replace("_", " "))}
        </span>

        <p dangerouslySetInnerHTML={{ __html: project.description }} className="line-clamp-2 font-medium text-text dark:text-text-dark" />

        <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
          <span className="flex items-center gap-2 font-semibold text-text dark:text-text-dark">
            <UsdtIcon />
            {project.price}
          </span>

          {deadline && (
            <span className="flex items-center gap-2">
              <IconCalendar />
              <span className="flex flex-col leading-tight">
                <span className="text-xs text-text-light">{t("chats.projectDeadline")}</span>
                <span>{formatDeadline(deadline, locale)}</span>
              </span>
            </span>
          )}

          {daysLeft !== null && (
            <span className="flex items-center gap-2">
              <Clock className="" />
              <span className="flex flex-col leading-tight">
                <span className="text-xs text-text-light">{t("chats.timeLeft")}</span>
                <span>{t("chats.daysLeft", { count: daysLeft })}</span>
              </span>
            </span>
          )}
        </div>
      </div>

      <Link
        href={chatHref}
        className="shrink-0 rounded-20 bg-gradient px-6 py-2.5 text-center text-sm font-medium text-white shadow-input transition-opacity hover:opacity-90 dark:shadow-input-dark"
      >
        {t("chats.workingChat")}
      </Link>
    </div>
  );
}
