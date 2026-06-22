"use client";

import { useTranslation } from "react-i18next";

export type FilterType = "projects" | "chats" | "blocked";

interface ChatFiltersProps {
  currentFilter: FilterType;
  onChangeFilter: (filter: FilterType) => void;
}

export default function ChatFilters({ currentFilter, onChangeFilter }: ChatFiltersProps) {
  const { t } = useTranslation("common");

  const filters: { id: FilterType; labelKey: string; dotColor: string }[] = [
    { id: "projects", labelKey: "chatPage.filters.projects", dotColor: "bg-success" },
    { id: "chats", labelKey: "chatPage.filters.chats", dotColor: "bg-success" },
    { id: "blocked", labelKey: "chatPage.filters.blocked", dotColor: "bg-error" },
  ];

  return (
    <div className="flex justify-end items-center gap-6 text-xs font-medium">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onChangeFilter(filter.id)}
            className={`flex items-center gap-1.5 transition-colors ${
              isActive ? "text-success font-semibold" : "text-text-muted hover:text-text dark:hover:text-text-dark"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${filter.dotColor}`} />
            {t(filter.labelKey)}
          </button>
        );
      })}
    </div>
  );
}