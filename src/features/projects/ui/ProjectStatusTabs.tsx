"use client";

import { useTranslation } from "react-i18next";
import { ProjectStatus } from "../model/types";

interface ProjectStatusTabsProps {
  currentStatus: ProjectStatus;
  onChange: (status: ProjectStatus) => void;
}

export default function ProjectStatusTabs({
  currentStatus,
  onChange,
}: ProjectStatusTabsProps) {
  const { t } = useTranslation("additions");

  return (
    <div className="mb-6 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {Object.values(ProjectStatus).map((status) => {
        const isActive = currentStatus === status;

        return (
          <button
            key={status}
            type="button"
            onClick={() => onChange(status)}
            aria-pressed={isActive}
            className={`shrink-0 rounded-20 px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive
                ? "bg-success text-white shadow-input dark:shadow-input-dark"
                : "border border-border bg-input text-text hover:bg-black/5 dark:border-white/10 dark:bg-input-dark dark:text-text-dark dark:hover:bg-white/10"
            }`}
          >
            {t(`status.${status}`, status.replace("_", " "))}
          </button>
        );
      })}
    </div>
  );
}
