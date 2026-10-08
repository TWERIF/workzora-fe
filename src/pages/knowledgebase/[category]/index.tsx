import { helpCategoryKey } from "@/features/help/model/types";
import { useHelpArticles } from "@/features/help/model/useHelp";
import HelpArticleCard from "@/features/help/ui/HelpArticleCard";
import HelpHero from "@/features/help/ui/HelpHero";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function HelpCategoryPage() {
    const { t } = useTranslation("help");
    const router = useRouter();
    const category = typeof router.query.category === "string" ? router.query.category : undefined;
    const key = helpCategoryKey(category);
    const { data: articles = [], isLoading } = useHelpArticles({ category: key ? category : undefined });

    if (router.isReady && !key) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-3 px-4 pt-28 text-center">
                <h1 className="text-2xl font-semibold">{t("categoryNotFound")}</h1>
            </div>
        );
    }

    const title = key ? t(`categories.${key}.title`) : "";

    return (
        <div className="mx-auto w-full max-w-[1424px] px-4 pb-24 pt-28 text-main-100 sm:px-8 lg:pt-[130px]">
            <Head>
                <title>{`${title} — ${t("badge")} — Workzora`}</title>
                {key && <meta name="description" content={t(`categories.${key}.description`)} />}
            </Head>
            <Breadcrumbs customItems={[{ label: t("badge"), href: "/knowledgebase" }, { label: title }]} />
            <HelpHero title={title} subtitle={key ? t(`categories.${key}.description`) : undefined} />

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
                {isLoading
                    ? Array.from({ length: 6 }, (_, index) => <div key={index} className="h-[104px] animate-pulse rounded-[24px] bg-main-5" />)
                    : articles.map((article) => <HelpArticleCard key={article.id} article={article} />)}
            </div>
            {!isLoading && articles.length === 0 && <p className="py-10 text-center text-sm text-main-50">{t("emptyCategory")}</p>}
        </div>
    );
}
