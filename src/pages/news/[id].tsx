import { usePost } from "@/features/posts/model/usePosts";
import { AuthorCard } from "@/features/posts/ui/post/AuthorCard";
import { BackToBlogLink } from "@/features/posts/ui/post/BackToBlogLink";
import { PostArticleBody } from "@/features/posts/ui/post/PostArticleBody";
import { PostDetailsCard } from "@/features/posts/ui/post/PostDetailsCard";
import { PostHero } from "@/features/posts/ui/post/PostHero";
import { RelatedPosts } from "@/features/posts/ui/post/RelatedPosts";
import { SubscribeCard } from "@/features/posts/ui/SubscribeCard";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";


const PostDetailPage = () => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const id = typeof router.query.id === "string" ? router.query.id : undefined;

    const { post, isLoadingPost } = usePost(id);

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

export default PostDetailPage;
