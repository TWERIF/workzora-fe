import { useTheme } from "next-themes";
import React from "react";

export default function FooterMeta({ info }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Якщо дані ще не завантажилися з i18next, повертаємо null або скелетон
  if (!info) return null;

  return (
    <section
      className={`py-8 md:py-10 ${isDark ? "bg-[#333333] text-white" : "border-t border-gray-200 bg-white text-[#333333]"}`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
        {/* Статистика */}
        <div className="flex flex-row md:flex-wrap justify-center gap-10 md:gap-24 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-2xl md:text-3xl font-bold tracking-tight">
              {info.registeredUsers}
            </span>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest opacity-70">
              {info.registeredUsersText}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-2xl md:text-3xl font-bold tracking-tight">
              {info.totalJobs}
            </span>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest opacity-70">
              {info.totalJobsText}
            </span>
          </div>
        </div>

        {/* Юридичний текст та Копірайт */}
        <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
          <p className="font-bold text-sm md:text-base">{info.trademark}</p>
          <p className="text-xs md:text-sm opacity-60">{info.copyright}</p>
        </div>
      </div>
    </section>
  );
}
