import { useCountProjects } from "@/features/projects/model/useProjects";
import { useCountUsers } from "@/features/users/model/useUsers";
import { useTheme } from "next-themes";
import { CopyrightInfo } from "./Footer";
import { useTranslation } from "react-i18next";
import { UaFlag } from "../../svg/UaFlag";

export default function FooterMeta({ info }: { info: CopyrightInfo }) {
  const { t } = useTranslation("main");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { data: users } = useCountUsers();
  const { data: projects } = useCountProjects();

  if (!info) return null;

  return (
    <section
      className={`py-8 md:py-10 ${isDark ? "bg-[#333333] text-white" : "border-t border-gray-200 bg-white text-[#333333]"}`}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
        <div className="flex flex-row md:flex-wrap justify-center gap-10 md:gap-24 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-2xl md:text-3xl font-bold tracking-tight">
              {users}
            </span>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest opacity-70">
              {info.registeredUsersText}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-2xl md:text-3xl font-bold tracking-tight">
              {projects}
            </span>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest opacity-70">
              {info.totalJobsText}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
          {/* <p className="font-bold text-sm md:text-base">{info.trademark}</p> */}
          <p className="text-xs md:text-sm opacity-60">{t("footer.copyright.line1")}</p>
          <p className="text-xs md:text-sm opacity-60">{t("footer.copyright.line2")}</p>
          <p className="text-xs md:text-sm opacity-60">{t("footer.copyright.line3")}</p>
          <p className="text-xs md:text-sm opacity-60 flex items-center gap-1">{t("footer.copyright.line4")} <UaFlag /> </p>
        </div>
      </div>
    </section>
  );
}
