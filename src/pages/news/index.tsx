import { Post } from "@/features/posts/model/types";
import { useLatestPosts, usePostList, useSearchPosts } from "@/features/posts/model/usePosts";
import { BlogHero } from "@/features/posts/ui/BlogHero";
import { CategoryTabs } from "@/features/posts/ui/CategoryTabs";
import { FeaturedArticle } from "@/features/posts/ui/FeaturedArticle";
import { Pagination } from "@/features/posts/ui/Pagination";
import { PopularSidebar } from "@/features/posts/ui/PopularSidebar";
import { PostCard } from "@/features/posts/ui/PostCard";
import { SubscribeCard } from "@/features/posts/ui/SubscribeCard";
import PageMeta from "@/shared/components/seo/PageMeta";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const POSTS_PER_PAGE = 9;

const PostGrid = ({ posts }: { posts: Post[] }) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))}
    </div>
);

export const BlogPage = () => {
    const { t } = useTranslation("common");
    const [page, setPage] = useState(1);
    const [tag, setTag] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const isSearchActive = searchTerm.trim().length > 0;
    const { data: latestPosts, isLoading: isLoadingLatest } = useLatestPosts();
    const featuredPost = (latestPosts as Post[] | undefined)?.[0];
    const showFeatured = !tag && page === 1 && Boolean(featuredPost);

    const { data: searchResults, isLoading: isSearching } = useSearchPosts(searchTerm);
    const { data: postList, isLoading } = usePostList(
        { page, limit: POSTS_PER_PAGE, tag, exclude: !tag ? featuredPost?.id : undefined },
        !isLoadingLatest,
    );
    const posts = postList?.data ?? [];

    const changePage = (nextPage: number) => {
        setPage(nextPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const changeTag = (next: string | null) => {
        setTag(next);
        setPage(1);
    };

    return (
        <div className="mx-auto w-full max-w-[1424px] px-4 pb-24 pt-28 text-main-100 sm:px-8 lg:pt-[130px]">
            <PageMeta page="news" />
            <BlogHero onSearch={setSearchTerm} />

            {isSearchActive ? (
                <section className="mt-12 flex flex-col gap-6">
                    <h2 className="text-xl font-semibold">{t("blog.searchResultsFor", { term: searchTerm })}</h2>
                    {isSearching && <p className="text-sm text-main-50">{t("blog.searching")}</p>}
                    {!isSearching && (searchResults as Post[] | undefined)?.length === 0 && <p className="text-sm text-main-50">{t("blog.emptyState")}</p>}
                    {!isSearching && searchResults && <PostGrid posts={searchResults as Post[]} />}
                </section>
            ) : (
                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_317px] lg:gap-[31px]">
                    <div className="flex min-w-0 flex-col gap-6">
                        {showFeatured && featuredPost && <FeaturedArticle post={featuredPost} />}
                        <CategoryTabs value={tag} onChange={changeTag} />
                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {Array.from({ length: 6 }, (_, index) => (
                                    <div key={index} className="h-[380px] animate-pulse rounded-[24px] bg-main-5" />
                                ))}
                            </div>
                        ) : posts.length > 0 ? (
                            <PostGrid posts={posts} />
                        ) : (
                            !showFeatured && <p className="py-10 text-center text-sm text-main-50">{t("blog.emptyState")}</p>
                        )}
                        <Pagination page={page} totalPages={postList?.totalPages ?? 1} onPageChange={changePage} />
                    </div>

                    <div className="flex flex-col gap-4 lg:sticky lg:top-[112px] lg:self-start">
                        <PopularSidebar />
                        <SubscribeCard />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPage;
