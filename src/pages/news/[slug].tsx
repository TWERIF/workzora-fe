import { usePost } from "@/features/posts/model/usePosts";
import { AuthorCard } from "@/features/posts/ui/post/AuthorCard";
import { BackToBlogLink } from "@/features/posts/ui/post/BackToBlogLink";
import { PostArticleBody } from "@/features/posts/ui/post/PostArticleBody";
import { PostDetailsCard } from "@/features/posts/ui/post/PostDetailsCard";
import { PostHero } from "@/features/posts/ui/post/PostHero";
import { RelatedPosts } from "@/features/posts/ui/post/RelatedPosts";
import { SubscribeCard } from "@/features/posts/ui/SubscribeCard";
import { Post } from "@/features/posts/model/types";
import { $api } from "@/shared/components/http";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const SITE_URL = "https://workzora.com";
// SSR runs on the server, which may reach the API by an internal address
const API_URL = process.env.API_INTERNAL_URL || $api.defaults.baseURL;

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

interface PostDetailPageProps {
    initialPost: Post | null;
}


const PostDetailPage = ({ initialPost }: PostDetailPageProps) => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const slug = typeof router.query.slug === "string" ? router.query.slug : undefined;

    const { post, isLoadingPost } = usePost(slug, initialPost ?? undefined);
    const description = post ? stripHtml(post.teaser).slice(0, 160) : "";
    const localePrefix = router.locale && router.locale !== router.defaultLocale ? `/${router.locale}` : "";
    const canonical = post?.slug ? `${SITE_URL}${localePrefix}/news/${post.slug}` : undefined;

    return (
        <div className="min-h-screen bg-bg px-4 py-16 dark:bg-bg-dark sm:px-8 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
                <BackToBlogLink />

                {isLoadingPost && (
                    <div className="flex flex-col gap-6">
                        <div className="h-8 w-2/3 animate-pulse rounded-20 bg-input dark:bg-input-dark" />
                        <div className="h-[300px] w-full animate-pulse rounded-20 bg-input dark:bg-input-dark" />
                    </div>
                )}

                {!isLoadingPost && !post && (
                    <div className="flex flex-col items-center gap-4 py-20 text-center">
                        <h1 className="text-2xl font-semibold text-text dark:text-text-dark">
                            {t("post.notFound.title")}
                        </h1>
                        <p className="text-sm text-muted">{t("post.notFound.subtitle")}</p>
                    </div>
                )}

                {!isLoadingPost && post && (
                    <>
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

                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <PostArticleBody article={post.article} />
                            </div>

                            <div className="flex flex-col gap-6">
                                <PostDetailsCard post={post} />
                                <SubscribeCard />
                                <AuthorCard />
                            </div>
                        </div>

                        <RelatedPosts currentPostId={post.id} />
                    </>
                )}
            </div>
        </div>
    );
};

// Rendered on the server so search engines get the article text and meta tags.
// Old links by id are permanently redirected to the readable slug link.
export const getServerSideProps: GetServerSideProps<PostDetailPageProps> = async ({ params, locale, defaultLocale }) => {
    const key = String(params?.slug ?? "");

    try {
        const res = await fetch(`${API_URL}/posts/${encodeURIComponent(key)}`);
        if (res.status === 404) return { notFound: true };
        if (!res.ok) return { props: { initialPost: null } };

        const post: Post = await res.json();
        if (post.slug && post.slug !== key) {
            const prefix = locale && locale !== defaultLocale ? `/${locale}` : "";
            return { redirect: { destination: `${prefix}/news/${post.slug}`, permanent: true } };
        }

        return { props: { initialPost: post } };
    } catch {
        // API unreachable from the server: let the page load the post on the client
        return { props: { initialPost: null } };
    }
};

export default PostDetailPage;
