import { HELP_CATEGORIES, helpCategoryKey } from "@/features/help/model/types";
import { useHelpArticles, useHelpCategories } from "@/features/help/model/useHelp";
import HelpArticleCard from "@/features/help/ui/HelpArticleCard";
import HelpCategoryIcon from "@/features/help/ui/HelpCategoryIcon";
import HelpHero from "@/features/help/ui/HelpHero";
import PageMeta from "@/shared/components/seo/PageMeta";
import { ArrowIcon } from "@/shared/components/svg/Knowledgebase/ArrowIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function KnowledgeBasePage() {
    const { t } = useTranslation("help");
    const { query } = useRouter();
    const search = typeof query.search === "string" ? query.search.trim() : "";
    const { data: counts = [] } = useHelpCategories();
    const { data: results = [], isLoading } = useHelpArticles({ search });

    return (
        <div className="mx-auto w-full max-w-[1424px] px-4 pb-24 pt-28 text-main-100 sm:px-8 lg:pt-[130px]">
            <PageMeta page="knowledgebase" />
            <HelpHero title={t("title")} subtitle={t("subtitle")} />

            {search ? (
                <section className="mt-12 flex flex-col gap-5">
                    <h2 className="text-xl font-semibold">{t("searchResults", { term: search })}</h2>
                    {isLoading && <p className="text-sm text-main-50">{t("searching")}</p>}
                    {!isLoading && results.length === 0 && <p className="text-sm text-main-50">{t("nothingFound")}</p>}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {results.map((article) => (
                            <HelpArticleCard key={article.id} article={article} label={t(`categories.${helpCategoryKey(article.category)}.title`)} />
                        ))}
                    </div>
                </section>
            ) : (
                <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {HELP_CATEGORIES.map((category) => {
                        const count = counts.find((item) => item.key === category.slug)?.count;
                        return (
                            <Link
                                key={category.slug}
                                href={`/knowledgebase/${category.slug}`}
                                className="group flex flex-col gap-6 rounded-[24px] bg-main-5 p-6 transition-colors hover:bg-primary-10"
                            >
                                <HelpCategoryIcon category={category.slug} />
                                <span className="flex items-center justify-between gap-2">
                                    <span className="text-xl font-medium leading-[26px] group-hover:text-primary">{t(`categories.${category.key}.title`)}</span>
                                    <span className="shrink-0 text-primary">
                                        <ArrowIcon />
                                    </span>
                                </span>
                                <span className="-mt-4 text-sm leading-[21px]">{t(`categories.${category.key}.description`)}</span>
                                {count !== undefined && <span className="mt-auto text-xs text-primary">{t("articlesCount", { count })}</span>}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
