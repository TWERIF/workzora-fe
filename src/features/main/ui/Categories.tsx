import { useCategoryTree } from "@/features/categories/model/useData";
import { useFormatCount, useSiteStats } from "@/features/stats/model/useSiteStats";
import { BgPolygonGreen } from "@/shared/components/svg/BgDecor";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const VISIBLE_CATEGORIES = 20;

export default function Categories() {
  const { t } = useTranslation("main");
  const { data: tree } = useCategoryTree();
  const { data: stats } = useSiteStats();
  const formatCount = useFormatCount();

  const top = [...(tree ?? [])]
    .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title))
    .slice(0, VISIBLE_CATEGORIES);

  return (
    <section className="relative bg-bg dark:bg-bg-dark text-text dark:text-text-dark py-16 md:py-20 overflow-hidden">
      <BgPolygonGreen className="bottom-0 left-0 w-[400px] opacity-60 rotate-180" />

      <div className="relative container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 max-w-2xl">
          {t("categories.title.1")}{" "}
          <span className="text-success">{formatCount(stats?.categories ?? tree?.length)}</span>{" "}
          {t("categories.title.3")}
        </h2>

        <div className="flex flex-col items-start gap-6 border-[#E2E2E2] border-b py-6">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {top.map((category) => (
              <Link
                key={category.id}
                href="/categories"
                className="px-6 py-3 border-[#E2E2E2] border rounded-[100px] opacity-80 hover:opacity-100 transition-opacity"
              >
                {category.title}
                {category.count > 0 && <span className="opacity-50"> {formatCount(category.count)}</span>}
              </Link>
            ))}
          </div>
          <Link href="/categories" className="text-success font-semibold underline">
            {t("categories.viewAllBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
