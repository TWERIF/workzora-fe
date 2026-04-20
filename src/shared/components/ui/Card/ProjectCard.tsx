import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import IconCalendar from "../../svg/IconCalendar";
import IconViews from "../../svg/IconViews";
import PersonIcon from "../../svg/PersonIcon";
import UsdtIcon from "../../svg/UsdtIcon";
import SkillPin from "../SkillPin";
import { User } from "@/features/auth/model/types";
import { Project } from "@/features/projects/model/types";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation("common");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Додаємо price до деструктуризації (припускаємо, що воно є в об'єкті)

  return (
    <div
      className={`
            relative rounded-3xl p-6 transition-all duration-300 flex flex-col gap-5 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] hover:shadow-xl
            ${
              isDark
                ? "bg-[#2A2A2A] text-white border border-white/10"
                : "bg-white text-[#333333] border border-gray-100"
            }
        `}
    >
      {/* ЦІНА: Правий верхній кут */}
      {100 && (
        <div
          className={`
                    absolute top-6 flex items-center gap-2 right-6 px-4 py-1.5 rounded-xl font-bold text-lg
                `}
        >
          <UsdtIcon />
          {100}
        </div>
      )}

      {/* HEADER: Title & Skills */}
      <div className="flex flex-col gap-3">
        {/* Додаємо pr-20, щоб текст не налізав на ціну */}
        <h3
          className={`text-2xl font-bold leading-tight pr-20 ${isDark ? "text-white" : "text-[#333333]"}`}
        >
          {project.title}
        </h3>

        <p
          className={`leading-relaxed text-base line-clamp-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((skill, index) => (
            <SkillPin skill={skill} key={index} />
          ))}
        </div>
      </div>

      {/* FOOTER: Author, Date, Views */}
      <div
        className={`pt-5 border-t flex items-center justify-between text-sm 
                ${isDark ? "border-white/10" : "border-gray-100"}`}
      >
        {/* ЛІВА ЧАСТИНА: Автор та Дата */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <PersonIcon />
            <span
              className={`whitespace-nowrap ${isDark ? "text-gray-300" : "text-[#333333]"}`}
            >
              {project.clientId}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <IconCalendar />
            <span
              className={`whitespace-nowrap ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* ПРАВА ЧАСТИНА: Views */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors
                    ${isDark ? "bg-[#333333] text-white" : "bg-gray-50 text-gray-700"}`}
        >
          <IconViews />
          <span className="font-medium">{project.views}</span>
        </div>
      </div>
    </div>
  );
}
