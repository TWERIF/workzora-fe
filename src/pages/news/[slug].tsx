import { usePost, usePostView } from "@/features/posts/model/usePosts";
import { AuthorCard } from "@/features/posts/ui/post/AuthorCard";
import { BackToBlogLink } from "@/features/posts/ui/post/BackToBlogLink";
import { PostArticleBody } from "@/features/posts/ui/post/PostArticleBody";
import { PostDetailsCard } from "@/features/posts/ui/post/PostDetailsCard";
import { PostHero } from "@/features/posts/ui/post/PostHero";
import { RelatedPosts } from "@/features/posts/ui/post/RelatedPosts";
import { SubscribeCard } from "@/features/posts/ui/SubscribeCard";
import { Post } from "@/features/posts/model/types";
import { findPostForPage } from "@/features/posts/model/api";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const SITE_URL = "https://workzora.com";

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

interface PostDetailPageProps {
    initialPost: Post | null;
}


const PostDetailPage = ({ initialPost }: PostDetailPageProps) => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const slug = typeof router.query.slug === "string" ? router.query.slug : undefined;

    const { post, isLoadingPost } = usePost(slug, initialPost ?? undefined);
    usePostView(post?.id);
    const description = post ? stripHtml(post.teaser).slice(0, 160) : "";
    const localePrefix = router.locale && router.locale !== router.defaultLocale ? `/${router.locale}` : "";
    const canonical = post?.slug ? `${SITE_URL}${localePrefix}/news/${post.slug}` : undefined;

    return (
        <div className="mx-auto w-full max-w-[1424px] px-4 pb-24 pt-28 text-main-100 sm:px-8 lg:pt-[130px]">
            {isLoadingPost && (
                <div className="flex flex-col items-center gap-6">
                    <div className="h-10 w-2/3 animate-pulse rounded-20 bg-main-5" />
                    <div className="h-[400px] w-full animate-pulse rounded-36 bg-main-5" />
                </div>
            )}

            {!isLoadingPost && !post && (
                <div className="flex flex-col items-center gap-4 py-20 text-center">
                    <h1 className="text-2xl font-semibold">{t("post.notFound.title")}</h1>
                    <p className="text-sm text-main-50">{t("post.notFound.subtitle")}</p>
                    <BackToBlogLink />
                </div>
            )}

            {!isLoadingPost && post && (
                <div className="flex flex-col gap-12">
                    <Head>
                        <title>{`${post.title} — Workzora`}</title>
                        <meta name="description" content={description} />
                        <meta property="og:type" content="article" />
                        <meta property="og:title" content={post.title} />
                        <meta property="og:description" content={description} />
                        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
                        {canonical && <link rel="canonical" href={canonical} />}
                        {canonical && <meta property="og:url" content={canonical} />}
                    </Head>
                    <PostHero post={post} />

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_317px] lg:gap-[31px]">
                        <article className="min-w-0">
                            <PostArticleBody article={post.article} />
                            <div className="mt-10">
                                <BackToBlogLink />
                            </div>
                        </article>

                        <aside className="flex flex-col gap-4 lg:sticky lg:top-[112px] lg:self-start">
                            <PostDetailsCard post={post} />
                            <AuthorCard />
                            <SubscribeCard />
                        </aside>
                    </div>

                    <RelatedPosts currentPostId={post.id} />
                </div>
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<PostDetailPageProps> = async ({ params, locale, defaultLocale }) => {
    const key = String(params?.slug ?? "");
    const lookup = await findPostForPage(key, process.env.API_INTERNAL_URL);

    if (lookup.status === "missing") return { notFound: true };
    if (lookup.status === "unavailable") return { props: { initialPost: null } };

    const { post } = lookup;
    if (post.slug && post.slug !== key) {
        const prefix = locale && locale !== defaultLocale ? `/${locale}` : "";
        return { redirect: { destination: `${prefix}/news/${post.slug}`, permanent: true } };
    }

    return { props: { initialPost: post } };
};

export default PostDetailPage;
