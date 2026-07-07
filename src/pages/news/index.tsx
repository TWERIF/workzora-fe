import { Post } from "@/features/posts/model/types";
import { PaginatedPosts } from "@/features/posts/model/types-paginated-posts";
import { useLatestPosts, usePostList, useSearchPosts } from "@/features/posts/model/usePosts";
import { BlogHero } from "@/features/posts/ui/BlogHero";
import { CategoryTabs } from "@/features/posts/ui/CategoryTabs";
import { FeaturedArticle } from "@/features/posts/ui/FeaturedArticle";
import { Pagination } from "@/features/posts/ui/Pagination";
import { PopularSidebar } from "@/features/posts/ui/PopularSidebar";
import { PostCard } from "@/features/posts/ui/PostCard";
import { PostsGrid } from "@/features/posts/ui/PostsGrid";
import { SubscribeCard } from "@/features/posts/ui/SubscribeCard";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const POSTS_PER_PAGE = 9;

export const BlogPage = () => {
    const { t } = useTranslation("common");
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const { data: latestPosts } = useLatestPosts();
    const { data: searchResults, isLoading: isSearching } = useSearchPosts(searchTerm);
    const { data: postList } = usePostList(page, POSTS_PER_PAGE) as {
        data?: PaginatedPosts;
    };

    const featuredPost = latestPosts?.[0];
    const isSearchActive = searchTerm.trim().length > 0;

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-bg px-4 py-16 dark:bg-bg-dark sm:px-8 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
                <BlogHero onSearch={setSearchTerm} />

                {isSearchActive ? (
                    <section className="flex flex-col gap-6">
                        <h2 className="text-xl font-semibold text-text dark:text-text-dark">
                            {t("blog.searchResultsFor", { term: searchTerm })}
                        </h2>

                        {isSearching && (
                            <p className="text-sm text-muted">{t("blog.searching")}</p>
                        )}

                        {!isSearching && searchResults?.length === 0 && (
                            <p className="text-sm text-muted">{t("blog.emptyState")}</p>
                        )}

                        {!isSearching && searchResults && searchResults.length > 0 && (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {(searchResults as Post[]).map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        )}
                    </section>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                {featuredPost && <FeaturedArticle post={featuredPost} />}
                            </div>

                            <div className="flex flex-col gap-6">
                                <PopularSidebar />
                                <SubscribeCard />
                            </div>
                        </div>

                        <div className="lg:col-span-2 lg:max-w-[calc(66.666%-1rem)]">
                            <div className="flex flex-col gap-8">
                                <CategoryTabs />
                                <PostsGrid page={page} limit={POSTS_PER_PAGE} />
                                <Pagination
                                    page={page}
                                    totalPages={postList?.totalPages ?? 1}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
