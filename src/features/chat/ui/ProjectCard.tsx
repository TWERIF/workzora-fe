import React from "react";
import { IProject, ProjectStatus } from "../model/types";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  project: IProject;
  currentUserId?: string; // Щоб визначити "Я замовник" чи "Я фрілансер"
  onClick?: (project: IProject) => void;
}

export default function ProjectCard({
  project,
  currentUserId,
  onClick,
}: ProjectCardProps) {
  const { t } = useTranslation("common");

  const getStatusStyles = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.OPEN:
        return { color: "...", label: t("projectStatus.open") };
      case ProjectStatus.IN_PROGRESS:
        return { color: "...", label: t("projectStatus.in_progress") };
      case ProjectStatus.COMPLETED:
        return { color: "...", label: t("projectStatus.completed") };
      case ProjectStatus.CLOSED:
        return { color: "...", label: t("projectStatus.closed") };
      default:
        return { color: "...", label: status };
    }
  };

  const statusInfo = getStatusStyles(project.status);

  // Визначаємо роль, якщо переданий ID поточного юзера
  const isClient = currentUserId === project.clientId;
  const isFreelancer = currentUserId === project.freelancerId;

  return (
    <div
      onClick={() => onClick && onClick(project)}
      className="bg-white dark:bg-[#333333] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-[#444444] hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer transition-all flex flex-col h-full"
    >
      {/* Шапка картки: Заголовок + Статус */}
      <div className="flex justify-between items-start gap-4 mb-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2">
          {project.title}
        </h2>
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${statusInfo.color}`}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Опис */}
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
        {project.desc}
      </p>

      {/* Стек технологій */}
      {project.stack && project.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] uppercase font-medium tracking-wide bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="text-[10px] font-medium text-gray-400 px-1 py-1">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Підвал картки: Ціна, Роль, Перегляди */}
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-[#444444] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-lg font-black text-gray-900 dark:text-white">
            ${Number(project.price).toLocaleString()}
          </div>

          {(isClient || isFreelancer) && (
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                isClient
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400"
              }`}
            >
              {isClient ? t("roles.client") : t("roles.freelancer")}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-1 text-xs" title="Перегляди">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {project.views}
          </div>

          <button className="text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
