import { TFunction } from "i18next";
import Link from "next/link";

export default function CategoriesHero({ locale, t }: { locale: string, t: TFunction<"common", undefined> }) {
    return (
        <div className="w-full bg-bg-dark dark:bg-bg-modalDark flex justify-between items-center px-16 py-8 shadow-md transition-colors duration-200">
            <h1 className="text-text-dark font-[700] text-[3.438rem]">{t("categories.title")}</h1>
            <div className="flex gap-2">
                <Link
                    href={`/${locale}/create-project`}
                    className="inline-block rounded-[1.25rem] bg-gradient-to-br from-[#E1E1E1] to-[#FFFFFF] dark:from-zinc-700 dark:to-zinc-800 px-4 py-2 text-[0.875rem] text-text dark:text-text-dark transition-all shadow-sm"
                >
                    {t("categories.hire")}
                </Link>
                <Link
                    href={`/${locale}/categories`}
                    className="rounded-[1.25rem] bg-transparent text-text-dark text-[0.875rem] px-4 py-2 border border-text-dark hover:bg-white/10 transition-colors"
                >
                    {t("categories.earn")}
                </Link>
            </div>
        </div>
    );
}