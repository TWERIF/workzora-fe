import { BgPolygonGreen } from "@/shared/components/svg/BgDecor";
import { useTranslation } from "react-i18next";

interface CategoryGroup {
  number: string;
  title: string;
  items: { name: string; count: number }[];
}

export default function Categories() {
  const { t } = useTranslation("main");
  const groups = t("categories.groups", { returnObjects: true }) as CategoryGroup[];

  return (
    <section className="relative bg-bg dark:bg-bg-dark text-text dark:text-text-dark py-16 md:py-20 overflow-hidden">
      <BgPolygonGreen className="bottom-0 left-0 w-[400px] opacity-60 rotate-180" />

      <div className="relative container mx-auto px-4">
        <span className="text-3xl md:text-5xl font-bold mb-12 max-w-2xl">
          {t("categories.title.1")}{" "}
          <span className="text-success">{t("categories.title.2")}</span>{" "}
          {t("categories.title.3")}
        </span>

        <div className="flex flex-col gap-10 mt-6 justify-center w-full">
          {groups.map((group) => (
            <div key={group.number} className="flex flex-col items-start md:flex-row gap-4 md:gap-10 border-[#E2E2E2] border-b py-6">
              <div className="flex items-center gap-3 shrink-0 md:w-56">
                <span className="text-text-dark px-[12px] py-[10px] rounded-[50%] text-center align-middle font-bold bg-success">{group.number}</span>
                <h3 className="text-lg md:text-xl font-semibold">{group.title}</h3>
              </div>

              <div className="flex items-end flex-col md:flex-row">
                <div className="flex-1 flex flex-wrap-reverse gap-x-6 gap-y-3 text-sm">
                  {group.items.map((item) => (
                    <span key={item.name} className="px-6 py-3 border-[#E2E2E2] border rounded-[100px] opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
                      {item.name}{" "}
                      <span className="opacity-50">{item.count.toLocaleString()}</span>
                    </span>
                  ))}
                </div>
                <button className="text-success font-semibold underline">
                  {t("categories.viewAllBtn")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
