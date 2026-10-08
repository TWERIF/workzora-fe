import { AuthorCard } from "@/features/posts/ui/post/AuthorCard";
import { helpCategoryKey } from "@/features/help/model/types";
import { useHelpArticle } from "@/features/help/model/useHelp";
import HelpDetails from "@/features/help/ui/HelpDetails";
import HelpFeedback from "@/features/help/ui/HelpFeedback";
import HelpHero from "@/features/help/ui/HelpHero";
import NeedHelp from "@/features/help/ui/NeedHelp";
import Breadcrumbs from "@/shared/components/ui/BreadCrumbs";
import RichContent from "@/shared/components/ui/RichContent/RichContent";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function HelpArticlePage() {
    const { t } = useTranslation("help");
    const router = useRouter();
    const category = typeof router.query.category === "string" ? router.query.category : undefined;
    const slug = typeof router.query.slug === "string" ? router.query.slug : undefined;
    const key = helpCategoryKey(category);
    const { data: article, isLoading, isError } = useHelpArticle(key ? category : undefined, slug);

    if (isError || (router.isReady && !key)) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 pt-28 text-center">
                <h1 className="text-2xl font-semibold">{t("article.notFound")}</h1>
                <Link href="/knowledgebase" className="rounded-full bg-gradient px-6 py-3 text-sm text-white">
                    {t("article.back")}
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-[1424px] px-4 pb-24 pt-28 text-main-100 sm:px-8 lg:pt-[130px]">
            {isLoading || !article || !key ? (
                <div className="flex flex-col items-center gap-6">
                    <div className="h-10 w-2/3 animate-pulse rounded-20 bg-main-5" />
                    <div className="h-[300px] w-full animate-pulse rounded-36 bg-main-5" />
                </div>
            ) : (
                <>
                    <Head>
                        <title key="title">{`${article.title} | ${t("badge")} | Workzora`}</title>
                        <meta key="description" name="description" content={article.summary} />
                    </Head>
                    <Breadcrumbs
                        customItems={[
                            { label: t("badge"), href: "/knowledgebase" },
                            { label: t(`categories.${key}.title`), href: `/knowledgebase/${article.category}` },
                            { label: article.title },
                        ]}
                    />
                    <HelpHero title={article.title} subtitle={article.summary} />

                    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_317px] lg:gap-[31px]">
                        <article className="min-w-0">
                            <RichContent html={article.body} />
                            <NeedHelp />
                        </article>
                        <aside className="flex flex-col gap-4 lg:sticky lg:top-[112px] lg:self-start">
                            <HelpDetails article={article} />
                            <AuthorCard />
                            <HelpFeedback articleId={article.id} />
                        </aside>
                    </div>
                </>
            )}
        </div>
    );
}
